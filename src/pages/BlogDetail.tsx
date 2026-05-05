import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/lib/blog-data";
import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";


const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((b) => b.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="container-luxury px-4 py-32 text-center">
          <h1 className="text-3xl font-serif mb-4">Blog Not Found</h1>
          <button onClick={() => navigate(-1)} className="btn-gold px-6 py-2 mt-4">Go Back</button>
        </div>
      </Layout>
    );
  }

  // Extract FAQ section from content
  const content = post.content;
  const faqIndex = content.indexOf('FAQs');
  let mainContent = content;
  let faqSection = '';
  if (faqIndex !== -1) {
    mainContent = content.slice(0, faqIndex).trim();
    faqSection = content.slice(faqIndex).trim();
  }

  // Parse FAQ Q&A pairs
  let faqs: { q: string; a: string }[] = [];
  if (faqSection) {
    // Remove 'FAQs' heading
    let faqText = faqSection.replace(/^FAQs\n?/, '');
    // Split by question marks followed by newlines
    const qas = faqText.split(/\n(?=[^\n]*\?)/g).map(s => s.trim()).filter(Boolean);
    for (let qa of qas) {
      const [q, ...aParts] = qa.split('?');
      if (aParts.length) {
        faqs.push({
          q: (q + '?').replace(/\n/g, ' ').trim(),
          a: aParts.join('?').replace(/\n/g, ' ').trim(),
        });
      }
    }
  }

  return (
    <Layout>
      <section className="pt-32 pb-8 sm:pt-36 sm:pb-12 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4 max-w-3xl mx-auto">
          <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8 max-h-96 object-cover" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
            <span>{post.date}</span>
            <span>{post.category}</span>
            <span>{post.readTime}</span>
          </div>
          <article className="prose prose-lg prose-invert max-w-none mb-12">
            {mainContent.split(/\n+/).map((line, idx) => {
              const goldenHeadings = [
                // Blog 1 Headings
                "Why We Chose Lavastone Cooking?",
                "Reasons for Choosing the Lavastone Method Over Charcoal One?",
                "How We Grill: Open Flame and Live Kitchen",
                "A Table for Every Diet and Culture",
                "Lazzat Delivers Speed and Freshness",
                "Provides Fresh and Customizable Sauces",
                "Takeaway and Delivery for Your Ease",
                "Premium Taste and Suitable Prices",
                "Built by a Team With Years of Experience",
                // Blog 2 Headings
                "Why Does Lazzat Use Lava Stone Over Charcoal Cooking?",
                "Why Charcoal Cooking Means Unsteady Heat?",
                "Lava Stone Grilling as a Steadier Cooking Surface",
                "What Makes Lava Stone Different in Practice",
                "Why Lava Stone Grilling Has Been Gaining Attention?",
                "A Different Way of Thinking About Fire",
                "Lava Stone Grilling and Why Lazzat Works With It",
                "Conclusion",
                // Blog 3 Headings
                "The Real Difference Between Grilling and Frying",
                "How Does Grilled Food Vary in Flavour",
                "The Maillard Reaction: And Why Grilling Triggers It Better",
                "What Happens to Fat on a Grill vs. in a Pan",
                "Why Marinades Land Differently on a Grill",
                "How Does Grilling Affect the Food Texture?",
                "How is it Different for Vegetables?",
                "The cooking method you choose changes the Whole Meal",
                "Grilled Food Keeps the Plate Balanced",
                "Grilling Is More Versatile",
                "Lazzat in Brampton; Grilling Over Lava Stone",
                // Blog 4 Headings
                "How Does Steam Cooking Help Retain the Flavour and Nutrition of Meat",
                "What Makes the Steam Cooking Method Different?",
                "How Does Steam Cooking Make Meat Flavourful?",
                "Why Marinades Enhance with Steam",
                "How Steam Affects the Texture of Meat",
                "Why Steam Cooking Chicken Works So Well",
                "How Does Steam Cooking Preserve Nutrition?",
                "Why Bland Meat Is Almost Always a Cooking Problem",
                "How Lazzat Uses Steam Cooking",
              ];
              if (goldenHeadings.includes(line.trim())) {
                return (
                  <h2 key={idx} className="text-gradient-gold font-serif my-6 text-2xl md:text-3xl">
                    {line.trim()}
                  </h2>
                );
              }
              if (line.trim() === "") return null;
              return (
                <p key={idx} className="mb-4">
                  {line}
                </p>
              );
            })}
          </article>
          {faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl mb-6 text-primary">FAQs</h2>
              <Accordion type="multiple" className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem value={String(i)} key={i}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;