import { useMemo, useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { allergenIconMap } from "@/lib/menu-constants";
import type { Allergen } from "@/lib/menu-types";
import { useLocation, useNavigate } from "react-router-dom";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";

/* CENTRAL DATA */
import {
  mergeFlavours,
  filterFlavours,
  sortFlavours,
  computeFlavorCounts,
  type FlavorEntry,
  type FlavorSort,
  type HeatFilter,
  type TypeFilter,
} from "@/lib/flavours-filter-engine";

type FlavorSource = "sauce" | "spice";

/* REUSABLE COMPONENTS */
const HeatIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1 mt-2 mb-1">
    {Array.from({ length: 7 }).map((_, i) => {
      let color = 'text-gray-300';
      if (i === 0) color = i < level ? 'text-green-400' : 'text-gray-300';
      else if (i === 1) color = i < level ? 'text-yellow-300' : 'text-gray-300';
      else if (i >= 2 && i <= 5) color = i < level ? 'text-orange-400' : 'text-gray-300';
      else if (i === 6) color = i < level ? 'text-red-500' : 'text-gray-300';
      return (
        <Flame
          key={i}
          size={15}
          strokeWidth={1.5}
          className={color + (i < level ? '' : ' opacity-40')}
          fill={i < level ? 'currentColor' : 'none'}
        />
      );
    })}
  </div>
);

const AllergenBadges = ({ allergens }: { allergens?: Allergen[] }) => {
  if (!Array.isArray(allergens) || allergens.length === 0) return null;
  return (
    <div className="flex items-center gap-2 mt-2">
      {allergens.map((a) => {
        const Icon = allergenIconMap[a]?.icon;
        const label = allergenIconMap[a]?.label;
        if (!Icon) return null;
        return (
          <span key={a} className="flex items-center gap-1 text-xs">
            <Icon size={13} className="text-red-500" />
            <span className="font-medium text-foreground">{label}</span>
          </span>
        );
      })}
    </div>
  );
};

const heatFilters: { label: string; value: HeatFilter }[] = [
  { label: "All", value: "all" },
  { label: "Mild (1–3)", value: "mild" },
  { label: "Medium (4–6)", value: "medium" },
  { label: "Hot (7+)", value: "hot" },
];

const typeFilters: { label: string; value: TypeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Sauces", value: "sauce" },
  { label: "Spices", value: "spice" },
];

const sortOptions: { label: string; value: FlavorSort }[] = [
  { label: "Featured", value: "featured" },
  { label: "Heat: Low to High", value: "heat-asc" },
  { label: "Heat: High to Low", value: "heat-desc" },
  { label: "Name: A → Z", value: "name-asc" },
];

const SignatureFlavors = () => {
  const { sauces, seasonings } = usePublicCatalog();
  const location = useLocation();
  const navigate = useNavigate();

  const initialParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [heatFilter, setHeatFilter] = useState<HeatFilter>(() => {
    const value = initialParams.get("heat");
    return value === "mild" || value === "medium" || value === "hot" ? value : "all";
  });
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(() => {
    const value = initialParams.get("type");
    return value === "sauce" || value === "spice" ? value : "all";
  });
  const [sortBy, setSortBy] = useState<FlavorSort>(() => {
    const value = initialParams.get("sort");
    return value === "heat-asc" || value === "heat-desc" || value === "name-asc" ? value : "featured";
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorEntry | null>(null);

  const allFlavours = useMemo(
    () => mergeFlavours({ sauces, spices: seasonings }),
    [sauces, seasonings]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (heatFilter !== "all") params.set("heat", heatFilter);
    else params.delete("heat");

    if (typeFilter !== "all") params.set("type", typeFilter);
    else params.delete("type");

    if (sortBy !== "featured") params.set("sort", sortBy);
    else params.delete("sort");

    const nextSearch = params.toString();
    const currentSearch = location.search.replace(/^\?/, "");

    if (nextSearch !== currentSearch) {
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : "",
        },
        { replace: true }
      );
    }
  }, [heatFilter, typeFilter, sortBy, location.pathname, location.search, navigate]);

  const filteredFlavours = useMemo(
    () => filterFlavours({ items: allFlavours, heatFilter, typeFilter }),
    [allFlavours, heatFilter, typeFilter]
  );

  const sortedFlavours = useMemo(
    () => sortFlavours({ items: filteredFlavours, sortBy }),
    [filteredFlavours, sortBy]
  );

  const { heatCounts, typeCounts } = useMemo(
    () => computeFlavorCounts({ items: allFlavours, typeFilter, sortBy }),
    [allFlavours, typeFilter, sortBy]
  );

  return (
    <div className="w-full">
      {/* FILTER & SORT PANEL TOGGLE */}
      <div className="relative mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setPanelOpen((v) => !v)}
          className="px-5 py-2 rounded-full border border-primary/40 bg-background/80 backdrop-blur text-sm font-semibold tracking-wide hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          Filters
        </button>

        {/* Single-row Heat Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {heatFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setHeatFilter(f.value)}
              className={cn(
                "px-4 py-2 rounded-full border text-sm transition-all",
                heatFilter === f.value
                  ? "bg-primary text-black border-primary"
                  : "text-muted-foreground border-muted hover:border-primary hover:text-primary"
              )}
            >
              {f.label} ({heatCounts[f.value as HeatFilter] ?? 0})
            </button>
          ))}
        </div>

        {panelOpen && (
          <div className="absolute top-12 z-20 w-full max-w-3xl rounded-2xl border border-primary/20 bg-background/95 backdrop-blur shadow-2xl p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Heat
                </div>
                <div className="flex flex-wrap gap-2">
                  {heatFilters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setHeatFilter(f.value)}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm transition-all",
                        heatFilter === f.value
                          ? "bg-primary text-black border-primary"
                          : "text-muted-foreground border-muted hover:border-primary hover:text-primary"
                      )}
                    >
                        {f.label} ({heatCounts[f.value as HeatFilter] ?? 0})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Type
                </div>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setTypeFilter(f.value)}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm transition-all",
                        typeFilter === f.value
                          ? "bg-primary text-black border-primary"
                          : "text-muted-foreground border-muted hover:border-primary hover:text-primary"
                      )}
                    >
                      {f.label} ({typeCounts[f.value] ?? 0})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Sort
              </div>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={cn(
                      "px-4 py-2 rounded-full border text-sm transition-all",
                      sortBy === opt.value
                        ? "bg-primary text-black border-primary"
                        : "text-muted-foreground border-muted hover:border-primary hover:text-primary"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3 text-sm">
              <button
                className="px-4 py-2 rounded-full border border-muted text-muted-foreground hover:border-primary hover:text-primary transition"
                onClick={() => {
                  setHeatFilter("all");
                  setTypeFilter("all");
                  setSortBy("featured");
                  setPanelOpen(false);
                }}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 rounded-full bg-primary text-black font-semibold border border-primary hover:opacity-90 transition"
                onClick={() => setPanelOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FLAVOURS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {sortedFlavours.map((flavor, index) => (
          <div
            key={flavor.name}
            onClick={() => setSelectedFlavor(flavor)}
            className="card-luxury p-4 md:p-6 group cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {flavor.image && (
              <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-md">
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}

            <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors">
              {flavor.name}
            </h3>

            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              {flavor.source === "sauce" ? "Sauce" : "Spice"}
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              {flavor.description}
            </p>

            <HeatIndicator level={flavor.level} />
            <AllergenBadges allergens={flavor.allergens} />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedFlavor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedFlavor(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-xl bg-background 
            ring-1 ring-primary/40 
            shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7),0_0_32px_rgba(218,170,67,0.22)]
            grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT IMAGE */}
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-black">
              {selectedFlavor.image && (
                <img
                  src={selectedFlavor.image}
                  alt={selectedFlavor.name}
                  className="w-full h-full object-contain md:object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-primary mb-2">
                  Signature Flavours • Lazzat
                </div>

                <h2 id="modal-title" className="font-serif text-3xl mb-3">
                  {selectedFlavor.name}
                </h2>

                <p id="modal-desc" className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedFlavor.description}
                </p>

                <HeatIndicator level={selectedFlavor.level} />
                <AllergenBadges allergens={selectedFlavor.allergens} />
              </div>

              <button className="mt-6 w-full rounded-md bg-primary py-3 font-semibold text-black hover:opacity-90 transition">
                Order Now
              </button>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setSelectedFlavor(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {filteredFlavours.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">
          No flavours match this filter.
        </p>
      )}
    </div>
  );
};

export default SignatureFlavors;
