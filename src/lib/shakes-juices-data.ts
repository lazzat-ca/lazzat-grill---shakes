// src/lib/shakes-juices-data.ts
import { MenuItem } from "./menu-types";

/* IMAGE IMPORTS — Signature Shakes */
import imgShakeMango from "@/assets/Mango-Shake.jpeg";
import imgShakeStrawberry from "@/assets/Strawberry-Shake.jpeg";
import imgShakeCoconut from "@/assets/Coconut-Shake.jpeg";
import imgShakeAllBerry from "@/assets/All-Berry-Shake.jpeg";
import imgShakeAlmondDate from "@/assets/Almond-Date-Shake.jpeg";

/* IMAGE IMPORTS — Popular Fruit Blends */
import imgBlendBlueLagoon from "@/assets/Blue-Lagoon.jpeg";
import imgBlendTropical from "@/assets/Tropical-Blend.jpeg";
import imgBlendBerryBurst from "@/assets/Berry-Burst-Blend.jpeg";
import imgBlendSunrise from "@/assets/Sunrise-Blend.jpeg";
import imgBlendWatermelon from "@/assets/Watermelon-Cooler.jpeg";
import imgBlendGreen from "@/assets/Green-Blend.jpeg";

export const shakesAndJuices: Record<string, MenuItem[]> = {
  "Shakes": [
    {
      id: 202,
      name: "Strawberry Shake",
      description: "Real Strawberry + Milk + Cream",
      priceStandard: 7.99,
      priceCombo: 8.99,
      image: imgShakeStrawberry,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 201,
      name: "Golden Mango",
      description: "Real Alphonso Mango + Milk + Cream",
      priceStandard: 7.99,
      priceCombo: 8.99,
      image: imgShakeMango,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
    {
      id: 204,
      name: "All Berry Shake",
      description: "Strawberry + Blueberry + Raspberry + Blackberry",
      priceStandard: 7.99,
      priceCombo: 8.99,
      image: imgShakeAllBerry,
      category: "Shakes & Juices",
      subCategory: "Signature Shakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "tree-nuts"],
      dietary: ["vegetarian", "gluten-free"],
    },
  ],

  "Popular Fruit Blends": [
    {
      id: 302,
      name: "Tropical Bliss",
      description: "Mango + Pineapple + Coconut",
      priceStandard: 7.99,
      priceCombo: 8.99,
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
      name: "Berry Burst",
      description: "Strawberry + Blueberry + Raspberry",
      priceStandard: 7.99,
      priceCombo: 8.99,
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
      name: "Sunrise Breeze",
      description: "Mango + peach + pineapple",
      priceStandard: 7.99,
      priceCombo: 8.99,
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
      description: "Watermelon + mint + lime · seasonal",
      priceStandard: 7.99,
      priceCombo: 8.99,
      image: imgBlendWatermelon,
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