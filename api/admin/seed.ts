// api/admin/seed.ts
// One-shot seeding from local project data into Supabase tables.
import { json, noStoreHeaders } from "../_lib/security.js";
import { supabaseAdmin, verifyAdminToken } from "../_lib/supabase-admin.js";

import { sauces } from "../../src/lib/sauces-data.js";
import { spices } from "../../src/lib/spices-data.js";
import { blogPosts } from "../../src/lib/blog-data.js";
import { branchLocations } from "../../src/lib/locations-data.js";

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, {
        ...noStoreHeaders(),
        Allow: "POST",
      });
    }

    const internalSeedKey = request.headers.get("x-seed-key") ?? "";
    const expectedSeedKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    const trustedInternalRequest =
      internalSeedKey.length > 0 &&
      expectedSeedKey.length > 0 &&
      internalSeedKey === expectedSeedKey;

    if (!trustedInternalRequest) {
      const user = await verifyAdminToken(request);
      if (!user) return json({ error: "Unauthorized" }, 401, noStoreHeaders());
      if (user.role !== "admin") {
        return json({ error: "Forbidden: admin role required" }, 403, noStoreHeaders());
      }
    }

    const menuRows = menuItemsFlat.map((item) => ({
      name: item.name,
      description: item.description,
      price: typeof item.price === "number" ? item.price : null,
      image: item.image || "",
      image_alt: item.name,
      category: item.category,
      sub_category: item.subCategory ?? null,
      heat_level: item.heatLevel,
      is_new: !!item.isNew,
      is_popular: !!item.isPopular,
      sauce_pairings: item.saucePairings ?? [],
      side_pairings: item.sidePairings ?? [],
      customizations: item.customizations ?? [],
      allergens: item.allergens ?? [],
      dietary: item.dietary ?? [],
      flavors: item.flavors ?? [],
      textures: item.textures ?? [],
      side_type: item.sideType ?? null,
    }));

    const sauceRows = sauces.map((item) => ({
      name: item.name,
      description: item.description,
      level: item.level,
      image: item.image ?? "",
      allergens: item.allergens ?? [],
    }));

    const seasoningRows = spices.map((item) => ({
      name: item.name,
      description: item.description,
      level: item.level,
      image: item.image ?? "",
      allergens: item.allergens ?? [],
    }));

    const blogRows = blogPosts.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: JSON.stringify([{ type: "paragraph", text: post.content }]),
      author: post.author,
      date: post.date,
      category: post.category,
      read_time: post.readTime,
      image: post.image,
      image_alt: post.title,
      seo_title: post.title,
      seo_description: post.excerpt,
      published: true,
    }));

    const locationRows = branchLocations.map((loc) => ({
      name: loc.name,
      address: loc.address,
      lat: loc.lat,
      lng: loc.lng,
      phone: loc.phone,
      weekday_hours: loc.hours.weekday,
      weekend_hours: loc.hours.weekend,
      sunday_hours: loc.hours.sunday,
      amenities: loc.amenities,
      is_active: true,
    }));

    // Clear then insert to keep DB as single source of truth.
    const [menuDel, sauceDel, seasoningDel, blogDel, locDel] = await Promise.all([
      supabaseAdmin.from("menu_items").delete().neq("id", 0),
      supabaseAdmin.from("sauces").delete().neq("id", 0),
      supabaseAdmin.from("seasonings").delete().neq("id", 0),
      supabaseAdmin.from("blog_posts").delete().neq("id", ""),
      supabaseAdmin.from("locations").delete().neq("id", 0),
    ]);

    const deleteError = menuDel.error || sauceDel.error || seasoningDel.error || blogDel.error || locDel.error;
    if (deleteError) {
      return json({ error: deleteError.message }, 500, noStoreHeaders());
    }

    const [menuIns, sauceIns, seasoningsIns, blogIns, locIns] = await Promise.all([
      supabaseAdmin.from("menu_items").insert(menuRows),
      supabaseAdmin.from("sauces").insert(sauceRows),
      supabaseAdmin.from("seasonings").insert(seasoningRows),
      supabaseAdmin.from("blog_posts").insert(blogRows),
      supabaseAdmin.from("locations").insert(locationRows),
    ]);

    const insertError = menuIns.error || sauceIns.error || seasoningsIns.error || blogIns.error || locIns.error;
    if (insertError) {
      return json({ error: insertError.message }, 500, noStoreHeaders());
    }

    return json(
      {
        ok: true,
        message: "Seed completed",
        counts: {
          menu_items: menuRows.length,
          sauces: sauceRows.length,
          seasonings: seasoningRows.length,
          blog_posts: blogRows.length,
          locations: locationRows.length,
        },
      },
      200,
      noStoreHeaders()
    );
  },
};
