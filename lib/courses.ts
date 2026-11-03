/**
 * The three AHA courses DRZ teaches, from the questionnaire.
 *
 * `price` is the individual price shown on the site. The client chose "show
 * prices for individuals, quote for groups" but has not given individual
 * prices yet, so each is null and the page shows "Call for price" until it is
 * filled in. Durations are typical AHA ranges; confirm them with the
 * instructor before launch.
 */
export type Course = {
  slug: string;
  name: string;
  short: string;
  /** One-line audience, for cards. */
  audience: string;
  image: string;
  imageAlt: string;
  duration: string;
  card: string;
  price: number | null;
  /** Shows the "Most popular" ribbon on the card. */
  popular?: boolean;
  formats: string[];
  summary: string;
  whoFor: string[];
  learn: string[];
  metaTitle: string;
  metaDescription: string;
};

export const COURSES: Course[] = [
  {
    slug: "heartsaver-cpr-first-aid-aed",
    name: "Heartsaver CPR, First Aid & AED",
    short: "Heartsaver CPR, First Aid & AED",
    audience: "Workplaces, teachers, coaches and the public",
    image: "/images/heartsaver.webp",
    imageAlt: "A student practicing chest compressions on a CPR manikin next to a training AED",
    duration: "About 4 to 6 hours",
    card: "AHA Heartsaver card, valid 2 years",
    price: null,
    popular: true,
    formats: ["Classroom", "Blended", "Onsite"],
    summary:
      "Our most popular course. Learn to recognize an emergency, give CPR and use an AED on adults, children and infants, and handle the first aid problems that happen at work and at home.",
    whoFor: [
      "Employees who need a CPR and first aid card for work",
      "Teachers, coaches and youth leaders",
      "Fitness instructors and personal trainers",
      "Anyone who wants to be ready for an emergency",
    ],
    learn: [
      "CPR for adults, children and infants",
      "Using an AED safely",
      "Choking relief",
      "Controlling bleeding and caring for wounds and burns",
      "Allergic reactions, asthma, seizures and stroke",
      "Shock, heat and cold emergencies",
    ],
    metaTitle: "Heartsaver CPR, First Aid & AED Class in Los Angeles County",
    metaDescription:
      "AHA Heartsaver CPR, First Aid and AED training in Los Angeles County. Classroom, blended or onsite at your workplace. Book a seat or request a group quote.",
  },
  {
    slug: "bls",
    name: "BLS Provider (Basic Life Support)",
    short: "BLS (Basic Life Support)",
    audience: "Nurses, medical staff and healthcare students",
    image: "/images/bls.webp",
    imageAlt: "A group of students practicing CPR on manikins during a BLS class",
    duration: "About 3 to 4 hours",
    card: "AHA BLS Provider card, valid 2 years",
    price: null,
    formats: ["Classroom", "Blended", "Onsite"],
    summary:
      "The AHA course for healthcare providers. Practice high-quality CPR, AED use and bag-mask ventilation as a single rescuer and as part of a team.",
    whoFor: [
      "Nurses, CNAs and medical assistants",
      "Dental and clinic staff",
      "EMTs, firefighters and first responders",
      "Nursing and healthcare students",
    ],
    learn: [
      "High-quality CPR for adults, children and infants",
      "AED use in a healthcare setting",
      "Bag-mask ventilation",
      "Two-rescuer and team-based resuscitation",
      "Choking relief for all ages",
      "Opioid-associated emergencies",
    ],
    metaTitle: "BLS Certification Class in Los Angeles County | AHA BLS Provider",
    metaDescription:
      "AHA BLS Provider certification for nurses, medical staff and students in Los Angeles County. Classroom or blended skills sessions, and onsite training for clinics.",
  },
  {
    slug: "pediatric-first-aid-cpr-aed",
    name: "Pediatric First Aid, CPR & AED",
    short: "Pediatric First Aid, CPR & AED",
    audience: "Childcare providers, preschool staff and parents",
    image: "/images/pediatric.webp",
    imageAlt: "An infant CPR training manikin on a mat during a pediatric first aid class",
    duration: "About 5 to 7 hours",
    card: "AHA Pediatric First Aid CPR AED card, valid 2 years",
    price: null,
    formats: ["Classroom", "Blended", "Onsite"],
    summary:
      "First aid, CPR and AED focused on infants and children. Built for people who care for kids every day and want to know exactly what to do.",
    whoFor: [
      "Childcare providers and daycare staff",
      "Preschool and elementary teachers",
      "Nannies and babysitters",
      "Parents, grandparents and caregivers",
    ],
    learn: [
      "CPR and AED for infants and children",
      "Infant and child choking relief",
      "Allergic reactions and asthma",
      "Bleeding, burns, bites and stings",
      "Seizures, fever and dehydration",
      "Preventing common childhood injuries",
    ],
    metaTitle: "Pediatric First Aid, CPR & AED Class in Los Angeles County",
    metaDescription:
      "AHA Pediatric First Aid, CPR and AED training for childcare providers, teachers and parents in Los Angeles County. Classroom, blended or onsite.",
  },
];

export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);

export const priceLabel = (c: Course) => (c.price == null ? "Call for price" : `$${c.price}`);
