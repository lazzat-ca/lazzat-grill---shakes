// src/lib/shakes-juices-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS — Signature Shakes */

// Public URLs for shakes
const imgShakeMango = "/assets/shakes/Mango-Shake.jpeg";
const imgShakeStrawberry = "/assets/shakes/Strawberry-Shake.jpeg";
const imgShakeCoconut = "/assets/shakes/Coconut-Shake.jpeg";
const imgShakeAllBerry = "/assets/shakes/All-Berry-Shake.jpeg";
const imgShakeAlmondDate = "/assets/shakes/Almond-Date-Shake.jpeg";

// Public URLs for blends
const imgBlendBlueLagoon = "/assets/blends/Blue-Lagoon.jpeg";
const imgBlendTropical = "/assets/blends/Tropical-Blend.jpeg";
const imgBlendBerryBurst = "/assets/blends/Berry-Burst-Blend.jpeg";
const imgBlendSunrise = "/assets/blends/Sunrise-Blend.jpeg";
const imgBlendWatermelon = "/assets/blends/Watermelon-Cooler.jpeg";
const imgBlendGreen = "/assets/blends/Green-Blend.jpeg";

export const shakesAndJuices: Record<string, MenuItem[]> = {
  "Signature Shakes": [
    {
      id: 201,
      name: "Mango Shake",
      description:
        "Real mango + milk + cream. 1 real fruit free: Pineapple or Coconut.",
      price: 6.99,
      image: imgShakeMango,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk" , "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
      isPopular: true,
    },
    {
      id: 202,
      name: "Strawberry Shake",
      description:
        "Real strawberry + milk + cream. 1 real fruit free: Banana or Mango.",
      price: 6.99,
      image: imgShakeStrawberry,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk" , "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 203,
      name: "Coconut Shake",
      description:
        "Real coconut + pineapple + milk. 1 real fruit free: Mango or Pineapple.",
      price: 6.99,
      image: imgShakeCoconut,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk" , "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 204,
      name: "All Berry Shake",
      description:
        "4 real berries + milk + cream. 1 real fruit free: Banana or Peach.",
      price: 7.99,
      image: imgShakeAllBerry,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk" , "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 205,
      name: "Almond Date Shake",
      description: "Dates + almonds + honey + milk. 1 real fruit free: Banana.",
      price: 6.99,
      image: imgShakeAlmondDate,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk" , "tree-nuts", "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
  ],

  "Popular Fruit Blends": [
    {
      id: 301,
      name: "Blue Lagoon",
      description:
        "Pineapple + Mango + Banana + Blue Spirulina (Water Base)",
      price: 8.48,
      image: imgBlendBlueLagoon,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 302,
      name: "Tropical Blend",
      description: "Mango + Pineapple + Coconut (Water Base)",
      price: 7.49,
      image: imgBlendTropical,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 303,
      name: "Berry Burst Blend",
      description: "Strawberry + Blueberry + Raspberry (Water Base)",
      price: 7.49,
      image: imgBlendBerryBurst,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 304,
      name: "Sunrise Blend",
      description: "Mango + Peach + Pineapple (Water Base)",
      price: 7.49,
      image: imgBlendSunrise,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 305,
      name: "Watermelon Cooler",
      description: "Watermelon + Mint + Lime juice (Water Base)",
      price: 7.49,
      image: imgBlendWatermelon,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
    {
      id: 306,
      name: "Green Blend",
      description: "Spinach + Mango + Pineapple + Banana (Water Base)",
      price: 7.49,
      image: imgBlendGreen,
      category: "Shakes & Juices",
      subCategory: "Popular Fruit Blends",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: [],
      dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    },
  ],
};