"use client";

import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="hairline border-t bg-background py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 text-xs text-muted-soft md:flex-row">
        <span>© {doctor.fullName}</span>
        <span>{t.doctor.location}</span>
      </div>
    </footer>
  );
}
