import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // Membuka akses dari jaringan lokal
    port: 5173, // (opsional) Atur port sesuai kebutuhan
  },
});
