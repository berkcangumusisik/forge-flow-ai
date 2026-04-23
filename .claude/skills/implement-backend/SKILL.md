---
name: implement-backend
description: Implement a scoped backend change: endpoint, validation, data access, auth, or business logic. Keeps contracts stable and i18n-friendly. Use when the task is clearly backend-only.
---

# Implement Backend

Ship a focused backend change with clear contracts.

## Preconditions

- Relevant routes, models, and validators are known.
- The contract change (if any) is understood by the caller.

## Steps

1. Read only the modules you will change plus their direct neighbors.
2. Match existing validation, error, and repository patterns.
3. Validate inputs at the boundary.
4. Keep responses stable or version them if they break.
5. Add or update tests that already exist in the area.

## Contract checklist

- Request and response types declared in one place.
- Errors use structured codes plus user-safe messages, not hardcoded English.
- Pagination, filtering, and sorting follow existing conventions.

## Security checklist

- Auth enforced where required.
- No secrets or PII in logs.
- Input size limits and type checks in place.

## i18n-friendly data

- Return codes the frontend can translate.
- Do not embed locale-specific copy in fixed fields.
- Dates and numbers sent in raw form, formatted on the client.

## Output

- Short list of files changed.
- Any contract change called out on its own line.
- End with `DONE:backend:<task-id>`.
