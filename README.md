# Tavo Memory Curator

> **Beta software:** Tavo Memory Curator is functional and tested on Android, but its interface and cleanup behavior may change. Always review an AI proposal before replacing memories.

Tavo Memory Curator is a plugin for [Tavo](https://tavoai.dev/) that helps review, consolidate, edit, and safely replace a chat's long-term memories. It works directly with Tavo's memory system instead of inserting cleanup prompts into the visible RPG conversation.

Current beta release: **v0.5.1-beta**

## Downloads

- [Installable Tavo plugin (`.tpg`)](downloads/tavo-memory-curator-0.5.1.tpg?raw=1)
- [Source archive (`.zip`)](downloads/tavo-memory-curator-0.5.1-source.zip?raw=1)
- [Recommended companion summary prompt](TAVO_MEMORY_CURATOR_SUMMARY_PROMPT.md)
- [SHA-256 checksums](downloads/SHA256SUMS.txt)

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
- Includes a draggable launcher that snaps to either screen edge and remembers its relative position across chats and screen sizes
- Shows visible progress during AI analysis
- Accepts tagged text, categorized bullet lists, numbered lines, and legacy JSON model responses
- Displays the raw AI response if parsing fails
- Requests no file, network, input-box, or chat-message access

## Requirements

- Tavo **0.91.0 or newer**
- **Advanced Rendering** enabled for the floating interface
- A working model/API configured in the current chat to use **Analyze with AI**

Basic Cleanup does not require an AI request.

## Installation

1. Download [`tavo-memory-curator-0.5.1.tpg`](downloads/tavo-memory-curator-0.5.1.tpg?raw=1).
2. Save the file on the Android device running Tavo.
3. In Tavo, open **Settings → Plugins → Install**.
4. Select the downloaded `.tpg` file.
5. Enable **Tavo Memory Curator** if necessary.
6. Make sure **Advanced Rendering** is enabled.
7. Open a chat containing Tavo Memories.

## Using the plugin

### Open and position the launcher

- Tap the small star launcher to open Memory Curator.
- Drag it to reposition it.
- Release it to snap to the nearest screen edge.
- Use **Reset launcher position** inside the panel if needed.

The position is stored as an edge plus a vertical percentage, so it adapts to different screen sizes and orientations.

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

- AI cleanup uses one private model request per press.
- The request uses `context: false`, so the plugin sends the memory array rather than the full conversation context.
- The static cleanup prompt was reduced by about 41% before this public beta.
- Memories are serialized compactly without indentation whitespace.
- Cleanup explanations are limited to five material changes.
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

No memories are changed when proposal generation or parsing fails.

### The launcher is inconveniently placed

- Drag it to another position and release to snap to an edge.
- Use **Reset launcher position** inside the curator.

## Beta limitations

- AI cleanup is advisory and may make factual mistakes.
- UI placement can vary with Tavo or WebView changes.
- Only the most recent curator-created backup is retained per chat.
- The plugin has primarily been tested on Android.

Please report reproducible problems through GitHub Issues and include the Tavo version, device, configured model, exact error text, and steps to reproduce. Do not include private role-play content unless necessary.

## Development

Plugin structure:

```text
manifest.json
ui/
└── panel.html
TAVO_MEMORY_CURATOR_SUMMARY_PROMPT.md
```

Tavo `.tpg` files are ZIP-format packages with `manifest.json` at the archive root.

## License

Released under the [MIT License](LICENSE).

Tavo Memory Curator is an independent community project and is not affiliated with or endorsed by Tavo.
