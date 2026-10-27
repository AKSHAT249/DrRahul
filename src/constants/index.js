import { HeartPulse, Activity, ShieldCheck, Stethoscope, Award, Globe2 } from "lucide-react";


const SPECIALTIES = [
    {
      icon: HeartPulse,
      name: "Women's Health Consultation",
      desc: "Personalised consultations for menstrual concerns, reproductive health, and overall well-being.",
    },
    {
      icon: Activity,
      name: "Pregnancy & Antenatal Care",
      desc: "Guidance and monitoring to support a healthy pregnancy at every stage.",
    },
    {
      icon: Stethoscope,
      name: "PCOS & Hormonal Health",
      desc: "Individualised evaluation and management of PCOS, irregular periods, and hormonal concerns.",
    },
    {
      icon: Award,
      name: "Fertility & Preconception Care",
      desc: "Support with fertility concerns, pregnancy planning, and preconception health.",
    },
    {
      icon: ShieldCheck,
      name: "Preventive & Routine Gynecology",
      desc: "Routine check-ups, screening guidance, and preventive care for long-term health.",
    },
    {
      icon: Globe2,
      name: "Menopause & Midlife Wellness",
      desc: "Support for menopause symptoms, changing hormones, and health through midlife.",
    },
  ];

const TRUST_POINTS = [
    "Personalized care for every patient",
    "Advanced technology & treatment",
    "Transparent, honest advice on every option",
    "Compassionate, unhurried consultations",
];

const REVIEWS = [
    {
      quote:
        "Dr. Rashmi Saxena made me feel comfortable discussing concerns I had been hesitant to talk about. She listened patiently and explained everything clearly.",
      name: "Priya Mehra",
    },
    {
      quote:
        "I appreciated how thoroughly my concerns were addressed. The consultation felt personal, reassuring, and never rushed.",
      name: "Neha Sharma",
    },
    {
      quote:
        "Women's health can feel overwhelming at times, but having my questions answered with such clarity and care made a real difference.",
      name: "Ananya Verma",
    },
  ];
  
const FAQS = [
    { q: "What should I bring on my first visit?", a: "Any previous test reports, a list of current medications, and your ID. If you've had an ECG or angiography elsewhere, bring those results too." },
    { q: "Do you provide online consultations?", a: "Yes, video consultations are available for follow-ups and initial screening. Book a slot and our team will share the video link." },
    { q: "How can I cancel or reschedule an appointment?", a: "Message us on WhatsApp or call the clinic at least 4 hours before your slot and we'll help you reschedule." },
    { q: "How long is the waiting time?", a: "We schedule appointments in fixed slots to minimize wait times. Emergency cases are prioritized and may affect wait time on a given day." },
    { q: "Do you accept insurance?", a: "Most major insurance providers and TPAs are accepted. Our front desk will confirm your specific plan before your visit." },
];


export { SPECIALTIES, TRUST_POINTS, REVIEWS, FAQS };