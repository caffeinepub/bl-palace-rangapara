import {
  ArrowUp,
  Bed,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  ParkingCircle,
  Phone,
  Shield,
  ShowerHead,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

const PHONE = "+91 98765 43210";
const PHONE_RAW = "+919876543210";
const EMAIL = "info@blpalacerangapara.com";
const ADDRESS = "Thakurbari Road, Near Jio Petroleum, Rangapara, Assam 784505";
const MAPS_URL = "https://maps.google.com/?q=Rangapara+Assam+784505";
const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20book%20a%20room%20at%20B.L%20Palace%20Rangapara";

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);
  return { ref, visible };
}

function Section({
  id,
  className,
  children,
}: { id?: string; className?: string; children: React.ReactNode }) {
  const { ref, visible } = useIntersection();
  return (
    <section id={id} className={className}>
      <div ref={ref} className={`animate-fade-up${visible ? " visible" : ""}`}>
        {children}
      </div>
    </section>
  );
}

const rooms = [
  {
    name: "Standard Room",
    desc: "Comfortable and clean rooms ideal for short stays and travelers.",
    img: "/assets/generated/room-standard.dim_800x600.jpg",
  },
  {
    name: "Deluxe Room",
    desc: "Spacious rooms with premium comfort and modern amenities.",
    img: "/assets/generated/room-deluxe.dim_800x600.jpg",
  },
  {
    name: "Family Room",
    desc: "Perfect for families looking for comfortable stay together.",
    img: "/assets/generated/room-family.dim_800x600.jpg",
  },
];

const testimonials = [
  {
    text: "Very clean and comfortable stay. Staff was extremely friendly and helpful. Will definitely visit again!",
    name: "Rahul S.",
    type: "Business Traveler",
    stars: 5,
  },
  {
    text: "Good location and very peaceful environment. Perfect for family stays. Great value for money.",
    name: "Priya M.",
    type: "Family Guest",
    stars: 5,
  },
  {
    text: "Best place to stay in Rangapara. Highly recommended for all travelers visiting the area.",
    name: "Amit K.",
    type: "Regular Guest",
    stars: 5,
  },
];

const whyUs = [
  {
    icon: <Sparkles size={28} />,
    title: "Clean & Hygienic Rooms",
    desc: "Spotlessly maintained for your comfort",
  },
  {
    icon: <Heart size={28} />,
    title: "Peaceful Environment",
    desc: "Quiet surroundings for a restful stay",
  },
  {
    icon: <ThumbsUp size={28} />,
    title: "Friendly Staff",
    desc: "Warm hospitality around the clock",
  },
  {
    icon: <Star size={28} />,
    title: "Budget Premium Experience",
    desc: "Premium feel at affordable rates",
  },
  {
    icon: <MapPin size={28} />,
    title: "Convenient Location",
    desc: "Easy access from the main road",
  },
  {
    icon: <Users size={28} />,
    title: "Family Friendly Stay",
    desc: "Safe and welcoming for all guests",
  },
];

const amenities = [
  { icon: <Bed size={24} />, label: "Comfortable Beds" },
  { icon: <ShowerHead size={24} />, label: "Clean Washrooms" },
  { icon: <ParkingCircle size={24} />, label: "Parking Available" },
  { icon: <Clock size={24} />, label: "24/7 Assistance" },
  { icon: <Users size={24} />, label: "Family Friendly" },
  { icon: <Shield size={24} />, label: "Safe Environment" },
  { icon: <Navigation size={24} />, label: "Easy Access Location" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { actor } = useActor();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const prevTestimonial = () =>
    setTestimonialIdx(
      (i) => (i - 1 + testimonials.length) % testimonials.length,
    );
  const nextTestimonial = () =>
    setTestimonialIdx((i) => (i + 1) % testimonials.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await actor?.submitBooking({
        name: form.name,
        phone: form.phone,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        message: form.message,
        submittedAt: BigInt(Date.now()),
      });
      setSubmitted(true);
      setForm({ name: "", phone: "", checkIn: "", checkOut: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              type="button"
              className="flex-shrink-0 cursor-pointer bg-transparent border-0 p-0"
              onClick={() => scrollTo("#home")}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0F172A] rounded flex items-center justify-center">
                  <span className="text-[#D4AF37] font-poppins font-bold text-xs">
                    BL
                  </span>
                </div>
                <div>
                  <div className="font-poppins font-bold text-[#0F172A] text-lg leading-tight">
                    B.L Palace
                  </div>
                  <div className="font-inter text-[#6B7280] text-xs leading-tight">
                    Rangapara
                  </div>
                </div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-inter text-sm font-medium text-[#1F2937] hover:text-[#D4AF37] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="hidden lg:inline-flex items-center gap-2 bg-[#0F172A] text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#1e293b] transition-colors"
              >
                Book Now
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-[#0F172A]"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left font-inter text-sm font-medium text-[#1F2937] py-2 hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="w-full bg-[#D4AF37] text-[#0F172A] font-poppins font-semibold text-sm px-5 py-3 rounded-lg mt-2"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <div id="home" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hotel-hero.dim_1400x800.jpg"
            alt="B.L Palace Rangapara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full px-4 py-1.5 mb-6">
              <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-[#D4AF37] font-inter text-sm font-medium">
                4.6 Rated · Rangapara, Assam
              </span>
            </div>
            <h1 className="font-poppins font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
              B.L Palace
              <br />
              <span className="text-[#D4AF37]">Rangapara</span>
            </h1>
            <p className="font-poppins font-semibold text-white/90 text-xl sm:text-2xl mb-4">
              Comfortable Stay in the Heart of Rangapara
            </p>
            <p className="font-inter text-white/75 text-base sm:text-lg mb-8 max-w-xl">
              Experience clean, comfortable, and affordable premium stay
              designed for travelers, families, and business guests.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                {
                  icon: (
                    <Star size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ),
                  text: "4.6 Rating",
                },
                {
                  icon: <MapPin size={14} className="text-[#D4AF37]" />,
                  text: "Rangapara, Assam",
                },
                {
                  icon: <Building2 size={14} className="text-[#D4AF37]" />,
                  text: "Comfortable Rooms",
                },
              ].map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1"
                >
                  {b.icon}
                  <span className="text-white text-xs font-medium">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="bg-[#D4AF37] text-[#0F172A] font-poppins font-semibold text-base px-8 py-3.5 rounded-lg hover:bg-[#c9a32e] transition-all shadow-lg hover:shadow-xl"
              >
                Book Your Stay
              </button>
              <a
                href={`tel:${PHONE_RAW}`}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-poppins font-semibold text-base px-8 py-3.5 rounded-lg hover:bg-white/20 transition-all"
              >
                <Phone size={18} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ROOMS */}
      <Section id="rooms" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-[#0F172A] text-3xl sm:text-4xl mb-3">
              Our Comfortable Stay Options
            </h2>
            <p className="font-inter text-[#6B7280] text-base max-w-xl mx-auto">
              Choose from our well-maintained rooms designed for your comfort
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room.name}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={room.img}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-poppins font-bold text-[#0F172A] text-xl mb-2">
                    {room.name}
                  </h3>
                  <p className="font-inter text-[#6B7280] text-sm mb-5">
                    {room.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo("#contact")}
                    className="w-full bg-[#D4AF37] text-[#0F172A] font-poppins font-semibold text-sm py-3 rounded-lg hover:bg-[#c9a32e] transition-colors"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] font-inter font-semibold text-xs px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                About Us
              </div>
              <h2 className="font-poppins font-bold text-[#0F172A] text-3xl sm:text-4xl mb-5">
                Welcome to B.L Palace Rangapara
              </h2>
              <p className="font-inter text-[#374151] text-base leading-relaxed mb-4">
                B.L Palace Rangapara offers a comfortable and peaceful stay for
                travelers visiting Rangapara. Known for clean rooms, friendly
                service, and convenient location, we provide a premium
                experience at affordable prices.
              </p>
              <p className="font-inter text-[#374151] text-base leading-relaxed mb-8">
                Whether you're visiting for business, family trip, or short
                stay, B.L Palace ensures a relaxing and hassle-free experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Clean Rooms",
                  "Friendly Service",
                  "Affordable Pricing",
                  "Prime Location",
                  "Family Friendly",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle2
                      size={18}
                      className="text-[#D4AF37] flex-shrink-0"
                    />
                    <span className="font-inter text-[#1F2937] text-sm font-medium">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hotel-hero.dim_1400x800.jpg"
                alt="B.L Palace"
                className="w-full rounded-2xl shadow-xl object-cover h-96"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#0F172A] text-white rounded-xl px-5 py-3 shadow-lg">
                <div className="font-poppins font-bold text-[#D4AF37] text-2xl">
                  4.6 ⭐
                </div>
                <div className="font-inter text-xs text-white/70">
                  Guest Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* WHY CHOOSE US */}
      <Section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-[#0F172A] text-3xl sm:text-4xl mb-3">
              Why Choose B.L Palace Rangapara
            </h2>
            <p className="font-inter text-[#6B7280] text-base max-w-xl mx-auto">
              We go beyond a typical stay — we offer a complete comfort
              experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-[#F8F7F4] rounded-2xl p-7 hover:shadow-md transition-shadow"
              >
                <div className="text-[#D4AF37] mb-4">{item.icon}</div>
                <h3 className="font-poppins font-semibold text-[#0F172A] text-lg mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-[#6B7280] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AMENITIES */}
      <Section id="amenities" className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-[#0F172A] text-3xl sm:text-4xl mb-3">
              Hotel Amenities
            </h2>
            <p className="font-inter text-[#6B7280] text-base">
              Everything you need for a comfortable stay
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenities.map((a) => (
              <div
                key={a.label}
                className="bg-white rounded-xl p-5 flex flex-col items-center gap-3 border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-md transition-all"
              >
                <div className="text-[#D4AF37]">{a.icon}</div>
                <span className="font-inter text-[#1F2937] text-sm font-medium text-center">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="reviews" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-[#0F172A] text-3xl sm:text-4xl mb-2">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-1 mb-1">
              {["s1", "s2", "s3", "s4", "s5"].map((sid) => (
                <Star
                  key={sid}
                  size={20}
                  className="fill-[#D4AF37] text-[#D4AF37]"
                />
              ))}
            </div>
            <p className="font-poppins font-bold text-[#0F172A] text-2xl">
              4.6 / 5 Rating
            </p>
          </div>

          <div className="relative flex items-center gap-4">
            <button
              type="button"
              onClick={prevTestimonial}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F8F7F4] border border-gray-200 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
            >
              <ChevronLeft size={20} className="text-[#0F172A]" />
            </button>
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <p className="font-inter text-[#374151] text-lg leading-relaxed mb-6 italic">
                "{testimonials[testimonialIdx].text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-poppins font-semibold text-[#0F172A]">
                    {testimonials[testimonialIdx].name}
                  </div>
                  <div className="font-inter text-[#6B7280] text-sm">
                    {testimonials[testimonialIdx].type}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {(["a", "b", "c", "d", "e"] as const)
                    .slice(0, testimonials[testimonialIdx].stars)
                    .map((sid) => (
                      <Star
                        key={sid}
                        size={16}
                        className="fill-[#D4AF37] text-[#D4AF37]"
                      />
                    ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={nextTestimonial}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F8F7F4] border border-gray-200 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
            >
              <ChevronRight size={20} className="text-[#0F172A]" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((t, i) => (
              <button
                type="button"
                key={t.name}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-[#D4AF37] w-6" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* LOCATION */}
      <Section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-[#0F172A] text-3xl sm:text-4xl mb-3">
              Conveniently Located in Rangapara
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden shadow-lg h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28585.04!2d92.6660!3d26.8300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744ef4b36c88b21%3A0xe8c5b3b60e3455e4!2sRangapara%2C%20Assam%20784505!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="B.L Palace Rangapara Location"
              />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-poppins font-bold text-[#0F172A] text-xl mb-5">
                Find Us Here
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <MapPin
                    size={20}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="font-inter font-medium text-[#1F2937] text-sm">
                      Address
                    </div>
                    <div className="font-inter text-[#6B7280] text-sm">
                      {ADDRESS}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone
                    size={20}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="font-inter font-medium text-[#1F2937] text-sm">
                      Phone
                    </div>
                    <a
                      href={`tel:${PHONE_RAW}`}
                      className="font-inter text-[#6B7280] text-sm hover:text-[#D4AF37]"
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Building2
                    size={20}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="font-inter font-medium text-[#1F2937] text-sm">
                      Nearby Landmarks
                    </div>
                    <div className="font-inter text-[#6B7280] text-sm">
                      Near Jio Petroleum · Thakurbari Road · Rangapara Town
                      Center
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0F172A] text-white font-poppins font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#1e293b] transition-colors"
              >
                <Navigation size={16} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA BANNER */}
      <Section className="py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-white text-3xl sm:text-4xl mb-3">
            Book Your Comfortable Stay Today
          </h2>
          <p className="font-inter text-[#D4AF37] text-lg mb-8">
            Affordable comfort. Peaceful stay. Trusted hospitality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="bg-[#D4AF37] text-[#0F172A] font-poppins font-semibold text-base px-8 py-3.5 rounded-lg hover:bg-[#c9a32e] transition-colors shadow-lg"
            >
              Book Now
            </button>
            <a
              href={`tel:${PHONE_RAW}`}
              className="flex items-center gap-2 border-2 border-white text-white font-poppins font-semibold text-base px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </Section>

      {/* CONTACT / BOOKING FORM */}
      <Section id="contact" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-[#0F172A] text-3xl sm:text-4xl mb-3">
              Book Your Stay
            </h2>
            <p className="font-inter text-[#6B7280] text-base">
              Fill in the form below and we'll get back to you shortly
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2
                  size={52}
                  className="text-[#D4AF37] mx-auto mb-4"
                />
                <h3 className="font-poppins font-bold text-[#0F172A] text-2xl mb-2">
                  Booking Request Sent!
                </h3>
                <p className="font-inter text-[#6B7280] text-base mb-6">
                  We'll confirm your booking shortly. Thank you!
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0F172A] text-white font-poppins font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-[#1e293b] transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="f-name"
                      className="block font-inter text-sm font-medium text-[#1F2937] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="f-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-phone"
                      className="block font-inter text-sm font-medium text-[#1F2937] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="f-checkin"
                      className="block font-inter text-sm font-medium text-[#1F2937] mb-1.5"
                    >
                      Check-in Date *
                    </label>
                    <input
                      id="f-checkin"
                      type="date"
                      required
                      value={form.checkIn}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, checkIn: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-checkout"
                      className="block font-inter text-sm font-medium text-[#1F2937] mb-1.5"
                    >
                      Check-out Date *
                    </label>
                    <input
                      id="f-checkout"
                      type="date"
                      required
                      value={form.checkOut}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, checkOut: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="f-message"
                    className="block font-inter text-sm font-medium text-[#1F2937] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="f-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Any special requests or questions..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D4AF37] text-[#0F172A] font-poppins font-bold text-base py-4 rounded-lg hover:bg-[#c9a32e] transition-colors disabled:opacity-60 shadow-md"
                >
                  {submitting ? "Sending..." : "Send Booking Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
                  <span className="text-[#0F172A] font-poppins font-bold text-xs">
                    BL
                  </span>
                </div>
                <div>
                  <div className="font-poppins font-bold text-white text-base">
                    B.L Palace
                  </div>
                  <div className="font-inter text-white/50 text-xs">
                    Rangapara
                  </div>
                </div>
              </div>
              <p className="font-inter text-white/60 text-sm leading-relaxed">
                Comfortable Stay. Trusted Hospitality. Rangapara's most loved
                budget premium stay.
              </p>
            </div>
            <div>
              <h4 className="font-poppins font-semibold text-[#D4AF37] text-sm uppercase tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(l.href)}
                      className="font-inter text-white/60 text-sm hover:text-[#D4AF37] transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-poppins font-semibold text-[#D4AF37] text-sm uppercase tracking-wide mb-4">
                Contact Info
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Phone
                    size={14}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <a
                    href={`tel:${PHONE_RAW}`}
                    className="font-inter text-white/60 text-sm hover:text-white"
                  >
                    {PHONE}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Mail
                    size={14}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <span className="font-inter text-white/60 text-sm">
                    {EMAIL}
                  </span>
                </li>
                <li className="flex gap-2">
                  <MapPin
                    size={14}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <span className="font-inter text-white/60 text-sm">
                    {ADDRESS}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-poppins font-semibold text-[#D4AF37] text-sm uppercase tracking-wide mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3 mb-6">
                {[
                  { label: "FB", url: "https://facebook.com" },
                  { label: "IG", url: "https://instagram.com" },
                  { label: "TW", url: "https://twitter.com" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                  >
                    <span className="font-poppins font-bold text-xs">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-inter font-medium text-sm px-4 py-2 rounded-lg hover:bg-[#1fb355] transition-colors"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-inter text-white/40 text-xs">
              B.L Palace Rangapara — Comfortable Stay. Trusted Hospitality.
            </p>
            <p className="font-inter text-white/40 text-xs">
              © 2024 B.L Palace Rangapara. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle size={26} className="text-white" />
      </a>

      {/* SCROLL TO TOP */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-40 right-4 sm:bottom-24 sm:right-6 z-50 w-11 h-11 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowUp size={20} className="text-[#0F172A]" />
        </button>
      )}

      {/* MOBILE STICKY CALL BAR */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-50 bg-[#0F172A] flex items-center justify-between px-5 py-3 shadow-2xl">
        <span className="font-inter text-white/80 text-xs">
          B.L Palace Rangapara
        </span>
        <a
          href={`tel:${PHONE_RAW}`}
          className="flex items-center gap-2 bg-[#D4AF37] text-[#0F172A] font-poppins font-bold text-sm px-5 py-2 rounded-lg"
        >
          <Phone size={15} /> Call Now
        </a>
      </div>
    </div>
  );
}
