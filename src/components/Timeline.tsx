"use client";

import { useLanguage } from "@/context/LanguageContext";
import { timeline } from "@/data/siteData";

export default function Timeline() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-warm-bg" aria-label="School timeline">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            {t("Our Journey", "ഞങ്ങളുടെ യാത്ര")}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t(
              "From a single room with seven children to a comprehensive institution serving the community.",
              "ഏഴ് കുട്ടികളുള്ള ഒരു മുറിയിൽ നിന്ന് സമൂഹത്തെ സേവിക്കുന്ന ഒരു സമഗ്ര സ്ഥാപനത്തിലേക്ക്."
            )}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary md:-translate-x-px" aria-hidden="true" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center text-xl z-10 shadow-md">
                  <span aria-hidden="true">{item.icon}</span>
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "" : ""}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-text-dark mb-2">
                      {t(item.title, item.titleMl)}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {t(item.description, item.descriptionMl)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
