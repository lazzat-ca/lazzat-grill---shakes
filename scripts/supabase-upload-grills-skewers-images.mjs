// scripts/supabase-upload-grills-skewers-images.mjs
// Usage: node scripts/supabase-upload-grills-skewers-images.mjs
// This script uploads all Grills & Skewers images from public/assets to Supabase Storage (menu-images bucket).

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const images = [
  'chicken-skewers.jpeg',
  'chicken-seekh.jpeg',
  'lamb-skewers.jpeg',
  'lamb-seekh.jpeg',
  'lamb-chops.jpeg',
  'salmon-tikka.jpeg',
];

async function uploadImage(filename) {
  const filePath = path.join('public', 'assets', filename);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }
  const fileBuffer = fs.readFileSync(filePath);
  const { error } = await supabase.storage.from('menu-images').upload(filename, fileBuffer, {
    cacheControl: '3600',
    upsert: true,
    contentType: 'image/jpeg',
  });
  if (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
  } else {
    console.log(`✅ Uploaded ${filename}`);
  }
}

async function main() {
  for (const img of images) {
    await uploadImage(img);
  }
  console.log('All uploads attempted. Check Supabase Storage for results.');
}

main();
