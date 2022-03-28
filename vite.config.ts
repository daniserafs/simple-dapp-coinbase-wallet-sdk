import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from '@rollup/plugin-inject'
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build:
      mode === 'production'
        ? {
            rollupOptions: {
              plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
            },
          }
        : undefined,
        resolve: {
          alias: {
            util: "util",
          },
        },
        optimizeDeps: {
          esbuildOptions:{
            define : {
              global: 'globalThis',
            },
          plugins: mode === 'development' ? [
            NodeGlobalsPolyfillPlugin({
              buffer: true,
              process: true,
            })
          ] : undefined,
          }
        }
    
          
          
  };
});
