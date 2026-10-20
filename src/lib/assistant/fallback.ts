// Keyword/intent matcher used whenever the LLM provider is unavailable or a
// request fails. Covers Arabic (including common Jordanian colloquial forms)
// and English. Always returns a normal-sounding reply — never an error.

import { contact } from "@/config/contact";
import { serviceOptions } from "@/config/services";
import { doctor } from "@/lib/content";

type Intent = "booking" | "services" | "location" | "hours" | "contact" | "emergency" | "greeting" | "unknown";

const PATTERNS: { intent: Intent; words: string[] }[] = [
  {
    intent: "emergency",
    words: ["طوارئ", "وجع", "ألم شديد", "بينزف", "نزيف", "طقت سنتي", "emergency", "severe pain", "bleeding"],
  },
  {
    intent: "booking",
    words: ["حجز", "موعد", "احجز", "بدي احجز", "عايز احجز", "book", "appointment", "schedule"],
  },
  {
    intent: "services",
    words: ["خدمات", "خدمة", "تبييض", "فينير", "زراعة", "بوتوكس", "فيلر", "service", "services", "whitening", "veneers", "implants", "botox", "filler"],
  },
  {
    intent: "location",
    words: ["وين", "موقع", "عنوان", "فين العيادة", "location", "address", "where"],
  },
  {
    intent: "hours",
    words: ["دوام", "ساعات", "متى فاتحين", "وقت الدوام", "hours", "open", "closing"],
  },
  {
    intent: "contact",
    words: ["رقم", "تواصل", "واتساب", "اتصال", "contact", "phone", "whatsapp", "call"],
  },
  {
    intent: "greeting",
    words: ["مرحبا", "هلا", "السلام عليكم", "صباح الخير", "مساء الخير", "hi", "hello", "hey"],
  },
];

function detectIntent(text: string): Intent {
  const normalized = text.toLowerCase();
  for (const { intent, words } of PATTERNS) {
    if (words.some((w) => normalized.includes(w.toLowerCase()))) return intent;
  }
  return "unknown";
}

export function fallbackReply(lastUserMessage: string, locale: "ar" | "en"): string {
  const intent = detectIntent(lastUserMessage);
  const wa = `https://wa.me/${contact.whatsappNumber}`;

  if (locale === "ar") {
    switch (intent) {
      case "emergency":
        return `هاي حالة بتحتاج تواصل مباشر وسريع. تواصل معنا الآن عالواتساب: ${wa} أو اتصل على ${contact.phoneDisplay}.`;
      case "booking":
        return `تمام، تقدر تحجز موعدك مباشرة عالواتساب وراح نأكدلك الموعد: ${wa}`;
      case "services": {
        const list = serviceOptions.map((s) => s.labelAr).join("، ");
        return `الخدمات المتوفرة عند ${doctor.fullName}: ${list}. حاب تحجز موعد لأي منها؟`;
      }
      case "location":
        return `العيادة في ${contact.cityAr}. تقدر تفتح الموقع على الخريطة من هون: ${contact.mapsHref}`;
      case "hours":
        return `ساعات الدوام بتختلف حسب اليوم — تواصل معنا عالواتساب وراح نأكدلك أقرب وقت فاضي: ${wa}`;
      case "contact":
        return `تقدر تتواصل معنا مباشرة عالواتساب: ${wa} أو عالهاتف: ${contact.phoneDisplay}`;
      case "greeting":
        return `هلا فيك! أنا مساعد الحجز الآلي عند ${doctor.fullName}. تحب تحجز موعد، تسأل عن خدمة، أو تعرف موقع العيادة؟`;
      default:
        return `ما قدرت ألاقي جواب أكيد لهالسؤال من عندي. تواصل مباشرة عالواتساب وفريق العيادة راح يردولك: ${wa}`;
    }
  }

  switch (intent) {
    case "emergency":
      return `That sounds urgent — please reach out directly right away on WhatsApp: ${wa} or call ${contact.phoneDisplay}.`;
    case "booking":
      return `Sure — you can book directly on WhatsApp and we'll confirm your appointment: ${wa}`;
    case "services": {
      const list = serviceOptions.map((s) => s.labelEn).join(", ");
      return `${doctor.fullName}'s services include: ${list}. Want to book a visit for one of them?`;
    }
    case "location":
      return `The clinic is in ${contact.city}. Here's the map link: ${contact.mapsHref}`;
    case "hours":
      return `Hours vary by day — message us on WhatsApp and we'll confirm the nearest available slot: ${wa}`;
    case "contact":
      return `You can reach us directly on WhatsApp: ${wa} or by phone: ${contact.phoneDisplay}`;
    case "greeting":
      return `Hi! I'm ${doctor.fullName}'s automated booking assistant. Want to book a visit, ask about a service, or get directions?`;
    default:
      return `I'm not sure about that one — our team can help directly on WhatsApp: ${wa}`;
  }
}
