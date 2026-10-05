# RMFC Nepal – Frontend Rebuild Sprint Plan

Source site: https://rmfcn.com/
Scope: Frontend only. React.js, no CMS, no backend, no database. All content lives in static data files.

---

## 1. Tech Stack

| Purpose | Choice |
|---|---|
| Build tool | Vite + React 18 |
| Routing | react-router-dom v6 |
| Styling | Tailwind CSS (tokens in `tailwind.config.js`) |
| Icons | lucide-react, react-icons (social) |
| Carousel / slider | Swiper |
| Map (Wings) | react-simple-maps or static SVG of Nepal |
| Animation | framer-motion |
| Lightbox (Gallery) | yet-another-react-lightbox |
| Cart state | React Context + `useReducer` (in-memory only) |
| Lint / format | ESLint + Prettier |

---

## 2. Project Structure

```
rmfcn-frontend/
├── public/
│   ├── favicon.png
│   └── images/                     # downloaded site images (see section 5)
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── gallery/
│   │   │   ├── partners/
│   │   │   └── logo/
│   │   └── icons/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── home/
│   │   │   ├── HeroSlider.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── MatchSection.jsx
│   │   │   ├── LegacyStats.jsx
│   │   │   ├── PresidentMessage.jsx
│   │   │   ├── GalleryPreview.jsx
│   │   │   ├── BlogPreview.jsx
│   │   │   ├── PartnersGrid.jsx
│   │   │   ├── WingsMap.jsx
│   │   │   └── CTABanner.jsx
│   │   ├── blog/
│   │   │   └── BlogCard.jsx
│   │   ├── gallery/
│   │   │   ├── GalleryGrid.jsx
│   │   │   └── Lightbox.jsx
│   │   ├── shop/
│   │   │   ├── ProductCard.jsx
│   │   │   └── CartDrawer.jsx
│   │   └── forms/
│   │       ├── JoinClubForm.jsx
│   │       ├── ContactForm.jsx
│   │       ├── LoginForm.jsx
│   │       └── RegisterForm.jsx
│   ├── data/                       # static content (replaces CMS)
│   │   ├── navigation.js
│   │   ├── hero.js
│   │   ├── about.js
│   │   ├── matches.js
│   │   ├── legacy.js
│   │   ├── president.js
│   │   ├── gallery.js
│   │   ├── blog.js
│   │   ├── partners.js
│   │   ├── wings.js
│   │   ├── events.js
│   │   ├── products.js
│   │   └── site.js                 # contact, socials, footer links
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Wings.jsx
│   │   ├── WingDetail.jsx
│   │   ├── Events.jsx
│   │   ├── Gallery.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   ├── JoinClub.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MatchDetail.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── hooks/
│   │   ├── useScrollPosition.js
│   │   └── useMediaQuery.js
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── formatDate.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 3. Design Tokens

> The page fetch returned content only, not the stylesheet. Values below are provisional Real Madrid palette. **Sprint 0 task S0-3 replaces them with exact values** pulled from the live site's CSS via browser DevTools.

```js
// tailwind.config.js (provisional)
colors: {
  brand: {
    navy:  '#0B1F3A',   // headings, header, footer  (verify)
    gold:  '#C9A24B',   // accents, CTAs             (verify)
    white: '#FFFFFF',
    light: '#F5F6F8',   // section backgrounds       (verify)
    dark:  '#0A0A0A',   // overlays                  (verify)
  }
}
fontFamily: { heading: ['<verify>'], body: ['<verify>'] }
```

---

## 4. Content Inventory (use verbatim)

### 4.1 Navigation
Home · About Us · Wings · Events · Gallery · Blog · Shop · Join Club · Contact
Header extras: Search, Cart, Login, Register

### 4.2 Hero Slides (3)

| # | Eyebrow | Heading | Sub text | CTA | Link |
|---|---|---|---|---|---|
| 1 | Real Madrid Fan Club Nepal | Nepal's Official Madridista Community | A home for every Nepalese Madridista to connect, support, and live the spirit of Real Madrid together. | Join Now | /join-club |
| 2 | Match Screening | Watch Together. Cheer Together. | Experience match-day energy with fellow Madridistas. | View Events | /events |
| 3 | Official Merchandise | Wear The White Pride | Shop jerseys, caps, hoodies, accessories & more. | Shop Now | /shop |

### 4.3 About (Who We Are)
**Heading:** About Our Real Madrid Fan Club Nepal

> We are a passionate community of Real Madrid supporters united by our love for the most successful football club in history. Founded by devoted fans, our fan club exists to celebrate the legacy, values, and spirit of Real Madrid Club de Fútbol.
>
> From legendary moments at the Santiago Bernabéu to unforgettable Champions League nights, we bring fans together to relive history, share emotions, and support Los Blancos through every victory and challenge.
>
> Beyond football, we promote friendship, respect, and sportsmanship while organizing events, watch parties, social activities, and charitable initiatives.
>
> **Hala Madrid y Nada Más.**

### 4.4 Matchday – Recent Results

| Match | Competition | Date | Score | Slug |
|---|---|---|---|---|
| Atletico Madrid vs Real Madrid | LaLiga | September 20, 2026 | 2 - 1 | laliga-matchday-7 |
| Elche vs Real Madrid | LaLiga | September 16, 2026 | 2 - 3 | laliga-matchday-6 |
| Real Madrid vs Rayo Vallecano | LaLiga | September 13, 2026 | 4 - 1 | laliga-matchday-5 |
| Real Madrid vs Inter Milan | UEFA Champions League | September 9, 2026 | 2 - 1 | ucl-matchday-1 |
| Real Betis vs Real Madrid | LaLiga | September 5, 2026 | 1 - 0 | laliga-matchday-4 |

Section label: Matchday · Heading: Next Match & Recent Results · Sub heading: Recent Results

### 4.5 Legacy (The Most Decorated Club)

| Icon | Value | Label |
|---|---|---|
| Trophy | 15 | Champions League |
| Medal | 36 | La Liga |
| Trophy | 20 | Copa del Rey |
| Globe | 8 | Club World Cup |

### 4.6 President's Message
**Label:** Leadership · **Heading:** President's Message
**Name:** Rajan Shrestha · **Title:** President, Real Madrid Fan Club Nepal

> RMFCN has always felt like my second home. Establishing a supporters' club back in 2014 was never easy, but with unity, passion, and dedication, we turned that dream into reality. After years of hard work and commitment, our fan club proudly received official recognition from Real Madrid six years later, which remains one of our greatest achievements.
>
> Despite personal responsibilities and busy lives, every past and present Board of Directors has contributed valuable time and effort to take this fan club to greater heights. I sincerely thank each and every individual who has supported RMFCN throughout this incredible journey.
>
> I warmly welcome all Nepalese Madridistas to join our family and continue sharing the love, passion, loyalty, and dedication for our beloved club, Real Madrid. Together, let us make RMFCN bigger, stronger, and more united every single year. Hala Madrid y Nada Más.

### 4.7 Gallery
**Label:** Moments · **Heading:** Gallery · **Caption on all items:** Kathmandu Wing · Meetups · **CTA:** View Full Gallery → /gallery
8 images (URLs in section 5).

### 4.8 Blog
**Label:** Latest Stories · **Heading:** From The Blog · **Link:** View all posts

| Date | Category | Title | Excerpt |
|---|---|---|---|
| August 10, 2026 | Fan Story | My Journey As Madridista – Prabesh Pokhrel | It all began around the 2010–11 preseason. I can't remember the exact match, but I still remember the feeling. The moment I saw Real… |

CTA: Read more →

### 4.9 Partners
**Label:** Our Partners · **Heading:** Trusted By The Best
**Sub text:** Proudly supported by partners who share our love for the game and our ambition for the future

Benchwarmers Nepal (link: https://www.benchwarmers.com.np/) · Chitwan Cake House · बगैंचा · Surox Technology · Subham Law Institute · Access Education Network · Kitab Yatra · Chant · Stryde.np

### 4.10 Wings Across Nepal
**Label:** Our Wings Across Nepal · **Heading:** Wings Across Nepal
**Sub text:** Explore our regional wings across Nepal — pins mark wing bases, colored areas show district coverage.

Wings: Jumla · Kathmandu · Nuwakot · Pokhara · Butwal · Province 1 · Chitwan
Routes: `/wings/jumla-wing`, `/wings/kathmandu-wing`, `/wings/nuwakot-wing`, `/wings/pokhara-wing`, `/wings/butwal-wing`, `/wings/province1-wing`, `/wings/chitwan-wing`

### 4.11 CTA Banner
**Heading:** Become a Madridista Member Today
**Sub text:** Join our community and enjoy exclusive access to screenings, merch, and events.
**Buttons:** Join Club · Shop Merchandise

### 4.12 Footer
- **Brand:** RMFC Nepal – The biggest Real Madrid supporter community in Nepal. United by passion, driven by legacy.
- **Socials:** Facebook https://www.facebook.com/rmfcn · Instagram https://www.instagram.com/rmfcnepal · X https://x.com/RMFCNepal · YouTube https://www.youtube.com/@rmfcnepal
- **Quick Links:** About Us, Events, Blog, Gallery, Join Club, Contact
- **Shop Categories:** Jersey, Hoodie, Cap, Scarf, Accessories
- **Contact:** Kathmandu, Nepal · +977 9803686004 · email (obfuscated on source site; copy from live site, Sprint 0 task S0-4)
- **Copyright:** © 2026 Real Madrid Fan Club Nepal. All rights reserved. Designed and developed By Surox Technology (https://suroxtec.com)
- **Tagline:** Hala Madrid y Nada Más

---

## 5. Image Inventory

Download all to `public/images/` in Sprint 0 (task S0-2) so the project does not hotlink.

| Use | URL |
|---|---|
| Logo | https://rmfcn.com/wp-content/themes/RMFC/assets/images/rmfcn-logo.png |
| Favicon | https://rmfcn.com/wp-content/uploads/2026/05/cropped-015546-RMFCN-logo-3-270x270.png |
| Hero 1 | https://rmfcn.com/wp-content/uploads/2026/05/image_2026-05-14_123322069-1920x978.png |
| Hero 2 | https://rmfcn.com/wp-content/uploads/2026/05/FB_IMG_1656695316172.png |
| Hero 3 | https://rmfcn.com/wp-content/uploads/2026/05/0x0.webp |
| About image 1 | https://rmfcn.com/wp-content/uploads/2026/05/20221016_220238-1024x768.jpg |
| About image 2 | https://rmfcn.com/wp-content/uploads/2026/05/image_2026-05-14_123322069-1024x489.png |
| President | https://rmfcn.com/wp-content/uploads/2026/05/image_2026-05-14_194749943-e1778767443261-768x807.png |
| Gallery 1 | https://rmfcn.com/wp-content/uploads/2026/08/FB_IMG_1785672522733.jpg |
| Gallery 2 | https://rmfcn.com/wp-content/uploads/2026/08/FB_IMG_1785672512972.jpg |
| Gallery 3 | https://rmfcn.com/wp-content/uploads/2026/08/FB_IMG_1785672624615.jpg |
| Gallery 4 | https://rmfcn.com/wp-content/uploads/2026/08/FB_IMG_1785672540915.jpg |
| Gallery 5 | https://rmfcn.com/wp-content/uploads/2026/08/IMG_6800-scaled.jpg |
| Gallery 6 | https://rmfcn.com/wp-content/uploads/2026/08/IMG_6915-scaled.jpg |
| Gallery 7 | https://rmfcn.com/wp-content/uploads/2026/08/IMG_7277-scaled.jpg |
| Gallery 8 | https://rmfcn.com/wp-content/uploads/2026/08/IMG_8009-scaled.jpg |
| Partner – Benchwarmers | https://rmfcn.com/wp-content/uploads/2026/07/BenchWarmersNepal-1-4-1-768x768.png |
| Partner – Chitwan Cake House | https://rmfcn.com/wp-content/uploads/2026/07/CCH-LOGO-FINAL-768x768.jpg |
| Partner – बगैंचा | https://rmfcn.com/wp-content/uploads/2026/07/1000064419-removebg-1-e1785730863743-768x635.png |
| Partner – Surox Technology | https://rmfcn.com/wp-content/uploads/2026/07/suroxx-768x283.png |
| Partner – Subham Law Institute | https://rmfcn.com/wp-content/uploads/2026/07/FB_IMG_1765391171386-768x768.jpg |
| Partner – Access Education Network | https://rmfcn.com/wp-content/uploads/2026/07/Access-e1785730697264-768x411.jpg |
| Partner – Kitab Yatra | https://rmfcn.com/wp-content/uploads/2026/07/logo-1.png |
| Partner – Chant | https://rmfcn.com/wp-content/uploads/2026/07/Chant_Brandmark_Tagline_Red-768x325.png |
| Partner – Stryde.np | https://rmfcn.com/wp-content/uploads/2026/08/stryde-logo-768x270.png |
| CTA banner background | https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80 |

---

## 6. Sprint Plan

Suggested cadence: 1-week sprints. Each task has a checkbox and a definition of done.

---

### Sprint 0 – Setup & Discovery

**Goal:** Working project skeleton and verified design tokens.

- [ ] **S0-1** Scaffold project: `npm create vite@latest rmfcn-frontend -- --template react`
- [ ] **S0-2** Download every image from section 5 into `public/images/` (subfolders: hero, gallery, partners, logo). Update paths in data files.
- [ ] **S0-3** Extract exact colors, fonts, font sizes, spacing, border radius, shadows from the live site using DevTools. Update section 3 and `tailwind.config.js`.
- [ ] **S0-4** Copy remaining content not captured here: email address, Events page, About page, Wings page, Shop products, Join Club form fields, Contact page, full blog post text.
- [ ] **S0-5** Install dependencies: `react-router-dom tailwindcss postcss autoprefixer swiper framer-motion lucide-react react-icons yet-another-react-lightbox`
- [ ] **S0-6** Configure Tailwind, ESLint, Prettier, path alias `@` → `src`.
- [ ] **S0-7** Create folder structure from section 2 (empty files are fine).
- [ ] **S0-8** Set up Google Fonts / local fonts and global base styles.

**Done when:** `npm run dev` runs, tokens match live site, all images are local.

---

### Sprint 1 – Foundation & Layout

**Goal:** Shared layout, routing, and reusable UI primitives.

- [ ] **S1-1** `AppRoutes.jsx` with all routes from section 7; `NotFound` page.
- [ ] **S1-2** `Layout.jsx` with `Header`, `Outlet`, `Footer`, `ScrollToTop`.
- [ ] **S1-3** `Header.jsx`: logo, 9 nav links, search, cart icon with count, Login / Register links, sticky on scroll, active link state.
- [ ] **S1-4** `MobileMenu.jsx`: slide-in drawer, close on route change.
- [ ] **S1-5** `Footer.jsx`: brand block, socials, Quick Links, Shop Categories, Contact, copyright, tagline (from `site.js`).
- [ ] **S1-6** Common components: `Button` (primary, outline, ghost), `Container`, `SectionHeading` (label + title + subtitle), `Card`, `Badge`.
- [ ] **S1-7** Create all `data/*.js` files with content from section 4.
- [ ] **S1-8** "Skip to content" link and basic accessibility landmarks.

**Done when:** All routes render a placeholder page inside a fully working, responsive header and footer.

---

### Sprint 2 – Home Page (Top Half)

**Goal:** Hero through Legacy sections.

- [ ] **S2-1** `HeroSlider.jsx`: 3 slides, autoplay, fade/slide transition, dark overlay, eyebrow + heading + text + CTA, dots/arrows.
- [ ] **S2-2** `AboutSection.jsx`: two-column layout, text content, two stacked/overlapping images.
- [ ] **S2-3** `MatchSection.jsx`: Recent Results list, competition tag, date, score; each row links to `/match/:slug`. Placeholder slot for "Next Match".
- [ ] **S2-4** `LegacyStats.jsx`: 4 stat cards with icon, count-up animation on scroll into view.
- [ ] **S2-5** `PresidentMessage.jsx`: portrait image, message paragraphs, name and title.
- [ ] **S2-6** Section scroll-reveal animations (framer-motion).

**Done when:** Home page from hero to president's message matches the live site at 1440, 768 and 375 px.

---

### Sprint 3 – Home Page (Bottom Half)

**Goal:** Complete the home page.

- [ ] **S3-1** `GalleryPreview.jsx`: 8-image grid, hover overlay with "Kathmandu Wing · Meetups", View Full Gallery button.
- [ ] **S3-2** `BlogPreview.jsx` + `BlogCard.jsx`: date, category badge, title, excerpt, Read more.
- [ ] **S3-3** `PartnersGrid.jsx`: 9 logos, grayscale-to-color hover, Benchwarmers links out. Optional marquee on mobile.
- [ ] **S3-4** `WingsMap.jsx`: Nepal map with 7 pins, district coverage colors, clickable wing list linking to wing pages, hover tooltip.
- [ ] **S3-5** `CTABanner.jsx`: background image with overlay, heading, text, Join Club and Shop Merchandise buttons.
- [ ] **S3-6** Compose all sections in `Home.jsx` in the same order as the live site.

**Done when:** Full home page is visually complete and responsive.

---

### Sprint 4 – About, Wings, Events

**Goal:** Informational inner pages.

- [ ] **S4-1** `About.jsx`: page banner, who we are, mission, president message, legacy stats (reuse components).
- [ ] **S4-2** `Wings.jsx`: map + grid of 7 wing cards.
- [ ] **S4-3** `WingDetail.jsx`: dynamic by slug from `wings.js`; name, base, coverage, description, related gallery images.
- [ ] **S4-4** `Events.jsx`: event cards, upcoming / past filter tabs, date, venue, description.
- [ ] **S4-5** `MatchDetail.jsx`: scoreboard header, competition, date, result.
- [ ] **S4-6** Shared `PageBanner` component for inner pages.

**Done when:** All five pages are navigable from the header and footer with real content.

---

### Sprint 5 – Gallery & Blog

**Goal:** Media and content pages.

- [ ] **S5-1** `Gallery.jsx`: masonry/grid, category filter (Meetups, etc.), lazy-loaded images.
- [ ] **S5-2** `Lightbox.jsx`: fullscreen viewer with next/prev, keyboard support, caption.
- [ ] **S5-3** `Blog.jsx`: post grid, category filter, client-side search.
- [ ] **S5-4** `BlogPost.jsx`: dynamic by slug, title, date, category, full article body, back link, related posts.
- [ ] **S5-5** Add the full text of "My Journey As Madridista – Prabesh Pokhrel" to `blog.js`.

**Done when:** Gallery opens in lightbox and blog list/detail routes work.

---

### Sprint 6 – Shop & Cart (Static)

**Goal:** Front-end-only commerce UI.

- [ ] **S6-1** `products.js`: products grouped by Jersey, Hoodie, Cap, Scarf, Accessories (copy from live Shop page).
- [ ] **S6-2** `Shop.jsx`: category filter, sort, product grid.
- [ ] **S6-3** `ProductCard.jsx`: image, name, price, add to cart.
- [ ] **S6-4** `CartContext.jsx`: add, remove, update quantity, totals (in-memory only).
- [ ] **S6-5** `CartDrawer.jsx` and `Cart.jsx` page with line items and subtotal.
- [ ] **S6-6** Checkout button shows a static "Contact us to order" state (no payment).

**Done when:** User can browse, add to cart, change quantities and see totals.

---

### Sprint 7 – Forms & Auth UI

**Goal:** Form interfaces with client-side validation only.

- [ ] **S7-1** `JoinClub.jsx` + `JoinClubForm.jsx` with required fields and validation.
- [ ] **S7-2** `Contact.jsx` + `ContactForm.jsx` with contact details block (address, phone, email) and map embed placeholder.
- [ ] **S7-3** `Login.jsx` + `LoginForm.jsx`.
- [ ] **S7-4** `Register.jsx` + `RegisterForm.jsx`.
- [ ] **S7-5** Success / error UI states. Submit handlers log to console and show a confirmation message (no network calls).
- [ ] **S7-6** Header search overlay with client-side search over blog, events, products.

**Done when:** All forms validate and show success states without any backend.

---

### Sprint 8 – Polish, QA & Delivery

**Goal:** Production-ready frontend.

- [ ] **S8-1** Responsive QA at 375, 768, 1024, 1440 px for every page.
- [ ] **S8-2** Compare each page against the live site, fix spacing, typography and color differences.
- [ ] **S8-3** Accessibility pass: alt text, focus states, contrast, keyboard navigation, aria labels.
- [ ] **S8-4** Performance: lazy-load images, convert to WebP, code-split routes with `React.lazy`, Lighthouse score above 90.
- [ ] **S8-5** SEO basics: `react-helmet-async` titles and meta per page, Open Graph tags, favicon.
- [ ] **S8-6** Cross-browser check: Chrome, Firefox, Safari, mobile Safari.
- [ ] **S8-7** Write `README.md`: install, run, build, folder guide, how to edit static content in `src/data/`.
- [ ] **S8-8** Production build and deploy to Netlify or Vercel.

**Done when:** `npm run build` succeeds, Lighthouse targets met, and the site is deployed.

---

## 7. Route Map

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/wings` | Wings |
| `/wings/:slug` | WingDetail |
| `/events` | Events |
| `/gallery` | Gallery |
| `/blog` | Blog |
| `/blog/:slug` | BlogPost |
| `/shop` | Shop |
| `/cart` | Cart |
| `/join-club` | JoinClub |
| `/contact` | Contact |
| `/login` | Login |
| `/register` | Register |
| `/match/:slug` | MatchDetail |
| `*` | NotFound |

---

## 8. Data File Shape (example)

```js
// src/data/matches.js
export const recentMatches = [
  {
    slug: 'laliga-matchday-7',
    home: 'Atletico Madrid',
    away: 'Real Madrid',
    competition: 'LaLiga',
    date: '2026-09-20',
    score: '2 - 1',
  },
  // ...
];
```

```js
// src/data/wings.js
export const wings = [
  { slug: 'kathmandu-wing', name: 'Kathmandu Wing', base: 'Kathmandu', coords: [0, 0], districts: [] },
  // coords and districts to be filled from the live site's map in S0-4
];
```

---

## 9. Definition of Done (all tasks)

- Matches the live site's content, colors and images.
- Responsive from 375 px to 1440 px.
- No hard-coded content inside components; content comes from `src/data/`.
- No console errors or warnings.
- Components are reusable and under ~150 lines where practical.
