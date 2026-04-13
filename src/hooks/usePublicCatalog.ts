import { useEffect, useMemo, useState } from "react";
import type { MenuItem, SauceItem } from "@/lib/menu-types";

export interface PublicLocation {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: {
    weekday: string;
    weekend: string;
    sunday: string;
  };
  amenities: string[];
}

type MenuApiResponse = {
  ok?: boolean;
  data?: unknown;
  sauces?: unknown;
  seasonings?: unknown;
};

type LocationsApiResponse = {
  ok?: boolean;
  data?: unknown;
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

const isSauceItemArray = (value: unknown): value is SauceItem[] => {
  if (!Array.isArray(value)) return false;
  return value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Partial<SauceItem>;
    return (
      typeof candidate.name === "string" &&
      typeof candidate.description === "string" &&
      typeof candidate.level === "number"
    );
  });
};

const isLocationArray = (value: unknown): value is PublicLocation[] => {
  if (!Array.isArray(value)) return false;
  return value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Partial<PublicLocation>;
    return (
      typeof candidate.id === "number" &&
      typeof candidate.name === "string" &&
      typeof candidate.address === "string" &&
      typeof candidate.lat === "number" &&
      typeof candidate.lng === "number" &&
      typeof candidate.phone === "string" &&
      !!candidate.hours &&
      typeof candidate.hours.weekday === "string" &&
      typeof candidate.hours.weekend === "string" &&
      typeof candidate.hours.sunday === "string" &&
      Array.isArray(candidate.amenities)
    );
  });
};

export const usePublicCatalog = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [sauces, setSauces] = useState<SauceItem[]>([]);
  const [seasonings, setSeasonings] = useState<SauceItem[]>([]);
  const [locations, setLocations] = useState<PublicLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const menuController = new AbortController();
    const locationsController = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const [menuRes, locationsRes] = await Promise.all([
          fetch("/api/menu", {
            headers: { Accept: "application/json" },
            signal: menuController.signal,
          }),
          fetch("/api/locations", {
            headers: { Accept: "application/json" },
            signal: locationsController.signal,
          }),
        ]);

        if (!menuRes.ok || !locationsRes.ok) {
          setError("Failed to load catalog data from database.");
          setMenuItems([]);
          setSauces([]);
          setSeasonings([]);
          setLocations([]);
          return;
        }

        const menuPayload = (await menuRes.json()) as MenuApiResponse;
        const locationsPayload = (await locationsRes.json()) as LocationsApiResponse;

        if (!isMenuItemArray(menuPayload.data) || !isLocationArray(locationsPayload.data)) {
          setError("Invalid catalog data received from database.");
          setMenuItems([]);
          setSauces([]);
          setSeasonings([]);
          setLocations([]);
          return;
        }

        setMenuItems(menuPayload.data);
        setSauces(isSauceItemArray(menuPayload.sauces) ? menuPayload.sauces : []);
        setSeasonings(isSauceItemArray(menuPayload.seasonings) ? menuPayload.seasonings : []);
        setLocations(locationsPayload.data);
      } catch {
        setError("Failed to load catalog data from database.");
        setMenuItems([]);
        setSauces([]);
        setSeasonings([]);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    void load();

    return () => {
      menuController.abort();
      locationsController.abort();
    };
  }, []);

  return useMemo(
    () => ({ menuItems, sauces, seasonings, locations, loading, error }),
    [menuItems, sauces, seasonings, locations, loading, error]
  );
};
