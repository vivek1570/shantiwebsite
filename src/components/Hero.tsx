"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { schoolInfo } from "@/data/siteData";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/shanti_cover.jpg')" }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* School Logo */}
        <div className="mb-6 animate-fade-in-up">
          <img
            src="/images/logo.jpg"
            alt="P. Balakrishnan Master Memorial Special School Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full mx-auto shadow-xl border-4 border-white/30 object-cover"
          />
        </div>

        {/* Organization */}
        <p className="text-accent font-medium text-sm sm:text-base tracking-wide uppercase mb-4 animate-fade-in-up">
          {t(schoolInfo.organization, schoolInfo.organizationMl)}
        </p>

        {/* School name */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
          {t(schoolInfo.currentName, schoolInfo.currentNameMl)}
        </h1>

        {/* Location */}
        <p className="text-white/80 text-lg sm:text-xl font-medium mb-6 drop-shadow-md">
          {t(schoolInfo.location, schoolInfo.locationMl)},{" "}
          {t(schoolInfo.district, schoolInfo.districtMl)},{" "}
          {t("Kerala", "കേരളം")}
        </p>

        {/* Motto */}
        <p className="text-accent/90 italic text-base sm:text-lg mb-4 drop-shadow-md">
          &ldquo;{t(schoolInfo.motto, schoolInfo.mottoMl)}&rdquo;
        </p>

        {/* Tagline */}
        <p className="text-white/85 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          {t(schoolInfo.tagline, schoolInfo.taglineMl)}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/our-story"
            className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-300 shadow-md"
          >
            {t("Discover Our Story", "ഞങ്ങളുടെ കഥ അറിയൂ")}
          </Link>
          <Link
            href="/support"
            className="w-full sm:w-auto px-8 py-4 bg-secondary text-white font-bold rounded-full text-lg hover:bg-secondary-light hover:shadow-lg transition-all duration-300 shadow-md animate-subtle-pulse"
          >
            {t("Support Our School", "ഞങ്ങളുടെ സ്‌കൂളിനെ സഹായിക്കൂ")}
          </Link>
        </div>

        {/* Founding badge */}
        <div className="mt-12 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20">
          <span className="text-accent text-lg" aria-hidden="true">🌱</span>
          <span className="text-white/90 text-sm font-medium">
            {t(
              `Est. ${schoolInfo.foundedDate} — A journey that began with ${schoolInfo.initialStudents} children`,
              `${schoolInfo.foundedDateMl} സ്ഥാപിതം — ${schoolInfo.initialStudents} കുട്ടികളിൽ നിന്ന് ആരംഭിച്ച യാത്ര`
            )}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
