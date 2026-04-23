---
name: implement-web
description: Implement a scoped web UI or frontend change with modern UI quality, dark mode, and i18n. Use when the task is clearly web-only and the relevant patterns are known.
---

# Implement Web

Ship a focused web change that looks and behaves like production.

## Preconditions

- Relevant patterns and files are known (run `inspect-task` first if not).
- You have a clear scope and a task ID.

## Steps

1. Read only the files you will change plus their direct neighbors.
2. Match existing component structure, naming, and styling tokens.
3. Add translation keys to every supported locale (English and Turkish minimum).
4. Use theme tokens for color, spacing, radius, typography.
5. Verify dark mode rendering mentally or with a quick runtime check.
6. Keep the change atomic: no drive-by refactors.

## UI checklist

- Spacing scale consistent with the rest of the app.
- Typography hierarchy clear at a glance.
- Interactive states present (hover, focus, disabled).
- Accessible: focus rings, labels, contrast.
- Responsive at the breakpoints the project already supports.

## Dark mode checklist

- No raw hex or `rgb(...)` outside the theme layer.
- Background, surface, border, text tokens used correctly.
- Images and icons adapt or have both variants where needed.

## i18n checklist

- Every user-facing string uses a translation key.
- Keys added to `en` and `tr` in the same change.
- Pluralization and interpolation use the i18n library, not string concatenation.

## Output

- Short list of files changed.
- One line per meaningful change.
- End with `DONE:frontend-web:<task-id>`.
