export const siteConfig = {
  name: "SMA Medical College of Naturopathy & Yogic Sciences",
  shortName: "SMA Medical College",
  legalAlternateName: "SMA AYUSH Medical College of Naturopathy and Yogic Science",
  description:
    "Explore the BNYS programme, campus facilities and admissions at SMA Medical College of Naturopathy & Yogic Sciences in Bhopal, Madhya Pradesh.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://smamedicalcollege.com",
  locale: "en_IN",
  phone: "+91 89208 37157",
  phoneHref: "+918920837157",
  email: "smacollege@gmail.com",
  alternateEmail: "hakeemabdulazeem@gmail.com",
  address: {
    street: "Airport Road, Parwaliya Sadak",
    city: "Bhopal",
    region: "Madhya Pradesh",
    postalCode: "462030",
    country: "IN",
  },
  coordinates: {
    latitude: 23.329485,
    longitude: 77.2559471,
  },
  programme: {
    name: "Bachelor of Naturopathy and Yogic Sciences (BNYS)",
    shortName: "BNYS",
    duration: "5½ years",
    academics: "4½ years",
    internship: "1 year",
    intake: "60 students",
  },
  admissionsYear: "2026–27",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1146.0743284772986!2d77.2559471!3d23.329485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c5cf9a377bfb7%3A0x4e88ce749813be1!2sS.M.A.%20Medical%20Collage%20Of%20Naturopathy%20And%20Yogic%20Science!5e1!3m2!1sen!2sin!4v1784531852946!5m2!1sen!2sin",
} as const;

export const primaryNavigation = [
  { href: "/bnys", label: "BNYS Programme" },
  { href: "/admissions", label: "Admissions" },
  { href: "/academics", label: "Academics" },
  { href: "/campus", label: "Campus" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
] as const;

export const courseYears = [
  {
    year: "First year",
    focus: "Foundations",
    subjects: [
      "Anatomy",
      "Physiology",
      "Biochemistry",
      "Philosophy of Nature Cure",
      "Principles and Practice of Yoga",
    ],
  },
  {
    year: "Second year",
    focus: "Disease and community health",
    subjects: [
      "Pathology",
      "Microbiology",
      "Community Medicine",
      "Yoga Philosophy",
      "Magnetotherapy and Chromotherapy",
      "Basic Pharmacology",
      "Forensic Medicine and Toxicology",
    ],
  },
  {
    year: "Third year",
    focus: "Diagnosis and therapies",
    subjects: [
      "Manipulative Therapies",
      "Acupuncture",
      "Yoga Application",
      "Fasting Therapy",
      "Naturopathy Diagnosis",
      "Modern Diagnosis and First Aid",
      "Psychology and Basic Psychiatry",
    ],
  },
  {
    year: "Fourth year",
    focus: "Clinical application",
    subjects: [
      "Nutrition, Dietetics and Herbs",
      "Obstetrics and Gynaecology",
      "Yoga Therapy",
      "Hydrotherapy",
      "Physiotherapy",
      "Holistic Practices",
      "Hospital Management and Research Methodology",
    ],
  },
] as const;

export const facilities = [
  {
    title: "Teaching laboratories",
    description:
      "Well-ventilated classrooms and separate learning laboratories for anatomy, physiology, biochemistry, microbiology and pathology.",
    icon: "FlaskConical",
    details: ["Seminar hall", "Departmental staff rooms", "Dissection hall"],
  },
  {
    title: "Attached hospital",
    description:
      "An attached teaching hospital with a specialised OPD, clinical laboratory and spaces for naturopathy, yoga and diagnostic learning.",
    icon: "Hospital",
    details: ["General ward and room categories", "Separate yoga halls", "Diagnostic-method training"],
  },
  {
    title: "Library",
    description:
      "Open-access print and electronic resources covering naturopathy, yoga and foundational medical sciences.",
    icon: "BookOpen",
    details: ["Paper and electronic holdings", "Current learning materials", "Demand-based loan periods"],
  },
  {
    title: "Student hostels",
    description:
      "Separate accommodation for men and women with dining, reading and yoga or prayer spaces.",
    icon: "BedDouble",
    details: ["Hygienic kitchen and dining halls", "Reading rooms", "Yoga or prayer hall"],
  },
  {
    title: "Digital learning centre",
    description:
      "The current website reports 40 internet-connected systems with printing, scanning and photocopying facilities.",
    icon: "Monitor",
    details: ["Published access: 9am–6pm", "Student and staff use", "Printing and scanning"],
  },
  {
    title: "Sports and wellbeing",
    description:
      "Outdoor ground and indoor facilities for chess, table tennis and badminton.",
    icon: "Activity",
    details: ["Maintained outdoor ground", "Indoor games", "Inter-college participation"],
  },
] as const;

export const publishedLeadership = [
  {
    name: "Dr. Mohan Sharma",
    publishedTitle: "President",
    image: "/images/leadership/mohan-sharma.jpg",
    imageAlt: "Portrait of Dr. Mohan Sharma",
    focus: "A founding vision for natural-medicine education",
    summary:
      "A vision to build a leading natural-medicine institution and prepare practitioners who understand health as a unity of body, mind and spirit.",
    salutation: "Dear students,",
    quote: null,
    message: [
      "The advancement of modern technology and changes in lifestyle have also led to the occurrence of several diseases. At a time when modern technology, environmental pollution, poor diet and stress play significant roles in the degradation of health, a naturopath’s ability to apply natural methods of healing is of considerable importance.",
      "Using a range of alternative diagnostic methods, a naturopath can often successfully pinpoint a predisposition in the body before the onset of acute disease and treat the patient with specific therapies and changes in lifestyle.",
      "As a medical practitioner, I realised how powerful and effective the fundamentals of natural medicine were—and continue to be. The more evidence I see, the more courage and enthusiasm I gain to offer this service to others who want to learn and practise.",
      "The dream was to create a college that would become one of the foremost educational institutions for natural medicine. I am honoured to say that, through the collaborative efforts of our distinguished Board of Directors and our friendly and professional administration and staff, we have fulfilled many of our goals.",
      "SMA Medical College of Naturopathy & Yogic Sciences strives to create successful naturopaths who are able to see the human body as a holistic unity of body, mind and spirit.",
      "I invite all students who have a passion for healing and want to embark on a rewarding, life-transforming journey to help themselves and others by joining us.",
    ],
    closing: "Best of luck.",
    credentials: "(G.A.S.V.G.S)",
  },
  {
    name: "Dr. Azeem Khan",
    publishedTitle: "President",
    image: "/images/leadership/azeem-khan.png",
    imageAlt: "Portrait of Dr. Azeem Khan",
    focus: "Whole-person care through naturopathy and yoga",
    summary:
      "An approach to naturopathy and yogic sciences that supports the body, mind and emotions through natural therapeutic methods.",
    salutation: "Dear students,",
    quote: null,
    message: [
      "Naturopathy and yogic sciences are a holistic approach to wellness, based on the principle that the body has the inherent ability to heal itself. Using the healing power of nature and gentle therapeutic techniques, the body, mind and emotions are supported during the healing process.",
      "Naturopathic principles are based on treating each person as an individual and treating the whole person, not just the affected area. I am tremendously honoured to be part of this esteemed college, dedicated to developing efficient and skilful naturopaths and bringing about a change in the treatment of the sick.",
    ],
    closing: "Best of luck.",
    credentials: null,
  },
  {
    name: "Dr. Dilip Rajoyria",
    publishedTitle: "Principal",
    image: "/images/leadership/dilip-rajoyria.jpg",
    imageAlt: "Portrait of Dr. Dilip Rajoyria",
    focus: "Accessible education, research and clinical application",
    summary:
      "Accessible education in natural medicine and yoga, connecting nature cure with scientific knowledge, diagnostics, research and clinical learning.",
    salutation: "Dear students,",
    quote: "Success is not a journey but a destination.",
    message: [
      "Naturopathy and yoga advocate a life close to nature and help us maintain a healthy relationship with our environment.",
      "The treatment is based on a judicious blending of the ancient concepts of nature cure and yoga with scientific knowledge, while diagnostics are kept in line with modern medical science. These therapies take a holistic approach to managing disease.",
      "At SMA Medical College of Naturopathy and Yogic Sciences, we provide accessible and affordable education in natural medicine and yoga for people from all cultures and socioeconomic backgrounds.",
      "It is with great pride that I invite you to become a student and experience firsthand the academic benefits offered by our college, which is fully committed to freedom of choice in healthcare through holistic health education, research and clinical applications.",
      "Our intention is to create competent and credible practitioners who can be of service through education and healthcare, empowering individuals to take charge of their own health and the well-being of body, mind and spirit.",
    ],
    closing: "Best of luck.",
    credentials: null,
  },
] as const;

export const clinicTherapies = [
  "Enema",
  "Hip bath",
  "Spinal bath",
  "Spinal spray",
  "Mud packs",
  "Steam bath",
  "Sauna bath",
  "Scientific massage",
  "Foot and arm bath",
  "Chromo bath",
  "Mud bath",
  "Immersion bath",
  "Underwater pressure massage",
  "Water-pressure jet massage",
  "Wall-mounted jet spray",
  "Asthma bath",
  "Magnetotherapy",
  "Acupressure",
  "Acupuncture",
  "Physiotherapy",
] as const;

export const legacyContentNotice =
  "Programme facts and institutional claims must be checked against the latest university and admission orders before final publication.";
