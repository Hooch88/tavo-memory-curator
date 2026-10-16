# Tavo Memory Curator

> **Beta software:** Tavo Memory Curator is functional and tested on Android, but its interface and cleanup behavior may change. Always review an AI proposal before replacing memories.

Tavo Memory Curator is a plugin for [Tavo](https://tavoai.dev/) that helps review, consolidate, edit, and safely replace a chat's long-term memories. It works directly with Tavo's memory system instead of inserting cleanup prompts into the visible RPG conversation.

Current maintenance beta: **v0.7.0-beta.4** (on `codex/tavo-1.7.0`; not yet merged into `main`).

## Downloads

- [Maintenance builds in GitHub Actions](https://github.com/Hooch88/tavo-memory-curator/actions/workflows/build.yml) — open the successful run for `codex/tavo-1.7.0`, download the `tavo-memory-curator` artifact and extract its `.tpg`. GitHub sign-in is required to download workflow artifacts.
- [Recommended companion summary prompt](TAVO_MEMORY_CURATOR_SUMMARY_PROMPT.md)

## Why use it?

Long-running AI role-playing chats can accumulate duplicated, obsolete, overly verbose, or poorly structured memories. Memory Curator provides two review-first cleanup methods and never replaces anything automatically.

## Features

- Reads the current chat's actual Tavo Memories
- **Analyze with AI:** privately proposes consolidation using the model configured for the chat
- **Basic Cleanup:** removes exact duplicates, empty entries, and formatting-only headings without AI interpretation
- Uses four broad, readable memory categories:
  - `CORE` — stable character, ability, equipment, or campaign facts
  - `CURRENT` — present location, condition, possessions, relationships, or NPC status
  - `HISTORY` — completed events with continuing importance
  - `OPEN` — unresolved goals, threats, promises, plans, or mysteries
- Keeps current and proposed memories separate until approval
- Lets you edit or remove every proposed memory
- Shows a concise explanation of material AI changes
- Creates a restorable per-chat backup before replacement
- Rereads every replacement and restores the backup automatically if Tavo does not preserve the requested memory state
- Bounds AI analysis and one syntax-only repair attempt so a provider cannot leave the interface waiting indefinitely
- Opens from the Tavo sidebar without a floating launcher
- Shows visible progress during AI analysis
- Inherits Tavo's selected interface font
- Accepts tagged text, categorized bullets, numbered lines, category headings, common Markdown label styles, and legacy JSON responses
- Displays diagnostics and lets you copy the complete raw AI response if parsing fails
- Never silently truncates a successful proposal to a fixed number of memories
- Requests no file, network, input-box, or chat-message access

## Requirements

- Tavo **0.91.0 or newer**
- **Advanced Rendering** enabled for the floating interface
- A working model/API configured in the current chat to use **Analyze with AI**

Basic Cleanup does not require an AI request.

## Installation

1. Download the maintenance build artifact linked above and extract `tavo-memory-curator-0.7.0-beta.4.tpg`.
2. Save the file on the Android device running Tavo.
3. In Tavo, open **Settings → Plugins → Install**.
4. Select the downloaded `.tpg` file.
5. Enable **Tavo Memory Curator** if necessary.
6. Make sure **Advanced Rendering** is enabled.
7. Open a chat containing Tavo Memories.

## Using the plugin

### Open Memory Curator

Open Tavo's sidebar and choose **Memory Curator**. The panel opens for the current chat. Close it with the panel's close button.

### Refresh memories

The curator reloads memories when opened. Use the refresh button in the panel header if Tavo's memory list changes while the panel is open.

### Basic Cleanup

Basic Cleanup is deterministic and does not call a model. It proposes removal of:

- Exact duplicates
- Empty entries
- Obvious Markdown-only headings

It does not reinterpret or rewrite memory facts.

### Analyze with AI

Analyze with AI sends only the existing memory array and cleanup instructions to the model configured for the current chat. It does **not** send the full RPG conversation through the plugin request (`context: false`).

The model proposes a categorized, consolidated memory list. Review every item before approval: models can still omit, merge, or alter details incorrectly.

### Replace and restore

1. Compare **Current Tavo Memories** with **Proposed Memories**.
2. Edit or remove proposed items as needed.
3. Select **Replace Tavo Memories**.
4. Confirm the warning.

The plugin saves a backup immediately before replacement. Use **Restore Last Backup** to restore that previous list.

## Recommended companion summary prompt

The repository includes [TAVO_MEMORY_CURATOR_SUMMARY_PROMPT.md](TAVO_MEMORY_CURATOR_SUMMARY_PROMPT.md). It is optional but recommended because it asks Tavo to create concise, self-contained memory lines using the same four categories.

Copy the entire file into Tavo's summary-memory prompt setting. The summary prompt works independently; the curator can also clean ordinary or older memory formats.

## Token use

- AI cleanup normally uses one private model request per press. If the response is malformed, the curator may make one bounded syntax-only repair request.
- The request uses `context: false`, so the plugin sends the memory array rather than the full conversation context.
- The static cleanup prompt was reduced by about 41% before this public beta.
- Memories are serialized compactly without indentation whitespace.
- Cleanup explanations are limited to five material changes.
- The main request permits up to 8,192 completion tokens and is bounded to three minutes. A repair, when needed, is bounded to one minute and 6,000 completion tokens. These are ceilings, not fixed charges; providers normally bill actual usage.
- The configured model provider's normal token charges still apply.

Basic Cleanup uses no model tokens.

## Permissions and privacy

The plugin requests:

- `memory` — read and update the current chat's Tavo Memories
- `generate` — request an AI cleanup proposal
- `variable` — store the launcher position and restorable memory backup

It does not request `network`, `file`, `input`, or `message` permission. AI cleanup still sends the supplied memory list to the model provider configured in Tavo; review that provider's privacy policy if this matters to you.

## Troubleshooting

### The launcher does not appear

- Confirm the plugin is enabled.
- Enable Advanced Rendering.
- Restart Tavo after installation.

### Analyze with AI fails

- Confirm the current chat has a working model/API.
- Retry once in case the provider returned a temporary error.
- Expand **View Raw AI Response** if the model returned an unsupported format.
- Use **Copy Raw Response** when reporting a model-specific failure. The diagnostics indicate whether the model returned memory tags or category labels.
- DeepSeek V4 Flash through the direct DeepSeek API, DeepSeek V4 Pro through NanoGPT, and Gemini Flash have produced successful proposals in beta testing.
- DeepSeek V4 Pro through the direct DeepSeek API previously failed before producing a parseable final response. Version 0.6.0's larger completion allowance and parser improvements were subsequently confirmed working in a 15-memory device test.

No memories are changed when proposal generation or parsing fails.

### The launcher is inconveniently placed

- Drag it to another position and release to snap to an edge.
- Use **Reset launcher position** inside the curator.

## Beta limitations

- AI cleanup is advisory and may make factual mistakes.
- Provider and reasoning-model behavior can differ even when the displayed model name is the same.
- UI placement can vary with Tavo or WebView changes.
- Only the most recent curator-created backup is retained per chat.
- The plugin has primarily been tested on Android.

Please report reproducible problems through GitHub Issues and include the Tavo version, device, configured model, exact error text, and steps to reproduce. Do not include private role-play content unless necessary.

## Development

Plugin structure:

```text
manifest.json
entry.js
ui/
└── panel.html
TAVO_MEMORY_CURATOR_SUMMARY_PROMPT.md
```

Tavo `.tpg` files are ZIP-format packages with `manifest.json` at the archive root.

## License

Released under the [MIT License](LICENSE).

Tavo Memory Curator is an independent community project and is not affiliated with or endorsed by Tavo.
