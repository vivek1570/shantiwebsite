"use client";

import { useLanguage } from "@/context/LanguageContext";
import { testimonials } from "@/data/siteData";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-white" aria-label="Community testimonials">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            {t("Voices From Our Community", "ഞങ്ങളുടെ സമൂഹത്തിന്റെ ശബ്ദങ്ങൾ")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <blockquote
              key={index}
              className="bg-warm-bg p-8 rounded-2xl border border-border relative"
            >
              <span className="absolute top-4 left-6 text-6xl text-primary/10 font-heading leading-none" aria-hidden="true">
                &ldquo;
              </span>
              <p className="text-text-dark text-base leading-relaxed mb-6 relative z-10 italic">
                &ldquo;{t(item.quote, item.quoteMl)}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {item.author[0] === "[" ? "?" : item.author[0]}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-text-dark text-sm block">
                    {item.author}
                  </cite>
                  <span className="text-text-muted text-xs">
                    {t(item.role, item.roleMl)}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
