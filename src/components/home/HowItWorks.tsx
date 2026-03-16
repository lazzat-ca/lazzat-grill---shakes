import openKitchen from "@/assets/lazzat-open-kitchen.jpeg";

export const HowItWorks = () => (
  <section className="section-padding bg-background px-2 sm:px-0">
    <div className="container-luxury">
      <div className="gold-divider w-16 mb-6 mx-auto" />
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 sm:mb-12 text-center tracking-tight">
        Why We’re Among the Best Restaurants in <span className="text-gold">Brampton</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex justify-center items-center mb-6 md:mb-0 md:mr-6">
          <div className="story-glow-image w-full max-w-xs sm:max-w-md md:max-w-[600px] h-48 sm:h-64 md:h-[400px]">
            <img
              src={openKitchen}
              alt="Lazzat Open Kitchen"
              className="w-full h-full object-cover rounded-xl gold-border shadow-md border-[0.5px] border-gold/30 bg-white/40 relative z-10"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center md:items-start">
          <div className="space-y-4 text-base md:text-lg text-muted-foreground text-center md:text-left">
            <p>
              We designed <span className="text-primary">Lazzat</span> to deliver quality and flavor in every bite, using the <span className="text-primary">freshest, healthiest ingredients.</span> Our dishes are cooked over <span className="text-primary">open flames without oil,</span> and our professional chefs have crafted a menu inspired by <span className="text-primary">global cuisines.</span>
            </p>
            <p>
              <span className="text-primary">Lazzat</span> brings global flavors together while keeping every meal <span className="text-primary">wholesome, fresh, and authentic.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
