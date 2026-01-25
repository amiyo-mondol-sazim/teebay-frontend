import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "happy-dom",
    include: ["**/*.test.ts", "**/*.spec.ts"],
    setupFiles: ["./tests/setup.ts"],
    watch: false,
  },
});
