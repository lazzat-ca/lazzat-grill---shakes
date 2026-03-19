import { Shield, AlertCircle, Leaf, Ban } from "lucide-react";

const culturalValues = [
  {
    icon: Shield,
    title: "No Pork",
    description: "Respecting beliefs where pork is not consumed",
  },
  {
    icon: AlertCircle,
    title: "No Beef",
    description: "Respecting beliefs and traditions that avoid beef",
  },
  {
    icon: Leaf,
    title: "Vegetarian & Vegan",
    description: "Plant-based options for all dietary preferences and beliefs",
  },
  {
    icon: Ban,
    title: "Alcohol-Free",
    description: "All sauces and preparations are alcohol-free",
  },
];

export const CulturalRespect = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-black/40 to-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Respect for <span className="text-primary">All Cultures & Beliefs</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            At Lazzat, we celebrate diversity by respecting traditions and dietary practices from all cultures and beliefs around the world.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {culturalValues.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="text-center group rounded-xl border border-primary/20 bg-white/5 hover:bg-white/10 px-4 py-6 md:px-5 md:py-8 transition-all duration-400 hover:border-primary/50 hover:-translate-y-1"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full border border-primary/30 bg-white/5 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-serif text-base md:text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-xs md:text-sm font-sans text-primary leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
