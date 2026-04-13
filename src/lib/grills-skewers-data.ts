// src/lib/grills-skewers-data.ts
import { MenuItem } from "./menu-types.js";

/* IMAGE IMPORTS */
import imgChickenSkewers from "@/assets/chicken-skewers.jpeg";
import imgLambSkewers from "@/assets/lamb-skewers.jpeg";
import imgSalmonTikka from "@/assets/salmon-tikka.jpeg";
import imgChickenSeekh from "@/assets/chicken-seekh.jpeg";
import imgLambSeekh from "@/assets/lamb-seekh.jpeg";
import imgLambChops from "@/assets/lamb-chops.jpeg";
import imgPaneerTikka from "@/assets/paneer-tikka.jpg";

export const grillsAndSkewers: Record<string, MenuItem[]> = {
  Chicken: [
    {
      id: 1,
      name: "Chicken Skewers",
      description:
        "Tender chicken skewers marinated with house spices and grilled over charcoal.",
      price: 12.99,
      image: imgChickenSkewers,
      category: "Grills & Skewers",
      subCategory: "Chicken",
      heatLevel: 3,
      isPopular: true,
      saucePairings: [
        "Mint sauce",
        "Maple Mustard",
        "Sweet and spicy",
        "Chipotle sauce",
      ],
      customizations: ["Extra Char", "Boneless"],
      allergens: ["milk"], // yogurt / cream-based marinade
      dietary: ["gluten-free", "nut-free"],
    },
    {
      id: 4,
      name: "Chicken Seekh Kabab",
      description:
        "Hand-pressed chicken seekh seasoned with aromatic spices and grilled.",
      price: 13.99,
      image: imgChickenSeekh,
      category: "Grills & Skewers",
      subCategory: "Seekh",
      heatLevel: 4,
      saucePairings: [
        "Mint sauce",
        "Mushroom sauce",
        "Sweet and spicy",
        "Chipotle sauce",
      ],
      customizations: ["Add Cheese", "Boneless"],
      allergens: ["milk"], // dairy binding / optional cheese
      dietary: ["gluten-free", "nut-free"],
    },
  ],

  Lamb: [
    {
      id: 2,
      name: "Lamb Skewers",
      description:
        "Minced lamb skewers seasoned with traditional spices and charred to perfection.",
      price: 15.99,
      image: imgLambSkewers,
      category: "Grills & Skewers",
      subCategory: "Lamb",
      heatLevel: 4,
      isPopular: true,
      saucePairings: [
        "BBQ sauce",
        "Spicy tomato sauce",
        "Sweet and spicy",
      ],
      customizations: ["Extra Herb", "Half Portion"],
      allergens: [], // no major allergens in base preparation
      dietary: ["gluten-free", "dairy-free", "nut-free"],
    },
    {
      id: 5,
      name: "Lamb Seekh Kabab",
      description:
        "Juicy lamb seekh infused with spices and charred over coals.",
      price: 15.99,
      image: imgLambSeekh,
      category: "Grills & Skewers",
      subCategory: "Seekh",
      heatLevel: 5,
      saucePairings: [
        "Jalapeno chipotle sauce",
        "BBQ sauce",
        "Spicy tomato sauce",
      ],
      customizations: ["Extra Spice", "Boneless"],
      allergens: [], // spice-based, no dairy by default
      dietary: ["gluten-free", "dairy-free", "nut-free"],
    },
    {
      id: 6,
      name: "Lamb Chops",
      description:
        "Premium lamb chops marinated and grilled to medium-rare perfection.",
      price: 22.99,
      image: imgLambChops,
      category: "Grills & Skewers",
      subCategory: "Lamb Chops",
      heatLevel: 3,
      saucePairings: [
        "BBQ sauce",
        "Mushroom sauce",
        "Mint sauce",
      ],
      customizations: ["Extra Lemon", "Crispy Edges"],
      allergens: [], // herb & oil marinade
      dietary: ["gluten-free", "dairy-free", "nut-free"],
    },
  ],

  Salmon: [
    {
      id: 3,
      name: "Salmon Tikka",
      description:
        "Chunks of salmon marinated in delicate spices and grilled for a smoky finish.",
      price: 17.99,
      image: imgSalmonTikka,
      category: "Grills & Skewers",
      subCategory: "Salmon",
      heatLevel: 2,
      saucePairings: [
        "Maple Mustard",
        "Mint sauce",
        "Sweet and spicy",
      ],
      customizations: ["Extra Lemon"],
      allergens: ["fish", "milk"], // salmon + yogurt-based tikka marinade
      dietary: ["gluten-free", "nut-free"],
    },
  ],

    Vegetarian: [
    {
      id: 7,
      name: "Paneer Tikka",
      description:
        "Tender cubes of fresh paneer, marinated in aromatic spices and char-grilled to smoky perfection. Finished with your choice of Lazzat’s signature sauce for a bold, irresistible kick. A vegetarian favorite elevated to a bold, indulgent, and unforgettable experience.",
      price: 13.99,
      image: imgPaneerTikka,
      category: "Grills & Skewers",
      subCategory: "Vegetarian",
      heatLevel: 3,
      isPopular: true,
      saucePairings: [
        "Mint sauce",
        "Mushroom sauce",
        "Chipotle sauce",
        "Sweet and spicy",
      ],
      customizations: ["Extra Char", "Extra Sauce"],
      allergens: ["milk"], // paneer = cheese (dairy)
      dietary: ["vegetarian", "gluten-free", "nut-free"],
    },
  ],

};
