export type FaqTopic = "Courses & Certification" | "Booking & Payment" | "Group & Onsite Training";
export type Faq = { q: string; a: string; topic: FaqTopic };

export const FAQ_TOPICS: FaqTopic[] = ["Courses & Certification", "Booking & Payment", "Group & Onsite Training"];

/** Shown on /faq (all) and the home page (first five). Plain text, so the
 *  FAQPage structured data matches what is on the page. */
export const FAQS: Faq[] = [
  {
    topic: "Courses & Certification",
    q: "Are your classes American Heart Association courses?",
    a: "Yes. Our instructor is certified through the American Heart Association, and every course we teach is an official AHA course. You receive an AHA course completion card when you pass.",
  },
  {
    topic: "Courses & Certification",
    q: "How long is my certification valid?",
    a: "AHA BLS, Heartsaver and Pediatric First Aid CPR AED cards are valid for two years. We recommend booking your renewal a month or two before your card expires.",
  },
  {
    topic: "Courses & Certification",
    q: "Which course do I need?",
    a: "If you work in healthcare or are a healthcare student, you usually need BLS. Most other workplaces ask for Heartsaver CPR, First Aid and AED. Childcare providers usually take Pediatric First Aid, CPR and AED. If your employer or school gave you a requirement, send it to us and we will confirm the right course.",
  },
  {
    topic: "Courses & Certification",
    q: "What is blended learning?",
    a: "You complete the AHA online portion at your own pace, then attend a shorter hands-on skills session with our instructor. It is a good fit if you want less time in class.",
  },
  {
    topic: "Group & Onsite Training",
    q: "Do you train at our workplace?",
    a: `Yes. We bring the manikins, AED trainers and materials to your site and can train up to 18 people in a day. We serve Los Angeles County and neighboring counties. Travel outside Los Angeles County may include a travel fee.`,
  },
  {
    topic: "Group & Onsite Training",
    q: "How is group training priced?",
    a: "Group training is priced per person, with discounts for larger groups. Tell us your group size, course and location and we will send a written quote.",
  },
  {
    topic: "Booking & Payment",
    q: "How do I pay?",
    a: "Individuals can pay by card, Zelle or check. Businesses can pay by card or ask to be invoiced.",
  },
  {
    topic: "Courses & Certification",
    q: "Will I get my card the same day?",
    a: "Your AHA card is issued after the class once your roster is processed. We will let you know when to expect it.",
  },
  {
    topic: "Booking & Payment",
    q: "Do I need a course book?",
    a: "AHA student manuals and course books are available to buy from us. Some employers and schools require you to have your own copy, so ask when you book and we will have one ready for you.",
  },
  {
    topic: "Booking & Payment",
    q: "What should I wear and bring?",
    a: "Wear comfortable clothes you can kneel in, since you will practice on the floor. Bring a photo ID. If you are taking a blended course, bring your online completion certificate.",
  },
  {
    topic: "Booking & Payment",
    q: "Can I reschedule?",
    a: "Yes. See our cancellation and rescheduling policy for the notice we need and any fees.",
  },
];
