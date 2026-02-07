# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
