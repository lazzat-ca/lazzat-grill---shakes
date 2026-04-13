
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";

export const FeaturedItems = () => {
  const { menuItems, sauces } = usePublicCatalog();
  // Get first available from each category
  const grillsBiryaniSajji = menuItems.find((item) => ["Grills & Skewers", "Biryani", "Sajji"].includes(item.category));
  const wrap = menuItems.find((item) => item.category === "Wraps");
  const seekhKebab = menuItems.find((item) => item.name.toLowerCase().includes("seekh"));
  const sauce = sauces[0];

  const cards = [
    grillsBiryaniSajji && {
      title: "Grills · Biryani · Sajji",
      name: grillsBiryaniSajji.name,
      image: grillsBiryaniSajji.image,
      accent: grillsBiryaniSajji.category,
      description: grillsBiryaniSajji.description,
    },
    wrap && {
      title: "Wraps",
      name: wrap.name,
      image: wrap.image,
      accent: wrap.category,
      description: wrap.description,
    },
    seekhKebab && {
      title: "Seekh Kebab",
      name: seekhKebab.name,
      image: seekhKebab.image,
      accent: seekhKebab.category,
      description: seekhKebab.description,
    },
    sauce && {
      title: "Signature Sauces",
      name: sauce.name,
      image: sauce.image,
      accent: `Level ${sauce.level}`,
      description: sauce.description,
    },
  ].filter(Boolean);

  const navigate = useNavigate();

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Made in Canada, <span className="text-primary">Made for Everyone</span>
          </h2>
          
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Just like our name, our menu doesn't belong to one culture it belongs to everyone. That's what makes it <span className="text-primary">Canadian</span> at heart.
          </p>
        </div>

        {/* Gallery Grid (AmbienceGallery style) */}
          <div className="flex flex-wrap justify-center gap-0.5 sm:gap-1 md:gap-1 lg:gap-1 xl:gap-2">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => navigate('/menu')}
              className={cn(
                "group flex flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent shadow-md cursor-pointer w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72",
                index === 0 && "md:col-span-2 md:row-span-2"
              )}
              aria-label={card.name}
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-36 h-36 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover rounded-lg border border-gold/20"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {/* Removed Lightbox Modal */}

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/menu"
            className="btn-gold w-full md:w-auto inline-block max-w-xs md:max-w-none mx-auto py-4 px-6 text-base md:text-lg"
            style={{ display: 'inline-block', marginLeft: 'auto', marginRight: 'auto' }}
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

