import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "src/styles/variables.scss";`, // Автоматический импорт SCSS файлов
			},
		},
	},
	server: {
		fs: {
			cachedChecks: false,
		},
	},
	resolve: {
		alias: {
			features: path.resolve(__dirname, "src/features"),
			components: path.resolve(__dirname, "src/components"),
			shared: path.resolve(__dirname, "src/shared"),
			store: path.resolve(__dirname, "src/store"),
		},
	},
});
