import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { FaTiktok, FaPinterest } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="backdrop-blur-xl bg-black/80 border-t border-primary/10 py-8 px-0 relative overflow-hidden">
      {/* Decorative Glassy Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl translate-y-1/2" />
      </div>
      <div className="container-luxury px-4 md:px-0 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
          {/* Brand & Socials */}
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-block group">
              <img 
                src="/Lazzat logo 02.png" 
                alt="Lazzat Grill & Shakes" 
                className="h-9 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="flex gap-2.5 ml-2">
              <a
                href="https://www.instagram.com/lazzat.ca/"
                className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-primary hover:border-primary transition-all duration-300 group/icon"
                aria-label="Instagram"
              >
                <Instagram size={15} className="group-hover/icon:scale-110 transition-transform" />
              </a>

              <a
                href="https://www.facebook.com/lazzat.ca/"
                className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-primary hover:border-primary transition-all duration-300 group/icon"
                aria-label="Facebook"
              >
                <Facebook size={15} className="group-hover/icon:scale-110 transition-transform" />
              </a>

              <a
                href="https://www.tiktok.com/@lazzat.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-primary hover:border-primary transition-all duration-300 group/icon"
                aria-label="TikTok"
              >
                <FaTiktok size={15} className="group-hover/icon:scale-110 transition-transform" />
              </a>

              <a
                href="https://ca.pinterest.com/lazzatcanada/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-primary hover:border-primary transition-all duration-300 group/icon"
                aria-label="Pinterest"
              >
                <FaPinterest size={15} className="group-hover/icon:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-3 md:gap-5 items-center justify-center">
            <Link to="/menu" className="text-muted-foreground font-sans text-xs hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10">
              Menu
            </Link>
            <Link to="/flavours" className="text-muted-foreground font-sans text-xs hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10">
              Flavours
            </Link>
            <Link to="/about" className="text-muted-foreground font-sans text-xs hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10">
              About
            </Link>
            <Link to="/locations" className="text-muted-foreground font-sans text-xs hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10">
              Locations
            </Link>
            <Link to="/blog" className="text-muted-foreground font-sans text-xs hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10">
              Blog
            </Link>
            <a href="tel:+12125550100" className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 text-xs text-muted-foreground hover:text-primary transition-all">
              <Phone size={12} className="text-primary" />
              Call
            </a>
            <a href="mailto:hello@lazzat.ca" className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 text-xs text-muted-foreground hover:text-primary transition-all">
              <Mail size={12} className="text-primary" />
              Email
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-[11px] md:text-xs text-muted-foreground font-sans border-t border-primary/10 pt-4 mt-2">
          <p className="text-center">© 2026 Lazzat. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors duration-300">
              Terms & Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};