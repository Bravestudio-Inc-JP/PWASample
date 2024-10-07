import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, normalizePath } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { createRequire } from "node:module";
import path from "node:path";
import { viteStaticCopy } from "vite-plugin-static-copy";

const require = createRequire(import.meta.url);
const pdfjsDistPath = path.dirname(require.resolve("./node_modules/pdfjs-dist/package.json"));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"));

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    TanStackRouterVite(),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: "",
        },
      ],
    }),
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
        globPatterns: ["**/*.{js,css,html,mp3}"],
        globIgnores: ["**/*.{png,jpg,jpeg,gif,webp,mp4,avi,mov}"],
        maximumFileSizeToCacheInBytes: 2048 * 1024 * 1024
      },

      devOptions: {
        enabled: process.env.SW_DEV === "true",
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },

      workbox: {
        sourcemap: true,
      },
    })],
    resolve: {
      alias: {
        "piexif-ts": path.resolve(__dirname, "node_modules/piexif-ts/dist/piexif.js"),
      }
    }
});