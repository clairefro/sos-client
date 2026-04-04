import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ filename: "dist/stats.html" })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split `gpt-tokenizer` into a separate chunk for performance
          "gpt-tokenizer": ["gpt-tokenizer"],
        },
      },
    },
  },
});
