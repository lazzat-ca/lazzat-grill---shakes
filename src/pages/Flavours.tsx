import { Layout } from "@/components/layout/Layout";
import SignatureFlavors from "@/components/shared/SignatureFlavors";

const Flavours = () => {
  return (
    <Layout>

      {/* HERO */}
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4 text-center">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Signature <span className="text-primary">Flavours</span>
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Explore our premium sauce collection — filter by spice level, discover
            pairings and bring a new flavour to your plate.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <SignatureFlavors />
        </div>
      </section>

    </Layout>
  );
};

export default Flavours;
