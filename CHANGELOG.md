# Changelog

All notable changes to Tavo Memory Curator are documented here.

The project is currently in beta and may change before 1.0.0.

## [0.6.0-beta] - 2026-07-15

### Added

- Copy button for the complete raw AI response after a parsing failure
- Failure diagnostics showing response length and whether memory tags or category labels were detected
- Parsing support for category headings, unbulleted labels, bold Markdown labels, and categorized section lists

### Changed

- Plugin interface now inherits Tavo's selected font instead of forcing the device system font
- AI completion allowance increased from 2,400 to 8,192 tokens for reasoning-model compatibility
- AI prompt now requests the final tagged response immediately without exposed reasoning

### Fixed

- Removed the silent 250-memory proposal truncation limit
- Raw-response preview truncation no longer affects copying the complete response

## [0.5.1-beta] - 2026-07-12

### Added

- Public beta documentation and MIT license
- Recommended companion summary-memory prompt

### Improved

- Reduced the static AI-cleanup prompt from 326 to 193 words
- Compact memory-array serialization
- Cleanup explanations limited to five material changes
- Completion ceiling reduced from 3000 to 2400 tokens

## [0.5.0] - 2026-07-12

- Draggable launcher with tap-versus-drag detection
- Edge snapping and normalized cross-screen positioning
- Position persistence, viewport clamping, and reset control

## [0.4.1] - 2026-07-12

- Replaced JSON-only AI output with resilient tagged-text parsing
- Added direct bullet, numbered-line, and legacy JSON fallbacks
- Added expandable raw-response diagnostics

## [0.4.0] - 2026-07-12

- Added explained cleanup choices and proposal-source labeling
- Added AI spinner, status messages, and pulsing placeholders
- Corrected pre-proposal counters and backup availability state

## [0.3.0] - 2026-07-12

- Simplified memory organization to CORE, CURRENT, HISTORY, and OPEN
- Added normalization for older category names

## [0.1.0] - 2026-07-12

- Initial review-first Tavo Memory Curator proof of concept
