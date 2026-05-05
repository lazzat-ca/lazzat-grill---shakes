import { describe, it, expect } from "vitest";
import { deriveDietary, filterMenuItems, hasSelectedDietaryFilter } from "@/lib/menu-filter-engine";
import { menuItemsFlat } from "@/lib/menu-data";
import type { FilterId } from "@/lib/menu-constants";
import type { MenuItem } from "@/lib/menu-types";

const withFilters = (filters: FilterId[], activeCategory = "All") =>
  filterMenuItems({
    items: menuItemsFlat,
    activeCategory,
    selectedFilters: new Set(filters),
  });

describe("menu-filter-engine", () => {
  it("removes conflicting vegan/dairy-free tags when allergens contain milk", () => {
    const synthetic: MenuItem = {
      id: 999001,
      name: "Conflict Bowl",
      description: "Test",
      image: "x",
      category: "Sides",
      heatLevel: 0,
      saucePairings: [],
      customizations: [],
      allergens: ["milk"],
      dietary: ["vegan", "dairy-free", "vegetarian"],
    };

    const derived = deriveDietary(synthetic);
    expect(derived).toContain("vegetarian");
    expect(derived).not.toContain("vegan");
    expect(derived).not.toContain("dairy-free");
  });

  it("quick filters behave as OR within group", () => {
    const result = withFilters(["chicken", "lamb"]);
    expect(result.length).toBeGreaterThan(0);

    const hasChickenOrLambSignals = result.every((item) => {
      const text = `${item.name} ${item.subCategory ?? ""} ${item.category}`.toLowerCase();
      return text.includes("chicken") || text.includes("lamb");
    });

    expect(hasChickenOrLambSignals).toBe(true);
  });

  it("dietary filters behave as AND within group", () => {
    const result = withFilters(["vegetarian", "gluten-free"]);
    expect(result.length).toBeGreaterThan(0);

    for (const item of result) {
      const derived = deriveDietary(item);
      expect(derived).toContain("vegetarian");
      expect(derived).toContain("gluten-free");
    }
  });

  it("allergen filters exclude matching allergens as hard rule", () => {
    const result = withFilters(["milk"]);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((item) => !(item.allergens || []).includes("milk"))).toBe(true);
  });

  it("combines quick + dietary filters with AND across groups", () => {
    const result = withFilters(["wraps", "vegetarian"]);
    expect(result.length).toBeGreaterThan(0);

    for (const item of result) {
      const text = `${item.name} ${item.subCategory ?? ""} ${item.category}`.toLowerCase();
      expect(text.includes("wrap") || text.includes("wraps")).toBe(true);
      expect(deriveDietary(item)).toContain("vegetarian");
    }
  });

  it("vegan filter includes expected green sides (coleslaw + corn)", () => {
    const result = withFilters(["vegan"], "Sides");
    const names = result.map((i) => i.name);

    expect(names).toContain("Coleslaw");
    expect(names).toContain("Corn on the Cob");
  });

  it("hasSelectedDietaryFilter returns true when dietary filters are present", () => {
    expect(hasSelectedDietaryFilter(new Set<FilterId>(["vegan"]))).toBe(true);
    expect(hasSelectedDietaryFilter(new Set<FilterId>(["milk", "chicken"]))).toBe(false);
  });
});
