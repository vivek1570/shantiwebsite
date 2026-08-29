"use client";

import { useLanguage } from "@/context/LanguageContext";
import { schoolInfo, management } from "@/data/siteData";
import FAQAccordion from "@/components/FAQAccordion";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("Contact Us", "ബന്ധപ്പെടുക")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "We would love to hear from you. Reach out for inquiries, visits, or to learn how you can support our school.",
              "നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു. അന്വേഷണങ്ങൾ, സന്ദർശനങ്ങൾ, അല്ലെങ്കിൽ ഞങ്ങളുടെ സ്‌കൂളിനെ എങ്ങനെ സഹായിക്കാമെന്ന് അറിയാൻ ബന്ധപ്പെടുക."
            )}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
                {t("School Information", "സ്‌കൂൾ വിവരങ്ങൾ")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-warm-bg rounded-xl border border-border">
                  <span className="text-2xl flex-shrink-0 mt-1" aria-hidden="true">🏫</span>
                  <div>
                    <h3 className="font-bold text-text-dark">{t("School Name", "സ്‌കൂൾ പേര്")}</h3>
                    <p className="text-text-muted text-sm mt-1">{t(schoolInfo.currentName, schoolInfo.currentNameMl)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-warm-bg rounded-xl border border-border">
                  <span className="text-2xl flex-shrink-0 mt-1" aria-hidden="true">📍</span>
                  <div>
                    <h3 className="font-bold text-text-dark">{t("Address", "വിലാസം")}</h3>
                    <p className="text-text-muted text-sm mt-1">{t(schoolInfo.fullAddress, schoolInfo.fullAddressMl)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-warm-bg rounded-xl border border-border">
                  <span className="text-2xl flex-shrink-0 mt-1" aria-hidden="true">📞</span>
                  <div>
                    <h3 className="font-bold text-text-dark">{t("Phone", "ഫോൺ")}</h3>
                    <p className="text-text-muted text-sm mt-1">{schoolInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-warm-bg rounded-xl border border-border">
                  <span className="text-2xl flex-shrink-0 mt-1" aria-hidden="true">✉️</span>
                  <div>
                    <h3 className="font-bold text-text-dark">{t("Email", "ഇമെയിൽ")}</h3>
                    <p className="text-text-muted text-sm mt-1">{schoolInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-warm-bg rounded-xl border border-border">
                  <span className="text-2xl flex-shrink-0 mt-1" aria-hidden="true">🕘</span>
                  <div>
                    <h3 className="font-bold text-text-dark">{t("Opening Hours", "പ്രവർത്തന സമയം")}</h3>
                    <p className="text-text-muted text-sm mt-1">{schoolInfo.openingHours}</p>
                  </div>
                </div>
              </div>

              {/* Contact persons */}
              <h3 className="font-heading text-xl font-bold text-text-dark mt-8 mb-4">
                {t("Contact Persons", "ബന്ധപ്പെടാനുള്ള വ്യക്തികൾ")}
              </h3>
              <div className="space-y-3">
                {management.map((person, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-warm-bg rounded-xl border border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                      {person.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-dark text-sm">{t(person.name, person.nameMl)}</p>
                      <p className="text-text-muted text-xs">{t(person.position, person.positionMl)}</p>
                    </div>
                    {person.phone && (
                      <a
                        href={`tel:+91${person.phone.replace(/\s/g, "")}`}
                        className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-dark transition-colors flex-shrink-0"
                      >
                        {t("Call", "വിളിക്കൂ")}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={`tel:+91${management[0]?.phone?.replace(/\s/g, "") || ""}`}
                  className="flex-1 min-w-[140px] text-center px-5 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors text-sm"
                >
                  📞 {t("Call Us", "ഞങ്ങളെ വിളിക്കൂ")}
                </a>
                <a
                  href={`mailto:${schoolInfo.email}`}
                  className="flex-1 min-w-[140px] text-center px-5 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary-light transition-colors text-sm"
                >
                  ✉️ {t("Email Us", "ഇമെയിൽ ചെയ്യൂ")}
                </a>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(schoolInfo.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] text-center px-5 py-3 bg-accent text-text-dark font-semibold rounded-full hover:bg-accent-light transition-colors text-sm"
                >
                  📍 {t("Get Directions", "വഴികൾ നേടുക")}
                </a>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
                {t("Find Us", "ഞങ്ങളെ കണ്ടെത്തുക")}
              </h2>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border bg-gray-100">
                <iframe
                  src={schoolInfo.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School location on Google Maps"
                />
              </div>
              <p className="text-text-light text-xs mt-3 italic text-center">
                {t(
                  "Map location is approximate. Please verify exact location with the school.",
                  "മാപ്പ് ലൊക്കേഷൻ ഏകദേശമാണ്. കൃത്യമായ ലൊക്കേഷൻ സ്‌കൂളുമായി സ്ഥിരീകരിക്കുക."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion />
    </>
  );
}
