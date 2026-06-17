import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { PageHero, Eyebrow } from "@/components/Common";

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error(t("auth.register.pwd_min")); return; }
    setLoading(true);
    try {
      await register(form.email, form.password, form.name);
      toast.success(t("auth.register.success"));
      nav("/espace-apprenant");
    } catch (err) {
      const d = err.response?.data?.detail; toast.error(typeof d === 'string' ? d : t("auth.register.error"));
    } finally { setLoading(false); }
  };

  return (
    <>
      <PageHero eyebrow={t("auth.register.hero_eyebrow")} title={t("auth.register.hero_title")} kicker={t("auth.register.hero_kicker")} />
      <section className="max-w-md mx-auto px-5 py-12">
        <form onSubmit={submit} className="mpk-card p-8 space-y-5">
          <label className="block"><Eyebrow>{t("auth.register.name")}</Eyebrow><input data-testid="register-name" required className="mt-2 w-full border border-[#580505]/20 px-4 py-3 outline-none focus:border-[#580505]" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></label>
          <label className="block"><Eyebrow>{t("auth.register.email")}</Eyebrow><input data-testid="register-email" required type="email" className="mt-2 w-full border border-[#580505]/20 px-4 py-3 outline-none focus:border-[#580505]" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></label>
          <label className="block"><Eyebrow>{t("auth.register.password")}</Eyebrow><input data-testid="register-password" required type="password" minLength={6} className="mt-2 w-full border border-[#580505]/20 px-4 py-3 outline-none focus:border-[#580505]" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} /></label>
          <button data-testid="register-submit" disabled={loading} className="btn-primary w-full justify-center">{loading ? t("auth.register.submitting") : t("auth.register.submit")}</button>
        </form>
        <p className="text-center text-sm text-[#4A4A4A] mt-6">{t("auth.register.already")} <Link to="/connexion" className="text-[#580505] border-b border-[#580505]">{t("auth.register.login_link")}</Link></p>
      </section>
    </>
  );
}
