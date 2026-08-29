"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { schoolInfo, navLinks, bankDetails } from "@/data/siteData";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="School Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-heading font-bold text-lg leading-tight">
                  {t(schoolInfo.currentName, schoolInfo.currentNameMl)}
                </h3>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {t(schoolInfo.tagline, schoolInfo.taglineMl)}
            </p>
            <p className="text-white/70 text-sm">
              {t(schoolInfo.fullAddress, schoolInfo.fullAddressMl)}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">
              {t("Quick Links", "പെട്ടെന്നുള്ള ലിങ്കുകൾ")}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-accent text-sm transition-colors duration-200"
                  >
                    {t(link.label, link.labelMl)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">
              {t("Contact Us", "ബന്ധപ്പെടുക")}
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5" aria-hidden="true">📍</span>
                <span>{t(schoolInfo.fullAddress, schoolInfo.fullAddressMl)}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">📞</span>
                <span>{schoolInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">✉️</span>
                <span>{schoolInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Donate */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">
              {t("Support Us", "ഞങ്ങളെ സഹായിക്കൂ")}
            </h4>
            <p className="text-white/80 text-sm mb-4">
              {t(
                "Your support helps us continue providing education and care to differently-abled students.",
                "ഭിന്നശേഷി വിദ്യാർത്ഥികൾക്ക് വിദ്യാഭ്യാസവും പരിചരണവും നൽകുന്നത് തുടരാൻ നിങ്ങളുടെ പിന്തുണ സഹായിക്കുന്നു."
              )}
            </p>
            <Link
              href="/support"
              className="inline-flex items-center px-5 py-2.5 bg-accent text-text-dark font-semibold rounded-full hover:bg-accent-light transition-colors text-sm"
            >
              {t("Donate Now", "ഇപ്പോൾ സംഭാവന ചെയ്യൂ")} →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()}{" "}
                {t(schoolInfo.currentName, schoolInfo.currentNameMl)}.{" "}
                {t("All rights reserved.", "എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.")}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {t(
                  `Formerly known as ${schoolInfo.historicalName}`,
                  `മുമ്പ് ${schoolInfo.historicalNameMl} എന്നറിയപ്പെട്ടിരുന്നു`
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-white/50 text-xs">
                {t("Registration:", "രജിസ്ട്രേഷൻ:")}{" "}
                {schoolInfo.registration} | {schoolInfo.taxExemption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
