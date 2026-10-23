// Rule-based assistant used whenever no LLM key is configured or a model
// call fails. Understands Arabic (MSA + Jordanian/Levantine colloquial) and
// English, answers in the language the person wrote in, and only ever says
// what's in src/config/assistant-knowledge.ts.

import { facts, serviceList, type Lang } from "@/config/assistant-knowledge";
import type { ChatMessage } from "./provider";

type Intent =
  | "emergency"
  | "price"
  | "booking"
  | "about"
  | "credentials"
  | "service:cosmetic-dentistry"
  | "service:dental-oral-surgery"
  | "service:botox-fillers"
  | "service:veneers-implants"
  | "services"
  | "location"
  | "hours"
  | "contact"
  | "instagram"
  | "language"
  | "thanks"
  | "bye"
  | "greeting"
  | "unknown";

// Order matters: safety first, then the most specific intents.
const PATTERNS: { intent: Intent; words: string[] }[] = [
  {
    intent: "emergency",
    words: [
      "طوارئ", "طارئ", "وجع شديد", "الم شديد", "بنزف", "نزيف", "ورم", "انتفاخ", "حادث", "انكسر", "انكسرت", "طقت", "سخونه", "حراره",
      "emergency", "urgent", "bleeding", "swelling", "severe pain", "broken tooth", "knocked out", "abscess",
    ],
  },
  {
    intent: "price",
    words: ["سعر", "اسعار", "بكم", "قديش", "كم بكلف", "كم سعر", "تكلفه", "خصم", "price", "cost", "how much", "fee", "discount", "offer"],
  },
  {
    intent: "booking",
    words: ["احجز", "حجز", "موعد", "مواعيد", "بدي اجي", "بدي ازور", "زياره", "استشاره", "كشف", "book", "appointment", "schedule", "consultation", "visit", "reserve"],
  },
  {
    intent: "credentials",
    words: ["شهاد", "دراس", "درست", "جامعه", "خبره", "مؤهل", "عضويه", "certif", "qualif", "degree", "studied", "university", "credential", "experience", "trained", "rcsi"],
  },
  {
    intent: "service:botox-fillers",
    words: ["بوتوكس", "فيلر", "تعبئه", "شفايف", "تجاعيد", "botox", "filler", "lips", "wrinkle"],
  },
  {
    intent: "service:veneers-implants",
    words: ["فينير", "زراعه", "زرعه", "تلبيس", "ابتسامه هوليوود", "هوليوود", "سن مفقود", "veneer", "implant", "hollywood smile", "missing tooth", "crown"],
  },
  {
    intent: "service:dental-oral-surgery",
    words: ["جراح", "خلع", "ضرس العقل", "عقل", "surgery", "extraction", "wisdom tooth", "pull a tooth"],
  },
  {
    intent: "service:cosmetic-dentistry",
    words: ["تبييض", "تجميل", "تصميم ابتسامه", "ابتسامه", "اصفرار", "لون", "whiten", "bleach", "cosmetic", "smile design", "smile makeover", "yellow"],
  },
  {
    intent: "about",
    words: ["مين الدكتوره", "مين هي", "عن الدكتوره", "الدكتوره بشرى", "بشرى", "who is", "about the doctor", "about dr", "tell me about", "bushra", "doctor"],
  },
  {
    intent: "services",
    words: ["خدمات", "خدمه", "شو بتعملو", "شو بتعملي", "علاجات", "تخصص", "service", "treatment", "what do you do", "what do you offer"],
  },
  {
    intent: "location",
    words: ["وين", "فين", "موقع", "عنوان", "مكان", "خريطه", "اتجاهات", "عمان", "where", "location", "address", "directions", "map"],
  },
  {
    intent: "hours",
    words: ["دوام", "ساعات", "متى", "امتى", "فاتحين", "مفتوح", "يوم الجمعه", "hours", "open", "opening", "close", "closing", "when"],
  },
  {
    intent: "instagram",
    words: ["انستا", "انستغرام", "انستجرام", "سوشال", "instagram", "insta", "social"],
  },
  {
    intent: "contact",
    words: ["رقم", "تلفون", "هاتف", "تواصل", "اتصل", "واتس", "واتساب", "phone", "number", "contact", "call", "whatsapp"],
  },
  {
    intent: "language",
    words: ["انجليزي", "عربي", "english", "arabic", "do you speak"],
  },
  { intent: "thanks", words: ["شكرا", "يسلمو", "يعطيك العافيه", "مشكور", "thank", "thanks", "appreciate"] },
  { intent: "bye", words: ["باي", "مع السلامه", "bye", "goodbye", "see you"] },
  {
    intent: "greeting",
    words: ["مرحبا", "مرحبتين", "هلا", "اهلين", "اهلا", "السلام عليكم", "صباح", "مساء", "hi", "hello", "hey", "good morning", "good evening"],
  },
];

// Strip Arabic diacritics/tatweel and fold letter variants so "أسعار",
// "اسعار" and "إسعار" (and ة/ه, ى/ي) all match the same keyword.
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

const NORMALIZED = PATTERNS.map((p) => ({ intent: p.intent, words: p.words.map(normalize) }));

function hasWord(text: string, word: string): boolean {
  // Short Latin keywords ("hi", "just") must match as whole words, otherwise
  // "this" would read as a greeting and "adjust" as a credentials question.
  if (/^[a-z]{1,4}$/.test(word)) return new RegExp(`\\b${word}\\b`).test(text);
  return text.includes(word);
}

export function detectIntent(message: string): Intent {
  const text = normalize(message);
  for (const { intent, words } of NORMALIZED) {
    if (words.some((w) => hasWord(text, w))) return intent;
  }
  return "unknown";
}

export function detectLang(message: string, fallback: Lang): Lang {
  if (/[؀-ۿ]/.test(message)) return "ar";
  if (/[a-z]/i.test(message)) return "en";
  return fallback;
}

function serviceReply(slug: string, lang: Lang): string {
  const s = serviceList(lang).find((x) => x.slug === slug);
  if (!s) return "";
  return lang === "ar"
    ? `${s.label}: ${s.description}\n\nتحب أحجزلك استشارة؟ ابعتلي اسمك واليوم اللي بناسبك، أو اضغط "تابع عبر واتساب".`
    : `${s.label}: ${s.description}\n\nWould you like to book a consultation? Send your name and a day that suits you, or tap "Continue on WhatsApp".`;
}

function hasAskedBefore(history: ChatMessage[], intent: Intent): boolean {
  return history
    .slice(0, -1)
    .some((m) => m.role === "user" && detectIntent(m.content) === intent);
}

export function fallbackReply(history: ChatMessage[], uiLang: Lang): string {
  const last = [...history].reverse().find((m) => m.role === "user")?.content ?? "";
  const lang = detectLang(last, uiLang);
  const intent = detectIntent(last);
  const ar = lang === "ar";
  const name = facts.name[lang];
  const wa = facts.whatsapp;

  if (intent.startsWith("service:")) return serviceReply(intent.slice("service:".length), lang);

  switch (intent) {
    case "emergency":
      return ar
        ? `سلامتك! هاي حالة بتحتاج تواصل مباشر مع العيادة — اتصل على ${facts.phone} أو ابعت واتساب فوراً: ${wa}\nإذا الحالة شديدة جداً (نزيف لا يتوقف أو انتفاخ يصعّب التنفس) توجّه لأقرب طوارئ.`
        : `Sorry you're dealing with that. Please contact the clinic directly — call ${facts.phone} or WhatsApp right away: ${wa}\nIf it's severe (bleeding that won't stop, or swelling that affects breathing), go to the nearest emergency department.`;

    case "price":
      return ar
        ? `الأسعار بتختلف حسب الحالة، وبتتحدد بعد التقييم في العيادة — ما في سعر ثابت بقدر أعطيك إياه من هون. ابعتلنا على واتساب ونرتبلك استشارة: ${wa}`
        : `Pricing depends on each case and is set after an in-person assessment, so there's no fixed figure I can quote here. Message us on WhatsApp to arrange a consultation: ${wa}`;

    case "booking":
      return ar
        ? `أكيد! أسهل طريقة إنك تبعتلنا على واتساب: الاسم، الخدمة اللي بتهمك، واليوم المناسب إلك — والعيادة بتأكدلك الموعد.\n${wa}\nأو استخدم زر "تابع عبر واتساب" تحت وبنجهزلك الرسالة.`
        : `Of course! The quickest way is a WhatsApp message with your name, the treatment you're interested in, and a day that suits you — the clinic will confirm.\n${wa}\nOr tap "Continue on WhatsApp" below and the message is drafted for you.`;

    case "about":
      return ar
        ? `${facts.bio.ar}\n\nالشهادات والعضويات: ${facts.credentials.join("، ")}.\nتحب تعرف عن خدمة معينة أو تحجز استشارة؟`
        : `${facts.bio.en}\n\nCredentials and memberships: ${facts.credentials.join(", ")}.\nWould you like to hear about a specific treatment, or book a consultation?`;

    case "credentials":
      return ar
        ? `${name} — ${facts.title.ar}.\nالشهادات والعضويات: ${facts.credentials.join("، ")}.\nلأي تفاصيل أكثر عن خبرتها بحالة معينة، الأفضل تسأل مباشرة بالاستشارة.`
        : `${name} — ${facts.title.en}.\nCredentials and memberships: ${facts.credentials.join(", ")}.\nFor anything more specific about her experience with a particular case, it's best to ask during the consultation.`;

    case "services": {
      const list = serviceList(lang)
        .map((s) => `• ${s.label}`)
        .join("\n");
      return ar
        ? `هاي الخدمات المتوفرة عند ${name}:\n${list}\n\nاكتبلي اسم أي خدمة وبحكيلك عنها أكثر.`
        : `Here's what ${name} offers:\n${list}\n\nType the name of any one and I'll tell you more about it.`;
    }

    case "location": {
      const where = facts.street[lang] ? `${facts.city[lang]}، ${facts.street[lang]}` : facts.city[lang];
      return ar
        ? `العيادة في ${where}. الموقع على الخريطة: ${facts.maps}`
        : `The clinic is in ${where}. Directions: ${facts.maps}`;
    }

    case "hours":
      if (facts.hours) {
        const rows = facts.hours.map((h) => `• ${ar ? h.dayAr : h.dayEn}: ${h.hours}`).join("\n");
        return ar ? `ساعات الدوام:\n${rows}` : `Opening hours:\n${rows}`;
      }
      return ar
        ? `المواعيد بتترتب حسب الجدول، فالأفضل تبعتلنا على واتساب واليوم اللي بناسبك، والعيادة بتأكدلك أقرب وقت: ${wa}`
        : `Appointments are arranged around the schedule, so the best way is to message us on WhatsApp with a day that suits you and the clinic will confirm the nearest slot: ${wa}`;

    case "contact":
      return ar
        ? `واتساب: ${wa}\nهاتف: ${facts.phone}`
        : `WhatsApp: ${wa}\nPhone: ${facts.phone}`;

    case "instagram":
      return ar
        ? `تابع أعمال الدكتورة على إنستغرام: ${facts.instagram}`
        : `You can follow the doctor's work on Instagram: ${facts.instagram}`;

    case "language":
      return ar
        ? "بقدر أساعدك بالعربي أو بالإنجليزي — اكتب باللغة اللي بتريحك."
        : "I can help in English or Arabic — write in whichever you prefer.";

    case "thanks":
      return ar ? "العفو! إذا احتجت أي إشي ثاني أنا هون." : "You're welcome! I'm here if you need anything else.";

    case "bye":
      return ar ? "مع السلامة، ونشوفك قريباً بالعيادة!" : "Take care — hope to see you at the clinic soon!";

    case "greeting":
      return hasAskedBefore(history, "greeting")
        ? ar
          ? "أهلين مرة ثانية! كيف بقدر أساعدك؟"
          : "Hi again! How can I help?"
        : ar
          ? `أهلاً وسهلاً! أنا المساعد الآلي للحجز عند ${name}. بقدر أحكيلك عن الخدمات، الموقع، أو أساعدك تحجز موعد.`
          : `Hello and welcome! I'm ${name}'s automated booking assistant. I can tell you about treatments, how to find the clinic, or help you book.`;

    default:
      return ar
        ? `ما عندي جواب أكيد على هاد السؤال، وما بحب أعطيك معلومة مش دقيقة. فريق العيادة بجاوبك مباشرة على واتساب: ${wa}\nأو اسألني عن: الخدمات، الدكتورة، الموقع، أو الحجز.`
        : `I don't have a reliable answer to that, and I'd rather not guess. The clinic team can answer directly on WhatsApp: ${wa}\nOr ask me about treatments, the doctor, the location, or booking.`;
  }
}
