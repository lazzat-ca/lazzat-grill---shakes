import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, Flame, MapPin, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/menu", icon: UtensilsCrossed, label: "Menu" },
  { href: "/flavours", icon: Flame, label: "Flavours" },
  { href: "/locations", icon: MapPin, label: "Locations" },
  { href: "/order", icon: ShoppingBag, label: "Order" },
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav
      className="
        md:hidden
        fixed bottom-0 left-0 right-0
        z-40
        bg-background/95
        border-t border-primary/30
        safe-area-pb
        isolate
      "
    >
      {/* BLUR LAYER (never transformed) */}
      <div className="absolute inset-0 bg-background/80 supports-[backdrop-filter]:backdrop-blur-lg" />

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-300"
            >
              <Icon
                size={20}
                className={cn(
                  "transition-all duration-300 drop-shadow-[0_0_8px_hsl(43,56%,52%)] text-primary",
                  isActive && "animate-softpulse"
                )}
              />

              <span
                className={cn(
                  "text-[10px] font-sans tracking-wider uppercase transition-colors duration-300",
                  isActive ? "text-primary" : "text-white"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
