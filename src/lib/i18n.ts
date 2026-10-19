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
    verified: string;
  };
  contact: {
    heading: string;
    subheading: string;
    whatsapp: string;
    directions: string;
  };
  hero: {
    trustPill: string;
    ctaBook: string;
  };
  chat: {
    assistantName: string;
    greeting: string;
    placeholder: string;
    quickReplies: {
      services: string;
      book: string;
      location: string;
      hours: string;
    };
    answers: {
      services: string;
      book: string;
      location: string;
      hours: string;
      fallback: string;
    };
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
    testimonials: { heading: "What patients say", verified: "Verified patient" },
    contact: {
      heading: "Plan your visit",
      subheading: "Based in Amman, Jordan. Reach out directly or follow along for daily case studies and patient results.",
      whatsapp: "WhatsApp",
      directions: "Get directions",
    },
    hero: {
      trustPill: "Trusted by 186K+ patients online",
      ctaBook: "Book a consultation",
    },
    chat: {
      assistantName: "Clinic Assistant",
      greeting: "Hi! I'm here to help with questions about Dr. Bushra's clinic. What would you like to know?",
      placeholder: "Type a message…",
      quickReplies: {
        services: "What services do you offer?",
        book: "How do I book?",
        location: "Where are you located?",
        hours: "What are your hours?",
      },
      answers: {
        services: "We offer cosmetic dentistry, dental & oral surgery, botox & fillers, and veneers & implants. Tap 'Services' above for details.",
        book: "The fastest way is WhatsApp — tap the green button in the corner and we'll confirm your appointment.",
        location: "The clinic is in Amman, Jordan. Tap 'Get directions' in the Contact section for the map.",
        hours: "Our team typically replies on WhatsApp within the same day — send a message any time and we'll confirm a slot.",
        fallback: "Thanks for your message! For anything specific, the fastest reply is on WhatsApp — tap the green button in the corner.",
      },
    },
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
    testimonials: { heading: "آراء المرضى", verified: "مريض موثّق" },
    contact: {
      heading: "خططي لزيارتك",
      subheading: "في عمّان، الأردن. تواصلي معنا مباشرة أو تابعينا لحالات ونتائج يومية.",
      whatsapp: "واتساب",
      directions: "احصل على الاتجاهات",
    },
    hero: {
      trustPill: "موثوقة من أكثر من 186 ألف متابع",
      ctaBook: "احجزي استشارة",
    },
    chat: {
      assistantName: "مساعد العيادة",
      greeting: "أهلاً! أنا هون لمساعدتك بأي سؤال عن عيادة الدكتورة بشرى. شو بدك تعرفي؟",
      placeholder: "اكتبي رسالة…",
      quickReplies: {
        services: "شو الخدمات المتوفرة؟",
        book: "كيف بقدر أحجز؟",
        location: "وين موقع العيادة؟",
        hours: "شو أوقات الدوام؟",
      },
      answers: {
        services: "نقدم تجميل الأسنان، جراحة الأسنان والفم، بوتوكس وفيلر، وفينير وزراعة الأسنان. اضغطي على 'الخدمات' فوق لمزيد من التفاصيل.",
        book: "أسرع طريقة هي الواتساب — اضغطي على الزر الأخضر بالزاوية وبنأكدلك الموعد.",
        location: "العيادة في عمّان، الأردن. اضغطي 'احصل على الاتجاهات' بقسم التواصل لفتح الخريطة.",
        hours: "فريقنا بيرد عادةً على الواتساب بنفس اليوم — ابعتي رسالة بأي وقت وبنأكدلك موعد.",
        fallback: "شكراً إلك على رسالتك! لأي استفسار محدد، أسرع رد بيكون عبر الواتساب — اضغطي الزر الأخضر بالزاوية.",
      },
    },
  },
};
