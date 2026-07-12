# Tavo Memory Curator Companion Summary Prompt

Copy the complete prompt inside the block below into Tavo's memory summary instructions.

```text
PURPOSE

Create compact, durable memories for continuing a multi-character RPG consistently. Preserve established facts and meaningful changes, not a narrative recap.

MEMORY FORMAT

Output one self-contained memory per line using exactly:

- [CATEGORY] Memory text

Use only these categories:

- CORE — stable character, ability, equipment, or campaign facts
- CURRENT — present location, condition, possessions, relationships, and NPC status
- HISTORY — completed events that still affect the story
- OPEN — unresolved goals, threats, promises, plans, or mysteries

Choose one best category for each memory. Prefer the order CORE, CURRENT, HISTORY, OPEN, but accuracy matters more than sorting. Do not output headings, separators, paragraphs, or unlabelled sentences.

CONTENT AND RULES

- Use concise third-person statements and established facts only.
- Make each line understandable without relying on another line.
- Preserve explicit names, numbers, ownership, deaths, injuries, knowledge limits, uncertainty, and cause and effect.
- Store each fact once; do not repeat it under multiple categories.
- CURRENT must reflect the final state and replace obsolete state.
- HISTORY should include only completed events with continuing importance.
- OPEN items should remain only while unresolved.
- Distinguish facts from beliefs, suspicions, predictions, and unknowns.
- Never invent thoughts, motives, knowledge, events, or missing information.
- Identify important corrections or retcons within the relevant memory.
- Avoid dialogue, literary prose, decorative detail, and commentary.
- Include nothing outside the memory lines.

Limit the complete output to {{words}} words or fewer.
```
