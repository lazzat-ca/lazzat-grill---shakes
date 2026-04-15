// scripts/supabase-grills-skewers-image-bulk-update.mjs
// Usage: node scripts/supabase-grills-skewers-image-bulk-update.mjs
// This script bulk updates 'Grills & Skewers' menu items with correct image URLs.

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  {
    name: "Chicken Skewers",
    image: `${supabaseUrl}/storage/v1/object/public/menu-images/chicken-skewers.jpeg`
  },
  {
    name: "Chicken Seekh Kabab",
    image: `${supabaseUrl}/storage/v1/object/public/menu-images/chicken-seekh.jpeg`
  },
  {
    name: "Lamb Skewers",
    image: `${supabaseUrl}/storage/v1/object/public/menu-images/lamb-skewers.jpeg`
  },
  {
    name: "Lamb Seekh Kabab",
    image: `${supabaseUrl}/storage/v1/object/public/menu-images/lamb-seekh.jpeg`
  },
  {
    name: "Lamb Chops",
    image: `${supabaseUrl}/storage/v1/object/public/menu-images/lamb-chops.jpeg`
  },
  {
    name: "Salmon Tikka",
    image: `${supabaseUrl}/storage/v1/object/public/menu-images/salmon-tikka.jpeg`
  }
];

async function main() {
  for (const { name, image } of updates) {
    // Evaluate template string for image
    const resolvedImage = typeof image === 'function' ? image() : image.replace(/\$\{supabaseUrl\}/g, supabaseUrl);
    const { data, error } = await supabase
      .from('menu_items')
      .update({ image: resolvedImage })
      .eq('name', name)
      .eq('category', 'Grills & Skewers');
    if (error) {
      console.error(`❌ Failed to update ${name}:`, error);
    } else {
      console.log(`✅ Updated ${name} with image: ${resolvedImage}`);
    }
  }
  console.log('Bulk update complete.');
}

main();
