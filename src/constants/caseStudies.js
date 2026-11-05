/**
 * Long-form case studies. Facts come from each project's code and design docs;
 * client names, hosts and unmeasured performance claims are left out on purpose.
 */
export const CASE_STUDIES = {
  "growth-office": {
    title: "Growth Office",
    summary:
      "A seven-agent growth team for a developer tool, built so every number comes from a real data source, every AI step has a fallback that works without AI, and nothing publishes on its own.",
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
      "PostgreSQL",
      "Zod",
      "Docker",
      "PM2",
      "Oracle Cloud",
    ],
    problem: [
      "Traceo is a small product with no marketing team. Growth work still has to happen every day: checking traffic, auditing SEO, planning content, writing drafts and spotting opportunities.",
      "A general chatbot is the wrong tool for this. It will happily invent traffic numbers, and letting an agent post to a live blog on its own is a risk no product should take on day one.",
    ],
    built:
      "An always-on growth floor. You talk to one lead agent, it routes the work, and six specialists carry it out with real tools. The whole team is visible as a pixel-art office: a tiled floor where each agent has a desk, a command center with the terminal log, digest, tasks, brand kit and memory, and an agent strip showing who is working, done or blocked. The same floor also gives read-only desks to other bots running on the server, such as a PR reviewer and a sales agent.",
    agents: [
      ["Morgan", "Growth lead. Reads each message with fast pattern matching and asks a model only when the patterns miss. Runs the right agents in a fixed order, writes the reply and builds the growth plan."],
      ["Quinn", "Analytics. Pulls GA4 and Search Console numbers for 1, 7 and 30 days plus realtime. Wins, misses and goals are decided by plain rules; the model only writes the summary."],
      ["Riley", "SEO. Runs site crawls through a Python crawler service, diffs issues week over week and checks sitemap, robots.txt, llms.txt and structured data live."],
      ["Casey", "Writer. Only writes about topics that match the brand kit or a real search query, researches the web, drafts in the product's voice and checks internal links. Saves drafts, never publishes."],
      ["Parker", "Publisher. Formats drafts and can push them to the blog, but only when publishing is switched to live in config. It is locked to draft mode today."],
      ["Alex", "Jobs. Reads U-Radar's Upwork feed, scores fit with plain rules, and uses a model for job analysis and short proposals with a word limit and banned phrases."],
      ["U-Radar", "Upwork signals. A separate scheduled service that uses the official Upwork MCP server, stores jobs in Postgres, scores each out of 100 with plain rules and posts the best fits to Slack and its desk."],
    ],
    flow: [
      "Owner message or schedule",
      "Morgan routes it",
      "Specialists call tools",
      "Digest, crawl report or draft",
      "Saved for review",
      "Publish when switched to live",
    ],
    decisions: [
      ["Code first, model second", "Morgan routes requests with pattern matching and only calls a model when nothing matches and the message looks like a command. The model's answer is checked against a schema before anything runs."],
      ["Numbers only from tools", "Numbers come from the GA4 and Search Console APIs, and rules decide what counts as a win or a miss. The model only describes them. If a reply looks wrong, it is replaced with a plain template that still quotes the real numbers."],
      ["Every AI step has a fallback", "No model configured, the standup runs on a template. Crawler down, the SEO agent runs a simpler same-host audit and says so. The team degrades instead of breaking."],
      ["Publishing stays locked until approval exists", "Publishing only works when config is switched to live, and it is set to draft everywhere. Nothing has been published automatically. A proper approval screen comes before that switch is flipped."],
      ["Checks are live, not decorative", "Discoverability checks hit the real sitemap, robots.txt, llms.txt and JSON-LD every time. A green tick means the file was actually fetched and parsed."],
      ["Auth that degrades cleanly", "The model client tries a subscription token first, then an API key, then a router, then nothing. Each step down keeps the app working with less."],
      ["Simple storage first", "The office keeps digests, crawls, drafts and the brand kit as Zod-validated JSON on disk. U-Radar, which needs history and dedupe, uses Postgres."],
    ],
    next: [
      "An approval screen for Parker, then switch publishing to live.",
      "A job queue, so long crawls stop running inside a web request.",
      "Move the rest of the storage to Postgres.",
      "Scheduled standups and CI for the check scripts.",
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
