#!/usr/bin/env bash
#
# ForgeFlow AI installer
#
# Installs ForgeFlow AI into a target project, sets up the inter-terminal
# message bus, and opens 5 Claude Code worker terminals.
#
# Usage:
#   ./install.sh                      # install into current directory
#   ./install.sh /path/to/project     # install into given directory
#   ./install.sh --no-spawn           # install only, do not open terminals
#   ./install.sh --tmux               # force tmux layout (requires tmux)
#   ./install.sh --windows            # force separate terminal windows
#   ./install.sh --help
#
# Requirements:
#   - bash, git
#   - claude (Claude Code CLI) on PATH
#   - tmux (optional but recommended) for the split-pane layout
#
set -euo pipefail

REPO_URL="https://github.com/berkcangumusisik/forge-flow-ai.git"
ALL_WORKERS=(repo-inspector frontend-web backend mobile-react-native reviewer)
WORKERS=("${ALL_WORKERS[@]}")

TARGET=""
NO_SPAWN=0
FORCE_MODE=""
WORKERS_FLAG=""

log()  { printf "\033[1;36m[forgeflow]\033[0m %s\n" "$*"; }
ok()   { printf "\033[1;32m[ok]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[warn]\033[0m %s\n" "$*"; }
err()  { printf "\033[1;31m[error]\033[0m %s\n" "$*" >&2; }

usage() {
  cat <<'EOF'
ForgeFlow AI installer

Usage:
  ./install.sh [target-dir] [--no-spawn] [--tmux|--windows]

Options:
  target-dir           Directory to install into. Defaults to current directory.
  --no-spawn           Install only, do not open terminals.
  --tmux               Force the tmux layout (single window, tiled panes).
  --windows            Force separate terminal windows.
  --workers=a,b,c      Only spawn these workers. Valid names:
                         repo-inspector, frontend-web, backend,
                         mobile-react-native, reviewer
                       Presets: web, backend-only, full-stack, mobile, all
  --help               Show this help.

Worker presets:
  --workers=web          => frontend-web, reviewer
  --workers=backend      => backend, reviewer
  --workers=full-stack   => frontend-web, backend, reviewer
  --workers=mobile       => mobile-react-native, reviewer
  --workers=all          => all 5 (default)

What it does:
  1. Copies .claude/, CLAUDE.md, and bin/ff into the target.
  2. Initializes the .forgeflow/ message bus (one inbox per worker).
  3. Opens 5 worker terminals, each pinned to one worker and
     pre-wired with the bus (tail in a secondary pane or window).
EOF
}

for arg in "$@"; do
  case "$arg" in
    --help|-h)       usage; exit 0 ;;
    --no-spawn)      NO_SPAWN=1 ;;
    --tmux)          FORCE_MODE="tmux" ;;
    --windows)       FORCE_MODE="windows" ;;
    --workers=*)     WORKERS_FLAG="${arg#--workers=}" ;;
    -*)              err "unknown flag: $arg"; usage; exit 1 ;;
    *)               TARGET="$arg" ;;
  esac
done

# Resolve worker set.
if [ -n "$WORKERS_FLAG" ]; then
  case "$WORKERS_FLAG" in
    all)         WORKERS=("${ALL_WORKERS[@]}") ;;
    web)         WORKERS=(frontend-web reviewer) ;;
    backend)     WORKERS=(backend reviewer) ;;
    backend-only) WORKERS=(backend) ;;
    full-stack)  WORKERS=(frontend-web backend reviewer) ;;
    mobile)      WORKERS=(mobile-react-native reviewer) ;;
    *)
      IFS=',' read -r -a WORKERS <<< "$WORKERS_FLAG"
      for w in "${WORKERS[@]}"; do
        ok_match=0
        for a in "${ALL_WORKERS[@]}"; do [ "$a" = "$w" ] && ok_match=1; done
        [ "$ok_match" -eq 1 ] || { err "unknown worker: $w"; exit 1; }
      done
      ;;
  esac
fi

TARGET="${TARGET:-$(pwd)}"
TARGET="$(cd "$TARGET" && pwd)"

command -v git >/dev/null 2>&1 || { err "git is required"; exit 1; }

log "installing ForgeFlow AI into: $TARGET"

TMP_DIR="$(mktemp -d -t forgeflow-XXXXXX)"
trap 'rm -rf "$TMP_DIR"' EXIT

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -d "$SCRIPT_DIR/.claude" ] && [ -f "$SCRIPT_DIR/CLAUDE.md" ]; then
  SRC="$SCRIPT_DIR"
  log "using local repository at: $SRC"
else
  log "cloning $REPO_URL"
  git clone --depth=1 "$REPO_URL" "$TMP_DIR/repo" >/dev/null 2>&1
  SRC="$TMP_DIR/repo"
fi

# --- copy agents / skills / command ---
if [ -d "$TARGET/.claude" ]; then
  warn ".claude/ exists, merging (existing files kept)"
  cp -Rn "$SRC/.claude/." "$TARGET/.claude/"
else
  cp -R "$SRC/.claude" "$TARGET/.claude"
fi

[ -f "$TARGET/CLAUDE.md" ] || cp "$SRC/CLAUDE.md" "$TARGET/CLAUDE.md"

# --- bus + ff CLI ---
mkdir -p "$TARGET/.forgeflow/bus" "$TARGET/.forgeflow/bin"
cp "$SRC/bin/ff" "$TARGET/.forgeflow/bin/ff"
chmod +x "$TARGET/.forgeflow/bin/ff"

for w in supervisor "${WORKERS[@]}"; do
  touch "$TARGET/.forgeflow/bus/$w.log"
done

# Gitignore the bus logs by default.
if [ ! -f "$TARGET/.forgeflow/.gitignore" ]; then
  printf "bus/*.log\n" > "$TARGET/.forgeflow/.gitignore"
fi

ok "files installed"
log "bus ready at: $TARGET/.forgeflow/bus"
log "ff CLI at:    $TARGET/.forgeflow/bin/ff"

# ---------------- spawn ----------------

if [ "$NO_SPAWN" -eq 1 ]; then
  log "--no-spawn set, skipping"
  log "later: .forgeflow/bin/ff ls"
  exit 0
fi

if ! command -v claude >/dev/null 2>&1; then
  warn "claude CLI not found on PATH, skipping terminal spawn"
  warn "install Claude Code: https://claude.com/claude-code"
  exit 0
fi

worker_prompt() {
  local name="$1"
  cat <<EOF
You are the "$name" ForgeFlow AI worker. Operate strictly within the scope defined in .claude/agents/$name.md and the rules in CLAUDE.md. Keep outputs short. End every task with DONE:$name:TASKID (replace TASKID with a short id).

You can talk to the other workers through the file-based bus. Run these as Bash tool calls:
  .forgeflow/bin/ff send WORKER_NAME "YOUR MESSAGE"     send a message
  .forgeflow/bin/ff broadcast "YOUR MESSAGE"            send to all
  .forgeflow/bin/ff recv                                 read and clear your inbox
Your FF_WORKER env var is "$name".

Wait for a task.
EOF
}

# Write prompt files for ALL workers (bus works for all, even if not spawned).
mkdir -p "$TARGET/.forgeflow/prompts"
for w in "${ALL_WORKERS[@]}"; do
  worker_prompt "$w" > "$TARGET/.forgeflow/prompts/$w.txt"
done

log "spawning workers: ${WORKERS[*]}"

# Try to install tmux automatically if the user asked for tmux mode but it's missing.
ensure_tmux() {
  command -v tmux >/dev/null 2>&1 && return 0

  warn "tmux is not installed"
  local installer=""
  case "$(uname -s)" in
    Darwin)
      command -v brew >/dev/null 2>&1 && installer="brew install tmux"
      ;;
    Linux)
      if command -v apt-get >/dev/null 2>&1; then installer="sudo apt-get update && sudo apt-get install -y tmux"
      elif command -v dnf >/dev/null 2>&1; then    installer="sudo dnf install -y tmux"
      elif command -v yum >/dev/null 2>&1; then    installer="sudo yum install -y tmux"
      elif command -v pacman >/dev/null 2>&1; then installer="sudo pacman -S --noconfirm tmux"
      elif command -v apk >/dev/null 2>&1; then    installer="sudo apk add tmux"
      elif command -v zypper >/dev/null 2>&1; then installer="sudo zypper install -y tmux"
      fi
      ;;
    MINGW*|MSYS*|CYGWIN*)
      command -v pacman >/dev/null 2>&1 && installer="pacman -S --noconfirm tmux"
      ;;
  esac

  if [ -z "$installer" ]; then
    warn "no known package manager to install tmux on this system"
    warn "install manually: https://github.com/tmux/tmux/wiki/Installing"
    return 1
  fi

  printf "\033[1;36m[forgeflow]\033[0m install tmux now with: %s  [Y/n] " "$installer"
  if [ ! -t 0 ]; then
    echo "y (non-interactive)"
    REPLY="y"
  else
    read -r REPLY
  fi
  case "$REPLY" in
    ""|y|Y|yes|YES) ;;
    *) return 1 ;;
  esac

  log "installing tmux..."
  # shellcheck disable=SC2086
  if bash -c "$installer"; then
    command -v tmux >/dev/null 2>&1 && { ok "tmux installed"; return 0; }
  fi

  warn "tmux install failed"
  return 1
}

# Pick mode.
MODE="$FORCE_MODE"
if [ -z "$MODE" ]; then
  if command -v tmux >/dev/null 2>&1; then
    MODE="tmux"
  else
    # Offer to install tmux; fall back to windows mode if declined.
    if ensure_tmux; then MODE="tmux"; else MODE="windows"; fi
  fi
elif [ "$MODE" = "tmux" ] && ! command -v tmux >/dev/null 2>&1; then
  ensure_tmux || { err "--tmux requested but tmux not available"; exit 1; }
fi

spawn_tmux() {
  local session="forgeflow"
  tmux kill-session -t "$session" 2>/dev/null || true

  # Single window, tiled layout: 5 claude panes + 1 bus monitor pane.
  # Mouse on: click a pane to focus, drag splitters to resize.
  local first_w="${WORKERS[0]}"
  local first_cmd="cd '$TARGET' && export FF_WORKER='$first_w' && export PATH=\"$TARGET/.forgeflow/bin:\$PATH\" && clear && printf '\\n  ForgeFlow AI worker: %s\\n\\n' '$first_w' && claude \"\$(cat '$TARGET/.forgeflow/prompts/$first_w.txt')\""

  tmux new-session -d -s "$session" -n "workers" -c "$TARGET"
  tmux set-option -t "$session" -g mouse on
  tmux set-option -t "$session" -g pane-border-status top
  tmux set-option -t "$session" -g pane-border-format " #{pane_title} "
  tmux set-option -t "$session" -g status-style "bg=default,fg=white"
  tmux select-pane -t "$session:0.0" -T "$first_w"
  tmux send-keys -t "$session:0.0" "$first_cmd" C-m

  local idx=0
  for w in "${WORKERS[@]:1}"; do
    idx=$((idx + 1))
    local claude_cmd="cd '$TARGET' && export FF_WORKER='$w' && export PATH=\"$TARGET/.forgeflow/bin:\$PATH\" && clear && printf '\\n  ForgeFlow AI worker: %s\\n\\n' '$w' && claude \"\$(cat '$TARGET/.forgeflow/prompts/$w.txt')\""
    tmux split-window -t "$session:0" -c "$TARGET"
    tmux select-layout -t "$session:0" tiled >/dev/null
    tmux select-pane -t "$session:0.$idx" -T "$w"
    tmux send-keys -t "$session:0.$idx" "$claude_cmd" C-m
  done

  # 6th pane: bus monitor tailing all inbox logs.
  idx=$((idx + 1))
  local monitor_cmd="cd '$TARGET' && export PATH=\"$TARGET/.forgeflow/bin:\$PATH\" && clear && printf '\\n  bus monitor  (all inboxes)\\n\\n' && touch .forgeflow/bus/*.log && tail -n 0 -F .forgeflow/bus/*.log"
  tmux split-window -t "$session:0" -c "$TARGET"
  tmux select-layout -t "$session:0" tiled >/dev/null
  tmux select-pane -t "$session:0.$idx" -T "bus monitor"
  tmux send-keys -t "$session:0.$idx" "$monitor_cmd" C-m

  tmux select-pane -t "$session:0.0"

  if [ -n "${TMUX:-}" ]; then
    log "attach with: tmux switch-client -t $session"
  else
    log "attaching tmux session '$session' (mouse enabled, click any pane)"
    tmux attach -t "$session"
  fi
}

spawn_macos_windows() {
  local use_iterm=0
  if osascript -e 'application "iTerm" is running' 2>/dev/null | grep -q true; then
    use_iterm=1
  fi

  for w in "${WORKERS[@]}"; do
    local cmd="cd '$TARGET' && export FF_WORKER='$w' && export PATH=\"$TARGET/.forgeflow/bin:\$PATH\" && clear && printf '\\n  ForgeFlow AI worker: %s\\n  scope: .claude/agents/%s.md\\n  bus:   ff send WORKER MSG | ff recv\\n\\n' '$w' '$w' && (ff watch '$w' &) && claude \"\$(cat '$TARGET/.forgeflow/prompts/$w.txt')\""

    if [ "$use_iterm" -eq 1 ]; then
      osascript <<APPLESCRIPT >/dev/null
tell application "iTerm"
  activate
  create window with default profile
  tell current session of current window
    write text "$cmd"
  end tell
end tell
APPLESCRIPT
    else
      osascript <<APPLESCRIPT >/dev/null
tell application "Terminal"
  activate
  do script "$cmd"
end tell
APPLESCRIPT
    fi
  done
}

spawn_linux_windows() {
  local term=""
  for candidate in gnome-terminal konsole xfce4-terminal tilix alacritty kitty xterm; do
    command -v "$candidate" >/dev/null 2>&1 && { term="$candidate"; break; }
  done
  [ -z "$term" ] && { warn "no terminal emulator found"; return; }

  for w in "${WORKERS[@]}"; do
    local cmd="cd '$TARGET' && export FF_WORKER='$w' && export PATH=\"$TARGET/.forgeflow/bin:\$PATH\" && clear && printf '\n  ForgeFlow AI worker: %s\n  scope: .claude/agents/%s.md\n  bus:   ff send WORKER MSG | ff recv\n\n' '$w' '$w' && (ff watch '$w' &) && claude \"\$(cat '$TARGET/.forgeflow/prompts/$w.txt')\"; exec bash"

    case "$term" in
      gnome-terminal) gnome-terminal --title "forgeflow: $w" -- bash -lc "$cmd" & ;;
      konsole)        konsole --new-tab -p "tabtitle=forgeflow: $w" -e bash -lc "$cmd" & ;;
      xfce4-terminal) xfce4-terminal --title="forgeflow: $w" -e "bash -lc \"$cmd\"" & ;;
      tilix)          tilix -t "forgeflow: $w" -e "bash -lc \"$cmd\"" & ;;
      alacritty)      alacritty -t "forgeflow: $w" -e bash -lc "$cmd" & ;;
      kitty)          kitty --title "forgeflow: $w" bash -lc "$cmd" & ;;
      xterm)          xterm -T "forgeflow: $w" -e "bash -lc \"$cmd\"" & ;;
    esac
  done
}

spawn_windows_terminal() {
  if ! command -v wt.exe >/dev/null 2>&1 && ! command -v wt >/dev/null 2>&1; then
    warn "Windows Terminal (wt.exe) not found. Install it from the Microsoft Store,"
    warn "or use WSL + tmux. Opening plain cmd windows as fallback."
    for w in "${WORKERS[@]}"; do
      cmd.exe /c start cmd.exe /k "cd /d \"$TARGET\" && set FF_WORKER=$w && set PATH=$TARGET\\.forgeflow\\bin;%PATH% && claude \"\$(type .forgeflow\\prompts\\$w.txt)\"" &
    done
    return
  fi

  local WT="wt.exe"
  command -v wt.exe >/dev/null 2>&1 || WT="wt"

  # Build a single wt command: first tab + ; new-tab for the rest, each split with bus tail.
  local args=()
  local first=1
  for w in "${WORKERS[@]}"; do
    local main="bash -lc \"cd '$TARGET' && export FF_WORKER='$w' && export PATH=\\\"$TARGET/.forgeflow/bin:\$PATH\\\" && claude \\\"\$(cat '$TARGET/.forgeflow/prompts/$w.txt')\\\"\""
    local watch="bash -lc \"cd '$TARGET' && export FF_WORKER='$w' && export PATH=\\\"$TARGET/.forgeflow/bin:\$PATH\\\" && ff watch '$w'\""

    if [ "$first" -eq 1 ]; then
      args+=(new-tab --title "forgeflow: $w" $main ";" split-pane -H --size 0.25 $watch ";")
      first=0
    else
      args+=(new-tab --title "forgeflow: $w" $main ";" split-pane -H --size 0.25 $watch ";")
    fi
  done

  # shellcheck disable=SC2086
  "$WT" ${args[@]} &
}

log "opening workers (mode: $MODE)"

case "$MODE" in
  tmux)    spawn_tmux ;;
  windows)
    case "$(uname -s)" in
      Darwin) spawn_macos_windows ;;
      Linux)  spawn_linux_windows ;;
      MINGW*|MSYS*|CYGWIN*) spawn_windows_terminal ;;
      *) warn "unsupported platform: $(uname -s)" ;;
    esac
    ;;
esac

ok "done"
log "workers can talk via: ff send <worker> <message> | ff broadcast <msg> | ff recv"
log "run /forgeflow <task> in any window (supervisor routes the work)"
