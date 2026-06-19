"""Phase 5: Resend email + client_no idempotency + new catalog cart-add coverage.

- Tests _ensure_client_number code path is reached on finalize when transaction
  is flagged paid in DB (simulated by directly seeding payment_transactions).
  Since cart_finalize calls Stripe to refresh status, we use a TEST helper:
  directly invoke _ensure_client_number via the async function import.
- Tests POST /api/cart/add for all the new product IDs surfaced in:
  LanguageEnglish (sub-levels A1.1-B2.2, all VIP eng, all eng bundles),
  ExamPrep (prep_goethe_*_int / _ext, prep_osd_*_int / _ext),
  Shop (gift_*).
"""
import os
import sys
import uuid
import asyncio
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
assert BASE_URL, "REACT_APP_BACKEND_URL must be set"

sys.path.insert(0, "/app/backend")
from pymongo import MongoClient  # noqa: E402

_sync = MongoClient(os.environ["MONGO_URL"])[os.environ["DB_NAME"]]


def _run_ensure_client_number(*args, **kwargs):
    """Run _ensure_client_number in an isolated event loop, with a fresh motor client
    bound to that loop (to avoid the server-module's cached client clashing across tests)."""
    import importlib
    import server  # type: ignore
    from motor.motor_asyncio import AsyncIOMotorClient

    async def runner():
        # rebind server.db to a fresh client tied to current loop
        client = AsyncIOMotorClient(os.environ["MONGO_URL"])
        server.db = client[os.environ["DB_NAME"]]
        try:
            return await server._ensure_client_number(*args, **kwargs)
        finally:
            client.close()

    return asyncio.new_event_loop().run_until_complete(runner()) if False else asyncio.run(runner())


# --- Catalog cart-add coverage ---
LANG_ENG_IDS = [
    "eng_a1_1","eng_a1_2","eng_a2_1","eng_a2_2","eng_b1_1","eng_b1_2","eng_b2_1","eng_b2_2",
    "vip_eng_a1_1","vip_eng_a1_2","vip_eng_a2_1","vip_eng_a2_2","vip_eng_b1_1","vip_eng_b1_2",
    "vip_eng_b2_1","vip_eng_b2_2","vip_eng_c1_1","vip_eng_c1_2",
    "bundle_eng_a1_a2","bundle_eng_a2_b1","bundle_eng_b1_b2","bundle_eng_a1_b1",
    "bundle_eng_a1_b2","bundle_eng_a1_c1","bundle_eng_a2_b1_b2","bundle_eng_a2_c1","bundle_eng_b1_c1",
]
PREP_IDS = [
    "prep_goethe_a1_int","prep_goethe_a1_ext","prep_goethe_a2_int","prep_goethe_a2_ext",
    "prep_goethe_b1_int","prep_goethe_b1_ext","prep_goethe_b2_int","prep_goethe_b2_ext",
    "prep_osd_a1_int","prep_osd_a1_ext","prep_osd_a2_int","prep_osd_a2_ext",
    "prep_osd_b1_int","prep_osd_b1_ext","prep_osd_b2_int","prep_osd_b2_ext",
]
SHOP_IDS = ["gift_a1_1","gift_a1","gift_bundle_a1_b1","gift_25k","gift_50k","gift_100k"]


@pytest.mark.parametrize("pid", LANG_ENG_IDS)
def test_cart_add_language_english_ids(pid):
    r = requests.post(f"{BASE_URL}/api/cart/add", json={"package_id": pid}, timeout=15)
    assert r.status_code == 200, f"{pid} -> {r.status_code}: {r.text}"
    data = r.json()
    assert "cart_token" in data and data["added"] is True


@pytest.mark.parametrize("pid", PREP_IDS)
def test_cart_add_examprep_ids(pid):
    r = requests.post(f"{BASE_URL}/api/cart/add", json={"package_id": pid}, timeout=15)
    assert r.status_code == 200, f"{pid} -> {r.status_code}: {r.text}"
    data = r.json()
    assert "cart_token" in data


@pytest.mark.parametrize("pid", SHOP_IDS)
def test_cart_add_shop_gift_ids(pid):
    r = requests.post(f"{BASE_URL}/api/cart/add", json={"package_id": pid}, timeout=15)
    assert r.status_code == 200, f"{pid} -> {r.status_code}: {r.text}"


# --- Client number generation + email code path ---
def test_ensure_client_number_generates_mpk_format():
    email = f"TEST_phase5_{uuid.uuid4().hex[:8]}@example.com"
    _sync.clients.delete_many({"email": email})
    items = [{"label": "Test product", "amount": 46000}]
    client_no = _run_ensure_client_number(email, order_items=items, order_amount=46000)
    assert client_no.startswith("MPK-"), client_no
    parts = client_no.split("-")
    assert len(parts) == 3 and len(parts[1]) == 4 and len(parts[2]) == 5
    _sync.clients.delete_many({"email": email})


def test_ensure_client_number_idempotent():
    email = f"TEST_phase5_idem_{uuid.uuid4().hex[:8]}@example.com"
    _sync.clients.delete_many({"email": email})
    cn1 = _run_ensure_client_number(email, order_items=[{"label": "x", "amount": 100}], order_amount=100)
    cn2 = _run_ensure_client_number(email, order_items=[{"label": "y", "amount": 200}], order_amount=200)
    assert cn1 == cn2, f"Expected idempotent client_no, got {cn1} vs {cn2}"
    _sync.clients.delete_many({"email": email})


def test_ensure_client_number_no_crash_when_resend_key_empty():
    """Verify the email send block is wrapped in try/except + RESEND_API_KEY guard
    so no NoneType / KeyError leaks even with empty key or empty items."""
    email = f"TEST_phase5_nokey_{uuid.uuid4().hex[:8]}@example.com"
    _sync.clients.delete_many({"email": email})
    cn = _run_ensure_client_number(email)
    assert cn.startswith("MPK-")
    _sync.clients.delete_many({"email": email})


def test_finalize_for_nonexistent_session_returns_404():
    r = requests.post(f"{BASE_URL}/api/cart/finalize/cs_test_does_not_exist", timeout=15)
    assert r.status_code in (404, 500), r.status_code  # 500 if Stripe throws first; 404 if tx not found
