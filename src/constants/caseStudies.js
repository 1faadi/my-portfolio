/**
 * Long-form case studies. Facts come from each project's own design docs;
 * client names, hosts and unmeasured performance claims are left out on purpose.
 */
export const CASE_STUDIES = {
  "growth-office": {
    title: "Growth Office",
    summary:
      "A seven-agent growth team for a developer tool, built so every number comes from a real data source and nothing goes public without a human saying yes.",
    role: "Architect & Lead Engineer",
    timeline: "Sep 2026 to Oct 2026",
    stack: [
      "Claude Agent SDK",
      "Next.js",
      "TypeScript",
      "PixiJS",
      "Python",
      "FastAPI",
      "Scrapling",
      "GA4 Data API",
      "Search Console API",
      "Zod",
      "Docker",
      "Oracle Cloud",
    ],
    problem: [
      "Traceo is a small product with no marketing team. Growth work still has to happen every day: checking traffic, auditing SEO, planning content, writing drafts and spotting opportunities.",
      "A general chatbot is the wrong tool for this. It will happily invent traffic numbers, and letting an agent post to a live blog on its own is a risk no product should take on day one.",
    ],
    built:
      "An always-on growth floor. You talk to one lead agent, it plans the work, and six specialists carry it out with real tools. The whole team is visible as a pixel-art office: a tiled floor where each agent has a desk, a command center for the work queue and logs, and an agent strip showing who is thinking, working or waiting on a person.",
    agents: [
      ["Morgan", "Growth lead. Turns a plain message into a plan, dispatches the other agents step by step, compiles the daily digest and builds the growth plan."],
      ["Quinn", "Analytics. Pulls GA4 and Search Console numbers for 1, 7 and 30 days plus realtime, and reports period-over-period wins and losses."],
      ["Riley", "SEO. Runs site crawls through a Python crawler service, diffs issues week over week and checks sitemap, robots.txt, llms.txt and structured data live."],
      ["Casey", "Writer. Drafts blog outlines and posts in the product's voice, grounded in the analytics, with a quality self-check before saving."],
      ["Parker", "Publisher. Formats approved drafts and publishes only after an explicit approval flag passes the gate."],
      ["Alex", "Jobs. Pulls a live freelance job feed, scores fit with an LLM and drafts proposals for the best matches."],
      ["U-Radar", "Upwork signals. A separate scheduled service that uses the official Upwork MCP server, dedupes results and sends new jobs to its own desk."],
    ],
    flow: [
      "Owner message or schedule",
      "Morgan plans",
      "Specialists call tools",
      "Digest, crawl report or draft",
      "Human approval",
      "Publish",
    ],
    decisions: [
      ["Numbers only from tools", "Agents answer from tool results, never from memory. If credentials are missing they say exactly what is missing. With no LLM configured at all, the standup still runs on GA4 numbers with a template narrative."],
      ["People approve anything public", "Publishing is draft-only by default. The publish agent needs an explicit approve flag, and the publish mode comes from config so a test run can never hit production."],
      ["The crawler is its own service", "Crawling runs in Python with Scrapling behind a small FastAPI service. If it is down, the SEO agent falls back to a same-host HTML audit instead of failing."],
      ["Checks are live, not decorative", "Discoverability checks hit the real sitemap, robots.txt, llms.txt and JSON-LD every time. A green tick means the file was actually fetched and parsed."],
      ["Auth that degrades cleanly", "The model client tries a subscription token first, then an API key, then a router, then nothing. Each step down keeps the app working with less."],
      ["Simple storage first", "Digests, crawls, drafts and the brand kit are Zod-validated JSON on disk. Postgres comes in when the app runs on more than one instance."],
    ],
    next: [
      "Move storage to Postgres for multi-instance runs.",
      "Slack triggers so a message can start a mission.",
      "Scheduled wake-ups so standups run without a click.",
    ],
    related: "ai-route-planning",
  },

  "ai-route-planning": {
    title: "AI Route Planning & VRP Optimizer",
    summary:
      "A planning module for a field-service CRM that proposes who does which visit, in what order, on which day, and lets a manager approve it card by card.",
    role: "AI / Backend Engineer",
    timeline: "May 2026 to Sep 2026",
    stack: [
      "NestJS",
      "TypeScript",
      "Python",
      "FastAPI",
      "Google OR-Tools",
      "OSRM",
      "Redis",
      "PostgreSQL",
      "Prisma",
      "React",
      "OpenAI API",
    ],
    problem: [
      "Planners in a field-service business build each day by hand: which worker takes which visit, in what order, without breaking skills, capacity, locked appointments or time windows.",
      "It is slow, it gets worse as visits grow into the hundreds, and the result depends on whoever happens to be planning that day.",
    ],
    built:
      "An AI planning pipeline that turns the day's staff and visits into suggestion cards (assign, move, reorder, balance). Managers review each card, see a plain-English reason, and approve one at a time or in bulk.",
    agents: null,
    flow: [
      "Staff and visits",
      "Drive-time matrix (OSRM)",
      "Optimizer (OR-Tools or heuristic)",
      "Suggestion cards",
      "LLM writes the reason",
      "Manager approves",
    ],
    decisions: [
      ["Routing and optimizing are separate jobs", "OSRM answers how long A to B takes by road. The optimizer answers who does what, in which order. Keeping them apart means either can be swapped or fixed alone."],
      ["Self-hosted road times", "Drive times come from a self-hosted OSRM server instead of a paid distance API. Results are cached in Redis for about 30 days plus in memory. A straight-line estimate exists only as an emergency fallback and a dev switch."],
      ["Plan the whole day at once", "A Python OR-Tools service treats each worker as a vehicle with capacity, skills, locked visits and hard time windows. It minimizes travel and can drop low-priority visits with a penalty. Search time scales with the number of visits."],
      ["A fallback that always answers", "If the solver is down or finds no solution, a greedy heuristic in NestJS scores every eligible worker for each visit and still returns a usable plan."],
      ["Stay fast as visits grow", "Up to 300 visits are optimized together. Beyond that, a route-aware candidate pool ranks visits by priority, skills and closeness to each worker's existing stops."],
      ["The LLM explains, it never plans", "Routes come from the solver. The language model only rewrites the reason on each card in plain English, so a bad completion can never change a schedule."],
      ["Approvals people can trust", "Suggestions are stored with who approved them, when, and an optional reason. Bulk approve handles up to 200 cards with a result per card, and a partial failure never rolls back visits that were already applied."],
    ],
    next: [
      "Run the optimizer automatically when the schedule changes, instead of on a manual refresh.",
      "Collect a reason on bulk approvals too.",
      "Benchmark large days end to end before making speed claims.",
    ],
    related: "growth-office",
  },
};
