"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { doctor } from "@/lib/content";
import { useLocale } from "@/components/LocaleProvider";

const SECTION_IDS = ["about", "services", "team", "plan", "testimonials", "book"];

export default function Navbar() {
  const { locale, toggleLocale, t } = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const navLinks = [
    { href: "#about", id: "about", label: t.nav.about },
    { href: "#services", id: "services", label: t.nav.services },
    { href: "#plan", id: "plan", label: t.planner.heading },
    { href: "#testimonials", id: "testimonials", label: t.nav.testimonials },
    { href: "#book", id: "book", label: t.nav.contact },
  ];

  /* ---------------------------------------------------------------- */
  /* Scroll state: solid after the fold, hide on scroll down,         */
  /* come back the moment the reader scrolls up.                      */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 120) {
        setHidden(false);
        setActiveId(null); // still in the hero
      } else if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------------------------------------------------------- */
  /* Active section                                                   */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY >= 120) setActiveId(entry.target.id);
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

  /* ---------------------------------------------------------------- */
  /* One sliding underline that travels between links                 */
  /* (physical offsets, so it is correct in both LTR and RTL)         */
  /* ---------------------------------------------------------------- */
  const placeIndicator = useCallback(
    (animate: boolean) => {
      const bar = indicatorRef.current;
      const nav = navRef.current;
      if (!bar || !nav) return;

      const link = activeId ? linkRefs.current[activeId] : null;
      if (!link) {
        gsap.to(bar, { opacity: 0, duration: animate ? 0.2 : 0 });
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(bar, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        opacity: 1,
        duration: animate && !reduce ? 0.45 : 0,
        ease: "power3.out",
      });
    },
    [activeId]
  );

  useLayoutEffect(() => {
    placeIndicator(true);
  }, [placeIndicator, locale]);

  useEffect(() => {
    const onResize = () => placeIndicator(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeIndicator]);

  /* ---------------------------------------------------------------- */
  /* Mobile overlay: animate, lock scroll, trap focus, Esc to close   */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = el.querySelectorAll<HTMLElement>("[data-menu-item]");

    if (menuOpen) {
      el.style.visibility = "visible";
      document.documentElement.style.overflow = "hidden";
      if (reduce) {
        gsap.set(el, { opacity: 1 });
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        gsap.to(el, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.08, ease: "power3.out" }
        );
      }
      items[0]?.focus({ preventScroll: true });
    } else {
      document.documentElement.style.overflow = "";
      gsap.to(el, {
        opacity: 0,
        duration: reduce ? 0 : 0.2,
        ease: "power2.in",
        onComplete: () => {
          el.style.visibility = "hidden";
        },
      });
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!menuOpen) return;
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [
        toggleRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      ].filter(Boolean) as HTMLElement[];
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const showBar = !hidden || menuOpen;

  const langSwitch = (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "en" ? "التبديل إلى العربية" : "Switch to English"}
      className="tap-target inline-flex items-center px-1 text-sm font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showBar ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled || menuOpen
            ? "border-b border-white/15 bg-[#06214f]/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 transition-[height] duration-500 md:px-10 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Wordmark */}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="font-display text-lg leading-none tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-xl"
          >
            {doctor.shortName}
          </a>

          {/* Desktop links */}
          <nav
            ref={navRef}
            aria-label="Primary"
            className="relative hidden items-center gap-9 pb-2 lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                href={link.href}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`text-[15px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  activeId === link.id ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <span
              ref={indicatorRef}
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-px bg-white opacity-0"
              style={{ width: 0 }}
            />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden sm:block">{langSwitch}</div>

            <a
              href={doctor.whatsappHref}
              className="tap-target hidden items-center rounded-full bg-white px-6 text-sm font-semibold text-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:inline-flex"
            >
              {t.nav.book}
            </a>

            {/* Hamburger → X, drawn with two lines */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="tap-target relative z-[70] flex h-11 w-11 items-center justify-center text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
            >
              <span
                aria-hidden
                className={`absolute h-px w-6 bg-current transition-transform duration-300 ease-out ${
                  menuOpen ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-px w-6 bg-current transition-transform duration-300 ease-out ${
                  menuOpen ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        className="hero-deep-blue fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto px-6 pt-28 pb-10 opacity-0 lg:hidden"
        style={{ visibility: "hidden" }}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.id}
              data-menu-item
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/15 py-5 font-display text-[28px] leading-tight text-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div data-menu-item className="mt-10 flex flex-col gap-5">
          <a
            href={doctor.whatsappHref}
            onClick={() => setMenuOpen(false)}
            className="tap-target inline-flex items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-ink"
          >
            {t.nav.book}
          </a>
          <div className="self-center">{langSwitch}</div>
        </div>
      </div>
    </>
  );
}