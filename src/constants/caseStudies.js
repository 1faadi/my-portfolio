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
    facts: [
      ["About 29,000", "lines of TypeScript, TSX and Python"],
      ["7", "agents with a desk on the floor"],
      ["24/7", "on a free Oracle Cloud ARM server"],
    ],
    article: {
      href: "/insights/eleven-ai-agents/",
      title: "I run eleven AI agents on one small server. Here is what they taught me.",
    },
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
      ["Isolate the model from the machine", "Model calls run as a subprocess with no user settings and an empty MCP configuration, and any API key is removed so the subscription is always what gets billed. This came after a personal MCP server, loaded by accident, took the whole web app down."],
      ["Simple storage first", "The office keeps digests, crawls, drafts and the brand kit as Zod-validated JSON on disk. U-Radar, which needs history and dedupe, uses Postgres."],
    ],
    next: [
      "An approval screen for Parker, then switch publishing to live.",
      "A job queue, so long crawls stop running inside a web request.",
      "Move the rest of the storage to Postgres.",
      "Scheduled standups and CI for the check scripts.",
      "Backups for the server state and drafts.",
    ],
    related: "ai-route-planning",
  },

  "ai-route-planning": {
    title: "AI Route Planning & VRP Optimizer",
    summary:
      "A planning module for a field-service CRM that proposes who does which visit, in what order, on which day, explains every suggestion in plain English, and lets a manager approve it card by card.",
    role: "AI / Backend Engineer",
    timeline: "May 2026 to Sep 2026",
    stack: [
      "NestJS",
      "TypeScript",
      "Python",
      "FastAPI",
      "OSRM",
      "Redis",
      "BullMQ",
      "PostgreSQL",
      "Prisma",
      "React",
      "OpenAI API",
    ],
    problem: [
      "Planners in a field-service business build each day by hand: which worker takes which visit, in what order, without breaking skills, capacity, shifts, locked appointments or customer time windows.",
      "It is slow, it gets worse as visits grow into the hundreds, and the result depends on whoever happens to be planning that day.",
    ],
    built:
      "A planning pipeline that turns the day's staff and visits into suggestion cards: assign, move, reorder, unassign, or flag a visit that cannot fit and say why. Each card shows the exact clock time it proposes, a short reason in plain English and a preview on the calendar. Managers approve one card at a time or many at once. It runs when a planner presses refresh, every morning at 7, and a few seconds after a visit is cancelled or rescheduled.",
    agents: null,
    flow: [
      "Trigger: refresh, 7am, or a changed visit",
      "Road times from self-hosted OSRM",
      "Python solver builds routes",
      "Cards with clock times and reasons",
      "LLM rewrites the reason text",
      "Manager approves",
    ],
    decisions: [
      ["Routing and optimizing are separate jobs", "OSRM answers how long A to B takes by road. The solver answers who does what, in which order. Keeping them apart means either can be swapped or fixed alone."],
      ["Road times cached per leg", "Drive times come from a self-hosted OSRM server instead of a paid distance API. Every directed leg is cached for 30 days, nearby coordinates collapse into one point, and legs nobody can use are never fetched, so a refresh mostly reads from cache."],
      ["From OR-Tools to a solver planners could predict", "The first version used Google OR-Tools with guided local search. It found globally cheap plans, but planners wanted the obvious choice: the closest stop that still fits. After several rounds of bending the objective, I replaced the search with a deterministic route builder. It respects every hard rule, checks ahead that locked visits still fit, and gives the same answer for the same input."],
      ["Fail closed instead of falling back", "Early versions fell back to a simpler heuristic, Google, or straight-line distances when something broke. Those fallbacks quietly produced worse plans that looked normal. Now a failure is visible: the run fails, a circuit breaker pauses calls to a struggling service, and the planner sees why."],
      ["Every unplanned visit gets an answer", "If a visit cannot be placed, it still gets a card with the reason, such as no qualified worker, outside its time window, or the day is full. A reconcile step makes sure no visit silently disappears from the results."],
      ["The LLM explains, it never plans", "Routes and times come from code. The language model only rewrites the reason on each card, in one batch call per run, with a strict schema and a quality check. If it fails or writes something unhelpful, the template reason stays."],
      ["Approvals people can trust", "Approving cards runs in one database transaction with per-worker locks, re-checks that nothing changed since the suggestion was made, and verifies no one is double-booked. Up to 200 cards can be approved together, because a route plan should never be half applied."],
    ],
    next: [
      "Benchmark large days end to end before making speed claims.",
      "Collect a reason on bulk approvals too.",
      "Add more automatic triggers, such as a worker calling in sick.",
    ],
    related: "growth-office",
  },
};
