// Locale-independent data. Translatable copy lives in src/lib/i18n.ts.

export const doctor = {
  fullName: "Dr. Bushra Mazen Haddadin",
  shortName: "Dr. Bushra",
  phone: "+962 7 9644 4360",
  phoneHref: "tel:+962796444360",
  whatsappHref: "https://wa.me/962796444360",
  mapsHref: "https://goo.gl/maps/NrzwtDce8DcnCzoK6",
  portrait: "/images/dr-bushra-portrait.jpg",
  credentials: ["JUST", "RCSI", "American Aesthetic Assoc.", "German ER Drs"],
};

export const socials = {
  instagram: { label: "Instagram", href: "https://instagram.com/dr.bushraa" },
  threads: { label: "Threads", href: "https://www.threads.net/@dr.bushraa" },
  facebook: { label: "Facebook", href: "https://facebook.com" },
};

export const serviceSlugs = [
  "cosmetic-dentistry",
  "dental-oral-surgery",
  "botox-fillers",
  "veneers-implants",
] as const;

export type GalleryItem = {
  src: string;
  alt: string;
};

// Add real case photos here once provided, e.g.
// { src: "/images/gallery/case-1.jpg", alt: "Veneers case — before and after" }
export const gallery: GalleryItem[] = [];

export type Testimonial = {
  quote: string;
  author?: string;
  lang: "ar" | "en";
};

export const testimonials: Testimonial[] = [
  {
    lang: "ar",
    quote:
      "جزيل الشكر وعميق الإمتنان لدكتورتنا المبدعه المتميزة للإحترافيه العاليه والذوق الرفيع وحسن الاستقبال لما قدمتيه لي اليوم من معالجه طبيه بإسلوب مميز لم أشهده من قبل.",
    author: "Patient feedback",
  },
  {
    lang: "ar",
    quote:
      "دكتورة اد ما احكي ما رح اوصف اديه شغلك بجنن، ايدك خفيفة وبتشتغلي جد من قلبك، وبتتعاملي مع المرضى كأنهم عيلتك وابدا مش ماديه، اسعارك في متناول الكل.",
    author: "Patient feedback",
  },
  {
    lang: "en",
    quote:
      "Much appreciated doctor for following up my case that was seen after a normal dentist checkup. You and your team worked in a very professional way. Thank you again and god bless.",
    author: "Patient feedback",
  },
];
