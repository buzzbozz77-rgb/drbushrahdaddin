"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

const SECTION_IDS = ["about", "services", "team", "plan", "testimonials", "book"];

export default function Navbar() {
  const { locale, toggleLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "#about", id: "about", label: t.nav.about },
    { href: "#services", id: "services", label: t.nav.services },
    { href: "#plan", id: "plan", label: t.planner.heading },
    { href: "#testimonials", id: "testimonials", label: t.nav.testimonials },
    { href: "#book", id: "book", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (menuOpen) {
      el.style.display = "flex";
      if (!reduceMotion) {
        gsap.fromTo(el, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      }
    } else if (el.style.display === "flex") {
      if (reduceMotion) {
        el.style.display = "none";
      } else {
        gsap.to(el, {
          opacity: 0,
          y: -16,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`navbar-solid fixed inset-x-3 top-3 z-[60] rounded-full transition-all duration-300 md:inset-x-6 ${
          scrolled ? "py-1.5 md:py-2" : "py-2.5 md:py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 md:px-8">
          <a href="#" className="tap-area font-display text-base text-white md:text-lg">
            {doctor.shortName}
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  activeId === link.id ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleLocale}
              className="tap-target hidden items-center gap-1 rounded-full border border-white/30 px-3 text-xs font-medium text-white/80 transition-colors hover:text-white sm:flex"
              aria-label="Toggle language"
            >
              <span className={locale === "en" ? "text-white" : undefined}>EN</span>
              <span className="text-white/40">/</span>
              <span className={locale === "ar" ? "text-white" : undefined}>AR</span>
            </button>
            <a
              href={doctor.whatsappHref}
              className="tap-target hidden items-center rounded-full bg-white px-5 text-sm font-medium text-ink transition-opacity hover:opacity-85 sm:flex"
            >
              {t.nav.book}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="tap-target flex items-center justify-center rounded-full text-white lg:hidden"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        className="hero-deep-blue fixed inset-0 z-[55] hidden flex-col items-center justify-center gap-8 lg:hidden"
        style={{ display: "none" }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-2xl text-white"
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={toggleLocale}
          aria-label="Toggle language"
          className="tap-target flex items-center gap-1 rounded-full border border-white/30 px-4 text-sm font-medium text-white/80"
        >
          <span className={locale === "en" ? "text-white" : undefined}>EN</span>
          <span className="text-white/40">/</span>
          <span className={locale === "ar" ? "text-white" : undefined}>AR</span>
        </button>
        <a
          href={doctor.whatsappHref}
          onClick={() => setMenuOpen(false)}
          className="tap-target inline-flex items-center rounded-full bg-white px-8 text-sm font-medium text-ink"
        >
          {t.nav.book}
        </a>
      </div>
    </>
  );
}
