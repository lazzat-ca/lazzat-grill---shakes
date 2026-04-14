import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'menu-images';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function verifyGrillsAndSkewersImages() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id,name,category,image')
    .ilike('category', '%Grills%');
  if (error) {
    console.error('DB error:', error);
    process.exit(1);
  }
  for (const item of data) {
    if (!item.image || !item.image.startsWith('http')) {
      console.log(`[MISSING] ${item.name} (id: ${item.id}) - image: ${item.image}`);
    } else {
      console.log(`[OK] ${item.name} (id: ${item.id}) - image: ${item.image}`);
    }
  }
}

verifyGrillsAndSkewersImages();
