// Single source of truth for everything the booking assistant is allowed to
// know and say. Composed from the same config/content already used
// elsewhere on the site — nothing here is invented for the assistant.

import { doctor } from "@/lib/content";
import { contact } from "@/config/contact";
import { serviceOptions, serviceDescriptions } from "@/config/services";

export function buildKnowledgeBlock(locale: "ar" | "en"): string {
  const services = serviceOptions
    .map((s) => {
      const desc = serviceDescriptions.find((d) => d.slug === s.slug);
      const label = locale === "ar" ? s.labelAr : s.labelEn;
      const description = desc ? (locale === "ar" ? desc.descAr : desc.descEn) : "";
      return `- ${label}: ${description}`;
    })
    .join("\n");

  const hours = contact.hours
    ? contact.hours
        .map((h) => `- ${locale === "ar" ? h.dayAr : h.dayEn}: ${h.hours}`)
        .join("\n")
    : locale === "ar"
      ? "غير محددة حالياً — يُطلب من المريض التواصل مباشرة لتأكيد الموعد."
      : "Not published yet — ask the patient to confirm the exact time directly.";

  const location =
    locale === "ar"
      ? `${contact.cityAr}${contact.streetAddressAr ? `، ${contact.streetAddressAr}` : ""}`
      : `${contact.city}${contact.streetAddress ? `, ${contact.streetAddress}` : ""}`;

  if (locale === "ar") {
    return `
اسم الطبيبة: ${doctor.fullName}
التخصص: طب الأسنان التجميلي والتجميل الوجهي
الموقع: ${location}
رقم الهاتف: ${contact.phoneDisplay}
واتساب: متاح عبر رقم العيادة
روابط الموقع (خرائط): ${contact.mapsHref}

الخدمات المتوفرة:
${services}

ساعات العمل:
${hours}
`.trim();
  }

  return `
Doctor: ${doctor.fullName}
Specialty: Cosmetic & aesthetic dentistry
Location: ${location}
Phone: ${contact.phoneDisplay}
WhatsApp: available on the clinic number
Directions: ${contact.mapsHref}

Services offered:
${services}

Hours:
${hours}
`.trim();
}
