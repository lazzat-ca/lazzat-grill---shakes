// src/lib/spices-data.ts
import { SauceItem } from "./menu-types";

/* IMAGE IMPORTS */
import bayLeaf from "@/assets/bay-leaf-powder.273.jpeg";
import cinnamon from "@/assets/cinnamon-powder.202.jpeg";
import coriander from "@/assets/coriander-seed-powder.410.jpeg";
import blackPepper from "@/assets/cracked-black-pepper.369.jpeg";
import redChilli from "@/assets/crushed-red-chilli.392.jpeg";
import lemonPeel from "@/assets/dried-lemon-peel.922.jpeg";
import parsley from "@/assets/dried-parsley.549.jpeg";
import friedOnion from "@/assets/fried-onion-powder.550.jpeg";
import garlic from "@/assets/garlic-powder.580.jpeg";
import cardamom from "@/assets/green-cardamom.216.jpeg";
import koreanChilli from "@/assets/korean-chilli-flakes.907.jpeg";
import lemonZest from "@/assets/lemon-zest.186.jpeg";
import mustard from "@/assets/mustard-powder.113.jpeg";
import onion from "@/assets/onion-powder.939.jpeg";
import pinkSalt from "@/assets/pink-salt.241.jpeg";
import roastedGarlic from "@/assets/roasted-garlic-flakes.431.jpeg";
import paprika from "@/assets/smoked-paprik.jpeg";
import starAnise from "@/assets/star-ainse.993.jpeg";
import thyme from "@/assets/thyme.521.jpeg";
import cumin from "@/assets/toasted-cumin.jpeg";
import sesame from "@/assets/toasted-seseame.201.jpeg";
import whitePepper from "@/assets/white-pepper.jpeg";

export const spices: SauceItem[] = [
  {
    name: "Bay Leaf Powder",
    level: 0,
    description: "Bay leaf, dried and finely ground",
    image: bayLeaf,
    allergens: [],
  },
  {
    name: "Cinnamon Powder",
    level: 0,
    description: "Cinnamon bark, finely ground",
    image: cinnamon,
    allergens: [],
  },
  {
    name: "Coriander Seed Powder",
    level: 0,
    description: "Coriander seeds, slow-ground",
    image: coriander,
    allergens: [],
  },
  {
    name: "Cracked Black Pepper",
    level: 3, // moderate heat
    description: "Cracked black peppercorns",
    image: blackPepper,
    allergens: [],
  },
  {
    name: "Crushed Red Chilli",
    level: 6, // hot (can go to 7 for extra hot)
    description: "Sun-dried red chillies, crushed",
    image: redChilli,
    allergens: [],
  },
  {
    name: "Dried Lemon Peel",
    level: 1,
    description: "Dried lemon peel, finely cut",
    image: lemonPeel,
    allergens: [],
  },
  {
    name: "Dried Parsley",
    level: 0,
    description: "Air-dried parsley leaves",
    image: parsley,
    allergens: [],
  },
  {
    name: "Fried Onion Powder",
    level: 0,
    description: "Slow-fried onions, powdered",
    image: friedOnion,
    allergens: [],
  },
  {
    name: "Garlic Powder",
    level: 1,
    description: "Dehydrated garlic cloves, ground",
    image: garlic,
    allergens: [],
  },
  {
    name: "Green Cardamom",
    level: 0,
    description: "Whole green cardamom pods",
    image: cardamom,
    allergens: [],
  },
  {
    name: "Korean Chilli Flakes",
    level: 5, // medium-hot (gochugaru is not as hot as Indian/Thai)
    description: "Korean gochugaru chilli flakes",
    image: koreanChilli,
    allergens: [],
  },
  {
    name: "Lemon Zest",
    level: 1,
    description: "Fresh lemon zest, gently dried",
    image: lemonZest,
    allergens: [],
  },
  {
    name: "Mustard Powder",
    level: 2,
    description: "Mustard seeds, finely crushed",
    image: mustard,
    allergens: ["mustard"],
  },
  {
    name: "Onion Powder",
    level: 0,
    description: "Dehydrated onions, finely ground",
    image: onion,
    allergens: [],
  },
  {
    name: "Pink Salt",
    level: 0,
    description: "Natural Himalayan pink salt",
    image: pinkSalt,
    allergens: [],
  },
  {
    name: "Roasted Garlic Flakes",
    level: 1,
    description: "Slow-roasted garlic flakes",
    image: roastedGarlic,
    allergens: [],
  },
  {
    name: "Smoked Paprika",
    level: 2, // usually mild, unless hot variety
    description: "Smoked red peppers, ground",
    image: paprika,
    allergens: [],
  },
  {
    name: "Star Anise",
    level: 0,
    description: "Whole star anise pods",
    image: starAnise,
    allergens: [],
  },
  {
    name: "Thyme",
    level: 0,
    description: "Dried thyme leaves",
    image: thyme,
    allergens: [],
  },
  {
    name: "Toasted Cumin",
    level: 2,
    description: "Dry-roasted cumin seeds",
    image: cumin,
    allergens: [],
  },
  {
    name: "Toasted Sesame",
    level: 0,
    description: "Golden toasted sesame seeds",
    image: sesame,
    allergens: [],
  },
  {
    name: "White Pepper",
    level: 3, // moderate heat
    description: "Hulled white peppercorns, ground",
    image: whitePepper,
    allergens: [],
  },
];

