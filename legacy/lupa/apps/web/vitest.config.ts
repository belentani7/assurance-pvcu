import { defineConfig } from "vitest/config";

/**
 * Production test configuration. Unit tests focus on deterministic product
 * logic so they run quickly in local development and CI without a browser.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["client/src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: ["client/src/lib/**/*.ts"],
      exclude: ["client/src/**/*.test.ts"],
    },
  },
});
