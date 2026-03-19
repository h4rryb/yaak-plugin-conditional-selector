# Changelog

All notable changes to the Yaak Conditional Selector Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-03-19

### Changed
- Updated `@yaakapp/api` dependency from `^0.6.4` to `^0.8.3` for compatibility with Yaak 2026.3.1
- Changed imports to use `type` for better TypeScript performance
- Added minimum Yaak version requirement (`>=2026.3.0`) in package.json

### Added
- `tsconfig.json` for proper TypeScript configuration
- `.npmignore` for cleaner package publishing
- `INSTALLATION.md` with comprehensive setup and testing guide
- `CHANGELOG.md` to track version changes
- Engine specification for Yaak version compatibility

### Fixed
- Ensured compatibility with latest Yaak plugin API changes

## [0.0.3] - Previous Version

### Added
- Initial public release
- Four template functions: `conditional`, `conditional.equals`, `conditional.contains`, `conditional.regex`
- Support for comparison operators: `==`, `!=`, `>`, `<`, `>=`, `<=`
- Environment variable integration
- Comprehensive README documentation

### Features
- Basic conditional selection based on boolean conditions
- Equality checking between two values
- String contains checking
- Regular expression pattern matching
- Truthy/falsy value evaluation
- Nested conditional support

## [Unreleased]

### Planned
- Add `conditional.range()` for numeric range checking
- Add `conditional.empty()` for checking empty strings/arrays
- Performance optimizations for complex nested conditions
- Better error messages when conditions fail to evaluate