import { MenuItem } from "./menu-types.js";


export const biryaniItems: Record<string, MenuItem[]> = {
  Classic: [
    {
      id: 20,
      name: "Biryani",
      description:
        "Aromatic basmati rice layered with slow-cooked meat, saffron and caramelized onions.",
      price: 19.99,
      image: "/assets/biryani-classic.jpeg",
      category: "Biryani",
      subCategory: "Classic",
      heatLevel: 3,
      isNew: true,
      isPopular: true,

      // Sauce Pairings sauces-data.ts
      saucePairings: [
        "Mint sauce",
        "Mushroom sauce",
        "Sweet and spicy",
        "Spicy tomato sauce",
        "Chipotle sauce",
      ],

      customizations: ["Extra Rice", "Extra Meat", "Boneless"],
      allergens: ["milk"], // ghee / yogurt-based preparation
      dietary: ["gluten-free", "nut-free"],
    },
  ],
};
