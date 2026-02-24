import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import logoImg from "@/assets/images/testimonial-1.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["about", "mission", "focus", "programs", "dialogues"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Mission", id: "mission" },
    { name: "Focus Areas", id: "focus" },
    { name: "Programs", id: "programs" },
    { name: "Dialogues", id: "dialogues" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-black/10 py-3"
            : "bg-transparent py-5"
        }`}
        data-testid="nav-main"
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="nav-logo"
          >
            <img
              src={logoImg}
              alt="Brussels Institute"
              className={`transition-all duration-500 w-auto ${isScrolled ? "h-9 md:h-10" : "h-10 md:h-12"}`}
            />
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                data-testid={`nav-link-${link.id}`}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wider rounded-sm ${
                  activeSection === link.id
                    ? "text-gold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full" />
                )}
              </button>
            ))}
            <div className="ml-4">
              <Button
                onClick={() => setIsContactOpen(true)}
                data-testid="nav-button-contact"
                className="bg-gold text-navy font-bold rounded-sm px-6"
              >
                Contact Us
              </Button>
            </div>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`absolute top-full left-0 right-0 bg-navy/98 backdrop-blur-lg border-t border-white/5 shadow-xl lg:hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                data-testid={`nav-mobile-link-${link.id}`}
                className={`text-left py-3 px-4 rounded-sm text-sm font-medium uppercase tracking-wider transition-all ${
                  activeSection === link.id
                    ? "text-gold bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactOpen(true);
              }}
              data-testid="nav-mobile-button-contact"
              className="bg-gold text-navy font-bold rounded-sm w-full mt-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </>
  );
}
