import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    TanStackRouterVite(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "pwa-sample",
        short_name: "pwa-sample",
        description: "pwa-sample",
        theme_color: "#ffffff",
        display: "standalone",
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },

      devOptions: {
        enabled: process.env.SW_DEV === "true",
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },

      workbox: {
        sourcemap: true,
      }
    })],
});