// src/components/menu/BuildYourShake.tsx
import { useState, useMemo } from "react";
import { X, Check, ChevronRight, Sparkles, Milk, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Asset imports (Vite glob) ─────────────────────────────────────────────────
const imageModules = import.meta.glob("@/assets/*.{jpeg,jpg,png,webp}", { eager: true, query: '?url', import: 'default' });
const img = (name: string): string => {
  const key = Object.keys(imageModules).find(k => k.includes(`/${name}`));
  return key ? (imageModules[key] as string) : "";
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Base = { id: string; label: string; description: string; basePrice: number; dietary: string[] };
type Fruit = { id: string; name: string; img: string; vitamins: string; calories: number; goesWith: string[]; notes?: string };
type Flavor = { id: string; name: string; img: string; amount: string; calories: number; allergens: string[]; dietary: string[]; addPrice: number };

// ─── Data ─────────────────────────────────────────────────────────────────────
const BASES: Base[] = [
  { id: "milk",  label: "Milk + Cream",   description: "Rich, creamy & indulgent",    basePrice: 5.99, dietary: ["Vegetarian", "Gluten-Free"] },
  { id: "water", label: "Fruit Blend",    description: "Light, dairy-free & vegan",   basePrice: 7.49, dietary: ["Vegan", "Dairy-Free", "Gluten-Free", "Nut-Free"] },
];

const FRUITS: Fruit[] = [
  { id: "mango",        name: "Mango",         img: img("mango.jpeg"),        vitamins: "Vitamin A, C",             calories: 100, goesWith: ["Pineapple", "Coconut", "Peach"] },
  { id: "strawberry",   name: "Strawberry",    img: img("strawberry.jpeg"),   vitamins: "Vitamin C",                calories: 50,  goesWith: ["Banana", "Mango", "Chocolate"] },
  { id: "banana",       name: "Banana",        img: img("banana.jpeg"),       vitamins: "Potassium, B6",            calories: 70,  goesWith: ["PB", "Chocolate", "Dates"], notes: "Adds creaminess" },
  { id: "pineapple",    name: "Pineapple",     img: img("pineapple.jpeg"),    vitamins: "Vitamin C, Manganese",     calories: 80,  goesWith: ["Mango", "Coconut"] },
  { id: "coconut",      name: "Coconut",       img: img("coconut.jpeg"),      vitamins: "Iron, Fiber",              calories: 80,  goesWith: ["Mango", "Pineapple"] },
  { id: "mixed-berry",  name: "Mixed Berries", img: img("mixed-berries.jpeg"),vitamins: "Vitamin C, Antioxidants",  calories: 60,  goesWith: ["Banana", "Strawberry"] },
  { id: "dragon-fruit", name: "Dragon Fruit",  img: img("dragon-fruit.jpeg"), vitamins: "Vitamin C, Iron",          calories: 70,  goesWith: ["Mango", "Pineapple"] },
  { id: "dark-cherry",  name: "Dark Cherry",   img: img("dark-cherry.jpeg"),  vitamins: "Vitamin A, C, Melatonin",  calories: 70,  goesWith: ["Chocolate", "Banana"] },
  { id: "watermelon",   name: "Watermelon",    img: img("watermelon.jpeg"),   vitamins: "Vitamin A, C, Lycopene",   calories: 45,  goesWith: ["Mint", "Lime"] },
  { id: "peach",        name: "Peach",         img: img("peach.jpeg"),        vitamins: "Vitamin A, B3",            calories: 60,  goesWith: ["Mango", "Pineapple"] },
  { id: "lychee",       name: "Lychee",        img: img("lychee.jpeg"),       vitamins: "Vitamin C, B6, Copper",    calories: 65,  goesWith: ["Coconut", "Mango", "Pineapple"] },
  { id: "ginger",       name: "Ginger",        img: img("ginger.jpeg"),       vitamins: "Vitamin B6, Gingerol",     calories: 5,   goesWith: ["Mango", "Lemon"], notes: "Wellness boost" },
  { id: "carrot",       name: "Carrot",        img: img("carrot.jpeg"),       vitamins: "Vitamin A (beta-carotene)",calories: 40,  goesWith: ["Ginger", "Mango"] },
  { id: "spinach",      name: "Spinach",       img: img("spinach.jpeg"),      vitamins: "Iron, Vitamin K, Folate",  calories: 25,  goesWith: ["Mango", "Pineapple", "Banana"], notes: "Shake only" },
  { id: "kale",         name: "Kale",          img: img("kale.jpeg"),         vitamins: "Vitamin K, C, Calcium",    calories: 25,  goesWith: ["Ginger", "Carrot", "Banana"], notes: "Shake only" },
];

const FLAVORS: Flavor[] = [
  { id: "chocolate",    name: "Chocolate",     img: img("chocolate.jpeg"),      amount: "40ml", calories: 120, allergens: ["Soy"],       dietary: ["Veg", "GF"],   addPrice: 0.99 },
  { id: "biscoff",      name: "Biscoff",       img: img("biscoff.jpeg"),        amount: "30g",  calories: 150, allergens: ["Wheat"],     dietary: ["Veg"],          addPrice: 1.49 },
  { id: "hazelnut",     name: "Hazelnut",      img: img("nutella.jpeg"),        amount: "35g",  calories: 180, allergens: ["Tree-Nuts"], dietary: ["Veg", "GF"],   addPrice: 1.29 },
  { id: "pistachio",    name: "Pistachio",     img: img("pistachios.jpeg"),     amount: "35g",  calories: 175, allergens: ["Tree-Nuts"], dietary: ["Veg", "GF"],   addPrice: 1.49 },
  { id: "dates",        name: "Dates",         img: img("dates.jpeg"),          amount: "30g",  calories: 130, allergens: [],            dietary: ["Veg", "GF"],   addPrice: 0.79 },
  { id: "almond",       name: "Almond",        img: img("almonds.jpeg"),        amount: "20g",  calories: 140, allergens: ["Tree-Nuts"], dietary: ["Veg", "GF"],   addPrice: 0.99 },
  { id: "peanut-butter",name: "Peanut Butter", img: img("peanut-butter.jpeg"),  amount: "30g",  calories: 190, allergens: ["Peanuts"],   dietary: ["Veg", "GF"],   addPrice: 0.99 },
  { id: "honey",        name: "Honey",         img: img("honey.jpeg"),          amount: "15g",  calories: 60,  allergens: [],            dietary: ["Veg", "GF"],   addPrice: 0.79 },
  { id: "rose",         name: "Rose",          img: img("rose.jpeg"),           amount: "25ml", calories: 40,  allergens: [],            dietary: ["Vegan", "GF"], addPrice: 0.79 },
  { id: "espresso",     name: "Espresso",      img: img("espresso.jpeg"),       amount: "60ml", calories: 10,  allergens: [],            dietary: ["Vegan", "GF"], addPrice: 0.99 },
  { id: "blue-spirulina",name:"Blue Spirulina",img: img("blue-spirulina.jpeg"), amount: "1.5g", calories: 5,   allergens: [],            dietary: ["Vegan", "GF"], addPrice: 1.29 },
];

const MAX_FRUITS = 3;

const cardBase = "relative rounded-xl border transition-all duration-200 cursor-pointer select-none text-left";
const cardActive = "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary))]";
const cardInactive = "border-primary/15 bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70";

function StepHeader({ step, total, label, sublabel }: { step: number; total: number; label: string; sublabel: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold shrink-0">
          {step}
        </span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Step {step} of {total}</span>
      </div>
      <h3 className="font-serif text-2xl text-foreground">{label}</h3>
      <p className="text-sm text-muted-foreground mt-0.5">{sublabel}</p>
    </div>
  );
}

function DietaryBadge({ label }: { label: string }) {
  return <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">{label}</span>;
}

function AllergenBadge({ label }: { label: string }) {
  return <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wide">{label}</span>;
}

function ItemImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover rounded-lg shrink-0", className)}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function BuildYourShake() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  const base = BASES.find(b => b.id === selectedBase);
  const fruits = selectedFruits.map(id => FRUITS.find(f => f.id === id)!).filter(Boolean);
  const flavor = FLAVORS.find(f => f.id === selectedFlavor);

  const totalPrice = useMemo(() => (base?.basePrice ?? 0) + (flavor?.addPrice ?? 0), [base, flavor]);
  const totalCalories = useMemo(() => fruits.reduce((s, f) => s + f.calories, 0) + (flavor?.calories ?? 0), [fruits, flavor]);

  const allergens = useMemo(() => {
    const set = new Set<string>();
    if (base?.id === "milk") { set.add("Milk"); set.add("Cream"); }
    flavor?.allergens.forEach(a => set.add(a));
    return Array.from(set);
  }, [base, flavor]);

  const suggestions = useMemo(() => {
    if (fruits.length === 0) return [];
    const counts: Record<string, number> = {};
    fruits.forEach(f => f.goesWith.forEach(g => { counts[g] = (counts[g] ?? 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([name]) => name);
  }, [fruits]);

  const toggleFruit = (id: string) => {
    setSelectedFruits(prev =>
      prev.includes(id) ? prev.filter(f => f !== id)
        : prev.length < MAX_FRUITS ? [...prev, id] : prev
    );
  };

  const reset = () => { setStep(1); setSelectedBase(null); setSelectedFruits([]); setSelectedFlavor(null); };
  const handleClose = () => { setOpen(false); reset(); };

  return (
    <>
      {/* ── Trigger Banner ── */}
      <button
        onClick={() => setOpen(true)}
        className="w-full group relative overflow-hidden rounded-2xl border border-primary/30 bg-secondary/40 hover:bg-secondary/70 hover:border-primary/60 transition-all duration-300 p-6 md:p-8 text-left"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={22} className="text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary mb-1">Interactive</p>
              <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                Build Your Own Shake
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Pick your base · Choose up to 3 fruits · Add an indulgent flavor
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:block text-xs text-muted-foreground">Starting at</span>
            <span className="text-primary font-semibold text-sm">$5.99</span>
            <ChevronRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </button>

      {/* ── Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 md:p-6"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] bg-background border border-primary/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-primary/15 shrink-0">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-primary" />
                <h2 className="font-serif text-xl text-foreground">Build Your Own Shake</h2>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1 px-6 pt-4 shrink-0">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={cn("h-1 flex-1 rounded-full transition-all duration-300", s <= step ? "bg-primary" : "bg-primary/15")} />
              ))}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">

              {/* Step 1 — Base */}
              {step === 1 && (
                <div>
                  <StepHeader step={1} total={4} label="Choose Your Base" sublabel="This determines whether your shake is creamy or light & vegan." />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BASES.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBase(b.id)}
                        className={cn(cardBase, "p-5 w-full", selectedBase === b.id ? cardActive : cardInactive)}
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            {b.id === "milk" ? <Milk size={22} className="text-primary shrink-0" /> : <Droplets size={22} className="text-primary shrink-0" />}
                            <div>
                              <p className="font-semibold text-foreground">{b.label}</p>
                              <p className="text-xs text-muted-foreground">{b.description}</p>
                            </div>
                          </div>
                          <span className="text-primary font-bold text-lg shrink-0">${b.basePrice.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {b.dietary.map(d => <DietaryBadge key={d} label={d} />)}
                        </div>
                        {selectedBase === b.id && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check size={12} className="text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Fruits */}
              {step === 2 && (
                <div>
                  <StepHeader step={2} total={4} label="Pick Your Fruits" sublabel={`Choose up to ${MAX_FRUITS} fruits. ${selectedFruits.length}/${MAX_FRUITS} selected.`} />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {FRUITS.map(f => {
                      const active = selectedFruits.includes(f.id);
                      const disabled = !active && selectedFruits.length >= MAX_FRUITS;
                      return (
                        <button
                          key={f.id}
                          onClick={() => !disabled && toggleFruit(f.id)}
                          disabled={disabled}
                          className={cn(
                            cardBase, "p-4 w-full text-center",
                            active ? cardActive : disabled ? "border-primary/10 bg-secondary/20 opacity-40 cursor-not-allowed" : cardInactive
                          )}
                        >
                          <div className="flex flex-col items-center text-center mb-3">
                            <ItemImage src={f.img} alt={f.name} className="w-24 h-24" />
                            {active && (
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <Check size={11} className="text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <p className="font-semibold text-sm text-foreground">{f.name}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{f.vitamins}</p>
                          <p className="text-[11px] text-primary mt-1">{f.calories} cal</p>
                          {f.notes && <p className="text-[10px] text-amber-400 mt-1 italic">{f.notes}</p>}
                        </button>
                      );
                    })}
                  </div>
                  {suggestions.length > 0 && (
                    <div className="mt-6 p-4 rounded-xl border border-primary/15 bg-primary/5">
                      <p className="text-xs uppercase tracking-wider text-primary mb-2">Goes Great With</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map(s => (
                          <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-primary/25 text-muted-foreground bg-secondary/60">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3 — Flavor */}
              {step === 3 && (
                <div>
                  <StepHeader step={3} total={4} label="Add an Indulgent Flavor" sublabel="Optional. Milk base only — cannot be combined with Fruit Blend." />
                  {selectedBase === "water" ? (
                    <div className="rounded-xl border border-primary/15 bg-secondary/30 p-6 text-center">
                      <p className="text-muted-foreground text-sm">Indulgent flavors are only available with the <span className="text-foreground font-semibold">Milk + Cream</span> base.</p>
                      <p className="text-xs text-muted-foreground mt-1">Click Next to continue to your summary.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* None option */}
                      <button
                        onClick={() => setSelectedFlavor(null)}
                        className={cn(cardBase, "p-4 w-full", selectedFlavor === null ? cardActive : cardInactive)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-24 rounded-lg bg-secondary/60 border border-primary/15 flex items-center justify-center shrink-0">
                            <X size={18} className="text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">No Extra Flavor</p>
                            <p className="text-[11px] text-muted-foreground">Keep it pure fruit</p>
                          </div>
                        </div>
                        {selectedFlavor === null && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check size={11} className="text-primary-foreground" />
                          </div>
                        )}
                      </button>
                      {FLAVORS.map(fl => {
                        const active = selectedFlavor === fl.id;
                        return (
                          <button
                            key={fl.id}
                            onClick={() => setSelectedFlavor(active ? null : fl.id)}
                            className={cn(cardBase, "p-4 w-full", active ? cardActive : cardInactive)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <ItemImage src={fl.img} alt={fl.name} className="w-24 h-24" />
                                <div>
                                  <p className="font-semibold text-sm text-foreground">{fl.name}</p>
                                  <p className="text-[11px] text-muted-foreground">{fl.amount} · {fl.calories} cal</p>
                                </div>
                              </div>
                              <span className="text-primary text-xs font-semibold shrink-0">+${fl.addPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {fl.allergens.map(a => <AllergenBadge key={a} label={a} />)}
                              {fl.dietary.map(d => <DietaryBadge key={d} label={d} />)}
                            </div>
                            {active && (
                              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check size={11} className="text-primary-foreground" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4 — Summary */}
              {step === 4 && (
                <div>
                  <StepHeader step={4} total={4} label="Your Shake Summary" sublabel="Show this to our team when placing your order." />
                  <div className="rounded-2xl border border-primary/25 bg-secondary/40 overflow-hidden mb-6">
                    <div className="bg-primary/10 border-b border-primary/20 px-5 py-3 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-primary">Total Price</span>
                      <span className="font-serif text-2xl text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="p-5 space-y-4">
                      {/* Base */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Base</p>
                        <div className="flex items-center gap-2">
                          {base?.id === "milk" ? <Milk size={16} className="text-primary" /> : <Droplets size={16} className="text-primary" />}
                          <span className="text-sm font-semibold text-foreground">{base?.label}</span>
                          <span className="text-xs text-primary ml-auto">${base?.basePrice.toFixed(2)}</span>
                        </div>
                      </div>
                      {/* Fruits */}
                      {fruits.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Fruits ({fruits.length}/{MAX_FRUITS})</p>
                          <div className="flex flex-wrap gap-2">
                            {fruits.map(f => (
                              <span key={f.id} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary border border-primary/20">
                                <ItemImage src={f.img} alt={f.name} className="w-5 h-5 rounded-full" />
                                <span className="text-foreground">{f.name}</span>
                                <span className="text-muted-foreground text-xs">{f.calories}cal</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Flavor */}
                      {flavor && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Indulgent Flavor</p>
                          <div className="flex items-center gap-2">
                            <ItemImage src={flavor.img} alt={flavor.name} className="w-6 h-6 rounded-md" />
                            <span className="text-sm font-semibold text-foreground">{flavor.name}</span>
                            <span className="text-xs text-muted-foreground">({flavor.amount})</span>
                            <span className="text-xs text-primary ml-auto">+${flavor.addPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                      {/* Calories */}
                      {totalCalories > 0 && (
                        <div className="pt-3 border-t border-primary/10">
                          <p className="text-xs text-muted-foreground">
                            Approx. <span className="text-foreground font-semibold">{totalCalories} calories</span> from add-ins
                          </p>
                        </div>
                      )}
                      {/* Allergens */}
                      {allergens.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Contains</p>
                          <div className="flex flex-wrap gap-1.5">
                            {allergens.map(a => <AllergenBadge key={a} label={a} />)}
                          </div>
                        </div>
                      )}
                      {/* Dietary */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Dietary</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(base?.dietary ?? []).map(d => <DietaryBadge key={d} label={d} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {suggestions.length > 0 && (
                    <div className="rounded-xl border border-primary/15 bg-primary/5 px-5 py-4 mb-4">
                      <p className="text-xs uppercase tracking-wider text-primary mb-2">Goes Great With</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map(s => (
                          <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-primary/25 text-muted-foreground bg-secondary/60">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground text-center">Show this summary to our team when placing your order at the counter.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-primary/15 shrink-0 flex items-center gap-3">
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)} className="px-5 py-2.5 rounded-xl border border-primary/25 text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all">
                  Back
                </button>
              ) : (
                <button onClick={handleClose} className="px-5 py-2.5 rounded-xl border border-primary/25 text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all">
                  Cancel
                </button>
              )}
              {selectedBase && (
                <span className="text-sm text-primary font-semibold ml-auto mr-2">${totalPrice.toFixed(2)}</span>
              )}
              {step < 4 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={step === 1 && !selectedBase}
                  className={cn("btn-gold px-6 py-2.5 text-sm font-semibold rounded-xl transition-all", step === 1 && !selectedBase && "opacity-40 cursor-not-allowed")}
                >
                  {step === 3 ? "Review Summary" : "Next"}
                </button>
              ) : (
                <button onClick={() => { reset(); setOpen(false); }} className="btn-gold px-6 py-2.5 text-sm font-semibold rounded-xl">
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}