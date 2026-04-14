// src/lib/menu-data.ts
import { MenuItem } from "./menu-types.js";



/* Grouped Menu data */
export const menuItemsGrouped: Record<string, Record<string, MenuItem[]>> = {
  "Grills & Skewers": grillsAndSkewers,
  "Wraps": wrapsItems,
  "Biryani": biryaniItems,
  "Sajji": sajjiItems,
  "Döner": donerItems,
  "Desserts": desserts,
  "Shakes & Juices": shakesAndJuices,
  "Sides": sidesItems,
};

/* Flat Export for Filter sort */
export const menuItemsFlat: MenuItem[] = Object.values(menuItemsGrouped)
  .flatMap((category) =>
    Object.values(category).flat()
  );

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
