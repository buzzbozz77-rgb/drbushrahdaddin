"use client";

import Link from "next/link";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

export default function Header() {
  const { locale, toggleLocale, t } = useLocale();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="hairline sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl text-foreground">
          {doctor.shortName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            className="tap-target hairline flex items-center gap-1 rounded-full border px-3 text-xs font-medium text-muted transition-colors hover:text-foreground"
            aria-label="Toggle language"
          >
            <span className={locale === "en" ? "text-foreground" : undefined}>EN</span>
            <span className="text-border">/</span>
            <span className={locale === "ar" ? "text-foreground" : undefined}>AR</span>
          </button>

          <a
            href={doctor.whatsappHref}
            className="tap-target hidden items-center rounded-full bg-ink px-6 text-sm font-medium text-white transition-opacity hover:opacity-85 sm:flex"
          >
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  );
}
