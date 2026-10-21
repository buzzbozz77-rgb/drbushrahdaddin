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
  about: {
    heading: string;
  };
  services: {
    heading: string;
    subheading: string;
    items: { name: string; description: string }[];
  };
  team: {
    heading: string;
    subheading: string;
    comingSoon: string;
  };
  planner: {
    heading: string;
    subheading: string;
    stepGoal: string;
    stepMethod: string;
    stepPatient: string;
    selectTooth: string;
    selectToothHint: string;
    upper: string;
    lower: string;
    right: string;
    left: string;
    tooth: string;
    result: string;
    resultGoal: string;
    resultMethod: string;
    resultPatient: string;
    resultTeeth: string;
    resultDoctor: string;
    notSelected: string;
    noneSelected: string;
    sendWhatsapp: string;
    whatsappIntro: string;
  };
  gallery: {
    heading: string;
    subheading: string;
  };
  testimonials: {
    heading: string;
  };
  stories: {
    heading: string;
    subheading: string;
    tabAll: string;
    empty: string;
    beforeAfterPlaceholder: string;
  };
  contact: {
    heading: string;
    subheading: string;
    whatsapp: string;
    call: string;
    directions: string;
  };
  hero: {
    ctaBook: string;
  };
  booking: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    dateLabel: string;
    submit: string;
    errorName: string;
    errorPhone: string;
    errorService: string;
    successTitle: string;
    successBody: string;
    whatsappIntro: string;
    fieldDate: string;
    fieldNotSet: string;
  };
  assistant: {
    name: string;
    disclosure: string;
    greeting: string;
    quickBook: string;
    quickServices: string;
    quickLocation: string;
    quickWhatsapp: string;
    typing: string;
    inputPlaceholder: string;
    sendAria: string;
    continueWhatsapp: string;
    locationInfo: string;
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
      bio: "Dr. Bushra Mazen Haddadin is a cosmetic and aesthetic dentist based in Amman, combining surgical precision with an artist's eye for natural, balanced smiles. Her practice spans cosmetic dentistry, oral surgery, and facial aesthetics.",
      location: "Amman, Jordan",
    },
    about: { heading: "About Dr. Bushra" },
    services: {
      heading: "Services",
      subheading:
        "A focused set of cosmetic, surgical, and aesthetic treatments — each planned around your individual facial structure and goals.",
      items: [
        { name: "Cosmetic Dentistry", description: "Smile design, porcelain veneers, and professional whitening — planned around your facial proportions and the shade and shape that suit you." },
        { name: "Dental & Oral Surgery", description: "Surgical and minor oral procedures carried out in a controlled clinical setting, following standard sterilization and safety protocols." },
        { name: "Botox & Fillers", description: "Botox and dermal filler treatments administered by appointment, discussed and planned together before any procedure." },
        { name: "Veneers & Implants", description: "Veneers and dental implants using modern materials, with each case assessed individually before a treatment plan is proposed." },
      ],
    },
    team: {
      heading: "Meet the mind behind your smile",
      subheading: "A focused, hands-on practice led directly by Dr. Bushra.",
      comingSoon: "More team members joining soon",
    },
    planner: {
      heading: "Plan your smile journey",
      subheading: "Tell us what you're after and we'll take it from there.",
      stepGoal: "01. Your goal",
      stepMethod: "02. Preferred method",
      stepPatient: "03. Patient type",
      selectTooth: "Select tooth",
      selectToothHint: "Tap any tooth to include it in your plan",
      upper: "Upper",
      lower: "Lower",
      right: "right",
      left: "left",
      tooth: "Tooth",
      result: "Result",
      resultGoal: "Goal",
      resultMethod: "Method",
      resultPatient: "Patient type",
      resultTeeth: "Selected teeth",
      resultDoctor: "Doctor",
      notSelected: "Not selected yet",
      noneSelected: "None selected",
      sendWhatsapp: "Send via WhatsApp",
      whatsappIntro: "Hi, I'd like to plan a visit with the following:",
    },
    gallery: {
      heading: "Case gallery",
      subheading: "Real results, real patients. This section fills in as case photos are added.",
    },
    testimonials: { heading: "What patients say" },
    stories: {
      heading: "Patient stories",
      subheading: "In their own words.",
      tabAll: "All",
      empty: "No stories for this service yet.",
      beforeAfterPlaceholder: "Before & after photos are added here once available.",
    },
    contact: {
      heading: "Plan your visit",
      subheading: "Based in Amman, Jordan. Reach out directly to book a consultation.",
      whatsapp: "WhatsApp",
      call: "Call",
      directions: "Get directions",
    },
    hero: { ctaBook: "Book a consultation" },
    booking: {
      heading: "Book your first step",
      subheading: "Fill this in and we'll confirm with you directly on WhatsApp.",
      nameLabel: "Full name",
      namePlaceholder: "Your name",
      phoneLabel: "Phone number",
      phonePlaceholder: "07XX XXX XXX",
      serviceLabel: "Service",
      servicePlaceholder: "Select a service",
      dateLabel: "Preferred date",
      submit: "Send request",
      errorName: "Please enter your name.",
      errorPhone: "Please enter a valid Jordanian phone number.",
      errorService: "Please select a service.",
      successTitle: "Request sent",
      successBody: "We've opened WhatsApp with your details — send the message to confirm.",
      whatsappIntro: "Hi, I'd like to book an appointment:",
      fieldDate: "Preferred date",
      fieldNotSet: "Not specified",
    },
    assistant: {
      name: "Booking assistant",
      disclosure: "Automated booking assistant",
      greeting: "Hi! I can help you book a visit with Dr. Bushra — ask me anything, or use a shortcut below.",
      quickBook: "Book a visit",
      quickServices: "Services",
      quickLocation: "Location & hours",
      quickWhatsapp: "Chat on WhatsApp",
      typing: "Typing…",
      inputPlaceholder: "Type a message…",
      sendAria: "Send",
      continueWhatsapp: "Continue on WhatsApp",
      locationInfo: "We're based in Amman, Jordan. For exact hours, message us on WhatsApp and we'll confirm.",
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
      bio: "الدكتورة بشرى مازن الحدادين طبيبة أسنان تجميلية متخصصة في عمّان، تجمع بين الدقة الجراحية ولمسة فنية لابتسامات طبيعية ومتناسقة. تمتد خبرتها لتشمل تجميل الأسنان، جراحة الفم، وتجميل الوجه.",
      location: "عمّان، الأردن",
    },
    about: { heading: "عن الدكتورة بشرى" },
    services: {
      heading: "الخدمات",
      subheading: "مجموعة مركّزة من العلاجات التجميلية والجراحية والوجهية، كل علاج مخطط حسب ملامح وجهك وأهدافك.",
      items: [
        { name: "تجميل الأسنان", description: "تصميم ابتسامة، فينير خزفي، وتبييض احترافي — بتخطيط يراعي تناسق ملامح وجهك واللون والشكل المناسبين لك." },
        { name: "جراحة الأسنان والفم", description: "إجراءات جراحية وعلاجات فموية بسيطة تتم ضمن بيئة عيادة مجهزة، وفق بروتوكولات تعقيم وسلامة معتمدة." },
        { name: "بوتوكس وفيلر", description: "جلسات بوتوكس وفيلر تتم بموعد مسبق، وبالتشاور الكامل معك قبل أي إجراء." },
        { name: "فينير وزراعة الأسنان", description: "فينير وزراعة أسنان باستخدام مواد حديثة، وكل حالة تُقيَّم بشكل فردي قبل اقتراح خطة العلاج." },
      ],
    },
    team: {
      heading: "تعرّفي على فريق ابتسامتك",
      subheading: "عيادة متخصصة تديرها الدكتورة بشرى بنفسها بإشراف مباشر.",
      comingSoon: "أعضاء جدد بالفريق قريبًا",
    },
    planner: {
      heading: "خططي لرحلة ابتسامتك",
      subheading: "احكيلنا شو بدك بالضبط وبنكمل الباقي.",
      stepGoal: "01. هدفك",
      stepMethod: "02. الطريقة المفضلة",
      stepPatient: "03. نوع المريض",
      selectTooth: "اختاري السن",
      selectToothHint: "اضغطي على أي سن لإضافته لخطتك",
      upper: "علوي",
      lower: "سفلي",
      right: "يمين",
      left: "يسار",
      tooth: "سن",
      result: "النتيجة",
      resultGoal: "الهدف",
      resultMethod: "الطريقة",
      resultPatient: "نوع المريض",
      resultTeeth: "الأسنان المختارة",
      resultDoctor: "الدكتورة",
      notSelected: "لم يتم الاختيار بعد",
      noneSelected: "لا يوجد اختيار",
      sendWhatsapp: "أرسلي لنا عبر واتساب",
      whatsappIntro: "أهلاً، حابة أخطط لزيارة بالتفاصيل التالية:",
    },
    gallery: {
      heading: "معرض الحالات",
      subheading: "نتائج حقيقية، لمرضى حقيقيين. يتم تحديث هذا القسم فور إضافة صور الحالات.",
    },
    testimonials: { heading: "آراء المرضى" },
    stories: {
      heading: "قصص مرضانا",
      subheading: "بكلماتهم هم.",
      tabAll: "الكل",
      empty: "لا يوجد قصص لهذه الخدمة بعد.",
      beforeAfterPlaceholder: "رح تُضاف صور قبل وبعد هون فور توفرها.",
    },
    contact: {
      heading: "خططي لزيارتك",
      subheading: "في عمّان، الأردن. تواصلي معنا مباشرة لحجز استشارة.",
      whatsapp: "واتساب",
      call: "اتصال",
      directions: "احصل على الاتجاهات",
    },
    hero: { ctaBook: "احجزي استشارة" },
    booking: {
      heading: "ابدئي خطوتك الأولى",
      subheading: "عبّي البيانات وبنأكدلك مباشرة عبر واتساب.",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "اسمك",
      phoneLabel: "رقم الهاتف",
      phonePlaceholder: "07XX XXX XXX",
      serviceLabel: "الخدمة",
      servicePlaceholder: "اختاري خدمة",
      dateLabel: "التاريخ المفضل",
      submit: "أرسلي الطلب",
      errorName: "فضلاً أدخلي اسمك.",
      errorPhone: "فضلاً أدخلي رقم أردني صحيح.",
      errorService: "فضلاً اختاري خدمة.",
      successTitle: "تم إرسال الطلب",
      successBody: "فتحنالك واتساب ببياناتك — ابعتي الرسالة لتأكيد الموعد.",
      whatsappIntro: "أهلاً، حابة أحجز موعد بالتفاصيل التالية:",
      fieldDate: "التاريخ المفضل",
      fieldNotSet: "غير محدد",
    },
    assistant: {
      name: "مساعد الحجز",
      disclosure: "مساعد آلي للحجز",
      greeting: "أهلاً! بقدر أساعدك تحجز زيارة مع الدكتورة بشرى — اسألني أي سؤال، أو استخدم اختصار من تحت.",
      quickBook: "احجز زيارة",
      quickServices: "الخدمات",
      quickLocation: "الموقع وساعات العمل",
      quickWhatsapp: "تحدث معنا على واتساب",
      typing: "عم يكتب…",
      inputPlaceholder: "اكتب رسالة…",
      sendAria: "إرسال",
      continueWhatsapp: "تابع عبر واتساب",
      locationInfo: "عيادتنا في عمّان، الأردن. لتأكيد الأوقات بالضبط، ابعتلنا رسالة عالواتساب وبنردلك.",
    },
  },
};
