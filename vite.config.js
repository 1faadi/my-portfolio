import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Injects a preload for the hashed hero profile image after the bundle is known. */
function preloadLcpImage() {
  return {
    name: "preload-lcp-image",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;
        const profile = Object.values(bundle).find(
          (chunk) =>
            chunk.type === "asset" &&
            typeof chunk.fileName === "string" &&
            /profile.*\.webp$/.test(chunk.fileName)
        );
        if (!profile) return html;
        return html.replace(
          "</head>",
          `    <link rel="preload" as="image" href="/${profile.fileName}" fetchpriority="high" />\n  </head>`
        );
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadLcpImage()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/motion")) return "motion";
          if (id.includes("node_modules/react-dom")) return "react";
          if (id.includes("node_modules/react/")) return "react";
        },
      },
    },
  },
});
