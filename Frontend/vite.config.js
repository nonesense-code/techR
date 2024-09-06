import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    strictPort: true,
  },
  server: {
    proxy: {
      "product/api": "https://react-app-api-tau.vercel.app",
    },
  },
});
