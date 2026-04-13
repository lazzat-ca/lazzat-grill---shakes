import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteApiPlugin } from "./src/vite-api-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load ALL env vars (no prefix filter) and inject into process.env
  // so that API modules loaded via ssrLoadModule can access them.
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), viteApiPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
