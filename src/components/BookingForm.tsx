"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import Reveal from "@/components/Reveal";
import { serviceOptions } from "@/config/services";
import { contact } from "@/config/contact";
import { normalizeJordanPhone } from "@/lib/phone";

type Errors = { name?: string; phone?: string; service?: string };

export default function BookingForm() {
  const { locale, t } = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedPhone = normalizeJordanPhone(phone);
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = t.booking.errorName;
    if (!normalizedPhone) nextErrors.phone = t.booking.errorPhone;
    if (!service) nextErrors.service = t.booking.errorService;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const serviceLabel = serviceOptions.find((s) => s.slug === service);
    const lines = [
      t.booking.whatsappIntro,
      `${t.booking.nameLabel}: ${name.trim()}`,
      `${t.booking.phoneLabel}: ${normalizedPhone}`,
      `${t.booking.serviceLabel}: ${serviceLabel ? (locale === "ar" ? serviceLabel.labelAr : serviceLabel.labelEn) : ""}`,
      `${t.booking.fieldDate}: ${date || t.booking.fieldNotSet}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="book" className="overflow-x-clip px-3 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <h2 className="font-display text-heading-lg text-center text-white">
            {t.booking.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/70">
            {t.booking.subheading}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-16 max-w-[1100px]">
          <div
            aria-hidden
            className="animate-float-slow pointer-events-none absolute -top-10 left-2 z-10 w-28 opacity-90 sm:-top-16 sm:left-6 sm:w-44 md:w-56"
          >
            <Image
              src="/services/cutouts/full-smile-arch.png"
              alt=""
              width={400}
              height={300}
              className="h-auto w-full drop-shadow-xl"
            />
          </div>
          <div
            aria-hidden
            className="animate-float-slow pointer-events-none absolute -bottom-8 right-2 z-10 w-16 opacity-90 sm:-bottom-12 sm:right-8 sm:w-24 md:w-28"
            style={{ animationDelay: "-3s" }}
          >
            <Image
              src="/services/cutouts/tooth-molar.png"
              alt=""
              width={300}
              height={400}
              className="h-auto w-full drop-shadow-xl"
            />
          </div>

          <div className="relative mx-auto max-w-2xl rounded-[28px] border border-white/40 bg-white/92 p-6 shadow-xl backdrop-blur-md md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
                  ✓
                </span>
                <p className="mt-4 font-display text-lg text-foreground">{t.booking.successTitle}</p>
                <p className="mt-2 max-w-sm text-sm text-muted">{t.booking.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground" htmlFor="booking-name">
                      {t.booking.nameLabel}
                    </label>
                    <input
                      id="booking-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.booking.namePlaceholder}
                      className="hairline tap-target mt-2 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none focus:border-ink"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground" htmlFor="booking-phone">
                      {t.booking.phoneLabel}
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.booking.phonePlaceholder}
                      className="hairline tap-target mt-2 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none focus:border-ink"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground" htmlFor="booking-service">
                      {t.booking.serviceLabel}
                    </label>
                    <select
                      id="booking-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="hairline tap-target mt-2 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none focus:border-ink"
                    >
                      <option value="">{t.booking.servicePlaceholder}</option>
                      {serviceOptions.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {locale === "ar" ? s.labelAr : s.labelEn}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground" htmlFor="booking-date">
                      {t.booking.dateLabel}
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="hairline tap-target mt-2 w-full rounded-xl border bg-white px-4 text-sm text-foreground outline-none focus:border-ink"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="tap-target mt-2 w-full rounded-full bg-ink px-6 text-sm font-medium text-white transition-opacity hover:opacity-85"
                >
                  {t.booking.submit}
                </button>
              </form>
            )}

            <div className="hairline mt-8 flex items-center justify-center gap-6 border-t pt-6 text-sm">
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                className="text-muted hover:text-foreground"
              >
                {t.contact.whatsapp}
              </a>
              <a href={contact.mapsHref} className="text-muted hover:text-foreground">
                {t.contact.directions}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
