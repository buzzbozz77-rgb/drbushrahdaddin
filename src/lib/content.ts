// Central content source. Edit here to update copy across the site
// without touching component markup.

export const doctor = {
  fullName: "Dr. Bushra Mazen Haddadin",
  shortName: "Dr. Bushra",
  title: "Cosmetic & Aesthetic Dentistry",
  location: "Amman, Jordan",
  phone: "+962 79 644 4360",
  phoneHref: "tel:+962796444360",
  whatsappHref: "https://wa.me/962796444360",
  mapsHref: "https://goo.gl/maps/NrzwtDce8DcnCzoK6",
  portrait: "/images/dr-bushra-portrait.jpg",
  credentials: [
    "JUST",
    "RCSI",
    "American Aesthetic Assoc.",
    "German ER Drs",
  ],
  tagline: "Precision dentistry, designed around your smile.",
  bio: "Dr. Bushra Mazen Haddadin is a cosmetic and aesthetic dentist based in Amman, combining surgical precision with an artist's eye for natural, balanced smiles. Her practice spans cosmetic dentistry, oral surgery, and facial aesthetics — trusted by thousands of patients across the region.",
};

export const socials = {
  instagram: { label: "Instagram", handle: "@dr.bushraa", href: "https://instagram.com/dr.bushraa" },
  threads: { label: "Threads", handle: "@dr.bushraa", href: "https://www.threads.net/@dr.bushraa" },
  facebook: { label: "Facebook", handle: "Dr Bushra Mazen Haddadin", href: "https://facebook.com" },
};

export const stats = [
  { value: "186K+", label: "Instagram community" },
  { value: "500+", label: "Posts & case studies" },
  { value: "10+", label: "Years of practice" },
];

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
};

export const services: Service[] = [
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    shortDescription: "Smile design, veneers, and whitening tailored to facial harmony.",
  },
  {
    slug: "dental-oral-surgery",
    name: "Dental & Oral Surgery",
    shortDescription: "Precise, minimally invasive surgical care in a controlled environment.",
  },
  {
    slug: "botox-fillers",
    name: "Botox & Fillers",
    shortDescription: "Subtle facial aesthetics that complement a natural smile.",
  },
  {
    slug: "veneers-implants",
    name: "Veneers & Implants",
    shortDescription: "Long-lasting restorations built on modern zirconia and implant systems.",
  },
];

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
