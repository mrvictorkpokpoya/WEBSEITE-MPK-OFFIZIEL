import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";
import { CAMPUSES, DEPARTMENTS } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", campus: "", department: "", message: "" });
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.message) {
      toast.error("Veuillez remplir les champs obligatoires."); return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message envoyé. Notre équipe vous répondra rapidement.");
      setForm({ first_name: "", last_name: "", email: "", phone: "", campus: "", department: "", message: "" });
    } catch (err) {
      const d = err.response?.data?.detail; toast.error(typeof d === 'string' ? d : "Erreur lors de l'envoi.");
    } finally { setLoading(false); }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Échangeons sur votre projet." kicker="Notre équipe vous répond sur tous les canaux : formulaire, WhatsApp, email ou téléphone." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <form onSubmit={submit} className="lg:col-span-7 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Prénom*"><input data-testid="contact-firstname" required value={form.first_name} onChange={update("first_name")} className="input" /></Field>
            <Field label="Nom*"><input data-testid="contact-lastname" required value={form.last_name} onChange={update("last_name")} className="input" /></Field>
          </div>
          <Field label="Email*"><input data-testid="contact-email" required type="email" value={form.email} onChange={update("email")} className="input" /></Field>
          <Field label="Téléphone (optionnel)"><input data-testid="contact-phone" value={form.phone} onChange={update("phone")} className="input" /></Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Campus concerné">
              <select data-testid="contact-campus" value={form.campus} onChange={update("campus")} className="input">
                <option value="">— Choisir —</option>
                {CAMPUSES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                <option value="Cours en ligne">Cours en ligne</option>
              </select>
            </Field>
            <Field label="Département concerné">
              <select data-testid="contact-department" value={form.department} onChange={update("department")} className="input">
                <option value="">— Choisir —</option>
                {DEPARTMENTS.map((d) => <option key={d.id} value={d.title}>{d.title}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Message*"><textarea data-testid="contact-message" required rows={6} value={form.message} onChange={update("message")} className="input resize-none" /></Field>
          <button data-testid="contact-submit" disabled={loading} className="btn-primary">{loading ? "Envoi..." : "Envoyer le message"} <Send size={16}/></button>
          <p className="text-xs text-[#4A4A4A] mt-2">Notre équipe vous répondra dans les plus brefs délais.</p>
        </form>
        <aside className="lg:col-span-5 space-y-5">
          <div className="mpk-card p-6">
            <Eyebrow>Contact direct</Eyebrow>
            <ul className="mt-4 space-y-3 text-[#2F0808]">
              <li className="flex items-center gap-3"><Mail size={16} className="text-[#580505]"/> contact@multiplikator-world.com</li>
              <li className="flex items-start gap-3"><Phone size={16} className="text-[#580505] mt-0.5"/> <span>+229 01 96 59 38 66 | +229 01 99 93 33 33<br/><span className="text-xs text-[#4A4A4A]">Parakou / Djougou : +229 01 67 46 44 04</span></span></li>
              <li><a href="https://wa.me/2290196593866" target="_blank" rel="noreferrer" data-testid="contact-whatsapp" className="inline-flex items-center gap-2 mt-2 btn-primary text-sm"><MessageCircle size={14}/> WhatsApp direct</a></li>
            </ul>
          </div>
          <div className="mpk-card p-6">
            <Eyebrow>Vous préférez passer ?</Eyebrow>
            <p className="mt-3 text-sm text-[#4A4A4A]">Tous nos 6 campus sont ouverts du lundi au samedi. Aucun rendez-vous nécessaire pour une visite d'orientation.</p>
          </div>
        </aside>
      </section>
      <style>{`.input{width:100%;padding:0.85rem 1rem;border:1px solid rgba(88,5,5,0.2);background:#fff;color:#2F0808;outline:none;transition:border-color 0.2s}.input:focus{border-color:#580505}`}</style>
    </>
  );
}

function Field({ label, children }) {
  return <label className="block"><span className="text-xs tracking-[0.2em] uppercase text-[#550000]">{label}</span><div className="mt-1.5">{children}</div></label>;
}
