// vitest.config.ts or vitest.config.js
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            exclude: ["node_modules", ".next/*", "*.mjs", "*.config.*", "*.bench.ts"],
            thresholds: {
                lines: 0,
                functions: 0,
                branches: 0,
                statements: 0,
            }
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    }
})