"use client";

import { doctor, socials } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" className="hairline border-t bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <Reveal>
          <h2 className="font-display text-heading-lg text-foreground">{t.contact.heading}</h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted">{t.contact.subheading}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={doctor.whatsappHref}
              className="tap-target inline-flex items-center rounded-full bg-ink px-8 text-base font-medium text-white transition-opacity hover:opacity-85"
            >
              {t.contact.whatsapp}
            </a>
            <a
              href={doctor.phoneHref}
              className="tap-target hairline inline-flex items-center rounded-full border px-8 text-base font-medium text-foreground transition-colors hover:bg-sky"
            >
              <span dir="ltr">{doctor.phone}</span>
            </a>
            <a
              href={doctor.mapsHref}
              className="tap-target hairline inline-flex items-center rounded-full border px-8 text-base font-medium text-foreground transition-colors hover:bg-sky"
            >
              {t.contact.directions}
            </a>
          </div>

          <div className="hairline mt-14 flex items-center justify-center gap-6 border-t pt-6 text-sm text-muted-soft">
            {Object.values(socials).map((social) => (
              <a key={social.label} href={social.href} className="hover:text-foreground">
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
