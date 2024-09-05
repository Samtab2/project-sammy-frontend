import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: `./Sammy_news_explorer-frontend/`,
  plugins: [react()],
  server: { port: 3000 },
});
