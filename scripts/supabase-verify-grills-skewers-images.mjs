// scripts/supabase-verify-grills-skewers-images.mjs
// Usage: node scripts/supabase-verify-grills-skewers-images.mjs
// This script prints the image URLs for all Grills & Skewers items in your production Supabase database.

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, name, image, category')
    .eq('category', 'Grills & Skewers');

  if (error) {
    console.error('Error fetching menu_items:', error);
    process.exit(1);
  }

  console.log('--- Grills & Skewers Images in Production DB ---');
  for (const item of data) {
    console.log(`${item.name}: ${item.image}`);
  }
}

main();
