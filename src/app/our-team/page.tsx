"use client";

import { useLanguage } from "@/context/LanguageContext";
import { management, staff } from "@/data/siteData";

export default function OurTeamPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("Our Team", "ഞങ്ങളുടെ ടീം")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "The dedicated people who make our school a nurturing and supportive environment for every student.",
              "ഞങ്ങളുടെ സ്‌കൂളിനെ ഓരോ വിദ്യാർത്ഥിക്കും പോഷിപ്പിക്കുന്ന ഒരു അന്തരീക്ഷമാക്കുന്ന സമർപ്പിത ആളുകൾ."
            )}
          </p>
        </div>
      </section>

      {/* Management */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8 text-center">
            {t("Management Committee", "മാനേജ്‌മെന്റ് കമ്മിറ്റി")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {management.map((person, index) => (
              <div
                key={index}
                className="bg-warm-bg p-6 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-heading font-bold text-2xl">
                      {person.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold text-text-dark">
                  {t(person.name, person.nameMl)}
                </h3>
                <p className="text-primary font-medium text-sm mt-1">
                  {t(person.position, person.positionMl)}
                </p>
                {person.phone && (
                  <p className="text-text-muted text-sm mt-2">
                    📞 <a href={`tel:+91${person.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{person.phone}</a>
                  </p>
                )}
                <p className="text-text-light text-xs mt-3 italic">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching & Support Staff */}
      <section className="py-16 lg:py-24 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8 text-center">
            {t("Teaching & Support Staff", "അധ്യാപകരും ജീവനക്കാരും")}
          </h2>

          <div className="bg-white p-8 rounded-2xl border border-border max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4">
                👩‍🏫
              </div>
              <p className="text-text-muted leading-relaxed mb-6">
                {t(
                  "Our school is staffed by dedicated professionals including special educators, physiotherapists, speech therapists, occupational therapists, vocational trainers, and support staff. Each member of our team is committed to providing the best possible care and education.",
                  "സ്‌പെഷ്യൽ എഡ്യൂക്കേറ്ററുകൾ, ഫിസിയോതെറാപ്പിസ്റ്റുകൾ, സ്‌പീച്ച് തെറാപ്പിസ്റ്റുകൾ, ഒക്കുപ്പേഷണൽ തെറാപ്പിസ്റ്റുകൾ, വൊക്കേഷണൽ ട്രെയിനർമാർ, സപ്പോർട്ട് സ്റ്റാഫ് എന്നിവരുൾപ്പെടെ സമർപ്പിത പ്രൊഫഷണലുകളാണ് ഞങ്ങളുടെ സ്‌കൂളിൽ."
                )}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { role: t("Special Educators", "സ്‌പെഷ്യൽ എഡ്യൂക്കേറ്ററുകൾ"), icon: "📚" },
                  { role: t("Physiotherapists", "ഫിസിയോതെറാപ്പിസ്റ്റുകൾ"), icon: "🏃" },
                  { role: t("Speech Therapists", "സ്‌പീച്ച് തെറാപ്പിസ്റ്റുകൾ"), icon: "🗣️" },
                  { role: t("Vocational Trainers", "വൊക്കേഷണൽ ട്രെയിനർമാർ"), icon: "🔧" },
                  { role: t("Administrative Staff", "ഭരണ ജീവനക്കാർ"), icon: "📋" },
                  { role: t("Support Staff", "സപ്പോർട്ട് സ്റ്റാഫ്"), icon: "🤝" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-warm-bg px-4 py-3 rounded-xl text-sm text-text-muted flex items-center gap-2">
                    <span aria-hidden="true">{item.icon}</span> {item.role}
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                <p className="text-primary text-sm italic">
                  {t(
                    "Detailed staff profiles will be added when provided by the school management.",
                    "വിശദമായ സ്റ്റാഫ് പ്രൊഫൈലുകൾ സ്‌കൂൾ മാനേജ്‌മെന്റ് നൽകുമ്പോൾ ചേർക്കും."
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
