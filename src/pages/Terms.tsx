import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4 text-center">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Terms <span className="text-primary">& Service</span>
          </h1>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            These terms govern your use of the Lazzat Grill & Shakes website.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20 bg-background">
        <div className="container-luxury px-4 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 text-black space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-black mb-3">Use of Site</h2>
            <p className="text-sm md:text-base text-black/80 leading-relaxed">
              You agree to use this website for lawful purposes and in a way that
              does not infringe on the rights of others.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-black mb-3">Content</h2>
            <p className="text-sm md:text-base text-black/80 leading-relaxed">
              All content on this website is provided for informational purposes
              only and may change without notice.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-black mb-3">Third-Party Links</h2>
            <p className="text-sm md:text-base text-black/80 leading-relaxed">
              Our site may include links to third-party services. We do not
              control those sites and are not responsible for their content or
              policies.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-black mb-3">Limitation of Liability</h2>
            <p className="text-sm md:text-base text-black/80 leading-relaxed">
              Lazzat Grill & Shakes is not liable for any damages arising from
              your use of this website.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-black mb-3">Contact</h2>
            <p className="text-sm md:text-base text-black/80 leading-relaxed">
              For questions about these terms, please email hello@lazzat.ca.
            </p>
          </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
