
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.3] - 2025-02-22

### Fixed
- **Code Quality**: Removed hardcoded version string in `SettingsModal`, now using the global constant.
- **Localization**: Corrected a typo in Portuguese translation ("Especificaciones" -> "Especificações").

## [0.3.2] - 2025-02-22

### Added
- **Share Functionality**: Implemented deep linking and share buttons in Hero, Filter Controls, and Detail Modal to boost viral marketing.
- **Internationalization**: Completed translations for all 8 non-English/Chinese languages (Spanish, French, German, Japanese, Portuguese, Russian, Korean, Hindi).

### Optimized
- **Footer UI**: Redesigned the footer with better visual hierarchy, spacing, and a clear GitHub Call-to-Action.
- **Version Sync**: Synchronized version numbers across all application files and documentation.

## [0.3.1] - 2025-02-22

### Fixed
- **Chart Visualization**: Reference items (PC/GPU) now use a distinct hatched pattern in Single/Multi/Metal bar charts, resolving confusion with normal Mac models.
- **Translations**: Added missing localization strings for Footer actions, Settings confirmations, and Chart tooltips across all languages.

## [0.3.0] - 2025-02-22

### Added
- **PC Reference Mode**: Added a "PC/GPU Ref" toggle in the filter bar. Users can now view Apple Silicon performance alongside PC industry benchmarks (e.g., NVIDIA RTX 4090, Intel i9-14900K) for better context.
- **Enhanced Footer**: Redesigned footer for better visual hierarchy and added GitHub star call-to-action.

## [0.2.0] - 2025-02-22

### Refactor
- **Component Architecture**: Split `App.tsx` into smaller, manageable components (`Header`, `Hero`, `FilterControls`, `Footer`) to improve code maintainability and readability.

## [0.1.18] - 2025-02-22

### Added
- **Settings UI**: Improved the Settings modal with a standardized list layout including "General" and "About" sections.
- **Language Selector**: Changed language selection to a user-friendly dropdown menu in Settings.
- **System Options**: Added "Reset Data" option to clear local storage cache and "Source Code" link in the About section.

## [0.1.16] - 2025-02-22

### Refactor
- **Codebase**: Modularized localization by splitting `translations.ts` into dedicated per-language files in `lib/locales/` for better project organization.

## [0.1.15] - 2025-02-22

### Added
- **Comparison Visuals**: Introduced a dynamic Radar Chart in the comparison view to visualize performance across 5 dimensions (Single-Core, Multi-Core, Metal, Value, Memory).
- **Table UX**: Added sticky column support for the model name in the leaderboard table, ensuring context is maintained while scrolling horizontally on mobile devices.

## [0.1.13] - 2025-02-22

### Optimized
- **Mobile Responsiveness**:
    - Reduced padding and font sizes in `DetailModal` and `CompareModal` for better viewing on small screens.
    - Adjusted `PerformanceChart` height to `350px` on mobile (vs `500px` desktop) to prevent excessive vertical scrolling.
    - Improved `AIChat` window layout on mobile devices to act as a full-width bottom sheet.
- **Visual Polish**: Added `.no-scrollbar` utility to hide scrollbars in horizontal scrolling containers (filters, chart tabs) for a cleaner aesthetic.

## [0.1.12] - 2025-02-22

### Added
- **Detailed UI Translations**: Added multi-language support for the Close button (ARIA label) and Chart Tooltip units (pts/$10), improving accessibility and localization accuracy in Detail and Compare modals.

## [0.1.11] - 2025-02-22

### Added
- **UI Translation**: Translated device type labels (Laptop, Desktop, Tablet) in the detail modal for all supported languages.

## [0.1.10] - 2025-02-22

### Maintenance
- **System Stability**: Verified app functionality and updated version to 0.1.10 to ensure all features including the footer version display are correctly applied.

## [0.1.9] - 2025-02-22

### Added
- **Complete Internationalization**: Added translations for all hardcoded strings in charts, modals, and AI assistant across 10 languages.

## [0.1.8] - 2025-02-22

### Fixed
- **UI**: Removed duplicate "Top 15 Performance Index" heading in the Charts section to improve layout cleanliness.

## [0.1.7] - 2025-02-22

### Added
- **Expanded Database**: Added missing M4 MacBook Pro base model, iPad Air M1/M2, and legacy Intel models (iMac 2019, MacBook Air 11" 2015, etc.) for a more comprehensive list.

### Refactor
- **Code Organization**: Moved inline CSS from `index.html` to a dedicated `app/style.css` file for better maintainability.

## [0.1.5] - 2025-02-22

### Fixed
- **Header Navigation**: Fixed "Leaderboard" and "Charts" links in the header to scroll smoothly to their respective sections with proper offset, resolving an issue where the sticky header would cover content.

## [0.1.3] - 2025-02-22

### Added
- **PWA Support**: Enabled Progressive Web App capabilities. Users can now install MacRank to their home screen.
- **Offline Caching**: Configured `vite-plugin-pwa` for asset caching.
- **App Icons**: Added scalable SVG icons for PWA manifest.

### Optimized
- **Mobile View**: Improved `MacTable` responsiveness by hiding CPU/GPU/Price columns on vertical mobile screens to prevent horizontal scrolling.

### Fixed
- **Build Configuration**: Fixed `process.env` access issue in `vite.config.ts`.
- **API Security**: strictly enforced `process.env.API_KEY` usage in `GeminiService` to comply with SDK guidelines.

## [0.1.1] - 2025-02-22

### Added
- **Comparison Mode**: New feature allowing users to select two Mac models and compare their specs and performance side-by-side.
- **Comparison Modal**: detailed visual comparison with bar charts for Single-Core, Multi-Core, and Metal scores.
- **Floating Action Bar**: Contextual bottom bar for managing comparison selections.

### Optimized
- **AI Context**: Limited the context injection for Gemini API to the top 40 relevant models to prevent token overflow and improve response latency.

## [0.1.0] - 2025-02-22

### Added
- **Core Framework**: Initial release built with React 19, Vite, and Tailwind CSS.
- **Mac Database**: Comprehensive specs and benchmark scores for Apple computers ranging from **2010 (Intel Core 2 Duo)** to **2024 (M4 Series)**.
- **Performance Leaderboard**: Interactive table with sorting (Score, Price, Year) and filtering (Device Type, Chip Family).
- **Visualizations**: Top 15 Performance Index chart using Recharts.
- **AI Advisor**: Integrated **Google Gemini 3 Flash** for real-time purchasing advice and technical Q&A.
- **Design System**: Pixel-perfect Apple aesthetic featuring:
  - San Francisco font stack.
  - Glassmorphism effects (backdrop-blur).
  - Dark mode support.
  - Smooth animations and transitions.
- **Internationalization**: Full support for 10 languages including English, Chinese (Simplified), Spanish, French, German, Japanese, Portuguese, Russian, Korean, and Hindi.
- **Detail View**: "Quick Look" style modal for deep diving into specific model specifications.

### Changed
- **UI/UX**: Overhauled interface to match Apple's official website design language (sticky headers, segmented controls).
- **Data Coverage**: Expanded dataset to include legacy Intel models (2010-2019) alongside Apple Silicon to support "After 2010" collection requirements.
- **Localization**: Updated Chinese translation for "Leaderboard" to "性能天梯" (Performance Ladder) for better cultural context.
- **Performance**: Optimized chart height (600px) and margins to prevent content overflow on smaller screens.

### Fixed
- Fixed horizontal scrollbar issues on mobile devices by applying `overflow-x-hidden`.
- Corrected layout rendering for the Top 15 chart to ensure labels are legible.
