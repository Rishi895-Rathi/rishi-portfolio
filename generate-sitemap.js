import fs from 'fs';
import path from 'path';

const url = 'https://rishi-portfolio-taupe.vercel.app';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${url}/sitemap.xml`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robots);

console.log('Generated sitemap.xml and robots.txt in public/');