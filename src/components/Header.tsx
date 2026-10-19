"use client";

import Link from "next/link";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

export default function Header() {
  const { locale, toggleLocale, t } = useLocale();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tight text-foreground">
          {doctor.shortName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm text-muted-strong transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1 rounded-xl border border-border px-3 py-1.5 text-caption font-medium text-muted-strong transition-colors hover:text-foreground"
            aria-label="Toggle language"
          >
            <span className={locale === "en" ? "text-foreground" : undefined}>EN</span>
            <span className="text-border">/</span>
            <span className={locale === "ar" ? "text-foreground" : undefined}>AR</span>
          </button>

          <a
            href={doctor.whatsappHref}
            className="rounded-full bg-foreground px-5 py-2.5 text-body-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  );
}
