import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.spec.ts", "tests/unit/**/*.spec.tsx"],
    coverage: { provider: "v8", reporter: ["text", "html"], include: ["lib/**"], thresholds: { lines: 80 } },
  },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
