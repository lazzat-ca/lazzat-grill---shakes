import { MenuItem } from "./menu-types.js";



export const wrapsItems: Record<string, MenuItem[]> = {
  Classic: [
    {
      id: 401,
      name: "BBQ Steak Wrap",
      description:
        "Tender grilled steak slices wrapped with fresh greens and drizzled in rich, smoky BBQ sauce for deep, bold flavor. Served in a warm toasted wrap for a hearty, satisfying bite.",
      price: 12.99,
      image: "/assets/bbq-steak-wrap.531.jpeg",
      category: "Wraps",
      subCategory: "Steak",
      heatLevel: 2,
      isNew: true,
      // isPopular intentionally omitted
      saucePairings: ["BBQ sauce"],
      customizations: ["Extra Sauce", "No Onions"],
      allergens: ["gluten"],
      dietary: ["dairy-free", "nut-free"],
      sidePairings: ["Crispy Fries", "Garlic Bread", "Side Salad", "Sweet Potato Fries"],
    },
    {
      id: 402,
      name: "BBQ Veggie Wrap",
      description:
        "A colorful mix of grilled vegetables wrapped with fresh greens and coated in smoky BBQ sauce. Light, flavorful, and perfectly balanced in a warm toasted wrap.",
      price: 11.99,
      image: "/assets/bbq-veggie-wrap.370.jpeg",
      category: "Wraps",
      subCategory: "Veggie",
      heatLevel: 1,
      isNew: true,
      // isPopular intentionally omitted
      saucePairings: ["BBQ sauce"],
      customizations: ["No Cheese", "Extra Veggies"],
      allergens: ["gluten", "milk"],
      dietary: ["vegetarian", "nut-free"],
      sidePairings: ["Crispy Fries", "Garlic Bread", "Side Salad", "Sweet Potato Fries"],
    },
    {
      id: 403,
      name: "Smoked Chicken Wrap",
      description:
        "Juicy smoked chicken wrapped with crisp fresh vegetables and bold sauces for a rich, savory taste. Finished in a warm toasted wrap for maximum flavor and comfort.",
      price: 12.99,
      image: "/assets/smoked-chicken-wrap.742.jpeg",
      category: "Wraps",
      subCategory: "Chicken",
      heatLevel: 2,
      isNew: true,
      // isPopular intentionally omitted
      saucePairings: ["BBQ sauce", "Chipotle sauce"],
      customizations: ["Extra Sauce", "No Tomato"],
      allergens: ["gluten"],
      dietary: ["dairy-free", "nut-free"],
      sidePairings: ["Crispy Fries", "Garlic Bread", "Side Salad", "Sweet Potato Fries"],
    },
  ],
};
