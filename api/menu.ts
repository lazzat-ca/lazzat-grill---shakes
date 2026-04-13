import { json, noStoreHeaders, staleWhileRevalidateHeaders } from "./_lib/security.js";
import { supabaseAdmin } from "./_lib/supabase-admin.js";

const CDN_S_MAXAGE_SECONDS = 300;
const CDN_STALE_WHILE_REVALIDATE_SECONDS = 600;

export default {
  async fetch(request: Request) {
    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405, {
        ...noStoreHeaders(),
        Allow: "GET",
      });
    }

    const [{ data: menuItems, error: menuError }, { data: sauces, error: saucesError }, { data: seasonings, error: seasoningsError }] = await Promise.all([
      supabaseAdmin.from("menu_items").select("*").order("category").order("id"),
      supabaseAdmin.from("sauces").select("*").order("level").order("name"),
      supabaseAdmin.from("seasonings").select("*").order("level").order("name"),
    ]);

    if (menuError || saucesError || seasoningsError) {
      return json(
        {
          error: menuError?.message || saucesError?.message || seasoningsError?.message || "Failed to load data",
        },
        500,
        noStoreHeaders()
      );
    }

    const mappedMenuItems = (menuItems ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      imageAlt: item.image_alt,
      category: item.category,
      subCategory: item.sub_category,
      heatLevel: item.heat_level,
      isNew: item.is_new,
      isPopular: item.is_popular,
      saucePairings: item.sauce_pairings ?? [],
      sidePairings: item.side_pairings ?? [],
      customizations: item.customizations ?? [],
      allergens: item.allergens ?? [],
      dietary: item.dietary ?? [],
      flavors: item.flavors ?? [],
      textures: item.textures ?? [],
      sideType: item.side_type,
    }));

    const mappedSauces = (sauces ?? []).map((item) => ({
      name: item.name,
      level: item.level,
      description: item.description,
      image: item.image,
      allergens: item.allergens ?? [],
    }));

    const mappedSeasonings = (seasonings ?? []).map((item) => ({
      name: item.name,
      level: item.level,
      description: item.description,
      image: item.image,
      allergens: item.allergens ?? [],
    }));

    return json(
      {
        ok: true,
        data: mappedMenuItems,
        sauces: mappedSauces,
        seasonings: mappedSeasonings,
        count: mappedMenuItems.length,
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
