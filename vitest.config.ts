import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        testTimeout: 60 * 1000,
    },
    envPrefix: "NEXT_",
});
