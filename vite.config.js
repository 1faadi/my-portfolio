import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Injects a preload for the hashed hero profile image after the bundle is known. */
function preloadLcpImage() {
  return {
    name: "preload-lcp-image",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // Prefer the stable public LCP asset so HTML can discover it before JS.
        if (html.includes('href="/lcp-profile.webp"')) return html;
        return html.replace(
          "</head>",
          `    <link rel="preload" as="image" href="/lcp-profile.webp" fetchpriority="high" />\n  </head>`
        );
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadLcpImage()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom")) return "react";
          if (id.includes("node_modules/react/")) return "react";
        },
      },
    },
  },
});
