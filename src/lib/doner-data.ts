import { MenuItem } from "./menu-types";

import imgClassicDoner from "@/assets/classic-doner-supereme.jpg";
import imgUltimateDoner from "@/assets/ultimate-flavor-doner.jpg";
import imgLoadedDoner from "@/assets/loaded-delight-doner.jpg";

export const donerItems: Record<string, MenuItem[]> = {
  "Döner": [
    {
      id: 301,
      name: "Classic Döner Supreme",
      description:
        "Tender lamb döner layered with fresh lettuce, tomatoes, onions, and cucumbers, finished with bold BBQ and chili sauces. A timeless classic with rich flavor and perfect balance.",
      price: 13.99,
      image: imgClassicDoner,
      category: "Döner",
      subCategory: "Classic",
      heatLevel: 2,
      isPopular: true,
      isNew: true,
        saucePairings: ["BBQ sauce", "Sweet and spicy"],
      customizations: ["Extra Sauce", "No Onions", "Add Cheese"],
      allergens: ["gluten"],
      dietary: ["dairy-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 302,
      name: "Ultimate Flavor Döner",
      description:
        "Juicy lamb döner stacked with fresh greens and loaded with BBQ, spicy garlic-style chili, sriracha, and jalapeño chipotle sauces. Big flavors, bold heat, and a seriously satisfying finish.",
      price: 15.99,
      image: imgUltimateDoner,
      category: "Döner",
      subCategory: "Ultimate",
      heatLevel: 3,
      isPopular: true,
      isNew: true,
        saucePairings: ["BBQ sauce", "Chipotle sauce", "Sweet and spicy", "Jalapeno chipotle sauce"],
      customizations: ["Extra Spicy", "No Tomato", "Add Cheese"],
      allergens: ["gluten"],
      dietary: ["dairy-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
    {
      id: 303,
      name: "Loaded Delight Döner",
      description:
        "Juicy lamb döner loaded with fresh greens and generously drizzled BBQ, chipotle, sriracha, and jalapeño sauces for a bold, smoky-spicy kick. Packed in warm toasted pita for a rich, satisfying bite.",
      price: 14.99,
      image: imgLoadedDoner,
      category: "Döner",
      subCategory: "Loaded",
      heatLevel: 3,
      isPopular: false,
      isNew: true,
        saucePairings: ["BBQ sauce", "Chipotle sauce", "Sweet and spicy", "Jalapeno chipotle sauce"],
      customizations: ["Extra Sauce", "No Cucumber", "Add Cheese"],
      allergens: ["gluten"],
      dietary: ["dairy-free", "nut-free"],
      sidePairings: ["Cucumber Tomato", "Red Cabbage Slaw", "Pickled Onion", "Sweet Corn & Pepper", "Lazzat Bean Salad"],
    },
  ],
};
