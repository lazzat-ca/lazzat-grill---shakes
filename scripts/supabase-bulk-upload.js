// Bulk upload all images in src/assets to Supabase Storage and print public URLs
// Usage: node scripts/supabase-bulk-upload.js

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// === CONFIGURATION ===
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'YOUR_SERVICE_ROLE_KEY';
const BUCKET = 'menu'; // Change if your bucket is named differently
const ASSETS_DIR = path.join(__dirname, '../src/assets');

if (SUPABASE_URL.includes('YOUR_PROJECT_REF') || SUPABASE_SERVICE_KEY === 'YOUR_SERVICE_ROLE_KEY') {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY as environment variables!');
  process.exit(1);
}

async function uploadFile(filename) {
  const filePath = path.join(ASSETS_DIR, filename);
  const fileContent = fs.readFileSync(filePath);
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filename}`;
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: fileContent,
  });
  if (!res.ok) {
    throw new Error(`Failed to upload ${filename}: ${res.statusText}`);
  }
}

(async () => {
  const files = fs.readdirSync(ASSETS_DIR).filter(f => !fs.statSync(path.join(ASSETS_DIR, f)).isDirectory());
  for (const file of files) {
    process.stdout.write(`Uploading ${file} ... `);
    try {
      await uploadFile(file);
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(file)}`;
      console.log('Done');
      console.log(`  Public URL: ${publicUrl}`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }
})();
