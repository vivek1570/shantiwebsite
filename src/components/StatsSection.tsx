"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { statistics } from "@/data/siteData";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated && target > 0) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">
      {target > 0 ? `${count}${suffix}` : "—"}
    </div>
  );
}

export default function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-white" aria-label="Our impact in numbers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            {t("Our Impact", "ഞങ്ങളുടെ സ്വാധീനം")}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t(
              "Over two decades of dedicated service to differently-abled children and their families.",
              "ഭിന്നശേഷി കുട്ടികൾക്കും അവരുടെ കുടുംബങ്ങൾക്കും രണ്ട് പതിറ്റാണ്ടിലേറെ സമർപ്പിത സേവനം."
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statistics.current.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 lg:p-8 rounded-2xl bg-warm-bg border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <AnimatedCounter
                target={stat.numericValue}
                suffix={stat.value.includes("+") ? "+" : ""}
              />
              <p className="mt-3 text-text-muted font-medium text-sm sm:text-base">
                {t(stat.label, stat.labelMl)}
              </p>
              {stat.value.includes("[TO BE VERIFIED]") && (
                <p className="mt-1 text-xs text-text-light italic">
                  {t("[To be updated]", "[അപ്ഡേറ്റ് ചെയ്യേണ്ടത്]")}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Historical context */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-warm-card px-6 py-3 rounded-full border border-border">
            <span className="text-accent text-xl" aria-hidden="true">📜</span>
            <p className="text-text-muted text-sm">
              {t(
                `In ${statistics.historical[0].value}, we started with just ${statistics.historical[1].value} students. Today, we continue to grow.`,
                `${statistics.historical[0].value}-ൽ, ഞങ്ങൾ ${statistics.historical[1].value} വിദ്യാർത്ഥികളുമായി ആരംഭിച്ചു. ഇന്ന് ഞങ്ങൾ വളർന്നുകൊണ്ടിരിക്കുന്നു.`
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
