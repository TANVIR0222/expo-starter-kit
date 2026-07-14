# Testing a Native Module — Pattern & Worked Example

> **This is a reusable template.**
> The steps below are the **same for every native Expo / React Native package.**
> Only the mock contents and test cases differ per package.
> `expo-secure-store` is used as the worked example throughout.

---

## The 4-Step Pattern (same for every native package)

```
1. Install  →  2. Mock in jest.setup.ts  →  3. Write a wrapper  →  4. Write tests
```

Every native module you add follows this exact sequence. The table below shows what changes and what stays the same:

| Step | Same for every package | Changes per package |
|---|---|---|
| Install | `pnpm add <name>` | Package name |
| Plugin | Add to `app.config.ts` plugins[] | Plugin name + options |
| Jest mock | `jest.mock("<name>", () => ({...}))` in `jest.setup.ts` | What functions/constants you stub |
| Wrapper | `src/lib/<domain>/<name>.ts` | Wrapper API shape |
| Test file | `tests/lib/<name>.test.ts` | Test scenarios |

---

## Step 1 — Install

```sh
pnpm add expo-secure-store
```

> **For your package:** replace `expo-secure-store` with the package you are adding.

---

## Step 2 — Register in `app.config.ts` (Expo modules only)

If the package is an Expo module (any `expo-*` package), add it to the plugins array in [`app.config.ts`](../app.config.ts):

```ts
plugins: [
  "expo-router",
  "expo-splash-screen",
  // ... existing plugins ...
  "expo-secure-store",   // ← add your package here
],
```

Pure JS libraries (e.g. `zod`, `date-fns`) and React Native community packages that are not Expo modules do **not** need a plugin entry.

---

## Step 3 — Add the Jest Mock in `jest.setup.ts`

Native packages use device APIs (Keychain, Bluetooth, Camera, etc.) that do not exist in Node. You must stub them.

Open [`jest.setup.ts`](../jest.setup.ts) and add a `jest.mock()` block. Keep mocks organised alphabetically after the existing entries.

### What to stub

Only stub the **functions your app actually calls**. Check the package's TypeScript types or README for its API surface.

### Mock template

```ts
// ─── <Package Display Name> ──────────────────────────────────────────────────
// One line: why this needs a mock.
jest.mock("<package-name>", () => ({
  someAsyncFunction: jest.fn(() => Promise.resolve(<default return value>)),
  someSyncFunction: jest.fn(() => <default return value>),
  SOME_CONSTANT: "constant-value",
}))
```

### Worked example — `expo-secure-store`

`expo-secure-store` reads/writes to the device Keychain (iOS) and Keystore (Android). The mock uses an in-memory `Map` so `set → get` actually returns the stored value within one test run:

```ts
// ─── Expo Secure Store ───────────────────────────────────────────────────────
// Keychain (iOS) and Keystore (Android) do not exist in Node.
// In-memory Map makes the mock stateful: set → get returns the value.
jest.mock("expo-secure-store", () => {
  const store = new Map<string, string>()

  return {
    setItemAsync: jest.fn(
      async (key: string, value: string) => { store.set(key, value) }
    ),
    getItemAsync: jest.fn(
      async (key: string) => store.get(key) ?? null
    ),
    deleteItemAsync: jest.fn(
      async (key: string) => { store.delete(key) }
    ),
    WHEN_UNLOCKED: "WHEN_UNLOCKED",
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: "WHEN_UNLOCKED_THIS_DEVICE_ONLY",
    AFTER_FIRST_UNLOCK: "AFTER_FIRST_UNLOCK",
    ALWAYS: "ALWAYS",
  }
})
```

> **Why in-memory Map and not just `jest.fn()`?**
> With a plain `jest.fn()`, `get` always returns `undefined`. A stateful Map lets you write round-trip tests (`set` → `get` → assert value) without manually chaining `.mockResolvedValueOnce()` on every call.

---

## Step 4 — Write a Wrapper in `src/lib/`

Never import native packages directly inside feature code. Always wrap them in `src/lib/`. This:
- Keeps native imports in one place
- Makes it trivial to swap implementations
- Gives you a clean surface to unit-test

### Wrapper template

```ts
// src/lib/<domain>/<name>.ts
import * as NativePackage from "<package-name>"

export const myWrapper = {
  async get(key: string): Promise<string | null> {
    return NativePackage.someGetFunction(key)
  },
  async set(key: string, value: string): Promise<void> {
    await NativePackage.someSetFunction(key, value)
  },
  async remove(key: string): Promise<void> {
    await NativePackage.someDeleteFunction(key)
  },
}
```

### Worked example — `src/lib/storage/secure-storage.ts`

```ts
import * as SecureStore from "expo-secure-store"

/**
 * Typed wrapper around expo-secure-store.
 * Values are JSON-serialised to support objects, not just strings.
 * Returns null if the key does not exist or value cannot be parsed.
 */
export const secureStorage = {
  async get<T>(key: string): Promise<T | null> {
    const raw = await SecureStore.getItemAsync(key)
    if (raw === null) return null
    try {
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  },

  async remove(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key)
  },
}
```

---

## Step 5 — Write Tests

### Where test files live

| What you are testing | File location |
|---|---|
| The wrapper itself | `tests/lib/<wrapper-name>.test.ts` |
| A feature that uses the wrapper | `src/features/<name>/__tests__/<module>.test.ts` |
| A hook that reads from the wrapper | Next to the hook: `src/features/<name>/__tests__/<hook>.test.ts` |

### Test file structure (same for every wrapper)

```ts
// 1. Import the wrapper under test
// 2. Import the native mock so you can inspect/control it
// 3. Cast mock functions to jest.Mock for TypeScript compatibility
// 4. describe() blocks — one per method or behaviour group
//    ├── beforeEach() — clear mock call history
//    ├── it() — one scenario
//    └── (optional) afterEach() — cleanup
```

### What to test — the standard checklist

For any read/write/delete wrapper, cover these scenarios:

| Scenario | Test name pattern |
|---|---|
| Write stores the correct value | `"stores <type> value correctly"` |
| Read returns parsed value when key exists | `"returns the value when key exists"` |
| Read returns null / default when key missing | `"returns null when key does not exist"` |
| Read handles corrupt / unparseable data | `"returns null when stored value is not valid JSON"` |
| Delete removes the key | `"calls delete with the correct key"` |
| Delete is safe when key does not exist | `"does not throw when key does not exist"` |
| Write → Read round-trip | `"set then get returns the original value"` |
| Write → Delete → Read returns null | `"set then remove then get returns null"` |

### Worked example — `tests/lib/secure-storage.test.ts`

```ts
import * as SecureStore from "expo-secure-store"
import { secureStorage } from "@/lib/storage/secure-storage"

// Cast to jest.Mock so TypeScript allows .mockResolvedValueOnce() etc.
const mockGet = SecureStore.getItemAsync as jest.Mock
const mockSet = SecureStore.setItemAsync as jest.Mock
const mockDelete = SecureStore.deleteItemAsync as jest.Mock

// ─────────────────────────────────────────────────────────────────────────────

describe("secureStorage.set", () => {
  beforeEach(() => {
    mockSet.mockClear()
  })

  it("stores a string value as JSON", async () => {
    await secureStorage.set("token", "abc-123")
    expect(mockSet).toHaveBeenCalledWith("token", JSON.stringify("abc-123"))
  })

  it("stores an object value as JSON", async () => {
    const user = { id: "1", email: "user@example.com" }
    await secureStorage.set("user", user)
    expect(mockSet).toHaveBeenCalledWith("user", JSON.stringify(user))
  })

  it("stores a number value as JSON", async () => {
    await secureStorage.set("expiry", 1234567890)
    expect(mockSet).toHaveBeenCalledWith("expiry", "1234567890")
  })
})

// ─────────────────────────────────────────────────────────────────────────────

describe("secureStorage.get", () => {
  beforeEach(() => {
    mockGet.mockClear()
  })

  it("returns the parsed value when the key exists", async () => {
    mockGet.mockResolvedValueOnce(JSON.stringify({ id: "1", name: "Alice" }))
    const result = await secureStorage.get<{ id: string; name: string }>("user")
    expect(result).toEqual({ id: "1", name: "Alice" })
  })

  it("returns null when the key does not exist", async () => {
    mockGet.mockResolvedValueOnce(null)
    const result = await secureStorage.get("missing-key")
    expect(result).toBeNull()
  })

  it("returns null when stored value is not valid JSON", async () => {
    mockGet.mockResolvedValueOnce("not-json{{{")
    const result = await secureStorage.get("corrupted")
    expect(result).toBeNull()
  })

  it("returns a string value correctly", async () => {
    mockGet.mockResolvedValueOnce(JSON.stringify("plain-token"))
    const result = await secureStorage.get<string>("token")
    expect(result).toBe("plain-token")
  })
})

// ─────────────────────────────────────────────────────────────────────────────

describe("secureStorage.remove", () => {
  beforeEach(() => {
    mockDelete.mockClear()
  })

  it("calls deleteItemAsync with the correct key", async () => {
    await secureStorage.remove("token")
    expect(mockDelete).toHaveBeenCalledWith("token")
    expect(mockDelete).toHaveBeenCalledTimes(1)
  })

  it("does not throw when the key does not exist", async () => {
    await expect(secureStorage.remove("non-existent")).resolves.not.toThrow()
  })
})

// ─────────────────────────────────────────────────────────────────────────────

describe("secureStorage — round-trip", () => {
  it("set then get returns the original value", async () => {
    const payload = { accessToken: "jwt-abc", expiresAt: 9999 }
    await secureStorage.set("auth", payload)
    const result = await secureStorage.get<typeof payload>("auth")
    expect(result).toEqual(payload)
  })

  it("set then remove then get returns null", async () => {
    await secureStorage.set("session", "active")
    await secureStorage.remove("session")
    mockGet.mockResolvedValueOnce(null)
    const result = await secureStorage.get("session")
    expect(result).toBeNull()
  })
})
```

---

## How to Add a New Test Case

When a new behaviour needs to be covered, answer these questions:

```
1. Which function changed or was added?
   → Find the matching describe("secureStorage.<method>") block.
   → Add an it() inside it.

2. Is it a new feature that uses the wrapper?
   → Create src/features/<name>/__tests__/<module>.test.ts
   → Follow the same describe/beforeEach/it structure.

3. Is it a completely new package with a new wrapper?
   → Create tests/lib/<wrapper-name>.test.ts
   → Copy the structure above and swap in the new mock + wrapper.
```

### `it()` block anatomy

```ts
it("<what it does> when <condition>", async () => {
  // ARRANGE — set the mock's return value for this scenario
  mockGet.mockResolvedValueOnce("some-value")

  // ACT — call the code under test
  const result = await secureStorage.get("my-key")

  // ASSERT — verify what happened
  expect(result).toBe("some-value")
  expect(mockGet).toHaveBeenCalledWith("my-key")
})
```

### Common mock patterns

```ts
// Simulate a stored value
mockGet.mockResolvedValueOnce("stored-string")

// Simulate no value found
mockGet.mockResolvedValueOnce(null)

// Simulate a native error (Keychain locked, permission denied)
mockGet.mockRejectedValueOnce(new Error("Keychain unavailable"))

// Assert called with exact args
expect(mockSet).toHaveBeenCalledWith("key", '"value"')

// Assert called exactly once
expect(mockSet).toHaveBeenCalledTimes(1)

// Assert async function does not throw
await expect(myFn()).resolves.not.toThrow()

// Assert async function throws
await expect(myFn()).rejects.toThrow("error message")
```

---

## Run Tests

```sh
# All tests
pnpm testFinal

# Only this module
pnpm testFinal --testPathPattern="secure-storage"

# With line-by-line coverage
pnpm testFinal --coverage --testPathPattern="secure-storage"
```

---

## Checklist

```
- [ ] pnpm add <package>
- [ ] Plugin added to app.config.ts (Expo modules only)
- [ ] jest.mock() added to jest.setup.ts
- [ ] Wrapper created in src/lib/<domain>/
- [ ] tests/lib/<wrapper>.test.ts written
- [ ] Feature-level tests written if a feature uses the wrapper
- [ ] pnpm testFinal — all green
```
