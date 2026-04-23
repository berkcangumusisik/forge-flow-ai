---
name: inspect-task
description: Scoped repository inspection for a specific task. Returns a short map of relevant files, patterns, dependencies, and risks without scanning the whole repo. Use before any implementation when the area is unfamiliar.
---

# Inspect Task

Produce a short, useful map of the repo for the given task. Do not implement anything.

## When to use

- First time touching an area.
- Conventions or patterns are unclear.
- You need to decide which workers to activate.

## Steps

1. Identify the likely folders from the task description (e.g. `/web`, `/api`, `/mobile`).
2. Glob the relevant roots. Do not glob the whole repo.
3. Grep for keywords tied to the task (feature name, route, model).
4. Open only the files that directly define the pattern you need to follow.
5. Write the report.

## Report shape

```
Relevant paths:
  - path/to/file.ts
  - path/to/folder/

Patterns to reuse:
  - <one line per pattern>

Dependencies that matter:
  - <library or internal module>

Risks and contracts to protect:
  - <one line per risk>

Recommended workers:
  - <subset of: frontend-web, backend, mobile-react-native>
```

## Anti-patterns

- Full repo scans.
- Pasting file contents.
- Guessing architecture without opening a representative file.
- Recommending every worker "to be safe".
