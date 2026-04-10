import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { branchLocations } from "@/lib/locations-data";
import { menuItemsFlat } from "@/lib/menu-data";
import { sauces } from "@/lib/sauces-data";
import type { MenuItem } from "@/lib/menu-types";
import { toast } from "sonner";

interface CateringFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  // Step 2
  date: string;
  time: string;
  numberOfGuests: string;
  // Step 3
  selectedItems: string[];
  instructions: string;
  pickupLocation: string;
}

interface SelectableCateringItem {
  key: string;
  name: string;
  category: string;
  price?: number;
  image?: string;
  description?: string;
  source: "menu" | "sauce";
}

type MenuApiResponse = {
  ok?: boolean;
  data?: unknown;
  count?: unknown;
};

const isMenuItemArray = (value: unknown): value is MenuItem[] => {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Partial<MenuItem>;

    return (
      typeof candidate.id === "number" &&
      typeof candidate.name === "string" &&
      typeof candidate.category === "string" &&
      typeof candidate.description === "string" &&
      typeof candidate.image === "string" &&
      Array.isArray(candidate.saucePairings) &&
      Array.isArray(candidate.customizations)
    );
  });
};

const Catering = () => {
  const [runtimeMenuItems, setRuntimeMenuItems] = useState<MenuItem[] | null>(null);
  const effectiveMenuItems = useMemo(() => runtimeMenuItems ?? menuItemsFlat, [runtimeMenuItems]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CateringFormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    numberOfGuests: "",
    selectedItems: [],
    instructions: "",
    pickupLocation: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadMenuFromApi = async () => {
      try {
        const response = await fetch("/api/menu", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as MenuApiResponse;
        if (!isMenuItemArray(payload.data)) {
          return;
        }

        setRuntimeMenuItems(payload.data);
      } catch {
        // Keep local bundled data when API fetch fails.
      }
    };

    void loadMenuFromApi();

    return () => {
      controller.abort();
    };
  }, []);

  const getSauceKey = (name: string) => `sauce-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const categorizedSelectionItems = useMemo(() => {
    const grouped: Record<string, SelectableCateringItem[]> = {};

    effectiveMenuItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }

      grouped[item.category].push({
        key: `menu-${item.id}`,
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        description: item.description,
        source: "menu",
      });
    });

    grouped.Sauces = sauces.map((sauce) => ({
      key: getSauceKey(sauce.name),
      name: sauce.name,
      category: "Sauces",
      image: sauce.image,
      description: sauce.description,
      source: "sauce",
    }));

    return grouped;
  }, [effectiveMenuItems]);

  // Generate time options in 24-hour format
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, "0");
    return `${hour}:00`;
  });

  // Validation for Step 1
  const isStep1Valid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?1?\s?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Canadian phone number");
      return false;
    }
    return true;
  };

  // Validation for Step 2
  const isStep2Valid = () => {
    if (!formData.date) {
      toast.error("Please select a date");
      return false;
    }
    if (!formData.time) {
      toast.error("Please select a time");
      return false;
    }
    if (!formData.numberOfGuests) {
      toast.error("Please enter number of guests");
      return false;
    }
    const guests = parseInt(formData.numberOfGuests);
    if (guests < 1 || isNaN(guests)) {
      toast.error("Please enter a valid number of guests");
      return false;
    }
    return true;
  };

  // Validation for Step 3
  const isStep3Valid = () => {
    if (formData.selectedItems.length === 0) {
      toast.error("Please select at least one menu item");
      return false;
    }
    if (!formData.pickupLocation) {
      toast.error("Please select a pickup location");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && isStep3Valid()) {
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!isStep3Valid()) return;

    // Log the catering request
    console.log("Catering Request Submitted:", formData);
    
    // Get selected items details
    const selectedMenuItems = effectiveMenuItems.filter((item) =>
      formData.selectedItems.includes(`menu-${item.id}`)
    );
    const selectedSauces = sauces.filter((sauce) =>
      formData.selectedItems.includes(getSauceKey(sauce.name))
    );

    // Get pickup location
    const location = branchLocations.find(
      (loc) => loc.id === parseInt(formData.pickupLocation)
    );

    console.log("Selected Menu Items:", selectedMenuItems);
    console.log("Selected Sauces:", selectedSauces);
    console.log("Pickup Location:", location);

    toast.success(
      `Catering request submitted! We'll contact you at ${formData.email} to confirm.`
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      numberOfGuests: "",
      selectedItems: [],
      instructions: "",
      pickupLocation: "",
    });
    setCurrentStep(1);
  };

  const toggleMenuItem = (itemKey: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(itemKey)
        ? prev.selectedItems.filter((id) => id !== itemKey)
        : [...prev.selectedItems, itemKey],
    }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 pb-8 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4">
          <div className="text-center">
            <div className="gold-divider w-16 mx-auto mb-4 md:mb-6" />
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4">
              We bring <span className="text-primary">Lazzat</span> to you
            </h1>
            <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Let us cater your next event. From intimate gatherings to large
              celebrations, we've got you covered.
            </p>
            <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2 mt-2">
              For urgent catering orders, contact us directly at{" "}
              <a
                href="tel:+16471234567"
                className="text-primary font-semibold hover:underline"
              >
                +1 (647) 123-4567
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 md:py-16 bg-card">
        <div className="container-luxury px-3 sm:px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Form - Equal width */}
          <div className="flex flex-col">
          {/* Form Card */}
          <Card className="bg-background border-primary/20 p-4 sm:p-6 md:p-8 flex flex-col flex-1">
            {/* STEP 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
                    Your Contact Information
                  </h2>
                </div>

                <div>
                  <Label htmlFor="name" className="text-foreground font-semibold mb-2 block">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-semibold mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground font-semibold mb-2 block">
                    Canadian Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="bg-card border-primary/20 text-foreground"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
                    Event Details
                  </h2>
                </div>

                <div>
                  <Label htmlFor="date" className="text-foreground font-semibold mb-2 block">
                    Date of Event *
                  </Label>
                  <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between bg-card border-primary/20 text-foreground hover:bg-card hover:text-foreground"
                      >
                        <span>
                          {formData.date
                            ? new Date(formData.date).toLocaleDateString("en-CA", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Select a date"}
                        </span>
                        <Calendar className="w-5 h-5 text-primary" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      side="bottom" 
                      align="start"
                      avoidCollisions={false}
                      className="w-[340px] max-w-[calc(100vw-2rem)] p-3 bg-background border border-primary/20 rounded-lg shadow-lg"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={formData.date ? new Date(formData.date) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const dateString = date.toISOString().split("T")[0];
                            setFormData((prev) => ({
                              ...prev,
                              date: dateString,
                            }));
                            setShowDatePicker(false);
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        className="text-foreground"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="time" className="text-foreground font-semibold mb-2 block">
                    Time of Event (24-hour format) *
                  </Label>
                  <Select value={formData.time} onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, time: value }))
                  }>
                    <SelectTrigger className="bg-card border-primary/20 text-foreground">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent position="popper" side="bottom" align="start" sideOffset={4} avoidCollisions={false} className="bg-card border-primary/20 max-h-52 overflow-y-auto">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="guests"
                    className="text-foreground font-semibold mb-2 block"
                  >
                    Number of Guests *
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    placeholder="Enter number of guests"
                    value={formData.numberOfGuests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        numberOfGuests: e.target.value,
                      }))
                    }
                    className="bg-card border-primary/20 text-foreground pr-10"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Menu & Location */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
                    Select Menu Items & Pickup Location
                  </h2>
                </div>

                {/* Menu Items Selection */}
                <div>
                  <Label className="text-foreground font-semibold mb-3 block">
                    Menu Items *
                  </Label>

                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3">
                    {Object.keys(categorizedSelectionItems).map((cat) => {
                      const isActive = selectedCategory === cat;
                      const selCount = categorizedSelectionItems[cat].filter((i) =>
                        formData.selectedItems.includes(i.key)
                      ).length;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(isActive ? null : cat)}
                          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-background border-primary"
                              : "bg-card border-primary/30 text-muted-foreground hover:border-primary/70 hover:text-foreground"
                          }`}
                        >
                          {cat}
                          {selCount > 0 && (
                            <span className={`ml-1 text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded-full ${isActive ? "bg-background/30 text-background" : "bg-primary/20 text-primary"}`}>
                              {selCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Items Grid */}
                  <div className="max-h-[22rem] sm:max-h-[26rem] overflow-y-auto pr-1 sm:pr-2 mb-4 sm:mb-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                    {Object.entries(categorizedSelectionItems)
                      .filter(([category]) => selectedCategory === null || category === selectedCategory)
                      .map(([category, items]) => (
                      <div key={category}>
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-primary mb-2 sm:mb-3 border-b border-primary/20 pb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {items.map((item) => {
                            const isChecked = formData.selectedItems.includes(item.key);

                            return (
                              <button
                                type="button"
                                key={item.key}
                                className={`w-full text-left rounded-lg p-2 sm:p-3 border transition-all duration-300 ${{
                                  true: "bg-card border-primary/60 shadow-[0_0_20px_hsl(43_56%_52%_/_0.15)]",
                                  false: "bg-card border-primary/20 hover:border-primary/50",
                                }[String(isChecked) as "true" | "false"]}`}
                                onClick={() => toggleMenuItem(item.key)}
                              >
                                <div className="flex items-start gap-3">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-md object-cover border border-primary/20 flex-shrink-0"
                                    />
                                  ) : (
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md bg-muted border border-primary/20 flex-shrink-0" />
                                  )}

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="font-semibold text-foreground leading-tight">{item.name}</p>
                                      <Checkbox
                                        id={item.key}
                                        checked={isChecked}
                                        onCheckedChange={() => toggleMenuItem(item.key)}
                                        className="mt-0.5"
                                      />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {item.description || item.category}
                                    </p>
                                    <p className="text-xs text-primary/90 mt-1 font-medium">
                                      {item.category}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-primary font-semibold">
                    Selected: {formData.selectedItems.length} item(s)
                  </p>
                </div>

                {/* Instructions */}
                <div>
                  <Label
                    htmlFor="instructions"
                    className="text-foreground font-semibold mb-2 block"
                  >
                    Special Instructions (Optional)
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any dietary preferences, allergies, or special requests..."
                    value={formData.instructions}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    className="bg-card border-primary/20 text-foreground min-h-24 resize-none"
                  />
                </div>

                {/* Pickup Location */}
                <div>
                  <Label
                    htmlFor="location"
                    className="text-foreground font-semibold mb-2 block"
                  >
                    Pickup Location *
                  </Label>
                  <Select value={formData.pickupLocation} onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, pickupLocation: value }))
                  }>
                    <SelectTrigger className="bg-card border-primary/20 text-foreground h-auto py-2.5 min-h-[2.5rem]">
                      {formData.pickupLocation ? (() => {
                        const loc = branchLocations.find(l => l.id.toString() === formData.pickupLocation);
                        return loc ? (
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-medium text-foreground">{loc.name}</span>
                            <span className="text-xs text-primary/70">{loc.address}</span>
                          </div>
                        ) : <SelectValue placeholder="Select pickup location" />;
                      })() : <SelectValue placeholder="Select pickup location" />}
                    </SelectTrigger>
                    <SelectContent position="popper" side="bottom" align="start" sideOffset={4} avoidCollisions={false} className="bg-card border-primary/20 w-[var(--radix-select-trigger-width)]">
                      {branchLocations.map((location) => (
                        <SelectItem
                          key={location.id}
                          value={location.id.toString()}
                          className="py-3"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-sm">{location.name}</span>
                            <span className="text-xs text-foreground/60">
                              {location.address}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* STEP 4: Order Summary / Receipt */}
            {currentStep === 4 && (() => {
              const selectedMenuItems = effectiveMenuItems.filter((item) =>
                formData.selectedItems.includes(`menu-${item.id}`)
              );
              const selectedSauces = sauces.filter((sauce) =>
                formData.selectedItems.includes(getSauceKey(sauce.name))
              );
              const location = branchLocations.find(
                (loc) => loc.id === parseInt(formData.pickupLocation)
              );
              return (
                <div className="space-y-4 sm:space-y-5 animate-fade-in">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                      Order Summary
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Review your catering request before submitting
                    </p>
                  </div>

                  {/* Receipt Card */}
                  <div className="border border-primary/30 rounded-lg overflow-hidden bg-card max-h-[20rem] sm:max-h-[26rem] md:max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                    {/* Receipt Header */}
                    <div className="bg-primary/10 border-b border-primary/30 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between sticky top-0 z-10">
                      <span className="font-serif text-primary font-semibold text-sm sm:text-base">Lazzat Catering</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                        {new Date().toLocaleDateString("en-CA")}
                      </span>
                    </div>

                    {/* Contact */}
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-primary/10">
                      <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-2">Contact</p>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Name</span>
                          <span className="text-foreground font-medium text-right">{formData.name}</span>
                        </div>
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Email</span>
                          <span className="text-foreground font-medium text-right break-all">{formData.email}</span>
                        </div>
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Phone</span>
                          <span className="text-foreground font-medium text-right">{formData.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-primary/10">
                      <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-2">Event Details</p>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Date</span>
                          <span className="text-foreground font-medium text-right">
                            {formData.date
                              ? new Date(formData.date + "T12:00:00").toLocaleDateString("en-CA", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "—"}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Time</span>
                          <span className="text-foreground font-medium text-right">{formData.time}</span>
                        </div>
                        <div className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-muted-foreground flex-shrink-0">Guests</span>
                          <span className="text-foreground font-medium text-right">{formData.numberOfGuests}</span>
                        </div>
                      </div>
                    </div>

                    {/* Selected Items */}
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-primary/10">
                      <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-2 sm:mb-3">
                        Selected Items ({formData.selectedItems.length})
                      </p>
                      <div className="space-y-2">
                        {selectedMenuItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover border border-primary/20 flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-foreground font-medium leading-tight">{item.name}</p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                        ))}
                        {selectedSauces.map((sauce) => (
                          <div key={sauce.name} className="flex items-center gap-2 sm:gap-3">
                            {sauce.image && (
                              <img
                                src={sauce.image}
                                alt={sauce.name}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover border border-primary/20 flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-foreground font-medium leading-tight">{sauce.name}</p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground">Sauce</p>
                            </div>
                          </div>
                        ))}
                        {formData.selectedItems.length === 0 && (
                          <p className="text-xs sm:text-sm text-muted-foreground italic">No items selected</p>
                        )}
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {formData.instructions && (
                      <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-primary/10">
                        <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-1">Special Instructions</p>
                        <p className="text-xs sm:text-sm text-foreground">{formData.instructions}</p>
                      </div>
                    )}

                    {/* Pickup Location */}
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <p className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold mb-2">Pickup Location</p>
                      {location ? (
                        <div>
                          <p className="text-xs sm:text-sm text-foreground font-medium">{location.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{location.address}</p>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground">—</p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to be contacted by our team to confirm your order.
                  </p>
                </div>
              );
            })()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary/20">
              <Button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="border-primary/20 text-foreground hover:border-primary text-sm px-3 sm:px-4"
              >
                <ChevronLeft size={16} className="mr-1 sm:mr-2" />
                <span>Previous</span>
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNextStep}
                  className="btn-gold text-sm px-3 sm:px-4"
                >
                  {currentStep === 3 ? "Review Order" : "Next"}
                  <ChevronRight size={16} className="ml-1 sm:ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="btn-gold text-sm px-3 sm:px-4"
                >
                  <span className="hidden sm:inline">Confirm & Submit Request</span>
                  <span className="sm:hidden">Confirm & Submit</span>
                </Button>
              )}
            </div>
          </Card>

          {/* Step Indicator */}
          <div className="mt-6 px-2">
            <div className="flex items-center justify-between gap-2">
              {[
                { step: 1, label: "Contact Info" },
                { step: 2, label: "Event Details" },
                { step: 3, label: "Menu & Location" },
                { step: 4, label: "Review" },
              ].map((item, idx) => (
                <div key={item.step} className="flex-1 flex items-center">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        item.step <= currentStep
                          ? "bg-primary text-background shadow-gold"
                          : item.step === currentStep + 1
                          ? "bg-primary/40 text-foreground border-2 border-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.step}
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 text-center px-0.5 leading-tight max-w-[60px] sm:max-w-none truncate sm:whitespace-nowrap">
                      {item.label}
                    </p>
                  </div>

                  {/* Progress Line */}
                  {idx < 3 && (
                    <div className="flex-1 h-0.5 mx-1 relative top-0 mb-2">
                      <div
                        className={`h-full transition-all duration-500 ${
                          item.step < currentStep ? "bg-gradient-to-r from-primary to-primary/60" : "bg-muted"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Right Column: Images - Equal width */}
          <div className="flex flex-col h-full">
            <div className="space-y-6 flex-1">
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    // 1. Grills & Skewers
                    effectiveMenuItems.find((item) => item.category === "Grills & Skewers"),
                    // 2. Sauces (convert first sauce to display format)
                    sauces[0] ? {
                      id: 9999,
                      name: sauces[0].name,
                      category: "Sauces",
                      image: sauces[0].image,
                      description: sauces[0].description,
                      heatLevel: sauces[0].level,
                    } : null,
                    // 3. Wraps
                    effectiveMenuItems.find((item) => item.category === "Wraps"),
                    // 4. Sides - Coleslaw
                    effectiveMenuItems.find((item) => item.category === "Sides" && item.name.toLowerCase().includes("coleslaw")),
                    // 5. Shakes & Juices
                    effectiveMenuItems.find((item) => item.category === "Shakes & Juices"),
                    // 6. Desserts
                    effectiveMenuItems.find((item) => item.category === "Desserts"),
                  ]
                    .filter(Boolean)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="group cursor-pointer rounded-lg overflow-hidden border border-primary/20 hover:border-primary transition-all duration-300"
                        onClick={() => {
                          if (!item) return;

                          if (item.category === "Sauces") {
                            toggleMenuItem(getSauceKey(item.name));
                            return;
                          }

                          if ("id" in item) {
                            toggleMenuItem(`menu-${item.id}`);
                          }
                        }}
                        title={item?.name}
                      >
                        {item?.image ? (
                          <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden bg-muted">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-32 sm:h-40 md:h-48 bg-muted flex items-center justify-center text-muted-foreground text-xs text-center p-2">
                            {item?.category}
                          </div>
                        )}
                        <div className="bg-background p-2 border-t border-primary/20">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {item?.category}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catering;
