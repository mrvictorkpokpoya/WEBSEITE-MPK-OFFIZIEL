import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const formatAmount = (amount) => Number(amount).toLocaleString("de-DE");

export default function PaymentSuccess() {
  const { t } = useTranslation();
  const loc = useLocation();
  const [status, setStatus] = useState({ state: "checking" });

  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const sid = params.get("session_id");
    if (!sid) { setStatus({ state: "error" }); return; }
    let attempts = 0;
    const poll = async () => {
      try {
        const { data } = await axios.get(`${API}/payments/checkout/status/${sid}`);
        if (data.payment_status === "paid") { setStatus({ state: "paid", data }); return; }
        if (data.status === "expired") { setStatus({ state: "expired" }); return; }
        if (attempts >= 8) { setStatus({ state: "pending", data }); return; }
        attempts++; setTimeout(poll, 2000);
      } catch { setStatus({ state: "error" }); }
    };
    poll();
  }, [loc.search]);

  return (
    <>
      <PageHero eyebrow={t("payment.hero_eyebrow")} title={t("payment.hero_title")} />
      <section className="max-w-2xl mx-auto px-5 py-16 text-center">
        {status.state === "checking" && <><Clock className="mx-auto text-[#580505]" size={40}/><p className="mt-4 text-[#4A4A4A]">{t("payment.checking")}</p></>}
        {status.state === "paid" && (
          <>
            <CheckCircle2 className="mx-auto text-[#580505]" size={48}/>
            <h2 className="font-serif text-3xl text-[#2F0808] mt-4">{t("payment.paid_title")}</h2>
            <p className="mt-3 text-[#4A4A4A]">{t("payment.paid_desc")}</p>
            <div className="mt-6 mpk-card p-5 text-left">
              <Eyebrow>{t("payment.details")}</Eyebrow>
              <div className="mt-2 text-sm text-[#2F0808]">{status.data?.label}</div>
              <div className="text-sm text-[#580505] mt-1">{formatAmount(status.data?.amount_total || 0)} {status.data?.currency?.toUpperCase()}</div>
            </div>
          </>
        )}
        {status.state === "pending" && <><Clock className="mx-auto text-[#580505]" size={40}/><h2 className="font-serif text-2xl text-[#2F0808] mt-4">{t("payment.pending_title")}</h2><p className="mt-3 text-[#4A4A4A]">{t("payment.pending_desc")}</p></>}
        {(status.state === "expired" || status.state === "error") && <><XCircle className="mx-auto text-[#580505]" size={40}/><h2 className="font-serif text-2xl text-[#2F0808] mt-4">{t("payment.error_title")}</h2><Link to="/boutique" className="btn-primary mt-6">{t("payment.back_shop")}</Link></>}
        <div className="mt-10"><Link to="/" className="btn-ghost text-sm">{t("payment.back_home")}</Link></div>
      </section>
    </>
  );
}
