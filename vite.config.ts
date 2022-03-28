import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import NodeGlobalPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      util: "util",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalPolyfillPlugin({
          buffer: true,
          process: true,
        }),
      ],
    },
  },
});
