"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import ToothArchSelector, { type ToothId } from "@/components/ToothArchSelector";
import {
  plannerGoals,
  plannerMethods,
  patientTypes,
  treatmentEstimates,
} from "@/config/services";
import { contact } from "@/config/contact";
import { doctor } from "@/lib/content";

export default function SmileJourneyPlanner() {
  const { locale, t } = useLocale();
  const [goal, setGoal] = useState<string | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [patientType, setPatientType] = useState<"new" | "returning" | null>(null);
  const [teeth, setTeeth] = useState<Set<ToothId>>(new Set());

  const toggleTooth = (id: ToothId) => {
    setTeeth((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toothLabel = (id: ToothId) => {
    const [arch, index] = id.split("-");
    const archLabel = arch === "upper" ? t.planner.upper : t.planner.lower;
    return `${t.planner.tooth} ${archLabel} ${Number(index) + 1}`;
  };

  const selectedGoal = plannerGoals.find((g) => g.id === goal);
  const selectedMethod = plannerMethods.find((m) => m.id === method);
  const selectedPatientType = patientTypes.find((p) => p.id === patientType);
  const estimate = treatmentEstimates.find((e) => e.methodId === method);

  const teethList = useMemo(
    () =>
      Array.from(teeth)
        .sort()
        .map((id) => toothLabel(id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [teeth, locale]
  );

  const whatsappHref = useMemo(() => {
    const lines = [t.planner.whatsappIntro];
    lines.push(`${t.planner.resultGoal}: ${selectedGoal ? (locale === "ar" ? selectedGoal.labelAr : selectedGoal.labelEn) : t.planner.notSelected}`);
    lines.push(`${t.planner.resultMethod}: ${selectedMethod ? (locale === "ar" ? selectedMethod.labelAr : selectedMethod.labelEn) : t.planner.notSelected}`);
    lines.push(`${t.planner.resultPatient}: ${selectedPatientType ? (locale === "ar" ? selectedPatientType.labelAr : selectedPatientType.labelEn) : t.planner.notSelected}`);
    lines.push(`${t.planner.resultTeeth}: ${teethList.length ? teethList.join(", ") : t.planner.noneSelected}`);
    lines.push(`${t.planner.resultDoctor}: ${doctor.fullName}`);
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
  }, [t, selectedGoal, selectedMethod, selectedPatientType, teethList, locale]);

  return (
    <section id="plan" className="px-3 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-white">
            {t.planner.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/70">{t.planner.subheading}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.3fr_1fr]">
          {/* Left: goal / method / patient type */}
          <Reveal delay={0.1} className="glass-on-blue flex flex-col gap-6 rounded-[28px] p-6 text-white">
            <div>
              <p className="text-sm font-medium text-white/70">{t.planner.stepGoal}</p>
              <div className="mt-3 flex flex-col gap-2">
                {plannerGoals.map((g) => (
                  <label key={g.id} className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="radio"
                      name="planner-goal"
                      className="h-4 w-4 accent-white"
                      checked={goal === g.id}
                      onChange={() => setGoal(g.id)}
                    />
                    {locale === "ar" ? g.labelAr : g.labelEn}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/70">{t.planner.stepMethod}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {plannerMethods.map((m) => {
                  const isActive = method === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`tap-target rounded-full border px-4 text-xs font-medium transition-colors ${
                        isActive
                          ? "border-white bg-white text-ink"
                          : "border-white/30 text-white/80 hover:border-white/60"
                      }`}
                    >
                      {locale === "ar" ? m.labelAr : m.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/70">{t.planner.stepPatient}</p>
              <div className="mt-3 flex gap-2">
                {patientTypes.map((p) => {
                  const isActive = patientType === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPatientType(p.id)}
                      className={`tap-target flex-1 rounded-xl border px-3 text-xs font-medium transition-colors ${
                        isActive
                          ? "border-white bg-white text-ink"
                          : "border-white/30 text-white/80 hover:border-white/60"
                      }`}
                    >
                      {locale === "ar" ? p.labelAr : p.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Middle: tooth selector */}
          <Reveal delay={0.18} className="glass-on-blue relative overflow-hidden rounded-[28px] p-6">
            <p className="text-sm font-medium text-white">{t.planner.selectTooth}</p>
            <p className="mt-1 text-xs text-white/60">{t.planner.selectToothHint}</p>
            <div className="mt-4">
              <ToothArchSelector selected={teeth} onToggle={toggleTooth} toothLabel={toothLabel} />
            </div>
          </Reveal>

          {/* Right: result */}
          <Reveal delay={0.26} className="glass-on-blue flex flex-col justify-between rounded-[28px] p-6 text-white">
            <div>
              <p className="font-display text-lg text-white">{t.planner.result}</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/60">
                    {t.planner.resultGoal}
                  </dt>
                  <dd className="text-white">
                    {selectedGoal ? (locale === "ar" ? selectedGoal.labelAr : selectedGoal.labelEn) : t.planner.notSelected}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/60">
                    {t.planner.resultMethod}
                  </dt>
                  <dd className="text-white">
                    {selectedMethod ? (locale === "ar" ? selectedMethod.labelAr : selectedMethod.labelEn) : t.planner.notSelected}
                  </dd>
                  {estimate && (estimate.durationEn || estimate.costRangeEn) && (
                    <dd className="mt-1 text-xs text-white/60">
                      {estimate.durationEn && (locale === "ar" ? estimate.durationAr : estimate.durationEn)}
                      {estimate.costRangeEn &&
                        ` · ${locale === "ar" ? estimate.costRangeAr : estimate.costRangeEn}`}
                    </dd>
                  )}
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/60">
                    {t.planner.resultTeeth}
                  </dt>
                  <dd className="text-white">
                    {teethList.length ? teethList.join(", ") : t.planner.noneSelected}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/60">
                    {t.planner.resultDoctor}
                  </dt>
                  <dd className="text-white">{doctor.fullName}</dd>
                </div>
              </dl>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              {t.planner.sendWhatsapp}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
