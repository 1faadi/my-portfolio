const GITHUB_USER = "1faadi";
const repo = (name) => `https://github.com/${GITHUB_USER}/${name}`;

export const PROFILE = {
  name: "Syed Fahad Abbas Kazmi",
  shortName: "Syed Fahad Abbas",
  title: "AI Engineer & Full-Stack Software Developer",
  tagline: "AI SYSTEMS · FULL-STACK · INTELLIGENT AUTOMATION",
  location: "Islamabad, Pakistan",
  availability: "Open to AI / full-stack roles",
  resumePath: "/Syed-Fahad-Abbas-Resume.pdf",
  /** Filename the browser saves as (URL stays hyphenated for a clean link). */
  resumeFileName: "Syed Fahad Abbas Resume.pdf",
};

/** Hero H1: the outcome first, the name sits above it. */
export const HERO_HEADLINE = "I ship AI agents and LLM systems to production.";

export const HERO_CONTENT = `I build AI-powered products end to end — RAG pipelines, agentic workflows, and computer-vision systems wrapped in fast, production-grade Next.js and Nest.js applications. Currently AI Engineer at BXTrack Solutions and Co-Founder & CTO of Traceo.`;

// Values are derived where possible so they stay true as projects are added.
export const HERO_STATS = () => [
  { value: "3+", label: "Years shipping software" },
  { value: `${PROJECTS.length}`, label: "Projects shipped" },
  { value: "7", label: "Agents in production" },
  { value: "CTO", label: "Co-founder of Traceo" },
];

export const ABOUT_TEXT = `I am Syed Fahad Abbas Kazmi, a full-stack software engineer specialising in AI-powered applications and production LLM systems. I work across the whole delivery lifecycle: architecting scalable back ends, building interactive front ends, and integrating Retrieval-Augmented Generation, vector databases, and intelligent automation into real products people use.

At BXTrack Solutions I design LLM-driven features, embeddings and retrieval pipelines, and agentic workflows built on MCP servers and custom Claude Code Skills, Hooks and Sub-agents. I build voice calling agents with Vapi, end-to-end business automations in n8n, and computer-vision pipelines using Roboflow-trained models and the Segment Anything Model.

My core stack is TypeScript, Next.js, Nest.js and React, backed by solid PHP/Laravel and database engineering fundamentals — PostgreSQL, MySQL, Supabase and Neon, with real attention to schema design and query optimisation.

Alongside client work I am Co-Founder & CTO of Traceo, a browser developer tool that helps developers and QA teams inspect CSS, capture visual bugs and record sessions, then share them as actionable reports. I own it end to end: product design, front-end engineering, and go-to-market.

I am an effective communicator and a self-directed remote collaborator, with a track record of delivering high-quality, user-focused solutions on time.`;

export const SKILL_GROUPS = [
  {
    title: "AI / ML",
    items: [
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Vercel AI SDK",
      "Vector databases",
      "Embeddings",
      "Prompt engineering",
      "Agentic systems",
      "Model Context Protocol (MCP)",
      "Computer vision (Roboflow, SAM)",
    ],
  },
  {
    title: "AI Tooling & Agentic Dev",
    items: [
      "MCP servers & integrations",
      "Claude Code (Skills, Rules, Hooks, Sub-agents)",
      "n8n workflow automation",
      "Voice AI agents (Vapi)",
      "Agent orchestration",
      "AI-assisted dev (Cursor, Claude Code)",
    ],
  },
  {
    title: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "PHP",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      "Next.js",
      "React",
      "Nest.js",
      "Node.js",
      "FastAPI",
      "Laravel",
      "jQuery",
      "Bootstrap",
      "Tailwind CSS",
    ],
  },
  {
    title: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Neon (serverless Postgres)",
      "pgvector",
      "Schema design",
      "Query optimisation",
    ],
  },
  {
    title: "Practices",
    items: [
      "REST API design",
      "Third-party integration",
      "Responsive & cross-browser",
      "Git",
      "Agile delivery",
      "Performance optimization",
    ],
  },
];

export const EXPERIENCES = [
  {
    year: "June 2025 — Present",
    role: "AI Engineer",
    company: "BXTrack Solutions",
    location: "Islamabad, Pakistan",
    highlights: [
      "Design and build AI-powered features for production applications, including LLM-driven functionality, RAG pipelines and intelligent automation.",
      "Architect and integrate vector databases and embeddings pipelines for retrieval-augmented, context-aware AI systems.",
      "Develop agentic workflows using MCP servers and custom Claude Code Skills, Hooks and Sub-agents to automate engineering and product tasks.",
      "Build end-to-end workflow automations with n8n, connecting APIs, databases and AI models to business processes.",
      "Develop voice calling AI agents with Vapi, integrating telephony, LLMs and conversational flows for automated call handling.",
      "Ship computer-vision pipelines with Roboflow-trained models and the Segment Anything Model (SAM) for detection and segmentation.",
      "Evaluate and adopt emerging AI tooling (LangChain, LangGraph, LlamaIndex, Vercel AI SDK) to improve delivery speed and reliability.",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Nest.js",
      "RAG",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Vercel AI SDK",
      "MCP",
      "n8n",
      "Vapi",
      "Roboflow / SAM",
      "PostgreSQL",
    ],
  },
  {
    year: "Mar 2025 — June 2025",
    role: "Associate Software Engineer (Contract)",
    company: "BXTrack Solutions",
    location: "Remote",
    highlights: [
      "Developed and maintained features for AutoBunny.com, a Canadian online marketplace for new and used vehicles with listings, search filters and dealer inventory.",
      "Worked on AutoBunny Dealer Solutions, an all-in-one dealership platform covering inventory management, CRM and lead management, dealer websites and inventory syndication.",
      "Built and maintained Laravel back-end features and REST APIs across both platforms, testing endpoints with Postman.",
      "Fixed production bugs and shipped features remotely, coordinating with the team on requirements and releases.",
    ],
    technologies: ["Laravel", "PHP", "Livewire", "Tailwind CSS", "REST APIs", "Postman"],
  },
  {
    year: "June 2023 — Jan 2024",
    role: "Associate Software Engineer",
    company: "BXTrack Solutions",
    location: "Islamabad, Pakistan",
    highlights: [
      "Designed, built and maintained full-stack web applications with Laravel and React, from database to UI.",
      "Developed dynamic, component-based front ends in React and integrated them with Laravel back ends.",
      "Architected and consumed RESTful APIs and integrated third-party services to extend application functionality.",
      "Optimized performance by refining database queries and reducing load times across client projects.",
      "Managed project timelines, scope and deliverables, coordinating with stakeholders to ship on schedule.",
    ],
    technologies: [
      "React",
      "Laravel",
      "PHP",
      "MySQL",
      "REST APIs",
      "JavaScript",
      "Git",
    ],
  },
  {
    year: "Jan 2023 — May 2023",
    role: "Laravel Developer (Remote)",
    company: "Brainiac Creative Solutions",
    location: "Sargodha, Pakistan",
    highlights: [
      "Architected, developed and maintained robust, scalable web applications using the Laravel framework.",
      "Collaborated with distributed teams over video calls, chat and email to align on requirements and resolve issues.",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "Git", "Remote"],
  },
  {
    year: "Oct 2022 — Jan 2023",
    role: "Web Designer (Internship)",
    company: "Brainiac Creative Solutions",
    location: "Sargodha, Pakistan",
    highlights: [
      "Translated visual concepts into responsive, accessible web interfaces with HTML, CSS, Bootstrap and JavaScript.",
      "Applied responsive design techniques with CSS media queries for consistent experiences across devices.",
    ],
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "jQuery"],
  },
];

export const EDUCATION = [
  {
    degree: "BS Computer Science",
    school: "National University of Modern Languages (NUML), Islamabad",
    year: "Feb 2023 — Expected Jan 2027",
  },
  {
    degree: "Intermediate (HSSC)",
    school: "Government College University (GCU), Lahore",
    year: "2020 — 2022",
  },
  {
    degree: "Matriculation (SSC)",
    school: "Sanai School System, Sargodha",
    year: "Completed 2020",
  },
];

/**
 * Project cover images. Screenshots of the live deployments, GitHub OpenGraph cards for
 * repo-only work. Vite resolves + fingerprints them; `image` on a project is the file stem.
 */
const COVERS = import.meta.glob("../assets/projects/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const cover = (stem) => COVERS[`../assets/projects/${stem}.webp`];

/**
 * `featured` projects render as large cards; the rest fill the grid.
 * `caseStudy` links a card to its long-form write-up.
 * `category` drives the filter chips in the Projects section.
 */
export const PROJECTS = [
  {
    title: "Traceo",
    role: "Co-Founder & CTO",
    category: "Product",
    featured: true,
    year: "Feb 2026 — Present",
    image: cover("traceo"),
    description:
      "Chrome extension for one-click bug capture: developers and QA teams inspect CSS, capture visual bugs and record sessions, then share them as actionable reports. Owned end to end — product design, front-end engineering and go-to-market.",
    technologies: ["Chrome Extension", "TypeScript", "React", "Product"],
    live: "https://www.traceo.dev",
  },
  {
    title: "Growth Office",
    role: "Architect & Lead Engineer",
    category: "AI Agents",
    featured: true,
    year: "Sep 2026 — Oct 2026",
    image: cover("growth-office"),
    caseStudy: "/case-studies/growth-office/",
    description:
      "Multi-agent growth team for Traceo rendered as a pixel-art office: Pixi tiled floor, Command Center and agent strip. Seven agents run GA4/Search Console standups, Scrapling SEO audits, brand-kit planning, blog drafts and Upwork job scoring. Numbers come only from real APIs, every LLM step has a no-LLM fallback, and publishing is locked to draft mode. Claude Agent SDK, Next.js, Python crawler, Postgres, deployed on Oracle Cloud.",
    technologies: ["Claude Agent SDK", "Next.js", "TypeScript", "PixiJS", "FastAPI"],
  },
  {
    title: "AI Route Planning & VRP Optimizer",
    role: "AI / Backend Engineer",
    category: "Optimization",
    featured: true,
    year: "May 2026 — Sep 2026",
    image: cover("ai-route-planning"),
    caseStudy: "/case-studies/ai-route-planning/",
    description:
      "Planning module for a field-service CRM that decides who does which visit, in what order, on which day. Drive times from self-hosted OSRM cached per road leg, a Python route solver that respects skills, capacity, shifts, time windows and locked visits, a BullMQ job queue with a circuit breaker, and an LLM that only explains the “why”. Started on Google OR-Tools, then moved to a predictable nearest-feasible solver planners could reason about.",
    technologies: ["Python", "FastAPI", "NestJS", "OSRM", "Redis", "BullMQ", "PostgreSQL"],
  },
  {
    title: "Pieces & Bricks Mosaic Studio",
    role: "Solo Developer",
    category: "Computer Vision",
    year: "Oct 2026",
    image: cover("pieces-and-bricks"),
    description:
      "Browser-only PoC turning a photo into a buildable brick mosaic on 24×24 baseplates with a 40-colour palette. In-browser face detection auto-frames the crop; a byte-identical TypeScript port of PIL’s Lanczos resampling plus quantization reproduces a commercial pipeline brick-for-brick. Live counts, editor, CSV/PNG export and printable assembly instructions.",
    technologies: ["TypeScript", "React", "Vite", "MediaPipe", "Canvas"],
  },
  {
    title: "Morgan — Growth Lead Agent",
    role: "Growth Office",
    category: "AI Agents",
    year: "Sep 2026",
    image: cover("go-morgan"),
    description:
      "Lead of the Growth Office floor: routes each owner message with fast pattern matching and calls an LLM classifier only when the patterns miss, runs the other agents as a streamed plan in a fixed order, then writes the reply and builds the growth plan from brand kit, GA4 and crawl data.",
    technologies: ["Claude Agent SDK", "TypeScript", "Zod", "Streaming"],
  },
  {
    title: "Quinn — Analytics Agent",
    role: "Growth Office",
    category: "AI Agents",
    year: "Sep 2026",
    image: cover("go-quinn"),
    description:
      "Runs the daily standup numbers: GA4 1d/7d/30d plus realtime and Search Console stats, period-over-period deltas, and wins and losses decided by plain rules. The LLM only writes the summary, and a template takes over when no LLM is configured.",
    technologies: ["GA4 Data API", "Search Console API", "TypeScript"],
  },
  {
    title: "Riley — SEO Agent",
    role: "Growth Office",
    category: "AI Agents",
    year: "Sep 2026",
    image: cover("go-riley"),
    description:
      "Technical SEO agent: Scrapling crawls through a Python/FastAPI service, crawl digests, week-over-week issue diffs and live discoverability checks (sitemap, robots, llms.txt, JSON-LD). Same-host HTML audit fallback when the crawler is down.",
    technologies: ["Scrapling", "FastAPI", "Docker", "TypeScript"],
  },
  {
    title: "Casey — Writer Agent",
    role: "Growth Office",
    category: "AI Agents",
    year: "Sep 2026",
    image: cover("go-casey"),
    description:
      "Drafts blog posts in product voice: topic must match the brand kit or a real Search Console query, then web research, an LLM SEO writer and an internal-link check. Saves drafts only; never publishes.",
    technologies: ["LLM prompting", "Zod", "Markdown", "Next.js"],
  },
  {
    title: "Parker — Publish Agent",
    role: "Growth Office",
    category: "AI Agents",
    year: "Sep 2026",
    image: cover("go-parker"),
    description:
      "Publishing agent: formats drafts and pushes them to the Traceo blog only when publish mode is switched to live in config. It is locked to draft mode today, and nothing has been published automatically; an approval screen comes before going live.",
    technologies: ["Next.js API routes", "Zod", "Config-gated publishing"],
  },
  {
    title: "Alex — Jobs Agent",
    role: "Growth Office",
    category: "AI Agents",
    year: "Sep 2026",
    image: cover("go-alex"),
    description:
      "Password-gated jobs agent: reads U-Radar's Upwork job feed from Postgres, scores fit with plain rules, uses an LLM for job analysis, and drafts 120 to 190 word proposals with a banned-phrase check for the best-fit roles.",
    technologies: ["PostgreSQL", "Rule-based scoring", "Claude", "Next.js", "TypeScript"],
  },
  {
    title: "U-Radar — Upwork Signal Agent",
    role: "Growth Office",
    category: "AI Agents",
    year: "Sep 2026",
    image: cover("go-uradar"),
    description:
      "Independent Upwork pipeline: a scheduler runs the Claude Agent SDK with the official Upwork MCP server, then normalizes, dedupes and stores jobs in Postgres. Plain fit rules score each job out of 100, and the best fits go to Slack and to its desk on the office floor. Runs headless as a separate Node service.",
    technologies: ["Claude Agent SDK", "MCP", "Node.js", "PostgreSQL", "Slack"],
  },
  {
    title: "NUML ERP System",
    role: "Final Year Project · NUML",
    category: "Full-stack",
    year: "2025 — Present",
    image: cover("university-erp-system"),
    description:
      "ERP system for university operations built with the official NUML team — student, academic and administrative modules. Contributing full-stack development, database schema design and module integration.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "REST APIs"],
  },
  {
    title: "AI Video Analyzer",
    role: "AI Engineer",
    category: "Computer Vision",
    year: "2025",
    image: cover("ai-video-analyzer"),
    description:
      "Warehouse safety inspection platform: uploads warehouse footage and runs AI detection for incorrect parking and waste obstructing emergency-vehicle and fire-brigade access. Two front-end iterations plus a Python inference backend — ingestion, model inference, API design and a results/playback UI.",
    technologies: ["TypeScript", "Next.js", "Python", "Computer Vision"],
    live: "https://ai-video-analyzer-v2.vercel.app",
    code: repo("AIVideoAnalyzer-Backend"),
  },
  {
    title: "Maqsam Voice Agent",
    role: "AI Engineer",
    category: "AI & LLM",
    year: "2025",
    image: cover("maqsam-voice-agent"),
    description:
      "Voice assistant integrating LLMs with telephony so callers interact through an AI-driven conversational flow. Built the TypeScript front end, live connection state and voice/event handling.",
    technologies: ["TypeScript", "Voice AI", "LLMs", "Telephony"],
    live: "https://maqsam-voice-agent.vercel.app",
    code: repo("MaqsamVoiceAgent"),
  },
  {
    title: "FloorPlanSegmentor",
    role: "AI Engineer",
    category: "Computer Vision",
    year: "2025",
    image: cover("floorplansegmentor"),
    description:
      "Drag-and-drop tool that processes architectural floor plans and extracts structural regions with a segmentation pipeline. Owned the TypeScript UI and the pipeline integration.",
    technologies: ["TypeScript", "SAM", "Roboflow", "Next.js"],
    live: "https://floor-plan-segmentor.vercel.app",
    code: repo("FloorPlanSegmentor"),
  },
  {
    title: "Hairstyle-ai",
    role: "Solo Developer",
    category: "AI & LLM",
    image: cover("hairstyle-ai"),
    description:
      "AI hairstyle changer offering 150+ virtual try-ons on a user's own photo, with before/after comparison and an AI nail-art mode. Full TypeScript stack — model prompting, image handling and a Next.js UI.",
    technologies: ["TypeScript", "Next.js", "Generative AI", "Vercel"],
    live: "https://hairstyle-ai-dun.vercel.app",
    code: repo("hairstyle-ai"),
  },
  {
    title: "Symptra Policy Assistant",
    role: "AI Engineer",
    category: "AI & LLM",
    year: "2025",
    image: cover("symptra"),
    description:
      "Retrieval-based assistant that answers employee questions about company policies and procedures — suggested prompts, chat UI and light/dark theming over a document-grounded backend.",
    technologies: ["TypeScript", "Next.js", "RAG", "LLMs"],
    live: "https://symptra.vercel.app",
    code: repo("symptra"),
  },
  {
    title: "Core42Ops",
    role: "Solo Developer",
    category: "Full-stack",
    year: "2025",
    image: cover("core42ops"),
    description:
      "Voice Ops dashboard for monitoring and analysing AI call operations — total calls, completion rate and average duration tiles, recent-call tables, and agent/settings views.",
    technologies: ["TypeScript", "Next.js", "Dashboard", "Voice AI"],
    live: "https://core42-ops.vercel.app",
    code: repo("Core42Ops"),
  },
  {
    title: "AI Job Scraper",
    role: "Solo Developer",
    category: "Automation",
    image: cover("ai-job-scraper"),
    description:
      "Authenticated job-discovery workflow that scrapes listings and uses an AI layer to summarise, filter and rank roles — scraper logic, data normalisation and a TypeScript UI.",
    technologies: ["TypeScript", "Scraping", "LLMs", "Vercel"],
    live: "https://ai-job-scraper-seven.vercel.app",
    code: repo("AIJobScraper"),
  },
  {
    title: "VercelBot",
    role: "Solo Developer",
    category: "Automation",
    image: cover("vercelbot"),
    description:
      "AI-powered development assistant for building, deploying and managing web applications — Google/email auth, workflow automation around deployments, status and project actions.",
    technologies: ["TypeScript", "Automation", "Vercel API", "Auth"],
    live: "https://talkjunkie.vercel.app",
    code: repo("VercelBot"),
  },
  {
    title: "Magic Storybook",
    role: "Solo Developer",
    category: "AI & LLM",
    image: cover("ai-gen-storybook"),
    description:
      "Generative storybook app: upload a child's photo and they become the hero of a customised illustrated adventure — jungle expeditions, superhero missions, princess tales.",
    technologies: ["TypeScript", "Next.js", "Generative AI", "Vercel"],
    live: "https://ai-gen-storybook.vercel.app",
    code: repo("AI-Gen-Storybook"),
  },
  {
    title: "BinteShauq",
    role: "Solo Developer",
    category: "Full-stack",
    image: cover("binteshauq"),
    description:
      "E-commerce storefront for premium women's wear — product catalogue, featured collections, cart and accounts. Full-stack TypeScript with server-side data flows; product, UI and deployment owned end to end.",
    technologies: ["TypeScript", "Next.js", "E-commerce", "Vercel"],
    live: "https://binte-shauq.vercel.app",
    code: repo("BinteShauq"),
  },
  {
    title: "Ambial",
    role: "Solo Developer",
    category: "Full-stack",
    image: cover("ambial"),
    description:
      "Community content platform with authenticated sign-in that unlocks tailored content for members — clean, motion-aware Next.js UI.",
    technologies: ["TypeScript", "Next.js", "Auth", "Vercel"],
    live: "https://ambial.vercel.app",
    code: repo("ambial"),
  },
  {
    title: "Next.js AI Chatbot",
    role: "Solo Developer",
    category: "AI & LLM",
    image: cover("nextjs-ai-chatbot"),
    description:
      "LLM chatbot reference architecture — streaming responses, prompt handling and chat persistence, reusable as a starter for domain-specific assistants.",
    technologies: ["Next.js", "Vercel AI SDK", "TypeScript", "Streaming"],
    code: repo("nextjs-ai-chatbot"),
  },
  {
    title: "BXAssist",
    role: "Solo Developer",
    category: "AI & LLM",
    image: cover("bxassist"),
    description:
      "Slack-integrated AI assistant with a policy-chat backend — prompt orchestration and API layer behind a Slack app.",
    technologies: ["TypeScript", "Slack API", "LLMs", "Vercel"],
    code: repo("BXAssist"),
  },
  {
    title: "BrandBrain",
    role: "Solo Developer",
    category: "AI & LLM",
    image: cover("brandbrain"),
    description:
      "Brand and marketing intelligence tool that organises insights and supports decision-making for marketers.",
    technologies: ["TypeScript", "Next.js", "AI", "Vercel"],
    code: repo("brandbrain"),
  },
  {
    title: "Pharmafy",
    role: "Web Developer",
    category: "Full-stack",
    year: "2025",
    image: cover("pharmafy"),
    description:
      "Pharmacy management product covering inventory, records and order workflows, with a Postgres-style data model and modular UI.",
    technologies: ["TypeScript", "Next.js", "PostgreSQL", "Vercel"],
    code: repo("pharmacy-mgmt"),
  },
  {
    title: "Cricket Predictor",
    role: "Solo Developer",
    category: "AI & LLM",
    image: cover("cricket-predictor"),
    description:
      "Sports analytics tool exposing model-driven cricket predictions and insights — data flow, prediction layer and UI.",
    technologies: ["TypeScript", "Analytics", "ML"],
    code: repo("cricket-predictor"),
  },
  {
    title: "n8n Render Deploy",
    role: "Solo Developer",
    category: "Automation",
    image: cover("n8n-render-deploy"),
    description:
      "Deployment configuration and utilities for self-hosting n8n workflow automation.",
    technologies: ["n8n", "Docker", "Automation"],
    code: repo("n8nRender"),
  },
  {
    title: "Hospital Management System",
    role: "Solo Developer",
    category: "Full-stack",
    image: cover("hospital-management-system"),
    description:
      "Full-featured Laravel management application with user authentication, email verification and password-reset flows.",
    technologies: ["Laravel", "PHP", "MySQL", "Blade"],
    code: repo("HospitalManagementSystem"),
  },
  {
    title: "E-Commerce Platform",
    role: "Solo Developer",
    category: "Full-stack",
    image: cover("e-commerce-platform"),
    description:
      "Multi-page Laravel online store with product catalogue, cart and order management.",
    technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    code: repo("LaravelProject"),
  },
  {
    title: "Single-Page CRUD App",
    role: "Solo Developer",
    category: "Full-stack",
    image: cover("single-page-crud-app"),
    description:
      "SPA demonstrating a decoupled front end against a Laravel API back end.",
    technologies: ["Vue.js", "Laravel", "REST APIs", "MySQL"],
    code: repo("BooksPortal"),
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

export const CONTACT = {
  address: "Islamabad, Pakistan",
  phoneNo: "+92 304 1646924",
  email: "fahadkazmi.dev@gmail.com",
};

/** Profile URLs for nav + structured data (JSON-LD). */
export const SOCIAL_PROFILES = {
  linkedin: "https://www.linkedin.com/in/syed-fahad-abbas-kazmi-362a23255/",
  github: "https://github.com/1faadi",
  twitter: "https://x.com/rollno125",
  instagram: "https://www.instagram.com/yrrrrfahad_/",
};

// Root-relative so the same nav works on /insights/ and the case-study pages.
export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/case-studies/growth-office/", label: "Case studies" },
  { href: "/insights/", label: "Insights" },
  { href: "/#contact", label: "Contact" },
];

/** Shown first, in this order, before "Show all". Featured ones render large. */
export const TOP_PROJECTS = [
  "Traceo",
  "Growth Office",
  "AI Route Planning & VRP Optimizer",
  "AI Video Analyzer",
  "Pieces & Bricks Mosaic Studio",
  "NUML ERP System",
];
