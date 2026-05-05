// src/lib/shakes-juices-data.ts
import { MenuItem } from "./menu-types.js";

/* IMAGE IMPORTS — Signature Shakes */
import imgShakeMango from "/assets/shakes/Mango-Shake.jpeg";
import imgShakeStrawberry from "/assets/shakes/Strawberry-Shake.jpeg";
import imgShakeCoconut from "/assets/shakes/Coconut-Shake.jpeg";
import imgShakeAlmondDate from "/assets/shakes/Almond-Date-Shake.jpeg";

/* IMAGE IMPORTS — Popular Fruit Blends */
import imgBlendBlueLagoon from "/assets/blends/Blue-Lagoon.jpeg";
import imgBlendTropical from "/assets/blends/Tropical-Blend.jpeg";
import imgBlendBerryBurst from "/assets/blends/Berry-Burst-Blend.jpeg";
import imgBlendSunrise from "/assets/blends/Sunrise-Blend.jpeg";
import imgBlendWatermelon from "/assets/blends/Watermelon-Cooler.jpeg";
import imgBlendGreen from "/assets/blends/Green-Blend.jpeg";

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
    // {
    //   id: 204,
    //   name: "All Berry Shake",
    //   description: "Strawberry + Blueberry + Raspberry + Blackberry",
    //   priceStandard: 7.99,
    //   priceCombo: 8.99,
    //   image: imgShakeAllBerry,
    //   category: "Shakes & Juices",
    //   subCategory: "Signature Shakes",
    //   heatLevel: 0,
    //   saucePairings: [],
    //   customizations: [],
    //   allergens: ["milk", "tree-nuts"],
    //   dietary: ["vegetarian", "gluten-free"],
    // {
    //   id: 304,
    //   name: "Sunrise Blend",
    //   description: "Orange + Mango + Pineapple",
    //   priceStandard: 7.99,
    //   priceCombo: 8.99,
    //   image: imgBlendSunrise,
    //   category: "Shakes & Juices",
    //   subCategory: "Popular Fruit Blends",
    //   heatLevel: 0,
    //   saucePairings: [],
    //   customizations: [],
    //   allergens: [],
    //   dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    // },
    //   customizations: [],
    //   allergens: [],
    //   dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    // },
    // {
    //   id: 303,
    //   name: "Berry Burst",
    //   description: "Strawberry + Blueberry + Raspberry",
    //   priceStandard: 7.99,
    //   priceCombo: 8.99,
    //   image: imgBlendBerryBurst,
    //   category: "Shakes & Juices",
    //   subCategory: "Popular Fruit Blends",
    //   heatLevel: 0,
    //   saucePairings: [],
    //   customizations: [],
    //   allergens: [],
    //   dietary: ["vegan", "dairy-free", "gluten-free", "nut-free"],
    // },
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