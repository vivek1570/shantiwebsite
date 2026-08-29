"use client";

import { useLanguage } from "@/context/LanguageContext";
import { schoolInfo, bankDetails } from "@/data/siteData";

export default function SupportPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-br from-secondary to-[#A8325A] text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("Help Us Continue the Journey", "യാത്ര തുടരാൻ ഞങ്ങളെ സഹായിക്കൂ")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "Your support helps us provide education, care, therapy, and opportunities to differently-abled students.",
              "ഭിന്നശേഷി വിദ്യാർത്ഥികൾക്ക് വിദ്യാഭ്യാസം, പരിചരണം, തെറാപ്പി, അവസരങ്ങൾ എന്നിവ നൽകാൻ നിങ്ങളുടെ പിന്തുണ സഹായിക്കുന്നു."
            )}
          </p>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8 text-center">
            {t("Ways You Can Help", "നിങ്ങൾക്ക് സഹായിക്കാനുള്ള വഴികൾ")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💰", title: t("Donate Money", "പണം സംഭാവന ചെയ്യുക"), desc: t("Financial contributions via bank transfer. Eligible for 80G tax exemption.", "ബാങ്ക് ട്രാൻസ്ഫർ വഴി സാമ്പത്തിക സംഭാവനകൾ. 80G നികുതി ഇളവിന് അർഹം.") },
              { icon: "🎁", title: t("Donate Equipment", "ഉപകരണങ്ങൾ സംഭാവന ചെയ്യുക"), desc: t("Educational materials, therapy equipment, sports gear, computers, and more.", "വിദ്യാഭ്യാസ സാമഗ്രികൾ, തെറാപ്പി ഉപകരണങ്ങൾ, കായിക ഉപകരണങ്ങൾ, കമ്പ്യൂട്ടറുകൾ.") },
              { icon: "🤝", title: t("Volunteer", "വോളണ്ടിയർ"), desc: t("Share your time and skills — teaching, therapy, administration, or events.", "നിങ്ങളുടെ സമയവും കഴിവുകളും പങ്കിടുക — അധ്യാപനം, തെറാപ്പി, ഭരണം, അല്ലെങ്കിൽ പരിപാടികൾ.") },
              { icon: "👶", title: t("Sponsor a Student", "ഒരു വിദ്യാർത്ഥിയെ സ്‌പോൺസർ ചെയ്യൂ"), desc: t("Help cover the costs of education, therapy, and care for a student.", "ഒരു വിദ്യാർത്ഥിയുടെ വിദ്യാഭ്യാസം, തെറാപ്പി, പരിചരണ ചെലവുകൾ വഹിക്കാൻ സഹായിക്കുക.") },
              { icon: "🏢", title: t("CSR Partnership", "CSR പാർട്ട്ണർഷിപ്പ്"), desc: t("Corporate social responsibility partnerships for sustained support.", "തുടർച്ചയായ പിന്തുണയ്ക്കുള്ള കോർപ്പറേറ്റ് സോഷ്യൽ റെസ്‌പോൺസിബിലിറ്റി പാർട്ട്ണർഷിപ്പുകൾ.") },
              { icon: "🩺", title: t("Professional Services", "പ്രൊഫഷണൽ സേവനങ്ങൾ"), desc: t("Medical, therapeutic, educational, or technical expertise.", "വൈദ്യ, ചികിത്സാ, വിദ്യാഭ്യാസ, അല്ലെങ്കിൽ സാങ്കേതിക വൈദഗ്ദ്ധ്യം.") },
              { icon: "🍽️", title: t("Food / Meal Support", "ഭക്ഷണ പിന്തുണ"), desc: t("Help provide nutritious meals for students during school hours.", "സ്‌കൂൾ സമയത്ത് വിദ്യാർത്ഥികൾക്ക് പോഷകാഹാരം നൽകാൻ സഹായിക്കുക.") },
              { icon: "🏗️", title: t("Infrastructure Support", "അടിസ്ഥാന സൗകര്യ പിന്തുണ"), desc: t("Help with building maintenance, repairs, accessibility improvements.", "കെട്ടിട പരിപാലനം, അറ്റകുറ്റപ്പണി, പ്രവേശനക്ഷമത മെച്ചപ്പെടുത്തലുകൾ.") },
            ].map((item, idx) => (
              <div key={idx} className="bg-warm-bg p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300">
                <span className="text-3xl mb-3 block" aria-hidden="true">{item.icon}</span>
                <h3 className="font-heading font-bold text-lg text-text-dark mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-16 lg:py-24 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8 text-center">
            {t("Bank Transfer Details", "ബാങ്ക് ട്രാൻസ്ഫർ വിശദാംശങ്ങൾ")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {bankDetails.map((bank, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="font-heading font-bold text-lg text-primary mb-4">{bank.bankName}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-muted text-sm">{t("Account Number", "അക്കൗണ്ട് നമ്പർ")}</span>
                    <span className="font-mono font-bold text-text-dark">{bank.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-muted text-sm">{t("IFSC Code", "IFSC കോഡ്")}</span>
                    <span className="font-mono font-bold text-text-dark">{bank.ifscCode}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-muted text-sm">{t("Account Type", "അക്കൗണ്ട് തരം")}</span>
                    <span className="font-bold text-text-dark">{bank.accountType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20 text-center">
            <p className="font-bold text-text-dark mb-2">
              {t("Tax Exemption", "നികുതി ഇളവ്")}
            </p>
            <p className="text-text-muted text-sm">
              {t(
                `Donations are eligible for 80G Income Tax exemption. Registration: ${schoolInfo.registration}`,
                `സംഭാവനകൾ 80G ആദായ നികുതി ഇളവിന് അർഹമാണ്. രജിസ്ട്രേഷൻ: ${schoolInfo.registration}`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6 text-center">
            {t("Where Your Support Goes", "നിങ്ങളുടെ പിന്തുണ എവിടെ പോകുന്നു")}
          </h2>
          <p className="text-text-muted text-center mb-8 max-w-2xl mx-auto">
            {t(
              "We are committed to using every contribution wisely and transparently.",
              "ഓരോ സംഭാവനയും ബുദ്ധിപൂർവ്വകമായും സുതാര്യമായും ഉപയോഗിക്കാൻ ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്."
            )}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: t("Education", "വിദ്യാഭ്യാസം"), icon: "📚" },
              { label: t("Therapy", "തെറാപ്പി"), icon: "🩺" },
              { label: t("Vocational Training", "തൊഴിൽ പരിശീലനം"), icon: "🔧" },
              { label: t("Transportation", "ഗതാഗതം"), icon: "🚌" },
              { label: t("Food & Nutrition", "ഭക്ഷണം"), icon: "🍽️" },
              { label: t("Infrastructure", "അടിസ്ഥാന സൗകര്യം"), icon: "🏗️" },
              { label: t("Staff Support", "ജീവനക്കാരുടെ പിന്തുണ"), icon: "👨‍🏫" },
              { label: t("Equipment", "ഉപകരണങ്ങൾ"), icon: "🎯" },
              { label: t("Activities", "പ്രവർത്തനങ്ങൾ"), icon: "🎨" },
              { label: t("Maintenance", "പരിപാലനം"), icon: "🛠️" },
            ].map((item, idx) => (
              <div key={idx} className="bg-warm-bg p-4 rounded-xl text-center border border-border">
                <span className="text-2xl block mb-2" aria-hidden="true">{item.icon}</span>
                <span className="text-text-muted text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
