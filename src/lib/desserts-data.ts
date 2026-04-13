import { MenuItem } from "./menu-types.js";

/* IMAGE IMPORTS */
import imgFruitStrawberry from "@/assets/dessert-strawberry-fruit.jpeg";
import imgFruitCoconut from "@/assets/dessert-coconut-shell.jpeg";
import imgFruitMango from "@/assets/dessert-mango-marvelous.jpeg";
import imgFruitCoffee from "@/assets/dessert-coffee-bean-delight.jpeg";
import imgFruitOrange from "@/assets/dessert-orange-delight.jpeg";

import imgCheesecakeOreo from "@/assets/dessert-cheesecake-oreo.jpeg";
import imgCheesecakeBlueberry from "@/assets/dessert-cheesecake-blueberry.jpeg";
import imgCheesecakeMango from "@/assets/dessert-cheesecake-mango.jpeg";
import imgCheesecakeStrawberry from "@/assets/dessert-cheesecake-strawberry.jpeg";
import imgCheesecakeBiscoff from "@/assets/dessert-cheesecake-biscoff.jpeg";

import imgTiramisuMango from "@/assets/dessert-tiramisu-mango.jpeg";
import imgTiramisuChocolate from "@/assets/dessert-tiramisu-chocolate.jpeg";
import imgTiramisuCoffee from "@/assets/dessert-tiramisu-coffee.jpeg";
import imgTiramisuBlueberry from "@/assets/dessert-tiramisu-blueberry.jpeg";


import imgBrowniePistachio from "@/assets/dessert-brownie-pistachio.jpeg";

import imgCinnamonOriginal from "@/assets/dessert-cinnamon-original.jpeg";
import imgCinnamonBlueberry from "@/assets/dessert-cinnamon-blueberry.jpeg";
import imgCinnamonNutella from "@/assets/dessert-cinnamon-nutella.jpeg";
import imgCinnamonBiscoff from "@/assets/dessert-cinnamon-biscoff.jpeg";

import imgCakeVanilla from "@/assets/dessert-cake-vanilla.jpeg";
import imgCakeChocolate from "@/assets/dessert-cake-chocolate.jpeg";
import imgCakeDubai17Layer from "@/assets/Dubai17layerchocolatecak.jpeg";


import imgTresLechesPistachio from "@/assets/dessert-tresleches-pistachio.jpeg";
import imgTresLechesCoconut from "@/assets/dessert-tresleches-coconut.jpeg";
import imgTresLechesPineapple from "@/assets/dessert-tresleches-pineapple.jpeg";
import imgTresLechesMango from "@/assets/dessert-tresleches-mango.jpeg";

export const desserts: Record<string, MenuItem[]> = {
  "Fruit Entremet": [
    {
      id: 30,
      name: "Strawberry Fruit Entremet",
      description:
        "Silky strawberry mousse, compote center, almond sponge and glossy glaze.",
      price: 7.99,
      image: imgFruitStrawberry,
      category: "Desserts",
      subCategory: "Fruit Entremet",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "tree-nuts"],
      dietary: ["vegetarian"],
    },
    {
      id: 31,
      name: "Coconut Shell Entremet",
      description:
        "Coconut panna cotta inside a crisp chocolate shell with coconut shards.",
      price: 7.99,
      image: imgFruitCoconut,
      category: "Desserts",
      subCategory: "Fruit Entremet",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "tree-nuts"],
      dietary: ["vegetarian"],
    },
    {
      id: 32,
      name: "Mango Marvelous Entremet",
      description:
        "Ripe mango mousse with tangy compote and delicate sponge layers.",
      price: 7.99,
      image: imgFruitMango,
      category: "Desserts",
      subCategory: "Fruit Entremet",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 33,
      name: "Coffee Bean Delight Entremet",
      description:
        "Coffee mousse with dark ganache and coffee sponge layers.",
      price: 7.99,
      image: imgFruitCoffee,
      category: "Desserts",
      subCategory: "Fruit Entremet",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 34,
      name: "Orange Delight Entremet",
      description:
        "Zesty orange mousse with almond sponge and a citrus glaze.",
      price: 7.99,
      image: imgFruitOrange,
      category: "Desserts",
      subCategory: "Fruit Entremet",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "tree-nuts"],
      dietary: ["vegetarian"],
    },
  ],

  Cheesecakes: [
    {
      id: 40,
      name: "Oreo & Cream Cheesecake",
      description:
        "Creamy cheesecake mixed with Oreo crumbs on a chocolate crust.",
      price: 7.99,
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
      name: "Blueberry Swirl Cheesecake",
      description:
        "Classic cheesecake swirled with fresh blueberry compote.",
      price: 6.99,
      image: imgCheesecakeBlueberry,
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
      name: "Mango Cheesecake",
      description:
        "Smooth cheesecake layered with luscious mango purée.",
      price: 6.99,
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
      id: 43,
      name: "Strawberry Cheesecake",
      description:
        "Rich cheesecake crowned with fresh strawberry compote.",
      price: 7.5,
      image: imgCheesecakeStrawberry,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 44,
      name: "Biscoff Cheesecake",
      description:
        "Caramel-spiced cheesecake on a Biscoff cookie crust.",
      price: 6.99,
      image: imgCheesecakeBiscoff,
      category: "Desserts",
      subCategory: "Cheesecakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "soy"],
      dietary: ["vegetarian"],
    },
  ],

  Tiramisu: [
    {
      id: 50,
      name: "Mango Tiramisu",
      description:
        "Mascarpone layered with mango-soaked ladyfingers.",
      price: 7.99,
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
      name: "Chocolate Tiramisu",
      description:
        "Chocolate-soaked ladyfingers with creamy mascarpone.",
      price: 8.99,
      image: imgTiramisuChocolate,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 52,
      name: "Coffee Tiramisu",
      description:
        "Classic espresso-soaked ladyfingers with mascarpone layers.",
      price: 7.99,
      image: imgTiramisuCoffee,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 53,
      name: "Blueberry Tiramisu",
      description:
        "Berry-soaked ladyfingers with mascarpone and blueberry compote.",
      price: 7.99,
      image: imgTiramisuBlueberry,
      category: "Desserts",
      subCategory: "Tiramisu",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    
  ],

  Brownies: [
    {
      id: 60,
      name: "Pistachio Dark Chocolate Brownie",
      description:
        "Decadent dark chocolate brownie layered with pistachio.",
      price: 6.99,
      image: imgBrowniePistachio,
      category: "Desserts",
      subCategory: "Brownies",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
  ],

  "Cinnamon Rolls": [
    {
      id: 70,
      name: "Original Cinnamon Roll",
      description:
        "Classic cinnamon roll with vanilla glaze.",
      price: 5.99,
      image: imgCinnamonOriginal,
      category: "Desserts",
      subCategory: "Cinnamon Rolls",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 71,
      name: "Blueberry Cinnamon Roll",
      description:
        "Cinnamon roll filled with blueberry compote.",
      price: 5.75,
      image: imgCinnamonBlueberry,
      category: "Desserts",
      subCategory: "Cinnamon Rolls",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 72,
      name: "Nutella Cinnamon Roll",
      description:
        "Cinnamon roll with creamy Nutella swirl.",
      price: 5.75,
      image: imgCinnamonNutella,
      category: "Desserts",
      subCategory: "Cinnamon Rolls",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts", "soy"],
      dietary: ["vegetarian"],
    },
    {
      id: 73,
      name: "Biscoff Cinnamon Roll",
      description:
        "Cinnamon roll infused with Biscoff spread.",
      price: 5.75,
      image: imgCinnamonBiscoff,
      category: "Desserts",
      subCategory: "Cinnamon Rolls",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "soy"],
      dietary: ["vegetarian", "nut-free"],
    },
  ],

  Cakes: [
    {
      id: 80,
      name: "Vanilla 4x4 Cake",
      description:
        "Moist vanilla cake portion (4x4).",
      price: 6.75,
      image: imgCakeVanilla,
      category: "Desserts",
      subCategory: "Cakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 81,
      name: "Chocolate 4x4 Cake",
      description:
        "Rich chocolate cake portion (4x4).",
      price: 6.99,
      image: imgCakeChocolate,
      category: "Desserts",
      subCategory: "Cakes",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
  id: 82,
  name: "Dubai 17 Layer Chocolate Cake",
  description:
    "Dubai-style 17-layer chocolate cake enriched with dark Belgian chocolate ganache between every layer.",
  price: 8.50,
  image: imgCakeDubai17Layer,
  category: "Desserts",
  subCategory: "Cakes",
  heatLevel: 0,
  isNew: true,          
  saucePairings: [],
  customizations: [],
  allergens: ["milk", "eggs", "gluten", "soy"],
  dietary: ["vegetarian", "nut-free"],
},


  ],

  "Tres Leches": [
    {
      id: 90,
      name: "Pistachio Tres Leches",
      description:
        "Milk-soaked sponge with pistachio and cream.",
      price: 6.99,
      image: imgTresLechesPistachio,
      category: "Desserts",
      subCategory: "Tres Leches",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
    {
      id: 91,
      name: "Coconut Tres Leches",
      description:
        "Coconut tres leches with toasted coconut.",
      price: 6.99,
      image: imgTresLechesCoconut,
      category: "Desserts",
      subCategory: "Tres Leches",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten", "tree-nuts"],
      dietary: ["vegetarian"],
    },
    {
      id: 92,
      name: "Pineapple Tres Leches",
      description:
        "Pineapple-infused tres leches for a tropical twist.",
      price: 6.79,
      image: imgTresLechesPineapple,
      category: "Desserts",
      subCategory: "Tres Leches",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
    {
      id: 93,
      name: "Mango Tres Leches",
      description:
        "Mango tres leches layered with fresh mango.",
      price: 6.89,
      image: imgTresLechesMango,
      category: "Desserts",
      subCategory: "Tres Leches",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk", "eggs", "gluten"],
      dietary: ["vegetarian", "nut-free"],
    },
  ],
};
