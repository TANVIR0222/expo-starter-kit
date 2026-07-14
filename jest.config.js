/** @type {import('jest').Config} */
const config = {
  preset: "jest-expo",

  // ─── Test file discovery ───────────────────────────────────────────────────
  // Picks up tests from both __tests__/ (root) and tests/ (src-adjacent)
  testMatch: [
    "**/__tests__/**/*.{ts,tsx,js,jsx}",
    "**/tests/**/*.{test,spec}.{ts,tsx,js,jsx}",
    "**/*.{test,spec}.{ts,tsx,js,jsx}",
  ],

  // ─── Module alias resolution ───────────────────────────────────────────────
  // Mirrors the @/* path alias defined in tsconfig.json compilerOptions.paths
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/assets/(.*)$": "<rootDir>/assets/$1",
  },

  // ─── Transform ignore ──────────────────────────────────────────────────────
  // Tells Jest to transform these packages (they ship as ESM / un-transpiled).
  // The pnpm store uses a different node_modules path, hence the (.pnpm) group.
  transformIgnorePatterns: [
    "node_modules/(?!(.pnpm|(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|sonner-native))",
  ],

  // ─── Setup ────────────────────────────────────────────────────────────────
  setupFilesAfterEnv: ["./jest.setup.ts"],

  // ─── Coverage ─────────────────────────────────────────────────────────────
  collectCoverage: false, // opt-in via --coverage flag or pnpm testFinal
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**", // route files — covered by e2e, not unit tests
    "!**/node_modules/**",
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageDirectory: "coverage",
}

module.exports = config
