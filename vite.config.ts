import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/virtual_keyboard/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // CSS → /styles/
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "styles/[name].[hash][extname]";
          }
          // Other assets → /assets/
          return "assets/[name].[hash][extname]";
        },
        // JS → /assets/js/
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
      },
    },
  },
  publicDir: "public",
});
