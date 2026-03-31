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
              This policy explains how Lazzat Grill Restaurant collects, uses, and
              protects your personal information in compliance with Canadian privacy law.
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-20 bg-background">
          <div className="container-luxury px-4 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 text-black space-y-8">

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">1. Introduction & About Lazzat</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  Lazzat Grill Restaurant ("Lazzat," "we," "our," or "us") is a grill restaurant
                  headquartered in Brampton, Ontario, Canada, operating under the website www.lazzat.ca.
                  We are committed to protecting the privacy and personal information of every customer,
                  visitor, and user who interacts with our services.
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mt-3">
                  This Privacy Policy explains how we collect, use, disclose, and protect your personal
                  information in compliance with Canada's Personal Information Protection and Electronic
                  Documents Act (PIPEDA), Canada's Anti-Spam Legislation (CASL), and applicable Ontario
                  provincial privacy laws.
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mt-3">
                  By visiting our website, placing an online order, subscribing to our newsletter, or
                  using any of our services — whether takeout or delivery — you consent to the practices
                  described in this Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">2. Information We Collect</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed font-semibold mb-1">
                  2.1 Information You Provide Directly
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  When you interact with Lazzat, you may provide us with:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1 mb-4">
                  <li>Full name, email address, and phone number when placing orders or creating an account</li>
                  <li>Delivery address and billing address for order fulfillment</li>
                  <li>Payment card details (processed securely via PCI-compliant payment processors; we do not store full card numbers)</li>
                  <li>Special dietary requirements, allergen information, or personalized notes submitted with orders</li>
                  <li>Feedback, reviews, and communications you send to us</li>
                  <li>Catering event details including event type, date, venue, and guest count</li>
                </ul>
                <p className="text-sm md:text-base text-black/80 leading-relaxed font-semibold mb-1">
                  2.2 Information Collected Automatically
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  When you visit www.lazzat.ca, we automatically collect:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1 mb-4">
                  <li>IP address, browser type, and device information</li>
                  <li>Pages visited, time spent on each page, and referral source</li>
                  <li>Geographic location (city/region level, not precise GPS without explicit consent)</li>
                  <li>Cookies and similar tracking technologies (see Section 5)</li>
                  <li>Order history and frequency data to personalize your experience</li>
                </ul>
                <p className="text-sm md:text-base text-black/80 leading-relaxed font-semibold mb-1">
                  2.3 Information from Third Parties
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  We may also receive information from third-party delivery platforms (such as DoorDash,
                  Uber Eats, or SkipTheDishes) if you place orders through those platforms. In such cases,
                  the privacy policies of those third parties also apply.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">3. How We Use Your Information</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  We use your personal information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1">
                  <li>Processing and fulfilling your takeout, delivery, and catering orders</li>
                  <li>Managing your account and communicating order confirmations, updates, and receipts</li>
                  <li>Processing payments and detecting and preventing fraud</li>
                  <li>Personalizing your experience, including making menu recommendations based on past orders</li>
                  <li>Sending promotional emails, loyalty program updates, and special offers (with your consent as required by CASL)</li>
                  <li>Responding to your inquiries, complaints, and feedback</li>
                  <li>Conducting internal analytics to improve our menu, website, and service quality</li>
                  <li>Complying with legal obligations, including tax and food safety regulations</li>
                  <li>Enforcing our Terms of Service and protecting the rights and safety of our customers and staff</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">4. Sharing of Information</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-3">
                  We do not sell your personal information to third parties. We may share your information
                  only in the following circumstances:
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed font-semibold mb-1">
                  4.1 Service Providers
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  We share information with trusted service providers who assist us in operating our
                  business, including:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1 mb-3">
                  <li>Payment processors (e.g., Square, Stripe, or similar PCI-DSS compliant processors)</li>
                  <li>Online ordering platforms and point-of-sale (POS) software providers</li>
                  <li>Email marketing and communications platforms</li>
                  <li>Delivery fleet or third-party delivery networks</li>
                  <li>IT, hosting, and cybersecurity service providers</li>
                </ul>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-4">
                  These service providers are contractually required to protect your information and use
                  it only for the specified purpose.
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed font-semibold mb-1">
                  4.2 Legal Requirements
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-4">
                  We may disclose your information where required by law, court order, or governmental
                  authority, or where we believe disclosure is necessary to protect our rights, the safety
                  of others, or to investigate fraud.
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed font-semibold mb-1">
                  4.3 Business Transfers
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  If Lazzat is involved in a merger, acquisition, or asset sale, your personal information
                  may be transferred as part of that transaction. We will notify you via prominent notice
                  on our website before your information becomes subject to a different privacy policy.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">5. Cookies & Tracking Technologies</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  Our website uses cookies and similar technologies to enhance your experience. Types of
                  cookies we use:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1 mb-3">
                  <li><span className="font-semibold">Essential Cookies:</span> Required for the website and ordering system to function. These cannot be disabled.</li>
                  <li><span className="font-semibold">Performance Cookies:</span> Collect anonymous statistics about how visitors use our site (e.g., Google Analytics).</li>
                  <li><span className="font-semibold">Functional Cookies:</span> Remember your preferences such as saved delivery addresses or language settings.</li>
                  <li><span className="font-semibold">Marketing Cookies:</span> Used to show you relevant promotions. These are only activated with your consent.</li>
                </ul>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  You can control cookie settings through your browser settings. Disabling certain cookies
                  may affect your ability to use features of our website, including the online ordering system.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">6. Data Retention</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  We retain your personal information for as long as necessary to fulfill the purposes for
                  which it was collected, including to satisfy legal, accounting, or reporting requirements.
                  Specifically:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1 mb-3">
                  <li>Order records and associated personal data: Retained for a minimum of 7 years for tax and regulatory compliance</li>
                  <li>Customer account data: Retained while your account is active and for 2 years following account closure</li>
                  <li>Marketing consent records: Retained for the duration of consent plus 3 years</li>
                  <li>Website analytics data: Retained in aggregated, anonymized form indefinitely; individual session data retained for 26 months</li>
                </ul>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  When your personal information is no longer required, we will securely delete or anonymize it.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">7. Your Rights (PIPEDA / CASL)</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  As a Canadian resident, you have the following rights with respect to your personal information:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1 mb-3">
                  <li><span className="font-semibold">Right to Access:</span> Request a copy of the personal information we hold about you</li>
                  <li><span className="font-semibold">Right to Correction:</span> Request correction of inaccurate or incomplete information</li>
                  <li><span className="font-semibold">Right to Withdrawal of Consent:</span> Withdraw consent for marketing communications at any time by clicking 'Unsubscribe' in any email or contacting us directly</li>
                  <li><span className="font-semibold">Right to Complaint:</span> File a complaint with the Office of the Privacy Commissioner of Canada (www.priv.gc.ca)</li>
                  <li><span className="font-semibold">Right to Know:</span> Ask how your information is used and who it is shared with</li>
                </ul>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  To exercise any of these rights, please contact our Privacy Officer at: privacy@lazzat.ca
                  or by mail at our Brampton location. We will respond within 30 days of receiving your request.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">8. Third-Party Links & Delivery Partners</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-3">
                  Our website and communications may contain links to third-party websites, social media pages,
                  or delivery platforms (such as DoorDash, Uber Eats, or SkipTheDishes). We are not responsible
                  for the privacy practices of these third-party platforms. We encourage you to review their
                  privacy policies before providing any personal information.
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  When you order through a third-party delivery platform, your order data is shared with that
                  platform as necessary to fulfill your order. Please refer to their respective privacy policies
                  for details on how your data is handled.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">9. Children's Privacy</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  Our website and services are not directed at children under the age of 13. We do not knowingly
                  collect personal information from children under 13. If you are a parent or guardian and believe
                  your child has provided us with personal information without your consent, please contact us
                  immediately at privacy@lazzat.ca and we will promptly delete that information.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">10. Security of Your Information</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-2">
                  We take the security of your personal information seriously and implement appropriate technical
                  and organizational measures to protect it from unauthorized access, disclosure, alteration, or
                  destruction. Our security measures include:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-black/80 leading-relaxed space-y-1 mb-3">
                  <li>SSL/TLS encryption for all data transmitted through our website</li>
                  <li>PCI-DSS compliant payment processing (we never store full payment card numbers)</li>
                  <li>Restricted access to personal information on a need-to-know basis</li>
                  <li>Regular review of our data collection, storage, and processing practices</li>
                  <li>Staff training on privacy and data protection obligations</li>
                </ul>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  While we make every reasonable effort to protect your information, no method of transmission
                  over the Internet is 100% secure. We cannot guarantee absolute security and encourage you to
                  take steps to protect your own information, such as using strong passwords.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">11. Changes to This Privacy Policy</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-3">
                  We reserve the right to update this Privacy Policy at any time. When we make material changes,
                  we will notify you by updating the 'Last Updated' date at the top of this policy and, where
                  appropriate, by sending you an email notification or posting a notice on our website.
                </p>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  We encourage you to review this Privacy Policy periodically to stay informed about how we are
                  protecting your information. Your continued use of our services after changes are posted
                  constitutes your acceptance of the revised policy.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-black mb-3">Contact</h2>
                <p className="text-sm md:text-base text-black/80 leading-relaxed">
                  For privacy questions or to exercise your rights, please email{" "}
                  <a href="mailto:privacy@lazzat.ca" className="underline hover:text-black">
                    privacy@lazzat.ca
                  </a>
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