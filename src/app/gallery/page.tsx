"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { galleryImages, galleryCategories } from "@/data/siteData";

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            {t("Gallery", "ഗാലറി")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t(
              "Moments from our school — activities, events, and everyday life.",
              "ഞങ്ങളുടെ സ്‌കൂളിൽ നിന്നുള്ള നിമിഷങ്ങൾ — പ്രവർത്തനങ്ങൾ, പരിപാടികൾ, ദൈനംദിന ജീവിതം."
            )}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-warm-bg text-text-muted border border-border hover:border-primary/30"
                }`}
              >
                {t(cat.label, cat.labelMl)}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((image, index) => (
              <button
                key={index}
                onClick={() => setLightboxImage(image.src)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                aria-label={`View ${t(image.caption, image.captionMl)}`}
              >
                <img
                  src={image.src}
                  alt={t(image.alt, image.altMl)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">
                      {t(image.caption, image.captionMl)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">
                {t("No images in this category yet.", "ഈ വിഭാഗത്തിൽ ഇതുവരെ ചിത്രങ്ങളില്ല.")}
              </p>
            </div>
          )}

          {/* Add More Photos Notice */}
          <div className="mt-12 text-center">
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 max-w-xl mx-auto">
              <p className="text-primary text-sm">
                {t(
                  "More photographs will be added as they are received from the school. Categories include: Historical, Students, Classrooms, Therapy, Vocational Training, Sports, Arts, Celebrations, and Events.",
                  "സ്‌കൂളിൽ നിന്ന് ലഭിക്കുന്ന ഫോട്ടോഗ്രാഫുകൾ ചേർക്കും. വിഭാഗങ്ങൾ: ചരിത്രം, വിദ്യാർത്ഥികൾ, ക്ലാസ്മുറികൾ, തെറാപ്പി, തൊഴിൽ പരിശീലനം, കായികം, കലകൾ, ആഘോഷങ്ങൾ, പരിപാടികൾ."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-accent transition-colors z-10"
            aria-label="Close image viewer"
          >
            ✕
          </button>
          <img
            src={lightboxImage}
            alt="Gallery image enlarged"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
}
