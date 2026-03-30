import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout/Layout";


const Privacy = () => {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://lazzat.ca/privacy" />
        {/* TODO: Add meta title and description */}
      </Helmet>
      <Layout>
        <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background">
          <div className="container-luxury px-4 text-center">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              This policy explains how Lazzat Grill & Shakes collects and uses
              personal information.
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-20 bg-background">
          <div className="container-luxury px-4 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 text-black space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-black mb-3">Overview</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  We collect information to operate our website, respond to requests,
                  and improve our services. This includes details you submit through
                  forms and basic analytics data.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">What We Collect</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  Contact details such as name, email, and phone number when you
                  submit a form. We may also collect technical data like browser
                  type, device, and pages visited and location data.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">How We Use It</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  We use your information to respond to inquiries, provide updates
                  you request, and improve site performance and content.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">Your Choices</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  You can request access, correction, or deletion of your personal
                  information by contacting us.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">Contact</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  For privacy questions, please email info@lazzat.ca
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;
