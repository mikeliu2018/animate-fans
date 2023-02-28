import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: false,
    base: "./ ", //生產環境路徑
    proxy: {
      // 本地開發環境通過代理實現跨域，生產環境使用 nginx 轉發
      // 正則表達式寫法
      "^/api": {
        target: "http://localhost:8000", // 後端服務實際地址
        changeOrigin: true, //開啟代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "^/streams": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/videos/, "/videos"),
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      "^.*secret.key": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
