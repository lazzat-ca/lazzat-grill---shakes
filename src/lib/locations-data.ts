export type LocationHours = {
  weekday: string;
  weekend: string;
  sunday: string;
};

export type LocationAmenity = "parking" | "wifi" | "takeaway";

export type BranchLocation = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: LocationHours;
  amenities: LocationAmenity[];
};

export const branchLocations: BranchLocation[] = [
  {
    id: 1,
    name: "Lazzat Grill & Shakes",
    address: "Lazzat Grill and Shakes 43/49 - 11685 Mcvean Dr Brampton ON L6P 4N5",
    lat: 43.8065,
    lng: -79.6421,
    phone: "+1 289-401-0002",
    hours: {
      weekday: "11:00 AM - 11:00 PM",
      weekend: "11:00 AM - 12:00 AM",
      sunday: "12:00 PM - 10:00 PM",
    },
    amenities: ["parking", "wifi", "takeaway"],
  },
  {
    id: 2,
    name: "Lazzat Grill & Shakes",
    address: "Lazzat Grill and Shakes 143 Clarence St, Unit 10 Brampton ON L6W 1T2",
    lat: 43.6847,
    lng: -79.7599,
    phone: "+1 (234) 567-8200",
    hours: {
      weekday: "10:00 AM - 10:00 PM",
      weekend: "10:00 AM - 11:00 PM",
      sunday: "11:00 AM - 9:00 PM",
    },
    amenities: ["parking", "wifi", "takeaway"],
  },
];
