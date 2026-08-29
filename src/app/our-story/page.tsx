"use client";

import { useLanguage } from "@/context/LanguageContext";
import Timeline from "@/components/Timeline";
import { schoolInfo } from "@/data/siteData";

export default function OurStoryPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("Our Story", "ഞങ്ങളുടെ കഥ")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "From a single room with seven children to a comprehensive institution — the story of community, compassion, and education.",
              "ഏഴ് കുട്ടികളുള്ള ഒരു മുറിയിൽ നിന്ന് ഒരു സമഗ്ര സ്ഥാപനത്തിലേക്ക് — സമൂഹത്തിന്റെയും അനുകമ്പയുടെയും വിദ്യാഭ്യാസത്തിന്റെയും കഥ."
            )}
          </p>
        </div>
      </section>

      {/* The Need */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            {t("The Need", "ആവശ്യകത")}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            {t(
              "In the early 2000s, families in Vettom and surrounding areas faced significant challenges raising children with disabilities. Access to special education, therapy, and developmental support was limited, and many families struggled without adequate resources or professional guidance.",
              "2000-കളുടെ തുടക്കത്തിൽ, വെട്ടത്തിലും സമീപ പ്രദേശങ്ങളിലും വൈകല്യങ്ങളുള്ള കുട്ടികളെ വളർത്തുന്ന കുടുംബങ്ങൾ കാര്യമായ വെല്ലുവിളികൾ നേരിട്ടു. സ്‌പെഷ്യൽ വിദ്യാഭ്യാസം, തെറാപ്പി, വികസന പിന്തുണ എന്നിവയിലേക്കുള്ള പ്രവേശനം പരിമിതമായിരുന്നു."
            )}
          </p>
          <p className="text-text-muted text-lg leading-relaxed">
            {t(
              "Historical reporting describes the school as being inspired by the difficulties faced by a local family with three children with disabilities. The community recognized the urgent need for a dedicated institution to support these children and their families.",
              "മൂന്ന് വൈകല്യങ്ങളുള്ള കുട്ടികളുള്ള ഒരു പ്രാദേശിക കുടുംബം നേരിടുന്ന ബുദ്ധിമുട്ടുകളിൽ നിന്ന് പ്രചോദനം ഉൾക്കൊണ്ടതാണ് സ്‌കൂൾ എന്ന് ചരിത്ര റിപ്പോർട്ടുകൾ വിവരിക്കുന്നു."
            )}
          </p>
        </div>
      </section>

      {/* The Beginning */}
      <section className="py-16 lg:py-24 bg-warm-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
                {t("The Beginning", "ആരംഭം")}
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  {t(
                    `On ${schoolInfo.foundedDate}, ${schoolInfo.historicalName} was established in a single room of the two-storey building of ${schoolInfo.organization} in Vettom. The school began with just ${schoolInfo.initialStudents} children.`,
                    `${schoolInfo.foundedDateMl}-ന്, ${schoolInfo.organizationMl}-യുടെ ഇരുനില കെട്ടിടത്തിലെ ഒരു മുറിയിൽ ${schoolInfo.historicalNameMl} സ്ഥാപിതമായി. ${schoolInfo.initialStudents} കുട്ടികളുമായാണ് സ്‌കൂൾ ആരംഭിച്ചത്.`
                  )}
                </p>
                <p>
                  {t(
                    "Balakrishnan, who was associated with the leadership of Vettam Kalasamskarika Vedi, played an important role in establishing and developing the initiative. His vision and dedication were instrumental in transforming a community response into a lasting institution.",
                    "വെട്ടം കലാസാംസ്‌കാരിക വേദിയുടെ നേതൃത്വവുമായി ബന്ധപ്പെട്ട ബാലകൃഷ്ണൻ സംരംഭം സ്ഥാപിക്കുന്നതിലും വികസിപ്പിക്കുന്നതിലും പ്രധാന പങ്ക് വഹിച്ചു."
                  )}
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/shanti1.jpg"
                alt="School building and brochure information"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Name Evolution */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            {t(
              "From Santhi Special School to P. Balakrishnan Master Memorial Special School",
              "ശാന്തി സ്‌പെഷ്യൽ സ്‌കൂളിൽ നിന്ന് പി. ബാലകൃഷ്ണൻ മാസ്റ്റർ മെമ്മോറിയൽ സ്‌പെഷ്യൽ സ്‌കൂളിലേക്ക്"
            )}
          </h2>
          <div className="bg-warm-bg p-8 rounded-2xl border border-border">
            <p className="text-text-muted leading-relaxed mb-6">
              {t(
                "The institution that began as Santhi Special School in 2002 has evolved into P. Balakrishnan Master Memorial Special School. This transition reflects both the school's growth and its desire to honor the contribution of P. Balakrishnan to the school and community.",
                "2002-ൽ ശാന്തി സ്‌പെഷ്യൽ സ്‌കൂൾ എന്ന പേരിൽ ആരംഭിച്ച സ്ഥാപനം പി. ബാലകൃഷ്ണൻ മാസ്റ്റർ മെമ്മോറിയൽ സ്‌പെഷ്യൽ സ്‌കൂളായി വളർന്നു."
              )}
            </p>
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="font-heading font-bold text-lg text-primary mb-4">
                {t("Name History — To Be Confirmed by School Management", "പേര് ചരിത്രം — സ്‌കൂൾ മാനേജ്‌മെന്റ് സ്ഥിരീകരിക്കേണ്ടത്")}
              </h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1" aria-hidden="true">●</span>
                  <span>{t("Former name: Santhi Special School", "മുൻ പേര്: ശാന്തി സ്‌പെഷ്യൽ സ്‌കൂൾ")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1" aria-hidden="true">●</span>
                  <span>{t("Current official name: P. Balakrishnan Master Memorial Special School", "നിലവിലെ ഔദ്യോഗിക പേര്: പി. ബാലകൃഷ്ണൻ മാസ്റ്റർ മെമ്മോറിയൽ സ്‌പെഷ്യൽ സ്‌കൂൾ")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1" aria-hidden="true">●</span>
                  <span>{t("Date of name change: [TO BE VERIFIED]", "പേര് മാറ്റിയ തീയതി: [സ്ഥിരീകരിക്കേണ്ടത്]")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1" aria-hidden="true">●</span>
                  <span>{t("Reason for name change: [TO BE VERIFIED]", "പേര് മാറ്റത്തിന്റെ കാരണം: [സ്ഥിരീകരിക്കേണ്ടത്]")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1" aria-hidden="true">●</span>
                  <span>{t("Legal organization: Vettam Kalasamskarika Vedi", "നിയമ സംഘടന: വെട്ടം കലാസാംസ്‌കാരിക വേദി")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* P. Balakrishnan Memorial */}
      <section className="py-16 lg:py-24 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            {t("Who Was P. Balakrishnan?", "പി. ബാലകൃഷ്ണൻ ആരായിരുന്നു?")}
          </h2>
          <div className="bg-white p-8 rounded-2xl border border-border">
            <p className="text-text-muted leading-relaxed mb-4">
              {t(
                "P. Balakrishnan was associated with the leadership of Vettam Kalasamskarika Vedi and played an important role in establishing and developing the special school. His dedication to the welfare of differently-abled children and his commitment to inclusive education left a lasting legacy in the Vettom community.",
                "പി. ബാലകൃഷ്ണൻ വെട്ടം കലാസാംസ്‌കാരിക വേദിയുടെ നേതൃത്വവുമായി ബന്ധപ്പെട്ടിരുന്നു, സ്‌പെഷ്യൽ സ്‌കൂൾ സ്ഥാപിക്കുന്നതിലും വികസിപ്പിക്കുന്നതിലും പ്രധാന പങ്ക് വഹിച്ചു."
              )}
            </p>
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
              <p className="text-primary text-sm italic">
                {t(
                  "Official biography to be provided by the school management.",
                  "ഔദ്യോഗിക ജീവചരിത്രം സ്‌കൂൾ മാനേജ്‌മെന്റ് നൽകേണ്ടതാണ്."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organization */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            {t("Our Organization", "ഞങ്ങളുടെ സംഘടന")}
          </h2>
          <div className="text-center mb-8">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="px-6 py-3 bg-primary text-white rounded-xl font-bold">
                {t(schoolInfo.organization, schoolInfo.organizationMl)}
              </div>
              <span className="text-2xl text-accent" aria-hidden="true">↓</span>
              <div className="px-6 py-3 bg-primary/10 text-primary rounded-xl font-bold">
                {t(schoolInfo.currentName, schoolInfo.currentNameMl)}
              </div>
              <span className="text-2xl text-accent" aria-hidden="true">↓</span>
              <div className="px-6 py-3 bg-accent/10 text-accent rounded-xl font-bold">
                {t("Students & Families", "വിദ്യാർത്ഥികളും കുടുംബങ്ങളും")}
              </div>
              <span className="text-2xl text-accent" aria-hidden="true">↓</span>
              <div className="px-6 py-3 bg-success/10 text-success rounded-xl font-bold">
                {t("Community", "സമൂഹം")}
              </div>
            </div>
          </div>
          <p className="text-text-muted leading-relaxed text-center max-w-2xl mx-auto">
            {t(
              "Vettam Kalasamskarika Vedi is the parent organization that established and oversees the school. The organization's cultural and social welfare activities in the Vettom community provided the foundation for the school's creation.",
              "വെട്ടം കലാസാംസ്‌കാരിക വേദി സ്‌കൂൾ സ്ഥാപിച്ച് മേൽനോട്ടം വഹിക്കുന്ന മാതൃ സംഘടനയാണ്."
            )}
          </p>
        </div>
      </section>

      <Timeline />
    </>
  );
}
