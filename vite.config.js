import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

//build process for the project
export default defineConfig({
    plugins: [react()],
    root: "src",
})