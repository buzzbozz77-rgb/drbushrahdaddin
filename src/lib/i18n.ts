export type Locale = "en" | "ar";

type Dictionary = {
  nav: {
    about: string;
    services: string;
    gallery: string;
    testimonials: string;
    contact: string;
    book: string;
  };
  doctor: {
    title: string;
    tagline: string;
    bio: string;
    location: string;
  };
  stats: [string, string, string];
  about: {
    heading: string;
  };
  services: {
    heading: string;
    subheading: string;
    items: { name: string; description: string }[];
  };
  gallery: {
    heading: string;
    subheading: string;
  };
  testimonials: {
    heading: string;
  };
  contact: {
    heading: string;
    subheading: string;
    whatsapp: string;
    directions: string;
  };
  hero: {
    ctaBook: string;
  };
};

export const dictionary: Record<Locale, Dictionary> = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      gallery: "Gallery",
      testimonials: "Testimonials",
      contact: "Contact",
      book: "Book a visit",
    },
    doctor: {
      title: "Cosmetic & Aesthetic Dentistry",
      tagline: "Precision dentistry, designed around your smile.",
      bio: "Dr. Bushra Mazen Haddadin is a cosmetic and aesthetic dentist based in Amman, combining surgical precision with an artist's eye for natural, balanced smiles. Her practice spans cosmetic dentistry, oral surgery, and facial aesthetics — trusted by thousands of patients across the region.",
      location: "Amman, Jordan",
    },
    stats: ["Instagram community", "Posts & case studies", "Years of practice"],
    about: { heading: "About Dr. Bushra" },
    services: {
      heading: "Services",
      subheading:
        "A focused set of cosmetic, surgical, and aesthetic treatments — each planned around your individual facial structure and goals.",
      items: [
        { name: "Cosmetic Dentistry", description: "Smile design, veneers, and whitening tailored to facial harmony." },
        { name: "Dental & Oral Surgery", description: "Precise, minimally invasive surgical care in a controlled environment." },
        { name: "Botox & Fillers", description: "Subtle facial aesthetics that complement a natural smile." },
        { name: "Veneers & Implants", description: "Long-lasting restorations built on modern zirconia and implant systems." },
      ],
    },
    gallery: {
      heading: "Case gallery",
      subheading: "Real results, real patients. This section fills in as case photos are added.",
    },
    testimonials: { heading: "What patients say" },
    contact: {
      heading: "Plan your visit",
      subheading: "Based in Amman, Jordan. Reach out directly or follow along for daily case studies and patient results.",
      whatsapp: "WhatsApp",
      directions: "Get directions",
    },
    hero: { ctaBook: "Book a consultation" },
  },
  ar: {
    nav: {
      about: "من نحن",
      services: "الخدمات",
      gallery: "معرض الحالات",
      testimonials: "آراء المرضى",
      contact: "تواصل معنا",
      book: "احجزي موعدك",
    },
    doctor: {
      title: "طب الأسنان التجميلي والتجميل الوجهي",
      tagline: "دقة في طب الأسنان، مصمَّمة لتناسب ابتسامتك.",
      bio: "الدكتورة بشرى مازن الحدادين طبيبة أسنان تجميلية متخصصة في عمّان، تجمع بين الدقة الجراحية ولمسة فنية لابتسامات طبيعية ومتناسقة. تمتد خبرتها لتشمل تجميل الأسنان، جراحة الفم، وتجميل الوجه — وتحظى بثقة آلاف المرضى في المنطقة.",
      location: "عمّان، الأردن",
    },
    stats: ["متابعين انستغرام", "منشورات وحالات", "سنوات خبرة"],
    about: { heading: "عن الدكتورة بشرى" },
    services: {
      heading: "الخدمات",
      subheading: "مجموعة مركّزة من العلاجات التجميلية والجراحية والوجهية، كل علاج مخطط حسب ملامح وجهك وأهدافك.",
      items: [
        { name: "تجميل الأسنان", description: "تصميم ابتسامة، فينير، وتبييض أسنان متناسق مع ملامح الوجه." },
        { name: "جراحة الأسنان والفم", description: "رعاية جراحية دقيقة وأقل تدخلاً ضمن بيئة آمنة ومتكاملة." },
        { name: "بوتوكس وفيلر", description: "تجميل وجه بلمسات ناعمة تكمّل جمال الابتسامة الطبيعية." },
        { name: "فينير وزراعة الأسنان", description: "ترميمات تدوم طويلاً باستخدام أنظمة زركونيا وزراعة حديثة." },
      ],
    },
    gallery: {
      heading: "معرض الحالات",
      subheading: "نتائج حقيقية، لمرضى حقيقيين. يتم تحديث هذا القسم فور إضافة صور الحالات.",
    },
    testimonials: { heading: "آراء المرضى" },
    contact: {
      heading: "خططي لزيارتك",
      subheading: "في عمّان، الأردن. تواصلي معنا مباشرة أو تابعينا لحالات ونتائج يومية.",
      whatsapp: "واتساب",
      directions: "احصل على الاتجاهات",
    },
    hero: { ctaBook: "احجزي استشارة" },
  },
};
