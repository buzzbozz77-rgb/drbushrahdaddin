"use client";

import { serviceSlugs } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

const icons: Record<(typeof serviceSlugs)[number], React.ReactNode> = {
  "cosmetic-dentistry": (
    <path d="M12 3c2.5 0 4.5 1.5 4.5 4.5 0 2-.6 3.3-1 5.3-.4 2-.7 4.2-2 6.2-.4.6-1 1-1.5 1s-1.1-.4-1.5-1c-1.3-2-1.6-4.2-2-6.2-.4-2-1-3.3-1-5.3C7.5 4.5 9.5 3 12 3Z" />
  ),
  "dental-oral-surgery": (
    <>
      <path d="M7 3l4 4-6 6a2.8 2.8 0 1 0 4 4l6-6 4 4" />
      <path d="M16 3l-3 3" />
    </>
  ),
  "botox-fillers": (
    <>
      <rect x="9" y="3" width="6" height="7" rx="1" />
      <path d="M11 10v10M13 10v10M9 14h6" />
    </>
  ),
  "veneers-implants": (
    <>
      <path d="M12 3l6 3v4c0 4.5-2.6 7.9-6 11-3.4-3.1-6-6.5-6-11V6l6-3Z" />
      <path d="M9 11l2 2 4-4" />
    </>
  ),
};

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      <div className="rounded-[32px] bg-ink px-6 py-14 text-white md:px-14 md:py-20">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-white">
            {t.services.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/70">
            {t.services.subheading}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {serviceSlugs.map((slug, i) => {
            const item = t.services.items[i];
            return (
              <Reveal key={slug} delay={i * 0.07}>
                <div className="h-full overflow-hidden rounded-2xl bg-white/5">
                  <div
                    className="flex aspect-[16/10] items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, rgba(42,95,217,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08), transparent 55%)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.85}
                    >
                      {icons[slug]}
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-subheading text-white">{item.name}</h3>
                    <p className="mt-2 text-sm text-white/65">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
