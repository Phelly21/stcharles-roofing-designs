// Extra ship checks beyond verify.js: missing assets, duplicate descriptions, external links, mojibake, JSON-LD types.
// Usage: node build/qa.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    if (/^(node_modules|_raw|src|build|\.git|images|css|js)$/.test(f)) continue;
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html') && f !== '__harness.html') files.push(p);
  }
})(ROOT);

const descs = {};
let problems = 0;
for (const f of files) {
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  const h = fs.readFileSync(f, 'utf8');
  const d = (h.match(/name="description" content="([^"]*)/) || [])[1];
  (descs[d] = descs[d] || []).push(rel);
  for (const m of h.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:webp|png|svg|css|js))/g)) {
    if (!fs.existsSync(path.join(ROOT, m[1]))) { problems++; console.log('MISSING ASSET', rel, m[1]); }
  }
  const ext = [...h.matchAll(/href="(https?:[^"]+)"/g)].map(m => m[1]).filter(u => !/google\.com|facebook\.com|fonts\.g|stcharlesroofingdesigns\.com/.test(u));
  if (ext.length) console.log('external', rel, ext.join(' '));
  if (/[Ââ][\u0080-¿]/.test(h)) { problems++; console.log('MOJIBAKE', rel); }
  if (h.charCodeAt(0) === 0xfeff) { problems++; console.log('BOM', rel); }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems++; console.log('BAD JSON-LD', rel); }
  }
  if ((h.match(/<form /g) || []).length && !h.includes('formspree.io/f/xqppervn')) { problems++; console.log('FORM ENDPOINT', rel); }
}
for (const [d, fl] of Object.entries(descs)) if (fl.length > 1) { problems++; console.log('DUP DESC', fl.join(', ')); }
console.log(`\n${files.length} html files, ${problems} problems`);
