// TODO (for Dr. Bushra): fill in with real, verifiable numbers before publishing.
// "لا تخترع أي ادعاء" — nothing here is shown on the live site until a value
// is provided. StatsStrip (src/components/StatsStrip.tsx) reads this file and
// renders only the entries that aren't null; if every entry is null it
// renders nothing at all.

export type StatEntry = {
  value: string | null; // e.g. "10+", "186K+", "4.9/5"
  labelEn: string;
  labelAr: string;
};

export const statsTODO: StatEntry[] = [
  { value: null, labelEn: "Years of practice", labelAr: "سنوات خبرة" },
  { value: null, labelEn: "Cases completed", labelAr: "حالة مكتملة" },
  { value: null, labelEn: "Patient satisfaction", labelAr: "رضا المرضى" },
];
