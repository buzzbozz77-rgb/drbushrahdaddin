"use client";

import { doctor } from "@/lib/content";
import { contact, socialLinks } from "@/config/contact";
import { useLocale } from "@/components/LocaleProvider";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.88 1.1 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.65C4.28 7.74 4.27 8.06 4.27 12s.01 2.26.06 3.31c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-3.31s-.01-2.26-.06-3.31c-.04-.87-.18-1.34-.3-1.65a2.76 2.76 0 0 0-.66-1.02 2.76 2.76 0 0 0-1.02-.66c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8Zm0 3.07a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26Zm0 1.8a3.33 3.33 0 1 0 0 6.66 3.33 3.33 0 0 0 0-6.66Zm5.34-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.4h2.82l.42-3.27H13.5V8.24c0-.95.26-1.6 1.63-1.6h1.74V3.73c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.22 1.53-4.22 4.33v2.42H7.3v3.27h2.82V22h3.38Z" />
    </svg>
  );
}

const icons: Record<string, () => React.JSX.Element> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export default function Footer() {
  const { locale, t } = useLocale();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#book", label: t.nav.book },
  ];

  return (
    <footer className="rounded-t-[32px] py-12 md:rounded-t-[40px]" style={{ backgroundColor: "#0c1c66" }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-base text-white">{doctor.shortName}</p>
            <p className="mt-2 max-w-[16rem] text-sm text-white/60">
              {locale === "ar" ? contact.cityAr : contact.city}
            </p>
            {contact.streetAddress && (
              <p className="mt-1 text-sm text-white/60">
                {locale === "ar" ? contact.streetAddressAr : contact.streetAddress}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              {t.nav.contact}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={contact.phoneHref} dir="ltr" className="tap-area text-white/75 hover:text-white">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  className="tap-area text-white/75 hover:text-white"
                >
                  {t.contact.whatsapp}
                </a>
              </li>
              <li>
                <a href={contact.mapsHref} className="tap-area text-white/75 hover:text-white">
                  {t.contact.directions}
                </a>
              </li>
            </ul>

            {contact.hours && (
              <ul className="mt-4 space-y-1 text-xs text-white/50">
                {contact.hours.map((h) => (
                  <li key={h.dayEn}>
                    {locale === "ar" ? h.dayAr : h.dayEn}: {h.hours}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              {t.nav.about}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="tap-area text-white/75 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {doctor.fullName}</span>
          <div className="flex gap-4">
            {Object.values(socialLinks).map((social) => {
              const Icon = icons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="tap-area text-white/60 transition-colors hover:text-white"
                >
                  {Icon ? <Icon /> : social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
