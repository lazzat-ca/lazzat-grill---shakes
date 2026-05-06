import { MenuItem } from "./menu-types.js";


export const familyPlatters: MenuItem[] = [
  {
    id: 101,
    name: "Whole Chicken",
    description: "Full Chicken Tray served with seasoned rice. Serves 3-4 people.",
    price: 34.99,
    image: "/assets/whole-chicken.jpeg",
    category: "Family Platters",
    heatLevel: 1,
    isPopular: false,
    saucePairings: [],
    customizations: [
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [
      "Cucumber Tomato",
      "Red Cabbage Slaw",
      "Pickled Onion",
      "Sweet Corn & Pepper",
      "Lazzat Bean Salad",
    ],
  },
  {
    id: 102,
    name: "Cut Chicken",
    description: "Whole Cut Chicken Tray served with seasoned rice. Serves 3-4 people.",
    price: 34.99,
    image: "/assets/cut-chicken.jpeg",
    category: "Family Platters",
    heatLevel: 1,
    isPopular: false,
    saucePairings: [],
    customizations: [
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [
      "Cucumber Tomato",
      "Red Cabbage Slaw",
      "Pickled Onion",
      "Sweet Corn & Pepper",
      "Lazzat Bean Salad",
    ],
  },
  {
    id: 103,
    name: "Salmon Fish",
    description: "Whole Fish Tray served with seasoned rice. Serves 3-4 people.",
    price: 29.99,
    image: "/assets/whole-salmon.jpeg",
    category: "Family Platters",
    heatLevel: 0,
    isPopular: false,
    saucePairings: [],
    customizations: [
      "Extra Sauce: $0.29",
      "Water Bottle: $1.89"
    ],
    allergens: [],
    dietary: ["gluten-free", "nut-free"],
    sidePairings: [
      "Cucumber Tomato",
      "Red Cabbage Slaw",
      "Pickled Onion",
      "Sweet Corn & Pepper",
      "Lazzat Bean Salad",
    ],
  },
];
