import { Layout } from "@/components/layout/Layout";
import { allergenFilters, allergenIconMap, dietaryFilters } from "@/lib/menu-constants";
import { Leaf, Carrot, Wheat, Milk, Nut, Sprout, Salad } from "lucide-react";
import { forwardRef } from "react";

// Custom rotated leaf icon for Sesame, using forwardRef to match Lucide signature
const SesameIcon = forwardRef<SVGSVGElement, React.ComponentProps<typeof Leaf>>((props, ref) => (
  <Leaf ref={ref} {...props} className={(props.className || "") + " rotate-45"} />
));

export default function AllergenGuide() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 mt-24 md:mt-28">
        <h1 className="font-serif text-3xl mb-6">Allergen & Dietary Guide</h1>
        <p className="mb-6 text-muted-foreground text-lg">
          This guide provides detailed information about allergens and dietary suitability for all menu items. Please consult this page if you have any allergies or dietary restrictions.
        </p>

        <div className="max-w-2xl mx-auto mt-10">
          <h2 className="font-semibold text-xl mb-4">Allergen & Dietary Icons</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {allergenFilters.map((filter) => {
              let Icon = allergenIconMap[filter.id]?.icon;
              // Custom icons for Soy and Sesame
              if (filter.id === "soy") Icon = Salad;
              if (filter.id === "sesame") Icon = SesameIcon;
              return (
                <div key={filter.id} className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/40 border border-primary/10">
                  {Icon && <Icon size={32} className="mb-2 text-primary" />}
                  <span className="font-bold text-base mb-1 uppercase">{filter.label}</span>
                  <span className="text-xs text-muted-foreground mb-1">{filter.label[0]}</span>
                  <span className="text-xs text-muted-foreground">Allergen</span>
                </div>
              );
            })}
            {/* Dietary Filters with Icons */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/40 border border-primary/10">
              <Sprout size={32} className="mb-2 text-primary" />
              <span className="font-bold text-base mb-1 uppercase">Vegan</span>
              <span className="text-xs text-muted-foreground mb-1">VG</span>
              <span className="text-xs text-muted-foreground">Dietary</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/40 border border-primary/10">
              <Carrot size={32} className="mb-2 text-primary" />
              <span className="font-bold text-base mb-1 uppercase">Vegetarian</span>
              <span className="text-xs text-muted-foreground mb-1">V</span>
              <span className="text-xs text-muted-foreground">Dietary</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/40 border border-primary/10">
              <Wheat size={32} className="mb-2 text-primary" />
              <span className="font-bold text-base mb-1 uppercase">Gluten-free</span>
              <span className="text-xs text-muted-foreground mb-1">GF</span>
              <span className="text-xs text-muted-foreground">Dietary</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/40 border border-primary/10">
              <Milk size={32} className="mb-2 text-primary" />
              <span className="font-bold text-base mb-1 uppercase">Dairy-free</span>
              <span className="text-xs text-muted-foreground mb-1">DF</span>
              <span className="text-xs text-muted-foreground">Dietary</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/40 border border-primary/10">
              <Nut size={32} className="mb-2 text-primary" />
              <span className="font-bold text-base mb-1 uppercase">Nut-free</span>
              <span className="text-xs text-muted-foreground mb-1">NF</span>
              <span className="text-xs text-muted-foreground">Dietary</span>
            </div>
          </div>
        </div>

        {/* Legend removed as requested */}
      </div>
    </Layout>
  );
}