// src/lib/menu-data.ts
import { MenuItem } from "./menu-types";

import { proteinCubeSkewerPlatters } from "./protein-cube-skewer-platter-data.ts";
import { familyPlatters } from "./family-platters-data";
import { biryaniItems } from "./biryani-data";
import { sajjiItems } from "./sajji-data";
import { desserts } from "./desserts-data";
import { shakesAndJuices } from "./shakes-juices-data";
import { sidesItems } from "./sides-data";
import { donerItems } from "./doner-data";
import { wrapsItems } from "./wraps-data";
import { kidsMenu } from "./kids-menu-data";
import { combosMenu } from "./combos-menu-data";

/* Grouped Menu data */
export const menuItemsGrouped: Record<string, MenuItem[]> = {
  "Protein Cube Skewer Platter": proteinCubeSkewerPlatters,
  "Family Platters": familyPlatters,
  "Combos": combosMenu,
  "Kids Menu": kidsMenu,
  "Desserts": Object.values(desserts).flat(),
  "Shakes & Juices": Object.values(shakesAndJuices).flat(),
  "Salads": Object.values(sidesItems).flat(),
};

/* Flat Export for Filter sort */
export const menuItemsFlat: MenuItem[] = Object.values(menuItemsGrouped).flat();

type MenuCacheEntry = {
  data: MenuItem[];
  expiresAt: number;
};

const MENU_CACHE_TTL_MS = 5 * 60 * 1000;
let menuCache: MenuCacheEntry | null = null;

const cloneMenuItems = (items: MenuItem[]): MenuItem[] => {
  return items.map((item) => ({
    ...item,
    saucePairings: [...item.saucePairings],
    customizations: [...item.customizations],
    sidePairings: item.sidePairings ? [...item.sidePairings] : undefined,
    allergens: item.allergens ? [...item.allergens] : undefined,
    dietary: item.dietary ? [...item.dietary] : undefined,
    flavors: item.flavors ? [...item.flavors] : undefined,
    textures: item.textures ? [...item.textures] : undefined,
  }));
};

export const getCachedMenuItems = (): MenuItem[] => {
  const now = Date.now();
  if (menuCache && menuCache.expiresAt > now) {
    return cloneMenuItems(menuCache.data);
  }

  const data = cloneMenuItems(menuItemsFlat);
  menuCache = {
    data,
    expiresAt: now + MENU_CACHE_TTL_MS,
  };

  return cloneMenuItems(data);
};

export const clearMenuItemsCache = () => {
  menuCache = null;
};
