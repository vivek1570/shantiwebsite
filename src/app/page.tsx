"use client";

import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import OriginStory from "@/components/OriginStory";
import StatsSection from "@/components/StatsSection";
import ProgramsPreview from "@/components/ProgramsPreview";
import Timeline from "@/components/Timeline";
import DonationSection from "@/components/DonationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQAccordion from "@/components/FAQAccordion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />
      <NewsTicker />
      <OriginStory />
      <StatsSection />
      <ProgramsPreview />
      <Timeline />

      {/* Students work & Life at School */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Life at our school">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
              {t("Life at Our School", "ഞങ്ങളുടെ സ്‌കൂളിലെ ജീവിതം")}
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {t(
                "A glimpse into the activities, achievements, and everyday moments that make our school a vibrant community.",
                "ഞങ്ങളുടെ സ്‌കൂളിനെ ഒരു ഊർജ്ജസ്വലമായ സമൂഹമാക്കുന്ന പ്രവർത്തനങ്ങൾ, നേട്ടങ്ങൾ, ദൈനംദിന നിമിഷങ്ങൾ."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-md">
              <img
                src="/images/photo-collage-shanti.png"
                alt="Students engaged in various activities at the school"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-warm-bg p-6 rounded-2xl border border-border">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                  {t("Student Activities", "വിദ്യാർത്ഥി പ്രവർത്തനങ്ങൾ")}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(
                    "Our students participate in arts, crafts, music, sports, and vocational activities, building skills and confidence every day.",
                    "ഞങ്ങളുടെ വിദ്യാർത്ഥികൾ കലകൾ, കരകൗശലം, സംഗീതം, കായികം, തൊഴിൽ പ്രവർത്തനങ്ങൾ എന്നിവയിൽ പങ്കെടുക്കുന്നു."
                  )}
                </p>
              </div>
              <div className="bg-warm-bg p-6 rounded-2xl border border-border">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                  {t("Student Work", "വിദ്യാർത്ഥി സൃഷ്ടികൾ")}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(
                    "From crafts to cleaning products, our students create products that showcase their abilities and developing skills.",
                    "കരകൗശല വസ്തുക്കൾ മുതൽ ശുചീകരണ ഉൽപ്പന്നങ്ങൾ വരെ, ഞങ്ങളുടെ വിദ്യാർത്ഥികൾ അവരുടെ കഴിവുകൾ പ്രദർശിപ്പിക്കുന്ന ഉൽപ്പന്നങ്ങൾ സൃഷ്ടിക്കുന്നു."
                  )}
                </p>
              </div>
              <Link
                href="/gallery"
                className="block text-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
              >
                {t("View Gallery", "ഗാലറി കാണുക")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Preview */}
      <section className="py-16 lg:py-24 bg-warm-bg" aria-label="Our people">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
              {t("Our People", "ഞങ്ങളുടെ ആളുകൾ")}
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {t(
                "Dedicated teachers, therapists, and staff who make our school a nurturing place for every student.",
                "ഞങ്ങളുടെ സ്‌കൂളിനെ ഓരോ വിദ്യാർത്ഥിക്കും പോഷിപ്പിക്കുന്ന ഒരു ഇടമാക്കുന്ന സമർപ്പിത അധ്യാപകർ, തെറാപ്പിസ്റ്റുകൾ, ജീവനക്കാർ."
              )}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-border max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4">
              <span aria-hidden="true">👥</span>
            </div>
            <p className="text-text-muted leading-relaxed mb-6">
              {t(
                "Our school is supported by dedicated teachers, special educators, therapists, vocational trainers, and administrative staff who work together to provide the best possible care and education for our students.",
                "സമർപ്പിത അധ്യാപകർ, സ്‌പെഷ്യൽ എഡ്യൂക്കേറ്ററുകൾ, തെറാപ്പിസ്റ്റുകൾ, വൊക്കേഷണൽ ട്രെയിനർമാർ, ഭരണ ജീവനക്കാർ എന്നിവർ ഒരുമിച്ച് പ്രവർത്തിക്കുന്നു."
              )}
            </p>
            <Link
              href="/our-team"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
            >
              {t("Meet Our Team", "ഞങ്ങളുടെ ടീമിനെ പരിചയപ്പെടൂ")} →
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <DonationSection />

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-warm-bg" aria-label="Call to action">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            {t("Be Part of the Journey", "യാത്രയുടെ ഭാഗമാകൂ")}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            {t(
              "Whether you donate, volunteer, or simply spread the word — every act of support makes a difference in the lives of our students.",
              "നിങ്ങൾ സംഭാവന ചെയ്താലും, വോളണ്ടിയർ ചെയ്താലും, അല്ലെങ്കിൽ വാക്ക് പ്രചരിപ്പിച്ചാലും — ഓരോ പിന്തുണയും ഞങ്ങളുടെ വിദ്യാർത്ഥികളുടെ ജീവിതത്തിൽ മാറ്റമുണ്ടാക്കുന്നു."
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/support"
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-white font-bold rounded-full text-lg hover:bg-secondary-light transition-colors shadow-md"
            >
              {t("Support Us Today", "ഇന്ന് ഞങ്ങളെ സഹായിക്കൂ")}
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full text-lg border-2 border-primary hover:bg-primary hover:text-white transition-all"
            >
              {t("Contact Us", "ബന്ധപ്പെടുക")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
