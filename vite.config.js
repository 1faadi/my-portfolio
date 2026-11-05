import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
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
        // Subpages (data-page) never show the hero photo.
        if (html.includes("data-page=")) return html;
        return html.replace(
          "</head>",
          `    <link rel="preload" as="image" href="/lcp-profile.webp" fetchpriority="high" />\n  </head>`
        );
      },
    },
  };
}

const page = (path) => fileURLToPath(new URL(path, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadLcpImage()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      // Each page is real static HTML so Vercel serves /insights/ etc. with their own meta tags.
      input: {
        main: page("index.html"),
        insights: page("insights/index.html"),
        elevenAgents: page("insights/eleven-ai-agents/index.html"),
        growthOffice: page("case-studies/growth-office/index.html"),
        routePlanning: page("case-studies/ai-route-planning/index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom")) return "react";
          if (id.includes("node_modules/react/")) return "react";
        },
      },
    },
  },
});
