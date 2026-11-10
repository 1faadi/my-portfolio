# I run eleven AI agents on one small server. Here is what they taught me.

*Draft for a LinkedIn article. Every fact below was checked against the code and the server on 5 Nov 2026.*

---

Two months ago I rented one of Oracle's free ARM servers and started putting AI agents on it.

Today it runs eleven of them. One scans Upwork every few minutes. One writes and posts short animated reels. One watches a crypto market. Seven of them sit together as a growth team for Traceo, the Chrome extension I co-founded, and each has a desk in a little pixel-art office I can open in my browser.

Ten of these I built. One I forked from an open-source project and extended.

This is not a launch post. Some of these agents are running, one is switched off on purpose, and one is waiting on a feature I have not finished. I want to walk through what each one actually does, what broke, and the handful of lessons that kept repeating across all of them, because the lessons turned out to be more useful than any single agent.

## The growth team: seven agents with desks

Traceo has no marketing team. Someone still has to check traffic in the morning, find SEO problems before Google does, decide what to write about and draft it. So I built a team to do that and called it Growth Office.

It is a Next.js app with a Pixi.js office floor. When I type a request, characters walk to their desks, their status changes to working, and the tab in the command center that changed starts flashing. The whole thing is about 29,000 lines of TypeScript, TSX and a little Python.

**Morgan** is the lead. You talk to Morgan and nobody else. Morgan reads the message, decides which colleagues need to act, runs them in the right order and writes the reply. Analysis jobs like the standup and the crawl run in parallel. Writing runs after them, and publishing runs last, so each step sees what the one before it produced.

**Quinn** does analytics. Every standup pulls Google Analytics for yesterday, today, 7 days, 30 days and realtime, plus Search Console queries. Quinn compares periods and lists wins, misses and goals for the day.

**Riley** handles SEO. Riley sends a crawl request to a small Python service built on Scrapling, compares this week's issues with last week's, and checks that robots.txt, the sitemap, llms.txt and the structured data on the homepage are really there.

**Casey** writes. Ask for a blog post and Casey first checks that the topic matches something in our brand kit or a query people actually searched. If it passes, Casey researches the web, drafts the post in Traceo's voice, checks the internal links against a list of real pages, and saves a draft.

**Parker** publishes. In code, Parker can push a finished draft to the Traceo blog. In practice Parker has never published anything, and I will explain why further down, because it is the most honest part of this story.

**U-Radar** is a separate service that checks Upwork on a schedule through Upwork's official MCP server, using the Claude Agent SDK. It stores every job in Postgres, removes duplicates and scores each one out of 100. The best matches go to Slack and to U-Radar's own desk on the office floor.

**Alex** picks up where U-Radar stops. Alex reads U-Radar's jobs, explains what each client actually wants, and drafts a proposal for the ones worth applying to. Proposals have to land between 120 and 190 words, skip a list of phrases that make proposals sound templated, and get one automatic shortening pass if they run long. There is also a "Write proposal" button inside Slack. Slack gives a button three seconds to respond, so the app acknowledges the click straight away and writes the proposal after.

## The other four

Once the office existed, it became the natural home for everything else I had running. These agents live outside Growth Office, but most of them got a read-only desk on the floor so I can see them in one place.

**The reels agent** makes a series called Fahad and Claude. A cartoon version of me and a cartoon Claude argue about one AI topic per episode, in 30 to 60 second vertical videos built with Remotion. Every four hours, a cron job checks whether the Instagram or TikTok queue needs another reel. If it does, the agent takes the next written episode or asks Claude Code to write a new one that does not repeat an old topic. Then it generates the voices, rejects anything outside the 30 to 60 second window, renders still frames, has Claude review those frames before the full render, normalizes the audio and schedules the post. It has about three dozen episodes in its ledger so far.

The best bug in the whole project lives here. Cloudflare blocked some of the agent's web requests for no obvious reason until I noticed it was rejecting Python's default user agent. One header fixed it.

**The trader** is a Claude-driven crypto trading agent, and I want to be careful describing it. It scans ten perpetual markets every four hours and turns its decisions into tickets. A ticket does nothing until I approve it by hand. It has a backtester that compares a dummy model, Claude, Claude with news, and Claude with a decision model against simply holding the market, plus stress tests that double costs and delay fills. It started on Alpaca, until I learned Alpaca funding is not available from Pakistan, so it moved to Hyperliquid. Live trading is refused in code. I switched it off on 26 October. It is a research project, not a money printer, and every serious trading write-up I read said the same thing about mine.

**Leadbot** is the only one not on this server. It runs as a Claude Managed Agent every morning at 9 and looks for inbound leads in Hacker News hiring threads, keeping what it learns in Anthropic's memory store. Its desk in the office only reads its latest status.

**Harvey** is the one I did not build. Harvey is an open-source autonomous sales agent. It finds businesses, learns something specific about each one, writes cold email that references it, reads the replies and works toward a meeting. I run my own fork on the server and added one thing: a free discovery source that pulls companies from the Hacker News "Who is hiring" threads. If you have read this far, you have earned the honest version: the clever parts of Harvey are its authors'. My part is a provider and the deployment.

## Lesson 1: the model is rarely the first thing that runs

My first version of Morgan sent every message to a model and asked it what to do. It was slow, it cost money on every message, and now and then it did something creative when I wanted something boring.

Now Morgan matches the message against plain patterns first. "Run the standup", "crawl the site", "what should we do next", "write a blog about this". Most real requests come in a handful of shapes, and a regular expression recognizes them instantly. Morgan only asks a model when nothing matches and the message still looks like a command. Even then, the model's answer has to pass a schema check before anything runs.

I learned the value of this the hard way. Early on, asking "how was traffic this week?" sometimes produced a blog draft about traffic, because "write about traffic" and "tell me about traffic" are close enough for a model to blur. Now there is a rule in both the pattern path and the model path: an analytics question can never trigger a draft.

The same idea shows up everywhere. U-Radar uses a model to fetch jobs, but the score out of 100 is plain arithmetic on client quality, relevance and budget. Alex's fit score is plain code too. Riley's week-over-week comparison has no model in it at all. When I counted honestly, more than half of the decisions in my "AI agents" are made by ordinary code. I used to see that as a weakness. Now I think it is the reason they work.

## Lesson 2: never let a model produce a number

The fastest way to lose trust in an analytics agent is for it to invent a figure once.

Quinn's numbers come straight from the Google Analytics and Search Console APIs. Wins, misses and goals are decided by rules applied to those numbers. The model is allowed to do exactly one thing: write the paragraph that explains them, using only the numbers it was given.

If the reply looks wrong, for example it comes back as raw JSON or starts making up links, the app throws it away and uses a plain template instead. The template still quotes the real numbers. Nobody has ever seen an invented traffic figure in a standup, and that matters more to me than how well the paragraph reads.

## Lesson 3: build the version that works without AI first

Every place Growth Office calls a model has a path that works when the model is not available.

If no model is configured, the standup still runs and reads like a template. If the crawler service is down, Riley runs a simpler built-in audit of the same site and says in the report that it fell back. If the writing model fails, Casey still produces a structured draft from a template, so the rest of the pipeline completes.

The result is a team that degrades instead of breaking. On a bad day I get a plainer report, not an error page. It also forced a useful habit. Writing the no-AI path first makes you decide what the agent is actually responsible for before you hand anything to a model.

## Lesson 4: isolate the model from your own machine

Growth Office can run on my Claude subscription instead of a paid API key. It calls the Claude Agent SDK as a subprocess with my subscription token, and it removes any API key from that subprocess so the paid API can never quietly take over the bill.

One evening the whole web server died on port 3000. The cause was an MCP server configured for my own Claude Code setup on the same machine, which the agent's subprocess had loaded too. Now every model call from the office runs with no user settings and a strict, empty MCP configuration. The agent sees only what I hand it.

If you run agents on a machine where you also use Claude Code yourself, check what configuration they inherit. Mine inherited more than I expected.

## Lesson 5: watching the work matters more than I thought

I nearly skipped the pixel-art office as a gimmick. It turned out to be the feature I use most.

When work happens in the background, you stop trusting it. When you can see Riley walk to a desk, switch to working, then finish while the crawl tab flashes, you understand what happened without opening a log. The same goes for the read-only desks. The trader and Leadbot each have a panel on the floor. Most mornings I open one page and know whether everything ran overnight.

## The part I have not finished

Here is the honest bit I promised.

Parker can publish to the Traceo blog, but only when one setting is switched to live. It is set to draft on my laptop and on the server, and Parker has never published anything. I am glad it is set that way, because I found a gap when I went back through the code. There is an approval flag, but it defaults to yes, and there is no approval screen. If I flipped the setting today, typing "publish" in chat would be enough. That is not a safe enough gate for content that goes out under the product's name.

So the next thing I am building is a real approval screen for Parker. Until it exists, drafts stay drafts.

There is more on the list. Work in Growth Office runs inside the web request, with no job queue, which is fine for one person and not for ten. The office stores most of its state in JSON files, and only U-Radar uses Postgres. There are about a dozen check scripts and a type check, but nothing runs them automatically. Nothing on the server is backed up yet, and the server is 183 system updates behind.

I am listing these because almost every agent demo I see skips this part, and this part is where most of the real engineering is.

## What I would tell anyone starting

1. **Start from the jobs, not the models.** Write down what each agent owns, what goes in and what comes out. Then decide whether it needs a model at all.
2. **Route with code first.** Patterns are fast, free and testable. Let the model handle only what they cannot.
3. **Never let a model produce a number.** Fetch it or compute it, then let the model describe it.
4. **Build the no-AI path first.** If the system works without a model, adding one makes it better instead of more fragile.
5. **Control what your agents inherit.** Settings, tools and keys leak in from the machine they run on.
6. **Make the work visible.** People trust what they can watch, and that includes you.
7. **Put a real human check in front of anything public, and do not call it done until the check exists.**

Eleven agents sounds like a lot. In practice it is mostly ordinary software with a model in a few carefully chosen places, a scheduler, some logs and a server that costs nothing. That is the part I would have told my two-months-ago self: the agent is the easy bit. Everything around it is the work.

The approval screen for Parker is next. When it ships, Growth Office gets to publish its first post, and I will write about how that goes.

*If you run agents for a small team, I would like to hear what you let them do without asking you first.*
