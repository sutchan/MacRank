# Changelog

All notable changes to this project will be documented in this file.

## [0.8.0]
### Added
- **Design System**: Established shadcn/ui design system with oklch color tokens (Apple-inspired minimalist aesthetic), including light/dark mode support and `prefers-reduced-motion` support.
- **Typography**: Introduced Inter (sans) and JetBrains Mono (mono) via next/font.
- **i18n**: Added 9 new translation keys (error states, empty states, app_tagline) across all 10 locale files.
- **SEO**: Added comprehensive SEO infrastructure including:
  - **robots.txt**: Search engine crawler control with sitemap location.
  - **sitemap.ts**: Dynamic sitemap generation using Next.js MetadataRoute API.
  - **Structured Data**: JSON-LD markup for WebSite, SoftwareApplication, Breadcrumb, and FAQ schemas.
  - **Twitter Cards**: Complete Twitter Card meta tags for social sharing.
  - **Mobile App**: PWA manifest.json with app metadata and icons.
- **GEO**: Added geographic meta tags for global audience targeting (geo.region, geo.position, coverage, distribution, audience).
### Changed
- **UI/UX Overhaul**: Migrated all components from native HTML to shadcn/ui (Button, Dialog, Input, Select, Badge, Card, Tooltip, Switch). DialogContent used for all modals (DetailModal, CompareModal, SettingsModal, TradeInView); Button used throughout Header, Hero, FilterControls, CompareBar, AIChat, and page.tsx.
- **MacTable**: Inlined compare button rendering with `aria-pressed` attribute and design tokens (border-border, bg-background, hover:border-primary).
- **Radius**: Standardized border radius to 0.75rem.
- **Infrastructure**: Fixed path aliases (@/* → ./app/*) and installed radix-ui, clsx, tailwind-merge, class-variance-authority, and remark-gfm.
### Security
- **Headers**: Added HTTP security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS).
### Accessibility
- **ARIA**: Fixed aria-checked → aria-pressed, added aria-labels to icon-only buttons, and aria-hidden to decorative icons.
### Removed
- **Dead Code**: Removed unused component files (MacRow.tsx, ChatMessageBubble.tsx, SortHeader.tsx, FilterMenus.tsx) that were superseded by inline implementations in their parent components (MacTable, AIChat, FilterControls).
- **Cleanup**: Removed redundant prototype HTML files, old security report, and empty .gitkeep files.
### Tested
- **E2E**: Playwright dogfood testing - 17/17 tests passed (page structure, table interaction, search filter, compare feature, mobile responsiveness, a11y, console error check).

## [0.7.4]
### Security
- **Next.js**: Upgraded to v15.5.18 to patch CVE-2025-66478 (Critical RCE vulnerability)
- **PostCSS**: Upgraded to v8.5.10 to fix XSS vulnerability
- **ESLint**: Updated eslint-config-next to v15.5.18
### Fixed
- **Version Sync**: Updated version numbers across all source files to v0.7.3
- **Documentation**: Corrected tech stack description in README (Vite → Next.js 15)
- **Cleanup**: Removed deprecated spec files per specification.md deprecation notice

## [0.7.3]
### Fixed
- **Sharing**: Corrected an issue where shared text was improperly formatted, especially when using the clipboard fallback.

## [0.7.2]
### Added
- **Data**: Added missing M4 Max/Pro variants and legendary Intel Mac models (2013-2015).
### Changed
- **UI**: Optimized text contrast and readability in both light and dark modes across all major components.

## [0.7.1]
### Fixed
- **Robustness**: Fixed hydration mismatch issues in `useInteraction` and `page.tsx`.
- **Linting**: Resolved ESLint warnings in `AIChat.tsx` and `Header.tsx`.

## [0.7.0]
### Added
- **i18n**: Added full internationalization support for 10 languages (en, zh, es, fr, de, ja, pt, ru, ko, hi).
- **Locale**: Implemented currency conversion and localized formatting.

## [0.6.2]
### Added
- **Feature**: Added a new filter to sort Mac models by their operating system version.
- **Data**: Enriched all Mac models with an `os` property.
### Changed
- **UI**: Refactored filter controls from button groups to more compact and scalable dropdown menus, improving responsive behavior.
- **Fixed**: Implemented the previously missing 'Chip Family' filter.

## [0.6.1]
### Fixed
- **Debugging**: Added semantic IDs to all major UI containers and components to improve developer experience and simplify debugging.

## [0.6.0]
### Added
- **Architecture**: Created a new `app/hooks` directory to abstract state management.
- **Refactor**: Introduced `useSettings`, `useMacData`, and `useInteraction` custom hooks.
### Changed
- **Refactor**: Simplified `App.tsx` into a lean composition root, delegating all state logic to the new custom hooks, improving code readability and maintainability.

... (后续历史保留)
