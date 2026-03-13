# Agent Rules for TETRAform Landing Page

## THE PROJECT
Static landing page for TETRAform Chrome extension, hosted on GitHub Pages at https://tetraform.app/
Companion repo to `TETRAform_local` (the extension). Both live in the same VS Code workspace.

## CRITICAL CONSTRAINTS

**This is a static site — no build step, ever.**
- ❌ Do NOT add `package.json`, Vite, webpack, or any build pipeline
- ❌ Do NOT add GitHub Actions for building
- ✅ All dependencies loaded from CDN only
- ✅ Deploy = push to `main` branch → GitHub Pages auto-deploys

## TECH STACK
- **CSS:** DaisyUI v5 CDN + Tailwind v3 CDN (inline in `<head>`)
- **Theme:** DaisyUI `corporate` (light) — matches the extension UI exactly
- **Icons:** Inline SVG or CDN (no npm packages)
- **Pages:** `index.html` (landing) + `privacy.html` (privacy policy)

## BRAND DESIGN
- **Gradient:** `linear-gradient(to right, #06b6d4, #2563eb)` — cyan to blue, matches extension `HeaderBar.tsx`
- **Class:** `.brand-gradient` defined in inline `<style>` block in each HTML file
- **Theme vars:** Corporate theme CSS variables in inline `<style>` block
- Never replace the gradient with Tailwind gradient utilities — unreliable in this CDN setup

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
