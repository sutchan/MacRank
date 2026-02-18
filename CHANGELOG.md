# Changelog

All notable changes to this project will be documented in this file.

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
