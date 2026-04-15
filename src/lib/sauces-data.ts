// src/lib/sauces-data.ts
import { SauceItem } from "./menu-types.js";

/* IMAGE IMPORTS */


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
    name: "BBQ sauce",
    level: 7,
    description: "BBQ Sauce, Spices, Tomato, Vinegar",
    image: "/assets/bbq-sauce.jpeg",
    allergens: [],
  },
  {
    name: "Jalapeno chipotle sauce",
    level: 8,
    description: "Chipotle, Jalapeno, Fresh Garlic, Sriracha",
    image: "/assets/jalapeno-chipotle-sauce.jpeg",
    allergens: [], // chili-based
  },
  {
    name: "Jalapeno Chipotle sauce",
    level: 9,
    description: "Jalapeno, Chipotle, Mayo, Spices",
    image: "/assets/jalapeno-chipotle-sauce.jpeg",
    allergens: ["eggs"],
  },
  {
    name: "Soy Sauce",
    level: 10,
    description: "Soy sauce, salt, spices",
    image: "/assets/soy-sauce.jpeg",
    allergens: ["soy"], // soya sauce
  },
];
