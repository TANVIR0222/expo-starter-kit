# Adding a New Library

Follow these steps every time you add a new package to the project. The goal is to keep installs, Jest mocks, and documentation in sync.

---

## Step 1 — Install the Package

Use `pnpm`. Always add to the correct bucket:

```sh
# Runtime dependency (ships to users)
pnpm add <package-name>

# Dev-only dependency (build tools, test utils, type definitions)
pnpm add -D <package-name>
```

**Examples:**

```sh
pnpm add zustand                        # state management — runtime
pnpm add -D @types/react-native-svg    # type definitions — dev only
pnpm add expo-haptics                  # Expo module — runtime
```

> **Rule**: If it is only used in tests or build tooling, it belongs in `devDependencies`.

---

## Step 2 — Check If It Has Native Code

Ask: does this package use native modules (C++, Swift, Kotlin, JNI)?

| Signal | Examples |
|---|---|
| Has `android/` or `ios/` folder in its source | `expo-camera`, `expo-haptics` |
| Imports from `NativeModules` or `TurboModuleRegistry` | `react-native-mmkv` |
| Ships as an Expo module (uses `expo-modules-core`) | Any `expo-*` package |
| Pure JS / TypeScript only | `zod`, `date-fns`, `zustand` |

- **Pure JS** — no extra config needed. Skip to Step 5.
- **Has native code** — continue with Steps 3 and 4.

---

## Step 3 — Add to `transformIgnorePatterns` (if native / ESM)

Jest cannot process untranspiled ESM or native-linked packages by default. Open [`jest.config.js`](../jest.config.js) and add the package name to the `transformIgnorePatterns` regex:

```js
// jest.config.js
transformIgnorePatterns: [
  "node_modules/(?!(.pnpm|(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|sonner-native|YOUR_NEW_PACKAGE_HERE))",
],
```

Replace `YOUR_NEW_PACKAGE_HERE` with the exact package name.

**When to do this:**
- The package ships source as ESM (not CJS)
- Jest throws `SyntaxError: Cannot use import statement` when importing it
- It is an Expo module or React Native community package

---

## Step 4 — Add a Jest Mock (if native code)

Native modules call C++/Swift/Kotlin at runtime — Jest runs in Node and has no native layer. You must stub the module.

Open [`jest.setup.ts`](../jest.setup.ts) and add a `jest.mock()` block in the appropriate section:

### 4a — Simple stub (most cases)

```ts
// ─── <Package Display Name> ──────────────────────────────────────────────────
// Brief one-line explanation of why this needs mocking.
jest.mock("<package-name>", () => ({
  // Stub only the exports your app actually uses.
  // Use jest.fn() for functions, literal values for constants.
  someFunction: jest.fn(() => Promise.resolve()),
  someConstant: "mocked-value",
  default: {
    someMethod: jest.fn(),
  },
}))
```

### 4b — Official mock provided by the package

Some packages ship their own Jest mock. Prefer this when available:

```ts
jest.mock("<package-name>", () =>
  require("<package-name>/jest/mock") // path varies per package
)
```

Check the package's README for `jest` or `testing` documentation first.

### 4c — Expo module pattern

For standard Expo modules:

```ts
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy" },
}))
```

### 4d — Where to place it in `jest.setup.ts`

Add the block in the correct section of the file (keep it organised):

```
1. Gesture Handler
2. react-native-worklets
3. react-native-reanimated
4. AsyncStorage
5. expo-constants
6. expo-font
7. expo-splash-screen
8. expo-linking
9. expo-localization
10. expo-router
11. expo-status-bar
12. expo-system-ui
13. sonner-native
14. ← ADD YOUR NEW MOCK HERE
```

---

## Step 5 — Check for Babel Plugin Requirements

Some packages require a Babel plugin to work correctly (especially animation / worklet libraries).

Open [`babel.config.js`](../babel.config.js) and add the plugin if the package README requires it:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Add new plugin here if required
      "your-package/babel-plugin",
    ],
  }
}
```

**Known packages that require Babel plugins:**
- `react-native-reanimated` → `react-native-reanimated/plugin` (already configured via `babel-preset-expo`)

---

## Step 6 — Add to `app.config.ts` Plugins (Expo modules only)

Expo modules that modify native project files require a plugin entry in [`app.config.ts`](../app.config.ts):

```ts
plugins: [
  "expo-router",
  "expo-splash-screen",
  // Add your new Expo module plugin here:
  [
    "expo-camera",
    {
      cameraPermission: "Allow $(DISPLAYNAME) to access the camera.",
    },
  ],
],
```

Check the package docs for the exact plugin configuration options.

---

## Step 7 — Run Checks

After all changes, run the full check suite to confirm nothing is broken:

```sh
# Run tests
pnpm testFinal

# Run type check + lint
pnpm check
```

All tests should stay green. If a test suite fails with `Cannot find module` or `SyntaxError`, revisit Steps 3 and 4.

---

## Step 8 — Update Documentation

Update two files:

### `README.md` — Tech Stack table

Add a row to the Tech Stack table in [`README.md`](../README.md):

```markdown
| Category | Package | Version |
|---|---|---|
...
| Your Category | your-package | x.y.z |
```

Get the installed version from `package.json`.

### `docs/structure.md` — If it changes folder structure

If the package introduces a new folder or convention (e.g., a new `src/lib/payments/` module), add a description to [`docs/structure.md`](./structure.md).

---

## Quick Checklist

Copy this into your PR description when adding a library:

```
- [ ] Installed with pnpm (correct devDep vs dep bucket)
- [ ] Added to transformIgnorePatterns in jest.config.js (if native/ESM)
- [ ] Added jest.mock() in jest.setup.ts (if native code)
- [ ] Added Babel plugin to babel.config.js (if required)
- [ ] Added plugin to app.config.ts plugins[] (if Expo module)
- [ ] pnpm testFinal passes
- [ ] pnpm check passes
- [ ] README.md Tech Stack table updated
- [ ] docs/structure.md updated (if folder structure changed)
```

---

## Common Examples

### Adding `zod` (pure JS)

```sh
pnpm add zod
# No mock needed. No transformIgnorePatterns change needed.
# Just import and use.
```

### Adding `expo-camera`

```sh
pnpm add expo-camera
```

1. `transformIgnorePatterns` — already covered by `expo(nent)?` pattern
2. `jest.setup.ts`:
   ```ts
   jest.mock("expo-camera", () => ({
     CameraView: () => null,
     useCameraPermissions: jest.fn(() => [{ granted: true }, jest.fn()]),
     Camera: { requestCameraPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })) },
   }))
   ```
3. `app.config.ts` plugins:
   ```ts
   ["expo-camera", { cameraPermission: "Allow $(DISPLAYNAME) to access the camera." }]
   ```

### Adding `react-native-mmkv`

```sh
pnpm add react-native-mmkv
```

1. `transformIgnorePatterns` — add `react-native-mmkv`
2. `jest.setup.ts`:
   ```ts
   jest.mock("react-native-mmkv", () => {
     const store: Record<string, unknown> = {}
     const MMKV = jest.fn().mockImplementation(() => ({
       set: jest.fn((key: string, value: unknown) => { store[key] = value }),
       getString: jest.fn((key: string) => store[key] as string | undefined),
       getNumber: jest.fn((key: string) => store[key] as number | undefined),
       getBoolean: jest.fn((key: string) => store[key] as boolean | undefined),
       delete: jest.fn((key: string) => { delete store[key] }),
       contains: jest.fn((key: string) => key in store),
       clearAll: jest.fn(() => { Object.keys(store).forEach(k => delete store[k]) }),
     }))
     return { MMKV }
   })
   ```
