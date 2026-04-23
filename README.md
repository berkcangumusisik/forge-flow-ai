<div align="center">

# ⚡ ForgeFlow AI

### Focused multi-agent engineering for Claude Code.
#### Scoped workers. Low tokens. Production-grade UI, dark mode, and i18n by default.

<br />

**🌐 Language:** **English** · [Türkçe](README.tr.md)

<br />

[![License: MIT](https://img.shields.io/badge/License-MIT-000000.svg?style=for-the-badge)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Built_for-Claude_Code-CC785C?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.com/claude-code)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-3DDC84?style=for-the-badge)](CONTRIBUTING.md)
[![Made in TR](https://img.shields.io/badge/Made_in-Türkiye-E30A17?style=for-the-badge)](README.tr.md)

<br />

![GitHub stars](https://img.shields.io/github/stars/berkcangumusisik/forge-flow-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/berkcangumusisik/forge-flow-ai?style=social)
![GitHub issues](https://img.shields.io/github/issues/berkcangumusisik/forge-flow-ai)
![GitHub last commit](https://img.shields.io/github/last-commit/berkcangumusisik/forge-flow-ai)

<br />

> **Most multi-agent repos create more noise. ForgeFlow AI creates more focus.**

<br />

![ForgeFlow AI running 6 workers in a tiled tmux layout](docs/hero.png)

<br />

[Quick Start](#-quick-start) · [The Team](#-the-team) · [Usage](#-example-usage) · [Multi-language setup](#-multi-language-readme-setup) · [Türkçe README](README.tr.md)

</div>

---

## 🧭 What is ForgeFlow AI?

ForgeFlow AI is a multi-agent engineering workflow that lives inside your Claude Code project. It ships six scoped workers (supervisor, repo-inspector, frontend-web, backend, mobile-react-native, reviewer), one slash command, and five skill guides. The goal is simple: stop burning tokens and stop touching unrelated files.

- 🔍 **Inspect before you implement.** A repo-inspector maps the relevant parts of the codebase first.
- 🎯 **Strict worker scopes.** Web workers do not touch backend. Backend does not touch UI. Mobile does not touch web.
- 🪶 **Low token by design.** No full-repo scans. No file dumps. No restating the task.
- 🎨 **UI that looks shipped.** Dark mode, i18n, modern spacing, real component reuse.
- 📱 **Mobile is React Native.** Android and iOS together, no platform drift.
- ✅ **Every worker ends clean.** `DONE:<agent>:<task-id>`.

---

## ✨ Why this exists

Most multi-agent repos feel like prompt dumps. They waste tokens, rewrite files you did not ask about, and hand you a wall of output. ForgeFlow AI was built for working developers who want a real, repeatable workflow they can trust. It reads less. It writes less. It ships more.

---

## 🧩 What makes it different

| | Typical multi-agent repo | ForgeFlow AI |
|---|---|---|
| Repo reads | Whole-repo scans | Scoped inspection only |
| Worker scope | Loose, overlapping | Strict, non-overlapping |
| Review step | Full re-read | Diff and related contracts only |
| UI defaults | None | Dark mode, i18n, reusable components |
| Mobile | Bolt-on or missing | React Native, Android and iOS first-class |
| Completion | Open-ended | `DONE:<agent>:<task-id>` |

---

## 👥 The team

| Worker | Role |
|---|---|
| 🧠 `supervisor` | Classifies the task, activates only the workers needed |
| 🔎 `repo-inspector` | Maps structure, dependencies, and risks. Read-only by default |
| 🎨 `frontend-web` | Web UI, pages, components, frontend state and integrations |
| ⚙️ `backend` | API, auth, validation, database, business logic |
| 📱 `mobile-react-native` | React Native for Android and iOS |
| 🧪 `reviewer` | Inspects only the diff and related contracts |

---

## 🪶 Low token philosophy

- No full-repo scans unless the task truly needs one.
- Workers read only the files tied to their scope.
- Outputs stay short. No filler, no restating the task, no closing pleasantries.
- Existing patterns beat new abstractions every time.
- One worker per scope, not one worker per thought.

---

## 🎨 UI, dark mode, and i18n

ForgeFlow AI treats UI quality as a requirement, not a bonus.

- ✅ Modern, production-grade look. No template feel, no AI stiffness.
- ✅ Dark mode is first-class. Theme tokens centralized.
- ✅ Strings live in the i18n layer. Turkish and English minimum.
- ✅ Reusable components over one-off snippets.
- ✅ Responsive and accessible by default.

The `frontend-web` and `mobile-react-native` agents refuse to ship hardcoded colors or hardcoded user-facing strings. The `reviewer` flags both as findings.

---

## 🎬 Demo

![ForgeFlow AI demo](docs/demo.gif)

---

## 🚀 Quick Start

### 1. Prerequisites

- [Claude Code](https://claude.com/claude-code) installed and signed in.
- Any project you want to work on (Next.js, NestJS, Expo, React Native CLI, monorepo, anything).
- **tmux** (recommended) for the split-pane layout. The installer offers to install it automatically. To install manually:

| Platform | Command |
|---|---|
| macOS (Homebrew) | `brew install tmux` |
| Ubuntu / Debian | `sudo apt-get install tmux` |
| Fedora | `sudo dnf install tmux` |
| Arch | `sudo pacman -S tmux` |
| Alpine | `sudo apk add tmux` |
| Windows + MSYS2 | `pacman -S tmux` |
| Windows + WSL | run the Ubuntu/Debian command inside WSL |
| Windows (native) | tmux is not available, use `--windows` mode with Windows Terminal |

### 2. Install with one command

From the root of any project:

```bash
curl -fsSL https://raw.githubusercontent.com/berkcangumusisik/forge-flow-ai/main/install.sh | bash
```

Or pass a target directory:

```bash
curl -fsSL https://raw.githubusercontent.com/berkcangumusisik/forge-flow-ai/main/install.sh | bash -s -- /path/to/project
```

The installer will:

1. Copy `.claude/` and `CLAUDE.md` into your project.
2. Set up the inter-terminal message bus at `.forgeflow/`.
3. Open **5 Claude Code worker terminals**, one per worker: `repo-inspector`, `frontend-web`, `backend`, `mobile-react-native`, `reviewer`.

#### Manual install (alternative)

```bash
git clone https://github.com/berkcangumusisik/forge-flow-ai.git
cd forge-flow-ai
./install.sh /path/to/your/project
```

#### Installer flags

```text
./install.sh [target-dir] [--no-spawn] [--tmux|--windows] [--workers=<set>]
```

| Flag | Effect |
|---|---|
| `--no-spawn` | Copy files only, do not open terminals |
| `--tmux` | Force the tmux tiled layout (single window, all panes on one screen) |
| `--windows` | Force separate terminal windows |
| `--workers=<set>` | Choose which workers to spawn (see presets below) |

Default: uses tmux if available (offers to install it), otherwise separate windows. All 5 workers by default.

#### Worker presets

Pick the smallest set your task needs. Smaller set = bigger panes = easier on the eyes.

| Preset | Workers spawned |
|---|---|
| `--workers=web` | `frontend-web`, `reviewer` |
| `--workers=backend` | `backend`, `reviewer` |
| `--workers=backend-only` | `backend` |
| `--workers=full-stack` | `frontend-web`, `backend`, `reviewer` |
| `--workers=mobile` | `mobile-react-native`, `reviewer` |
| `--workers=all` | all 5 (default) |
| `--workers=a,b,c` | custom, comma-separated worker names |

#### Examples

```bash
# Full stack (web + backend)
./install.sh ~/Desktop/my-app --tmux --workers=full-stack

# Landing page or pure web work
./install.sh ~/Desktop/site --tmux --workers=web

# Pure API project
./install.sh ~/Desktop/api --tmux --workers=backend

# Mobile only
./install.sh ~/Desktop/mobile-app --tmux --workers=mobile

# Custom set
./install.sh ~/Desktop/proj --tmux --workers=frontend-web,backend,reviewer

# All 5 workers, tmux layout
./install.sh ~/Desktop/proj --tmux
```

The file-based bus is always installed with inboxes for every worker, even ones you did not spawn. You can spawn more workers later by re-running the installer with a different `--workers` set.

### 3. Run your first task

In any of the 5 terminals, type:

```text
/forgeflow add a settings page with theme toggle and language switcher
```

The `supervisor` classifies the task, activates only the workers needed, and routes the work. Every worker ends with `DONE:<agent>:<task-id>`.

---

## 📡 Inter-terminal communication

The 5 terminals can talk to each other through a tiny file-based bus installed at `.forgeflow/bus/`. Each worker has an inbox log. A helper CLI `ff` lives at `.forgeflow/bin/ff` and is on `PATH` inside the spawned terminals.

### Commands

```bash
ff send <worker> "<message>"     # send a message to a specific worker
ff broadcast "<message>"         # send to all workers
ff watch                         # tail your own inbox (live)
ff recv                          # print and clear your inbox
ff ls                            # list all inboxes and sizes
ff clear <worker>                # truncate an inbox
```

Each terminal exports `FF_WORKER=<name>` automatically, so `send` knows who the sender is.

### Example flow

```text
# in the backend terminal
ff send frontend-web "GET /api/invoices now returns items:[] in dark-mode safe format"

# in the frontend-web terminal
ff recv
# [14:22:07] from=backend: GET /api/invoices now returns items:[] in dark-mode safe format
```

### Layout with tmux

Single window, tiled layout, mouse enabled. All workers visible at once.

```
┌────────────────┬────────────────┬────────────────┐
│ repo-inspector │ frontend-web   │ backend        │
│ claude         │ claude         │ claude         │
│                │                │                │
├────────────────┼────────────────┼────────────────┤
│ mobile-rn      │ reviewer       │ bus monitor    │
│ claude         │ claude         │ tail -F *.log  │
│                │                │                │
└────────────────┴────────────────┴────────────────┘
```

- **Click any pane** to focus it. Mouse is on.
- **Drag splitters** with the mouse to resize panes.
- **Scroll** inside a pane with the trackpad.
- `Ctrl+b z` zooms the active pane to full screen, press again to restore.
- `Ctrl+b arrow` moves focus with the keyboard.
- `Ctrl+b d` detaches the session. Reattach with `tmux attach -t forgeflow`.

The layout adapts to how many workers you spawn. `--workers=web` gives you 3 panes (frontend-web, reviewer, bus monitor), which is much roomier on a laptop screen.

### Platform matrix

| Platform | Default layout |
|---|---|
| macOS | tmux if installed, otherwise Terminal.app or iTerm2 windows |
| Linux | tmux if installed, otherwise gnome-terminal / konsole / xterm / etc. |
| Windows (WSL, MSYS2) | tmux if installed |
| Windows (native) | Windows Terminal (`wt.exe`) split tabs, falls back to plain `cmd` windows |

> tmux is **not** bundled with Windows. Options: use WSL (`sudo apt install tmux`), MSYS2 (`pacman -S tmux`), or skip tmux and use Windows Terminal with `--windows` mode. Plain CMD and PowerShell do not have tmux.

---

## 💡 Example usage

```text
/forgeflow add a settings page with theme toggle and language switcher
```

```text
/forgeflow build a POST /api/invoices endpoint with zod validation
```

```text
/forgeflow add an onboarding flow to the mobile app with 3 screens
```

```text
/forgeflow review the current branch before merging
```

```text
/forgeflow inspect the payments module and list its risks
```

---

## 🌐 Multi-language README setup

ForgeFlow AI keeps one README file per language. The pattern is simple and works on any GitHub repo.

### How it works

1. **`README.md`** is the English version. GitHub renders this by default on the repo page.
2. **`README.tr.md`** is the Turkish version.
3. A **language switcher** sits at the top of both files, linking to the other one.
4. Badges, section order, and anchors stay consistent across both files so the experience feels unified.

### File layout

```
forge-flow-ai/
├── README.md        # English, default
└── README.tr.md     # Türkçe
```

### Add a new language

1. Copy `README.md` to `README.<locale>.md` (for example `README.de.md`).
2. Translate the content. Keep the section order and anchors identical.
3. Update the language switcher at the top of **every** README file so each one links to all the others.

Example switcher line:

```md
🌐 Language: English · [Türkçe](README.tr.md) · [Deutsch](README.de.md)
```

### Tips

- Keep file names lowercase with an ISO locale suffix (`.tr`, `.de`, `.es`).
- Do not translate code blocks, commands, or file paths.
- Keep headings short so the anchors stay clean.
- When you add a new section, add it to every locale in the same PR. Do not let languages drift apart.

This same philosophy is mirrored inside the agents: the `frontend-web` and `mobile-react-native` workers refuse to hardcode user-facing strings and require translation keys in every supported locale.

---

## 🗂 Repository structure

```
forge-flow-ai/
├── .claude/
│   ├── commands/
│   │   └── forgeflow.md            # main slash command
│   ├── agents/
│   │   ├── supervisor.md
│   │   ├── repo-inspector.md
│   │   ├── frontend-web.md
│   │   ├── backend.md
│   │   ├── mobile-react-native.md
│   │   └── reviewer.md
│   └── skills/
│       ├── inspect-task/SKILL.md
│       ├── implement-web/SKILL.md
│       ├── implement-backend/SKILL.md
│       ├── implement-mobile/SKILL.md
│       └── review-diff/SKILL.md
├── CLAUDE.md                       # project operating guide
├── CONTRIBUTING.md
├── LICENSE
├── README.md                       # English
└── README.tr.md                    # Türkçe
```

---

## 🛣 Roadmap

- [ ] Optional `desktop` worker (Electron / Tauri)
- [ ] Optional `devops` worker for CI and deploy tasks
- [ ] Preset stacks for Next.js, Expo, NestJS
- [ ] Starter theme and i18n packs
- [ ] Example repos wired to ForgeFlow
- [ ] VS Code snippet pack for the `DONE:` marker

---

## 🤝 Contributing

PRs are welcome. Keep them small, scoped, and aligned with the worker boundaries in [CLAUDE.md](CLAUDE.md). Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening one.

---

## ⭐ Star history

<a href="https://star-history.com/#berkcangumusisik/forge-flow-ai&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=berkcangumusisik/forge-flow-ai&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=berkcangumusisik/forge-flow-ai&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=berkcangumusisik/forge-flow-ai&type=Date" />
  </picture>
</a>

---

## 📄 License

MIT. See [LICENSE](LICENSE).

---

<div align="center">

### Build less. Focus more. Ship sharper.

[Türkçe README →](README.tr.md)

</div>
