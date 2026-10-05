# RMFC Nepal – Frontend

Frontend rebuild of [rmfcn.com](https://rmfcn.com/): Real Madrid Fan Club Nepal.
React 18 + Vite + Tailwind CSS. No backend, CMS or database: all content lives in static files in `src/data/`.

## Quick start

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
npm run format    # Prettier (src/)
```

Requires Node 18+.

## Tech stack

| Purpose | Package |
|---|---|
| Build | Vite 8, React 18 |
| Routing | react-router-dom 6 (routes are code-split with `React.lazy`) |
| Styling | Tailwind CSS 3 (tokens in `tailwind.config.js`) |
| Animation | framer-motion (LazyMotion) |
| Lightbox | yet-another-react-lightbox |
| Icons | lucide-react, react-icons |
| SEO | react-helmet-async |

## Folder guide

```
public/
  images/{hero,gallery,partners,team,logo}/   WebP images (served as-is)
  data/nepal-districts.geojson                 district shapes for the wings map
src/
  components/
    common/    Button, Container, Card, Badge, SectionHeading, PageBanner, Reveal, Seo, ...
    layout/    Header, MobileMenu, SearchOverlay, Footer, Layout
    home/      one component per Home section
    about/ blog/ gallery/ forms/
  data/        ALL site content (see below)
  pages/       one file per route
  routes/      AppRoutes.jsx (route table)
  context/     CartContext (unused while the shop is "Coming Soon")
  hooks/ utils/
```

Path alias: `@` → `src` (for example `import Button from '@/components/common/Button'`).

## Editing content (`src/data/`)

No component contains hard-coded copy. To change the site, edit the data file and save.

| To change… | Edit |
|---|---|
| Header menu and dropdowns (About Us, Contact, Register) | `navigation.js` (`navItems`, `authMenu`) |
| Footer, contact details, social links, site URL / SEO description | `site.js` |
| Landing hero text and buttons | `hero.js` (trophy image: `public/images/hero/ucl-trophy.webp`) |
| Home "About" text | `about.js`; full About page and board of directors: `aboutPage.js` |
| Matches, match detail pages and the "Next match" card | `matches.js` (`recentMatches`; set `nextMatch` to show a fixture, `null` shows "TBA") |
| Legacy numbers | `legacy.js` |
| President's message | `president.js` |
| Gallery photos | `gallery.js` (images in `public/images/gallery/`) |
| Blog posts | `blog.js` (each post: slug, date, category, excerpt, `body` paragraphs) |
| Partners | `partners.js` |
| Wings (members, districts, map coordinates) | `wings.js` |
| Events | `events.js` (`{ slug, title, category, date: 'YYYY-MM-DD', venue, description }`) |
| Shop notice / products | `products.js` |
| Form fields and messages | `forms.js` |
| "Become a Madridista" banner and its three perks | `cta.js` |

Adding an image: put a `.webp` file in `public/images/...` and reference it as `/images/...`.
Convert JPG/PNG first (for example with [squoosh.app](https://squoosh.app)) to keep pages fast.

## Notes

- **Forms** (Join Club, Contact, Login, Register) validate in the browser only. A valid submit logs to the
  console and shows a confirmation; nothing is sent anywhere.
- **Shop / Cart** show "Coming Soon", matching the live site.
- **Loading screen**: a two-panel crown + trophy splash (`components/layout/Splash.jsx`) shows once per browser session.
- **Fonts**: Anton (`font-display`) for statements and numbers, Montserrat for headings, Open Sans for body text.
- **Search** (header) covers pages, blog posts, wings, matches, events and products.
- **SEO**: set `site.url` in `src/data/site.js` to the deployed domain so canonical and Open Graph URLs are correct.

## Live match data (FotMob)

The Home "Matchday" section shows the next Real Madrid fixture and the last 5 results from FotMob.
The browser never calls FotMob: the frontend calls our backend (`GET /api/matches`), which fetches
`https://www.fotmob.com/api/data/teams?id=8633`, normalizes it and caches it in memory.

| Where | Variable | Default |
| --- | --- | --- |
| `frontend/.env` | `VITE_API_BASE_URL` | `http://localhost:5000` |
| `backend/.env` | `FOTMOB_TEAM_ID` | `8633` |
| `backend/.env` | `FOTMOB_BASE_URL` | `https://www.fotmob.com` |
| `backend/.env` | `FOTMOB_CACHE_TTL_SECONDS` | `300` |
| `backend/.env` | `CORS_ORIGIN` | `http://localhost:5173` (the frontend origin) |

- **Cache:** FotMob is called at most once per TTL. If FotMob fails, the last cached data is served; the
  endpoint returns `502` only when nothing is cached. `/api/matches` is rate-limited to 60 requests/min per IP.
- **Fallback:** if the backend is down, the section shows the static data from `src/data/matches.js`
  with a small "Live data unavailable" note.
- **Match pages:** `/match/:id` works for both static slugs and FotMob ids (live results).
- **Refreshing the sample:** `docs/fotmob-sample.json` is a trimmed real response used by the backend tests
  (`cd backend && npm test`). Re-download the endpoint, trim it as described in `docs/fotmob-notes.md`, and re-run the tests.
- **Risk:** the FotMob endpoint is unofficial and undocumented. It can change shape or start blocking requests
  without notice; only `backend/src/services/fotmob.normalizer.js` depends on its shape. Data is for display only
  and credited to FotMob in the section footer.

## Deploying

The site is a static single-page app; every route must fall back to `index.html`.
Both configs are included:

- **Netlify**: connect the repo. `netlify.toml` sets the build command, publish folder and SPA redirect.
- **Vercel**: import the repo (framework preset: Vite). `vercel.json` adds the SPA rewrite.

Build command: `npm run build`, output directory: `dist`.
