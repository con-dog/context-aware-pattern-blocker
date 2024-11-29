import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"),
				popup: path.resolve(__dirname, "popup.html"),
				"side-panel": path.resolve(__dirname, "side-panel.html"),
				"service-worker": path.resolve(__dirname, "./src/service-worker.ts"),
			},
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "chunks/[name].js",
				assetFileNames: "assets/[name].[ext]",
			},
		},
		copyPublicDir: true,
	},
	publicDir: path.resolve(__dirname, "public"),
});
