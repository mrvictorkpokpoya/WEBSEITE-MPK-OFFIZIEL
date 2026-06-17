import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, MessageCircle, Send, Shield, FileText as FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { PageHero, Eyebrow } from "@/components/Common";
import { CAMPUSES, DEPARTMENTS } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", campus: "", department: "", message: "" });
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.message) {
      toast.error(t("contact.errors.required")); return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(t("contact.errors.success"));
      setForm({ first_name: "", last_name: "", email: "", phone: "", campus: "", department: "", message: "" });
    } catch (err) {
      const d = err.response?.data?.detail; toast.error(typeof d === 'string' ? d : t("contact.errors.send_error"));
    } finally { setLoading(false); }
  };

  return (
    <>
      <PageHero eyebrow={t("contact.hero_eyebrow")} title={t("contact.hero_title")} kicker={t("contact.hero_kicker")} />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <form onSubmit={submit} className="lg:col-span-7 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t("contact.first_name")}><input data-testid="contact-firstname" required value={form.first_name} onChange={update("first_name")} className="input" /></Field>
            <Field label={t("contact.last_name")}><input data-testid="contact-lastname" required value={form.last_name} onChange={update("last_name")} className="input" /></Field>
          </div>
          <Field label={t("contact.email")}><input data-testid="contact-email" required type="email" value={form.email} onChange={update("email")} className="input" /></Field>
          <Field label={t("contact.phone")}><input data-testid="contact-phone" value={form.phone} onChange={update("phone")} className="input" /></Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t("contact.campus_field")}>
              <select data-testid="contact-campus" value={form.campus} onChange={update("campus")} className="input">
                <option value="">{t("common.select_option")}</option>
                {CAMPUSES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                <option value="Cours en ligne">{t("contact.online_courses")}</option>
              </select>
            </Field>
            <Field label={t("contact.department_field")}>
              <select data-testid="contact-department" value={form.department} onChange={update("department")} className="input">
                <option value="">{t("common.select_option")}</option>
                {DEPARTMENTS.map((d) => <option key={d.id} value={d.title}>{d.title}</option>)}
              </select>
            </Field>
          </div>
          <Field label={t("contact.message")}><textarea data-testid="contact-message" required rows={6} value={form.message} onChange={update("message")} className="input resize-none" /></Field>
          <button data-testid="contact-submit" disabled={loading} className="btn-primary">{loading ? t("contact.submitting") : t("contact.submit")} <Send size={16}/></button>
          <p className="text-xs text-[#4A4A4A] mt-2">{t("contact.reply_note")}</p>
        </form>
        <aside className="lg:col-span-5 space-y-5">
          <div className="mpk-card p-6">
            <Eyebrow>{t("contact.direct_eyebrow")}</Eyebrow>
            <ul className="mt-4 space-y-3 text-[#2F0808] text-sm">
              <li className="flex items-start gap-3"><MapPin size={16} className="text-[#580505] mt-0.5 flex-shrink-0"/> <span className="leading-snug">{t("contact.address")}</span></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-[#580505] flex-shrink-0"/> <span>contact@multiplikator-world.com</span></li>
              <li className="flex items-center gap-3"><FaWhatsapp size={16} className="text-[#25D366] flex-shrink-0"/> <span>+229 01 96 59 38 66</span></li>
              <li className="flex items-center gap-3"><FaTelegramPlane size={16} className="text-[#0088CC] flex-shrink-0"/> <span>+229 01 99 93 33 33</span></li>
              <li><a href="https://wa.me/2290196593866" target="_blank" rel="noreferrer" data-testid="contact-whatsapp" className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition"><MessageCircle size={14}/> {t("contact.whatsapp_direct")}</a></li>
            </ul>
          </div>
          <div className="mpk-card p-6">
            <Eyebrow>{t("contact.visit_eyebrow")}</Eyebrow>
            <p className="mt-3 text-sm text-[#4A4A4A]">{t("contact.visit_text")}</p>
          </div>
          <div className="mpk-card p-6">
            <Eyebrow>{t("contact.compliance_eyebrow")}</Eyebrow>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/confidentialite" className="inline-flex items-center gap-2 text-[#580505] hover:underline"><Shield size={14}/> {t("contact.privacy_link")}</Link></li>
              <li><Link to="/traitement-donnees" className="inline-flex items-center gap-2 text-[#580505] hover:underline"><FileTextIcon size={14}/> {t("contact.data_link")}</Link></li>
              <li><Link to="/conditions-utilisation" className="inline-flex items-center gap-2 text-[#580505] hover:underline"><FileTextIcon size={14}/> {t("contact.terms_link")}</Link></li>
            </ul>
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
