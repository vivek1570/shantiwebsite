"use client";

import { useLanguage } from "@/context/LanguageContext";
import { programs } from "@/data/siteData";

export default function ProgramsPreview() {
  const { t } = useLanguage();

  const currentPrograms = programs.filter((p) => p.status === "current");

  return (
    <section className="py-16 lg:py-24 bg-white" aria-label="Our programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            {t("What We Do", "ഞങ്ങൾ എന്ത് ചെയ്യുന്നു")}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t(
              "Comprehensive programs designed to nurture abilities, build skills, and foster independence.",
              "കഴിവുകൾ വളർത്തുന്നതിനും നൈപുണ്യങ്ങൾ കെട്ടിപ്പടുക്കുന്നതിനും സ്വാതന്ത്ര്യം പ്രോത്സാഹിപ്പിക്കുന്നതിനും രൂപകൽപ്പന ചെയ്ത സമഗ്ര പരിപാടികൾ."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPrograms.map((program, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-warm-bg border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                <span aria-hidden="true">{program.icon}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                {t(program.name, program.nameMl)}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t(program.description, program.descriptionMl)}
              </p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-success/10 text-success text-xs font-semibold rounded-full capitalize">
                  {t(program.category, program.category)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
