import { Layout } from "@/components/layout/Layout";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const Blog = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-8 sm:pt-36 sm:pb-12 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center">
            <div className="gold-divider w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Lazzat <span className="text-primary">Blog</span>
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Stories, recipes, cooking tips, and culinary insights from the Lazzat kitchen.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-luxury px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-lg overflow-hidden border border-primary/20 bg-black/40 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs text-primary font-sans">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <h2 className="font-serif text-lg md:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="font-sans text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground border-t border-primary/10 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Date and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <button
                      disabled
                      className="inline-flex items-center gap-1 text-muted-foreground cursor-not-allowed text-sm font-sans group/link"
                    >
                      Read More
                      <ArrowRight
                        size={16}
                        className="group-hover/link:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 border-y border-primary/20">
        <div className="container-luxury px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Never Miss a <span className="text-primary">Story</span>
            </h2>
            <p className="font-sans text-muted-foreground mb-6">
              Subscribe to our blog for the latest recipes, cooking tips, and Lazzat stories delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-primary/20 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-primary text-black font-sans font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
