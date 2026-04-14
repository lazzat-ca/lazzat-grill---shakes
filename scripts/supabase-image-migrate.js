// Bulk migrate menu images to Supabase Storage and update DB
// Usage: node scripts/supabase-image-migrate.js

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'menu-images';
const ASSETS_DIR = path.join(__dirname, '../public/assets');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function ensureBucket() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) throw error;
  if (!data.find(b => b.id === BUCKET)) {
    await supabase.storage.createBucket(BUCKET, { public: true });
    console.log('Created bucket:', BUCKET);
  }
}

async function uploadImagesAndUpdateDB() {
  await ensureBucket();
  const files = fs.readdirSync(ASSETS_DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(file, fs.readFileSync(filePath), { upsert: true, contentType: 'image/' + path.extname(file).slice(1) });
    if (upErr && !upErr.message.includes('already exists')) {
      console.error('Upload failed for', file, upErr);
      continue;
    }
    const { data: pubUrl } = supabase.storage.from(BUCKET).getPublicUrl(file);
    if (!pubUrl || !pubUrl.publicUrl) {
      console.error('Failed to get public URL for', file);
      continue;
    }
    // Update DB: find menu_items where image LIKE %file and update
    const { error: dbErr } = await supabase
      .from('menu_items')
      .update({ image: pubUrl.publicUrl })
      .ilike('image', `%${file}`);
    if (dbErr) {
      console.error('DB update failed for', file, dbErr);
    } else {
      console.log('Updated DB for', file, '->', pubUrl.publicUrl);
    }
  }
}

uploadImagesAndUpdateDB().then(() => {
  console.log('Migration complete.');
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
