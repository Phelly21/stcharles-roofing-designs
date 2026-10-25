// True-width horizontal-overflow check for every built page at 320/360/375/414px, plus screenshots.
// Needs `node build/serve.js 8811` running. Usage: node build/mobile.js [--shots]
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const ROOT = path.join(__dirname, '..');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:8811';
const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    if (/^(node_modules|_raw|src|build|\.git|images|css|js)$/.test(f)) continue;
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') pages.push('/' + path.relative(ROOT, d).split(path.sep).join('/') + (d === ROOT ? '' : '/'));
  }
})(ROOT);

(async () => {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--disable-gpu'] });
  const page = await browser.newPage();
  let bad = 0;
  for (const w of [320, 360, 375, 414]) {
    await page.setViewport({ width: w, height: 800, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    for (const p of pages) {
      await page.goto(BASE + p.replace('//', '/'), { waitUntil: 'domcontentloaded' });
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth, sw = document.documentElement.scrollWidth, off = [];
        document.querySelectorAll('body *').forEach(el => {
          if (el.closest('.tbl-wrap, .sub, .hp, .skip, .nav')) return;
          const b = el.getBoundingClientRect();
          if (b.width > 0 && (b.right > vw + 1 || b.left < -1)) off.push(el.tagName + '.' + (el.className || ''));
        });
        return { vw, sw, off: off.slice(0, 5) };
      });
      if (r.sw > r.vw || r.off.length) { bad++; console.log(`OVERFLOW w=${w} ${p} vw=${r.vw} sw=${r.sw} ${r.off.join(' ')}`); }
    }
  }
  console.log(`${pages.length} pages x 4 widths, ${bad} with overflow`);
  if (process.argv.includes('--shots')) {
    const out = path.join(require('os').tmpdir(), 'scrd');
    fs.mkdirSync(out, { recursive: true });
    for (const [p, w, name] of [['/roof-replacement/', 375, 'm-service'], ['/roofing-frenchtown-st-charles/', 375, 'm-area'], ['/', 375, 'm-home'], ['/roof-replacement/', 1400, 'd-service'], ['/blog/do-you-need-a-roof-permit-in-st-charles-county/', 1400, 'd-blog']]) {
      await page.setViewport({ width: w, height: w < 500 ? 812 : 900, deviceScaleFactor: 1, isMobile: w < 500 });
      await page.goto(BASE + p, { waitUntil: 'networkidle2' });
      await page.screenshot({ path: path.join(out, name + '.png'), fullPage: true });
    }
    console.log('screenshots in', out);
  }
  await browser.close();
})();
