import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                    firebase: ["firebase/app", "firebase/auth"],
                    router: ["react-router-dom"],
                    ui: [
                        "@radix-ui/react-dialog",
                        "@radix-ui/react-label",
                        "@radix-ui/react-slot",
                    ],
                    utils: ["axios", "sonner", "howler"],
                },
            },
        },
    },
    optimizeDeps: {
        include: ["react", "react-dom", "react-router-dom"],
    },
});
