# TETRAform Landing Page — Instructions & Strategy

**Last updated:** March 2026
**Repo:** `github.com/vibetect/TETRAform_landing`
**Live URL:** `https://tetraform.app`
**Chrome Web Store:** `https://chromewebstore.google.com/detail/tetraform-smart-form-auto/acgapenhjikhpeicknacehlkalpemigb`

---

## Table of Contents

1. [Repo Structure](#1-repo-structure)
2. [How to Edit & Deploy](#2-how-to-edit--deploy)
3. [GitHub Pages Setup (one-time)](#3-github-pages-setup-one-time)
4. [Custom Domain via Cloudflare](#4-custom-domain-via-cloudflare)
5. [Tech Stack](#5-tech-stack)
6. [Design System](#6-design-system)
7. [Page Structure & Sections](#7-page-structure--sections)
8. [Copy Strategy & SEO](#8-copy-strategy--seo)
9. [Target Keywords](#9-target-keywords)
10. [Target Personas](#10-target-personas)
11. [Three Differentiators to Emphasise Everywhere](#11-three-differentiators-to-emphasise-everywhere)
12. [Image Assets](#12-image-assets)
13. [Off-Site SEO Actions](#13-off-site-seo-actions)
14. [Implementation Checklist](#14-implementation-checklist)

---

## 1. Repo Structure

```
TETRAform_landing/
├── index.html              ← landing page
├── privacy.html            ← privacy policy page
├── shared.js               ← reusable header & footer (single source of truth)
├── CNAME                   ← tetraform.app (GitHub Pages custom domain)
├── CLAUDE.md               ← agent rules for this repo
├── .gitignore
├── public/                 ← icons + screenshots
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   ├── tetraform-logo.png
│   └── screenshots/        ← pre-cropped product UI images from web store
│       ├── main.jpg
│       ├── feature-profiles.jpg
│       ├── feature-autofill.jpg
│       └── feature-popup.jpg
└── docs/
    ├── LANDING-PAGE.md     ← this file
    └── PRIVACY_POLICY.md
```

No build step. No npm. No node_modules. Just push `index.html` and it's live.

---

## 2. How to Edit & Deploy

1. Open `index.html` in your editor
2. Make changes
3. Commit and push to `main`

```bash
git add index.html
git commit -m "update landing page copy"
git push
```

GitHub Pages re-serves the updated file automatically within ~30 seconds.

---

## 3. GitHub Pages Setup (one-time)

Do this once in the GitHub UI — cannot be automated without the `gh` CLI:

1. Go to `github.com/vibetect/TETRAform_landing`
2. **Settings** → **Pages**
3. Under **Source** → select **"Deploy from a branch"**
4. Branch: `main` → Folder: `/ (root)` → **Save**
5. Under **Custom domain** → enter `tetraform.app` → **Save**

GitHub will verify the domain after the DNS records are set (see Section 4).

---

## 4. Custom Domain via Cloudflare

### DNS records (add in Cloudflare dashboard)

| Type  | Name | Value                | Proxy |
|-------|------|----------------------|-------|
| A     | @    | 185.199.108.153      | DNS only (grey) |
| A     | @    | 185.199.109.153      | DNS only (grey) |
| A     | @    | 185.199.110.153      | DNS only (grey) |
| A     | @    | 185.199.111.153      | DNS only (grey) |
| CNAME | www  | vibetect.github.io   | DNS only (grey) |

Keep proxy **off (grey cloud)** until GitHub finishes domain verification. Once Pages shows "DNS check successful" you can re-enable Cloudflare proxying.

### Email (contact@tetraform.app)

Set up in Cloudflare Email Routing:
1. Cloudflare Dashboard → **Email Routing** → **Enable**
2. Add destination address: your Gmail
3. Add rule: `contact@tetraform.app` → forward to Gmail
4. Cloudflare adds the required MX records automatically

---

## 5. Tech Stack

| Layer | What | Why |
|---|---|---|
| CSS framework | DaisyUI v5 via CDN | Same library as the extension (corporate theme) |
| Utility classes | Tailwind CSS v4 via CDN (`@tailwindcss/browser@4`) | No build step; CDN generates utilities on the fly |
| Theme | DaisyUI `corporate` (light) | Identical to the extension's popup/settings UI |
| Font | Inter via Google Fonts | Polish on marketing copy |
| Icons | Lucide via CDN (`unpkg.com/lucide@latest`) | Consistent with extension (lucide-react) |
| Hosting | GitHub Pages | Free, git-based, custom domain support |

All dependencies are loaded from CDN — no `package.json`, no `npm install` required.

**CDN links in `<head>`:**
```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
<link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

**Scripts before `</body>`:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

---

## 6. Design System

The landing page intentionally mirrors the extension's visual identity.

### Brand gradient (header ONLY)
Exact match to `HeaderBar.tsx` in the extension:
```css
background-image: linear-gradient(to right, #06b6d4, #2563eb);
```
Applied via `.brand-gradient` utility class (defined in `<style>` block in each HTML file).
**Rule:** Gradient is used ONLY on the header bar — never on hero, CTA, step circles, feature icons, or other elements.

### DaisyUI corporate theme
Full oklch color system with sharp corners (0.25rem), 1px borders, no depth/noise:
```css
--radius-box: 0.25rem;
--radius-field: 0.25rem;
--radius-selector: 0.25rem;
--border: 1px;
--depth: 0;
--noise: 0;
--color-primary: oklch(58% 0.158 241.966);
--color-accent: oklch(60% 0.118 184.704);
```

### Colour usage
| Element | Class |
|---|---|
| Header | `.brand-gradient sticky top-0 z-50` (cyan→blue) |
| White sections | `bg-base-100` (white) |
| Alternating sections | `bg-section-alt` (oklch 96.5% — lighter than base-200) |
| Footer | `bg-base-200` (light grey) |
| Cards | `border border-base-200 shadow-sm` |
| Primary CTA button | `btn btn-primary` (blue) |
| CTA banner card | `bg-primary text-primary-content` (solid blue) |
| Feature icon boxes | `bg-primary/10 text-primary rounded-lg` (light tinted) |
| Step number circles | `bg-primary text-primary-content rounded-full` |

### Icons
All icons use Lucide via CDN. Use `<i data-lucide="icon-name" class="w-5 h-5">` syntax.
CTA buttons use `data-lucide="chrome"` for the Chrome icon.

---

## 7. Page Structure & Sections

| # | Section | Background | Purpose |
|---|---|---|---|
| 1 | Header | `.brand-gradient` (sticky) | Logo + section nav links + mobile dropdown (matches HeaderBar.tsx) |
| 2 | Hero | `bg-base-100` | 2-column split: headline + CTAs (left), Main screenshot (right). Trust badges below. |
| 3 | Social proof bar | `bg-section-alt` | "Works on: LinkedIn, Indeed, Greenhouse…" |
| 4 | Problem | `bg-base-100` | Pain points — why form filling is tedious |
| 5 | How it works | `bg-section-alt` | 3-step cards: create profiles → save fields → auto-detect & fill |
| 6 | See it in action | `bg-base-100` | DaisyUI CSS carousel with 3 feature screenshots + captions |
| 7 | Who is it for | `bg-section-alt` | 4 persona cards with Lucide icons |
| 8 | Comparison | `bg-base-100` | TETRAform vs Chrome Autofill vs Others (table on desktop, cards on mobile) |
| 9 | Features | `bg-section-alt` | 11-feature grid with Lucide icons (includes sensitive field protection, keyboard shortcuts) |
| 10 | Privacy | `bg-base-100` | "Your data never leaves your device" + badges |
| 11 | Pricing | `bg-section-alt` | $0 free plan card (3 profiles, 15 fills/day) |
| 12 | FAQ | `bg-base-100` | 6 collapse-arrow items (radio — one open at a time) |
| 13 | CTA | `bg-section-alt` | Card with `bg-primary text-primary-content` (solid, not gradient) |
| 14 | Footer | `bg-base-200` | Logo + tagline, nav links, copyright (shared with privacy.html) |

**Section backgrounds:** Alternating between `bg-base-100` (white) and `bg-section-alt` (oklch 96.5% — lighter than base-200). Cards use `border border-base-200 shadow-sm` for additional separation.

### Section IDs for nav links
- `#how-it-works` — How it works section
- `#faq` — FAQ section

### Shared elements (index.html + privacy.html)
Both pages share: CDN stack, `<style>` block (brand-gradient), and header/footer via `shared.js`.

**`shared.js`** — renders header and footer into placeholder `<div>` elements:
- `<div id="site-header"></div>` — receives the gradient header
- `<div id="site-footer"></div>` — receives the footer
- Called via `renderShared({ page: 'home' })` or `renderShared({ page: 'privacy' })`
- Header nav only shown on home page; privacy page uses same header with no nav (clean look)
- **Edit header/footer ONLY in `shared.js`** — never duplicate in HTML files

---

## 8. Copy Strategy & SEO

### Why the landing page matters for SEO
The Chrome Web Store listing is indexed by Google. External pages that **link to the store listing** improve its Google Search ranking (not just store internal ranking). The landing page at `tetraform.app` should:
- Link to the Chrome Web Store listing (every CTA button does this)
- Use target keywords naturally in headings and body text
- Load fast (it does — no JS frameworks, CDN-only)

### SEO meta tags (already in `<head>`)
```html
<title>TETRAform – Free Form Autofill Chrome Extension</title>
<meta name="description" content="Free form autofill Chrome extension. Fill job applications,
  scholarships, and web forms in one click. Multiple profiles. 100% private — your data
  never leaves your device." />
<link rel="canonical" href="https://tetraform.app/" />
```

### Structured data (JSON-LD, already in `<head>`)
Marks up the page as a `SoftwareApplication` for Google rich results.

### Hero sub-headline (keyword-dense, SEO-optimised)
> *TETRAform is a free* ***form autofill Chrome extension*** *— an automatic form filler that lets you fill out job applications, scholarship forms, and web forms in one click. Multiple profiles. 100% private — your data never leaves your device.*

This front-loads: `form autofill Chrome extension`, `automatic form filler`, `fill out job applications`, `scholarship forms`, `web forms` — all primary and secondary search terms.

---

## 9. Target Keywords

### Primary (highest volume)
| Keyword | Where used on landing page |
|---|---|
| `form autofill` | Title tag, hero sub, features heading |
| `form filler` | Title tag, meta description |
| `autofill chrome extension` | Hero sub, meta description |
| `auto fill forms` | Features subtitle, how-it-works |

### Secondary
| Keyword | Where used |
|---|---|
| `autofill extension` | Features subtitle, body copy |
| `fill web forms` | Problem section |
| `automatic form filler` | Hero sub-headline |
| `one-click autofill` | Features section (One-Click Form Filling card) |

### Long-tail (persona-specific)
| Keyword | Where used |
|---|---|
| `job application autofill` | Job Seekers persona card |
| `autofill job applications` | Job Seekers card |
| `scholarship form autofill` | Students card |
| `CRM autofill` | Sales & Business card (body copy) |

### Keywords to avoid
- "Smart" — generic, not searched
- "Beta" — implies unfinished, hurts conversion
- "TETRAform" alone — zero search volume (always pair with the product category)

---

## 10. Target Personas

### Persona 1 — Job Seeker (Primary)
- **Who:** Active job hunters applying to 10–50+ positions
- **Pain:** Retyping the same name, address, LinkedIn URL into every application
- **Language:** "stop retyping my resume", "autofill job applications", "fill applications faster"
- **On page:** Job Seekers card (Who it's for), Hero sub-headline, How it works step 3

### Persona 2 — Student (Secondary)
- **Who:** College students applying to internships, scholarships, grad school
- **Pain:** Dozens of portals all asking for the same information
- **Language:** "internship applications", "scholarship forms", "college applications"
- **On page:** Students card (Who it's for)

### Persona 3 — Freelancer / Consultant (Secondary)
- **Who:** Freelancers onboarding new clients with intake forms, NDAs, project docs
- **Pain:** Repetitive manual entry across many different client portals
- **Language:** "client intake forms", "same information every time", "onboarding"
- **On page:** Freelancers & Consultants card (Who it's for)

### Persona 4 — Sales / Business Rep (Secondary)
- **Who:** Sales reps entering contacts into Salesforce, HubSpot, and web-based CRM forms
- **Pain:** CRM data entry is eating selling time
- **Language:** "CRM autofill", "lead entry", "contact forms", "prospect forms"
- **On page:** Sales & Business Reps card (Who it's for)

### Persona 5 — Privacy-Conscious User (Underserved, high value)
- **Who:** Users who distrust browser autofill or cloud-synced tools (LastPass, Magical)
- **Pain:** Most autofill tools send data to servers or require an account
- **Language:** "data stays local", "offline autofill", "no cloud", "private autofill"
- **On page:** Privacy callout section, trust badges in hero, footer copy
- **Why this matters:** Magical uses OpenAI (cloud). Lightning Autofill syncs to cloud. We don't — genuinely unique.

---

## 11. Three Differentiators to Emphasise Everywhere

These must appear in the landing page, the Chrome Web Store listing, and the screenshots.

### Differentiator 1 — Privacy: Data Never Leaves Your Device
> *Unlike browser autofill or cloud-based tools, TETRAform stores everything locally on your computer. No account required. No cloud sync. No data sent anywhere.*

**On landing page:** Dedicated Privacy section (Section 7), hero trust badges, footer tagline

### Differentiator 2 — Multiple Profiles for Every Context
> *Create separate profiles for job applications, school, personal, and work — and link each one to specific websites so the right profile activates automatically.*

**On landing page:** Who it's for section (all 4 cards reference profiles), How it works step 1, Features grid, Pricing card

### Differentiator 3 — Domain-Specific Profile Linking
> *Assign a profile to a specific domain. TETRAform automatically uses the right profile on the right site — no switching needed.*

**On landing page:** How it works step 1 body copy, Features grid ("Domain-Specific Profiles" card)

---

## 12. Image Assets

Icons are stored in `public/` — copied from the extension's `/public/` folder.

| File | Used in |
|---|---|
| `public/icon48.png` | Nav logo, footer logo |
| `public/icon128.png` | `<link rel="icon">` (browser tab favicon) |
| `public/icon16.png` | `<link rel="icon">` (small favicon) |
| `public/tetraform-logo.png` | Available if needed for larger logo treatments |

### Product screenshots

Pre-cropped from Chrome Web Store images (right side only — product UI, no marketing text).

| File | Content | Used in |
|---|---|---|
| `public/screenshots/main.jpg` | Greenhouse form filled + assistant bar + "18 fields filled in 3s" | Hero (right column) |
| `public/screenshots/feature-profiles.jpg` | Settings Profiles tab — 3 profiles | Carousel slide 1 |
| `public/screenshots/feature-autofill.jpg` | Greenhouse form + assistant bar + profile dropdown | Carousel slide 2 |
| `public/screenshots/feature-popup.jpg` | Extension popup overlay — Save, Fill, Highlight, Ignore | Carousel slide 3 |

### OG image (to create)
Create `public/og-image.png` at 1200×630px for social sharing previews.
Content: gradient background (cyan→blue) + TETRAform logo + headline "Fill any web form in under 5 seconds".
Referenced in `<meta property="og:image">` already in the HTML.

---

## 13. Off-Site SEO Actions

External links to the Chrome Web Store listing improve its Google Search ranking.

### Priority 1 — Product Hunt Launch
- Highest single ROI action for a new extension
- Creates backlinks, install spike, and press coverage potential
- Prepare: 60-word tagline, 3 screenshots, 2-minute demo GIF
- Launch Tuesday–Thursday for maximum exposure

### Priority 2 — Reddit Posts
Post in these subreddits (be a contributor, not an advertiser):
- `r/productivity` — "I built a tool to stop retyping job application forms"
- `r/jobsearch` — frame around job seekers specifically
- `r/cscareerquestions` — students + new grads
- `r/chrome` — general form autofill users

### Priority 3 — Reviews (most critical trust signal)
- 0 reviews = instant bounce for most users
- Personally ask 5 colleagues / friends / family to install and leave an honest review
- Even 5 reviews at 4.0+ transforms the store listing completely

### Priority 4 — Branded Email
- Replace `geo2arc@gmail.com` → `contact@tetraform.app` in the Chrome Web Store developer console
- Set up via Cloudflare Email Routing (free) — see Section 4

### Priority 5 — Privacy Policy URL
- Move privacy policy from raw GitHub link to `tetraform.app/privacy`
- The file `docs/PRIVACY_POLICY.md` already exists in this repo
- To serve it, create a `privacy.html` page (or use GitHub Pages' Jekyll to render the .md)

---

## 14. Implementation Checklist

### Landing page (done)
- [x] Static `index.html` with DaisyUI v5 + Tailwind v4 CDN
- [x] DaisyUI `corporate` theme with full oklch CSS variables
- [x] Brand gradient ONLY on header bar (matches HeaderBar.tsx)
- [x] Alternating `bg-base-100`/`bg-base-200` section backgrounds
- [x] All icons replaced with Lucide via CDN
- [x] 14-section conversion-optimized layout (hero, problem, carousel, comparison, etc.)
- [x] Extension icons copied to `public/`
- [x] `CNAME` set to `tetraform.app`
- [x] SEO meta tags, canonical URL, OG tags
- [x] Structured data (JSON-LD `SoftwareApplication`)
- [x] All 5 personas addressed
- [x] All 3 differentiators present
- [x] Keyboard shortcut callout (Ctrl+Shift+F)
- [x] Privacy section with Lucide icon badges
- [x] `privacy.html` with shared header/footer

### To do
- [ ] Create `public/og-image.png` (1200×630, gradient bg + headline)
- [ ] Visual verification: test both pages in browser

### Chrome Web Store (separate — see SEO-STRATEGY.md in the extension repo)
- [ ] Update title → `Form Autofill & Filler - TETRAform` (via `manifest.json`)
- [ ] Update short description (via `manifest.json`)
- [ ] Paste new full description (Section 6 of SEO-STRATEGY.md)
- [ ] Replace all 5 screenshots with updated images
- [ ] Replace developer contact email with `contact@tetraform.app`
- [ ] Get 5+ reviews
- [ ] Launch on Product Hunt
