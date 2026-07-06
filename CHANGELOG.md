# Changelog

All notable changes to this project will be documented in this file.

## [0.7.8]
### UI Layout Fixes
- **Modal Widths**: Fixed DetailModal, CompareModal, SettingsModal being constrained to 384px by default DialogContent `sm:max-w-sm`; used `!max-w-*` overrides + `showCloseButton={false}` to prevent duplicate close buttons
- **Table Columns**: Adjusted CPU/GPU column widths from w-24 to w-28, price column from w-24 to w-28, checkbox column from w-8 to w-10; added `whitespace-nowrap` to SortHeader labels
- **Button Consistency**: Unified Share/Close button styles across DetailModal, CompareModal, SettingsModal (consistent ghost variant + hover effects)
- **Price Column**: Improved price display hierarchy — current price uses primary text color, original price strikethrough uses muted gray
### Design System
- **Font Stack**: Extended global font stack with Chinese fallbacks (PingFang SC, Microsoft YaHei) and Indic fallbacks (Nirmala UI, Noto Sans Devanagari, Kohinoor Devanagari, Mangal)
- **shadcn/ui Components**: Added tooltip, separator, skeleton, card components; wrapped app with TooltipProvider
### Accessibility (Web Interface Guidelines Compliance — 40 fixes)
- **aria-label**: Added to all icon-only buttons across Header, FilterControls, CompareBar, DetailModal, CompareModal, SettingsModal, TradeInView, AIChat, MacRow
- **aria-hidden**: Added to all decorative icons (Zap, Github, Heart, Calculator, TrendingDown, Wallet, ArrowRight, RotateCcw, SVG logos)
- **aria-live**: Added `aria-live="polite"` to toast notification
- **Semantic HTML**: Changed `<span onClick>` to `<button>` in Header; `<div onClick>` to `<button role="switch" aria-checked>` in FilterMenus; `<div onClick>` to `<button type="button">` in SortHeader
- **Focus States**: Ensured all interactive elements have `focus-visible:ring-*` replacements
- **Forms**: Added `name` and `autoComplete="off"` to search and chat inputs
- **Transitions**: Replaced all `transition-all` anti-patterns with specific transition properties (`transition-colors`, `transition-transform`, `transition-[width]`, `transition-[transform,opacity]`)
- **Reduced Motion**: Added global `@media (prefers-reduced-motion: reduce)` CSS rule
- **Dark Mode**: Added `dark:[color-scheme:dark]` to `<html>`; added `<meta name="theme-color">` for light/dark
- **Zoom**: Removed `user-scalable=no` and `maximum-scale=1.0` from viewport meta
### Security
- **API Hardening**: Enhanced `/api/chat` route with `validateContextItem` whitelist validation for all client-submitted `contextData` fields, mitigating prompt injection attacks
- **Prompt Isolation**: Wrapped hardware database context in `<HARDWARE_DATABASE>` tags with explicit system instruction declaring data is non-instructional
- **Log Sanitization**: Replaced full error logging with `error.message`-only output to prevent sensitive data leakage
### Performance
- **React.memo Optimization**: Wrapped `MacTable`, `SortHeader`, `MacRow`, `ChatMessageBubble`, `FilterMenus` components in `React.memo` to prevent unnecessary re-renders
- **Component Extraction**: Extracted inline `SortHeader` from `MacTable` to module-level (fixes remount-on-render)
- **useMemo Purity**: Fixed mutation bug in `useMacData` where shared cache objects were mutated inside `useMemo`
- **Stable Keys**: Replaced array index keys with `crypto.randomUUID()`-based `id` field in `ChatMessage` for stable reconciliation
- **Timer Cleanup**: Added `toastTimerRef` cleanup in `useInteraction` to clear pending timeouts on unmount
### Refactor
- **File Splitting**: Split all source files exceeding 200 lines into cohesive modules:
  - `app/lib/priceCache.ts` (extracted from `useMacData`)
  - `app/lib/sorting.ts` (extracted from `useMacData`)
  - `app/components/SortHeader.tsx` (extracted from `MacTable`)
  - `app/components/MacRow.tsx` (extracted from `MacTable`)
  - `app/components/ChatMessageBubble.tsx` (extracted from `AIChat`)
  - `app/components/FilterMenus.tsx` (extracted `ScenarioMenu` + `ViewMenu`)
### i18n
- **Key Coverage**: Backfilled `label_single`/`label_multi`/`singleCore`/`multiCore`/`chart_single`/`chart_multi` across 8 locale files (es/fr/de/ja/ko/hi/pt/ru)
- **Hardcoded Strings**: Replaced all hardcoded Chinese share text in `DetailModal` and `CompareModal` with 4 new i18n keys (`app_tagline`/`share_score_label`/`share_detail_tagline`/`share_compare_tagline`) propagated to all 10 locales
- **Hindi Fix**: Corrected `वर्कस्टATION` → `वर्कस्टेशन` spelling typo in `hi.ts`
### Documentation
- **README Sync**: Updated README to reflect current v0.7.8 features and usage
- **Version Sync**: Unified all version numbers across package.json, metadata.json, layout.tsx, openspec docs, and source file headers to v0.7.8

## [0.7.6]
### Fixed
- **Light Mode**: Fixed issue where light mode wasn't fully applied properly by replacing `classList.toggle` with explicit `classList.add` and `classList.remove`
- **Scrollbar Styling**: Optimized scrollbar styling to coordinate better with light/dark modes, reduced opacity for less visual contrast
- **Sharing**: Enhanced share messages with promotional text for better application propagation
- **CSS Cleanup**: Removed duplicate Tailwind import in `globals.css`, now properly imports `style.css`
### Updated
- **Documentation**: Restructured README files, making default documentation fully in Chinese
- **Version Sync**: Unified all version numbers to v0.7.6

## [0.7.5]
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
