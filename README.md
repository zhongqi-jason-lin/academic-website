# Academic site — template

A zero-build static template for a personal academic website: one hand-drawn "lab notebook" page, wired for privacy-respecting visitor + CV-download tracking on Cloudflare Workers.

![Preview of the template](assets/preview.png?v=4)

One live example deployed from this design: **[zhongqilin.org](https://zhongqilin.org)**.

## What you get

- **One static `index.html`**: no framework, no build step, no npm install to run the site. All content is plain HTML you edit in place; a small inline script handles the interactions.
- **Notebook look**: graph-paper background with a margin rule, a taped snapshot portrait, ink-stroke dividers, Newsreader type, and card drawings in a shared ink palette that follows the theme.
- **Cards that open two ways**: Currently (3 cards) and Papers (4 cards) keep one fixed size. Where a row holds every card, opening one unfolds its details sideways and folds its siblings into spines; on narrower screens the details open in a drawer under the card's row, animated with the View Transitions API. `x` / `Esc` close and return focus.
- **Light/dark switch**: follows the OS by default; the choice is saved only while it differs from the OS, is applied before first paint (no flash), and cross-fades with a View Transition.
- **Load intro**: the margin rule drops, blocks fade and sharpen into place in reading order, then the dividers draw. Runs once; off with `prefers-reduced-motion`.
- **Responsive**: desktop, tablet and phone layouts; the layout reacts to the real space available (container queries), so wide scrollbars can't push cards off-screen.
- **Self-hosted fonts** (Newsreader, EB Garamond italic; SIL Open Font License): visitors' browsers make no third-party requests.
- **Cloudflare Worker** (`worker/index.js`): serves the repo as static assets, adds baseline security headers, 301-redirects `www` to your apex domain, and exposes:
  - `POST /api/cv-download`: click-beacon fired from the "Download CV" link (direct GETs for `/assets/<cv>.pdf` bypass the Worker, so this is the reliable way to count CV downloads)
  - `GET /api/cv-stats`: total CV downloads and per-country breakdown
  - `GET /api/visits`, `GET /api/stats`: per-city visit counts (not shown on the page; there if you want them)
- **Workers KV** storage for the counters, with 24h IP-hash dedup and bot filtering.
- **SEO / crawler-ready**: Open Graph + Twitter Card, `@graph` JSON-LD with `Person` + `ScholarlyArticle` nodes (the pattern Google Scholar prefers for author↔paper linking), real favicon files, `robots.txt`, `sitemap.xml`. All content is in the HTML, so crawlers see it without running scripts.

## Quick start

```bash
# clone and serve the static layer
git clone https://github.com/<you>/<your-fork>.git
cd <your-fork>
python3 -m http.server 8000
# → http://localhost:8000
```

For the full Worker (API endpoints + local KV simulation):

```bash
npx wrangler dev
```

## Personalizing

Everything lives in **`index.html`**. Search for the placeholder text (`Jane`, `Example`, `your-`) to find each spot.

1. **`<head>`**: `<title>`, `<meta name="description">`, `<meta name="author">`, `<link rel="canonical">`, the `og:*` / `twitter:*` block, and the JSON-LD `@graph` (keep the structure, swap names, URLs and DOIs).
2. **Top links** (`<nav data-icons>`): the five `<a data-tx>` links. Rename or remove any; they are plain text links.
3. **Hero**: the photo (`<img data-photo>`, points at `assets/headshot.svg`; drop in your own square image and update `src`/`alt`), the name (`<h1 data-name>`; text inside `<i>` gets the accent colour), and the tagline (`<p data-tagline>`).
4. **Currently** (`<ul data-shelf="now">`): each `<li data-item>` is one card. On the card face: the drawing (the inline `<svg viewBox="0 0 360 225">`), the kind label, and the title (`<span data-t>`). In its details (`<div data-page>`): the question (`<p data-q>`) and a short paragraph (`<p data-body>`).
5. **Papers** (`<ul data-shelf="pub">`): face title (`<span data-t>`), journal and year (in both `<span data-jy>` and the spine `<em>`), and in the details the full title (`<p data-ft>`), authors (`<p data-au>`, wrap your own name in `<b>`), summary (`<p data-sum>`) and link (`<a data-read href>`).
6. **Footer**: the CV link (`href="/assets/your-cv.pdf"`; drop your PDF at that path) and the copyright line.
7. Replace `assets/headshot.svg`, `assets/og-card.png` (1200×630 social card), `favicon.ico` and `assets/favicon-192.png`; update `robots.txt`, `sitemap.xml`, and `APEX_HOST` / `SITE_LIVE_DATE` in `worker/index.js`.

**Drawings**: each card's drawing is a 360×225 inline SVG. The placeholders use the page's ink palette through CSS variables (`--sk-ink`, `--sk-ink-soft`, `--sk-paper`, `--sk-sage`, `--sk-gold`, `--sk-sky`, `--sk-clay`, `--sk-rose`, `--sk-accent`), so a drawing that uses them switches with light/dark automatically. Any element with a `data-anim` attribute and a CSS animation keeps animating (paused under reduced motion).

**Adding or removing cards**: the layout is sized for 3 Currently cards and 4 Papers (each row is 956 px wide: 3 × 308 + 2 × 16 = 4 × 227 + 3 × 16). To change the count, copy or delete a whole `<li data-item>` block, give a new card a unique `data-k` (and matching `id`s: `zl8p-f-<k>`, `zl8p-t-<k>`, `zl8p-d-<k>`), add the key to the `SHELVES` list in the script at the bottom, and add a `view-transition-name` line for it next to the others (search for `zl-f-now1`). A different count per row also means adjusting `--n`, `--face` and the 956 px breakpoint in the CSS.

## Deploying to Cloudflare

1. Push your fork to GitHub.
2. **Create a KV namespace** in the Cloudflare dashboard (`Storage & Databases → KV → Create`). Paste the namespace id into `wrangler.jsonc` under `kv_namespaces[0].id`, replacing `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.
3. **Connect your GitHub repo to Workers Builds** (`Workers & Pages → Create → Connect to Git`). It'll run `npx wrangler deploy` on every push to `main`.
4. **Set the `IP_SALT` secret** — used to hash visitor IPs so dedup is unguessable:
   ```bash
   openssl rand -hex 32 | npx wrangler secret put IP_SALT
   ```
5. (Optional) **Add a custom domain** in `Workers & Pages → <project> → Settings → Domains & Routes`. Cloudflare auto-inserts DNS if the domain's zone is on Cloudflare DNS. If you'll serve from both apex and `www` (e.g. `example.com` and `www.example.com`), set `APEX_HOST` at the top of `worker/index.js` to your apex domain (no scheme, no `www`) — the Worker 301-redirects the `www` host to the apex so Search Console doesn't flag the duplicate as "Alternate page with proper canonical tag." Leave the constant empty/null to skip the redirect.
6. **Register the site in Google Search Console** at <https://search.google.com/search-console>. Uncomment the `<meta name="google-site-verification">` tag in `index.html` and paste in the token, then submit `sitemap.xml`.

## Privacy posture

The visit / CV tracking is designed to be data-minimal:
- **No raw IPs stored.** Dedup uses `SHA-256(ip + IP_SALT)` truncated to 64 bits, TTL'd to 24 h. After that window the hash is unrecoverable — there's no plaintext to correlate.
- **Only `{city, country, lat, lon, count}`** is persisted per city. No user agents, no cookies, no fingerprinting. The page itself makes no third-party requests (fonts are self-hosted).
- Edge geolocation (`request.cf`) is native to Cloudflare — visitor data never leaves their network.
- Bot / verified-bot / Cloudflare-internal warmup traffic is filtered pre-log — see `isProbablyBot()` in `worker/index.js`. iCloud Private Relay users are admitted past the Cloudflare-AS bot gate by checking for a recognizable device-OS string in the UA.

## File structure

```
.
├── index.html              # The whole page: content, CSS and the small interaction script
├── favicon.ico
├── robots.txt              # Crawler policy + sitemap reference
├── sitemap.xml             # Single-URL sitemap (update <loc> for your domain)
├── assets/
│   ├── headshot.svg        # Placeholder silhouette — replace
│   ├── og-card.png         # 1200×630 social-preview card — replace with your own
│   ├── favicon-192.png     # Replace with your own icon
│   ├── fonts/              # Newsreader + EB Garamond italic (woff2) and their OFL texts
│   ├── preview.png         # README screenshot
│   └── your-cv.pdf         # Not committed — drop yours here
├── worker/
│   └── index.js            # Cloudflare Worker — static + /api/* + security headers
├── wrangler.jsonc          # Worker config (KV binding, assets dir)
├── .assetsignore           # Files excluded from the static-asset bundle
└── LICENSE                 # MIT
```

## License

[MIT](LICENSE)
