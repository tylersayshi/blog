import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
export default defineConfig(({ mode }) => {
    if (mode === "development") {
        return {
            optimizeDeps: {
                include: ["tailwindcss/colors"],
            },
            ssr: {
                optimizeDeps: {
                    include: ["next-mdx-remote/rsc"],
                },
            },
            plugins: [tailwindcss()],
        };
    }
    return {
        plugins: [tailwindcss()],
    };
});
