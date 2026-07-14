# Contributing

Thanks for helping improve Expo Router Starter Kit.

This project should stay generic, easy to understand, and useful as a starting point for many kinds of apps.

## Good Contributions

- documentation improvements
- bug fixes
- accessibility improvements
- small reusable UI component improvements
- Expo Router structure improvements
- theme, i18n, storage, or auth example improvements

Please avoid changes that make the starter kit feel like one specific product app.

## How To Contribute

1. Fork the repository.
2. Create a branch for your change.
3. Make a small, focused update.
4. Run the checks:

```sh
npm run check
```

If your change touches routing or build behavior, also run:

```sh
npx expo export --platform web
```

5. Open a pull request with a short explanation of what changed and how you tested it.

## Project Rules

- Keep route files inside `src/app` thin.
- Put feature logic inside `src/features`.
- Put reusable UI inside `src/components/ui`.
- Put API, storage, analytics, notifications, and toast helpers inside `src/lib`.
- Use theme tokens instead of hardcoded colors, spacing, radius, or font sizes.
- Keep dependencies minimal and prefer Expo-supported packages.

## Reporting Issues

When opening an issue, include:

- what you expected
- what happened
- the platform you tested on: iOS, Android, or web
- steps to reproduce the issue

Clear reports make the project easier to improve.
