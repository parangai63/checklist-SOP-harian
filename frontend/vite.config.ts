import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Port 5175 / API 4200 supaya bisa jalan berdampingan dengan Parang-ops, Keuangan, dan Yantos.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const target = env.VITE_API_PROXY_TARGET || "http://localhost:4200";
  return {
    plugins: [react()],
    server: {
      port: 5175,
      proxy: {
        "/api": { target, changeOrigin: true },
      },
    },
  };
});
