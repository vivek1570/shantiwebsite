"use client";

import { useLanguage } from "@/context/LanguageContext";
import { newsItems } from "@/data/siteData";

export default function NewsTicker() {
  const { t } = useLanguage();

  const displayItems = [...newsItems, ...newsItems];

  return (
    <section className="bg-primary-dark text-white py-3 overflow-hidden" aria-label="Latest news">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <span className="flex-shrink-0 bg-accent text-text-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          {t("News", "വാർത്ത")}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {displayItems.map((item, index) => (
              <span
                key={`${item.id}-${index}`}
                className="text-sm text-white/90 flex items-center gap-2"
              >
                <span className="text-accent" aria-hidden="true">●</span>
                {t(item.title, item.titleMl)}
                {item.date && (
                  <span className="text-white/50 text-xs ml-1">
                    ({item.date})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
