import { useState, useEffect } from "react";
import { useFeedback, type Feedback } from "@/hooks/useFeedback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const LiveFeedbackSimple = () => {
  const { addFeedback, getLiveFeedback, feedbacks } = useFeedback();
  const [liveFeedbacks, setLiveFeedbacks] = useState<Feedback[]>([]);
  
  // Form states
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update live feedback list whenever feedbacks change
  useEffect(() => {
    setLiveFeedbacks(getLiveFeedback());
  }, [feedbacks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !feedback.trim()) {
      alert("Please fill in your name and feedback");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      addFeedback(
        name,
        "General Feedback",
        feedback,
        rating
      );
      
      setName("");
      setFeedback("");
      setRating(5);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 300);
  };

  return (
    <div className="space-y-8">
      {/* LIVE FEEDBACK SECTION */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
          Live <span className="text-primary">Feedback</span>
        </h2>
        
        <div className="border border-primary/20 rounded-lg bg-background/30 overflow-y-auto p-4 md:p-6 max-h-96">
          {liveFeedbacks.length === 0 ? (
            <div className="flex items-center justify-center h-60 text-muted-foreground">
              <p>No live feedback yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
              {liveFeedbacks.map((feedback) => (
                <SimpleFeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="bg-background/50 border border-primary/20 rounded-lg p-6 md:p-8">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
          Share Your <span className="text-primary">Feedback</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Name *
            </label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="bg-background/50 border-primary/20"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Feedback *
            </label>
            <Textarea
              placeholder="Share your experience at Lazzat... (Ctrl+Enter to submit)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSubmit(e as any);
                }
              }}
              disabled={isSubmitting}
              rows={5}
              className="bg-background/50 border-primary/20 resize-none"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              How Would You Rate Us?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                  disabled={isSubmitting}
                >
                  <Star
                    size={28}
                    className={cn(
                      "transition-colors",
                      star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 text-sm">
              ✓ Thank you! Your feedback has been shared.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const SimpleFeedbackCard = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white border border-primary/20 rounded-lg p-3 h-fit">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-gray-900 text-sm truncate">{feedback.name}</h3>
          <p className="text-xs text-gray-500">General Feedback</p>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={12}
              className={cn(
                "transition-colors",
                star <= feedback.rating ? "fill-primary text-primary" : "text-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-700 text-xs leading-relaxed line-clamp-4">{feedback.message}</p>
    </div>
  );
};
