"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { schoolInfo } from "@/data/siteData";

export default function OriginStory() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-warm-card" aria-label="Our origin story">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image / Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/shanti1.jpg"
                alt="School brochure showing the institution and its services"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent text-text-dark px-5 py-3 rounded-xl shadow-lg">
              <p className="font-heading font-bold text-2xl">{schoolInfo.foundedYear}</p>
              <p className="text-xs font-medium">{t("Established", "സ്ഥാപിതം")}</p>
            </div>
          </div>

          {/* Story */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wide">
              {t("Our Beginning", "ഞങ്ങളുടെ ആരംഭം")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mt-2 mb-6">
              {t(
                "A Journey That Began With Seven Children",
                "ഏഴ് കുട്ടികളിൽ നിന്ന് ആരംഭിച്ച യാത്ര"
              )}
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                {t(
                  `In 2002, a small community in Vettom, Malappuram, responded to the challenges faced by local families raising children with significant disabilities. Inspired by compassion and driven by a commitment to inclusive education, ${schoolInfo.organization} established what would become one of the region's most enduring special education institutions.`,
                  `2002-ൽ, മലപ്പുറം ജില്ലയിലെ വെട്ടത്തിലെ ഒരു ചെറിയ സമൂഹം, ഗുരുതരമായ വൈകല്യങ്ങളുള്ള കുട്ടികളെ വളർത്തുന്ന പ്രാദേശിക കുടുംബങ്ങൾ നേരിടുന്ന വെല്ലുവിളികളോട് പ്രതികരിച്ചു. അനുകമ്പയിൽ നിന്ന് പ്രചോദനം ഉൾക്കൊണ്ട്, ${schoolInfo.organizationMl} ഈ പ്രദേശത്തെ ഏറ്റവും നിലനിൽക്കുന്ന സ്‌പെഷ്യൽ വിദ്യാഭ്യാസ സ്ഥാപനങ്ങളിലൊന്ന് സ്ഥാപിച്ചു.`
                )}
              </p>
              <p>
                {t(
                  "Starting with just seven children in a single room of the Vedi's two-storey building, the school grew steadily through the dedication of its teachers, the support of the community, and the love of the families it served.",
                  "വേദിയുടെ ഇരുനില കെട്ടിടത്തിലെ ഒരു മുറിയിൽ ഏഴ് കുട്ടികളുമായി ആരംഭിച്ച സ്‌കൂൾ, അധ്യാപകരുടെ സമർപ്പണം, സമൂഹത്തിന്റെ പിന്തുണ, സേവിക്കുന്ന കുടുംബങ്ങളുടെ സ്‌നേഹം എന്നിവയിലൂടെ സ്ഥിരമായി വളർന്നു."
                )}
              </p>
              <p className="font-medium text-primary">
                {t(
                  "Community → Compassion → Action → Education → Opportunity → Independence",
                  "സമൂഹം → അനുകമ്പ → പ്രവർത്തനം → വിദ്യാഭ്യാസം → അവസരം → സ്വാതന്ത്ര്യം"
                )}
              </p>
            </div>
            <Link
              href="/our-story"
              className="inline-flex items-center mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
            >
              {t("Read Our Full Story", "ഞങ്ങളുടെ പൂർണ്ണ കഥ വായിക്കൂ")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
