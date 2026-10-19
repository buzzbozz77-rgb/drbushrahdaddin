"use client";

import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

export default function MobileActionBar() {
  const { t } = useLocale();

  return (
    <div
      className="hairline fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t bg-surface p-3 md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={doctor.whatsappHref}
        className="tap-target flex flex-1 items-center justify-center rounded-full bg-ink px-4 text-sm font-medium text-ivory"
      >
        {t.hero.ctaBook}
      </a>
      <a
        href={doctor.phoneHref}
        aria-label={doctor.phone}
        className="hairline tap-target flex items-center justify-center rounded-full border px-5 text-sm font-medium text-foreground"
      >
        {t.contact.call}
      </a>
    </div>
  );
}
