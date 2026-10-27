import React, { useEffect, useRef, useState } from "react";
import {
  Menu, X, Star, MapPin, Phone, Clock, MessageCircle, ChevronRight, ChevronDown,
  HeartPulse, Activity, ShieldCheck, Stethoscope, Award, Globe2, Lock, CreditCard,
  Heart, Calendar, User,
} from "lucide-react";
import { SPECIALTIES, TRUST_POINTS, REVIEWS, FAQS } from "./constants";
import doctorPhoto from "./assets/doctor-hero.png";

/* ---------- brand tokens ---------- */
const C = {
  navy: "#14213D",
  navyDeep: "#0D1730",
  coral: "#D64550",
  coralSoft: "#F3C6C4",
  sand: "#F7F3EC",
  sandDeep: "#EFE6D8",
  white: "#FFFFFF",
  slate: "#5B6472",
};

const PHONE_DISPLAY = import.meta.env.VITE_PHONE_DISPLAY;
const WA_NUMBER = import.meta.env.VITE_WA_NUMBER;
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const HERO_DAYS = [
  { d: "Tue", n: "22" },
  { d: "Wed", n: "23" },
  { d: "Thu", n: "24" },
  { d: "Fri", n: "25" },
  { d: "Sat", n: "26" },
];
const HERO_TIMES = ["10:00 AM", "11:00 AM", "12:00 PM", "4:00 PM", "5:30 PM", "6:00 PM"];

const HERO_POINTS = [
  { icon: Calendar, title: "Book Appointment", desc: "Choose a convenient date & time." },
  { icon: Phone, title: "Call Before Visiting", desc: "Get quick guidance and consultation." },
  { icon: User, title: "Experienced Doctor", desc: "12+ years of expertise in women's health." },
];

/* ---------- scroll reveal ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}>
      {children}
    </div>
  );
}



/* ---------- component ---------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [slot, setSlot] = useState(0);
  const [slotTime, setSlotTime] = useState(HERO_TIMES[0]);

  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", reason: "", patientType: "New Patient",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submitBooking = (e) => {
    e.preventDefault();
    const msg =
      `Hi Dr. Rahul Verma's clinic! I'd like to book an appointment.\n\n` +
      `Name: ${form.name || "-"}\nPhone: ${form.phone || "-"}\nPreferred date: ${form.date || "Flexible"}` +
      (form.time ? `\nPreferred time: ${form.time}` : "") +
      (form.reason ? `\nReason for visit: ${form.reason}` : "") +
      `\nPatient type: ${form.patientType}`;
    window.open(waLink(msg), "_blank");
    setSubmitted(true);
  };

  return (
    <div style={{ background: C.sand, color: C.navy, fontFamily: "'Inter', sans-serif" }} className="min-h-screen w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,500&family=Inter:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Newsreader', serif; }
        html { scroll-behavior: smooth; }
        @keyframes ringPulse {
          0% { box-shadow: 0 0 0 0 rgba(214,69,80,0.45); }
          70% { box-shadow: 0 0 0 14px rgba(214,69,80,0); }
          100% { box-shadow: 0 0 0 0 rgba(214,69,80,0); }
        }
        .wa-pulse { animation: ringPulse 2.4s cubic-bezier(.4,0,.6,1) infinite; }
        .card-lift { transition: transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease; }
        .card-lift:hover { transform: translateY(-5px); box-shadow: 0 20px 36px -18px rgba(20,33,61,0.28); }
        .underline-grow { position: relative; }
        .underline-grow::after {
          content: ""; position: absolute; left: 0; bottom: -3px; height: 1px; width: 0%;
          background: ${C.coral}; transition: width 0.35s ease;
        }
        .underline-grow:hover::after { width: 100%; }
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse { animation: none !important; }
        }
      `}</style>

      {/* ---------- NAV ---------- */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(247,243,236,0.92)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.sandDeep}` }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse size={22} style={{ color: C.coral }} />
            <span className="font-display text-xl" style={{ color: C.navy }}>Dr. Rashmi Saxena</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Specialties", "Book", "Reviews", "Clinic", "FAQ"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="underline-grow">{l}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:+${WA_NUMBER}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold" style={{ border: `1.5px solid ${C.navy}`, color: C.navy }}>
              <Phone size={15} /> Call Now
            </a>
            <a href={waLink("Hi! I'd like to book an appointment with Dr. Rahul Verma.")} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: C.coral }}>
              <MessageCircle size={15} /> Book Appointment
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{ background: C.sand }}>
            {["Specialties", "Book", "Reviews", "Clinic", "FAQ"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-sm font-medium">{l}</a>
            ))}
            <a href={waLink("Hi! I'd like to book an appointment with Dr. Rahul Verma.")} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: C.coral }}>
              <MessageCircle size={16} /> Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* ---------- HERO ---------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-14 sm:pb-16 md:pt-20 md:pb-20 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold" style={{ background: C.coralSoft, color: C.coral }}>
              <Heart size={14} fill={C.coralSoft} /> Trusted Care for Every Stage
            </span>
          </Reveal>

          <Reveal>
            <h1 className="font-display mt-4 sm:mt-5 text-[2.35rem] sm:text-5xl md:text-6xl leading-[1.05]" style={{ color: C.navy }}>
              Your Health,<br />
              <span className="italic" style={{ color: C.coral }}>Our Priority.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 sm:mt-5 text-[0.95rem] sm:text-lg leading-relaxed max-w-md" style={{ color: C.slate }}>
              Book an appointment or call <span className="font-semibold" style={{ color: C.navy }}>Dr. Rashmi Saxena</span>, an experienced
              gynecologist, and get expert guidance — before you visit the clinic. Your comfort and care, always.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-x-3 sm:gap-x-6">
              {HERO_POINTS.map((item) => (
                <div key={item.title} className="min-w-0">
                  <item.icon size={22} strokeWidth={1.75} style={{ color: C.coral }} />
                  <p className="font-semibold text-[13px] sm:text-sm leading-snug mt-2.5">{item.title}</p>
                  <p className="text-[12px] sm:text-[13px] mt-1 leading-snug" style={{ color: C.slate }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 sm:mt-7 flex flex-col min-[420px]:flex-row min-[420px]:flex-wrap gap-3">
              <a href="#book"
                className="w-full min-[420px]:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white shadow-lg min-h-12"
                style={{ background: C.coral }}>
                <Calendar size={18} /> Book Appointment
              </a>
              <a href={`tel:+${WA_NUMBER}`}
                className="w-full min-[420px]:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold min-h-12"
                style={{ background: C.white, border: `1.5px solid ${C.sandDeep}`, color: C.navy }}>
                <Phone size={16} /> Call Now
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-5 sm:mt-6 flex items-start gap-2 text-xs sm:text-sm" style={{ color: C.slate }}>
              <ShieldCheck size={16} className="shrink-0 mt-0.5" style={{ color: C.coral }} />
              <span>Consultant Gynecologist · 12+ years of experience</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-w-0 w-full">
          <div className="relative mx-auto w-full max-w-[460px] md:max-w-none">
            <div className="rounded-[28px] p-2.5 sm:p-3" style={{ background: C.navy }}>
              <div className="relative">
                <img
                  src={doctorPhoto}
                  alt="Dr. Rashmi Saxena"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-[center_12%] rounded-[20px]"
                />
                {/* <div
                  className="absolute z-10 left-2.5 right-20 bottom-6 sm:left-auto sm:bottom-8 sm:right-14 sm:w-[220px] rounded-2xl p-3"
                  style={{ background: C.white, boxShadow: "0 18px 40px -16px rgba(20,33,61,0.45)" }}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: C.coralSoft }}>
                      <Calendar size={14} style={{ color: C.coral }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-tight">Choose a convenient time</p>
                      <p className="text-[11px] mt-0.5 leading-snug" style={{ color: C.slate }}>Select a date and time for your consultation or call.</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-5 gap-1">
                    {HERO_DAYS.map((day, i) => (
                      <button
                        key={day.d}
                        type="button"
                        onClick={() => setSlot(i)}
                        className="rounded-lg py-1.5 text-center leading-none"
                        style={{
                          background: slot === i ? C.coral : C.sand,
                          color: slot === i ? C.white : C.navy,
                        }}
                      >
                        <span className="block text-[10px] font-medium opacity-80">{day.d}</span>
                        <span className="block text-sm font-semibold mt-0.5">{day.n}</span>
                      </button>
                    ))}
                  </div>
                  <div className="relative mt-2.5">
                    <select
                      aria-label="Preferred time"
                      value={slotTime}
                      onChange={(e) => setSlotTime(e.target.value)}
                      className="w-full appearance-none rounded-lg px-3 py-2 pr-8 text-sm font-medium outline-none"
                      style={{ background: C.white, border: `1px solid ${C.sandDeep}`, color: C.navy }}
                    >
                      {HERO_TIMES.map((time) => <option key={time}>{time}</option>)}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: C.slate }} />
                  </div>
                  <a href="#book"
                    className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-[13px] font-semibold text-white whitespace-nowrap min-h-11"
                    style={{ background: C.coral }}>
                    <Calendar size={15} /> Schedule Consultation
                  </a>
                </div> */}
              </div>
            </div>

            <div className="relative z-20 -mt-5 sm:-mt-7 mx-1 rounded-2xl px-3 py-3 sm:px-4"
              style={{ background: "#FBF6F0", boxShadow: "0 14px 32px -18px rgba(20,33,61,0.45)" }}>
              <div className="flex items-start gap-2.5">
                <img src={doctorPhoto} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover object-[center_15%]" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm leading-tight">Dr. Rashmi Saxena</p>
                      <p className="text-[11px] sm:text-xs mt-0.5 leading-snug" style={{ color: C.slate }}>MBBS, MS (Obstetrics & Gynecology)</p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] sm:text-xs">
                        <Star size={12} fill="#E2A100" strokeWidth={0} />
                        <span className="font-semibold">4.8</span>
                        <span style={{ color: C.slate }}>(120+ reviews)</span>
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-row items-center text-center w-full md:w-[142px] rounded-lg px-2 py-2" style={{ background: C.coralSoft }}>
                      <span className="flex h-7 w-8 items-center justify-center rounded-full" style={{ background: C.coralSoft }}>
                        <Award size={15} />
                      </span>
                      <p className="text-[10px] font-semibold leading-tight mt-1">12+ Years of Experience</p>
                    </div>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] sm:text-xs" style={{ color: C.slate }}>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#3BA55D" }} />
                    Experienced Gynecologist · 12+ years of experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- CREDENTIALS STRIP ---------- */}
      <section className="border-y" style={{ borderColor: C.sandDeep, background: C.white }}>
        <div className="max-w-6xl mx-auto px-6 py-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            "MBBS — King George's Medical University",
            "MD (General Medicine) — KGMC, Lucknow",
            "DM (Cardiology) — SGPGIMS, Lucknow",
            "Associated with leading hospitals in Lucknow",
          ].map((t) => (
            <div key={t} className="flex items-start gap-2">
              <Award size={16} className="mt-0.5 shrink-0" style={{ color: C.coral }} />
              <span style={{ color: C.slate }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- SPECIALTIES ---------- */}
      <section id="specialties" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.coral }}>Specialized Cardiac Care</p>
          <h2 className="font-display text-4xl mt-3 max-w-xl">Focused treatment, from consultation to recovery.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {SPECIALTIES.map((s, i) => (
            <Reveal key={s.name} delay={0.05 * (i % 3)}>
              <div className="card-lift h-full rounded-2xl p-6" style={{ background: C.white, border: `1px solid ${C.sandDeep}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: C.coralSoft }}>
                  <s.icon size={20} style={{ color: C.coral }} />
                </div>
                <h3 className="font-semibold text-base">{s.name}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: C.slate }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 rounded-2xl p-8" style={{ background: C.navy, color: C.white }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.coralSoft }}>Why patients trust us</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {TRUST_POINTS.map((t) => (
                <div key={t} className="flex items-start gap-2 text-sm">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0" style={{ color: C.coralSoft }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- BOOKING ---------- */}
      <section id="book" className="py-24" style={{ background: C.white }}>
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-center" style={{ color: C.coral }}>Book an appointment</p>
            <h2 className="font-display text-4xl mt-3 text-center">Fill in the details, we'll confirm shortly.</h2>
          </Reveal>

          <Reveal delay={0.1}>
            {!submitted ? (
              <form onSubmit={submitBooking} className="mt-10 rounded-2xl p-7" style={{ background: C.sand, border: `1px solid ${C.sandDeep}` }}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.slate }}>Full Name *</label>
                    <input required value={form.name} onChange={set("name")} placeholder="Enter your full name"
                      className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: C.white, border: `1px solid ${C.sandDeep}` }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.slate }}>Phone Number *</label>
                    <input required value={form.phone} onChange={set("phone")} placeholder="10-digit mobile number"
                      className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: C.white, border: `1px solid ${C.sandDeep}` }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.slate }}>Preferred Date *</label>
                    <input required type="date" value={form.date} onChange={set("date")}
                      className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: C.white, border: `1px solid ${C.sandDeep}` }} />
                  </div>

                  {!showMore ? (
                    <button type="button" onClick={() => setShowMore(true)}
                      className="text-sm font-semibold underline-grow inline-flex items-center gap-1" style={{ color: C.coral }}>
                      + Add preferred time or reason for visit (optional)
                    </button>
                  ) : (
                    <>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.slate }}>Preferred Time</label>
                        <input type="time" value={form.time} onChange={set("time")}
                          className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: C.white, border: `1px solid ${C.sandDeep}` }} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.slate }}>Reason for Visit</label>
                        <textarea value={form.reason} onChange={set("reason")} placeholder="Briefly describe your concern" rows={3}
                          className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ background: C.white, border: `1px solid ${C.sandDeep}` }} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.slate }}>New or Returning Patient</label>
                        <div className="flex gap-3 mt-2">
                          {["New Patient", "Returning Patient"].map((opt) => (
                            <button key={opt} type="button" onClick={() => setForm((f) => ({ ...f, patientType: opt }))}
                              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold"
                              style={{
                                background: form.patientType === opt ? C.navy : C.white,
                                color: form.patientType === opt ? C.white : C.navy,
                                border: `1px solid ${C.sandDeep}`,
                              }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <button type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white mt-2" style={{ background: C.coral }}>
                    <MessageCircle size={18} /> Submit Request
                  </button>
                </div>

                <div className="mt-5 flex items-start gap-2 text-xs" style={{ color: C.slate }}>
                  <Lock size={14} className="mt-0.5 shrink-0" />
                  Your information is kept confidential and used only to confirm your appointment.
                </div>
                <div className="mt-2 flex items-start gap-2 text-xs" style={{ color: C.slate }}>
                  <CreditCard size={14} className="mt-0.5 shrink-0" />
                  Our team will share the consultation fee and available slots when confirming by phone or WhatsApp.
                </div>
              </form>
            ) : (
              <div className="mt-10 rounded-2xl p-10 text-center" style={{ background: C.sand, border: `1px solid ${C.sandDeep}` }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: C.coralSoft }}>
                  <HeartPulse size={26} style={{ color: C.coral }} />
                </div>
                <h3 className="font-display text-2xl">We've received your request!</h3>
                <p className="text-sm mt-2" style={{ color: C.slate }}>Our team will confirm your appointment by phone or WhatsApp within 2 hours.</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <a href={`tel:+${WA_NUMBER}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold" style={{ border: `1.5px solid ${C.navy}`, color: C.navy }}>
                    <Phone size={15} /> Call Now
                  </a>
                  <a href={waLink("Hi! Following up on my appointment request.")} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: C.coral }}>
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.coral }}>What patients say</p>
          <h2 className="font-display text-4xl mt-3 max-w-xl">Real feedback from real consultations.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="h-full rounded-2xl p-6" style={{ background: C.white, border: `1px solid ${C.sandDeep}` }}>
                <div className="flex gap-1 mb-4" style={{ color: C.coral }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={C.coral} strokeWidth={0} />)}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.navy }}>{r.quote}</p>
                <p className="text-xs mt-4 font-semibold" style={{ color: C.slate }}>— {r.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CLINIC DETAILS ---------- */}
      <section id="clinic" className="py-24" style={{ background: C.navy, color: C.white }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.coralSoft }}>Clinic Details</p>
            <h2 className="font-display text-4xl mt-3">Your Care, Close to Home</h2>
            <div className="mt-7 space-y-5 text-sm">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" style={{ color: C.coralSoft }} />
                <p style={{ color: "#C7CCD9" }}>123, Hirala Nagar, Near Meredia Hospital, Lucknow, Uttar Pradesh 226020</p>
              </div>
              <div className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0" style={{ color: C.coralSoft }} />
                <p style={{ color: "#C7CCD9" }}>Monday – Saturday · 9:00 AM – 1:00 PM &amp; 5:00 PM – 8:30 PM</p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck size={18} className="mt-0.5 shrink-0" style={{ color: C.coralSoft }} />
                <p style={{ color: "#C7CCD9" }}>Parking available · Wheelchair accessible</p>
              </div>
              <div className="flex gap-3">
                <CreditCard size={18} className="mt-0.5 shrink-0" style={{ color: C.coralSoft }} />
                <p style={{ color: "#C7CCD9" }}>Most major insurance cards and TPAs accepted</p>
              </div>
            </div>
            <a href={waLink("Hi! Could you share directions to the clinic?")} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 mt-7 font-semibold underline-grow" style={{ color: C.coralSoft }}>
              Get directions <ChevronRight size={16} />
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl aspect-[4/3] w-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <MapPin size={28} style={{ color: C.coral }} />
              <span className="ml-2 text-sm" style={{ color: "#C7CCD9" }}>Map preview</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.coral }}>Frequently Asked Questions</p>
          <h2 className="font-display text-4xl mt-3">Good to know before your visit.</h2>
        </Reveal>
        <div className="mt-10 divide-y" style={{ borderColor: C.sandDeep }}>
          {FAQS.map((f, i) => (
            <div key={i} className="py-5" style={{ borderTop: i === 0 ? "none" : `1px solid ${C.sandDeep}` }}>
              <button className="w-full flex items-center justify-between text-left font-semibold" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <ChevronDown size={18} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s ease", color: C.coral }} />
              </button>
              <div style={{
                maxHeight: openFaq === i ? "200px" : "0px", overflow: "hidden",
                transition: "max-height 0.35s ease",
              }}>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: C.slate }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="py-12" style={{ background: C.sandDeep }}>
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse size={18} style={{ color: C.coral }} />
              <span className="font-display text-lg">Dr. Rashmi Saxena</span>
            </div>
            <p className="mt-2" style={{ color: C.slate }}>Providing expert women's health care with compassion and advanced treatment.</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Clinic Hours</p>
            <p style={{ color: C.slate }}>Mon – Sat · 9:00 AM – 1:00 PM</p>
            <p style={{ color: C.slate }}>5:00 PM – 8:30 PM</p>
            <p style={{ color: C.slate }}>Sunday · Closed</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Contact</p>
            <a href={`tel:+${WA_NUMBER}`} className="block" style={{ color: C.slate }}>{PHONE_DISPLAY}</a>
            <a href={waLink("Hi Dr. Verma's clinic!")} target="_blank" rel="noreferrer" className="block" style={{ color: C.slate }}>WhatsApp</a>
          </div>
        </div>
        <p className="text-center text-xs mt-8" style={{ color: C.slate }}>© Dr. Rashmi Saxena Women's Health Clinic. All rights reserved.</p>
      </footer>

      {/* ---------- FLOATING WHATSAPP ---------- */}
      <a href={waLink("Hi! I'd like to book an appointment with Dr. Rashmi Saxena.")} target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-pulse fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: C.coral }}>
        <MessageCircle size={26} color={C.white} />
      </a>
    </div>
  );
}