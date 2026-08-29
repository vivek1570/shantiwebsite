"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { navLinks, schoolInfo } from "@/data/siteData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo / School Name */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            aria-label={`${schoolInfo.currentName} - Home`}
          >
            <img
              src="/images/logo.jpg"
              alt="School Logo"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-md object-cover"
            />
            <div className="hidden sm:block">
              <p className="text-sm lg:text-base font-heading font-bold text-primary leading-tight max-w-[260px]">
                {t(schoolInfo.currentName, schoolInfo.currentNameMl)}
              </p>
              <p className="text-xs text-text-muted">
                {t(schoolInfo.location, schoolInfo.locationMl)},{" "}
                {t("Kerala", "കേരളം")}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-dark hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              >
                {t(link.label, link.labelMl)}
              </Link>
            ))}
          </div>

          {/* Language Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-sm font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
              aria-label={`Switch to ${lang === "en" ? "Malayalam" : "English"}`}
            >
              {lang === "en" ? "മലയാളം" : "English"}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-text-dark hover:bg-gray-100 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-border mt-2 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-base font-medium text-text-dark hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  {t(link.label, link.labelMl)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
