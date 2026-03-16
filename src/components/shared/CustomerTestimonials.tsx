import { useFeedback, type Feedback } from "@/hooks/useFeedback";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const CustomerTestimonials = () => {
  const { getTestimonials } = useFeedback();
  const [testimonials, setTestimonials] = useState<Feedback[]>([]);

  useEffect(() => {
    setTestimonials(getTestimonials());
    
    const interval = setInterval(() => {
      setTestimonials(getTestimonials());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-2">
          Customer <span className="text-primary">Testimonials</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Real experiences from our valued customers
        </p>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No testimonials yet. Check back soon! ⭐
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Feedback }) => {
  return (
    <div className="bg-background/50 border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
      {/* Header with stars and rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={cn(
                "transition-colors",
                star <= testimonial.rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              )}
            />
          ))}
        </div>
        <span className="text-xs text-primary font-medium">
          {testimonial.rating}/5
        </span>
      </div>

      {/* Customer name and menu item */}
      <h3 className="font-serif text-lg text-foreground mb-1">
        {testimonial.name}
      </h3>
      <p className="text-sm text-primary font-medium mb-3">
        🍽️ {testimonial.menuItem}
      </p>

      {/* Order details if available */}
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        {testimonial.side && (
          <span className="bg-primary/5 border border-primary/20 rounded px-2 py-1 text-muted-foreground">
            🍟 {testimonial.side}
          </span>
        )}
        {testimonial.sauce && (
          <span className="bg-primary/5 border border-primary/20 rounded px-2 py-1 text-muted-foreground">
            🥫 {testimonial.sauce}
          </span>
        )}
        {testimonial.drink && (
          <span className="bg-primary/5 border border-primary/20 rounded px-2 py-1 text-muted-foreground">
            🥤 {testimonial.drink}
          </span>
        )}
        {testimonial.spiceExperience && (
          <span className="bg-primary/5 border border-primary/20 rounded px-2 py-1 text-muted-foreground">
            {testimonial.spiceExperience}
          </span>
        )}
      </div>

      {/* Feedback message */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        "{testimonial.message}"
      </p>
    </div>
  );
};
