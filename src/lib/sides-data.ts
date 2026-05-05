import imgRoastedPotato from "@/assets/roasted-potato.jpg";
// src/lib/sides-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS */
import imgCucumberTomato from "@/assets/cucumber-tomato.jpeg";

import imgPickledOnion from "@/assets/pickled-onion.jpeg";
import imgSweetCorn from "@/assets/sweet-corn.jpeg";
import imgLazzatBeanSalad from "@/assets/lazzat-bean-salad.jpeg";
import imgSpicedChickPea from "@/assets/spiced-chickpea.jpeg";

export const sidesItems: Record<string, MenuItem[]> = {
  Salads: [
    {
      id: 301,
      name: "Cucumber Tomato",
      description: "Fresh Cucumber, Ripe Tomato, Lime, Olive Oil\n70G per Scoop Price: 5.99",
      image: imgCucumberTomato,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      price: 5.99,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 303,
      name: "Pickled Onion",
      description: "Quick-Pickled Red Onion, Mustard Seed\n70G per Scoop Price: 5.99",
      image: imgPickledOnion,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      price: 5.99,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 304,
      name: "Sweet Corn & Pepper",
      description: "Sweet Corn, Bell Pepper, Tamarind-Hint\n70G per Scoop Price: 5.99",
      image: imgSweetCorn,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      price: 5.99,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
      isPopular: true,
    },
    {
      id: 306,
      name: "Lazzat Bean Salad",
      description: "Kidney Bean, Raisin, Mild Spice\n70G per Scoop Price: 5.99",
      image: imgLazzatBeanSalad,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      price: 5.99,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
      isPopular: true,
    },
    {
      id: 307,
      name: "Spiced ChickPea",
      description: "Chickpea, Lemon, Mild Spice\nHoney Based Dressing\n70G per Scoop Price: 5.99",
      image: imgSpicedChickPea,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 2,
      price: 5.99,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 308,
      name: "Roasted Sweet Potato",
      description: "Roasted Cubed Sweet Potato, Herbs\n70G per Scoop Price:5.99",
      image: imgRoastedPotato,
      category: "Salads",
      subCategory: "Salads",
      heatLevel: 0,
      price: 5.99,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
  ],
};