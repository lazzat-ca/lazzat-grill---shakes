import { Layout } from "@/components/layout/Layout";
import lazzatFoodBox from "@/assets/lazzat-food-item-box.jpeg";
import lazzatFoodBoxes from "@/assets/lazzat-food-boxes.jpeg";
import lazzatMulticulture from "@/assets/lazzat-multiculture.jpeg";
import lazzatSauceBranding from "@/assets/lazzat-sauce-branding-shot.jpeg";
import lazzatExterior from "@/assets/lazzat-exterior.jpeg";
import lazzatWallDesign from "@/assets/Lazzat-wall-Design.jpg";
import { HealthyPromise } from "@/components/home/HealthyPromise";
import { menuItemsFlat } from "@/lib/menu-data";

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
                  src={lazzatFoodBox}
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
                  This wasn’t an overnight idea - it was four years of testing, failing, refining and rebuilding. We reverse-engineered customer behavior, built streamlined processes and crafted a menu where signature peri-peri meets creamy garlic, South Asian richness meets Mediterranean balance and every dish is cooked fresh and served fast.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={lazzatMulticulture}
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
                  src={lazzatFoodBoxes}
                  alt="Lazzat food boxes"
                  className="w-full rounded-lg gold-border relative z-10"
                />
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="space-y-3 md:space-y-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 md:mb-6 text-left">Why <span className="text-primary">Lazzat?</span></h2>
                <p className="text-left">
                  Because you shouldn’t have to choose between speed, health and flavor. At Lazzat, you get all three - in every bite. Our name means “taste”. “Delight” and “richness” across Arabic, Urdu, Hindi, Persian, and Turkish reflect our inclusive, multicultural vision. Like Canada itself, Lazzat belongs to everyone.
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
                  Our founders are seasoned pro chefs and restaurant operators, with over a decade each in kitchens across Canada. We’d managed every role and witnessed what worked and what didn’t. That’s why Lazzat is grounded in real experience, not guesswork.
                </p>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={lazzatSauceBranding}
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
                <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 md:mb-6 text-left">Not Just Cuisine, But Commitment</h2>
                <p className="text-left">
                  We don’t replicate. We elevate. We’re not a single cuisine, but a collection: real spices, diverse sauces, clean proteins - all assembled for the flavor-hungry, health-conscious, and culturally curious.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-1">
              <div className="story-glow-image p-2 md:p-3 max-w-sm md:max-w-md mx-auto">
                <img
                  src={lazzatExterior}
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
            View Our Menu
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
              Find a Location
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
