"use client";

import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

type CaseItem = {
  src: string;
  alt: string;
  label: { ar: string; en: string };
  caption: { ar: string; en: string };
};

// عدّل النصوص هنا لتطابق كل صورة فعليًا — الوصف مكتوب بشكل عام لأنني لا أرى محتوى الصور.
const CASES: CaseItem[] = [
  {
    src: "/images/case-1.jpg",
    alt: "Dental case 1",
    label: { ar: "الحالة 1", en: "Case 1" },
    caption: {
      ar: "تحسين مظهر الابتسامة بخطة علاج مخصّصة.",
      en: "A smile enhancement with a tailored treatment plan.",
    },
  },
  {
    src: "/images/case-2.jpg",
    alt: "Dental case 2",
    label: { ar: "الحالة 2", en: "Case 2" },
    caption: {
      ar: "علاج يوازن بين الوظيفة والمظهر الطبيعي.",
      en: "Treatment balancing function and a natural look.",
    },
  },
  {
    src: "/images/case-3.jpg",
    alt: "Dental case 3",
    label: { ar: "الحالة 3", en: "Case 3" },
    caption: {
      ar: "عناية دقيقة بتفاصيل الأسنان واللثة.",
      en: "Careful attention to teeth and gum detail.",
    },
  },
];

export default function Gallery() {
  const { t } = useLocale();

  return (
    <section id="gallery" className="scroll-mt-nav mx-auto max-w-[1200px] px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="font-display text-heading text-white">{t.gallery.heading}</h2>
        <p className="mt-3 max-w-xl text-white/70">{t.gallery.subheading}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((item, i) => (
          <Reveal key={item.src} delay={i * 0.08}>
            <figure className="group overflow-hidden rounded-xl border border-white/10">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <figcaption className="px-5 py-4">
                <p className="text-sm font-medium text-white">
                  {item.label.ar} <span className="text-white/50">· {item.label.en}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{item.caption.ar}</p>
                <p className="text-sm leading-relaxed text-white/50" dir="ltr">
                  {item.caption.en}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="mt-8 text-xs text-white/50">
          النتائج تختلف من حالة لأخرى. · Results vary from case to case.
        </p>
      </Reveal>
    </section>
  );
}