import React from "react";
import { Download, FileText, Image as ImageIcon, Folder, Lock } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";
import { DOWNLOADS } from "@/lib/data";

function categoryIcon(name) {
  if (name.startsWith("Brochures")) return FileText;
  if (name.startsWith("Dépliants")) return Folder;
  return ImageIcon;
}

export default function Downloads() {
  return (
    <>
      <PageHero
        eyebrow="Foire aux téléchargements"
        title="Documents, dépliants et visuels MULTIPLIKATOR."
        kicker="Retrouvez ici l'ensemble des supports institutionnels de MPK : brochures, syllabus, grilles tarifaires, dépliants commerciaux et visuels haute définition."
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16 space-y-12 sm:space-y-16">
        {DOWNLOADS.map((cat) => {
          const Icon = categoryIcon(cat.category);
          return (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className="text-[#580505]" size={24} strokeWidth={1.5} />
                <Eyebrow>{cat.category}</Eyebrow>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F0808] uppercase tracking-tight mb-8">
                {cat.category}.
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {cat.items.map((item) => {
                  const isAvailable = item.url && item.url !== "#";
                  return (
                    <article
                      key={item.id}
                      data-testid={`download-${item.id}`}
                      className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#F4F0F0] grid place-items-center flex-shrink-0">
                          <Icon className="text-[#580505]" size={18} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">{item.format}</span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg text-[#2F0808] mt-4 leading-snug">{item.title}</h3>
                      <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
                      <p className="text-xs sm:text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{item.desc}</p>
                      <div className="mt-4 text-[10px] tracking-[0.18em] uppercase text-[#580505]/60 font-medium">Taille : {item.size}</div>

                      {isAvailable ? (
                        <a
                          href={item.url}
                          download
                          target="_blank"
                          rel="noreferrer"
                          data-testid={`download-btn-${item.id}`}
                          className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition"
                        >
                          <Download size={14} /> Télécharger
                        </a>
                      ) : (
                        <div className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAFAFA] text-[#580505]/60 border-[1.5px] border-dashed border-[#580505]/30 text-sm font-semibold cursor-not-allowed">
                          <Lock size={14} /> Bientôt disponible
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="text-center max-w-2xl mx-auto pt-4 sm:pt-8">
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light">
            Vous cherchez un document particulier qui ne figure pas ici ?{" "}
            <a href="mailto:contact@multiplikator-world.com?subject=Demande%20de%20document%20%E2%80%94%20MPK" className="text-[#580505] border-b border-[#580505]">
              Écrivez-nous, nous vous le transmettrons
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
