# Tavo 1.7.0 compatibility maintenance

Checked against the current official plugin and JavaScript API documentation on 2026-10-12. Documentation is live and not a pinned 1.7.0 snapshot. No live Tavo instance is connected here; in-app behavior still requires verification.

- Legacy synchronous variable APIs remain documented as supported; no wholesale persistence migration is necessary.
- Panel controls now respect host navigation and composer insets, with conservative fallbacks.
- Existing state keys, plugin IDs and data schema are preserved.
- Includes the previous unmerged maintenance baseline; StoryState additionally retains dev.12 UI, model-free NPC recovery and enrichment.
- Model-using plugins now pass native request timeouts in addition to local waiting limits.
- Memory Curator rejects proposals when the loaded memory snapshot differs from current memories; the host does not expose an atomic compare-and-swap, so concurrent changes during the write itself cannot be excluded.
- Runtime localization remains partial; this pass does not claim complete multilingual support.

## Validation

Run the repository tests and syntax/build checks. Install the TPG in a backup chat, open and close the panel on desktop and phone, focus an input, switch chats, and confirm normal sends work. For StoryState test a scan and NPC enrichment. For Memory Curator prepare a proposal, change memories externally, then ensure Apply refuses it. For Visual Library test native import, /show and smart invocation.

References: https://docs.tavoai.dev/en/guides/plugin-development/ and https://docs.tavoai.dev/en/guides/javascript-api/
