import { FaLinkedin } from "react-icons/fa";
import { SOCIAL_PROFILES } from "../constants";
import { INSIGHTS } from "../constants/insights";

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

/** Blank lines split paragraphs; single newlines inside a paragraph stay as line breaks. */
const Body = ({ text }) =>
  text.split(/\n\s*\n/).map((para) => (
    <p key={para.slice(0, 40)} className="whitespace-pre-line">
      {para}
    </p>
  ));

const Insights = () => (
  <div className="mx-auto max-w-2xl pb-20">
    <header>
      <h1 className="text-4xl font-light tracking-tight text-neutral-100 sm:text-5xl">
        Insights
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-neutral-300">
        Short notes on AI agents, LLM systems and the engineering around them.
        First posted on LinkedIn.
      </p>
      <a
        href={SOCIAL_PROFILES.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-neutral-200 transition hover:border-white/35 hover:bg-white/5"
      >
        <FaLinkedin aria-hidden /> Follow on LinkedIn
      </a>
    </header>

    <nav aria-label="All posts" className="mt-12 border-t border-white/5 pt-8">
      <h2 className="mb-4 text-sm font-medium text-neutral-400">
        {INSIGHTS.length} posts
      </h2>
      <ul className="space-y-2 text-sm">
        {INSIGHTS.map((post) => (
          <li key={post.slug} className="flex gap-4">
            <span className="w-24 shrink-0 text-neutral-500">
              {formatDate(post.date)}
            </span>
            <a
              href={`#${post.slug}`}
              className="text-neutral-300 transition-colors hover:text-white"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    {INSIGHTS.map((post) => (
      <article
        key={post.slug}
        id={post.slug}
        className="scroll-mt-28 border-t border-white/5 py-12"
      >
        <time dateTime={post.date} className="text-sm text-neutral-500">
          {formatDate(post.date)}
        </time>
        <h2 className="mt-2 text-2xl font-light leading-snug tracking-tight text-neutral-100 sm:text-3xl">
          {post.title}
        </h2>
        {post.image ? (
          <img
            src={post.image}
            alt=""
            width="1200"
            height="675"
            loading="lazy"
            decoding="async"
            className="mt-6 w-full rounded-xl border border-white/5"
          />
        ) : null}
        <div className="mt-6 space-y-4 leading-relaxed text-neutral-400">
          <Body text={post.body} />
        </div>
        {post.tags.length ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-xs text-neutral-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    ))}
  </div>
);

export default Insights;
