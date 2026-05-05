import { MenuItem } from "./menu-types";

import imgBBQSteakWrap from "@/assets/bbq-steak-wrap.531.jpeg";
import imgBBQVeggieWrap from "@/assets/bbq-veggie-wrap.370.jpeg";
import imgSmokedChickenWrap from "@/assets/smoked-chicken-wrap.742.jpeg";

export const wrapsItems: Record<string, MenuItem[]> = {
  Classic: [
    {
      id: 401,
      name: "BBQ Steak Wrap",
      description:
        "Tender grilled steak slices wrapped with fresh greens and drizzled in rich, smoky BBQ sauce for deep, bold flavor. Served in a warm toasted wrap for a hearty, satisfying bite.",
      price: 12.99,
      image: imgBBQSteakWrap,
      category: "Wraps",
      subCategory: "Steak",
      heatLevel: 2,
      isNew: true,
      // isPopular intentionally omitted
      saucePairings: ["BBQ sauce"],
      customizations: ["Extra Sauce", "No Onions"],
      allergens: ["gluten"],
      dietary: ["dairy-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 402,
      name: "BBQ Veggie Wrap",
      description:
        "A colorful mix of grilled vegetables wrapped with fresh greens and coated in smoky BBQ sauce. Light, flavorful, and perfectly balanced in a warm toasted wrap.",
      price: 11.99,
      image: imgBBQVeggieWrap,
      category: "Wraps",
      subCategory: "Veggie",
      heatLevel: 1,
      isNew: true,
      // isPopular intentionally omitted
      saucePairings: ["BBQ sauce"],
      customizations: ["No Cheese", "Extra Veggies"],
      allergens: ["gluten", "milk"],
      dietary: ["vegetarian", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 403,
      name: "Smoked Chicken Wrap",
      description:
        "Juicy smoked chicken wrapped with crisp fresh vegetables and bold sauces for a rich, savory taste. Finished in a warm toasted wrap for maximum flavor and comfort.",
      price: 12.99,
      image: imgSmokedChickenWrap,
      category: "Wraps",
      subCategory: "Chicken",
      heatLevel: 2,
      isNew: true,
      // isPopular intentionally omitted
      saucePairings: ["BBQ sauce", "Chipotle sauce"],
      customizations: ["Extra Sauce", "No Tomato"],
      allergens: ["gluten"],
      dietary: ["dairy-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
  ],
};
