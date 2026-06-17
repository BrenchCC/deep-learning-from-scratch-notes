---
name: qmd-bilingual-note-publisher
description: Polish a completed Chinese Quarto note, create or update the matching English QMD page, and verify the Deep-Learning-Notes website build. Use when the user has finished a Chinese note under zh/ and asks to refine it with proseforge-zh, translate it to the corresponding en/ directory, fix QMD/site issues, update navigation when needed, or run Quarto validation/rendering for publication.
---

# QMD Bilingual Note Publisher

Use this workflow for this repository's bilingual Quarto notes after a Chinese `.qmd` draft is ready.

## Core Workflow

1. Identify the source Chinese QMD file.
   - Prefer the explicit path from the user or the newest relevant file under `zh/`.
   - Treat the English target as the same relative path with the leading `zh/` replaced by `en/`.
   - Preserve the repository's existing directory spelling, including `chatper02-pytorch-introduction`, unless the user explicitly asks to rename paths.

2. Inspect repository context before editing.
   - Read the source `.qmd`, the matching English file if it exists, `_quarto.yml`, and nearby sibling chapters.
   - Check for duplicate or near-duplicate chapter filenames before creating a new file.
   - Do not overwrite unrelated user changes. If the target English file already has content, merge carefully instead of replacing blindly.

3. Polish the Chinese note with `proseforge-zh`.
   - Read `/Users/brench/.codex/skills/proseforge-zh/SKILL.md` completely before editing Chinese prose.
   - Apply the proseforge-zh rules to prose sections only.
   - Preserve Quarto front matter, code chunks, inline code, math, citations, cross-references, anchors, figure paths, tables, and technical names unless they are clearly broken.
   - Keep a technical-report style: problem definition, mechanism, evidence, limitation, conclusion.
   - Do not reduce technical detail, examples, derivations, or caveats without asking the user first.

4. Create or update the English QMD.
   - Translate from the polished Chinese version, not from the unpolished draft.
   - Preserve QMD structure, heading hierarchy, code blocks, math blocks, citations, labels, figure paths, and cross-references.
   - Translate prose into direct technical English. Avoid promotional phrasing, vague claims, inflated conclusions, and generic "future work" endings.
   - Keep established technical terms in English when they are standard: tensor, DataLoader, autograd, gradient, optimizer, module, batch, epoch, RoPE, attention, transformer.
   - Adapt front matter fields such as `title`, `description`, and `lang` when present; do not invent metadata that neighboring pages do not use.

5. Repair QMD and website integration.
   - Ensure YAML front matter delimiters are balanced.
   - Ensure headings are ordered consistently with nearby chapters.
   - Ensure code fences and math delimiters are closed.
   - Ensure internal links point to existing bilingual paths where possible.
   - Update `_quarto.yml` only when the new page is not covered by existing render/sidebar globs or when the user asks for explicit navigation changes.
   - Avoid editing generated `_site/` output.

6. Verify.
   - Run `quarto render <source-qmd>` and `quarto render <english-target-qmd>` for focused validation.
   - Run `quarto render` when navigation, shared assets, citations, or site configuration changed.
   - If a command fails because Quarto is missing or an external dependency is unavailable, report the exact blocker and the files already updated.
   - Do not run Python commands unless the user has provided the Conda environment name for this project.

## Output Expectations

When finished, report:

- Chinese source file updated.
- English target file created or updated.
- `_quarto.yml` or other site files changed, if any.
- Verification commands run and whether they passed.
- Any remaining manual review points, especially translation choices, broken references, or build blockers.
