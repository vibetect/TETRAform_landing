/**
 * Shared header & footer for TETRAform landing page.
 * Both index.html and privacy.html source this file.
 *
 * Usage:
 *   <div id="site-header"></div>   ← at top of <body>
 *   <div id="site-footer"></div>   ← at bottom, before scripts
 *   <script src="shared.js"></script>
 *   <script>renderShared({ page: 'home' });</script>   // or 'privacy'
 */

const STORE_URL =
  'https://chromewebstore.google.com/detail/tetraform-smart-form-auto/acgapenhjikhpeicknacehlkalpemigb';

/* ── Header ─────────────────────────────────────────────── */

function headerHTML(page) {
  const isHome = page === 'home';

  // Nav links only shown on the home page
  const navLinks = `<a href="#how-it-works" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">HOW IT WORKS</a>
       <a href="#the-problem" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">PROBLEM</a>
       <a href="#see-it-in-action" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">DEMO</a>
       <a href="#who-is-it-for" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">WHO IS IT FOR</a>
       <a href="#comparison" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">COMPARE</a>
       <a href="#features" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">FEATURES</a>
       <a href="#pricing" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">PRICING</a>
       <a href="#faq" class="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-xs whitespace-nowrap">FAQ</a>`;

  const mobileLinks = `<li><a href="#how-it-works">HOW IT WORKS</a></li>
       <li><a href="#the-problem">PROBLEM</a></li>
       <li><a href="#see-it-in-action">DEMO</a></li>
       <li><a href="#who-is-it-for">WHO IS IT FOR</a></li>
       <li><a href="#comparison">COMPARE</a></li>
       <li><a href="#features">FEATURES</a></li>
       <li><a href="#pricing">PRICING</a></li>
       <li><a href="#faq">FAQ</a></li>
       <li><a href="${STORE_URL}" target="_blank" rel="noopener noreferrer">Add to Chrome</a></li>`;

  // On non-home pages, hide the nav entirely (same header, just no menu)
  const navSection = isHome
    ? `<nav class="hidden xl:flex items-center gap-0.5">${navLinks}</nav>
      <div class="dropdown dropdown-end xl:hidden">
        <div tabindex="0" role="button" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
          <i data-lucide="menu" class="w-6 h-6 text-white"></i>
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 mt-2 z-50">
          ${mobileLinks}
        </ul>
      </div>`
    : '';

  return `<header class="brand-gradient">
    <div class="max-w-6xl mx-auto h-[100px] flex items-center px-6">
      <a href="index.html" class="flex items-center gap-4">
        <img src="public/tetraform-logo.png" alt="TETRAform" class="w-16 h-16 rounded-xl" />
        <div class="flex flex-col justify-center">
          <span class="text-2xl font-bold text-white leading-tight">TETRAform</span>
          <span class="text-sm text-white leading-tight">Smart Form Assistant</span>
        </div>
      </a>
      <div class="flex-1"></div>
      ${navSection}
    </div>
  </header>`;
}

/* ── Footer ─────────────────────────────────────────────── */

function footerHTML() {
  return `<footer class="bg-section-alt border-t border-base-200 px-4 py-10">
    <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div class="flex flex-col gap-1">
        <a href="index.html" class="flex items-center gap-2 font-bold text-base hover:opacity-80 transition-opacity">
          <img src="public/icon48.png" alt="TETRAform" class="w-6 h-6 rounded" />
          TETRAform
        </a>
        <p class="text-xs text-base-content/40 mt-1 max-w-xs">
          Free form autofill Chrome extension. Your data never leaves your device.
        </p>
      </div>
      <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
        <a href="${STORE_URL}" target="_blank" rel="noopener noreferrer"
           class="text-sm text-base-content/50 hover:text-base-content transition-colors">Chrome Web Store</a>
        <a href="mailto:contact@tetraform.app"
           class="text-sm text-base-content/50 hover:text-base-content transition-colors">Contact</a>
        <a href="privacy.html"
           class="text-sm text-base-content/50 hover:text-base-content transition-colors">Privacy Policy</a>
      </nav>
      <p class="text-xs text-base-content/30">&copy; <span id="year"></span> TETRAform. All rights reserved.</p>
    </div>
  </footer>`;
}

/* ── Render ──────────────────────────────────────────────── */

function renderShared(opts) {
  const page = (opts && opts.page) || 'home';

  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = headerHTML(page);
  if (footerEl) footerEl.innerHTML = footerHTML();

  // Dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
