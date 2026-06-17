import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { PageHero, Eyebrow } from "@/components/Common";

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success(t("auth.login.success"));
      nav("/espace-apprenant");
    } catch (err) {
      const d = err.response?.data?.detail; toast.error(typeof d === 'string' ? d : t("auth.login.error"));
    } finally { setLoading(false); }
  };

  const googleSignIn = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/espace-apprenant";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <>
      <PageHero eyebrow={t("auth.login.hero_eyebrow")} title={t("auth.login.hero_title")} kicker={t("auth.login.hero_kicker")} />
      <section className="max-w-md mx-auto px-5 py-12">
        <form onSubmit={submit} className="mpk-card p-8 space-y-5">
          <label className="block"><Eyebrow>{t("auth.login.email")}</Eyebrow><input data-testid="login-email" required type="email" className="mt-2 w-full border border-[#580505]/20 px-4 py-3 outline-none focus:border-[#580505]" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></label>
          <label className="block"><Eyebrow>{t("auth.login.password")}</Eyebrow><input data-testid="login-password" required type="password" className="mt-2 w-full border border-[#580505]/20 px-4 py-3 outline-none focus:border-[#580505]" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} /></label>
          <button data-testid="login-submit" disabled={loading} className="btn-primary w-full justify-center">{loading ? t("auth.login.submitting") : t("auth.login.submit")}</button>
        </form>
        <div className="relative my-6 text-center text-xs text-[#4A4A4A] before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:border-t before:border-[#580505]/10"><span className="relative bg-white px-3">{t("auth.login.or")}</span></div>
        <button data-testid="login-google" onClick={googleSignIn} className="btn-ghost w-full justify-center">{t("auth.login.google")}</button>
        <p className="text-center text-sm text-[#4A4A4A] mt-6">{t("auth.login.no_account")} <Link to="/inscription" className="text-[#580505] border-b border-[#580505]">{t("auth.login.create_account")}</Link></p>
      </section>
    </>
  );
}
