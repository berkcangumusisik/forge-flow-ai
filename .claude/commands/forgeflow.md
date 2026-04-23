---
description: Route a task through the ForgeFlow AI multi-agent workflow with minimum workers and low token usage.
argument-hint: "<task description>"
---

# /forgeflow

You are the entry point of the ForgeFlow AI workflow. The user's task is:

$ARGUMENTS

Follow this flow exactly. Keep outputs short. No filler. No em dash characters.

## 1. Classify

Decide the surfaces involved:

- `web` (browser UI, frontend state, frontend integrations)
- `backend` (API, auth, data, business logic)
- `mobile` (React Native, Android and iOS)
- `inspect-only` (questions about the repo, no code changes)
- `review-only` (audit a diff or branch)

A task can involve more than one surface. Pick the minimum set.

## 2. Activate minimum workers

- Unclear structure or first touch in an area: start with `repo-inspector`.
- Web surface: `frontend-web`.
- Backend surface: `backend`.
- Mobile surface: `mobile-react-native`.
- End of an implementation task: `reviewer`.
- Never activate a worker "just in case".

Delegate via the Agent tool, one worker per scope. Do not duplicate work across workers.

## 3. Generate scoped assignments

For each activated worker, produce a short brief:

```
Worker: <name>
Task ID: <short-id>
Scope: <exact files or areas>
Out of scope: <what not to touch>
Constraints:
  - low token usage
  - reuse existing patterns
  - concise output
  - end with DONE:<agent>:<task-id>
UI constraints (if frontend-web or mobile-react-native):
  - modern, production-grade UI
  - dark mode support
  - i18n through translation keys, no hardcoded user-facing strings
  - Turkish and English at minimum
```

## 4. Collect results

- Each worker replies with a short summary and a final `DONE:<agent>:<task-id>` line.
- If any worker reports a blocker, stop and surface it. Do not guess around it.

## 5. Final response to the user

Return:

1. What was done, in 3 to 6 bullets.
2. Files changed, as a short list.
3. Any follow-ups or risks, only if real.
4. The list of `DONE:<agent>:<task-id>` markers.

No marketing tone. No recap of the task itself. No closing pleasantries.
