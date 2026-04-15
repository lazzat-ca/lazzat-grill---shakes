import { Layout } from "@/components/layout/Layout";
import { menuItemsFlat } from "../lib/menu-data";
import { HealthyPromise } from "@/components/home/HealthyPromise";


const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-28 pb-8 md:pt-40 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="gold-divider w-12 md:w-16 mx-auto mb-4 md:mb-6" />
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6">
              The Lazzat <span className="text-primary">Story</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative pt-12 pb-8 md:pt-28 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="story-ambient grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 gap-y-10 items-center">
            <div>
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={"/assets/lazzat-food-item-box.jpeg"}
                  alt="Lazzat food item box"
                  className="w-full rounded-lg gold-border relative z-10"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 md:mb-6">
                It All Started with a <span className="text-primary">Question</span>
              </h2>
              <div className="space-y-3 md:space-y-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                <p>
                  “Why does fresh, flavorful food take so long? And why does fast food feel flavorless?”<br/>
                  From years of running kitchens across Canada, our team saw firsthand how speed often meant blandness and flavor often meant greasy or slow. Lazzat was born to answer that question and redefine what fast casual could be: fresh, fast and packed with global taste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="relative pt-8 pb-8 md:pt-16 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="story-ambient grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 gap-y-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 md:mb-6">
                Our <span className="text-primary">Journey of Refinement</span>
              </h2>
              <div className="space-y-3 md:space-y-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                <p>
                  This wasn't an overnight idea - it was four years of testing, failing, refining and rebuilding. We reverse-engineered customer behavior, built streamlined processes and crafted a menu where signature peri peri meets creamy garlic, South Asian richness meets Mediterranean balance and every dish is cooked fresh and served fast.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={"/assets/lazzat-multiculture.jpeg"}
                  alt="Lazzat multicultural food"
                  className="w-full rounded-lg gold-border relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lazzat Paragraph and Image (two columns) */}
      <section className="relative pt-8 pb-8 md:pt-16 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="story-ambient grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 gap-y-10 items-center">
            <div className="order-1 lg:order-1">
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={"/assets/lazzat-food-boxes.jpeg"}
                  alt="Lazzat food boxes"
                  className="w-full rounded-lg gold-border relative z-10"
                />
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="space-y-3 md:space-y-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 md:mb-6 text-left">What is <span className="text-primary">Lazzat?</span></h2>
                <p className="text-left">
                  It all started with a simple question: why does fresh, flavorful food take so long, and fast food often tastes bland?
                </p>
                <p className="text-left">
                  After years of running kitchens across Canada, we saw the same problem everywhere. Quick food lacked depth, and flavorful dishes were often greasy or slow.
                </p>
                <p className="text-left">
                  That vision gave birth to <span className="text-primary">Lazzat</span> (a name also spelled 'Lezzat' in some countries), a restaurant designed not just to serve food but to celebrate culture, community, and connection. Inspired by global traditions, it brings people and flavors together under one roof.
                </p>
                <p className="text-left">
                  Our goal is to create a space where diversity is celebrated, connections are made, and experiences are shared.
                </p>
                <p className="text-left">
                  At <span className="text-primary">Lazzat</span>, we make sure every meal is fresh, flavourful, and served fast. Order in seconds, enjoy freshly cooked dishes, and savor signature sauces and spices inspired by cuisines from around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built by Experience, Not Guesswork Section */}
      <section className="relative pt-8 pb-8 md:pt-16 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="story-ambient grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 gap-y-10 items-center">
            <div className="order-1 lg:order-1">
              <div className="space-y-3 md:space-y-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 md:mb-6 text-left">Built by <span className="text-primary">Experience</span>, Not Guesswork</h2>
                <p className="text-left">
                  We designed <span className="text-primary">Lazzat</span> to deliver quality and flavor in every bite, using the <span className="text-primary">freshest, healthiest ingredients.</span> Our dishes are cooked over <span className="text-primary">open flames without oil,</span> and our professional chefs have crafted a menu inspired by <span className="text-primary">global cuisines.</span>
                </p>
                <p className="text-left">
                  <span className="text-primary">Lazzat</span> brings global flavors together while keeping every meal <span className="text-primary">wholesome, fresh, and authentic.</span>
                </p>
                <p className="text-left">
                  Every ingredient is carefully selected, every recipe tested, and every dish prepared with precision and care. From sourcing to serving, quality is never compromised.
                </p>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={"/assets/lazzat-sauce-branding-shot.jpeg"}
                  alt="Lazzat sauce branding shot"
                  className="w-full rounded-lg gold-border relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Just Cuisine, But Commitment Section */}
      <section className="relative pt-8 pb-8 md:pt-16 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="story-ambient grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 gap-y-10 items-center">
            <div className="order-2 lg:order-2">
              <div className="space-y-3 md:space-y-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 md:mb-6 text-left">Not Just Cuisine, But <span className="text-primary">Commitment</span></h2>
                <p className="text-left">
                  At <span className="text-primary">Lazzat</span>, we bring flavors from across the globe to your plate. <span className="text-primary">One world, different cultures.</span>
                </p>
                <p className="text-left">
                  While most restaurants focus on a few items, we <span className="text-primary">celebrate variety.</span>
                </p>
                <p className="text-left">
                  Every dish is thoughtfully prepared to respect diverse dietary traditions, offering <span className="text-primary">inclusive options</span> without compromising on taste or experience.
                </p>
                <p className="text-left pt-2">
                  Because you shouldn't have to choose between:
                </p>
                <p className="text-left">
                  <span className="text-primary">• Speed</span> and <span className="text-primary">Flavor</span>
                </p>
                <p className="text-left">
                  <span className="text-primary">• Healthy</span> and <span className="text-primary">Hearty</span>
                </p>
                <p className="text-left">
                  <span className="text-primary">• Traditional Spices</span> and <span className="text-primary">Modern Balance</span>
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-1">
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={"/assets/lazzat-exterior.jpeg"}
                  alt="Lazzat exterior"
                  className="w-full rounded-lg gold-border relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Nod Section */}
      <section className="relative py-10 md:py-16 bg-background">
        <div className="container-luxury px-4 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Curious about our flavors?</h2>
          <p className="font-sans text-base md:text-lg text-muted-foreground mb-6">
            Explore our full menu to discover the signature dishes, sauces, and sides that make Lazzat unique.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {menuItemsFlat.slice(0, 4).map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-2xl shadow-xl border border-primary/20 bg-white"
                loading="lazy"
              />
            ))}
          </div>
          <a
            href="/menu"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-primary/90 transition-colors duration-200"
          >
            Explore Menu
          </a>
        </div>
      </section>

      {/* Healthy Promise Section */}
      <HealthyPromise />

      {/* Taste the World Section */}
      <section className="relative py-10 md:py-16 bg-background">
        <div className="container-luxury px-4 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Taste the World.</h2>
          <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2">Crafted Fresh.</h3>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Served Fast.</h3>
          <p className="font-sans text-base md:text-lg text-muted-foreground mb-6">
            Experience premium global grills that honor tradition while embracing innovation. Your extraordinary meal awaits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <a
              href="/order"
              className="btn-gold pulse-gold w-full sm:w-auto text-center"
            >
              Order Now
            </a>
            <a
              href="/locations"
              className="btn-outline-white pulse-gold w-full sm:w-auto text-center"
            >
              Find Nearest Location
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
