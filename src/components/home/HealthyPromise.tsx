import { Flame, Leaf, Droplets, ShieldCheck } from "lucide-react";

const promises = [
  {
    icon: Leaf,
    title: "Fresh Daily",
    description: "Ingredients sourced and prepared fresh every single day",
  },
  {
    icon: Flame,
    title: "Charcoal Grilled",
    description: "Authentic flame cooking for unmatched smoky flavors",
  },
  {
    icon: Droplets,
    title: "Low Oil",
    description: "Healthy cooking methods without compromising taste",
  },
  {
    icon: ShieldCheck,
    title: "No Preservatives",
    description: "Pure, natural ingredients with zero artificial additives",
  },
];

export const HealthyPromise = () => {
  return (
    <section className="section-padding bg-[radial-gradient(circle_at_20%_20%,#f9f6f0,#f4efe6_45%,#f1e9dd_80%)]">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-black/50 to-transparent mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-3">
            Our <span className="text-primary">Promise</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-black/80 max-w-2xl mx-auto">
            Made fresh, responsibly sourced, cooked clean.
          </p>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={promise.title}
                className="text-center group rounded-xl border border-foreground/10 bg-white/70 backdrop-blur-sm px-4 py-5 md:px-5 md:py-6 shadow-[0_12px_36px_-26px_rgba(0,0,0,0.5)] transition-all duration-400 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.6)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 rounded-full border border-primary/30 bg-white flex items-center justify-center group-hover:border-primary group-hover:shadow-gold transition-all duration-500">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-serif text-base md:text-lg text-black mb-2">
                  {promise.title}
                </h3>
                <p className="text-xs md:text-sm font-sans text-black/70 leading-relaxed">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
