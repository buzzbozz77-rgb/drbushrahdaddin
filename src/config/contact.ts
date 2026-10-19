// Real contact details only. Any field left null is hidden wherever it's
// used (Footer, booking confirmation, etc.) rather than guessed at.

export const contact = {
  phoneDisplay: "+962 7 9644 4360",
  phoneHref: "tel:+962796444360",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "962796444360",
  mapsHref: "https://goo.gl/maps/NrzwtDce8DcnCzoK6",
  city: "Amman, Jordan",
  cityAr: "عمّان، الأردن",
  // Precise street address not yet confirmed — leave null until provided.
  streetAddress: null as string | null,
  streetAddressAr: null as string | null,
  // Opening hours not yet confirmed — leave null until provided.
  hours: null as { dayEn: string; dayAr: string; hours: string }[] | null,
};

export const socialLinks = {
  instagram: { label: "Instagram", href: "https://instagram.com/dr.bushraa" },
  threads: { label: "Threads", href: "https://www.threads.net/@dr.bushraa" },
  facebook: { label: "Facebook", href: "https://facebook.com" },
};
