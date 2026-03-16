import { Layout } from "@/components/layout/Layout";
import { LiveFeedbackSimple } from "@/components/shared/LiveFeedbackSimple";
import { CustomerTestimonials } from "@/components/shared/CustomerTestimonials";

const Feedback = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4 text-center">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Your <span className="text-primary">Feedback</span> Matters
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Help us improve by sharing your experience. Your voice drives our commitment to
            excellence.
          </p>
        </div>
      </section>

      {/* LIVE FEEDBACK SECTION */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-luxury px-4">
          <LiveFeedbackSimple />
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS SECTION */}
      <CustomerTestimonials />
    </Layout>
  );
};

export default Feedback;
