import { Layout } from "@/components/layout/Layout";
import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Phone, Navigation, Copy, Share2, Wifi, Car, ShoppingBag, LucideIcon } from "lucide-react";
import {
  findNearestLocation,
  getDistanceKm,
  getMapsLink,
  getTravelTimeMinutes,
  requestUserLocation,
} from "@/lib/location-utils";
import type { BranchLocation } from "@/lib/locations-data";

/* =====================
   Helpers
===================== */
const isLocationOpen = (hours: BranchLocation["hours"]) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const hoursString =
    day === 0
      ? hours.sunday
      : day === 5 || day === 6
        ? hours.weekend
        : hours.weekday;

  const match = hoursString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/);
  if (!match) return false;

  const [, startHour, startMin, startPeriod, endHour, endMin, endPeriod] = match;
  
  let openTime = parseInt(startHour) * 60 + parseInt(startMin);
  if (startPeriod === 'PM' && startHour !== '12') openTime += 12 * 60;
  if (startPeriod === 'AM' && startHour === '12') openTime = parseInt(startMin);

  let closeTime = parseInt(endHour) * 60 + parseInt(endMin);
  if (endPeriod === 'PM' && endHour !== '12') closeTime += 12 * 60;
  if (endPeriod === 'AM' && endHour === '12') closeTime = parseInt(endMin);
  
  // Handle closing past midnight
  if (closeTime < openTime) {
    closeTime += 24 * 60; // Next day
    // If current time is past midnight but before close time, adjust it too
    if (currentTime < openTime) {
      return currentTime <= (closeTime - 24 * 60);
    }
  }

  return currentTime >= openTime && currentTime <= closeTime;
};

const amenityIcons: Record<string, { icon: LucideIcon; label: string }> = {
  parking: { icon: Car, label: "Parking Available" },
  wifi: { icon: Wifi, label: "Free WiFi" },
  takeaway: { icon: ShoppingBag, label: "Takeaway Only" },
};

/* =====================
   Component
===================== */
const Locations = () => {
  const [locations, setLocations] = useState<BranchLocation[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [locationsError, setLocationsError] = useState<string | null>(null);
  const [nearestId, setNearestId] = useState<number | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [openMaps, setOpenMaps] = useState<{ [key: number]: boolean }>({});
  const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>({});
  const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'error' | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  const copyResetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current !== null) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadLocations = async () => {
      try {
        setLoadingLocations(true);
        const response = await fetch("/api/locations", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) {
          setLocationsError("Failed to load locations from database.");
          setLocations([]);
          return;
        }
        const payload = (await response.json()) as { data?: BranchLocation[] };
        setLocations(Array.isArray(payload.data) ? payload.data : []);
      } catch {
        setLocationsError("Failed to load locations from database.");
        setLocations([]);
      } finally {
        setLoadingLocations(false);
      }
    };

    void loadLocations();

    return () => controller.abort();
  }, []);

  const requestLocation = () => {
    if (locations.length === 0) return;
    setLocationStatus('loading');
    setHasRequestedLocation(true);
    requestUserLocation({ timeout: 10000 })
      .then((coords) => {
        setUserCoords(coords);
        const nearest = findNearestLocation(coords, locations);
        if (nearest) {
          setNearestId(nearest.id);
          document
            .getElementById(`location-${nearest.id}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        setLocationStatus('success');
      })
      .catch(() => {
        setLocationStatus('error');
      });
  };

  const retryLocation = () => {
    requestLocation();
  };

  const toggleMap = (id: number) => {
    setOpenMaps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDetails = (id: number) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyAddress = async (address: string, id: number) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      if (copyResetTimeoutRef.current !== null) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setCopiedId(null);
        copyResetTimeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLocation = async (location: BranchLocation) => {
    const shareData = {
      title: location.name,
      text: `Check out ${location.name} at ${location.address}`,
      url: getMapsLink(location.address),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${location.name}\n${location.address}\n${shareData.url}`);
        alert('Location details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4 text-center">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Order Now <span className="text-primary">- Restaurants Open Now in Brampton</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We automatically highlight the nearest Lazzat branch for you.
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-card">
        <div className="container-luxury px-4">
          {loadingLocations && (
            <div className="mb-6 p-4 rounded-lg border border-primary/20 bg-background/50 text-center text-sm text-muted-foreground">
              Loading locations...
            </div>
          )}

          {locationsError && (
            <div className="mb-6 p-4 rounded-lg border border-red-800/40 bg-red-950/20 text-center text-sm text-red-300">
              {locationsError}
            </div>
          )}

          {/* Location Permission Prompt */}
          {!loadingLocations && locations.length > 0 && !hasRequestedLocation && (
            <div className="mb-6 p-6 rounded-lg border border-primary/30 bg-background/95 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-serif text-foreground mb-2">
                Find Your Nearest Location
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enable location access to see which Lazzat branch is closest to you.
              </p>
              <button
                onClick={requestLocation}
                className="btn-gold px-6 py-2.5 text-sm font-semibold"
              >
                Enable Location
              </button>
            </div>
          )}

          {/* Status Banner */}
          {locationStatus === 'loading' && (
            <div className="mb-6 p-4 rounded-lg border border-primary/20 bg-background/50 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Finding your nearest location...</span>
              </div>
            </div>
          )}

          {locationStatus === 'error' && (
            <div className="mb-6 p-4 rounded-lg border border-primary/30 bg-background text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Please enable location access on your device to find the nearest branch, or view both locations below.
              </p>
              <button
                onClick={retryLocation}
                className="text-sm text-primary hover:underline font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {locations.map((location) => {
            const isNearest = nearestId === location.id;
            const isOpen = openMaps[location.id];
            const distanceKm = userCoords
              ? getDistanceKm(userCoords.lat, userCoords.lng, location.lat, location.lng)
              : null;

            return (
              <div
                key={location.id}
                id={`location-${location.id}`}
                className={`bg-background border rounded-lg p-3 md:p-5 transition-all duration-700 ${
                  isNearest 
                    ? "border-primary shadow-[0_0_25px_rgba(218,170,67,0.4)] animate-pulse-glow scale-[1.02]" 
                    : "border-primary/20"
                }`}
                style={isNearest ? {
                  animation: 'pulse-glow 2s ease-in-out infinite'
                } : undefined}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isNearest && (
                      <span className="text-xs font-semibold text-primary uppercase">
                        Nearest to you
                      </span>
                    )}
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isLocationOpen(location.hours)
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}>
                      {isLocationOpen(location.hours) ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>

                {userCoords && (
                  <div className="text-xs text-muted-foreground mb-2">
                    {distanceKm?.toFixed(1)} km away • ~{getTravelTimeMinutes(distanceKm ?? 0)} min drive
                  </div>
                )}

                {/* Title */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl text-foreground">
                    {location.name}
                  </h3>

                  <button
                    onClick={() => toggleDetails(location.id)}
                    className="text-xs text-primary md:hidden"
                  >
                    {openDetails[location.id] ? "Hide details" : "View details"}
                  </button>
                </div>

                {/* Details */}
                <div
                  className={`
                    space-y-3 text-muted-foreground text-sm
                    ${openDetails[location.id] ? "block" : "hidden"}
                    md:block
                  `}
                >
                  <a
                    href={getMapsLink(location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-start"
                  >
                    <MapPin className="w-4 h-4 text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.7)] mt-0.5" />
                    <p className="text-muted-foreground">
                      {location.address}
                    </p>
                  </a>

                  <div className="flex gap-2 items-center">
                    <Phone className="w-4 h-4 text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]" />
                    <a href={`tel:${location.phone}`} className="text-muted-foreground">
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex gap-2 items-start">
                    <Clock className="w-4 h-4 text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.7)] mt-0.5" />
                    <div className="space-y-1 text-muted-foreground">
                      <div>Mon–Thu: {location.hours.weekday}</div>
                      <div>Fri–Sat: {location.hours.weekend}</div>
                      <div>Sunday: {location.hours.sunday}</div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {location.amenities && location.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-primary/10">
                    {location.amenities.map((amenity) => {
                      const AmenityIcon = amenityIcons[amenity]?.icon;
                      const label = amenityIcons[amenity]?.label;
                      if (!AmenityIcon) return null;
                      return (
                        <div key={amenity} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <AmenityIcon className="w-4 h-4 text-primary" />
                          <span>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => copyAddress(location.address, location.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-primary/30 bg-background/50 hover:border-primary hover:bg-primary/5 transition text-xs font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedId === location.id ? "Copied!" : "Copy Address"}
                  </button>
                  <button
                    onClick={() => shareLocation(location)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-primary/30 bg-background/50 hover:border-primary hover:bg-primary/5 transition text-xs font-medium"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>

                {/* Icons row */}
                <div className="flex items-center justify-center gap-6 mt-4 mb-3">
                  <a
                    href={getMapsLink(location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-primary hover:scale-110 transition"
                  >
                    <Navigation className="w-6 h-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                    <span className="text-[11px] mt-1">Get Directions</span>
                  </a>

                  <button
                    onClick={() => toggleMap(location.id)}
                    className="flex flex-col items-center text-primary hover:scale-110 transition md:hidden"
                  >
                    <MapPin className="w-6 h-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                    <span className="text-[11px] mt-1">
                      {isOpen ? "Hide" : "Map"}
                    </span>
                  </button>
                </div>

                {/* Map */}
                <div
                  className={`overflow-hidden rounded-lg border transition-all ${
                    isOpen ? "h-48" : "h-0"
                  } md:h-56`}
                >
                  <iframe
                    title={location.name}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      `${location.name}, ${location.address}`
                    )}&z=18&output=embed`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
          </div>

          {!loadingLocations && locations.length === 0 && !locationsError && (
            <div className="text-center py-10 text-muted-foreground">No locations available.</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
