import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { ChatBot } from "@/components/shared/ChatBot";
import { ChevronUp } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

/* ---------- Global Scroll To Top Button ---------- */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // show if scrolled down OR near bottom
      if (scrolled > 400 || scrolled + windowHeight >= fullHeight - 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50
        rounded-full p-3 md:p-4
        bg-primary text-primary-foreground
        shadow-xl border border-primary/40 backdrop-blur
        transition-all duration-300
        hover:scale-110 active:scale-95
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
      `}
    >
      <ChevronUp size={20} />
    </button>
  );
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background/80 supports-[backdrop-filter]:backdrop-blur-none relative">
      <Header />

      {/* Prevent content from hiding behind MobileNav */}
      <main className="pb-20">
        {children}
      </main>

      <Footer />
      <MobileNav />

      {/* Global scroll-to-top button */}
      <ScrollToTopButton />

      {/* Floating chatbot (excluded from admin routes) */}
      <ChatBot />
    </div>
  );
};

export default Layout;
