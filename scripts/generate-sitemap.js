import fs from "fs";
import path from "path";

const DOMAIN = "https://lazzat.ca"; // production domain
const PAGES_DIR = path.resolve("src/pages");
const OUTPUT_FILE = path.resolve("public/sitemap.xml");

// Pages to exclude
const EXCLUDE = ["NotFound.tsx", "Catering.tsx"];

const files = fs.readdirSync(PAGES_DIR);

// Build routes
const routes = files
  .filter(
    (file) =>
      (file.endsWith(".tsx") || file.endsWith(".ts")) &&
      !EXCLUDE.includes(file)
  )
  .map((file) => {
    const name = file.replace(/\.(tsx|ts)$/, "");
    if (name === "Index") return "/";
    return `/${name.toLowerCase()}`.replace(/\/+/g, "/"); // clean double slashes
  });

// Build pretty XML
const urls = routes
  .map(
    (route) => `  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

// Ensure public folder exists
fs.mkdirSync("public", { recursive: true });
fs.writeFileSync(OUTPUT_FILE, sitemap);

console.log(" Sitemap generated:", routes);
