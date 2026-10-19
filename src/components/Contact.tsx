"use client";

import { doctor, socials } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-14 text-white md:px-16">
            <div
              aria-hidden
              className="animate-drift absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <h2 className="font-serif text-3xl">{t.contact.heading}</h2>
            <p className="mt-3 max-w-md text-white/80">{t.contact.subheading}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={doctor.whatsappHref}
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-primary-dark transition-transform hover:-translate-y-0.5 hover:opacity-90"
              >
                {t.contact.whatsapp}
              </a>
              <a
                href={doctor.phoneHref}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {doctor.phone}
              </a>
              <a
                href={doctor.mapsHref}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {t.contact.directions}
              </a>
            </div>

            <div className="mt-10 flex gap-6 border-t border-white/20 pt-6 text-sm text-white/80">
              {Object.values(socials).map((social) => (
                <a key={social.label} href={social.href} className="hover:text-white">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
