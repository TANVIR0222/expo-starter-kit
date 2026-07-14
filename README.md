# Expo Router Starter Kit

A production-inspired Expo Router starter kit for building cross-platform mobile apps with a clean folder structure, reusable UI components, design tokens, i18n, mock authentication, and infrastructure examples.

> This template is intentionally generic — not a finished product app. Clone it, rename it, and extend it with your own features.

---

## Why This Exists

Expo Router makes navigation simple, but apps quickly become messy when routes, screens, components, hooks, config, and business logic all live in the wrong places.

This starter kit provides a practical structure for apps that need:

- Public and protected route groups
- Native tab navigation
- Mock authentication flow with session persistence
- Reusable UI component library
- Persisted light / dark / system theme mode
- Persisted language preference
- Multi-environment build support (dev / staging / production)
- EAS build & OTA update configuration
- Config, storage, analytics, notifications, and toast infrastructure examples
- A component gallery you can replace with your own product modules

---

## Tech Stack

| Category | Package | Version |
|---|---|---|
| Platform | Expo | ~56.0.15 |
| Navigation | Expo Router | ~56.2.14 |
| UI Runtime | React | 19.2.3 |
| UI Runtime | React Native | 0.85.3 |
| Language | TypeScript | ~6.0.3 |
| Gestures | React Native Gesture Handler | ~2.31.1 |
| Animations | React Native Reanimated | 4.3.1 |
| Safe Areas | React Native Safe Area Context | ~5.7.0 |
| Screens | React Native Screens | 4.25.2 |
| SVG | React Native SVG | 15.15.4 |
| Glass UI | Expo Glass Effect | ~56.0.4 |
| Icons | Expo Symbols | ~56.0.6 |
| Images | Expo Image | ~56.0.11 |
| Storage | AsyncStorage | 2.2.0 |
| i18n | Expo Localization | ~56.0.6 |
| Toasts | Sonner Native | ^0.26.4 |
| Linting | ESLint + Expo config | ^9.39.4 |
| Formatting | Prettier | ^3.9.4 |
| Git Hooks | Husky + lint-staged | ^9.1.7 |
| Commit Lint | Commitlint (conventional) | ^21.2.0 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (recommended) or npm
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds): `npm install -g eas-cli`

### Installation

```sh
pnpm install
```

### Configure Environment

Copy the example environment file and fill in your values:

```sh
cp .env.example .env
```

Key variables:

```sh
APP_ENV=development          # development | staging | production
BUNDLE_ID_DEV=com.yourcompany.yourapp.dev
BUNDLE_ID_STAGING=com.yourcompany.yourapp.staging
BUNDLE_ID_PROD=com.yourcompany.yourapp
API_BASE_URL=                # leave empty to use per-env defaults
ANALYTICS_ENABLED=false
NOTIFICATIONS_ENABLED=false
EAS_PROJECT_ID=              # from expo.dev → project → settings
```

### Start Development Server

```sh
pnpm start
```

Then open the app on a device or simulator:

```sh
pnpm android     # Android device / emulator
pnpm ios         # iOS simulator
pnpm web         # Browser (Expo web)
```

---

## Scripts

| Script | Description |
|---|---|
| `pnpm start` | Start Expo dev server |
| `pnpm android` | Run on Android |
| `pnpm ios` | Run on iOS |
| `pnpm web` | Run in browser |
| `pnpm typecheck` | TypeScript type check (no emit) |
| `pnpm lint` | ESLint check on `src/` |
| `pnpm format` | Prettier format entire project |
| `pnpm format:check` | Prettier format check |
| `pnpm check` | Typecheck + lint (run before PRs) |
| `pnpm reset-project` | Strip to blank route (destructive) |

Run all pre-PR checks:

```sh
pnpm check
```

---

## Project Structure

```
expo-project-setup/
├── src/
│   ├── app/                  Expo Router file-based routes & layouts
│   │   ├── (auth)/           Public route group (welcome, login, signup)
│   │   └── (main)/           Protected route group (tabs layout)
│   │       └── (tabs)/       Native tab bar (home, components gallery, settings)
│   ├── features/             Feature modules (screens, hooks, local logic)
│   │   ├── auth/             Auth session provider, hooks, login/signup screens
│   │   ├── home/             Home screen & summary logic
│   │   ├── settings/         Settings screen (theme, language)
│   │   ├── workspace/        Workspace feature placeholder
│   │   └── component-showcase/ Component gallery (replace with your own)
│   ├── components/
│   │   └── ui/               Reusable primitive UI components (22 components)
│   ├── theme/                Design tokens & theme provider
│   │   ├── colors.ts         Color palette (light + dark)
│   │   ├── spacing.ts        Spacing scale
│   │   ├── radius.ts         Border radius scale
│   │   ├── typography.ts     Font size / weight scale
│   │   ├── motion.ts         Animation duration tokens
│   │   └── theme-provider.tsx Theme context & persistence
│   ├── i18n/                 Translations & locale provider
│   │   ├── i18n-provider.tsx Locale context & persistence
│   │   ├── translation-schema.ts Typed translation key schema
│   │   └── translations/     en.ts · es.ts
│   ├── config/               Runtime config & feature flags
│   │   ├── app-env.ts        Per-environment defaults
│   │   ├── env.ts            Reads from Constants.expoConfig.extra
│   │   ├── feature-flags.ts  Feature flag helpers
│   │   └── runtime-config.ts Runtime config constants
│   ├── lib/                  Infrastructure helpers
│   │   ├── api/              HTTP client examples
│   │   ├── storage/          AsyncStorage helpers
│   │   ├── analytics/        Analytics event examples
│   │   ├── notifications/    Push notification examples
│   │   └── toast/            Toast helper wrappers
│   ├── hooks/                Shared hooks
│   │   ├── use-home-summary.ts
│   │   └── use-starter-preferences.ts
│   ├── providers/            App-wide provider composition
│   ├── constants/            Stable app-level values & options
│   ├── types/                Shared TypeScript types
│   └── utils/                Pure helper functions
├── tests/                    Test examples
├── docs/                     Architecture & structure notes
├── assets/                   Images, icons, splash screen
├── app.config.ts             Expo dynamic config (multi-env)
├── app.json                  Base Expo config
├── .env.example              Environment variable template
├── babel.config.js
├── metro.config.js
├── tsconfig.json
├── eslint.config.js
├── commitlint.config.js
└── .prettierrc
```

---

## Architecture Rules

- **`src/app/`** — routes and layouts only. Files here should be thin wrappers that point to feature screens.
- **`src/features/`** — all feature-specific screens, hooks, components, and local business logic.
- **`src/components/ui/`** — reusable UI primitives shared across features.
- **`src/lib/`** — infrastructure code: storage, API clients, analytics, notifications, toast.
- **`src/theme/`** — owns all design tokens and app theme resolution.
- **`src/i18n/`** — owns all translations and locale selection.
- **`src/config/`** — runtime config, feature flags, and env variable reading.

Never put business logic inside `src/app/`. Route files stay thin and delegate everything to feature modules.

---

## Multi-Environment Builds

The project is wired for three environments via `APP_ENV`:

| Environment | App Name | Bundle ID |
|---|---|---|
| `development` | Expo Starter (Dev) | `com.tanvir.exporouterstarterkit.dev` |
| `staging` | Expo Starter (Staging) | `com.tanvir.exporouterstarterkit.staging` |
| `production` | Expo Router Starter Kit | `com.tanvir.exporouterstarterkit` |

Switch environments by setting `APP_ENV` in your `.env` before building.

### EAS Build

Log in to EAS first:

```sh
eas login
```

Trigger a build:

```sh
eas build                    # interactive platform selection
eas build --platform android
eas build --platform ios
```

OTA updates are enabled for `staging` and `production` environments. Updates check on load in production and on error recovery in staging.

---

## Included Examples

### Routing

- `(auth)` — public route group with `welcome`, `login`, and `signup` screens
- `(main)` — protected route group gated by `Stack.Protected`
- `(tabs)` — native bottom tab bar with `Home`, `Components`, and `Settings` tabs
- `+not-found` — 404 fallback screen

### Authentication

Mock credentials with a persisted session. Replace the session provider with your real auth backend when ready.

Key files:

```
src/features/auth/auth-session.tsx       Session context & provider
src/features/auth/hooks/use-auth-form.ts Auth form logic
src/features/auth/screens/login.tsx      Login screen
src/features/auth/screens/signup.tsx     Signup screen
```

### UI Components (22 primitives)

| Component | File |
|---|---|
| `Button` | `button.tsx` |
| `IconButton` | `icon-button.tsx` |
| `Input` | `input.tsx` |
| `Card` | `card.tsx` |
| `Badge` | `badge.tsx` |
| `Alert` | `alert.tsx` |
| `Avatar` | `avatar.tsx` |
| `ListRow` | `list-row.tsx` |
| `ToggleRow` | `toggle-row.tsx` |
| `CheckboxRow` | `checkbox-row.tsx` |
| `SegmentedControl` | `segmented-control.tsx` |
| `ProgressBar` | `progress-bar.tsx` |
| `LoadingIndicator` | `loading-indicator.tsx` |
| `EmptyState` | `empty-state.tsx` |
| `AppToaster` | `app-toaster.tsx` |
| `AppText` | `app-text.tsx` |
| `Icon` | `icon.tsx` |
| `HeroPanel` | `hero-panel.tsx` |
| `StatCard` | `stat-card.tsx` |
| `Screen` | `screen.tsx` |
| `SectionHeader` | `section-header.tsx` |
| `Divider` | `divider.tsx` |

Open the **Components** tab in the running app to see them in use.

### Theme System

- Light mode, dark mode, and system-follow mode
- Persisted user preference via AsyncStorage
- Design tokens: colors, spacing, radius, typography, motion
- Visual direction: calm, white surfaces, green-tinted neutrals, strong readable text

Start here: `src/theme/theme-provider.tsx`

### Internationalization

- English (`en`) and Spanish (`es`) built-in
- English is the default language
- Persisted manual locale selection
- Fully typed translation keys via `translation-schema.ts`

Start here:

```
src/i18n/i18n-provider.tsx
src/i18n/translation-schema.ts
src/i18n/translations/en.ts
src/i18n/translations/es.ts
```

### Infrastructure Examples (`src/lib/`)

| Module | Purpose |
|---|---|
| `api/` | HTTP client setup example |
| `storage/` | AsyncStorage read/write helpers |
| `analytics/` | Event tracking stub |
| `notifications/` | Push notification registration stub |
| `toast/` | Sonner Native toast helpers |

These are intentionally lightweight — they show where infrastructure code belongs without locking you into a specific backend or vendor.

### Config & Feature Flags (`src/config/`)

| File | Purpose |
|---|---|
| `app-env.ts` | Per-environment API URLs and defaults |
| `env.ts` | Reads runtime config from `Constants.expoConfig.extra` |
| `feature-flags.ts` | Boolean feature toggle helpers |
| `runtime-config.ts` | App-wide stable runtime constants |

Feature flags and API base URLs can be overridden per environment via `.env`.

---

## Customizing This Template

After cloning, you will typically want to:

1. Update `app.json` — rename the app slug.
2. Update `app.config.ts` — set your own `owner`, bundle IDs, and `EAS_PROJECT_ID`.
3. Update `.env` with your real values (copy from `.env.example`).
4. Replace mock auth in `src/features/auth/auth-session.tsx` with your real auth provider.
5. Replace `src/features/component-showcase` with your first real feature module.
6. Add your translations to `src/i18n/translations/`.
7. Adjust design tokens in `src/theme/` to match your brand.
8. Swap placeholder assets in `assets/images/`.

To strip the app down to a blank route (removes all example screens):

```sh
pnpm reset-project
```

---

## Code Quality

The project enforces code quality automatically:

- **ESLint** — lints `src/` with the Expo config + Prettier integration
- **Prettier** — formats all files consistently
- **TypeScript strict mode** — catches type errors at compile time
- **Husky + lint-staged** — runs ESLint and Prettier on staged files before every commit
- **Commitlint** — enforces [Conventional Commits](https://www.conventionalcommits.org/) format on commit messages

---

## Contributing

Contributions are welcome. Good contributions keep the starter generic, clean, and useful as a starting point.

Ideas:

- Better documentation
- Accessibility improvements
- Reusable UI component additions or fixes
- Expo Router structure improvements
- Theme or i18n refinements
- Bug fixes

Keep dependencies minimal. Prefer Expo-supported packages when possible.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full contribution flow.

---

## Creator

Created and maintained by **Code with Nomi**.

For business inquiries: **business@codelinx.net** · **codelinx.net**

---

## License

MIT
