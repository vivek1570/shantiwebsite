"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { schoolInfo, bankDetails } from "@/data/siteData";

export default function DonationSection() {
  const { t } = useLanguage();

  const supportWays = [
    {
      icon: "💰",
      title: t("Donate Money", "പണം സംഭാവന ചെയ്യുക"),
      desc: t(
        "Financial contributions via bank transfer. 80G tax exemption available.",
        "ബാങ്ക് ട്രാൻസ്ഫർ വഴി സാമ്പത്തിക സംഭാവനകൾ. 80G നികുതി ഇളവ് ലഭ്യമാണ്."
      ),
    },
    {
      icon: "🎁",
      title: t("Donate Equipment", "ഉപകരണങ്ങൾ സംഭാവന ചെയ്യുക"),
      desc: t(
        "Educational materials, therapy equipment, or other resources the school needs.",
        "വിദ്യാഭ്യാസ സാമഗ്രികൾ, തെറാപ്പി ഉപകരണങ്ങൾ, അല്ലെങ്കിൽ സ്‌കൂളിന് ആവശ്യമായ മറ്റ് വിഭവങ്ങൾ."
      ),
    },
    {
      icon: "🤝",
      title: t("Volunteer", "വോളണ്ടിയർ"),
      desc: t(
        "Share your time and skills to make a difference in students' lives.",
        "വിദ്യാർത്ഥികളുടെ ജീവിതത്തിൽ മാറ്റമുണ്ടാക്കാൻ നിങ്ങളുടെ സമയവും കഴിവുകളും പങ്കിടുക."
      ),
    },
    {
      icon: "🏢",
      title: t("Corporate Partnership", "കോർപ്പറേറ്റ് പാർട്ട്ണർഷിപ്പ്"),
      desc: t(
        "CSR partnerships and organizational support for the school's programs.",
        "സ്‌കൂളിന്റെ പരിപാടികൾക്കുള്ള CSR പാർട്ട്ണർഷിപ്പുകളും സംഘടനാ പിന്തുണയും."
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary-dark to-[#0E3A42] text-white" aria-label="Support us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            {t("Help Us Continue the Journey", "യാത്ര തുടരാൻ ഞങ്ങളെ സഹായിക്കൂ")}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "The school exists to provide opportunities and support to differently-abled students. Your continued support helps us grow.",
              "ഭിന്നശേഷി വിദ്യാർത്ഥികൾക്ക് അവസരങ്ങളും പിന്തുണയും നൽകുന്നതിനാണ് സ്‌കൂൾ നിലനിൽക്കുന്നത്. നിങ്ങളുടെ തുടർച്ചയായ പിന്തുണ ഞങ്ങളെ വളരാൻ സഹായിക്കുന്നു."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportWays.map((way, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <span className="text-3xl mb-3 block" aria-hidden="true">{way.icon}</span>
              <h3 className="font-heading font-bold text-lg mb-2">{way.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{way.desc}</p>
            </div>
          ))}
        </div>

        {/* Bank Details */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-3xl mx-auto">
          <h3 className="font-heading text-xl font-bold text-center mb-6">
            {t("Bank Transfer Details", "ബാങ്ക് ട്രാൻസ്ഫർ വിശദാംശങ്ങൾ")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankDetails.map((bank, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-5">
                <p className="font-bold text-accent mb-2">{bank.bankName}</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-white/60">{t("A/C No:", "അക്കൗണ്ട് നമ്പർ:")}</span>{" "}
                    <span className="font-mono font-bold">{bank.accountNumber}</span>
                  </p>
                  <p>
                    <span className="text-white/60">{t("IFSC:", "IFSC:")}</span>{" "}
                    <span className="font-mono font-bold">{bank.ifscCode}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-accent/80 text-sm mt-4">
            {t(
              `Registration: ${schoolInfo.registration} | ${schoolInfo.taxExemption}`,
              `രജിസ്ട്രേഷൻ: ${schoolInfo.registration} | ${schoolInfo.taxExemption}`
            )}
          </p>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/support"
            className="inline-flex items-center px-8 py-4 bg-accent text-text-dark font-bold rounded-full text-lg hover:bg-accent-light hover:shadow-lg transition-all duration-300"
          >
            {t("Learn More About Supporting Us", "ഞങ്ങളെ സഹായിക്കുന്നതിനെ കുറിച്ച് കൂടുതലറിയൂ")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
