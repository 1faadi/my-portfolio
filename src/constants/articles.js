import elevenAgents from "../content/eleven-agents.md?raw";
import routePlanner from "../content/route-planner.md?raw";

/** Long-form articles, newest first. Each one has a static HTML entry at /insights/<slug>/. */
export const ARTICLES = [
  {
    slug: "replaced-or-tools-deleted-fallbacks",
    title: "I replaced Google OR-Tools with a greedy route builder. Then I deleted every fallback.",
    summary: "Why a field-service planner moved from Google OR-Tools to a predictable route builder, why every fallback was removed, and the rule that came out of it: keep fallbacks for words, not for decisions.",
    date: "2026-11-06",
    image: "/insights/route-planner.webp",
    imageAlt:
      "Pixel-art planner at a desk at sunrise, relieved, looking at three clean routes on one monitor next to a tangled route map on the other.",
    body: routePlanner,
  },
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
