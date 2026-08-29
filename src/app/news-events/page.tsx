"use client";

import { useLanguage } from "@/context/LanguageContext";
import { newsItems } from "@/data/siteData";

export default function NewsEventsPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("News & Events", "വാർത്തകളും പരിപാടികളും")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "Stay updated with the latest happenings, achievements, and community activities.",
              "ഏറ്റവും പുതിയ സംഭവങ്ങൾ, നേട്ടങ്ങൾ, സമൂഹ പ്രവർത്തനങ്ങൾ എന്നിവയെക്കുറിച്ച് അപ്ഡേറ്റ് ചെയ്യുക."
            )}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="bg-warm-bg p-6 lg:p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {item.image && (
                    <div className="sm:w-48 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={t(item.title, item.titleMl)}
                        className="w-full h-32 sm:h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full capitalize">
                        {item.category}
                      </span>
                      {item.date && (
                        <span className="text-text-light text-xs">
                          {item.date}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                      {t(item.title, item.titleMl)}
                    </h2>
                    <p className="text-text-muted leading-relaxed">
                      {t(item.summary, item.summaryMl)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* In the News */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-6 text-center">
              {t("In the News", "വാർത്തകളിൽ")}
            </h2>
            <div className="bg-warm-bg p-8 rounded-2xl border border-border text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4">
                📰
              </div>
              <p className="text-text-muted mb-4">
                {t(
                  "News articles, interviews, and media coverage about the school will be displayed here.",
                  "സ്‌കൂളിനെക്കുറിച്ചുള്ള വാർത്താ ലേഖനങ്ങൾ, അഭിമുഖങ്ങൾ, മാധ്യമ കവറേജ് എന്നിവ ഇവിടെ പ്രദർശിപ്പിക്കും."
                )}
              </p>
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 max-w-xl mx-auto">
                <p className="text-primary text-sm italic">
                  {t(
                    "If you have news articles or media coverage about the school, please share them with the school management for inclusion here.",
                    "സ്‌കൂളിനെക്കുറിച്ചുള്ള വാർത്താ ലേഖനങ്ങളോ മാധ്യമ കവറേജോ ഉണ്ടെങ്കിൽ, ഇവിടെ ഉൾപ്പെടുത്തുന്നതിന് സ്‌കൂൾ മാനേജ്‌മെന്റുമായി പങ്കിടുക."
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-text-dark mb-6 text-center">
              {t("Our Achievements", "ഞങ്ങളുടെ നേട്ടങ്ങൾ")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20">
                <span className="text-2xl mb-2 block" aria-hidden="true">🏆</span>
                <h3 className="font-heading font-bold text-lg text-text-dark mb-2">
                  {t("80G Tax Exemption", "80G നികുതി ഇളവ്")}
                </h3>
                <p className="text-text-muted text-sm">
                  {t(
                    "The school received Income Tax 80G exemption status, recognizing its charitable work and enabling donors to claim tax benefits.",
                    "ധർമ്മ സ്ഥാപനമായി അംഗീകരിച്ച് സ്‌കൂളിന് ആദായ നികുതി 80G ഇളവ് പദവി ലഭിച്ചു."
                  )}
                </p>
              </div>
              <div className="bg-success/10 p-6 rounded-2xl border border-success/20">
                <span className="text-2xl mb-2 block" aria-hidden="true">🎓</span>
                <h3 className="font-heading font-bold text-lg text-text-dark mb-2">
                  {t("20+ Years of Service", "20+ വർഷത്തെ സേവനം")}
                </h3>
                <p className="text-text-muted text-sm">
                  {t(
                    "Continuously serving differently-abled students and their families for over two decades since 2002.",
                    "2002 മുതൽ രണ്ട് പതിറ്റാണ്ടിലേറെ ഭിന്നശേഷി വിദ്യാർത്ഥികളെയും കുടുംബങ്ങളെയും തുടർച്ചയായി സേവിക്കുന്നു."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
