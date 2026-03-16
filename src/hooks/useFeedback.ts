import { useState, useEffect } from "react";

export interface Feedback {
  id: string;
  name: string;
  menuItem: string;
  side?: string;
  sauce?: string;
  drink?: string;
  spiceExperience?: "perfect" | "too-spicy" | "not-spicy-enough";
  message: string;
  rating: number;
  createdAt: number;
}

const STORAGE_KEY = "lazzat_feedback";
const LIVE_FEEDBACK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load feedback from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFeedbacks(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse feedback from localStorage:", error);
        setFeedbacks([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save feedback to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
    }
  }, [feedbacks, isLoaded]);

  const addFeedback = (
    name: string,
    menuItem: string,
    message: string,
    rating: number,
    side?: string,
    sauce?: string,
    drink?: string,
    spiceExperience?: "perfect" | "too-spicy" | "not-spicy-enough"
  ) => {
    const newFeedback: Feedback = {
      id: crypto.randomUUID(),
      name,
      menuItem,
      message,
      rating,
      side,
      sauce,
      drink,
      spiceExperience,
      createdAt: Date.now(),
    };
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  // Get live feedback (last 24 hours)
  const getLiveFeedback = (): Feedback[] => {
    const now = Date.now();
    return feedbacks.filter(
      (f) => now - f.createdAt < LIVE_FEEDBACK_DURATION
    );
  };

  // Get testimonials (older than 24 hours and 3-5 stars)
  const getTestimonials = (): Feedback[] => {
    const now = Date.now();
    return feedbacks.filter(
      (f) =>
        now - f.createdAt >= LIVE_FEEDBACK_DURATION && f.rating >= 3
    );
  };

  return {
    feedbacks,
    addFeedback,
    getLiveFeedback,
    getTestimonials,
    isLoaded,
  };
};
