import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ShoppingCart, Trash2, Loader2, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";
import { apiGetCart, apiRemoveFromCart, apiCartUpsell, apiCartCheckout, formatXof } from "@/lib/cart";

export default function Cart() {
  const { t } = useTranslation();
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [email, setEmail] = useState("");
  const [upsell, setUpsell] = useState({ first_time_buyer: false, upsell_items: [], default_checked: false, fallback_text: "" });
  const [includeUpsell, setIncludeUpsell] = useState(true);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    const c = await apiGetCart();
    setCart(c);
  };
  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (!email || email.length < 5) {
      apiCartUpsell().then((u) => { setUpsell(u); setIncludeUpsell(u.default_checked); });
      return;
    }
    const t = setTimeout(() => {
      apiCartUpsell(email).then((u) => { setUpsell(u); setIncludeUpsell(u.default_checked); });
    }, 400);
    return () => clearTimeout(t);
  }, [email]);

  const onRemove = async (pid) => {
    await apiRemoveFromCart(pid);
    await refresh();
  };

  const onCheckout = async () => {
    if (!cart.items.length) { toast.error("Panier vide"); return; }
    setLoading(true);
    try {
      const r = await apiCartCheckout({ customer_email: email || null, include_upsell: includeUpsell });
      window.location.href = r.url;
    } catch (e) {
      toast.error(e.response?.data?.detail || "Erreur paiement");
      setLoading(false);
    }
  };

  const upsellTotal = includeUpsell && upsell.first_time_buyer
    ? upsell.upsell_items.reduce((s, i) => s + i.amount, 0)
    : 0;
  const grandTotal = (cart.subtotal || 0) + upsellTotal;

  return (
    <>
      <PageHero
        eyebrow="Boutique MPK"
        title="Votre panier"
        kicker="Vérifiez vos articles, ajoutez votre email pour recevoir votre numéro client après paiement, puis procédez au paiement sécurisé."
      />

      <section className="max-w-[1100px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-14 grid lg:grid-cols-12 gap-8">
        {/* Items */}
        <div className="lg:col-span-7">
          <h2 className="font-serif text-xl text-[#2F0808] mb-4">Articles ({cart.items.length})</h2>
          {cart.items.length === 0 ? (
            <div className="mpk-card p-8 text-center bg-white">
              <ShoppingCart className="mx-auto text-[#580505]/50" size={40}/>
              <p className="mt-3 text-[#4A4A4A]">Votre panier est vide.</p>
              <Link to="/departements/training-plus" data-testid="cart-empty-cta" className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition">
                Voir les cours <ArrowRight size={14}/>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((it) => (
                <div key={it.package_id} data-testid={`cart-item-${it.package_id}`} className="mpk-card p-5 flex items-center justify-between gap-3 bg-white">
                  <div className="flex-grow">
                    <div className="font-serif text-base text-[#2F0808] leading-snug">{it.label}</div>
                    <div className="text-xs text-[#580505] mt-1 tracking-wider uppercase">{it.package_id}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-lg text-[#580505]">{formatXof(it.amount)} F</div>
                    <button onClick={() => onRemove(it.package_id)} data-testid={`cart-remove-${it.package_id}`} className="mt-1 inline-flex items-center gap-1 text-xs text-[#580505]/70 hover:text-[#580505] transition">
                      <Trash2 size={12}/> Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary + checkout */}
        <aside className="lg:col-span-5 space-y-5">
          <div className="mpk-card p-6 bg-white">
            <Eyebrow>Récapitulatif</Eyebrow>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#4A4A4A]">Sous-total</span><span className="text-[#2F0808] font-medium">{formatXof(cart.subtotal)} F</span></div>
              {upsell.first_time_buyer && upsell.upsell_items.map((u) => (
                <div key={u.id} className={`flex justify-between text-xs ${includeUpsell ? '' : 'opacity-50 line-through'}`}>
                  <span className="text-[#4A4A4A]">+ {u.label}</span>
                  <span className="text-[#580505]">{formatXof(u.amount)} F</span>
                </div>
              ))}
              <div className="border-t border-[#580505]/15 pt-3 flex justify-between font-serif text-xl">
                <span className="text-[#2F0808]">Total</span>
                <span className="text-[#580505]">{formatXof(grandTotal)} F</span>
              </div>
            </div>

            {/* Email */}
            <label className="block mt-5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#550000]">Email (recommandé)</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="cart-email"
                placeholder="vous@example.com"
                className="mt-1 w-full px-3 py-2.5 border border-[#580505]/25 text-sm focus:border-[#580505] outline-none"
              />
              <span className="text-[10px] text-[#4A4A4A] mt-1 block">Pour recevoir votre numéro client MPK automatique après paiement.</span>
            </label>

            {/* Upsell */}
            {upsell.first_time_buyer && upsell.upsell_items.length > 0 && (
              <div className="mt-5 border border-[#580505]/20 p-4 bg-[#FAFAFA]" data-testid="cart-upsell-block">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#580505] font-semibold mb-2 flex items-center gap-1.5">
                  <Info size={11}/> Frais administratifs (premier achat)
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUpsell}
                    onChange={(e) => setIncludeUpsell(e.target.checked)}
                    data-testid="cart-upsell-checkbox"
                    className="mt-0.5 accent-[#580505] w-4 h-4"
                  />
                  <span className="text-xs text-[#2F0808] leading-relaxed">
                    Inclure les frais d'inscription + documentation ({formatXof(upsell.upsell_items.reduce((s, i) => s + i.amount, 0))} F) dans ce paiement.
                  </span>
                </label>
                {!includeUpsell && (
                  <p className="mt-3 text-[10px] text-[#580505]/80 italic leading-relaxed">
                    ⚠ {upsell.fallback_text}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={onCheckout}
              disabled={loading || cart.items.length === 0}
              data-testid="cart-checkout"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-base font-semibold hover:bg-[#2F0808] transition disabled:opacity-50 uppercase tracking-wider"
            >
              {loading ? <Loader2 size={16} className="animate-spin"/> : <CheckCircle2 size={16}/>}
              {loading ? "Redirection..." : `Passer à la caisse · ${formatXof(grandTotal)} F`}
            </button>
            <Link
              to="/departements/training-plus"
              data-testid="cart-continue-shopping"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition"
            >
              ← Continuer mes achats
            </Link>
            <p className="mt-3 text-[10px] text-center text-[#4A4A4A]/70 tracking-wider uppercase">Paiement sécurisé Stripe</p>
          </div>
        </aside>
      </section>
    </>
  );
}
