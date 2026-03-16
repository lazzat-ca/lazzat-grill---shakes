import heroRestaurant from "@/assets/hero-restaurant.jpg";
import heroGrill from "@/assets/hero-grill.jpg";
import lazzatWall from "@/assets/Lazzat-wall-Design.jpg";

export const AboutSection = () => {
  const images = [
    { src: heroRestaurant, alt: "Lazzat Restaurant Interior" },
    { src: heroGrill, alt: "Grilling Action" },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury space-y-24">

        {/* Story Wall – Museum Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
  <div>
    {/* GLOW WRAPPER */}
    <div className="story-glow-image">
      <img
        src={lazzatWall}
        alt="Lazzat Story Wall"
        className="w-full rounded-lg gold-border relative z-10"
      />
    </div>
  </div>

  <div>
    <div className="gold-divider w-16 mb-6" />
    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
      What is <span className="text-primary">Lazzat?</span>
    </h2>

    <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
      <p>
        It all started with a simple question: why does fresh, flavorful food take so long, and fast food often tastes bland?
      </p>
      <p>
        After years of running kitchens across <span className="text-primary">Canada</span>, we saw the same problem everywhere. Quick food lacked depth, and flavorful dishes were often greasy or slow.
      </p>
      <p>
        That vision gave birth to <span className="text-primary">Lazzat</span> (a name also spelled 'Lezzat' in some countries), a restaurant designed not just to serve food but to celebrate culture, community, and connection. Inspired by global traditions, it brings people and flavors together under one roof.
      </p>
      <p>
        Our goal is to create a space where diversity is celebrated, connections are made, and experiences are shared.
      </p>
      <p>
        At <span className="text-primary">Lazzat</span>, we make sure every meal is fresh, flavourful, and served fast. Order in seconds, enjoy freshly cooked dishes, and savor signature sauces and spices inspired by cuisines from around the world.
      </p>
    </div>
  </div>
</div>
        {/* Existing About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="gold-divider w-16 mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Why Choose <span className="text-primary">Lazzat</span> ?
            </h2>

            <div className="space-y-2 text-muted-foreground font-sans leading-relaxed">
              <p>
                At <span className="text-primary">Lazzat</span>, we bring flavors from across the globe to your plate. <span className="text-primary">One world, different cultures.</span>
              </p>
              <p>
                While most restaurants focus on a few items, we <span className="text-primary">celebrate variety.</span>
              </p>
              <p>
                Every dish is thoughtfully prepared to respect diverse dietary traditions, offering <span className="text-primary">inclusive options</span> without compromising on taste or experience.
              </p>
              <p className="pt-2">
                Because you shouldn't have to choose between:
              </p>
              <p>
                <span className="text-primary">• Speed</span> and <span className="text-primary">Flavor</span>
              </p>
              <p>
                <span className="text-primary">• Healthy</span> and <span className="text-primary">Hearty</span>
              </p>
              <p>
                <span className="text-primary">• Traditional Spices</span> and <span className="text-primary">Modern Balance</span>
              </p>
            </div>
          </div>

          {/* Images Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="story-glow-image aspect-[4/3] overflow-hidden rounded-lg gold-border"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover hover-zoom z-10"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
