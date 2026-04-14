// scripts/supabase-grills-skewers-image-audit.mjs
// Usage: node scripts/supabase-grills-skewers-image-audit.mjs
// This script lists all 'Grills & Skewers' menu items and their image URLs, highlighting missing or broken ones.

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

  let missing = 0;
  let broken = 0;
  console.log('--- Grills & Skewers Image Audit ---');
  for (const item of data) {
    if (!item.image || typeof item.image !== 'string' || item.image.trim() === '') {
      console.log(`❌ [MISSING] ${item.name} (id: ${item.id})`);
      missing++;
    } else if (!item.image.startsWith('https://')) {
      console.log(`❌ [BROKEN URL] ${item.name} (id: ${item.id}) → ${item.image}`);
      broken++;
    } else {
      console.log(`✅ ${item.name} (id: ${item.id}) → ${item.image}`);
    }
  }
  console.log(`\nSummary: ${missing} missing, ${broken} broken, ${data.length - missing - broken} OK`);
}

main();
