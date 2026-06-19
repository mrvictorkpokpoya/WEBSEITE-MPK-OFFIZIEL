"""Phase 3 backend tests: English catalog IDs (semi, full, VIP, bundles) + Stripe checkout sessions.

Verifies all ~36 new English package_ids exist in /api/catalog with correct amounts (XOF, FCFA major units)
and that POST /api/payments/checkout/session returns a Stripe URL for each one.
Also asserts non-regression for previously-existing German IDs.
"""
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
ORIGIN = BASE_URL

# ----- English expected amounts -----
ENG_SEMI = {
    "eng_a1_1": 36800.0, "eng_a1_2": 36800.0,
    "eng_a2_1": 40000.0, "eng_a2_2": 40000.0,
    "eng_b1_1": 48000.0, "eng_b1_2": 48000.0,
    "eng_b2_1": 54000.0, "eng_b2_2": 54000.0,
}
ENG_FULL = {
    "eng_a1": 73600.0, "eng_a2": 80000.0,
    "eng_b1": 96000.0, "eng_b2": 108000.0,
}
ENG_VIP_SUB = {
    "vip_eng_a1_1": 80000.0, "vip_eng_a1_2": 80000.0,
    "vip_eng_a2_1": 80000.0, "vip_eng_a2_2": 80000.0,
    "vip_eng_b1_1": 86000.0, "vip_eng_b1_2": 86000.0,
    "vip_eng_b2_1": 100000.0, "vip_eng_b2_2": 100000.0,
    "vip_eng_c1_1": 112000.0, "vip_eng_c1_2": 112000.0,
}
ENG_VIP_FULL = {
    "vip_eng_a1": 160000.0, "vip_eng_a2": 160000.0,
    "vip_eng_b1": 172000.0, "vip_eng_b2": 200000.0,
    "vip_eng_c1": 224000.0,
}
ENG_BUNDLES = {
    "bundle_eng_a1_a2": 124416.0,
    "bundle_eng_a2_b1": 158400.0,
    "bundle_eng_b1_b2": 183600.0,
    "bundle_eng_a1_b1": 212160.0,
    "bundle_eng_a1_b2": 303960.0,
    "bundle_eng_a1_c1": 409360.0,
    "bundle_eng_a2_b1_b2": 241400.0,
    "bundle_eng_a2_c1": 346800.0,
    "bundle_eng_b1_c1": 278800.0,
}

ALL_ENG = {**ENG_SEMI, **ENG_FULL, **ENG_VIP_SUB, **ENG_VIP_FULL, **ENG_BUNDLES}

# German non-regression IDs (should still exist & be checkout-able)
GERMAN_REGRESSION_IDS = ["semi_a1_1", "vip_a1_1", "bundle_a1_b1", "vip_b2", "kids_english"]


@pytest.fixture(scope="module")
def catalog():
    r = requests.get(f"{BASE_URL}/api/catalog", timeout=20)
    assert r.status_code == 200, f"GET /api/catalog -> {r.status_code} {r.text}"
    data = r.json()
    assert isinstance(data, list)
    return {item["id"]: item for item in data}


# ---------- Catalog presence + amount validation ----------
class TestEnglishCatalog:
    def test_all_english_ids_present(self, catalog):
        missing = [k for k in ALL_ENG.keys() if k not in catalog]
        assert not missing, f"Missing English ids in /api/catalog: {missing}"

    def test_english_amounts_match(self, catalog):
        mismatches = []
        for pid, expected in ALL_ENG.items():
            actual = catalog.get(pid, {}).get("amount")
            if actual != expected:
                mismatches.append(f"{pid}: expected {expected}, got {actual}")
        assert not mismatches, "Amount mismatches: " + "; ".join(mismatches)

    def test_english_currency_xof(self, catalog):
        bad = [pid for pid in ALL_ENG if catalog.get(pid, {}).get("currency") != "xof"]
        assert not bad, f"Non-XOF currency for English ids: {bad}"

    def test_no_duplicate_ids(self, catalog):
        # Each id should appear exactly once (since we keyed by id, just sanity check counts)
        r = requests.get(f"{BASE_URL}/api/catalog", timeout=15)
        items = r.json()
        ids = [it["id"] for it in items]
        dups = [i for i in set(ids) if ids.count(i) > 1]
        assert not dups, f"Duplicate ids in catalog: {dups}"

    def test_no_eng_id_collides_with_german(self, catalog):
        # English ids should all be eng_* / vip_eng_* / bundle_eng_*; not collide with semi_/vip_/bundle_ (non-eng)
        for pid in ALL_ENG:
            assert "eng" in pid, f"English id missing 'eng' marker: {pid}"

    def test_german_regression_ids_still_present(self, catalog):
        missing = [k for k in GERMAN_REGRESSION_IDS if k not in catalog]
        assert not missing, f"German regression IDs missing: {missing}"


# ---------- Stripe checkout creation ----------
def _checkout(package_id):
    payload = {"package_id": package_id, "origin_url": ORIGIN}
    return requests.post(f"{BASE_URL}/api/payments/checkout/session", json=payload, timeout=25)


class TestEnglishStripeCheckout:
    @pytest.mark.parametrize("pid", list(ENG_SEMI.keys()))
    def test_eng_semi_checkout(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        body = r.json()
        assert body.get("url", "").startswith("https://"), f"{pid}: bad url {body}"
        assert "stripe" in body["url"], f"{pid}: not stripe url {body['url']}"
        assert body.get("session_id")

    @pytest.mark.parametrize("pid", list(ENG_FULL.keys()))
    def test_eng_full_checkout(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        assert "stripe" in r.json().get("url", "")

    @pytest.mark.parametrize("pid", list(ENG_VIP_SUB.keys()))
    def test_eng_vip_sub_checkout(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        assert "stripe" in r.json().get("url", "")

    @pytest.mark.parametrize("pid", list(ENG_VIP_FULL.keys()))
    def test_eng_vip_full_checkout(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        assert "stripe" in r.json().get("url", "")

    @pytest.mark.parametrize("pid", list(ENG_BUNDLES.keys()))
    def test_eng_bundle_checkout(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        assert "stripe" in r.json().get("url", "")


class TestGermanNonRegression:
    @pytest.mark.parametrize("pid", GERMAN_REGRESSION_IDS)
    def test_german_checkout_still_works(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        assert "stripe" in r.json().get("url", "")

    def test_unknown_id_rejected(self):
        r = _checkout("eng_zzz_999")
        assert r.status_code == 400
