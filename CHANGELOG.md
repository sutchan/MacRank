# Changelog

All notable changes to this project will be documented in this file.

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
