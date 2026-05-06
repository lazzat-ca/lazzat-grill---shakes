// src/lib/sauces-data.ts
import { SauceItem } from "./menu-types.js";

/* IMAGE IMPORTS */
// Removed image imports

export const sauces: SauceItem[] = [
  {
    name: "Maple Mustard",
    level: 1,
    description: "Mayo, cream, mustard, maple syrup",
    image: "/assets/maple-mustard-sauce.jpeg",
    allergens: ["milk", "eggs"], // mayo + cream
  },
  {
    name: "Mushroom sauce",
    level: 2,
    description:
      "Cream, Milk, Mushrooms, Black Pepper, Salt, Chicken Powder",
    image: "/assets/mushroom-sauce.jpeg",
    allergens: ["milk"], // cream & milk
  },
  {
    name: "Mint sauce",
    level: 3,
    description: "Mint, Coriander, Salt, Yogurt, Green Chilli",
    image: "/assets/mint-sauce.jpeg",
    allergens: ["milk"], // yogurt
  },
  {
    name: "Chipotle sauce",
    level: 4,
    description: "Mayo, Chipotle Sauce",
    image: "/assets/chipotle-sauce.jpeg",
    allergens: ["eggs"], // mayo
  },
  {
    name: "Sweet and spicy",
    level: 5,
    description:
      "Sriracha, Sweet Chili, Tabasco, Bell Peppers, Jalapeno, Maple Syrup",
    image: "/assets/sweet-spicy-sauce.jpeg",
    allergens: [], // no common allergens
  },
  {
    name: "Spicy tomato sauce",
    level: 6,
    description:
      "Tomato Fresh, Thai Green Chilli, Tabasco Hot Sauce, Onion",
    image: "/assets/spicy-tomato-sauce.jpeg",
    allergens: [], // tomato-based
  },
  {
    name: "Jalapeno chipotle sauce",
    level: 7,
    description:
      "Chipotle, Jalapeno, Fresh Garlic, Sriracha",
    image: "/assets/jalapeno-chipotle-sauce.jpeg",
    allergens: [], // chili-based
  },
  {
    name: "BBQ sauce",
    level: 8,
    description:
      "Tomato Ketchup, Brown Sugar, Soya Sauce, Hot Sauce, Garlic Powder",
    image: "/assets/bbq-sauce.jpeg",
    allergens: ["soy"], // soya sauce
  },
];
