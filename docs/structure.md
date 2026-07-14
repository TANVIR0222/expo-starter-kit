# Project Structure

A detailed map of every directory in the starter kit and the role each one plays.

---

## Top-Level Layout

```
expo-project-setup/
├── src/              All application source code
├── tests/            Test examples (lightweight)
├── docs/             Architecture & structure notes
├── assets/           Static assets (images, icons, splash)
├── android/          Android native project (managed by Expo)
├── dist/             Production build output (gitignored)
├── app.config.ts     Dynamic Expo config (multi-environment)
├── app.json          Base Expo static config
├── babel.config.js   Babel config (Expo preset + Reanimated)
├── metro.config.js   Metro bundler config
├── tsconfig.json     TypeScript config
├── eslint.config.js  ESLint flat config
├── .prettierrc       Prettier config
├── commitlint.config.js  Conventional commit rules
├── .env.example      Environment variable template
└── .env              Local environment variables (gitignored)
```

---

## `src/app/` — Routes & Layouts

File-based routing powered by Expo Router. **Route files stay thin** — they only import screen components from `src/features/`.

```
src/app/
├── _layout.tsx              Root layout: providers, fonts, splash, auth boundary
├── +not-found.tsx           404 fallback screen
├── (auth)/                  Public route group (no auth required)
│   ├── _layout.tsx          Stack layout for auth screens
│   ├── index.tsx            Redirects to /welcome
│   ├── welcome.tsx          → features/auth/screens/welcome
│   ├── login.tsx            → features/auth/screens/login
│   └── signup.tsx           → features/auth/screens/signup
└── (main)/                  Protected route group (requires session)
    ├── _layout.tsx          Stack.Protected auth boundary
    └── (tabs)/              Native bottom tab layout
        ├── _layout.tsx      Tab bar config (Home, Components, Settings)
        ├── index.tsx        → features/home
        ├── components.tsx   → features/component-showcase
        └── settings.tsx     → features/settings
```

---

## `src/features/` — Feature Modules

Each feature owns its screens, local hooks, local components, and local types. Nothing leaks into other features directly.

```
src/features/
├── auth/                    Authentication feature
│   ├── auth-session.tsx     Session context, mock credentials, provider
│   ├── types.ts             Auth-specific TypeScript types
│   ├── hooks/
│   │   └── use-auth-form.ts Login / signup form state & validation
│   └── screens/
│       ├── welcome.tsx      Welcome / onboarding screen
│       ├── login.tsx        Login screen
│       └── signup.tsx       Signup screen
├── home/                    Home tab feature
│   └── screens/
│       └── home.tsx         Home dashboard screen
├── settings/                Settings tab feature
│   └── screens/
│       └── settings.tsx     Theme & language preference screen
├── workspace/               Workspace feature (placeholder)
│   └── screens/
└── component-showcase/      Component gallery (replace with real features)
    └── screens/
```

---

## `src/components/ui/` — Reusable UI Primitives

Shared across all features. Use theme tokens — never hardcode colors, spacing, or radius here.

| File | Component | Description |
|---|---|---|
| `button.tsx` | `Button` | Primary, secondary, ghost, destructive variants |
| `icon-button.tsx` | `IconButton` | Icon-only pressable button |
| `input.tsx` | `Input` | Text input with label and error state |
| `card.tsx` | `Card` | Surface container with shadow |
| `badge.tsx` | `Badge` | Status / label chip |
| `alert.tsx` | `Alert` | Info, success, warning, error banners |
| `avatar.tsx` | `Avatar` | User avatar (initials or image) |
| `list-row.tsx` | `ListRow` | Tappable list item row |
| `toggle-row.tsx` | `ToggleRow` | Switch toggle with label |
| `checkbox-row.tsx` | `CheckboxRow` | Checkbox with label |
| `segmented-control.tsx` | `SegmentedControl` | Multi-option tab picker |
| `progress-bar.tsx` | `ProgressBar` | Horizontal progress indicator |
| `loading-indicator.tsx` | `LoadingIndicator` | Activity spinner |
| `empty-state.tsx` | `EmptyState` | Empty list / zero-data placeholder |
| `app-toaster.tsx` | `AppToaster` | Sonner Native toast host |
| `app-text.tsx` | `AppText` | Themed typography wrapper |
| `icon.tsx` | `Icon` | Expo Symbols icon wrapper |
| `hero-panel.tsx` | `HeroPanel` | Large header panel with gradient |
| `stat-card.tsx` | `StatCard` | Metric display card |
| `screen.tsx` | `Screen` | Safe area scroll screen wrapper |
| `section-header.tsx` | `SectionHeader` | Section title with optional action |
| `divider.tsx` | `Divider` | Horizontal rule separator |

---

## `src/theme/` — Design Tokens & Theme Provider

All visual constants live here. Use tokens everywhere — never hardcode values in components.

```
src/theme/
├── colors.ts          Full color palette: light & dark semantic colors
├── spacing.ts         Spacing scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64)
├── radius.ts          Border radius scale (sm, md, lg, xl, full)
├── typography.ts      Font size and weight scale
├── motion.ts          Animation duration tokens (fast, normal, slow)
├── theme.ts           Theme type definitions
└── theme-provider.tsx Theme context, persistence, light/dark/system resolution
```

---

## `src/i18n/` — Internationalization

```
src/i18n/
├── i18n-provider.tsx        Locale context + persisted language preference
├── index.ts                 Public re-exports (useTranslation, etc.)
├── translation-schema.ts    Typed key schema (add all keys here first)
└── translations/
    ├── en.ts                English dictionary
    └── es.ts                Spanish dictionary
```

To add a language: add a new file in `translations/`, register it in `i18n-provider.tsx`, and add the locale to `supportedLocales` in `app.config.ts`.

---

## `src/lib/` — Infrastructure Helpers

Thin wrappers over external services. These show where infrastructure belongs — swap implementations without touching feature code.

```
src/lib/
├── api/                  HTTP client setup (fetch / axios wrapper)
├── storage/              AsyncStorage typed read/write helpers
├── analytics/            Event tracking stubs (replace with your vendor)
├── notifications/        Push notification registration helpers
├── toast/                Sonner Native toast helper functions
└── responsive-screen/    Screen-aware scaling & orientation utilities
```

See [`docs/responsive-screen.md`](./responsive-screen.md) for full usage guide.

---

## `src/config/` — Runtime Config & Feature Flags

```
src/config/
├── app-env.ts          Per-environment API base URLs and app defaults
├── env.ts              Reads runtime values from Constants.expoConfig.extra
├── feature-flags.ts    Boolean feature toggle helpers (ANALYTICS, NOTIFICATIONS)
└── runtime-config.ts   App-wide stable runtime constants
```

Environment variables flow:
`.env` → `app.config.ts` → `Constants.expoConfig.extra` → `env.ts` → feature code

---

## `src/hooks/` — Shared Hooks

Hooks used across multiple features.

```
src/hooks/
├── use-home-summary.ts          Home screen summary data hook
└── use-starter-preferences.ts  Shared user preferences (theme, language)
```

---

## `src/providers/` — App-Wide Provider Composition

The single place where all app-wide context providers are composed and ordered. The root `_layout.tsx` wraps the app with this provider tree.

---

## `src/constants/` — Stable Values

App-level constants that never change at runtime (navigation labels, option lists, etc.). Not the same as config or feature flags.

---

## `src/types/` — Shared TypeScript Types

Types shared across multiple features or layers. Feature-specific types live inside the feature folder.

---

## `src/utils/` — Pure Helper Functions

Stateless utility functions with no side effects. No imports from React or React Native.

---

## `tests/` — Tests

Lightweight test examples showing testing conventions for this project.

---

## Rule Of Thumb

| Location | What goes here |
|---|---|
| `src/app/` | Routes and layouts only — no business logic |
| `src/features/` | Everything specific to one product feature |
| `src/components/ui/` | Reusable design primitives used across features |
| `src/lib/` | External service wrappers (API, storage, analytics) |
| `src/theme/` | All design tokens |
| `src/i18n/` | All translations and locale logic |
| `src/config/` | Runtime config and feature flags |
| `src/hooks/` | Hooks shared by 2+ features |
| `src/utils/` | Pure, stateless helper functions |

Use `features/component-showcase` as a reference for how to structure a feature module, then replace it with your real product modules.
