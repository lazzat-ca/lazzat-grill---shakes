// src/lib/sauces-data.ts
import { SauceItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgSweetSpicy from "@/assets/sweet-spicy-sauce.jpeg";
import imgBBQ from "@/assets/bbq-sauce.jpeg";
import imgChipotle from "@/assets/chipotle-sauce.jpeg";
import imgJalapenoChipotle from "@/assets/jalapeno-chipotle-sauce.jpeg";
import imgMapleMustard from "@/assets/maple-mustard-sauce.jpeg";
import imgMint from "@/assets/mint-sauce.jpeg";
import imgMushroom from "@/assets/mushroom-sauce.jpeg";
import imgSpicyTomato from "@/assets/spicy-tomato-sauce.jpeg";

export const sauces: SauceItem[] = [
  {
    name: "Maple Mustard",
    level: 1,
    description: "Mayo, cream, mustard, maple syrup",
    image: imgMapleMustard,
    allergens: ["milk", "eggs"], // mayo + cream
  },
  {
    name: "Mushroom sauce",
    level: 2,
    description:
      "Cream, Milk, Mushrooms, Black Pepper, Salt, Chicken Powder",
    image: imgMushroom,
    allergens: ["milk"], // cream & milk
  },
  {
    name: "Mint sauce",
    level: 3,
    description: "Mint, Coriander, Salt, Yogurt, Green Chilli",
    image: imgMint,
    allergens: ["milk"], // yogurt
  },
  {
    name: "Chipotle sauce",
    level: 4,
    description: "Mayo, Chipotle Sauce",
    image: imgChipotle,
    allergens: ["eggs"], // mayo
  },
  {
    name: "Sweet and spicy",
    level: 5,
    description:
      "Sriracha, Sweet Chili, Tabasco, Bell Peppers, Jalapeno, Maple Syrup",
    image: imgSweetSpicy,
    allergens: [], // no common allergens
  },
  {
    name: "Spicy tomato sauce",
    level: 6,
    description:
      "Tomato Fresh, Thai Green Chilli, Tabasco Hot Sauce, Onion",
    image: imgSpicyTomato,
    allergens: [], // tomato-based
  },
  {
    name: "Jalapeno chipotle sauce",
    level: 7,
    description:
      "Chipotle, Jalapeno, Fresh Garlic, Sriracha",
    image: imgJalapenoChipotle,
    allergens: [], // chili-based
  },
  {
    name: "BBQ sauce",
    level: 8,
    description:
      "Tomato Ketchup, Brown Sugar, Soya Sauce, Hot Sauce, Garlic Powder",
    image: imgBBQ,
    allergens: ["soy"], // soya sauce
  },
];
