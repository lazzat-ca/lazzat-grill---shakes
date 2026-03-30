import { Link } from "react-router-dom";

export const FinalCTA = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Gold Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative container-luxury px-4 text-center">
        {/* Headline */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
          Taste the World.
          <br />
          <span className="text-primary">Crafted Fresh.</span>
          <br />
          Served Fast.
        </h2>

        {/* Subhead */}
        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Experience premium global grills that honor tradition while embracing
          innovation. Your extraordinary meal awaits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center justify-center gap-4 animate-fade-up">
          <Link
            to="/order"
            className="btn-gold w-full pulse-gold sm:w-auto text-center animate-pulse-gold"
          >
            Order Now
          </Link>
          <Link
            to="/locations"
            className="btn-outline-white w-full pulse-gold sm:w-auto text-center"
            style={{ animationDelay: "1.2s" }}
          >
            Nearest Location
          </Link>
        </div>
      </div>
    </section>
  );
};
