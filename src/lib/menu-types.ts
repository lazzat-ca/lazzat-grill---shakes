/** Common food allergens (halal omitted) */
export type Allergen =
  | "milk"
  | "eggs"
  | "gluten"
  | "tree-nuts"
  | "peanuts"
  | "soy"
  | "sesame"
  // | "shellfish"
  | "fish"
  | "mustard";

/** Dietary preferences / exclusions */
export type DietaryFlag =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "dairy-free"
  | "nut-free";

/** Flavor profile (used for filters & icons) */
export type FlavorProfile =
  | "sweet"
  | "spicy"
  | "tangy"
  | "savory"
  | "salty"
  | "smoky"
  | "fruity";

/** Texture / mouth-feel */
export type TextureProfile =
  | "creamy"
  | "crispy"
  | "juicy"
  | "soft"
  | "chewy"
  | "light";

/* Main menu Item */

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price?: number;
  /** For Shakes & Juices: Standard Price */
  pricestandard?: number;
  /** For Shakes & Juices: Combo Price */
  pricecombo?: number;
  image: string;

  /** High-level grouping */
  category: string;
  subCategory?: string;

  /** Spice / heat (0 for desserts, shakes, juices) */
  heatLevel: number;

  /** Badges */
  isNew?: boolean;
  isPopular?: boolean;

  /** Pairings & options */
  saucePairings?: string[];
  /** Side recommendations to suggest with this item */
  sidePairings?: string[];
  /** Add-ons for the item (replaces customizations for some items) */
  addOns?: string[];
  /** Legacy customizations (optional for backward compatibility) */
  customizations?: string[];

  /* Enriched Meta Data */

  /** Allergens contained in this item */
  allergens?: Allergen[];

  /** Dietary suitability flags */
  dietary?: DietaryFlag[];

  /** Flavor characteristics */
  flavors?: FlavorProfile[];

  /** Texture characteristics */
  textures?: TextureProfile[];
  /** Sides classification: 'carb' or 'green' */
  sideType?: "carb" | "green";
}

/* Sauce Items */

export interface SauceItem {
  name: string;
  level: number;
  description: string;
  image?: string;

  /** Allergens contained in this sauce */
  allergens?: Allergen[];
}
