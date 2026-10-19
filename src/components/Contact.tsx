"use client";

import { doctor, socials } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-6 py-10">
      <Reveal>
        <div className="rounded-[40px] bg-surface px-8 py-14 text-center shadow-elevation md:px-16">
          <h2 className="font-display text-heading-sm text-foreground">{t.contact.heading}</h2>
          <p className="text-body mx-auto mt-3 max-w-md text-muted-strong">
            {t.contact.subheading}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={doctor.whatsappHref}
              className="rounded-full bg-foreground px-7 py-3.5 text-body-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              {t.contact.whatsapp}
            </a>
            <a
              href={doctor.phoneHref}
              className="rounded-full border border-border px-7 py-3.5 text-body-sm font-medium text-foreground transition-colors hover:bg-surface-warm"
            >
              {doctor.phone}
            </a>
            <a
              href={doctor.mapsHref}
              className="rounded-full border border-border px-7 py-3.5 text-body-sm font-medium text-foreground transition-colors hover:bg-surface-warm"
            >
              {t.contact.directions}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 border-t border-border pt-6 text-body-sm text-muted-strong">
            {Object.values(socials).map((social) => (
              <a key={social.label} href={social.href} className="hover:text-foreground">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
