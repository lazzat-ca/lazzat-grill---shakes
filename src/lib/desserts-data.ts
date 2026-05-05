import { MenuItem } from "./menu-types";

// Only import images for the six required desserts
import imgCheesecakeOreo from "@/assets/dessert-cheesecake-oreo.jpeg";
import imgCheesecakeMango from "@/assets/dessert-cheesecake-mango.jpeg";
import imgPistachioCheesecake from "@/assets/pistachio-cheesecake.jpeg";
import imgTiramisuMango from "@/assets/dessert-tiramisu-mango.jpeg";
import imgBrowniePistachio from "@/assets/dessert-brownie-pistachio.jpeg";
import imgBiscoffTiramisu from "@/assets/biscoff-tiramisu.jpeg";

export const desserts: Record<string, MenuItem[]> = {
  Cheesecakes: [
    {
      id: 40,
      name: "Oreo Cheesecake",
      description:
        "Creamy cheesecake mixed with Oreo crumbs on a chocolate crust.",
      price: 5.99,
      image: imgCheesecakeOreo,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "soy"],
      dietary: ["vegetarian"],
    },
    {
      id: 41,
      name: "Mango Cheesecake",
      description:
        "Smooth cheesecake layered with luscious mango purée.",
      price: 5.99,
      image: imgCheesecakeMango,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 42,
      name: "Pistachio Cheesecake",
      description:
        "Rich cheesecake with pistachio flavor and a nutty crust.",
      price: 5.99,
      image: imgPistachioCheesecake,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
  ],
  Tiramisu: [
    {
      id: 50,
      name: "Mango Tiramisu",
      description: "Mascarpone layered with mango-soaked ladyfingers.",
      price: 9.99,
      image: imgTiramisuMango,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 51,
      name: "Pistachio Tiramisu",
      description:
        "Decadent dark chocolate brownie layered with pistachio.",
      price: 9.99,
      image: imgBrowniePistachio,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
    {
      id: 52,
      name: "Biscoff Tiramisu",
      description: "Classic tiramisu with a Biscoff twist.",
      price: 9.99,
      image: imgBiscoffTiramisu,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "soy"],
      dietary: ["vegetarian"],
    },
  ],
};