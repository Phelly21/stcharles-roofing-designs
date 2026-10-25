# BUILD SPEC — StCharlesRoofingDesigns.com page writers

You are writing source pages for a static local-SEO site. Write ONLY the files assigned to you, into
`C:\Users\peter\Websites\stcharles-roofing-designs\src\pages\`. The build script (`build/build.js`) wraps them in
header, hero, sidebar quote form, footer, schema, and FAQ markup + FAQ schema. Do not edit any other file.
When done, run `node build/build.js && node build/verify.js` from the repo root and fix any FAIL lines for YOUR pages
(ignore other writers' pages). Then report: files written + word count per page.

READ FIRST: `build/_RESEARCH_roofing.md`, `build/_RESEARCH_city.md`, `build/_RESEARCH_towns.md`, and
`src/pages/index.html` + `src/pages/about.html` (tone + markup reference). Facts must come from those research files
(or be general, uncontroversial roofing knowledge). Anything marked [UNVERIFIED] there must NOT be stated as fact.

## The business (exact NAP — never vary)
St. Charles Roofing Designs · 498 S 5th St. Ste 240, St. Charles, MO 63301 · (636) 242-5111 (tel:+16362425111)
Hours: open 7 days a week, 8am–8pm. Residential-first roofer; also commercial.

## Claims — ALLOWED (only these)
- Free quotes / free written quotes (after looking at the roof).
- Residential and commercial roofing; the 10 services below.
- Office on South Fifth Street in St. Charles; open 7 days 8am–8pm.
- Process descriptions as on about.html: we look at the roof before quoting, photograph what we find, tell you whether a repair will do, build to code and manufacturer instructions, clean up, walk-through.
- Manufacturer warranties described as the MANUFACTURER's (e.g., "DECRA's published warranty covers…").

## Claims — BANNED (the audit greps for these; don't write them at all)
licensed, insured, bonded, certified / certification (about the company OR its crews; for products say "rated" or "tested to UL 2218 Class 4"), "preferred contractor", years in business, "since 19xx/20xx", "N years of experience", family-owned, veteran-owned, top-rated, best/#1 roofer, financing, 24/7, "24 hours", same-day, free inspection (say free QUOTE), workmanship warranty, "our warranty", "we handle/file/negotiate your claim", "deal with your insurance", BBB, star ratings/review counts, testimonials. No invented project stories, customer names, crew sizes, timelines-as-guarantees, or prices of our own.
- Prices: only the labeled NATIONAL / third-party figures in the research file, always labeled ("national cost guides put…"). Never imply they are our prices.
- Missouri has no state roofing license — you may SAY that (factually), but never call the company licensed.
- Insurance: you may explain how claims, deductibles, ACV/RCV and RSMo 407.725 work. Don't promise to meet adjusters or handle claims. The most you may say: "we document what we find with dated photos you can share with your insurer."
- Never mention competitors by name.

## Page source format
```
<!--meta
{ JSON front matter }
-->
<body HTML>
```
Front matter (JSON, double quotes, no trailing commas):
- `slug` (exact from the assignment), `type` ("service" | "area" | "blog")
- `title` (≤ 62 chars, pattern "[Topic] in St. Charles, MO | St. Charles Roofing Designs" — shorten brand to fit; for areas "Roofing in Frenchtown, St. Charles MO | St. Charles Roofing Designs"-style; must be unique)
- `description` (140–160 chars, unique, includes the place + a call to action)
- `h1` (unique; include the place), `crumb` (short), `crumbs`: services → `[["Services","/services/"]]`; areas → `[["Service Areas","/service-areas/"]]`; blog → `[["Blog","/blog/"]]`
- `kicker` (2–4 words), `lead` (one sentence, ≤ 35 words)
- `heroImage` + `heroAlt` (from the image list; alt describes what's in the photo — they're stock photos, so NEVER say the photo is in St. Charles or is our job)
- service pages: `serviceName` (e.g. "Roof Replacement")
- area pages: `place` (e.g. "St. Peters, MO" / "Frenchtown, St. Charles, MO") and `placeType` ("City" for towns, "Place" for neighborhoods/communities)
- blog: `date` ("2026-10-2X", use the one assigned)
- `faqs`: array of {"q","a"} — service 6–7, area 5–6, blog 4–6. Plain text answers (no HTML), 40–90 words each, genuinely useful, answer-first. The build renders them visibly AND as FAQ schema from the same strings, so don't also write an FAQ section in the body.

## Body rules
- Start with `<div class="answer"><p>…</p></div>`: a 45–70 word direct answer to the page's main question (AEO), naming the business and place.
- Then h2 sections (no h1 in body). Use h3 for sub-points. Short paragraphs (2–4 sentences).
- Allowed components: `<p>`, `<ul>`, `<ol class="steps-list">` (numbered process), `<div class="callout"><strong>Label</strong><p>…</p></div>`, `<p class="pull">one quotable sentence</p>` (max 1 per page), tables: `<div class="tbl-wrap"><table class="tbl"><thead>…</thead><tbody>…</tbody></table></div>`, and at most ONE inline figure:
  `<figure><img src="/images/NAME.webp" width="1400" height="875" alt="…" loading="lazy"><figcaption>…</figcaption></figure>` (use a different image than heroImage).
- No inline styles, no scripts, no `<a>` wrapping block elements, no external links except to official sources where genuinely useful (city/county/NWS/revisor.mo.gov/DCI) with `rel="noopener" target="_blank"`. Max 3 external links per page.
- Internal links: root-relative with trailing slash: `/roof-replacement/`, `/roofing-st-peters-mo/`, `/blog/<slug>/`. Descriptive anchors, woven into sentences — never "click here", never a bare list of links at the end.
- Phone links: `<a href="tel:+16362425111">(636) 242-5111</a>`.

## Depth + link minimums (verify.js enforces; aim above them)
| type | words in body (excl. FAQ) | in-body links to OTHER service pages | to area pages | to specific blog posts |
|---|---|---|---|---|
| service | ≥ 1,150 (audit fails < 1,000) | ≥ 2 | ≥ 4 | ≥ 1 (use the ones assigned) |
| area | ≥ 1,000 (audit fails < 850) | ≥ 3 | ≥ 2 (neighbors) | ≥ 1 (assigned) |
| blog | ≥ 1,150 (audit fails < 900) | ≥ 2 | ≥ 1 | — (may link other posts) |
Link to the blog HUB `/blog/` does NOT count — link specific posts.

### Service page structure
answer → what it is / when you need it → signs (list) → what's included / our process (steps-list) → materials & details that matter in St. Charles County (code: drip edge eaves+rakes, 2-layer limit, ice barrier not code-required but recommended in valleys/penetrations, 107 mph design wind, "Severe" weathering — whichever are relevant) → cost factors (no prices unless labeled national) → local angle (historic districts, hail, housing eras, permits by town — linking areas) → related services/next step.

### Area page structure
answer → the neighborhood/town (location, roads, landmarks, school district — only verified) → housing stock & typical roofs → roof problems we see there → permits / review rules for THIS place (exactly as research says, with "check with…" phrasing for unverified) → weather (verified events only) → services most requested there (each linked, tailored copy — NOT a bare card grid) → nearby areas (link 2+ neighbors in prose).

### Blog structure
answer → sections with real detail, tables where useful → local angle → "what to do next" linking services → (FAQs via front matter). Blog posts are the AEO/citation play: precise, sourced ("according to the National Weather Service…"), dated facts, no fluff.

## Registry (all slugs — link only to these)
Services: roof-replacement · roof-repair · storm-hail-damage-roof-repair · roof-inspection · architectural-shingles · fiberglass-shingles · metal-roofing · stone-coated-steel-shingles · historic-home-roofing · commercial-roofing
Areas: roofing-frenchtown-st-charles · roofing-historic-main-street-st-charles · roofing-midtown-lindenwood-st-charles · roofing-new-town-st-charles · roofing-harvester-mo · roofing-st-peters-mo · roofing-cottleville-mo · roofing-weldon-spring-mo · roofing-orchard-farm-north-st-charles-county · roofing-portage-des-sioux-mo · roofing-west-alton-mo
Blog (/blog/<slug>/): how-much-does-a-new-roof-cost-in-st-charles · do-you-need-a-roof-permit-in-st-charles-county · replacing-a-roof-in-a-st-charles-historic-district · missouri-hail-damage-roof-claims-your-rights · st-charles-county-hail-history · stone-coated-steel-roofing-pros-cons-cost · class-4-vs-class-3-shingles-missouri · metal-roof-vs-architectural-shingles
Hubs: /services/ /service-areas/ /blog/ /about/ /contact/

Neighbor map (for lateral area links): Frenchtown↔Historic Main Street↔Midtown & Lindenwood (all central city); New Town↔Orchard Farm↔Portage des Sioux↔West Alton (north); Harvester↔St. Peters↔Cottleville↔Weldon Spring (south/west).

## Images (`/images/NAME.webp`, 1400×875; each also has `-800.webp`)
crew-installing-shingles-over-underlayment (crew on roof laying shingles over gray underlayment) · crew-tearing-off-shingle-roof (crew tearing off roof on two-story house) · reroof-underlayment-in-progress (house mid-reroof, underlayment, scaffolding) · roofer-cutting-new-roof-decking (roofer with saw cutting decking boards) · roofer-nailing-asphalt-shingles (nail gun on shingles, close-up) · shingle-roof-tear-off-to-battens (roof stripped to battens, old shingles) · green-metal-roof (green metal panel roof, blue sky) · metal-tile-roof-on-brick-house (brown metal tile-profile roof on brick house, gutter) · storm-damaged-shingle-roof (torn shingles, debris on roof) · roofer-working-on-metal-roof (roofer on red metal roof by dormer window) · roofers-installing-roof-vent (two roofers fitting a roof vent on shingles) · installing-metal-tile-roof-panels (drill on dark metal tile-profile panels) · roofers-inspecting-roof (two roofers in hard hats on a roof) · green-metal-roof-gables (green metal roof, gables, large window) · red-metal-tile-roof-dormer (red metal tile-profile roof with skylight) · roofer-replacing-rotted-roof-decking (roofer prying rotted boards on old roof)

## Assignments
1. roof-replacement (blog: how-much-does-a-new-roof-cost-in-st-charles, do-you-need-a-roof-permit-in-st-charles-county) · roof-repair (blog: missouri-hail-damage-roof-claims-your-rights) · roof-inspection (blog: st-charles-county-hail-history)
2. storm-hail-damage-roof-repair (blog: missouri-hail-damage-roof-claims-your-rights, st-charles-county-hail-history) · commercial-roofing (blog: do-you-need-a-roof-permit-in-st-charles-county) · historic-home-roofing (blog: replacing-a-roof-in-a-st-charles-historic-district)
3. architectural-shingles (blog: class-4-vs-class-3-shingles-missouri) · fiberglass-shingles (blog: how-much-does-a-new-roof-cost-in-st-charles) · blog class-4-vs-class-3-shingles-missouri (date 2026-10-20)
4. metal-roofing (blog: metal-roof-vs-architectural-shingles) · stone-coated-steel-shingles (blog: stone-coated-steel-roofing-pros-cons-cost) · blog metal-roof-vs-architectural-shingles (date 2026-10-22)
5. areas: roofing-frenchtown-st-charles (blog: replacing-a-roof-in-a-st-charles-historic-district) · roofing-historic-main-street-st-charles (same) · roofing-midtown-lindenwood-st-charles (blog: replacing-a-roof-in-a-st-charles-historic-district or how-much-does-a-new-roof-cost-in-st-charles)
6. areas: roofing-new-town-st-charles (blog: how-much-does-a-new-roof-cost-in-st-charles) · roofing-harvester-mo (blog: do-you-need-a-roof-permit-in-st-charles-county) · roofing-st-peters-mo (blog: do-you-need-a-roof-permit-in-st-charles-county, st-charles-county-hail-history)
7. areas: roofing-cottleville-mo (blog: missouri-hail-damage-roof-claims-your-rights) · roofing-weldon-spring-mo (blog: stone-coated-steel-roofing-pros-cons-cost) · roofing-orchard-farm-north-st-charles-county (blog: st-charles-county-hail-history)
8. areas: roofing-portage-des-sioux-mo (blog: do-you-need-a-roof-permit-in-st-charles-county) · roofing-west-alton-mo (same) · blog st-charles-county-hail-history (date 2026-10-14)
9. blogs: how-much-does-a-new-roof-cost-in-st-charles (2026-10-08) · do-you-need-a-roof-permit-in-st-charles-county (2026-10-10) · replacing-a-roof-in-a-st-charles-historic-district (2026-10-12)
10. blogs: missouri-hail-damage-roof-claims-your-rights (2026-10-16) · stone-coated-steel-roofing-pros-cons-cost (2026-10-18)

File names: service/area → `src/pages/<slug>.html`; blog → `src/pages/blog-<slug>.html` with `"slug": "blog/<slug>"`.
Pages written by other writers may not exist yet when you run verify — "broken link" errors pointing at OTHER registry slugs are expected; only fix broken links to slugs NOT in the registry.
