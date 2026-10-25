# StCharlesRoofingDesigns.com

Static local-SEO site for St. Charles Roofing Designs (St. Charles, MO).

- Edit content in `src/pages/*.html` (JSON front matter + body). Business facts, nav, services, areas and blog slugs live in `build/site.js`.
- `node build/build.js` generates the site (pages, schema, FAQ schema, sitemaps).
- `node build/verify.js` (banned claims, depth, internal links, FAQ schema = visible) and `node build/qa.js` (assets, JSON-LD, duplicates).
- `node build/serve.js 8811` then `node build/mobile.js` for the 320–414px overflow check.
- `node build/deploy.js` publishes the built files to the `gh-pages` branch (GitHub Pages).

Never hand-edit generated HTML; rebuild from `src/`.
