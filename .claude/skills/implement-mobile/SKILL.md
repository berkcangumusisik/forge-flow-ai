---
name: implement-mobile
description: Implement a scoped React Native change for Android and iOS with modern UI, dark mode, and i18n. Use when the task is clearly mobile-only.
---

# Implement Mobile

Ship a focused React Native change that works on Android and iOS.

## Preconditions

- Screens, navigation, and theming patterns are known.
- The task is clearly mobile-only. If it is cross-surface, coordinate via `supervisor`.

## Steps

1. Read only the screens and components you will change.
2. Match existing navigation and state patterns.
3. Respect safe area and keyboard behavior.
4. Use theme tokens, never raw colors.
5. Add translation keys for English and Turkish.
6. Verify both platforms mentally or with a quick runtime check.

## UI checklist

- Touch targets at least 44pt.
- Feedback on every tap (pressed state, haptic where appropriate).
- Responsive for small and large phones.
- Consistent typography and spacing with the rest of the app.

## Dark mode checklist

- Theme tokens only.
- Status bar style updates correctly with theme.
- Images and icons adapt where needed.

## i18n checklist

- No hardcoded user-facing strings.
- Keys added to every supported locale.
- RTL-safe layout where the project supports it.

## Platform checklist

- Android back button behavior correct.
- iOS swipe-back gesture intact.
- Permissions requested at the right time, not at launch.

## Output

- Short list of files changed.
- Any platform-specific note on its own line.
- End with `DONE:mobile-react-native:<task-id>`.
