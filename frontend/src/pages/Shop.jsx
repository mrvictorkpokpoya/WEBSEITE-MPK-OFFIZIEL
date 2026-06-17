import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow } from "@/components/Common";
import { Gift, Package } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = {
  "Bundles Allemand": ["bundle_a1_a2", "bundle_a2_b1", "bundle_b1_b2", "bundle_a1_a2_b1", "bundle_a2_b1_b2"],
  "Niveaux complets Semi-Intensif": ["semi_a1", "semi_a2", "semi_b1", "semi_b2"],
  "Sous-niveaux": ["semi_a1_1", "semi_a1_2", "semi_a2_1", "semi_a2_2", "semi_b1_1", "semi_b1_2"],
  "Cartes cadeaux": ["gift_a1_1", "gift_a1", "gift_bundle_a1_b1", "gift_25k", "gift_50k", "gift_100k"],
};

const formatXof = (amount) => Number(amount).toLocaleString("de-DE"); // dot as thousands sep

export default function Shop() {
  const { t } = useTranslation();
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    axios.get(`${API}/catalog`).then(r => setCatalog(r.data)).catch(() => toast.error(t("shop.catalog_error")));
  }, [t]);

  const getItem = (id) => catalog.find(c => c.id === id);

  const buy = async (id) => {
    setLoading(id);
    try {
      const origin = window.location.origin;
      const { data } = await axios.post(`${API}/payments/checkout/session`, { package_id: id, origin_url: origin });
      window.location.href = data.url;
    } catch (e) {
      toast.error(t("shop.checkout_error"));
      setLoading(null);
    }
  };

  return (
    <>
      <PageHero eyebrow={t("shop.hero_eyebrow")} title={t("shop.hero_title")} kicker={t("shop.hero_kicker")} />
      {Object.entries(CATEGORIES).map(([cat, ids]) => {
        const catLabel = t(`shop.categories.${cat}`, { defaultValue: cat });
        const isGift = cat === "Cartes cadeaux";
        return (
          <section key={cat} className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12">
            <Eyebrow>{isGift ? t("shop.cat_offer") : t("shop.cat_buy")}</Eyebrow>
            <h2 className="font-serif text-3xl text-[#2F0808] mt-3 mb-8 flex items-center gap-3">
              {isGift ? <Gift className="text-[#580505]" size={28}/> : <Package className="text-[#580505]" size={28}/>} {catLabel}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ids.map((id) => {
                const it = getItem(id);
                if (!it) return null;
                const display = it.currency === 'xof' ? `${formatXof(it.amount)} FCFA` : `${it.amount} ${it.currency.toUpperCase()}`;
                return (
                  <div key={id} className="mpk-card p-6 flex flex-col">
                    <h3 className="font-serif text-xl text-[#2F0808]">{it.label}</h3>
                    <div className="mt-4 font-serif text-2xl text-[#580505]">{display}</div>
                    <div className="text-xs text-[#4A4A4A] mt-1">{t("shop.secured")}</div>
                    <button onClick={() => buy(id)} disabled={loading === id} data-testid={`buy-${id}`} className="btn-primary mt-6 text-sm">
                      {loading === id ? t("common.redirecting") : t("shop.buy")}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
