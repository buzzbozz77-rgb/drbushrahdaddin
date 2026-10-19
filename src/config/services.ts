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
