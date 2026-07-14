/**
 * jest.setup.ts
 *
 * Global test environment setup. Runs after the Jest framework is installed
 * but before any test file is executed.
 *
 * Rules:
 * - Mock native modules that cannot run in Node (no native binaries).
 * - Keep mocks minimal — only stub what the module surface actually requires.
 * - Never import real app code here; this file runs in every test.
 */

// ─── React Native Gesture Handler ────────────────────────────────────────────
// Must be imported before any component that uses gesture handlers.
import "react-native-gesture-handler/jestSetup"

// ─── React Native Worklets ───────────────────────────────────────────────────
// react-native-worklets@0.x is a peer of Reanimated 4. Its native module
// cannot initialise in a Node process, so we stub the entire module.
jest.mock("react-native-worklets", () => ({
  runOnUI: (fn: () => void) => fn,
  runOnJS: (fn: () => void) => fn,
  makeMutable: (value: unknown) => ({ value }),
  makeShareableCloneRecursive: (value: unknown) => value,
}))

// ─── React Native Reanimated ─────────────────────────────────────────────────
// Reanimated 4 uses react-native-worklets whose native binary cannot run in
// Node. We provide a full manual stub — no require() of the actual package.
jest.mock("react-native-reanimated", async () => {
  const View = (await import("react-native")).View
  const noop = () => undefined
  const identity = <T>(v: T) => v

  return {
    __esModule: true,
    default: {
      View,
      Text: (await import("react-native")).Text,
      Image: (await import("react-native")).Image,
      ScrollView: (await import("react-native")).ScrollView,
      FlatList: (await import("react-native")).FlatList,
      createAnimatedComponent: identity,
      call: jest.fn(),
    },
    // Animated component factory
    createAnimatedComponent: identity,
    // Hooks — return plain values / no-ops
    useSharedValue: (init: unknown) => ({ value: init }),
    useAnimatedStyle: (factory: () => object) => {
      try {
        return factory()
      } catch {
        return {}
      }
    },
    useAnimatedRef: () => ({ current: null }),
    useAnimatedScrollHandler: () => noop,
    useAnimatedGestureHandler: () => noop,
    useDerivedValue: (factory: () => unknown) => ({ value: factory() }),
    useAnimatedReaction: noop,
    useAnimatedProps: (factory: () => object) => {
      try {
        return factory()
      } catch {
        return {}
      }
    },
    // Timing / spring / decay
    withTiming: identity,
    withSpring: identity,
    withDecay: identity,
    withDelay: (_delay: number, animation: unknown) => animation,
    withSequence: (...animations: unknown[]) =>
      animations[animations.length - 1],
    withRepeat: (animation: unknown) => animation,
    cancelAnimation: noop,
    // Easing
    Easing: {
      linear: identity,
      ease: identity,
      quad: identity,
      cubic: identity,
      bezier: () => identity,
      circle: identity,
      sin: identity,
      exp: identity,
      elastic: () => identity,
      bounce: identity,
      back: () => identity,
      in: identity,
      out: identity,
      inOut: identity,
    },
    // Layout animations
    FadeIn: { duration: () => ({ easing: () => ({}) }) },
    FadeOut: { duration: () => ({ easing: () => ({}) }) },
    Layout: { duration: () => ({}) },
    SlideInRight: { duration: () => ({}) },
    SlideOutRight: { duration: () => ({}) },
    // Worklet utilities
    runOnJS: (fn: (...args: unknown[]) => unknown) => fn,
    runOnUI: (fn: (...args: unknown[]) => unknown) => fn,
    makeMutable: (value: unknown) => ({ value }),
    makeShareable: identity,
    interpolate: (_val: number, _inputRange: number[], outputRange: number[]) =>
      outputRange[0],
    Extrapolate: { CLAMP: "clamp", EXTEND: "extend", IDENTITY: "identity" },
    // Animated components
    View,
    Text: (await import("react-native")).Text,
    Image: (await import("react-native")).Image,
    ScrollView: (await import("react-native")).ScrollView,
    FlatList: (await import("react-native")).FlatList,
  }
})

// ─── AsyncStorage ────────────────────────────────────────────────────────────
// The real implementation calls into native SQLite. The official mock provides
// an in-memory Map-backed implementation.
jest.mock(
  "@react-native-async-storage/async-storage",
  async () =>
    await import("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

// ─── Expo Constants ──────────────────────────────────────────────────────────
// expo-constants reads from native via NativeModules. Provide a minimal stub.
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      name: "Test App",
      slug: "test-app",
      extra: {
        appEnvironment: "test",
      },
    },
    appOwnership: "expo",
  },
}))

// ─── Expo Font ───────────────────────────────────────────────────────────────
// Font loading uses native file I/O; stub it out so tests don't hang.
jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true, null]),
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}))

// ─── Expo Splash Screen ──────────────────────────────────────────────────────
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(() => Promise.resolve()),
  hideAsync: jest.fn(() => Promise.resolve()),
  setOptions: jest.fn(),
}))

// ─── Expo Linking ────────────────────────────────────────────────────────────
jest.mock("expo-linking", () => ({
  createURL: jest.fn((path: string) => `exp://test/${path}`),
  parse: jest.fn((url: string) => ({ path: url })),
  useURL: jest.fn(() => null),
}))

// ─── Expo Localization ───────────────────────────────────────────────────────
jest.mock("expo-localization", () => ({
  getLocales: jest.fn(() => [{ languageCode: "en", regionCode: "US" }]),
  locale: "en-US",
  timezone: "UTC",
}))

// ─── Expo Router ─────────────────────────────────────────────────────────────
// expo-router wraps React Navigation. In unit tests we don't want full router
// context — mock the primitives used in route/screen files.
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => false),
  })),
  useLocalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
  usePathname: jest.fn(() => "/"),
  Link: ({ children }: { children: React.ReactNode }) => children,
  Stack: {
    Screen: () => null,
    Protected: ({ children }: { children: React.ReactNode }) => children,
  },
  Tabs: {
    Screen: () => null,
  },
  Redirect: () => null,
}))

// ─── Expo Status Bar ─────────────────────────────────────────────────────────
jest.mock("expo-status-bar", () => ({
  StatusBar: () => null,
  setStatusBarStyle: jest.fn(),
}))

// ─── Expo System UI ──────────────────────────────────────────────────────────
jest.mock("expo-system-ui", () => ({
  setBackgroundColorAsync: jest.fn(() => Promise.resolve()),
}))

// ─── Sonner Native (toast) ───────────────────────────────────────────────────
jest.mock("sonner-native", () => ({
  Toaster: () => null,
  toast: Object.assign(jest.fn(), {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    dismiss: jest.fn(),
  }),
}))

// ─── React Native Safe Area Context ──────────────────────────────────────────
// SafeAreaProvider and useSafeAreaInsets require native measurement APIs.
// Return zero insets so layout calculations work without a real device.
jest.mock("react-native-safe-area-context", () => {
  const insets = { top: 0, right: 0, bottom: 0, left: 0 }
  const frame = { width: 390, height: 844, x: 0, y: 0 }
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: { insets, frame },
  }
})

// ─── Suppress known noisy warnings ───────────────────────────────────────────
// React Native outputs warnings for missing native modules in test environment.
// Suppress the ones that are expected and don't affect test correctness.
const originalWarn = console.warn.bind(console)
const originalError = console.error.bind(console)

const SUPPRESSED_WARNINGS = [
  "NativeEventEmitter",
  "Sending `onAnimatedValueUpdate`",
]
const SUPPRESSED_ERRORS = [
  "Warning: An update to",
  "Warning: Cannot update a component",
]

beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      // @ts-ignore: TS doesn't know about the `includes` method on unknown
      SUPPRESSED_WARNINGS.some((w) => args[0].includes(w))
    )
      return
    originalWarn(...args)
  }
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      // @ts-ignore: TS doesn't know about the `includes` method on unknown
      SUPPRESSED_ERRORS.some((e) => args[0].includes(e))
    )
      return
    originalError(...args)
  }
})

afterAll(() => {
  console.warn = originalWarn
  console.error = originalError
})
