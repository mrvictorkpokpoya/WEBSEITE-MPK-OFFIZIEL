"""Phase 2 backend tests: catalog new IDs, Stripe checkout for new VIP sublevels and bundles."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://langues-benin.preview.emergentagent.com").rstrip("/")
ORIGIN = BASE_URL  # acceptable origin

# Expected new package_ids
NEW_VIP_SUBLEVELS = [
    "vip_a1_1", "vip_a1_2", "vip_a2_1", "vip_a2_2",
    "vip_b1_1", "vip_b1_2", "vip_b2_1", "vip_b2_2",
    "vip_c1_1", "vip_c1_2",
]

NEW_BUNDLES = [
    "bundle_a1_a2", "bundle_a2_b1", "bundle_b1_b2",
    "bundle_a1_b1", "bundle_a1_b2", "bundle_a1_c1",
    "bundle_a2_b1_b2", "bundle_a2_c1", "bundle_b1_c1",
]

KIDS = ["kids_english", "kids_english_reg"]
VIP_FULL_NEW = ["vip_b2", "vip_c1"]

EXPECTED_AMOUNTS = {
    "vip_a1_1": 100000.0, "vip_a1_2": 100000.0, "vip_a2_1": 100000.0, "vip_a2_2": 100000.0,
    "vip_b1_1": 107500.0, "vip_b1_2": 107500.0,
    "vip_b2_1": 125000.0, "vip_b2_2": 125000.0,
    "vip_c1_1": 140000.0, "vip_c1_2": 140000.0,
    "vip_a1": 200000.0, "vip_a2": 200000.0, "vip_b1": 215000.0,
    "vip_b2": 250000.0, "vip_c1": 280000.0,
    "bundle_a1_a2": 172800.0, "bundle_a2_b1": 198000.0, "bundle_b1_b2": 229500.0,
    "bundle_a1_b1": 265200.0, "bundle_a1_b2": 379950.0, "bundle_a1_c1": 511700.0,
    "bundle_a2_b1_b2": 301750.0, "bundle_a2_c1": 433500.0, "bundle_b1_c1": 348500.0,
    "kids_english": 15000.0, "kids_english_reg": 2500.0,
}


@pytest.fixture(scope="module")
def catalog():
    r = requests.get(f"{BASE_URL}/api/catalog", timeout=15)
    assert r.status_code == 200, f"GET /api/catalog failed: {r.status_code} {r.text}"
    data = r.json()
    assert isinstance(data, list)
    return {item["id"]: item for item in data}


class TestCatalogNewIds:
    def test_catalog_has_new_vip_sublevels(self, catalog):
        missing = [k for k in NEW_VIP_SUBLEVELS if k not in catalog]
        assert not missing, f"Missing VIP sublevels in catalog: {missing}"

    def test_catalog_has_new_bundles(self, catalog):
        missing = [k for k in NEW_BUNDLES if k not in catalog]
        assert not missing, f"Missing bundles in catalog: {missing}"

    def test_catalog_has_kids_english(self, catalog):
        for k in KIDS:
            assert k in catalog, f"Missing kids_english id: {k}"

    def test_catalog_has_vip_full_new(self, catalog):
        for k in VIP_FULL_NEW:
            assert k in catalog, f"Missing VIP full id: {k}"

    def test_catalog_amounts_correct(self, catalog):
        mismatches = []
        for pid, expected in EXPECTED_AMOUNTS.items():
            actual = catalog.get(pid, {}).get("amount")
            if actual != expected:
                mismatches.append(f"{pid}: expected {expected}, got {actual}")
        assert not mismatches, "Amount mismatches: " + "; ".join(mismatches)

    def test_catalog_currency_xof(self, catalog):
        for pid in EXPECTED_AMOUNTS.keys():
            assert catalog[pid]["currency"] == "xof", f"{pid} currency != xof: {catalog[pid]['currency']}"

    def test_legacy_bundle_alias_kept(self, catalog):
        assert "bundle_a1_a2_b1" in catalog, "Legacy bundle_a1_a2_b1 alias must remain for backward compat"


def _checkout(package_id):
    payload = {"package_id": package_id, "origin_url": ORIGIN}
    r = requests.post(f"{BASE_URL}/api/payments/checkout/session", json=payload, timeout=20)
    return r


class TestStripeCheckoutNewIds:
    @pytest.mark.parametrize("pid", NEW_BUNDLES)
    def test_bundle_checkout_creates_stripe_session(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        body = r.json()
        assert "url" in body and body["url"].startswith("https://"), f"{pid}: no stripe URL -> {body}"
        assert "stripe.com" in body["url"] or "checkout.stripe" in body["url"], f"{pid}: not a stripe url -> {body['url']}"
        assert "session_id" in body and body["session_id"]

    @pytest.mark.parametrize("pid", NEW_VIP_SUBLEVELS)
    def test_vip_sublevel_checkout_creates_stripe_session(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        body = r.json()
        assert "url" in body and body["url"].startswith("https://"), f"{pid}: no stripe URL -> {body}"

    @pytest.mark.parametrize("pid", ["vip_b2", "vip_c1", "kids_english", "kids_english_reg"])
    def test_other_new_ids_checkout(self, pid):
        r = _checkout(pid)
        assert r.status_code == 200, f"{pid}: {r.status_code} {r.text}"
        body = r.json()
        assert "url" in body and "stripe" in body["url"], f"{pid}: bad url {body.get('url')}"

    def test_unknown_package_rejected(self):
        r = _checkout("vip_c2_1")  # quote-only, MUST not be in catalog
        assert r.status_code == 400, f"vip_c2_1 should be 400 but got {r.status_code} {r.text}"
