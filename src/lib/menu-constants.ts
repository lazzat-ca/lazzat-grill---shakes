import { Milk, Egg, Wheat, Nut, Fish, Shell, Leaf, Wine, Bean } from "lucide-react";
import type { Allergen } from "@/lib/menu-types";

export const quickFilters = [
  { id: "chicken", label: "Chicken" },
  { id: "lamb", label: "Lamb" },
  { id: "salmon", label: "Salmon" },
  { id: "seekh", label: "Seekh" },
  { id: "doner", label: "Döner" },
  { id: "wraps", label: "Wraps" },
  { id: "biryani", label: "Biryani" },
  { id: "sajji", label: "Sajji" },
  { id: "desserts", label: "Desserts" },
] as const;
export const dietaryFilters = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "nut-free", label: "Nut-free" },
] as const;
export const allergenFilters: { id: Allergen; label: string }[] = [
  { id: "milk", label: "Dairy" },
  { id: "eggs", label: "Eggs" },
  { id: "gluten", label: "Gluten" },
  { id: "tree-nuts", label: "Tree Nuts" },
  { id: "peanuts", label: "Peanuts" },
  { id: "soy", label: "Soy" },
  { id: "sesame", label: "Sesame" },
  // { id: "shellfish", label: "Shellfish" },
  { id: "fish", label: "Fish" },
  { id: "mustard", label: "Mustard" },
];
export const miscFilters = [
  { id: "spicy", label: "Spicy" },
] as const;

export type QuickFilterId = (typeof quickFilters)[number]["id"];
export type DietaryFilterId = (typeof dietaryFilters)[number]["id"];
export type MiscFilterId = (typeof miscFilters)[number]["id"];
export type FilterId = QuickFilterId | DietaryFilterId | MiscFilterId | Allergen;

export const allFilterIds: FilterId[] = [
  ...quickFilters.map((f) => f.id),
  ...dietaryFilters.map((f) => f.id),
  ...allergenFilters.map((f) => f.id),
  ...miscFilters.map((f) => f.id),
];
export const SPICY_THRESHOLD = 4;
export const allergenIconMap = {
  milk: { icon: Milk, label: "Dairy" },
  eggs: { icon: Egg, label: "Eggs" },
  gluten: { icon: Wheat, label: "Gluten" },
  "tree-nuts": { icon: Nut, label: "Tree Nuts" },
  peanuts: { icon: Bean, label: "Peanuts" },
  soy: { icon: Leaf, label: "Soy" },
  sesame: { icon: Leaf, label: "Sesame" },
  // shellfish: { icon: Shell, label: "Shellfish" },
  fish: { icon: Fish, label: "Fish" },
  mustard: { icon: Wine, label: "Mustard" },
};
export const sidesTabs = [
  { id: "carb", label: "Carbs" },
  { id: "green", label: "Greens" },
];

export function slugify(str: string = ""): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
