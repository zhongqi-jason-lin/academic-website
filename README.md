<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/readme/hero-dark.gif">
    <img src=".github/readme/hero-light.gif" width="880" alt="A notebook page loading: a blue margin rule drops, a taped photo, a name and a tagline rise into place, the research cards appear and their small drawings start to move">
  </picture>
</p>

<h1 align="center">Notebook</h1>

<p align="center">
  <b>A hand-drawn homepage for researchers.</b><br>
  One HTML file&nbsp;·&nbsp;no build step&nbsp;·&nbsp;free to host&nbsp;·&nbsp;nothing that tracks your visitors
</p>

<p align="center">
  <a href="https://zhongqilin.org"><b>See it live</b></a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="#set-up-in-three-steps"><b>Set up in three steps</b></a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="#make-it-yours">Make it yours</a>
</p>

<br>

## Why it's nice

- **It feels made by hand.** Graph paper, a taped snapshot, ink dividers, and small drawings that quietly move.
- **Your work, one click deep.** Each project and paper is a card. Open one and its story unfolds right beside it.
- **Fast and private.** About half a megabyte, no framework, no cookies, not a single request to anyone else's server.
- **Yours to edit.** Everything is plain HTML in one file. Nothing to install, nothing to learn.

## See it in action

<p align="center">
  <img src=".github/readme/cards.gif" width="880" alt="Clicking a research card: its details slide out to the right while the other cards fold into narrow spines; then a paper card does the same">
  <br>
  <sub><b>Cards that unfold.</b> Open a card and its details slide out sideways while its neighbours fold into spines.</sub>
</p>

<table>
  <tr>
    <td width="40%" align="center" valign="top">
      <img src=".github/readme/phone.gif" width="300" alt="On a phone: tapping a card opens its details in a drawer right under it, then the theme switch turns the page dark and back">
    </td>
    <td valign="top">
      <h3>Made for phones</h3>
      <p>On a small screen the details open in a drawer under the card, and the layout follows the space it really has, from a 320&nbsp;px phone to a 4K monitor.</p>
      <h3>Light and dark</h3>
      <p>It follows the reader's system setting. The switch in the corner flips it with a soft cross-fade.</p>
      <img src=".github/readme/theme.gif" width="440" alt="The theme switch: the page cross-fades from light to dark and back">
      <h3>Kind to every reader</h3>
      <p>Keyboard and screen-reader friendly, and all motion stops for anyone who asks their system for less.</p>
    </td>
  </tr>
</table>

## By the numbers

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/readme/numbers-dark.png">
    <img src=".github/readme/numbers-light.png" width="880" alt="A first visit downloads 492 KB in 6 files, with 0 third-party requests and 6.6 KB of script. The median desktop home page in 2025 is 2,862 KB with 697 KB of JavaScript. Lighthouse on desktop: 100 for performance, accessibility, best practices and SEO.">
  </picture>
</p>

<details>
<summary>The same numbers as a table</summary>
<br>

| | This template | Median desktop home page, 2025 |
|---|---:|---:|
| Everything a first visit downloads | 492 KB | 2,862 KB |
| JavaScript | 6.6 KB | 697 KB |
| Files | 6, all from your own site | |
| Third-party requests | 0 | |

Lighthouse 12 (desktop): Performance 100 · Accessibility 100 · Best practices 100 · SEO 100.

Measured on a first visit, with HTML, CSS and script gzip-compressed and fonts and images as stored. The median comes from the [HTTP Archive Web Almanac 2025, Page Weight](https://almanac.httparchive.org/en/2025/page-weight).
</details>

## How it works

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/readme/how-dark.png">
    <img src=".github/readme/how-light.png" width="880" alt="A visitor loads your site: one HTML file with its fonts and paper, from any static host. Optionally, a Cloudflare Worker counts visits by city and CV downloads, with IP addresses hashed and forgotten after 24 hours.">
  </picture>
</p>

## Set up in three steps

1. **Get your copy.** Click **Use this template** (or **Fork**) at the top of this page.
2. **Make it yours.** Open `index.html` and replace the placeholders: search for `Jane`, `Example` and `your-`. Swap in your photo, links, projects and papers ([what goes where](#make-it-yours)).
3. **Put it online.** In your copy, open **Settings → Pages** and choose **Deploy from a branch → `main` → `/ (root)`**. About a minute later it's live at `https://<you>.github.io/<repo>/`.

That's all. For your own domain, or to count visits privately, see [Cloudflare](#optional-your-domain-and-private-counts-on-cloudflare).

To preview on your computer first, run `python3 -m http.server` in the folder and open <http://localhost:8000>.

## Make it yours

Everything lives in **`index.html`**, in plain HTML.

| What | Where |
|---|---|
| **Name, tagline, photo** | `<h1 data-name>` (text inside `<i>` turns blue), `<p data-tagline>`, and `<img data-photo>`. Put your square photo in `assets/` and point `src` at it. |
| **Links** | `<nav data-icons>` at the top: Email, Scholar, LinkedIn, GitHub and CV. Put your CV at `assets/your-cv.pdf`. |
| **Research cards** | `<ul data-shelf="now">`. Each `<li data-item>` is one card: a drawing, a kind label and a title, plus a question and a short paragraph in its details. |
| **Papers** | `<ul data-shelf="pub">`. Each card has a short title, journal and year, and in its details the full title, authors (wrap your name in `<b>`), a summary and a link. |
| **Search and sharing** | `<head>`: title, description, the `og:*` / `twitter:*` tags and the JSON-LD block. Replace `assets/og-card.png` (1200×630), `favicon.ico`, `assets/favicon-192.png`, `robots.txt` and `sitemap.xml`. |

<details>
<summary>Adding or removing cards</summary>
<br>

The rows are sized for 3 research cards and 4 papers. To change that:

1. Copy or delete a whole `<li data-item>` block.
2. Give a new card a unique `data-k` and matching ids (`zl8p-f-<k>`, `zl8p-t-<k>`, `zl8p-d-<k>`).
3. Add the key to the `SHELVES` list in the script at the bottom.
4. Add a `view-transition-name` line for it next to the others (search for `zl-f-now1`).

A different count per row also means adjusting `--n`, `--face` and the 956 px breakpoint in the CSS.
</details>

<details>
<summary>Drawings</summary>
<br>

Each card's drawing is an inline SVG with a 360×225 viewBox. The placeholders use the page's ink palette through CSS variables (`--sk-ink`, `--sk-ink-soft`, `--sk-paper`, `--sk-sage`, `--sk-gold`, `--sk-sky`, `--sk-clay`, `--sk-rose`, `--sk-accent`), so a drawing that uses them switches with light and dark by itself. Any part with a `data-anim` attribute and a CSS animation keeps moving; it pauses under reduced motion, while its card is folded, and during the load intro.
</details>

## Optional: your domain and private counts on Cloudflare

GitHub Pages is enough to publish. Cloudflare adds your own domain and a small Worker (`worker/index.js`) that counts visits and CV downloads without cookies.

<details>
<summary>Cloudflare setup</summary>
<br>

1. **Create a KV namespace** in the Cloudflare dashboard (**Storage & Databases → KV → Create**) and paste its id into `wrangler.jsonc`, replacing `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.
2. **Connect the repository** (**Workers & Pages → Create → Connect to Git**). Each push to `main` then deploys.
3. **Set the `IP_SALT` secret**, which makes the hashed visitor IPs unguessable:
   ```bash
   openssl rand -hex 32 | npx wrangler secret put IP_SALT
   ```
4. **Add your domain** under **Workers & Pages → your project → Settings → Domains & Routes**. If you serve both `example.com` and `www.example.com`, set `APEX_HOST` at the top of `worker/index.js` to `example.com`, and `www` will redirect to it. Set `SITE_LIVE_DATE` there too.
5. **Optional: Google Search Console.** Uncomment the `google-site-verification` tag in `index.html`, paste your token, and submit `sitemap.xml`.

To run the whole thing locally, with the Worker and a simulated KV store: `npx wrangler dev`.

The Worker serves the site with security headers and adds:

| Endpoint | What it does |
|---|---|
| `POST /api/cv-download` | Counts a CV download (the CV link sends it) |
| `GET /api/cv-stats` | Total CV downloads, by country |
| `GET /api/visits`, `GET /api/stats` | Visit counts by city (not shown on the page) |
</details>

<details>
<summary>Privacy</summary>
<br>

- **No raw IP addresses are stored.** Repeat visits are recognised by `SHA-256(ip + IP_SALT)`, cut to 64 bits and deleted after 24 hours; after that there is nothing left to link back to anyone.
- **Only city, country, coordinates and a count** are kept for each city. No user agents, cookies or fingerprinting.
- **The page itself calls no one else.** The fonts are self-hosted, and there are no analytics scripts or CDNs.
- **Bots are filtered out** before anything is counted (see `isProbablyBot()` in `worker/index.js`).
</details>

<details>
<summary>What's in the box</summary>
<br>

```
.
├── index.html          the whole page: content, styles and a small script
├── assets/
│   ├── headshot.svg    placeholder photo (replace)
│   ├── og-card.png     1200×630 link-preview card (replace)
│   ├── favicon-192.png site icon (replace)
│   ├── tex-*.webp      the paper's grain
│   └── fonts/          Newsreader and EB Garamond, self-hosted (SIL Open Font License)
├── favicon.ico
├── robots.txt, sitemap.xml
├── worker/index.js     optional Cloudflare Worker: counts and security headers
├── wrangler.jsonc      its configuration
└── .github/readme/     the pictures on this page (not deployed)
```
</details>

## License

[MIT](LICENSE). The fonts keep their own SIL Open Font License (texts in `assets/fonts/`).
