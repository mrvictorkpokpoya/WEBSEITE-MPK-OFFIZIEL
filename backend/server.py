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
    # Premium VIP
    "vip_a1": {"label": "Allemand Premium VIP A1 complet", "amount": 200000.0, "currency": "xof"},
    "vip_a2": {"label": "Allemand Premium VIP A2 complet", "amount": 200000.0, "currency": "xof"},
    "vip_b1": {"label": "Allemand Premium VIP B1 complet", "amount": 215000.0, "currency": "xof"},
    "vip_b2": {"label": "Allemand Premium VIP Intensif B2", "amount": 250000.0, "currency": "xof"},
    "vip_c1": {"label": "Allemand Premium VIP Intensif C1", "amount": 280000.0, "currency": "xof"},
    # Bundles (10% off pair, 15% off triple)
    "bundle_a1_a2": {"label": "Bundle A1 + A2 (-10%)", "amount": 172800.0, "currency": "xof"},
    "bundle_a2_b1": {"label": "Bundle A2 + B1 (-10%)", "amount": 198000.0, "currency": "xof"},
    "bundle_b1_b2": {"label": "Bundle B1 + B2 (-10%)", "amount": 229500.0, "currency": "xof"},
    "bundle_a1_a2_b1": {"label": "Bundle A1 + A2 + B1 (-15%)", "amount": 265200.0, "currency": "xof"},
    "bundle_a2_b1_b2": {"label": "Bundle A2 + B1 + B2 (-15%)", "amount": 302750.0, "currency": "xof"},
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
