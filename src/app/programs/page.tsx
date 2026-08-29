"use client";

import { useLanguage } from "@/context/LanguageContext";
import { programs } from "@/data/siteData";
import type { Metadata } from "next";

export default function ProgramsPage() {
  const { t } = useLanguage();

  const categories = [
    { id: "education", label: t("Education", "വിദ്യാഭ്യാസം"), icon: "📖" },
    { id: "therapy", label: t("Therapy", "തെറാപ്പി"), icon: "🏥" },
    { id: "vocational", label: t("Vocational", "തൊഴിൽ"), icon: "🔧" },
    { id: "activities", label: t("Activities", "പ്രവർത്തനങ്ങൾ"), icon: "🎨" },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("Our Programs", "ഞങ്ങളുടെ പരിപാടികൾ")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "Comprehensive programs designed to nurture abilities, build skills, and foster independence for every student.",
              "ഓരോ വിദ്യാർത്ഥിക്കും കഴിവുകൾ വളർത്തുന്നതിനും നൈപുണ്യങ്ങൾ കെട്ടിപ്പടുക്കുന്നതിനും സ്വാതന്ത്ര്യം പ്രോത്സാഹിപ്പിക്കുന്നതിനും രൂപകൽപ്പന ചെയ്ത സമഗ്ര പരിപാടികൾ."
            )}
          </p>
        </div>
      </section>

      {/* Education Without Financial Barrier */}
      <section className="py-12 bg-accent/10 border-b border-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-3">
            {t("Education Without a Financial Barrier", "സാമ്പത്തിക തടസ്സമില്ലാത്ത വിദ്യാഭ്യാസം")}
          </h2>
          <p className="text-text-muted leading-relaxed">
            {t(
              "The school aims to provide its services without financial burden to students and families, sustained through community support, donations, and organizational resources.",
              "സമൂഹ പിന്തുണ, സംഭാവനകൾ, സംഘടനാ വിഭവങ്ങൾ എന്നിവയിലൂടെ നിലനിർത്തിക്കൊണ്ട്, വിദ്യാർത്ഥികൾക്കും കുടുംബങ്ങൾക്കും സാമ്പത്തിക ഭാരമില്ലാതെ സേവനങ്ങൾ നൽകാൻ സ്‌കൂൾ ലക്ഷ്യമിടുന്നു."
            )}
          </p>
        </div>
      </section>

      {/* Programs by Category */}
      {categories.map((category) => {
        const categoryPrograms = programs.filter(
          (p) => p.category === category.id
        );
        if (categoryPrograms.length === 0) return null;

        return (
          <section key={category.id} className="py-16 bg-white even:bg-warm-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl" aria-hidden="true">{category.icon}</span>
                <h2 className="font-heading text-2xl font-bold text-text-dark">
                  {category.label}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPrograms.map((program, index) => (
                  <article
                    key={index}
                    className="bg-white p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4">
                      <span aria-hidden="true">{program.icon}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                      {t(program.name, program.nameMl)}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4">
                      {t(program.description, program.descriptionMl)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                        {t("Currently Offered", "നിലവിൽ നൽകുന്നു")}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Historical Programs */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
            {t("Historical Activities", "ചരിത്രപരമായ പ്രവർത്തനങ്ങൾ")}
          </h2>
          <p className="text-text-muted mb-6">
            {t(
              "The school has historically provided a wide range of activities. The following were reported in earlier records:",
              "സ്‌കൂൾ ചരിത്രപരമായി വിവിധ പ്രവർത്തനങ്ങൾ നൽകിയിട്ടുണ്ട്. മുൻ രേഖകളിൽ ഇനിപ്പറയുന്നവ റിപ്പോർട്ട് ചെയ്യപ്പെട്ടിരുന്നു:"
            )}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Carpet making", "Jewellery/craft activities", "Cleaning-product preparation",
              "Household-product manufacturing", "Agro-based activities", "Micro-enterprise activities",
              "Community activities", "Music therapy",
            ].map((item, idx) => (
              <div key={idx} className="bg-white px-4 py-3 rounded-xl border border-border text-sm text-text-muted text-center">
                {item}
              </div>
            ))}
          </div>
          <p className="text-xs text-text-light mt-4 italic">
            {t(
              "Note: The above activities are based on historical records. Please contact the school for current program availability.",
              "കുറിപ്പ്: മുകളിലുള്ള പ്രവർത്തനങ്ങൾ ചരിത്ര രേഖകളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്."
            )}
          </p>
        </div>
      </section>
    </>
  );
}
