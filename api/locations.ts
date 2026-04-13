import { json, noStoreHeaders, staleWhileRevalidateHeaders } from "./_lib/security";
import { supabaseAdmin } from "./_lib/supabase-admin";

const CDN_S_MAXAGE_SECONDS = 300;
const CDN_STALE_WHILE_REVALIDATE_SECONDS = 600;

type DbLocation = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  weekday_hours: string;
  weekend_hours: string;
  sunday_hours: string;
  amenities: string[] | null;
  is_active: boolean;
};

export default {
  async fetch(request: Request) {
    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405, {
        ...noStoreHeaders(),
        Allow: "GET",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("locations")
      .select("*")
      .eq("is_active", true)
      .order("id");

    if (error) {
      return json({ error: error.message }, 500, noStoreHeaders());
    }

    const mapped = ((data ?? []) as DbLocation[]).map((row) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      lat: row.lat,
      lng: row.lng,
      phone: row.phone,
      hours: {
        weekday: row.weekday_hours,
        weekend: row.weekend_hours,
        sunday: row.sunday_hours,
      },
      amenities: row.amenities ?? [],
    }));

    return json(
      {
        ok: true,
        data: mapped,
        count: mapped.length,
      },
      200,
      staleWhileRevalidateHeaders(
        CDN_S_MAXAGE_SECONDS,
        CDN_STALE_WHILE_REVALIDATE_SECONDS,
        0
      )
    );
  },
};
