// Real, verifiable numbers only. A null value hides that stat entirely —
// nothing here is rendered until Dr. Bushra confirms it.

export type Stat = {
  id: string;
  value: number | null;
  suffix: string;
  labelEn: string;
  labelAr: string;
};

export const stats: Stat[] = [
  { id: "years", value: null, suffix: "+", labelEn: "Years of practice", labelAr: "سنوات خبرة" },
  { id: "cases", value: null, suffix: "+", labelEn: "Cases completed", labelAr: "حالة مكتملة" },
  { id: "patients", value: null, suffix: "+", labelEn: "Patients treated", labelAr: "مريض تمت معالجته" },
  { id: "rating", value: null, suffix: "/5", labelEn: "Average rating", labelAr: "متوسط التقييم" },
];
