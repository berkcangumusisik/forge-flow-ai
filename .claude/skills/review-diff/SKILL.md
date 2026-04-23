---
name: review-diff
description: Review only the current diff and directly related contracts. Flag regressions, parity gaps, missing logic, quality issues, dark mode misses, and i18n misses. Do not rewrite.
---

# Review Diff

Audit changes without expanding the scope.

## Preconditions

- There is a working-tree diff or a branch diff to review.

## Steps

1. List changed files via `git diff --name-only` (or equivalent).
2. For each file, read the diff and only the surrounding context you need.
3. Open directly related contracts (types, schemas, shared components) when a change could affect them.
4. Do not open unrelated files.

## What to look for

- Regressions in nearby behavior.
- Parity between web and mobile when both exist.
- Missing error handling at real boundaries.
- Validation gaps on backend inputs.
- Hardcoded colors outside the theme layer.
- Hardcoded user-facing strings outside the i18n layer.
- Missing translations in supported locales.
- Dead code introduced by the change.

## Report shape

```
Blockers:
  - path:line  <short note>

Quality:
  - path:line  <short note>

Nits:
  - path:line  <short note>

UI (if touched):
  - dark mode: pass | fail  <short note>
  - i18n: pass | fail  <short note>

Parity (if web + mobile):
  - <short note>
```

## Anti-patterns

- Rewriting code.
- Commenting on files outside the diff.
- Pasting whole files.
- Vague "could be cleaner" notes without a concrete issue.

## Completion

End with:

```
DONE:reviewer:<task-id>
```
