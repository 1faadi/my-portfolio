In my last article I wrote that every AI step should have a fallback that works without AI. I still believe that. This article is about the project where I learned the exception, the hard way.

For four months I worked on the planning engine for a field-service business. Every day, someone has to decide which worker goes to which customer, in what order, at what time. Workers have different skills. Some customers can only be visited in a two-hour window. Some visits are already confirmed and cannot move. Every worker has a shift, a home area and a limit to how much they can do in a day. When the list runs into the hundreds, a human planner spends a large part of every morning on it, and the result depends on who is planning that day.

The job of the system was simple to say and hard to build: look at the day, propose a plan, explain each change in plain words, and let the planner approve it.

I want to walk through two decisions that went against the advice I would have given at the start. I replaced a world-class optimization library with about 900 lines of deliberately simple code. And I removed every safety net the system had, on purpose.

## How it works today

When a planner presses refresh, or every morning at 7, or about 15 seconds after a visit is cancelled or rescheduled, a job goes onto a queue. If a newer request arrives for the same day, the older job is cancelled. A planner's refresh always wins over a background trigger.

The job first asks a self-hosted copy of OSRM, an open-source routing engine, how long it takes to drive between every pair of places that matter that day. Then it hands those drive times, the workers and the visits to a small Python service that builds the routes. The backend turns those routes into suggestion cards: assign this visit, move that one, reorder this route, take this visit off an overloaded day. Each card carries the exact clock time it proposes.

Only then does a language model get involved, and only to rewrite the short reason on each card into plain English. It cannot change a route, a time or a worker. If it fails, the template reason stays.

The planner sees the cards as translucent "ghost" bars on their calendar, approves the ones they like, and the system applies them in a single database transaction.

That is the shape now. It did not start that way.

## Version one: the right tool, by the book

If you search for "vehicle routing problem", every serious answer points to Google OR-Tools. It is excellent. It is free. It solves problems far larger than ours. So that is where I started, in June.

Each worker became a vehicle. Each visit became a stop. I added a time dimension so travel, service time and a five-minute buffer between stops all counted against the day. I made routes open-ended, because workers do not drive back to a depot at the end of the day. I gave every visit a penalty for being dropped, scaled by priority, so the solver would rather leave out a low-priority visit than an urgent one. Then I let OR-Tools search: a quick first solution, followed by guided local search for between 5 and 40 seconds depending on the size of the day.

The plans were good. Measured by total driving time, they were often very good.

The planners did not trust them.

## The problem with optimal

A global optimizer is allowed to make choices that look strange in isolation if they make the whole day cheaper. For example, it might send one worker past a customer two minutes away because another worker will pick that customer up later and it saves eight minutes overall. On paper that is better. On a planner's screen, it looks like a mistake.

Planners do not check plans against the global optimum. They check them against common sense: is this worker going to the nearest sensible next stop? When the answer was no, they would fix it by hand, and the next refresh would undo their fix.

So I started bending the optimizer toward common sense. Over two months I added a cost for distance from each worker's starting point. I scaled the drop penalties by how close a visit was to someone who could take it. I added a soft cap so one worker would not get far more than their fair share. Some of these settings fought each other. One of them needed care so the numbers would not overflow a 64-bit integer. One OR-Tools option I relied on turned out to do nothing in the version we used. And at the end, I was re-sorting each route after the solve so the order looked nearest-first anyway.

That last step was the moment I should have noticed earlier. If I am re-sorting the optimizer's output into the order a human expects, I am not really using the optimizer for the thing the users care about.

## Version two: a greedy builder you can explain

On 12 August I replaced the search with a deterministic route builder. It is not clever, and that is the point.

It works in two passes. First it repeatedly looks at every worker's current position and every remaining visit, and picks the closest pair that still keeps every rule satisfied. Then it looks for gaps in existing routes where a remaining visit fits without breaking anything. Full-time workers are filled before contractors. Visits in an area that has an owner only go to that owner. Confirmed visits stay exactly where they are.

The hard rules are checked every time: skills, capacity, shift start and end, customer time windows. The trickiest one is locked work. Before the builder commits to anything, it checks ahead, with an exact search, that every locked visit can still fit in the day. If they cannot, the run stops and says so instead of producing a plan that would quietly break a promise to a customer.

Two things changed for the planners. The plan is the same every time for the same input, so a refresh no longer reshuffles a day for no visible reason. And every choice has a one-sentence explanation a human already agrees with: this was the closest stop that still fit.

It was not perfect on day one. A few weeks later I found a case where the way service areas were ranked sent a worker on an 80-minute drive past a stop four minutes away. The difference was that I could read the code, find the exact line, write a test for it and fix it in an afternoon. With the optimizer, the same complaint usually ended in another weight to tune.

I want to be careful about the claim here. A greedy builder is not better than OR-Tools at minimizing driving. Some days it will produce more total driving. What it does better is the thing this team needed: plans people can predict, read and approve without second-guessing.

## Then I deleted the fallbacks

In the early versions, the system was very hard to break. If the solver failed, a simple heuristic in the backend built a plan instead. If the self-hosted routing engine failed, it asked Google's paid API. If that failed too, it estimated drive times with straight-line distance at an assumed average speed.

It always produced a plan. That turned out to be the problem.

The fallback plans looked exactly like real plans. Same cards, same calendar, same buttons. But a straight-line estimate does not know about rivers, motorways or one-way streets. A simple heuristic that adds one visit at a time to the cheapest route does not respect everything the real builder does. Nobody was told when a fallback had kicked in, so planners approved worse plans without knowing they were worse. Some days, the system was confidently wrong, which is the worst thing a planning tool can be.

Over three weeks in August I removed them. The heuristic went. The Google fallback went. The straight-line fallback went. Now there is one path. If the routing engine or the solver is down, the run fails, the planner sees a clear message, and nobody approves a bad plan.

To stop one struggling service from turning every refresh into a slow failure, there is a circuit breaker in front of the routing engine, the solver and the language model. After three failures in ten minutes, calls to that service pause for five minutes, with a single probe every 90 seconds to see if it is back.

Some failures can be handled honestly instead of hidden. If an address sits too far from any road the routing engine knows, that visit or worker is taken out of the run with a card that says why, and the rest of the day is planned normally.

## Fallbacks for words, not for decisions

So how does this fit with my last article, where every AI step had a no-AI fallback?

The difference is what the fallback produces.

In this planner, the language model only writes explanations. If it fails, a template explanation is shown instead. The template is plainer, but it is still true, so that fallback is safe and it stayed.

The routes are different. A fallback route is not a plainer version of the right answer. It is a different answer that looks the same. When the output is a decision someone will act on, a quiet fallback does more harm than an honest failure.

My rule now:

- If the fallback produces something less polished but still correct, keep it.
- If the fallback produces something that might be wrong but looks right, delete it and fail loudly.

## Smaller lessons that cost me real time

**Cache the road network one leg at a time.** Every drive time between two points is cached separately for 30 days. Coordinates are rounded to about 11 meters so repeat visits to the same building share a cache entry, and legs nobody can use, like depot to depot, are never requested. Most refreshes now read almost entirely from cache.

**Never let a visit disappear from the results.** One day a planner had 39 unplanned visits and got 32 suggestions. The other seven had been filtered out at different stages for different reasons, and none of them said so. Now a final step checks that every visit in the pool ends up with some card, even if the card only says why it could not be placed: no qualified worker, outside its time window, or the day is full.

**Approvals need real database work.** Approving cards means changing schedules that other people may be editing at the same moment. The apply step claims the cards, takes a lock per worker and day, checks that no visit changed since the suggestion was made, applies everything, and checks that nobody is double-booked before it commits. The batch size went from 5 to 200 to 25 to 10 and back to 200 over three months, because each number solved one problem and caused another. It is 200 now because a route plan approved in pieces can leave a day half-changed.

**A free-tier server falls asleep.** The solver runs on a hosting plan that sleeps when idle. The first refresh of the day used to wait for it to wake up. Now the app wakes the solver when someone opens the login page, so it is usually awake by the time anyone presses refresh.

## What I have not proven

I do not have an end-to-end benchmark for large days yet. There are hundreds of automated tests across the backend, the solver and the frontend, including tests that the solver stops on time under a deadline, but I have not published speed numbers because I have not measured them properly. An earlier plan for this system claimed a solve time I could never find evidence for, and I would rather say nothing than repeat it.

There is also more to build. The bulk approve button does not ask for a reason, and a worker calling in sick does not trigger a re-plan on its own yet.

## What I would tell my past self

1. **Start with what your users check against, not what the textbook optimizes.** My users checked against "nearest sensible stop", not "minimum total driving".
2. **If you are post-processing a powerful tool's output into what a human expects, try building the simple thing directly.**
3. **Deterministic beats clever when people have to approve the result.** Same input, same plan, every time.
4. **Keep fallbacks for words. Remove them for decisions.** A quiet wrong answer costs more than a visible failure.
5. **Every input deserves an output.** If something cannot be done, say which thing and why.
6. **Let the language model explain, never decide.** It made the cards readable. It never touched a route.

OR-Tools is still one of the best pieces of software I have used. I would reach for it again for a problem where total cost is what everyone cares about. This just was not that problem. The planners did not need the best route. They needed a route they could believe.

*If you have built a planning or scheduling tool, I would like to know: did your users trust the optimal answer, or the obvious one?*
