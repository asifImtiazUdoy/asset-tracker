import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  Globe,
  Shield,
  Scale,
  ArrowRight,
  Users,
  BookOpen,
  MessageSquare,
  ChevronDown,
  Landmark,
  Handshake,
  Cpu,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import logoImg from "@/assets/images/testimonial-1.png";
import brusselsImg from "@assets/1_1770364375709.png";
import heroImg1 from "@assets/6_1770364745985.png";
import heroImg2 from "@assets/10_1770364759673.png";
import heroImg3 from "@assets/12_1770364789747.png";
import heroImg4 from "@assets/14_1770364803364.png";
import flagsImg from "@assets/13_1770704029537.png";
import teamImg from "@assets/4_1770704615902.png";
import conferenceImg from "@assets/18_1770705052335.png";
import officeImg from "@assets/24_1770705026051.png";
import dialogueImg from "@assets/2_1770705446150.png";
import parliamentImg from "@assets/10_1770706417241.png";
import carouselEuFlags from "@assets/12_1770747453084.png";
import carouselLounge from "@assets/19_1770747703730.png";
import carouselTeamwork from "@assets/5_1770748404905.png";
import carouselParliament from "@assets/14_1770748418277.png";
import carouselNetworking from "@assets/23_1770748470441.png";
import testimonial1 from "@/assets/images/testimonial-1.png";
import testimonial2 from "@/assets/images/testimonial-2.png";
import testimonial3 from "@/assets/images/testimonial-3.png";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4];

const carouselImages = [
  {
    src: carouselEuFlags,
    alt: "European Union flags at EU institutions in Brussels",
  },
  {
    src: carouselLounge,
    alt: "Modern meeting space for diplomatic consultations",
  },
  {
    src: carouselTeamwork,
    alt: "Team collaboration and professional development",
  },
  {
    src: carouselParliament,
    alt: "European Parliament with international flags",
  },
  {
    src: carouselNetworking,
    alt: "Networking at international policy conferences",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-gold font-serif"
    >
      {count}
      {suffix}
    </div>
  );
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextCarouselSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const prevCarouselSlide = useCallback(() => {
    setCarouselIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(carouselTimer);
  }, []);

  const scrollToPrograms = () => {
    const element = document.getElementById("programs");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation />

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden"
        data-testid="section-hero"
      >
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeSlide === idx ? 0.15 : 0 }}
            data-testid={`hero-slide-${idx}`}
          >
            <img
              src={img}
              alt={`Hero slide ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold rounded-full blur-[150px] animate-pulse-gold" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[150px]" />
          <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-gold rounded-full blur-[100px] animate-float-delay" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-20"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <img
                src={logoImg}
                alt="Brussels Institute"
                className="h-28 md:h-36 w-auto mx-auto"
                data-testid="img-hero-logo"
              />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-[1.1]"
            >
              Shaping the Future of{" "}
              <span className="text-gold relative">
                Global Diplomacy
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C71 2 229 2 299 5.5"
                    stroke="hsl(38, 56%, 51%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Executive training, policy research, and strategic dialogue at the
              intersection of EU, UN, and NATO affairs.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={scrollToPrograms}
                data-testid="button-explore-programs"
                className="bg-gold text-navy text-lg font-bold px-10 py-6 rounded-sm shadow-lg shadow-gold/20 transition-all"
              >
                Explore Our Programs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => setIsContactOpen(true)}
                variant="outline"
                data-testid="button-hero-contact"
                className="border-white/30 text-white text-lg px-10 py-6 rounded-sm backdrop-blur-sm bg-white/5"
              >
                Get in Touch
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex justify-center"
            >
              <motion.button
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                onClick={scrollToAbout}
                className="text-white/50 hover:text-gold transition-colors relative z-20"
                data-testid="button-scroll-down"
              >
                <ChevronDown className="w-8 h-8" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <div
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3"
          data-testid="hero-dots"
        >
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              data-testid={`hero-dot-${idx}`}
              className={`rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? "h-8 w-3 bg-gold"
                  : "h-3 w-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative z-10 -mt-6" data-testid="section-stats">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: 3, suffix: "", label: "Institutional Frameworks" },
              { value: 5, suffix: "+", label: "Program Areas" },
              { value: 4, suffix: "", label: "Strategic Pillars" },
              { value: 12, suffix: "+", label: "Research Topics" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="stat-card"
                data-testid={`stat-card-${idx}`}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-white/60 text-sm mt-2 leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section
        id="about"
        className="py-28 relative overflow-hidden"
        style={{ backgroundColor: "hsl(var(--gold) / 0.06)" }}
        data-testid="section-about"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ backgroundColor: "hsl(var(--gold))" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[120px]"
            style={{ backgroundColor: "hsl(var(--gold))" }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="section-label">Who We Are</span>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div variants={fadeInLeft}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy leading-snug">
                  The Brussels Institute for Diplomacy, Geopolitics and Peace
                  Studies is an independent institute based in Brussels.
                </h3>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-10">
                <div>
                  <div
                    className="w-16 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Operating at the intersection of European Union, United
                    Nations, and NATO affairs, the Institute is uniquely
                    positioned to bridge policy, practice, and diplomacy.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We support diplomats, senior officials, and international
                    professionals in addressing today's most pressing challenges
                    in foreign policy, geopolitics, security, peacebuilding, and
                    global governance.
                  </p>
                </div>

                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-xl group">
                    <img
                      src={brusselsImg}
                      alt="Brussels architecture"
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid="img-about-brussels"
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR MISSION */}
      <section
        id="mission"
        className="py-24 bg-gray-50 relative overflow-hidden"
        data-testid="section-mission"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-navy" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-navy" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <span className="section-label">Our Mission</span>
            </motion.div>
            <motion.blockquote variants={fadeInUp} className="relative">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-gold/20 text-8xl font-serif leading-none select-none">
                "
              </span>
              <p className="text-xl md:text-2xl text-navy/80 font-light leading-relaxed italic font-serif pt-4">
                To enhance diplomatic capacity, global geopolitical
                understanding, and strategic foresight within EU, UN, and NATO
                frameworks by delivering high-impact training, rigorous
                research, and informed policy engagement in support of peace,
                security, and effective global governance.
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </section>

      {/* DIPLOMACY IMAGE SECTION */}
      <section
        className="py-20 bg-white overflow-hidden"
        data-testid="section-flags"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div variants={fadeInLeft}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy leading-snug">
                  Global Cooperation at the Heart of Europe
                </h3>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-10">
                <div>
                  <div
                    className="w-16 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Brussels stands as a unique crossroads of international
                    diplomacy, hosting the headquarters of the European Union,
                    NATO, and numerous international organizations. Our
                    institute leverages this strategic position to foster
                    dialogue across borders and institutions.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Through our programs, we bring together diverse perspectives
                    to address the complex challenges of modern geopolitics and
                    global governance.
                  </p>
                </div>

                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-xl group">
                    <img
                      src={flagsImg}
                      alt="International flags representing global diplomacy"
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid="img-flags"
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. KEY FOCUS AREAS */}
      <section
        id="focus"
        className="py-28 relative overflow-hidden"
        style={{ backgroundColor: "hsl(var(--gold) / 0.06)" }}
        data-testid="section-focus"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ backgroundColor: "hsl(var(--gold))" }}
          />
          <div
            className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] rounded-full blur-[120px]"
            style={{ backgroundColor: "hsl(var(--gold))" }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="section-label">What We Focus On</span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy">
              Key Focus Areas
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Globe,
                title: "Diplomacy",
                items: [
                  "Bilateral and multilateral negotiation",
                  "Crisis management and conflict prevention",
                  "Strategic communication and public diplomacy",
                  "EU, UN, and NATO engagement strategies",
                ],
              },
              {
                icon: Shield,
                title: "Geopolitics",
                items: [
                  "Global power dynamics and regional security",
                  "Geoeconomics, sanctions, and strategic dependencies",
                  "Hybrid threats, cyber operations, and information warfare",
                  "Disruptive technologies and global competition",
                ],
              },
              {
                icon: Scale,
                title: "Peace Studies",
                items: [
                  "Conflict resolution and mediation",
                  "Post-conflict reconstruction and governance",
                  "Security sector reform and human security",
                  "International law and peacebuilding frameworks",
                ],
              },
            ].map((area, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="focus-card"
                data-testid={`focus-card-${idx}`}
              >
                <div className="w-14 h-14 rounded-md bg-navy/5 flex items-center justify-center mb-6">
                  <area.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-2xl font-serif text-navy mb-6">
                  {area.title}
                </h3>
                <ul className="space-y-3">
                  {area.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="mt-2 w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CAPACITY BUILDING IMAGE SECTION */}
      <section
        className="py-20 bg-white overflow-hidden"
        data-testid="section-capacity"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div variants={fadeInLeft}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy leading-snug">
                  Building Diplomatic Capacity
                </h3>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-10">
                <div>
                  <div
                    className="w-16 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The Institute combines policy-relevant research, executive
                    training, and strategic dialogue to strengthen diplomatic
                    practice and advance peace in an increasingly complex,
                    multipolar, and technology-driven international system.
                  </p>
                </div>

                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-xl group">
                    <img
                      src={teamImg}
                      alt="Team collaboration and capacity building"
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid="img-team"
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. WHAT WE DO */}
      <section
        className="py-28 bg-gray-50 relative overflow-hidden"
        data-testid="section-what-we-do"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="section-label">Our Activities</span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy">
              What We Do
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Users,
                number: "01",
                title: "Capacity Building & Training",
                description:
                  "Executive and professional programs designed to strengthen diplomatic practice, strategic analysis, and decision-making.",
              },
              {
                icon: BookOpen,
                number: "02",
                title: "Policy-Relevant Research",
                description:
                  "Evidence-based research supporting policymakers and institutions in navigating geopolitical, security, and technological challenges.",
              },
              {
                icon: MessageSquare,
                number: "03",
                title: "Strategic Dialogue Platforms",
                description:
                  "High-level and expert dialogues enabling coordination, trust-building, and informed policy exchange.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="what-we-do-card group"
                data-testid={`activity-card-${idx}`}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <span className="text-5xl font-bold text-navy/10 font-serif leading-none">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-md bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRAINING IMAGE SECTION */}
      <section
        className="py-20 bg-white overflow-hidden"
        data-testid="section-training-image"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div variants={fadeInLeft}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy leading-snug">
                  Spaces for Learning and Innovation
                </h3>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-10">
                <div>
                  <div
                    className="w-16 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our training environments are designed to inspire
                    collaboration and critical thinking among international
                    professionals and future leaders.
                  </p>
                </div>

                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-xl group">
                    <img
                      src={officeImg}
                      alt="Modern training and collaboration space"
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid="img-office"
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. TRAINING & PROGRAM AREAS */}
      <section
        id="programs"
        className="py-28 bg-white"
        data-testid="section-programs"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 max-w-6xl mx-auto items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="md:sticky md:top-28"
            >
              <span className="section-label justify-start before:hidden">
                Training Programs
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                Training & Program Areas
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our programs are designed for diplomats, senior officials, and
                international professionals seeking to deepen their expertise.
              </p>
              <Button
                onClick={() => setIsContactOpen(true)}
                data-testid="button-program-enquire"
                className="bg-navy text-white rounded-sm px-8"
              >
                Enquire About Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <Accordion type="single" collapsible className="w-full space-y-3">
                {[
                  {
                    icon: Landmark,
                    title: "NATO, EU & UN Affairs",
                    items: [
                      "NATO governance and international security",
                      "EU foreign, security and defence policy",
                      "United Nations peacekeeping and multilateral diplomacy",
                    ],
                  },
                  {
                    icon: Globe,
                    title: "Geopolitics & Strategic Studies",
                    items: [
                      "Global power structures and regional dynamics",
                      "Hybrid threats and security challenges",
                      "Strategic foresight and scenario planning",
                    ],
                  },
                  {
                    icon: Handshake,
                    title: "Negotiation, Mediation & Conflict Resolution",
                    items: [
                      "Conflict analysis and stakeholder mapping",
                      "Mediation and negotiation techniques",
                      "Human rights and ethical frameworks",
                    ],
                  },
                  {
                    icon: Cpu,
                    title: "Tech Diplomacy & Global Governance",
                    items: [
                      "Big Tech as geopolitical actors",
                      "Ethical AI governance",
                      "Technology, security and diplomacy",
                    ],
                  },
                  {
                    icon: Heart,
                    title: "Interreligious Dialogue & Peacebuilding",
                    items: [
                      "Religion and international relations",
                      "Interreligious dialogue as a diplomatic tool",
                      "Intercultural communication",
                    ],
                  },
                ].map((program, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    data-testid={`accordion-program-${idx}`}
                    className="border border-gray-200 rounded-md px-5 data-[state=open]:border-gold/40 data-[state=open]:shadow-sm transition-all duration-300"
                  >
                    <AccordionTrigger className="text-lg font-serif text-navy hover:text-gold hover:no-underline py-5 gap-3">
                      <span className="flex items-center gap-3">
                        <program.icon className="w-5 h-5 text-gold shrink-0" />
                        {program.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-5 pl-8">
                        {program.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <ArrowRight className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES IMAGE SECTION */}
      <section
        className="py-20 bg-white overflow-hidden"
        data-testid="section-activities-image"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div variants={fadeInLeft}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy leading-snug">
                  Where Strategy Meets Dialogue
                </h3>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-10">
                <div>
                  <div
                    className="w-16 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our programs bring together diplomats, senior officials, and
                    policy professionals in dedicated spaces designed for
                    high-level strategic exchange and collaborative
                    problem-solving.
                  </p>
                </div>

                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-xl group">
                    <img
                      src={conferenceImg}
                      alt="Conference room for strategic dialogues"
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid="img-conference"
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. PROGRAM OUTCOMES */}
      <section
        id="outcomes"
        className="py-28 bg-navy relative overflow-hidden"
        data-testid="section-outcomes"
      >
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <span className="section-label before:bg-gold/60 after:bg-gold/60">
                Results
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">
                Program Outcomes
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Our participants emerge with actionable insights and enhanced
                capabilities, ready to navigate the complexities of modern
                diplomacy.
              </p>
              <Button
                onClick={() => setIsContactOpen(true)}
                data-testid="button-outcomes-enquire"
                className="bg-gold text-navy font-bold rounded-sm px-8"
              >
                Enquire Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {[
                "Practical diplomatic and negotiation skills",
                "Enhanced geopolitical and strategic decision-making",
                "In-depth understanding of EU, UN, and NATO frameworks",
                "Capacity to address complex, technology-driven global challenges",
              ].map((outcome, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInRight}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-5 transition-all duration-300 hover:bg-white/10"
                  data-testid={`outcome-item-${idx}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-white/90 text-lg leading-relaxed">
                    {outcome}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* DIALOGUE IMAGE SECTION */}
      <section
        className="py-20 bg-white overflow-hidden"
        data-testid="section-dialogue-image"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div variants={fadeInLeft}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy leading-snug">
                  Convening Leaders for Global Impact
                </h3>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-10">
                <div>
                  <div
                    className="w-16 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Through high-level roundtables and expert convenings, the
                    Institute fosters candid exchange among policymakers,
                    diplomats, and thought leaders shaping the future of
                    international affairs.
                  </p>
                </div>

                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-xl group">
                    <img
                      src={dialogueImg}
                      alt="Professional roundtable meeting with senior leaders"
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid="img-dialogue"
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. STRATEGIC DIALOGUES */}
      <section
        id="dialogues"
        className="py-28 bg-white"
        data-testid="section-dialogues"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="section-label">Engage & Exchange</span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
              Strategic Dialogues
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The Institute organizes Strategic Dialogues as neutral and
              credible platforms where policymakers, experts, and stakeholders
              engage on pressing issues.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {[
              {
                title: "High-level policy coordination",
                desc: "Facilitating dialogue between senior officials across institutional boundaries",
              },
              {
                title: "Expert knowledge exchange",
                desc: "Bringing together leading scholars and practitioners for informed debate",
              },
              {
                title: "Confidential consultations",
                desc: "Closed-door sessions fostering trust and candid policy discussion",
              },
              {
                title: "Emerging challenges",
                desc: "Addressing geopolitical and technological shifts reshaping global governance",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="dialogue-item"
                data-testid={`dialogue-item-${idx}`}
              >
                <div className="w-10 h-10 rounded-md bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-gold font-bold font-serif">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h4 className="text-navy font-bold mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section
        className="py-20 overflow-hidden"
        style={{ backgroundColor: "hsl(var(--navy))" }}
        data-testid="section-carousel"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span
              className="text-sm font-medium tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "hsl(var(--gold))" }}
            >
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              A Glimpse Into Our Work
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From high-level forums to training sessions, explore the moments
              that define our mission.
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-md">
              <div className="relative h-[350px] md:h-[480px]">
                {carouselImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: idx === carouselIndex ? 1 : 0,
                      scale: idx === carouselIndex ? 1 : 1.05,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    data-testid={`carousel-slide-${idx}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={prevCarouselSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 transition-all hover:bg-black/60 hover:text-white"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextCarouselSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 transition-all hover:bg-black/60 hover:text-white"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === carouselIndex
                      ? "w-8"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  style={
                    idx === carouselIndex
                      ? { backgroundColor: "hsl(var(--gold))" }
                      : undefined
                  }
                  data-testid={`carousel-dot-${idx}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARLIAMENT IMAGE SECTION */}
      <section
        className="py-20 bg-white overflow-hidden"
        data-testid="section-parliament-image"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div variants={fadeInLeft}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-navy leading-snug">
                  At the Centre of European Decision-Making
                </h3>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-10">
                <div>
                  <div
                    className="w-16 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Located in the heart of Brussels, steps from the
                    institutions that shape European and global policy, the
                    Institute occupies a unique position to convene leaders and
                    influence the future of diplomacy.
                  </p>
                </div>

                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-xl group">
                    <img
                      src={parliamentImg}
                      alt="European Parliament building with international flags"
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid="img-parliament"
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 border-2 rounded-md opacity-20"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="py-28 bg-white overflow-hidden"
        data-testid="section-testimonials"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="section-label">Voices from the Field</span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy">
              What Our Alumni Say
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                quote:
                  "The strategic dialogues at the Institute gave me a deeper understanding of multilateral negotiations. The connections I made have been invaluable to my career in international affairs.",
                name: "Ambassador Elena Vasquez",
                role: "Former Deputy Permanent Representative, UN Geneva",
                img: testimonial1,
              },
              {
                quote:
                  "Participating in the executive training program transformed how I approach conflict resolution. The faculty brought decades of real-world diplomatic experience that no textbook could replicate.",
                name: "Dr. Henrik Larsson",
                role: "Senior Policy Advisor, European External Action Service",
                img: testimonial2,
              },
              {
                quote:
                  "The Institute provided a rare, neutral space where frank conversations between policymakers from different regions could actually take place. That kind of environment is essential for progress.",
                name: "Sarah Okonkwo",
                role: "Director of International Programs, West African Peace Initiative",
                img: testimonial3,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-gray-50 rounded-md p-8 flex flex-col justify-between border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                data-testid={`card-testimonial-${i}`}
              >
                <div>
                  <div
                    className="w-10 h-px mb-6"
                    style={{ backgroundColor: "hsl(var(--gold))" }}
                  />
                  <p className="text-muted-foreground leading-relaxed italic mb-8">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: "hsl(var(--gold) / 0.3)" }}
                  />
                  <div>
                    <p className="font-serif text-navy font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. CALL TO ACTION */}
      <section
        className="py-28 bg-navy text-white text-center relative overflow-hidden"
        data-testid="section-cta"
      >
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-gold rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-blue-400 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="section-label before:bg-gold/60 after:bg-gold/60">
                Take the Next Step
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Engage with the Brussels Institute
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/60 mb-12 max-w-2xl mx-auto"
            >
              Whether you seek training, research collaboration, or strategic
              dialogue, we invite you to connect with us.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => setIsContactOpen(true)}
                data-testid="button-cta-contact"
                className="bg-gold text-navy font-bold text-lg px-10 py-6 rounded-sm shadow-lg shadow-gold/20"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={scrollToPrograms}
                variant="outline"
                data-testid="button-cta-programs"
                className="border-white/30 text-white font-bold text-lg px-10 py-6 rounded-sm backdrop-blur-sm bg-white/5"
              >
                Explore Programs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer
        className="bg-navy border-t border-white/10"
        data-testid="section-footer"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="py-12 flex flex-col items-center text-center">
            <img
              src={logoImg}
              alt="Brussels Institute"
              className="h-16 w-auto mb-6"
              data-testid="img-footer-logo"
            />
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Brussels Institute for Diplomacy, Geopolitics and Peace Studies
            </h3>
            <p className="text-white/50 text-sm mb-8">Brussels, Belgium</p>
            <div className="flex items-center gap-6 mb-8">
              {["About", "Mission", "Programs", "Dialogues"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const id =
                      link.toLowerCase() === "about"
                        ? "about"
                        : link.toLowerCase() === "mission"
                          ? "mission"
                          : link.toLowerCase() === "programs"
                            ? "programs"
                            : "dialogues";
                    const el = document.getElementById(id);
                    if (el) {
                      const offset = 80;
                      const bodyRect =
                        document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      window.scrollTo({
                        top: elementPosition - offset,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="text-white/40 hover:text-gold text-sm transition-colors uppercase tracking-wider"
                  data-testid={`footer-link-${link.toLowerCase()}`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 py-6 text-center">
            <p className="text-xs text-white/30">
              &copy; 2026 Brussels Institute for Diplomacy, Geopolitics and
              Peace Studies. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </div>
  );
}
