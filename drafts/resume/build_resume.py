"""Build ATS-friendly resume + CV (DOCX) for Syed Fahad Abbas Kazmi.

ATS rules followed: single column, no tables/text boxes/images, contact info in body
(not header/footer), standard section names, real Word bullets, Calibri, consistent dates.
Usage: python build_resume.py <out_dir>
"""
import sys
from pathlib import Path
from docx import Document
from docx.enum.text import WD_TAB_ALIGNMENT, WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, Inches, RGBColor

NAME = "SYED FAHAD ABBAS KAZMI"
TITLE = "AI Engineer | Full-Stack Software Developer"
CONTACT = "Islamabad, Pakistan  |  +92 304 1646924  |  fahadkazmi.dev@gmail.com"
LINKS = "sfak.space  |  linkedin.com/in/syed-fahad-abbas-kazmi-362a23255  |  github.com/1faadi"

SUMMARY = (
    "AI Engineer and full-stack software developer with 3+ years of professional experience and 1.5+ years "
    "shipping LLM systems to production: Retrieval-Augmented Generation (RAG) pipelines, multi-agent workflows, "
    "voice AI agents and computer-vision pipelines. Builds end to end in TypeScript (Next.js, Nest.js, React) and "
    "Python (FastAPI), on PostgreSQL. Co-Founder & CTO of Traceo, a Chrome extension for bug capture. Designs AI "
    "features with deterministic fallbacks so products keep working when a model fails."
)

SKILLS = [
    ("AI / ML", "Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), LangChain, LangGraph, LlamaIndex, "
                "Vercel AI SDK, Claude Agent SDK, Embeddings, Vector Databases (pgvector), Prompt Engineering, "
                "Agentic Systems, Model Context Protocol (MCP), Computer Vision (Roboflow, Segment Anything Model)"),
    ("AI Tooling", "MCP Servers, Claude Code (Skills, Hooks, Sub-agents), n8n Workflow Automation, Vapi Voice AI, "
                   "Agent Orchestration, Cursor"),
    ("Languages", "TypeScript, JavaScript, Python, PHP, SQL, HTML5, CSS3"),
    ("Frameworks", "Next.js, React, Nest.js, Node.js, FastAPI, Laravel, Livewire, Tailwind CSS, Bootstrap, jQuery"),
    ("Databases & Infra", "PostgreSQL, MySQL, Supabase, Neon, Redis, BullMQ, Docker, OSRM, Vercel, Oracle Cloud"),
    ("Practices", "REST API Design, Third-Party API Integration, Schema Design, Query Optimization, Git, Agile, "
                  "Responsive Design"),
]

EXPERIENCE = [
    ("Co-Founder & CTO", "Traceo", None, "Feb 2026 – Present", [
        "Co-founded Traceo and lead engineering for its Chrome extension that lets developers, designers and QA teams inspect CSS, capture visual bugs and record sessions, then share them as actionable reports.",
        "Own extension architecture, front-end engineering in TypeScript and React, and the AI features that explain what broke and why.",
        "Built Growth Office, a seven-agent AI growth team on the Claude Agent SDK (see Projects).",
        "Lead product design, the website and launch, and growth measurement.",
    ]),
    ("AI Engineer", "BXTrack Solutions", "Islamabad, Pakistan", "Jun 2025 – Present", [
        "Design and build AI-powered features for production applications, including LLM-driven functionality, RAG pipelines and intelligent automation.",
        "Built an AI route-planning module for a field-service client that assigns visits by skills, capacity, shifts and time windows; managers approve up to 200 suggestions at once.",
        "Architect vector database and embedding pipelines that give AI features retrieval-augmented, context-aware answers.",
        "Develop agentic workflows with MCP servers and custom Claude Code Skills, Hooks and Sub-agents to automate engineering and product tasks.",
        "Build voice-calling AI agents with Vapi, integrating telephony, LLMs and conversational flows for automated call handling.",
        "Ship computer-vision pipelines using Roboflow-trained models and the Segment Anything Model (SAM) for object detection and image segmentation.",
        "Build end-to-end business automations in n8n connecting APIs, databases and AI models.",
        "Collaborate with cross-functional teams to turn AI capabilities into user-facing features, from prototype to production.",
        "Evaluate and adopt emerging AI tooling (LangChain, LangGraph, LlamaIndex, Vercel AI SDK) to improve delivery speed and reliability.",
    ]),
    ("Associate Software Engineer (Contract, Remote)", "BXTrack Solutions", None, "Mar 2025 – Jun 2025", [
        "Developed and maintained features for AutoBunny.com (autobunny.com), a Canadian online marketplace for new and used vehicles with listings, search filters and dealer inventory, built with Laravel, PHP, Livewire and Tailwind CSS.",
        "Worked on AutoBunny Dealer Solutions (autobunnydealersolutions.ca), an all-in-one dealership platform covering inventory management, CRM and lead management, dealer websites and inventory syndication.",
        "Built and maintained Laravel back-end features and REST APIs across both platforms, testing endpoints with Postman.",
        "Fixed production bugs and shipped features remotely, coordinating with the team on requirements and releases.",
    ]),
    ("Freelance Software Developer", "Self-employed", None, "Jan 2024 – Feb 2025", [
        "Built and delivered point-of-sale (POS) systems for local vendors using Laravel, PHP and MySQL.",
        "Delivered desktop/offline POS setups so shops could keep billing on their own machines.",
        "Worked directly with vendors on requirements, installation, fixes and changes.",
        "Studied full-time for a BS in Computer Science at NUML alongside freelance work, and self-taught mobile, web and AI development.",
    ]),
    ("Associate Software Engineer", "BXTrack Solutions", "Islamabad, Pakistan", "Jun 2023 – Jan 2024", [
        "Designed, built and maintained full-stack web applications with Laravel and React, from database to UI.",
        "Developed component-based React front ends and integrated them with Laravel back ends.",
        "Built and consumed RESTful APIs and integrated third-party services to extend application functionality.",
        "Optimized performance by refining database queries and reducing page load times across client projects.",
        "Managed timelines, scope and deliverables, coordinating with stakeholders to ship features on schedule.",
        "Introduced modern development patterns with the team to improve code quality across projects.",
    ]),
    ("Laravel Developer (Remote)", "Brainiac Creative Solutions", "Sargodha, Pakistan", "Jan 2023 – May 2023", [
        "Architected, developed and maintained scalable web applications using the Laravel framework.",
        "Collaborated with distributed teams over video calls, chat and email to align on requirements and resolve issues.",
    ]),
    ("Web Designer (Internship)", "Brainiac Creative Solutions", "Sargodha, Pakistan", "Oct 2022 – Jan 2023", [
        "Translated visual concepts into responsive, accessible web interfaces with HTML, CSS, Bootstrap and JavaScript.",
        "Applied CSS media queries for consistent experiences across devices and screen sizes.",
    ]),
]

# (name, role, dates, tech, bullets, link). First 4 go on the resume; all go on the CV.
PROJECTS = [
    ("Growth Office: Multi-Agent Growth Team", "Architect & Lead Engineer, Traceo", "Sep 2026 – Oct 2026",
     "Claude Agent SDK, Next.js, TypeScript, FastAPI, PostgreSQL, PixiJS", [
        "Architected a system of seven AI agents that run GA4 and Search Console standups, technical SEO audits, brand-kit planning, blog drafting and Upwork job scoring for Traceo.",
        "Gave every LLM step a rule-based fallback and sourced all metrics from real APIs only; publishing stays locked to draft mode behind config.",
        "Integrated the official Upwork MCP server and a Python (Scrapling/FastAPI) crawler; deployed on Oracle Cloud.",
    ], "sfak.space/case-studies/growth-office"),
    ("AI Route Planning & VRP Optimizer", "AI / Backend Engineer, BXTrack Solutions", "May 2026 – Sep 2026",
     "Python, FastAPI, NestJS, OSRM, Redis, BullMQ, PostgreSQL", [
        "Built the planning engine for a field-service CRM that assigns visits to workers by skills, capacity, shifts, time windows and locked visits.",
        "Replaced a Google OR-Tools solver with a ~900-line deterministic route builder whose plans planners could predict and trust.",
        "Cached self-hosted OSRM drive times per road leg and ran planning jobs on a BullMQ queue with a circuit breaker; an LLM only rewrites the reason on each suggestion.",
    ], "sfak.space/case-studies/ai-route-planning"),
    ("AI Video Analyzer", "AI Engineer", "2025", "TypeScript, Next.js, Python, Computer Vision", [
        "Built a warehouse-safety platform that detects incorrect parking and waste blocking emergency and fire-brigade access in uploaded footage.",
        "Delivered two front-end iterations and a Python inference back end covering ingestion, model inference, API design and a results/playback UI.",
    ], "ai-video-analyzer-v2.vercel.app"),
    ("Pieces & Bricks Mosaic Studio", "Solo Developer", "Oct 2026", "TypeScript, React, Vite, MediaPipe, Canvas", [
        "Built a browser-only proof of concept that turns a photo into a buildable brick mosaic, with in-browser face detection for auto-framing.",
        "Ported PIL's Lanczos resampling to TypeScript byte-for-byte so output matched a commercial pipeline brick for brick.",
    ], None),
    ("Maqsam Voice Agent", "AI Engineer", "2025", "TypeScript, Voice AI, LLMs, Telephony", [
        "Built a voice assistant that connects LLMs with telephony so callers interact through an AI-driven conversation; owned the front end, connection state and voice/event handling.",
    ], "maqsam-voice-agent.vercel.app"),
    ("FloorPlanSegmentor", "AI Engineer", "2025", "TypeScript, Next.js, SAM, Roboflow", [
        "Built a drag-and-drop tool that extracts structural regions from architectural floor plans with a segmentation pipeline.",
    ], "floor-plan-segmentor.vercel.app"),
    ("Symptra Policy Assistant", "AI Engineer", "2025", "TypeScript, Next.js, RAG, LLMs", [
        "Built a retrieval-based assistant that answers employee questions about company policies from grounded documents.",
    ], "symptra.vercel.app"),
    ("NUML ERP System", "Final Year Project", "2025 – Present", "Next.js, TypeScript, PostgreSQL, REST APIs", [
        "Building a university ERP (student, academic and administrative modules) with the official NUML team; contributing full-stack development, schema design and module integration.",
    ], None),
    ("Core42Ops", "Solo Developer", "2025", "TypeScript, Next.js", [
        "Built a dashboard for monitoring AI call operations: call volume, completion rate, average duration, recent calls and agent settings.",
    ], "core42-ops.vercel.app"),
    ("Hairstyle-ai", "Solo Developer", None, "TypeScript, Next.js, Generative AI", [
        "Built an AI hairstyle try-on app with 150+ styles on the user's own photo, before/after comparison and a nail-art mode.",
    ], "hairstyle-ai-dun.vercel.app"),
    ("AI Job Scraper", "Solo Developer", None, "TypeScript, Web Scraping, LLMs", [
        "Built an authenticated job-discovery workflow that scrapes listings and uses an LLM to summarize, filter and rank roles.",
    ], "ai-job-scraper-seven.vercel.app"),
    ("BXAssist", "Solo Developer", None, "TypeScript, Slack API, LLMs", [
        "Built a Slack-integrated AI assistant with a policy-chat back end and prompt orchestration layer.",
    ], "github.com/1faadi/BXAssist"),
    ("Next.js AI Chatbot", "Solo Developer", None, "Next.js, Vercel AI SDK, TypeScript", [
        "Built an LLM chatbot reference architecture with streaming responses and chat persistence, reusable for domain-specific assistants.",
    ], "github.com/1faadi/nextjs-ai-chatbot"),
    ("Magic Storybook", "Solo Developer", None, "TypeScript, Next.js, Generative AI", [
        "Built a generative storybook app that turns a child's photo into the hero of a customized illustrated story.",
    ], "ai-gen-storybook.vercel.app"),
    ("BinteShauq", "Solo Developer", None, "TypeScript, Next.js", [
        "Built an e-commerce storefront for women's wear with catalogue, collections, cart and accounts; owned product, UI and deployment.",
    ], "binte-shauq.vercel.app"),
]

ADDITIONAL_PROJECTS = [
    "VercelBot: AI development assistant that automates Vercel deployments, status and project actions (TypeScript).",
    "Pharmafy: pharmacy management app covering inventory, records and orders (Next.js, PostgreSQL).",
    "BrandBrain: brand and marketing intelligence tool for marketers (Next.js).",
    "Cricket Predictor: sports analytics tool with model-driven predictions (TypeScript).",
    "Ambial: community content platform with authenticated member content (Next.js).",
    "n8n Render Deploy: configuration for self-hosting n8n workflow automation (Docker).",
    "Hospital Management System, E-Commerce Platform and Books Portal SPA (Laravel, PHP, MySQL, Vue.js).",
]

WRITING = [
    "\"I replaced Google OR-Tools with a greedy route builder. Then I deleted every fallback.\" (Nov 2026), sfak.space/insights",
    "\"I run eleven AI agents on one small server. Here is what they taught me.\" (Nov 2026), sfak.space/insights",
    "Regular LinkedIn posts on RAG evaluation, MCP server design, AI cost and agent tooling.",
]

EDUCATION = [
    ("Bachelor of Science in Computer Science", "National University of Modern Languages (NUML), Islamabad",
     "Feb 2023 – Expected Jan 2027"),
    ("Intermediate (HSSC)", "Government College University (GCU), Lahore", "2020 – 2022"),
    ("Matriculation (SSC)", "Sanai School System, Sargodha", "2020"),
]

# ---------------------------------------------------------------- rendering

ACCENT = RGBColor(0x1F, 0x3A, 0x5F)
FONT = "Calibri"


def new_doc(body_pt):
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Inches(8.27), Inches(11.69)  # A4 (standard in Pakistan/Gulf)
    sec.left_margin = sec.right_margin = Inches(0.6)
    sec.top_margin = sec.bottom_margin = Inches(0.5)
    for name in ("Normal", "List Bullet"):
        st = doc.styles[name]
        st.font.name = FONT
        st.font.size = Pt(body_pt)
        st.element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
        pf = st.paragraph_format
        pf.space_before, pf.space_after, pf.line_spacing = Pt(0), Pt(1), 1.05
    doc.core_properties.title = "Syed Fahad Abbas Kazmi - Resume"
    doc.core_properties.author = "Syed Fahad Abbas Kazmi"
    return doc


def para(doc, text="", bold=False, size=None, color=None, align=None, after=None, italic=False):
    p = doc.add_paragraph()
    if text:
        r = p.add_run(text)
        r.bold, r.italic = bold, italic
        if size:
            r.font.size = Pt(size)
        if color:
            r.font.color.rgb = color
    if align is not None:
        p.alignment = align
    if after is not None:
        p.paragraph_format.space_after = Pt(after)
    return p


def bottom_border(p):
    pPr = p._p.get_or_add_pPr()
    bdr = OxmlElement("w:pBdr")
    b = OxmlElement("w:bottom")
    for k, v in (("w:val", "single"), ("w:sz", "6"), ("w:space", "1"), ("w:color", "1F3A5F")):
        b.set(qn(k), v)
    bdr.append(b)
    pPr.append(bdr)


def heading(doc, text):
    p = para(doc, text.upper(), bold=True, size=11.5, color=ACCENT, after=3)
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.keep_with_next = True
    bottom_border(p)


def dated_line(doc, left_bold, left_rest, date, width_in):
    """'Title — Company ............ Date' with a right tab stop (no tables: ATS-safe)."""
    p = doc.add_paragraph()
    p.paragraph_format.tab_stops.add_tab_stop(Inches(width_in), WD_TAB_ALIGNMENT.RIGHT)
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.keep_with_next = True
    p.add_run(left_bold).bold = True
    if left_rest:
        p.add_run(left_rest)
    if date:
        p.add_run("\t" + date).bold = True
    return p


def bullet(doc, text):
    p = doc.add_paragraph(text, style="List Bullet")
    p.paragraph_format.left_indent = Inches(0.22)
    p.paragraph_format.first_line_indent = Inches(-0.16)
    return p


def build(kind, out_dir):
    full = kind == "cv"
    doc = new_doc(10 if not full else 10.5)
    width = 8.27 - 1.2

    para(doc, NAME, bold=True, size=20, color=ACCENT, align=WD_ALIGN_PARAGRAPH.CENTER, after=0)
    para(doc, TITLE, bold=True, size=11.5, align=WD_ALIGN_PARAGRAPH.CENTER, after=2)
    para(doc, CONTACT, size=9.5, align=WD_ALIGN_PARAGRAPH.CENTER, after=0)
    para(doc, LINKS, size=9.5, align=WD_ALIGN_PARAGRAPH.CENTER, after=2)

    heading(doc, "Professional Summary")
    para(doc, SUMMARY)

    heading(doc, "Technical Skills")
    for label, items in SKILLS:
        p = doc.add_paragraph()
        p.add_run(label + ": ").bold = True
        p.add_run(items)

    heading(doc, "Professional Experience")
    for role, company, loc, dates, bullets in EXPERIENCE:
        dated_line(doc, role, f" | {company}" + (f", {loc}" if loc else ""), dates, width)
        for b in bullets if full else bullets[:6]:
            bullet(doc, b)

    heading(doc, "Projects" if full else "Key Projects")
    for name, role, dates, tech, bullets, link in PROJECTS if full else PROJECTS[:4]:
        dated_line(doc, name, f" | {role}", dates, width)
        meta = doc.add_paragraph()
        r = meta.add_run(f"Tech: {tech}" + (f"  |  {link}" if link else ""))
        r.italic = True
        r.font.size = Pt(9.5)
        meta.paragraph_format.keep_with_next = True
        for b in bullets:
            bullet(doc, b)

    if full:
        heading(doc, "Additional Projects")
        for t in ADDITIONAL_PROJECTS:
            bullet(doc, t)
        heading(doc, "Publications & Writing")
        for t in WRITING:
            bullet(doc, t)

    heading(doc, "Education")
    for degree, school, dates in EDUCATION if full else EDUCATION[:2]:
        dated_line(doc, degree, "", dates, width)
        para(doc, school)

    if not full:
        para(doc, "Full project list, case studies and live demos: sfak.space  |  github.com/1faadi",
             size=9.5, italic=True).paragraph_format.space_before = Pt(6)

    fname = "Syed Fahad Abbas Kazmi - Resume.docx" if not full else "Syed Fahad Abbas Kazmi - CV.docx"
    path = Path(out_dir) / fname
    doc.save(path)
    return path


if __name__ == "__main__":
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    for k in ("resume", "cv"):
        print(build(k, out))
