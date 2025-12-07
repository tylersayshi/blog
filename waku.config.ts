import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "waku/config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      include: ["tailwindcss/colors"],
    },
    ssr: {
      optimizeDeps: {
        include: ["next-mdx-remote/rsc"],
      },
    },
    plugins: [tailwindcss()],
  },
});
