from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import asyncio
import bcrypt
import jwt
import resend
import httpx
from datetime import datetime, timezone, timedelta
from typing import Optional, List, Dict, Any

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest,
)

# ---------- Config ----------
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@multiplikator.bj")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Multiplikator2026!")
STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY", "sk_test_emergent")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="MULTIPLIKATOR Institut de Langues API")
api = APIRouter(prefix="/api")

logger = logging.getLogger("multiplikator")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

# ---------- Helpers: Auth ----------
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=60),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def set_auth_cookies(response: Response, access: str, refresh: str):
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=3600, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")

def clear_auth_cookies(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    response.delete_cookie("session_token", path="/")

async def get_user_by_token(request: Request) -> Optional[dict]:
    # 1) JWT access token (cookie or bearer)
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if token:
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            if payload.get("type") == "access":
                user = await db.users.find_one({"user_id": payload["sub"]}, {"_id": 0, "password_hash": 0})
                if user:
                    return user
        except jwt.InvalidTokenError:
            pass
    # 2) Emergent Google session token
    session_token = request.cookies.get("session_token")
    if session_token:
        sess = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
        if sess:
            exp = sess.get("expires_at")
            if isinstance(exp, str):
                exp = datetime.fromisoformat(exp)
            if exp and exp.tzinfo is None:
                exp = exp.replace(tzinfo=timezone.utc)
            if exp and exp >= datetime.now(timezone.utc):
                user = await db.users.find_one({"user_id": sess["user_id"]}, {"_id": 0, "password_hash": 0})
                if user:
                    return user
    return None

async def require_user(request: Request) -> dict:
    user = await get_user_by_token(request)
    if not user:
        raise HTTPException(status_code=401, detail="Non authentifié")
    return user

# ---------- Models ----------
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str = Field(min_length=1)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ContactRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    campus: Optional[str] = None
    department: Optional[str] = None
    message: str

class CheckoutRequest(BaseModel):
    package_id: str
    origin_url: str
    customer_email: Optional[EmailStr] = None
    recipient_email: Optional[EmailStr] = None
    custom_message: Optional[str] = None

# Predefined catalog (server-authoritative pricing)
CATALOG: Dict[str, Dict[str, Any]] = {
    # Sub-levels semi-intensif
    "semi_a1_1": {"label": "Allemand Semi-Intensif A1.1", "amount": 46000.0, "currency": "xof"},
    "semi_a1_2": {"label": "Allemand Semi-Intensif A1.2", "amount": 46000.0, "currency": "xof"},
    "semi_a2_1": {"label": "Allemand Semi-Intensif A2.1", "amount": 50000.0, "currency": "xof"},
    "semi_a2_2": {"label": "Allemand Semi-Intensif A2.2", "amount": 50000.0, "currency": "xof"},
    "semi_b1_1": {"label": "Allemand Semi-Intensif B1.1", "amount": 60000.0, "currency": "xof"},
    "semi_b1_2": {"label": "Allemand Semi-Intensif B1.2", "amount": 60000.0, "currency": "xof"},
    "semi_b2_1": {"label": "Allemand Semi-Intensif B2.1", "amount": 67500.0, "currency": "xof"},
    "semi_b2_2": {"label": "Allemand Semi-Intensif B2.2", "amount": 67500.0, "currency": "xof"},
    # Full levels
    "semi_a1": {"label": "Allemand Semi-Intensif A1 complet", "amount": 92000.0, "currency": "xof"},
    "semi_a2": {"label": "Allemand Semi-Intensif A2 complet", "amount": 100000.0, "currency": "xof"},
    "semi_b1": {"label": "Allemand Semi-Intensif B1 complet", "amount": 120000.0, "currency": "xof"},
    "semi_b2": {"label": "Allemand Semi-Intensif B2 complet", "amount": 135000.0, "currency": "xof"},
    # Premium VIP — sublevels (half duration, ~half full level price)
    "vip_a1_1": {"label": "Allemand Premium VIP A1.1 (2 sem)", "amount": 100000.0, "currency": "xof"},
    "vip_a1_2": {"label": "Allemand Premium VIP A1.2 (2 sem)", "amount": 100000.0, "currency": "xof"},
    "vip_a2_1": {"label": "Allemand Premium VIP A2.1 (2 sem)", "amount": 100000.0, "currency": "xof"},
    "vip_a2_2": {"label": "Allemand Premium VIP A2.2 (2 sem)", "amount": 100000.0, "currency": "xof"},
    "vip_b1_1": {"label": "Allemand Premium VIP B1.1 (2 sem)", "amount": 107500.0, "currency": "xof"},
    "vip_b1_2": {"label": "Allemand Premium VIP B1.2 (2 sem)", "amount": 107500.0, "currency": "xof"},
    "vip_b2_1": {"label": "Allemand Premium VIP B2.1 (3 sem)", "amount": 125000.0, "currency": "xof"},
    "vip_b2_2": {"label": "Allemand Premium VIP B2.2 (3 sem)", "amount": 125000.0, "currency": "xof"},
    "vip_c1_1": {"label": "Allemand Premium VIP C1.1 (3 sem)", "amount": 140000.0, "currency": "xof"},
    "vip_c1_2": {"label": "Allemand Premium VIP C1.2 (3 sem)", "amount": 140000.0, "currency": "xof"},
    # Premium VIP — full levels
    "vip_a1": {"label": "Allemand Premium VIP A1 complet (4 sem)", "amount": 200000.0, "currency": "xof"},
    "vip_a2": {"label": "Allemand Premium VIP A2 complet (4 sem)", "amount": 200000.0, "currency": "xof"},
    "vip_b1": {"label": "Allemand Premium VIP B1 complet (4 sem)", "amount": 215000.0, "currency": "xof"},
    "vip_b2": {"label": "Allemand Premium VIP B2 (6 sem)", "amount": 250000.0, "currency": "xof"},
    "vip_c1": {"label": "Allemand Premium VIP C1 (6 sem)", "amount": 280000.0, "currency": "xof"},
    # MPK Kids English Training
    "kids_english": {"label": "MPK Kids English Training (1 mois)", "amount": 15000.0, "currency": "xof"},
    "kids_english_reg": {"label": "Inscription Kids English", "amount": 2500.0, "currency": "xof"},
    # Bundles — enriched combinations (10% off pair, 15% off 3+ levels)
    "bundle_a1_b1": {"label": "Parcours A1 → B1 (-15%)", "amount": 265200.0, "currency": "xof"},
    "bundle_a1_b2": {"label": "Parcours A1 → B2 (-15%)", "amount": 379950.0, "currency": "xof"},
    "bundle_a1_c1": {"label": "Parcours A1 → C1 (-15%)", "amount": 511700.0, "currency": "xof"},
    "bundle_a2_b1": {"label": "Parcours A2 → B1 (-10%)", "amount": 198000.0, "currency": "xof"},
    "bundle_a2_b2": {"label": "Parcours A2 → B2 (-15%)", "amount": 301750.0, "currency": "xof"},
    "bundle_a2_c1": {"label": "Parcours A2 → C1 (-15%)", "amount": 433500.0, "currency": "xof"},
    "bundle_b1_b2": {"label": "Parcours B1 → B2 (-10%)", "amount": 229500.0, "currency": "xof"},
    "bundle_b1_c1": {"label": "Parcours B1 → C1 (-15%)", "amount": 348500.0, "currency": "xof"},
    # Legacy aliases for backward compat (old UI IDs still resolve)
    "bundle_a1_a2_b1": {"label": "Parcours A1 → B1 (-15%)", "amount": 265200.0, "currency": "xof"},
    "bundle_a2_b1_b2": {"label": "Parcours A2 → B2 (-15%)", "amount": 301750.0, "currency": "xof"},
    # ----- ENGLISH (-20% vs German, 3×3h/week) -----
    "eng_a1_1": {"label": "Anglais A1.1 (4 sem · 3×3h/sem)", "amount": 36800.0, "currency": "xof"},
    "eng_a1_2": {"label": "Anglais A1.2 (4 sem · 3×3h/sem)", "amount": 36800.0, "currency": "xof"},
    "eng_a2_1": {"label": "Anglais A2.1 (4 sem · 3×3h/sem)", "amount": 40000.0, "currency": "xof"},
    "eng_a2_2": {"label": "Anglais A2.2 (4 sem · 3×3h/sem)", "amount": 40000.0, "currency": "xof"},
    "eng_b1_1": {"label": "Anglais B1.1 (4 sem · 3×3h/sem)", "amount": 48000.0, "currency": "xof"},
    "eng_b1_2": {"label": "Anglais B1.2 (4 sem · 3×3h/sem)", "amount": 48000.0, "currency": "xof"},
    "eng_b2_1": {"label": "Anglais B2.1 (4 sem · 3×3h/sem)", "amount": 54000.0, "currency": "xof"},
    "eng_b2_2": {"label": "Anglais B2.2 (4 sem · 3×3h/sem)", "amount": 54000.0, "currency": "xof"},
    # English full levels
    "eng_a1": {"label": "Anglais A1 complet", "amount": 73600.0, "currency": "xof"},
    "eng_a2": {"label": "Anglais A2 complet", "amount": 80000.0, "currency": "xof"},
    "eng_b1": {"label": "Anglais B1 complet", "amount": 96000.0, "currency": "xof"},
    "eng_b2": {"label": "Anglais B2 complet", "amount": 108000.0, "currency": "xof"},
    # English VIP sublevels
    "vip_eng_a1_1": {"label": "Anglais Premium VIP A1.1 (2 sem)", "amount": 80000.0, "currency": "xof"},
    "vip_eng_a1_2": {"label": "Anglais Premium VIP A1.2 (2 sem)", "amount": 80000.0, "currency": "xof"},
    "vip_eng_a2_1": {"label": "Anglais Premium VIP A2.1 (2 sem)", "amount": 80000.0, "currency": "xof"},
    "vip_eng_a2_2": {"label": "Anglais Premium VIP A2.2 (2 sem)", "amount": 80000.0, "currency": "xof"},
    "vip_eng_b1_1": {"label": "Anglais Premium VIP B1.1 (2 sem)", "amount": 86000.0, "currency": "xof"},
    "vip_eng_b1_2": {"label": "Anglais Premium VIP B1.2 (2 sem)", "amount": 86000.0, "currency": "xof"},
    "vip_eng_b2_1": {"label": "Anglais Premium VIP B2.1 (3 sem)", "amount": 100000.0, "currency": "xof"},
    "vip_eng_b2_2": {"label": "Anglais Premium VIP B2.2 (3 sem)", "amount": 100000.0, "currency": "xof"},
    "vip_eng_c1_1": {"label": "Anglais Premium VIP C1.1 (3 sem)", "amount": 112000.0, "currency": "xof"},
    "vip_eng_c1_2": {"label": "Anglais Premium VIP C1.2 (3 sem)", "amount": 112000.0, "currency": "xof"},
    # English VIP full
    "vip_eng_a1": {"label": "Anglais Premium VIP A1 complet (4 sem)", "amount": 160000.0, "currency": "xof"},
    "vip_eng_a2": {"label": "Anglais Premium VIP A2 complet (4 sem)", "amount": 160000.0, "currency": "xof"},
    "vip_eng_b1": {"label": "Anglais Premium VIP B1 complet (4 sem)", "amount": 172000.0, "currency": "xof"},
    "vip_eng_b2": {"label": "Anglais Premium VIP B2 (6 sem)", "amount": 200000.0, "currency": "xof"},
    "vip_eng_c1": {"label": "Anglais Premium VIP C1 (6 sem)", "amount": 224000.0, "currency": "xof"},
    # English Bundles (-20% vs German)
    "bundle_eng_a1_b1": {"label": "Parcours Anglais A1 → B1 (-15%)", "amount": 212160.0, "currency": "xof"},
    "bundle_eng_a1_b2": {"label": "Parcours Anglais A1 → B2 (-15%)", "amount": 303960.0, "currency": "xof"},
    "bundle_eng_a1_c1": {"label": "Parcours Anglais A1 → C1 (-15%)", "amount": 409360.0, "currency": "xof"},
    "bundle_eng_a2_b1": {"label": "Parcours Anglais A2 → B1 (-10%)", "amount": 158400.0, "currency": "xof"},
    "bundle_eng_a2_b2": {"label": "Parcours Anglais A2 → B2 (-15%)", "amount": 241400.0, "currency": "xof"},
    "bundle_eng_a2_c1": {"label": "Parcours Anglais A2 → C1 (-15%)", "amount": 346800.0, "currency": "xof"},
    "bundle_eng_b1_b2": {"label": "Parcours Anglais B1 → B2 (-10%)", "amount": 183600.0, "currency": "xof"},
    "bundle_eng_b1_c1": {"label": "Parcours Anglais B1 → C1 (-15%)", "amount": 278800.0, "currency": "xof"},
    # Legacy aliases (compat)
    "bundle_eng_a1_a2": {"label": "Pack Anglais A1 + A2 (legacy)", "amount": 124416.0, "currency": "xof"},
    "bundle_eng_a2_b1_b2": {"label": "Parcours Anglais A2 → B2 (-15%)", "amount": 241400.0, "currency": "xof"},
    # ----- Upsell / Frais administratifs -----
    "registration_fee": {"label": "Frais d'inscription (unique)", "amount": 5000.0, "currency": "xof"},
    "documentation_fee": {"label": "Frais de documentation (par niveau)", "amount": 10000.0, "currency": "xof"},
    # Gift cards
    "gift_a1_1": {"label": "Carte cadeau A1.1", "amount": 46000.0, "currency": "xof"},
    "gift_a1": {"label": "Carte cadeau A1 complet", "amount": 92000.0, "currency": "xof"},
    "gift_bundle_a1_b1": {"label": "Carte cadeau Bundle A1 → B1", "amount": 265200.0, "currency": "xof"},
    "gift_25k": {"label": "Carte cadeau 25.000 FCFA", "amount": 25000.0, "currency": "xof"},
    "gift_50k": {"label": "Carte cadeau 50.000 FCFA", "amount": 50000.0, "currency": "xof"},
    "gift_100k": {"label": "Carte cadeau 100.000 FCFA", "amount": 100000.0, "currency": "xof"},
    # Prepa Goethe — interne / externe
    "prep_goethe_a1_int": {"label": "Prepa Goethe A1 — Interne MPK", "amount": 35000.0, "currency": "xof"},
    "prep_goethe_a1_ext": {"label": "Prepa Goethe A1 — Externe", "amount": 40000.0, "currency": "xof"},
    "prep_goethe_a2_int": {"label": "Prepa Goethe A2 — Interne MPK", "amount": 45000.0, "currency": "xof"},
    "prep_goethe_a2_ext": {"label": "Prepa Goethe A2 — Externe", "amount": 50000.0, "currency": "xof"},
    "prep_goethe_b1_int": {"label": "Prepa Goethe B1 — Interne MPK", "amount": 60000.0, "currency": "xof"},
    "prep_goethe_b1_ext": {"label": "Prepa Goethe B1 — Externe", "amount": 65000.0, "currency": "xof"},
    "prep_goethe_b2_int": {"label": "Prepa Goethe B2 — Interne MPK", "amount": 65000.0, "currency": "xof"},
    "prep_goethe_b2_ext": {"label": "Prepa Goethe B2 — Externe", "amount": 70000.0, "currency": "xof"},
    # Prepa ÖSD — interne / externe (mêmes tarifs)
    "prep_osd_a1_int": {"label": "Prepa ÖSD A1 — Interne MPK", "amount": 35000.0, "currency": "xof"},
    "prep_osd_a1_ext": {"label": "Prepa ÖSD A1 — Externe", "amount": 40000.0, "currency": "xof"},
    "prep_osd_a2_int": {"label": "Prepa ÖSD A2 — Interne MPK", "amount": 45000.0, "currency": "xof"},
    "prep_osd_a2_ext": {"label": "Prepa ÖSD A2 — Externe", "amount": 50000.0, "currency": "xof"},
    "prep_osd_b1_int": {"label": "Prepa ÖSD B1 — Interne MPK", "amount": 60000.0, "currency": "xof"},
    "prep_osd_b1_ext": {"label": "Prepa ÖSD B1 — Externe", "amount": 65000.0, "currency": "xof"},
    "prep_osd_b2_int": {"label": "Prepa ÖSD B2 — Interne MPK", "amount": 65000.0, "currency": "xof"},
    "prep_osd_b2_ext": {"label": "Prepa ÖSD B2 — Externe", "amount": 70000.0, "currency": "xof"},
}

# ---------- Auth endpoints ----------
@api.post("/auth/register")
async def register(req: RegisterRequest, response: Response):
    email = req.email.lower().strip()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Un compte existe déjà avec cet email")
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    doc = {
        "user_id": user_id,
        "email": email,
        "name": req.name.strip(),
        "password_hash": hash_password(req.password),
        "role": "student",
        "provider": "local",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(doc)
    access = create_access_token(user_id, email)
    refresh = create_refresh_token(user_id)
    set_auth_cookies(response, access, refresh)
    return {"user_id": user_id, "email": email, "name": req.name, "role": "student"}

@api.post("/auth/login")
async def login(req: LoginRequest, response: Response):
    email = req.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not user.get("password_hash") or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    access = create_access_token(user["user_id"], email)
    refresh = create_refresh_token(user["user_id"])
    set_auth_cookies(response, access, refresh)
    return {"user_id": user["user_id"], "email": email, "name": user.get("name"), "role": user.get("role", "student")}

@api.post("/auth/logout")
async def logout(response: Response, request: Request):
    sess = request.cookies.get("session_token")
    if sess:
        await db.user_sessions.delete_one({"session_token": sess})
    clear_auth_cookies(response)
    return {"ok": True}

@api.get("/auth/me")
async def me(request: Request):
    user = await get_user_by_token(request)
    if not user:
        raise HTTPException(status_code=401, detail="Non authentifié")
    return user

# Emergent Google Auth session exchange
@api.post("/auth/google/session")
async def google_session(request: Request, response: Response):
    body = await request.json()
    session_id = body.get("session_id")
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id manquant")
    async with httpx.AsyncClient(timeout=15.0) as hc:
        r = await hc.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=401, detail="Échec de l'authentification Google")
        data = r.json()
    email = data["email"].lower()
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user = {
            "user_id": user_id,
            "email": email,
            "name": data.get("name", email),
            "picture": data.get("picture"),
            "role": "student",
            "provider": "google",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.users.insert_one(user)
    await db.user_sessions.insert_one({
        "user_id": user["user_id"],
        "session_token": data["session_token"],
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    response.set_cookie(
        "session_token", data["session_token"],
        httponly=True, secure=True, samesite="none", max_age=604800, path="/",
    )
    user.pop("password_hash", None)
    return user

# ---------- Contact ----------
@api.post("/contact")
async def contact(req: ContactRequest):
    record = {
        "contact_id": f"ct_{uuid.uuid4().hex[:12]}",
        **req.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contacts.insert_one(record)

    email_sent = False
    if RESEND_API_KEY:
        try:
            html = f"""
            <div style="font-family:Georgia,serif;color:#2F0808;">
              <h2 style="color:#580505;">Nouveau message — MULTIPLIKATOR</h2>
              <p><strong>Nom :</strong> {req.first_name} {req.last_name}</p>
              <p><strong>Email :</strong> {req.email}</p>
              <p><strong>Téléphone :</strong> {req.phone or '—'}</p>
              <p><strong>Campus :</strong> {req.campus or '—'}</p>
              <p><strong>Département :</strong> {req.department or '—'}</p>
              <hr/>
              <p>{req.message}</p>
            </div>
            """
            await asyncio.to_thread(
                resend.Emails.send,
                {"from": SENDER_EMAIL, "to": [ADMIN_EMAIL], "subject": f"Contact MPK — {req.first_name} {req.last_name}", "html": html},
            )
            email_sent = True
        except Exception as e:
            logger.error(f"Resend failed: {e}")
    return {"ok": True, "contact_id": record["contact_id"], "email_sent": email_sent}

@api.get("/contact/list")
async def contact_list(user: dict = Depends(require_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Accès admin requis")
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items

# ---------- Payments ----------
@api.get("/catalog")
async def get_catalog():
    return [{"id": k, **v} for k, v in CATALOG.items()]

# Stripe zero-decimal currencies (no fractional unit) - amount must NOT be multiplied by 100
# https://stripe.com/docs/currencies#zero-decimal
ZERO_DECIMAL_CURRENCIES = {
    "bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga",
    "pyg", "rwf", "ugx", "vnd", "vuv", "xaf", "xof", "xpf",
}


def stripe_amount(major_amount: float, currency: str) -> float:
    """
    The emergentintegrations.StripeCheckout wrapper multiplies the amount by 100
    (assuming 2-decimal currencies). For zero-decimal currencies like XOF/FCFA,
    we divide by 100 to compensate so Stripe receives the exact major-unit amount.
    """
    if currency.lower() in ZERO_DECIMAL_CURRENCIES:
        return float(major_amount) / 100.0
    return float(major_amount)


@api.post("/payments/checkout/session")
async def create_checkout(req: CheckoutRequest, http_request: Request):
    if req.package_id not in CATALOG:
        raise HTTPException(status_code=400, detail="Produit inconnu")
    item = CATALOG[req.package_id]
    host_url = str(http_request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)

    origin = req.origin_url.rstrip("/")
    success_url = f"{origin}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/boutique"

    metadata = {
        "package_id": req.package_id,
        "label": item["label"],
        "customer_email": req.customer_email or "",
        "recipient_email": req.recipient_email or "",
        "custom_message": (req.custom_message or "")[:300],
    }

    checkout_req = CheckoutSessionRequest(
        amount=stripe_amount(item["amount"], item["currency"]),
        currency=item["currency"],
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata,
    )
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_req)

    await db.payment_transactions.insert_one({
        "session_id": session.session_id,
        "package_id": req.package_id,
        "label": item["label"],
        "amount": item["amount"],
        "currency": item["currency"],
        "customer_email": req.customer_email,
        "metadata": metadata,
        "payment_status": "initiated",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": session.url, "session_id": session.session_id}

@api.get("/payments/checkout/status/{session_id}")
async def checkout_status(session_id: str, http_request: Request):
    host_url = str(http_request.base_url).rstrip("/")
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}/api/webhook/stripe")
    status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
    existing = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if existing and existing.get("payment_status") != "paid":
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"payment_status": status.payment_status, "status": status.status, "updated_at": datetime.now(timezone.utc).isoformat()}},
        )
    return {
        "session_id": session_id,
        "payment_status": status.payment_status,
        "status": status.status,
        "amount_total": status.amount_total,
        "currency": status.currency,
        "label": existing.get("label") if existing else status.metadata.get("label", ""),
    }

@api.post("/webhook/stripe")
async def webhook_stripe(request: Request):
    body = await request.body()
    sig = request.headers.get("Stripe-Signature", "")
    host_url = str(request.base_url).rstrip("/")
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}/api/webhook/stripe")
    try:
        evt = await stripe_checkout.handle_webhook(body, sig)
        await db.payment_transactions.update_one(
            {"session_id": evt.session_id},
            {"$set": {"payment_status": evt.payment_status, "event_type": evt.event_type, "updated_at": datetime.now(timezone.utc).isoformat()}},
        )
    except Exception as e:
        logger.error(f"Webhook error: {e}")
    return {"ok": True}

# ---------- Cart + Client Number + Upsell ----------
UPSELL_ITEMS = ["registration_fee", "documentation_fee"]


class CartAddRequest(BaseModel):
    package_id: str
    cart_token: Optional[str] = None
    customer_email: Optional[str] = None


class CartCheckoutRequest(BaseModel):
    cart_token: str
    origin_url: str
    customer_email: Optional[str] = None
    include_upsell: bool = True


async def _get_or_create_cart(cart_token: Optional[str]) -> Dict[str, Any]:
    if cart_token:
        cart = await db.carts.find_one({"cart_token": cart_token})
        if cart:
            return cart
    new_cart = {
        "cart_token": f"cart_{uuid.uuid4().hex[:16]}",
        "items": [],
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.carts.insert_one(new_cart)
    return new_cart


async def _is_first_time_buyer(customer_email: Optional[str]) -> bool:
    if not customer_email:
        return True  # treat anonymous/no-email as first-time
    paid = await db.payment_transactions.find_one({
        "customer_email": customer_email,
        "payment_status": "paid",
    })
    return paid is None


async def _next_client_number() -> str:
    year = datetime.now(timezone.utc).year
    counter = await db.client_counters.find_one_and_update(
        {"_id": f"client_no_{year}"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True,
    )
    seq = counter.get("seq", 1)
    return f"MPK-{year}-{seq:05d}"


async def _ensure_client_number(customer_email: str, user_id: Optional[str] = None, order_items: Optional[list] = None, order_amount: Optional[float] = None) -> str:
    existing = await db.clients.find_one({"email": customer_email})
    if existing and existing.get("client_no"):
        return existing["client_no"]
    client_no = await _next_client_number()
    now = datetime.now(timezone.utc).isoformat()
    await db.clients.update_one(
        {"email": customer_email},
        {"$setOnInsert": {
            "email": customer_email,
            "user_id": user_id,
            "client_no": client_no,
            "first_purchase_at": now,
            "created_at": now,
        }},
        upsert=True,
    )
    if user_id:
        await db.users.update_one({"user_id": user_id}, {"$set": {"client_no": client_no}})
    # Send confirmation email with client_no + order details
    if RESEND_API_KEY and customer_email:
        try:
            items_html = ""
            if order_items:
                rows = "".join([
                    f"<tr><td style='padding:6px 0;border-bottom:1px solid #eee'>{i.get('label','')}</td>"
                    f"<td style='padding:6px 0;border-bottom:1px solid #eee;text-align:right'>{int(i.get('amount',0)):,} FCFA</td></tr>".replace(",", ".")
                    for i in order_items
                ])
                items_html = f"<table style='width:100%;border-collapse:collapse;margin:12px 0'>{rows}</table>"
            total_str = f"{int(order_amount):,}".replace(",", ".") if order_amount else "—"
            html = f"""
            <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:24px;color:#2F0808">
              <h1 style="color:#580505;font-size:24px;letter-spacing:-0.5px">Bienvenue chez MULTIPLIKATOR !</h1>
              <p style="font-size:16px;line-height:1.6">Merci pour votre paiement. Votre inscription est confirmée.</p>
              <div style="background:#FAFAFA;border-left:4px solid #580505;padding:16px;margin:20px 0">
                <div style="text-transform:uppercase;letter-spacing:0.2em;font-size:11px;color:#580505;font-weight:bold">Votre numéro client</div>
                <div style="font-size:28px;color:#2F0808;margin-top:6px">{client_no}</div>
                <div style="font-size:12px;color:#666;margin-top:8px">Conservez ce numéro — il vous suivra pour toutes vos prochaines inscriptions.</div>
              </div>
              <h2 style="color:#580505;font-size:18px;margin-top:24px">Détails de votre commande</h2>
              {items_html}
              <p style="font-size:16px"><strong>Total payé : {total_str} FCFA</strong></p>
              <hr style="border:0;border-top:1px solid #eee;margin:24px 0"/>
              <p style="font-size:14px;color:#666">Notre équipe vous contactera sous 48h pour démarrer votre formation. Pour toute question : contact@multiplikator-world.com · WhatsApp +229 01 96 59 38 66.</p>
              <p style="font-size:12px;color:#999;margin-top:24px">© MULTIPLIKATOR Institut de Langues — Bénin</p>
            </div>
            """
            await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: resend.Emails.send({
                    "from": SENDER_EMAIL,
                    "to": [customer_email],
                    "subject": f"MULTIPLIKATOR · Votre numéro client {client_no}",
                    "html": html,
                })
            )
        except Exception as e:
            logger.error(f"Client confirmation email failed: {e}")
    return client_no


@api.get("/cart")
async def get_cart(cart_token: Optional[str] = None):
    if not cart_token:
        return {"cart_token": None, "items": [], "subtotal": 0, "currency": "xof"}
    cart = await db.carts.find_one({"cart_token": cart_token}, {"_id": 0})
    if not cart:
        return {"cart_token": cart_token, "items": [], "subtotal": 0, "currency": "xof"}
    subtotal = sum(i.get("amount", 0) * i.get("quantity", 1) for i in cart.get("items", []))
    return {
        "cart_token": cart["cart_token"],
        "items": cart.get("items", []),
        "subtotal": subtotal,
        "currency": "xof",
    }


@api.post("/cart/add")
async def add_to_cart(req: CartAddRequest):
    if req.package_id not in CATALOG:
        raise HTTPException(status_code=400, detail="Produit inconnu")
    if req.package_id in UPSELL_ITEMS:
        raise HTTPException(status_code=400, detail="Les frais administratifs sont gérés automatiquement au checkout")
    cart = await _get_or_create_cart(req.cart_token)
    item = CATALOG[req.package_id]
    items = cart.get("items", [])
    # If already in cart, do nothing (avoid duplicates on language courses — one-shot products)
    if any(i["package_id"] == req.package_id for i in items):
        return {"cart_token": cart["cart_token"], "added": False, "reason": "already_in_cart"}
    items.append({
        "package_id": req.package_id,
        "label": item["label"],
        "amount": item["amount"],
        "currency": item["currency"],
        "quantity": 1,
    })
    await db.carts.update_one({"cart_token": cart["cart_token"]}, {"$set": {"items": items, "updated_at": datetime.now(timezone.utc).isoformat()}})
    return {"cart_token": cart["cart_token"], "added": True, "items_count": len(items)}


@api.delete("/cart/item/{package_id}")
async def remove_from_cart(package_id: str, cart_token: str):
    cart = await db.carts.find_one({"cart_token": cart_token})
    if not cart:
        raise HTTPException(status_code=404, detail="Panier introuvable")
    items = [i for i in cart.get("items", []) if i["package_id"] != package_id]
    await db.carts.update_one({"cart_token": cart_token}, {"$set": {"items": items, "updated_at": datetime.now(timezone.utc).isoformat()}})
    return {"ok": True, "items_count": len(items)}


@api.get("/cart/upsell")
async def cart_upsell_eligibility(customer_email: Optional[str] = None):
    """Returns whether the customer is eligible for first-time upsell (registration + documentation fees)."""
    is_first = await _is_first_time_buyer(customer_email)
    return {
        "first_time_buyer": is_first,
        "upsell_items": [
            {"id": pid, **CATALOG[pid]} for pid in UPSELL_ITEMS
        ],
        "default_checked": is_first,  # auto-check for first-time buyers
        "fallback_text": "Si décoché, ces frais seront à régler au secrétariat lors de votre inscription en présentiel.",
    }


@api.post("/cart/checkout")
async def cart_checkout(req: CartCheckoutRequest, http_request: Request):
    cart = await db.carts.find_one({"cart_token": req.cart_token})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Panier vide")

    items = list(cart["items"])
    # Auto-inject upsell items if first-time buyer and include_upsell flag
    upsell_applied = []
    if req.include_upsell and await _is_first_time_buyer(req.customer_email):
        for pid in UPSELL_ITEMS:
            if pid in CATALOG and not any(i["package_id"] == pid for i in items):
                u = CATALOG[pid]
                items.append({
                    "package_id": pid,
                    "label": u["label"],
                    "amount": u["amount"],
                    "currency": u["currency"],
                    "quantity": 1,
                    "is_upsell": True,
                })
                upsell_applied.append(pid)

    # All items must share the same currency (we only sell in XOF for now)
    currencies = {i["currency"] for i in items}
    if len(currencies) > 1:
        raise HTTPException(status_code=400, detail="Devises mixtes non supportées dans un même panier")
    currency = items[0]["currency"]
    subtotal = sum(i["amount"] * i.get("quantity", 1) for i in items)

    # Build a combined Stripe checkout session (single amount line)
    nb = len(items)
    labels = ", ".join(i["label"] for i in items)[:140]
    combined_label = f"Panier MPK · {nb} article{'s' if nb > 1 else ''}"

    host_url = str(http_request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    origin = req.origin_url.rstrip("/")
    success_url = f"{origin}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/panier"

    metadata = {
        "cart_token": req.cart_token,
        "label": combined_label,
        "items_count": str(nb),
        "items_summary": labels,
        "customer_email": req.customer_email or "",
        "upsell_applied": ",".join(upsell_applied) if upsell_applied else "",
    }

    checkout_req = CheckoutSessionRequest(
        amount=stripe_amount(subtotal, currency),
        currency=currency,
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata,
    )
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_req)

    await db.payment_transactions.insert_one({
        "session_id": session.session_id,
        "cart_token": req.cart_token,
        "package_id": "cart_checkout",
        "label": combined_label,
        "items": items,
        "amount": subtotal,
        "currency": currency,
        "customer_email": req.customer_email,
        "metadata": metadata,
        "payment_status": "initiated",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    return {"url": session.url, "session_id": session.session_id, "subtotal": subtotal, "upsell_applied": upsell_applied}


@api.post("/cart/finalize/{session_id}")
async def cart_finalize(session_id: str, http_request: Request):
    """Called by frontend after successful payment to (1) refresh status from Stripe, (2) generate client number if first paid order, (3) clear cart."""
    host_url = str(http_request.base_url).rstrip("/")
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}/api/webhook/stripe")
    status_resp: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
    tx = await db.payment_transactions.find_one({"session_id": session_id})
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction introuvable")

    client_no = None
    if status_resp.payment_status == "paid":
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"payment_status": "paid", "status": status_resp.status, "updated_at": datetime.now(timezone.utc).isoformat()}},
        )
        email = tx.get("customer_email") or status_resp.metadata.get("customer_email") or ""
        if email:
            existing_user = await db.users.find_one({"email": email}, {"user_id": 1})
            client_no = await _ensure_client_number(
                email,
                user_id=existing_user.get("user_id") if existing_user else None,
                order_items=tx.get("items"),
                order_amount=tx.get("amount"),
            )
        # clear cart
        if tx.get("cart_token"):
            await db.carts.delete_one({"cart_token": tx["cart_token"]})

    return {
        "session_id": session_id,
        "payment_status": status_resp.payment_status,
        "client_no": client_no,
        "items_count": len(tx.get("items", [])),
        "amount": tx.get("amount"),
        "currency": tx.get("currency"),
    }


# ---------- Health ----------
@api.get("/")
async def root():
    return {"name": "MULTIPLIKATOR Institut de Langues API", "status": "ok"}

# ---------- Mount + Middleware ----------
app.include_router(api)

# CORS: allow frontend origin with credentials
allowed_origins = [o.strip() for o in os.environ.get("CORS_ORIGINS", "*").split(",")]
if allowed_origins == ["*"]:
    allowed_origins = [FRONTEND_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# ---------- Startup ----------
@app.on_event("startup")
async def on_startup():
    await db.users.create_index("email", unique=True)
    await db.users.create_index("user_id", unique=True)
    await db.user_sessions.create_index("session_token", unique=True)
    await db.payment_transactions.create_index("session_id", unique=True)
    await db.carts.create_index("cart_token", unique=True)
    await db.clients.create_index("email", unique=True)
    # Seed admin
    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    if not existing:
        await db.users.insert_one({
            "user_id": f"user_{uuid.uuid4().hex[:12]}",
            "email": ADMIN_EMAIL,
            "name": "MPK Admin",
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "provider": "local",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    else:
        # keep password in sync with env on restart
        if not verify_password(ADMIN_PASSWORD, existing.get("password_hash", "")):
            await db.users.update_one({"email": ADMIN_EMAIL}, {"$set": {"password_hash": hash_password(ADMIN_PASSWORD), "role": "admin"}})
    logger.info("MULTIPLIKATOR API started.")

@app.on_event("shutdown")
async def on_shutdown():
    client.close()
