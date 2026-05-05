import {
  quickFilters,
  dietaryFilters,
  allergenFilters,
  miscFilters,
  SPICY_THRESHOLD,
  slugify,
  type FilterId,
} from "@/lib/menu-constants";
import type { MenuItem, Allergen, DietaryFlag } from "@/lib/menu-types";

const itemHasAllergen = (item: MenuItem, allergen: Allergen) => {
  if (!item.allergens || item.allergens.length === 0) return false;
  return item.allergens.includes(allergen);
};

export const deriveDietary = (item: MenuItem): DietaryFlag[] => {
  const flags = new Set(item.dietary || []);

  if (flags.has("vegan")) {
    if (
      itemHasAllergen(item, "milk") ||
      itemHasAllergen(item, "eggs") ||
      itemHasAllergen(item, "fish")
    ) {
      flags.delete("vegan");
    }
  }

  if (flags.has("vegetarian")) {
    if (itemHasAllergen(item, "fish")) {
      flags.delete("vegetarian");
    }
  }

  if (flags.has("gluten-free") && itemHasAllergen(item, "gluten")) {
    flags.delete("gluten-free");
  }

  if (flags.has("dairy-free") && itemHasAllergen(item, "milk")) {
    flags.delete("dairy-free");
  }

  if (
    flags.has("nut-free") &&
    (itemHasAllergen(item, "tree-nuts") || itemHasAllergen(item, "peanuts"))
  ) {
    flags.delete("nut-free");
  }

  return Array.from(flags);
};

export const itemMatchesDiet = (item: MenuItem, dietId: string) => {
  return deriveDietary(item).includes(dietId as DietaryFlag);
};

export const matchesFoodType = (item: MenuItem, type: string) => {
  const t = slugify(type);
  const alt = t === "doner" ? "d-ner" : null;
  return (
    slugify(item.subCategory) === t ||
    (alt && slugify(item.subCategory) === alt) ||
    slugify(item.category) === t ||
    (alt && slugify(item.category) === alt) ||
    slugify(item.name).includes(t) ||
    (alt && slugify(item.name).includes(alt))
  );
};

type SearchTokens = {
  subCategory: string;
  category: string;
  name: string;
};

const createSearchTokens = (item: MenuItem): SearchTokens => ({
  subCategory: slugify(item.subCategory ?? ""),
  category: slugify(item.category ?? ""),
  name: slugify(item.name ?? ""),
});

const matchesFoodTypeWithTokens = (tokens: SearchTokens, type: string) => {
  const t = slugify(type);
  const alt = t === "doner" ? "d-ner" : null;
  return (
    tokens.subCategory === t ||
    (alt && tokens.subCategory === alt) ||
    tokens.category === t ||
    (alt && tokens.category === alt) ||
    tokens.name.includes(t) ||
    (alt && tokens.name.includes(alt))
  );
};

export const hasSelectedDietaryFilter = (selectedFilters: Set<FilterId>) => {
  return Array.from(selectedFilters).some((id) =>
    dietaryFilters.some((filter) => filter.id === id)
  );
};

export const filterMenuItems = ({
  items,
  activeCategory,
  selectedFilters,
}: {
  items: MenuItem[];
  activeCategory: string;
  selectedFilters: Set<FilterId>;
}) => {
  let filtered = [...items];

  if (activeCategory !== "All") {
    filtered = filtered.filter((item) => item.category === activeCategory);
  }

  const selected = Array.from(selectedFilters);

  const excludedAllergens = selected.filter(
    (f): f is Allergen => allergenFilters.some((a) => a.id === f)
  );

  if (excludedAllergens.length > 0) {
    filtered = filtered.filter(
      (item) => !excludedAllergens.some((a) => itemHasAllergen(item, a))
    );
  }

  const positiveFilters = selected.filter(
    (f) => !excludedAllergens.includes(f as Allergen)
  );

  if (positiveFilters.length > 0) {
    const selectedQuick = positiveFilters.filter((f) =>
      quickFilters.some((q) => q.id === f)
    );
    const selectedDietary = positiveFilters.filter((f) =>
      dietaryFilters.some((d) => d.id === f)
    );
    const selectedMisc = positiveFilters.filter((f) =>
      miscFilters.some((m) => m.id === f)
    );

    const indexedItems = filtered.map((item) => ({
      item,
      tokens: createSearchTokens(item),
    }));

    filtered = indexedItems.filter(({ item, tokens }) => {
      const quickMatch =
        selectedQuick.length === 0 ||
        selectedQuick.some((f) => matchesFoodTypeWithTokens(tokens, f));

      const dietMatch =
        selectedDietary.length === 0 ||
        selectedDietary.every((f) => itemMatchesDiet(item, f));

      const miscMatch =
        selectedMisc.length === 0 ||
        selectedMisc.every((f) =>
          f === "spicy" ? (item.heatLevel ?? 0) >= SPICY_THRESHOLD : false
        );

      return quickMatch && dietMatch && miscMatch;
    }).map(({ item }) => item);
  }

  return filtered;
};
