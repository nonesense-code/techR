import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure this directory is where your files are properly built
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
