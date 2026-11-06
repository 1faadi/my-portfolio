import { HiArrowLeft } from "react-icons/hi2";
import { ARTICLES } from "../constants/articles";
import { formatDate } from "./Insights";

/** Inline **bold** and *italic* only; the articles use nothing else. */
const inline = (text) =>
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i} className="font-semibold text-neutral-200">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });

/** Tiny block parser: "## " headings, "1. " / "- " lists, blank-line paragraphs. */
const blocks = (md) =>
  md.split(/\n\s*\n/).map((chunk, i) => {
    const text = chunk.trim();
    if (text.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-12 text-2xl font-light tracking-tight text-neutral-100 sm:text-3xl">
          {text.slice(3)}
        </h2>
      );
    }
    if (/^\d+\. /.test(text)) {
      return (
        <ol key={i} className="list-decimal space-y-3 pl-6">
          {text.split("\n").map((line) => (
            <li key={line}>{inline(line.replace(/^\d+\. /, ""))}</li>
          ))}
        </ol>
      );
    }
    if (text.startsWith("- ")) {
      return (
        <ul key={i} className="list-disc space-y-3 pl-6">
          {text.split("\n").map((line) => (
            <li key={line}>{inline(line.replace(/^- /, ""))}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{inline(text)}</p>;
  });

const Article = ({ slug }) => {
  const article = ARTICLES.find((a) => a.slug === slug);

  return (
    <article className="mx-auto max-w-2xl pb-20">
      <a
        href="/insights/"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
      >
        <HiArrowLeft aria-hidden /> All insights
      </a>

      <header className="mt-8">
        <time dateTime={article.date} className="text-sm text-neutral-500">
          {formatDate(article.date)}
        </time>
        <h1 className="mt-3 text-4xl font-light leading-tight tracking-tight text-neutral-100 sm:text-5xl">
          {article.title}
        </h1>
      </header>

      <img
        src={article.image}
        alt={article.imageAlt}
        width="1600"
        height="900"
        className="mt-10 w-full rounded-2xl border border-white/5"
      />

      <div className="mt-10 space-y-5 text-[1.05rem] leading-relaxed text-neutral-400">
        {blocks(article.body)}
      </div>
    </article>
  );
};

export default Article;
