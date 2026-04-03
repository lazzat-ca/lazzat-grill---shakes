// src/lib/sides-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgColeslaw from "@/assets/COLESLAW.jpg";
import imgCornOnTheCob from "@/assets/CORN-ON-THE-CОВ.jpg";
import imgCrispyFries from "@/assets/CRISPY-FRIES.jpg";
import imgGarlicBread from "@/assets/GARLIC-BREAD.jpg";
import imgGrilledVegetables from "@/assets/GRILLED-VEGETABLES.jpg";
import imgSideSalad from "@/assets/SIDE-SALAD.jpg";

/* NAAN IMAGES */
import imgButterNaan from "@/assets/Butter Naan.jpg";
import imgCheeseStuffedNaan from "@/assets/Cheese-Stuffed Naan.jpg";
import imgGarlicHerbNaan from "@/assets/Garlic & Herb Naan.jpg";

/* New Items */
import imgGarlicButterRice from "@/assets/garlic-butter-rice.jpeg";
import imgSaffronBasmatiRice from "@/assets/saffron-basmati-rice.jpeg";
import imgSweetPotatoFries from "@/assets/sweet-potato-fries.jpeg";

export const sidesItems: Record<string, MenuItem[]> = {
  Classic: [
    {
      id: 200,
      name: "Crispy Fries",
      description:
        "Golden, crispy fries served with a sprinkle of seasoning.",
      price: 4.99,
      image: imgCrispyFries,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Crispy"],
      allergens: [],
      dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },

    {
      id: 201,
      name: "Garlic Bread",
      description:
        "Soft, buttery bread with a garlic infusion, perfect for dipping.",
      price: 4.99,
      image: imgGarlicBread,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Garlic", "Add Cheese"],
      allergens: ["milk", "gluten"],
      dietary: ["vegetarian", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },

    {
      id: 202,
      name: "Grilled Vegetables",
      description:
        "A mix of seasonal veggies grilled to perfection, lightly seasoned.",
      price: 4.99,
      image: imgGrilledVegetables,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Char"],
      allergens: [],
      dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "green",
    },

    {
      id: 203,
      name: "Coleslaw",
      description:
        "Crunchy, tangy coleslaw with shredded cabbage, carrots, and a hint of vinegar.",
      price: 3.99,
      image: imgColeslaw,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Dressing"],
      allergens: [],
      dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "green",
    },

    {
      id: 204,
      name: "Corn on the Cob",
      description:
        "Grilled corn with paprika and a bright finishing touch.",
      price: 4.99,
      image: imgCornOnTheCob,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 1,
      saucePairings: [],
      customizations: ["Extra Paprika"],
      allergens: [],
      dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "green",
    },

    {
      id: 205,
      name: "Side Salad",
      description:
        "Fresh, mixed greens with a light vinaigrette dressing.",
      price: 3.99,
      image: imgSideSalad,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Dressing", "Add Olives"],
      allergens: [],
      dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "green",
    },

    /* NAAN ITEMS */
    {
      id: 210,
      name: "Classic Butter Naan",
      description:
        "Soft, pillowy naan brushed with melted butter. Warm, fragrant, and perfect for pairing with any dish.",
      price: 3.99,
      image: imgButterNaan,
      category: "Sides",
      subCategory: "Naan",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Butter"],
      allergens: ["milk", "gluten"],
      dietary: ["vegetarian", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },

    {
      id: 211,
      name: "Cheese Stuffed Naan",
      description:
        "Soft naan filled with gooey, melted cheese. Rich, indulgent, and a crowd favorite with every bite.",
      price: 3.99,
      image: imgCheeseStuffedNaan,
      category: "Sides",
      subCategory: "Naan",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Cheese"],
      allergens: ["milk", "gluten"],
      dietary: ["vegetarian", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },

    {
      id: 212,
      name: "Garlic & Herb Naan",
      description:
        "Freshly baked naan topped with minced garlic and aromatic herbs. Savory, flavorful, and irresistibly fragrant.",
      price: 3.99,
      image: imgGarlicHerbNaan,
      category: "Sides",
      subCategory: "Naan",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Garlic"],
      allergens: ["milk", "gluten"],
      dietary: ["vegetarian", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },
        {
      id: 213,
      name: "Saffron Basmati Rice",
      description:
        "Fragrant long-grain basmati gently infused with saffron for a rich, aromatic base.",
      price: 3.99,
      image: imgSaffronBasmatiRice,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Saffron", "Extra Butter"],
      allergens: [],
      dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },

    {
      id: 214,
      name: "Butter Garlic Rice",
      description:
        "Fluffy rice tossed with butter and roasted garlic for a smooth, comforting finish.",
      price: 3.99,
      image: imgGarlicButterRice,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Garlic", "Extra Butter"],
      allergens: ["milk"],
      dietary: ["vegetarian", "gluten-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },

    {
      id: 215,
      name: "Sweet Potato Fries",
      description:
        "A slightly sweet contrast to the smoky, savory BBQ flavors.",
      price: 4.99,
      image: imgSweetPotatoFries,
      category: "Sides",
      subCategory: "Classic",
      heatLevel: 0,
      saucePairings: [],
      customizations: ["Extra Crispy"],
      allergens: [],
      dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
      isNew: true,
      isPopular: true,
      sideType: "carb",
    },

  ],
};
