import elevenAgents from "../content/eleven-agents.md?raw";

/** Long-form articles. Each one has a static HTML entry at /insights/<slug>/. */
export const ARTICLES = [
  {
    slug: "eleven-ai-agents",
    title: "I run eleven AI agents on one small server. Here is what they taught me.",
    summary:
      "A growth team, an Upwork scout, a reels studio, a trader and a forked sales agent, and the five lessons that kept repeating across all of them.",
    date: "2026-11-05",
    image: "/insights/eleven-agents.webp",
    imageAlt:
      "Pixel-art office at night with eleven characters working at glowing desks while a lead presents charts and a flowchart.",
    body: elevenAgents,
  },
];
