import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",  // Relative paths so it works on GitHub Pages without subpath config
  build: {
    target: "es2020",
    sourcemap: true
  },
  server: { port: 5173, open: false }
});
