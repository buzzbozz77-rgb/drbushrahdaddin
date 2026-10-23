// Single source of truth for everything the booking assistant is allowed to
// know and say. Composed from the same config/content already used
// elsewhere on the site — nothing here is invented for the assistant.

import { doctor } from "@/lib/content";
import { contact, socialLinks } from "@/config/contact";
import { serviceOptions, serviceDescriptions } from "@/config/services";
import { dictionary } from "@/lib/i18n";

export type Lang = "ar" | "en";

export function serviceList(lang: Lang) {
  return serviceOptions.map((s) => {
    const desc = serviceDescriptions.find((d) => d.slug === s.slug);
    return {
      slug: s.slug,
      label: lang === "ar" ? s.labelAr : s.labelEn,
      description: desc ? (lang === "ar" ? desc.descAr : desc.descEn) : "",
    };
  });
}

export const facts = {
  name: { ar: "الدكتورة بشرى مازن الحدادين", en: doctor.fullName },
  title: { ar: dictionary.ar.doctor.title, en: dictionary.en.doctor.title },
  bio: { ar: dictionary.ar.doctor.bio, en: dictionary.en.doctor.bio },
  credentials: doctor.credentials,
  city: { ar: contact.cityAr, en: contact.city },
  street: { ar: contact.streetAddressAr, en: contact.streetAddress },
  phone: contact.phoneDisplay,
  whatsapp: `https://wa.me/${contact.whatsappNumber}`,
  maps: contact.mapsHref,
  instagram: socialLinks.instagram.href,
  hours: contact.hours,
};

export function buildKnowledgeBlock(lang: Lang): string {
  const services = serviceList(lang)
    .map((s) => `- ${s.label}: ${s.description}`)
    .join("\n");

  const hours = facts.hours
    ? facts.hours.map((h) => `- ${lang === "ar" ? h.dayAr : h.dayEn}: ${h.hours}`).join("\n")
    : lang === "ar"
      ? "غير منشورة — اطلب من الشخص تأكيد الموعد عبر واتساب."
      : "Not published — ask the person to confirm a time on WhatsApp.";

  const location = facts.street[lang]
    ? `${facts.city[lang]}، ${facts.street[lang]}`
    : facts.city[lang];

  if (lang === "ar") {
    return `
الطبيبة: ${facts.name.ar}
التخصص: ${facts.title.ar}
نبذة: ${facts.bio.ar}
الشهادات والعضويات (كما هي، بدون شرح إضافي): ${facts.credentials.join("، ")}
الموقع: ${location}
خريطة الوصول: ${facts.maps}
الهاتف: ${facts.phone}
واتساب: ${facts.whatsapp}
إنستغرام: ${facts.instagram}
اللغات: العربية والإنجليزية

الخدمات:
${services}

ساعات العمل:
${hours}

طريقة الحجز: رسالة واتساب مباشرة، أو نموذج "احجز خطوتك الأولى" في الموقع، أو أداة "خطط رحلة ابتسامتك" التي تتيح اختيار الأسنان من الصورة وإرسال الطلب عبر واتساب. كل خطة علاج تبدأ بتقييم شخصي في العيادة.
الأسعار: غير منشورة، وتُحدَّد بعد التقييم.
`.trim();
  }

  return `
Doctor: ${facts.name.en}
Specialty: ${facts.title.en}
Bio: ${facts.bio.en}
Credentials and memberships (state as listed, do not expand or embellish): ${facts.credentials.join(", ")}
Location: ${location}
Directions: ${facts.maps}
Phone: ${facts.phone}
WhatsApp: ${facts.whatsapp}
Instagram: ${facts.instagram}
Languages: Arabic and English

Services:
${services}

Hours:
${hours}

How to book: message on WhatsApp, use the "Book your first step" form on the site, or the "Plan your smile journey" tool, which lets people pick teeth on a photo and send the request on WhatsApp. Every treatment plan starts with an in-person assessment.
Prices: not published; set after the assessment.
`.trim();
}
