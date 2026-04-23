# Contributing to ForgeFlow AI

Thanks for considering a contribution. ForgeFlow AI is built around focus, so keep contributions focused too.

## Ground rules

- Keep PRs small and scoped.
- One concern per PR.
- No broad rewrites in unrelated files.
- Match existing patterns before inventing new ones.
- Respect the worker scopes defined in `CLAUDE.md`.

## Before you start

1. Open an issue describing the change.
2. Wait for a short discussion if the change is non-trivial.
3. Reference the issue in your PR.

## Style

- Clear, short writing.
- No em dash characters.
- No marketing tone in docs.
- No filler in agent and skill files.

## Agent and skill changes

- Keep role, scope, and output sections intact.
- Keep the `DONE:<agent>:<task-id>` contract.
- Do not introduce cross-scope responsibilities.

## UI changes in examples

- Dark mode must work.
- Strings go through the i18n layer.
- Components should be reusable where reasonable.

## Commits

- Present tense, short subject line.
- Body only when needed.

## Review

PRs go through the `reviewer` mindset: only the diff and directly related contracts. If a review comment is out of scope, open a follow-up issue instead of expanding the PR.
