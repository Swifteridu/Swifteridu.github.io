# Zakaria Sbihi · Portfolio

A bilingual, mobile-first portfolio and interactive résumé built with plain HTML, CSS, and JavaScript. It has no build step, framework, CDN, tracker, or backend. Open index.html directly for a quick preview; use a local HTTP server to also check GitHub's live repository data.

## Files

- index.html - accessible page structure and metadata
- style.css - layout, themes, responsive rules, and print résumé
- app.js - small startup file that initializes the modules
- content.js - all German and English copy, skills, project details, timeline, links, and fallback messages
- scripts/core.js - shared state, DOM helpers, and language-change notifications
- scripts/i18n.js - translations, document language, metadata, and locale formatting
- scripts/render.js - skills, project cards, timeline, and contact links
- scripts/github.js - public GitHub data, cache, and relative update dates
- scripts/interactions.js - theme switch, command palette, dialogs, and mini terminal
- scripts/effects.js - pointer canvas, reduced-motion handling, and scroll reveals
- CNAME - the custom domain swifteridu.me

The local scripts are classic deferred scripts loaded in dependency order from `index.html`. This keeps the site build-free and also lets you open `index.html` directly.

## Personalize the content

Edit the matching German and English entries in content.js. Replace the bracketed placeholders for your location, current status, time period, project stack, and email address. When you add a project or timeline entry, add it to both language objects using the same fields.

## Interactive details

- Ctrl+K (or ⌘K) opens the searchable command palette for navigation, language, theme, and GitHub.
- The mini terminal accepts help, about, projects, contact, date, theme, lang de, lang en, and clear.
- Theme preference and manually selected language are saved in the browser. ?lang=de and ?lang=en are also supported.
- The decorative canvas reacts to pointer movement, stops when the tab is hidden, and is disabled for reduced-motion preferences.
- GitHub stars and repository update time are fetched from the public API with a local cache and a no-network fallback.
- Ctrl+P opens a compact print layout designed to fit a one-page résumé for the current language; it keeps the first three projects and timeline entries.

