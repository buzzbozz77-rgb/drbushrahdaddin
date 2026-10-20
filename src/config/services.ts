// Services shown across the site. These mirror the real services already
// published elsewhere on the site (src/lib/i18n.ts `services.items`) — the
// "Plan your smile journey" planner below reuses the same four treatments
// as its selectable options, nothing invented.

export type ServiceOption = {
  slug: "cosmetic-dentistry" | "dental-oral-surgery" | "botox-fillers" | "veneers-implants";
  labelEn: string;
  labelAr: string;
};

export const serviceOptions: ServiceOption[] = [
  { slug: "cosmetic-dentistry", labelEn: "Cosmetic Dentistry", labelAr: "تجميل الأسنان" },
  { slug: "dental-oral-surgery", labelEn: "Dental & Oral Surgery", labelAr: "جراحة الأسنان والفم" },
  { slug: "botox-fillers", labelEn: "Botox & Fillers", labelAr: "بوتوكس وفيلر" },
  { slug: "veneers-implants", labelEn: "Veneers & Implants", labelAr: "فينير وزراعة الأسنان" },
];

// Short, descriptive copy for the Services cards — deliberately general
// (no outcome promises or medical claims). needsReview: true on every entry
// because this wording is a draft and has NOT been confirmed by Dr. Bushra —
// please review and edit before this goes live.
export type ServiceDescription = {
  slug: ServiceOption["slug"];
  descEn: string;
  descAr: string;
  needsReview: boolean;
};

export const serviceDescriptions: ServiceDescription[] = [
  {
    slug: "cosmetic-dentistry",
    descEn:
      "Smile design, porcelain veneers, and professional whitening — planned around your facial proportions and the shade and shape that suit you.",
    descAr:
      "تصميم ابتسامة، فينير خزفي، وتبييض احترافي — بتخطيط يراعي تناسق ملامح وجهك واللون والشكل المناسبين لك.",
    needsReview: true,
  },
  {
    slug: "dental-oral-surgery",
    descEn:
      "Surgical and minor oral procedures carried out in a controlled clinical setting, following standard sterilization and safety protocols.",
    descAr:
      "إجراءات جراحية وعلاجات فموية بسيطة تتم ضمن بيئة عيادة مجهزة، وفق بروتوكولات تعقيم وسلامة معتمدة.",
    needsReview: true,
  },
  {
    slug: "botox-fillers",
    descEn:
      "Botox and dermal filler treatments administered by appointment, discussed and planned together before any procedure.",
    descAr: "جلسات بوتوكس وفيلر تتم بموعد مسبق، وبالتشاور الكامل معك قبل أي إجراء.",
    needsReview: true,
  },
  {
    slug: "veneers-implants",
    descEn:
      "Veneers and dental implants using modern materials, with each case assessed individually before a treatment plan is proposed.",
    descAr:
      "فينير وزراعة أسنان باستخدام مواد حديثة، وكل حالة تُقيَّم بشكل فردي قبل اقتراح خطة العلاج.",
    needsReview: true,
  },
];

export type PlannerGoal = {
  id: string;
  labelEn: string;
  labelAr: string;
};

export const plannerGoals: PlannerGoal[] = [
  { id: "whiter-smile", labelEn: "A whiter smile", labelAr: "ابتسامة أكثر بياضاً" },
  { id: "smile-design", labelEn: "Smile design / veneers", labelAr: "تصميم ابتسامة / فينير" },
  { id: "missing-tooth", labelEn: "Replace a missing tooth", labelAr: "تعويض سن مفقود" },
  { id: "facial-aesthetics", labelEn: "Facial aesthetics", labelAr: "تجميل الوجه" },
];

export type PlannerMethod = {
  id: string;
  labelEn: string;
  labelAr: string;
};

export const plannerMethods: PlannerMethod[] = [
  { id: "veneers", labelEn: "Veneers", labelAr: "فينير" },
  { id: "whitening", labelEn: "Whitening", labelAr: "تبييض" },
  { id: "implants", labelEn: "Implants", labelAr: "زراعة" },
  { id: "botox-fillers", labelEn: "Botox & Fillers", labelAr: "بوتوكس وفيلر" },
];

export type PatientType = {
  id: "new" | "returning";
  labelEn: string;
  labelAr: string;
};

export const patientTypes: PatientType[] = [
  { id: "new", labelEn: "New patient", labelAr: "مريض جديد" },
  { id: "returning", labelEn: "Returning patient", labelAr: "مريض عائد" },
];

// Estimated cost/duration per treatment — left null until Dr. Bushra provides
// real figures. StatsStrip-style rule: null hides it, nothing is invented.
export type TreatmentEstimate = {
  methodId: string;
  durationEn: string | null;
  durationAr: string | null;
  costRangeEn: string | null;
  costRangeAr: string | null;
};

export const treatmentEstimates: TreatmentEstimate[] = plannerMethods.map((m) => ({
  methodId: m.id,
  durationEn: null,
  durationAr: null,
  costRangeEn: null,
  costRangeAr: null,
}));
