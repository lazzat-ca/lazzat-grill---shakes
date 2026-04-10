import { useState, useEffect, useTransition } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/flavours", label: "Flavors" },
  { href: "/about", label: "About" },
  { href: "/locations", label: "Locations" },
  { href: "/order", label: "Order" },
  { href: "/contact", label: "Contact" },
  { href: "/feedback", label: "Feedback" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [, startTransition] = useTransition();
  const location = useLocation();

  useEffect(() => {
    const announcementTimer = setTimeout(() => {
      setShowAnnouncement(false);
    }, 25000);

    return () => clearTimeout(announcementTimer);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    startTransition(() => {
      setIsMobileMenuOpen(false);
    });
  }, [location.pathname, startTransition]);

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[51] bg-gradient-to-r from-primary via-primary/90 to-primary/75 text-primary-foreground py-2 md:py-2.5 px-4 text-center animate-slide-down shadow-xl",
          !showAnnouncement && "animate-fade-out pointer-events-none"
        )}
      >
        <p className="text-sm md:text-base font-semibold tracking-widest animate-bounce-subtle">
            Lazzat Plus New Location Opening Soon!
        </p>
      </div>

      {/* BLUR OVERLAY (stays when menu opens anywhere) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xl"
          aria-hidden="true"
        />
      )}

      <header
        className={cn(
          "fixed top-12 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || isMobileMenuOpen
            ? "bg-background/60 backdrop-blur-xl border-b border-primary/20"
            : "bg-transparent"
        )}
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center h-12 md:h-16">
              <img
                src="/Lazzat logo 02.png"
                alt="Lazzat Grill & Shakes"
                className="h-full w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "font-sans text-sm tracking-widest uppercase transition-colors duration-300 hover:text-primary",
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              to="/order"
              className="hidden md:block btn-gold pulse-gold text-sm tracking-widest uppercase py-3 px-6"
            >
              Order
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          <div
            className={cn(
              "md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-primary/20 transition-all duration-500 overflow-hidden",
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex flex-col items-center py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-sans text-sm tracking-widest uppercase text-foreground/80 hover:text-primary py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/order"
                className="btn-gold pulse-gold text-sm tracking-widest uppercase py-3 px-8 mt-2"
              >
                Order
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
