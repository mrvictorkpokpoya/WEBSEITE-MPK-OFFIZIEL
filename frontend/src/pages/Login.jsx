import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { PageHero, Eyebrow } from "@/components/Common";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Connexion réussie");
      nav("/espace-apprenant");
    } catch (err) {
      const d = err.response?.data?.detail; toast.error(typeof d === 'string' ? d : "Erreur de connexion");
    } finally { setLoading(false); }
  };

  const googleSignIn = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/espace-apprenant";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <>
      <PageHero eyebrow="Espace apprenant" title="Connexion." kicker="Accédez à votre tableau de bord, suivez votre parcours et retrouvez vos ressources." />
      <section className="max-w-md mx-auto px-5 py-12">
        <form onSubmit={submit} className="mpk-card p-8 space-y-5">
          <label className="block"><Eyebrow>Email</Eyebrow><input data-testid="login-email" required type="email" className="mt-2 w-full border border-[#580505]/20 px-4 py-3 outline-none focus:border-[#580505]" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></label>
          <label className="block"><Eyebrow>Mot de passe</Eyebrow><input data-testid="login-password" required type="password" className="mt-2 w-full border border-[#580505]/20 px-4 py-3 outline-none focus:border-[#580505]" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} /></label>
          <button data-testid="login-submit" disabled={loading} className="btn-primary w-full justify-center">{loading ? "Connexion..." : "Se connecter"}</button>
        </form>
        <div className="relative my-6 text-center text-xs text-[#4A4A4A] before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:border-t before:border-[#580505]/10"><span className="relative bg-white px-3">ou</span></div>
        <button data-testid="login-google" onClick={googleSignIn} className="btn-ghost w-full justify-center">Continuer avec Google</button>
        <p className="text-center text-sm text-[#4A4A4A] mt-6">Pas encore de compte ? <Link to="/inscription" className="text-[#580505] border-b border-[#580505]">Créer un compte</Link></p>
      </section>
    </>
  );
}
