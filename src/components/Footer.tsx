"use client";

import { doctor } from "@/lib/content";
import { contact, socialLinks } from "@/config/contact";
import { useLocale } from "@/components/LocaleProvider";

export default function Footer() {
  const { locale, t } = useLocale();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#book", label: t.nav.book },
  ];

  return (
    <footer className="hairline border-t bg-background py-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-base text-foreground">{doctor.shortName}</p>
            <p className="mt-2 max-w-[16rem] text-sm text-muted-soft">
              {locale === "ar" ? contact.cityAr : contact.city}
            </p>
            {contact.streetAddress && (
              <p className="mt-1 text-sm text-muted-soft">
                {locale === "ar" ? contact.streetAddressAr : contact.streetAddress}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-soft">
              {t.nav.contact}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={contact.phoneHref} dir="ltr" className="text-muted hover:text-foreground">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  className="text-muted hover:text-foreground"
                >
                  {t.contact.whatsapp}
                </a>
              </li>
            </ul>

            {contact.hours && (
              <ul className="mt-4 space-y-1 text-xs text-muted-soft">
                {contact.hours.map((h) => (
                  <li key={h.dayEn}>
                    {locale === "ar" ? h.dayAr : h.dayEn}: {h.hours}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-soft">
              {t.nav.about}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-soft sm:flex-row">
          <span>© {doctor.fullName}</span>
          <div className="flex gap-4">
            {Object.values(socialLinks).map((social) => (
              <a key={social.label} href={social.href} className="hover:text-foreground">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
