"use client";

import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

type CaseItem = {
  src: string;
  width: number;
  height: number;
  alt: { ar: string; en: string };
  label: { ar: string; en: string };
  caption: { ar: string; en: string };
};

// Only photos with no third-party watermark or clinic branding belong here.
const CASES: CaseItem[] = [
  {
    src: "/images/case-4.jpg",
    width: 1600,
    height: 900,
    alt: {
      ar: "قبل وبعد: أسنان أمامية علوية وسفلية بعد العلاج",
      en: "Before and after: upper and lower front teeth following treatment",
    },
    label: { ar: "ابتسامة كاملة", en: "Full smile" },
    caption: {
      ar: "تنظيف وتجديد كامل للأسنان الأمامية — اللقطة العلوية قبل، والسفلية بعد.",
      en: "A full front-teeth restoration — top frame before, bottom frame after.",
    },
  },
  {
    src: "/images/case-2.jpg",
    width: 480,
    height: 480,
    alt: {
      ar: "قبل وبعد: تبييض الأسنان",
      en: "Before and after: teeth whitening",
    },
    label: { ar: "تبييض", en: "Whitening" },
    caption: {
      ar: "فرق واضح في لون الأسنان — يسار قبل، يمين بعد.",
      en: "A clear shade difference — left before, right after.",
    },
  },
];

export default function Gallery() {
  const { locale, t } = useLocale();
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <section id="gallery" className="scroll-mt-nav mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      <Reveal>
        <h2 className="font-display text-heading-lg text-center text-white">{t.gallery.heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-white/70">{t.gallery.subheading}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[3fr_2fr]">
        {CASES.map((item, i) => (
          <Reveal key={item.src} delay={i * 0.1}>
            <figure className="group h-full overflow-hidden rounded-[24px] border border-white/15 bg-white/5">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <Image
                  src={item.src}
                  alt={item.alt[lang]}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <figcaption className="px-6 py-5">
                <p className="text-sm font-semibold text-white">{item.label[lang]}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.caption[lang]}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-white/50">{t.gallery.disclaimer}</p>
    </section>
  );
}
