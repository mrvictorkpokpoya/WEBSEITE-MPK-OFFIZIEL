"""
MULTIPLIKATOR Institut de Langues — E2E Backend Tests
Covers: Auth (register/login/me/logout), Contact, Catalog, Stripe checkout.
"""
import os
import uuid
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://langues-benin.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@multiplikator.bj"
ADMIN_PASSWORD = "Multiplikator2026!"

REQUIRED_PACKAGES = [
    "semi_a1_1", "semi_a1_2", "semi_a2_1", "semi_a2_2",
    "semi_b1_1", "semi_b1_2", "semi_b2_1", "semi_b2_2",
    "bundle_a1_a2", "bundle_a1_a2_b1", "gift_25k",
    "prep_goethe_a1_int", "prep_goethe_a1_ext",
    "prep_goethe_b2_int", "prep_goethe_b2_ext",
    "prep_osd_a1_int", "prep_osd_b2_ext",
]


# ----- Fixtures -----
@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture
def admin_session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    return s


@pytest.fixture
def student_session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    email = f"test_stud_{uuid.uuid4().hex[:8]}@multiplikator.bj"
    r = s.post(f"{API}/auth/register", json={"email": email, "password": "Test1234!", "name": "Test Student"}, timeout=15)
    assert r.status_code == 200, f"Student register failed: {r.status_code} {r.text}"
    return s, email


# ----- Health -----
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/", timeout=10)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ----- Auth -----
class TestAuth:
    def test_register_returns_user_and_sets_cookies(self, client):
        email = f"test_reg_{uuid.uuid4().hex[:8]}@multiplikator.bj"
        r = client.post(f"{API}/auth/register", json={"email": email, "password": "Test1234!", "name": "New User"}, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == email
        assert data["name"] == "New User"
        assert data["role"] == "student"
        assert data["user_id"].startswith("user_")
        # Cookies set?
        cookies = client.cookies.get_dict()
        assert "access_token" in cookies, f"access_token cookie missing. Got: {cookies}"
        assert "refresh_token" in cookies, f"refresh_token cookie missing. Got: {cookies}"

    def test_register_duplicate_email_returns_400(self, client):
        email = f"test_dup_{uuid.uuid4().hex[:8]}@multiplikator.bj"
        r1 = client.post(f"{API}/auth/register", json={"email": email, "password": "Test1234!", "name": "Dup"}, timeout=15)
        assert r1.status_code == 200
        s2 = requests.Session()
        r2 = s2.post(f"{API}/auth/register", json={"email": email, "password": "Test1234!", "name": "Dup"}, timeout=15)
        assert r2.status_code == 400

    def test_login_admin_success(self, client):
        r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        cookies = client.cookies.get_dict()
        assert "access_token" in cookies
        assert "refresh_token" in cookies

    def test_login_wrong_password_returns_401(self, client):
        r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "WrongPass!"}, timeout=15)
        assert r.status_code == 401

    def test_me_without_cookie_returns_401(self):
        r = requests.get(f"{API}/auth/me", timeout=10)
        assert r.status_code == 401

    def test_me_with_cookie_returns_user(self, admin_session):
        r = admin_session.get(f"{API}/auth/me", timeout=10)
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL

    def test_logout_clears_cookies(self, admin_session):
        r = admin_session.post(f"{API}/auth/logout", timeout=10)
        assert r.status_code == 200
        # After logout, /me should be 401 in a fresh session w/o cookies
        s = requests.Session()
        r2 = s.get(f"{API}/auth/me", timeout=10)
        assert r2.status_code == 401


# ----- Contact -----
class TestContact:
    def test_create_contact_persists_and_returns_ok(self, client, admin_session):
        payload = {
            "first_name": "TEST",
            "last_name": "User",
            "email": f"test_contact_{uuid.uuid4().hex[:6]}@mpk.bj",
            "phone": "+229 0100000000",
            "campus": "Godomey",
            "department": "Allemand",
            "message": "Bonjour, test e2e.",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["contact_id"].startswith("ct_")
        # email_sent should be False since RESEND_API_KEY is empty
        assert "email_sent" in data
        cid = data["contact_id"]
        # Verify persisted via admin list endpoint
        r2 = admin_session.get(f"{API}/contact/list", timeout=10)
        assert r2.status_code == 200
        items = r2.json()
        assert any(c.get("contact_id") == cid for c in items), "Contact not found in admin list"

    def test_contact_list_unauth_returns_401(self):
        r = requests.get(f"{API}/contact/list", timeout=10)
        assert r.status_code == 401

    def test_contact_list_student_returns_403(self, student_session):
        s, _ = student_session
        r = s.get(f"{API}/contact/list", timeout=10)
        assert r.status_code == 403


# ----- Catalog -----
class TestCatalog:
    def test_catalog_returns_all_required_packages(self, client):
        r = client.get(f"{API}/catalog", timeout=10)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 44, f"Expected at least 44 catalog items, got {len(items)}"
        ids = {it["id"] for it in items}
        missing = [p for p in REQUIRED_PACKAGES if p not in ids]
        assert not missing, f"Missing required packages: {missing}"
        # currency must be xof
        for it in items:
            assert it["currency"] == "xof", f"Package {it['id']} not in XOF: {it['currency']}"


# ----- Stripe Payments -----
class TestPayments:
    def test_checkout_session_valid_semi_a1_1(self, client):
        payload = {"package_id": "semi_a1_1", "origin_url": BASE_URL}
        r = client.post(f"{API}/payments/checkout/session", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "url" in data and data["url"].startswith("https://checkout.stripe.com/")
        assert "session_id" in data and data["session_id"].startswith("cs_test_")

    def test_checkout_session_valid_prep_goethe(self, client):
        payload = {"package_id": "prep_goethe_b1_int", "origin_url": BASE_URL}
        r = client.post(f"{API}/payments/checkout/session", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["url"].startswith("https://checkout.stripe.com/")
        assert data["session_id"].startswith("cs_test_")

    def test_checkout_session_invalid_package_returns_400(self, client):
        payload = {"package_id": "not_a_real_id", "origin_url": BASE_URL}
        r = client.post(f"{API}/payments/checkout/session", json=payload, timeout=15)
        assert r.status_code == 400
        assert "Produit inconnu" in r.text

    def test_checkout_status_for_valid_session(self, client):
        # Create one then query status
        cr = client.post(f"{API}/payments/checkout/session",
                         json={"package_id": "semi_a1_1", "origin_url": BASE_URL}, timeout=30)
        assert cr.status_code == 200
        sid = cr.json()["session_id"]
        time.sleep(1)
        r = client.get(f"{API}/payments/checkout/status/{sid}", timeout=20)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["session_id"] == sid
        assert "payment_status" in d
        assert "status" in d
