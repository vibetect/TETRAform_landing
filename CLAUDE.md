# Agent Rules for TETRAform Landing Page

## THE PROJECT
Static landing page for TETRAform Chrome extension, hosted on GitHub Pages at https://tetraform.app/
Companion repo to `TETRAform_local` (the extension). Both live in the same VS Code workspace.

## CRITICAL CONSTRAINTS

**This is a static site — no build step, ever.**
- Do NOT add `package.json`, Vite, webpack, or any build pipeline
- Do NOT add GitHub Actions for building
- All dependencies loaded from CDN only
- Deploy = push to `main` branch → GitHub Pages auto-deploys

## TECH STACK
- **CSS:** DaisyUI v5 CDN + Tailwind v4 CDN (`@tailwindcss/browser@4`)
- **Theme:** DaisyUI `corporate` (light) — matches the extension UI exactly
- **Icons:** Lucide via CDN (`unpkg.com/lucide@latest`) — use `<i data-lucide="icon-name">` + `lucide.createIcons()` at end of body
- **Pages:** `index.html` (landing) + `privacy.html` (privacy policy)
- **Shared components:** `shared.js` — renders header and footer into `<div id="site-header">` and `<div id="site-footer">`. Called via `renderShared({ page: 'home' })` or `renderShared({ page: 'privacy' })`. Edit header/footer ONLY in `shared.js`.

## BRAND DESIGN
- **Gradient:** `linear-gradient(to right, #06b6d4, #2563eb)` — cyan to blue, matches extension `HeaderBar.tsx`
- **Gradient rule:** `.brand-gradient` is used ONLY on the header bar. Never on hero, CTA, step circles, feature icons, or any other element.
- **Class:** `.brand-gradient` defined in inline `<style>` block in each HTML file
- **Theme vars:** Full DaisyUI v5 corporate theme CSS variables in inline `<style>` block (oklch color system, 0.25rem radius, 1px border, no depth/noise)
- Never replace the gradient with Tailwind gradient utilities — unreliable in this CDN setup

## SECTION BACKGROUNDS
- Sections alternate between `bg-base-100` (white) and `bg-section-alt` (oklch 96.5% — lighter than base-200)
- `.bg-section-alt` is defined in inline `<style>` block in each HTML file
- Cards use `border border-base-200 shadow-sm` for separation within sections
- Section backgrounds span full window width; content is width-contained (`max-w-*xl mx-auto`)
- CTA banner card uses `bg-primary text-primary-content` (solid, not gradient)
- Footer uses `bg-base-200`

## SCREENSHOTS
- Product screenshots live in `public/screenshots/`, pre-cropped from web store originals (right side only — product UI, no marketing text)
- Used in: hero section (main.jpg) and "See it in action" carousel (feature-profiles.jpg, feature-autofill.jpg, feature-popup.jpg)
- Hero uses a 2-column split layout: text left, screenshot right (`grid md:grid-cols-2`)
- Carousel uses DaisyUI's pure CSS carousel component (anchor-link navigation, no JS)

## HEADER & FOOTER (shared.js)
Both pages share a single source of truth in `shared.js`:
- **Header:** `.brand-gradient sticky top-0 z-50`, h-[100px], logo w-16 h-16 rounded-xl, title text-2xl font-bold, subtitle text-sm. Nav links only on home page (How it works, Who is it for, Features, Pricing, FAQ). Non-home pages show the same header with no nav. Mobile dropdown on home only.
- **Footer:** `bg-base-200 border-t border-base-300`, logo + tagline left, nav links center, copyright right, dynamic year via JS
- **To edit:** Change `shared.js` only — never duplicate header/footer HTML in page files

## THE USER
Vibe-coder, not a developer. Professional architect. First app.
- Present alternatives for design/copy decisions
- Make technical decisions yourself (simplicity, security, low maintenance, cost)
- Think holistically: every change affects SEO, design, marketing, conversion

## DOCUMENTATION
Keep `docs/` updated after every change:
- `docs/LANDING-PAGE.md` — architecture, design decisions, setup
- `docs/PRIVACY_POLICY.md` — source of truth for privacy policy content

## SYNCING WITH EXTENSION
When the extension's brand colors, copy, or features change — update the landing page too.
Extension store link: https://chromewebstore.google.com/detail/tetraform-smart-form-auto/acgapenhjikhpeicknacehlkalpemigb
