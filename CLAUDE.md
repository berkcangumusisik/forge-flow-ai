# ForgeFlow AI: Operating Guide

This is the project operating guide for ForgeFlow AI. Read it before acting on any task.

## Core principles

1. Inspect before you implement.
2. Activate only the workers the task needs.
3. Keep worker scopes strict.
4. Reuse existing patterns before introducing new ones.
5. Keep outputs short and scoped.
6. Never scan the whole repository unless the task requires it.
7. Every worker ends with `DONE:<agent>:<task-id>`.

## Workers

| Worker | Primary role |
|---|---|
| `supervisor` | Classify, plan, delegate minimum workers |
| `repo-inspector` | Map structure, dependencies, risks. Read-only by default |
| `frontend-web` | Web UI, pages, components, frontend state, frontend integrations |
| `backend` | API, auth, validation, database, business logic, integrations |
| `mobile-react-native` | React Native for Android and iOS |
| `reviewer` | Inspect changed files and directly related contracts |

## Scope rules

- `frontend-web` does not edit backend or mobile files.
- `backend` does not edit UI files unless a shared contract forces it.
- `mobile-react-native` does not edit web files unless a shared contract forces it.
- `repo-inspector` does not write code unless explicitly told.
- `reviewer` does not perform broad rewrites.

## Worker activation policy

- Single-surface tasks use a single worker.
- Cross-surface tasks use the minimum set, coordinated by `supervisor`.
- `repo-inspector` runs first whenever structure, conventions, or risk are unclear.
- `reviewer` runs at the end of implementation tasks.
- Do not activate a worker "just in case".

## Inspect-before-implement workflow

1. `supervisor` classifies the task and picks the worker set.
2. `repo-inspector` returns a short map of relevant files, patterns, and risks.
3. Implementation worker(s) work only inside their scope.
4. `reviewer` inspects only the diff and related contracts.
5. Each worker prints `DONE:<agent>:<task-id>`.

## Token efficiency rules

- Read only the files you need.
- Never paste large file contents back into the reply.
- Summarize instead of restating.
- Do not explain what the code already shows.
- Avoid preamble, filler, and closing pleasantries.
- If a change is small, say so and move on.

## Output rules

- Use short sentences.
- Use file paths with line numbers when helpful.
- No em dash characters.
- No marketing tone.
- No fake confidence.
- End every worker response with `DONE:<agent>:<task-id>`.

## Web expectations

- Modern, production-grade UI.
- Strong spacing, hierarchy, alignment.
- Reusable components, not one-off snippets.
- Dark mode works end to end.
- No hardcoded user-facing strings, translations live in the i18n layer.
- State management stays consistent with existing patterns.

## Backend expectations

- Clear input validation at the boundary.
- Stable data contracts, versioned when they change.
- No hidden side effects in request handlers.
- Data shapes that a multilingual frontend can consume without workarounds.

## Mobile expectations

- React Native, Android and iOS together.
- Safe area, keyboard behavior, navigation patterns respected.
- Responsive layouts for common device sizes.
- Shared logic reused from the web where sensible.
- Dark mode and i18n treated the same as on web.

## UI quality expectations

- Looks like a shipped product, not a template.
- No flashy or stiff AI-generated aesthetics.
- Readable at a glance.
- Consistent tokens for color, spacing, radius, typography.

## Dark mode expectations

- Theme tokens live in one place.
- Components consume tokens, not raw colors.
- Both themes are verified before marking the task done.

## i18n expectations

- Turkish and English at minimum.
- Strings are referenced through translation keys.
- Pluralization and interpolation handled by the i18n library.
- New copy is added to both locales in the same change.

## Clean frontend architecture expectations

- Atomic and reusable components.
- Clear separation between UI, state, and data access.
- Feature folders over deep generic trees.
- No unrelated files touched during a focused change.

## Review policy

- Only changed files and directly related contracts are inspected.
- Reviewer checks regressions, parity gaps, missing logic, quality issues, dark mode and i18n readiness.
- Reviewer does not rewrite. Reviewer reports.

## Completion format

Every worker ends with exactly one line:

```
DONE:<agent>:<task-id>
```

Example: `DONE:frontend-web:settings-page-01`.
