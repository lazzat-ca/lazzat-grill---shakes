import { MenuItem } from "./menu-types";
import imgSajji from "@/assets/sajji.jpeg";

export const sajjiItems: Record<string, MenuItem[]> = {
  Classic: [
    {
      id: 216,
      name: "Chicken Sajji",
      description:
        "Traditionally slow-roasted whole chicken, marinated only with salt and green papaya for exceptional tenderness. Finished to a golden, lightly crisped perfection and served with aromatic sajji rice infused with meat drippings, raisins, and delicate dry fruits. Pure, authentic Balochi flavor with a refined luxury touch.",
      price: 22.99,
      image: imgSajji,
      category: "Sajji",
      subCategory: "Classic",
      heatLevel: 1,
      isNew: true,
      isPopular: true,

      // Sauce Pairings sauces-data.ts
      saucePairings: [
         "Mint sauce",
        "Sweet and spicy",
        "Spicy tomato sauce",
        "BBQ sauce",
      ],

      customizations: [
        "Extra Rice",
        "Half Chicken",
        "Full Chicken",
      ],

      allergens: ["milk"], // possible butter / raita pairing /ghee
      dietary: ["gluten-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
  ],
};
