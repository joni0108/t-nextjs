// vitest.config.ts or vitest.config.js
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            exclude: ["node_modules", ".next/*", "*.mjs", "*.config.*", "src/**/*.bench.*", "src/**/*.test.*", "src/app/layout.tsx", "**/SEO.ts"],
            thresholds: {
                lines: 100,
                functions: 80,
                branches: 100,
                statements: 100,
            }
        },
        setupFiles: ["./setupTests.ts"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    }
})