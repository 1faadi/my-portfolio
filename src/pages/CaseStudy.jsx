import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { PROJECTS } from "../constants";
import { CASE_STUDIES } from "../constants/caseStudies";

const Section = ({ title, children }) => (
  <section className="border-t border-white/5 py-10 sm:py-12">
    <h2 className="mb-5 text-2xl font-light tracking-tight text-neutral-100 sm:text-3xl">
      {title}
    </h2>
    {children}
  </section>
);

const CaseStudy = ({ slug }) => {
  const study = CASE_STUDIES[slug];
  const path = `/case-studies/${slug}/`;
  const project = PROJECTS.find((p) => p.caseStudy === path);
  const related = CASE_STUDIES[study.related];

  return (
    <article className="mx-auto max-w-3xl pb-20">
      <a
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
      >
        <HiArrowLeft aria-hidden /> All projects
      </a>

      <header className="mt-8">
        <p className="text-sm font-medium text-purple-300">Case study</p>
        <h1 className="mt-3 text-4xl font-light tracking-tight text-neutral-100 sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          {study.summary}
        </p>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-neutral-500">Role</dt>
            <dd className="mt-1 text-neutral-200">{study.role}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">Timeline</dt>
            <dd className="mt-1 text-neutral-200">{study.timeline}</dd>
          </div>
        </dl>
      </header>

      {project?.image ? (
        <img
          src={project.image}
          alt={`${study.title} screenshot`}
          width="800"
          height="500"
          className="glass mt-10 w-full rounded-2xl object-cover"
        />
      ) : null}

      <Section title="The problem">
        <div className="space-y-4 leading-relaxed text-neutral-400">
          {study.problem.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </Section>

      <Section title="What I built">
        <p className="leading-relaxed text-neutral-400">{study.built}</p>
        {study.agents ? (
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {study.agents.map(([name, job]) => (
              <div key={name} className="glass rounded-xl p-4">
                <dt className="font-medium text-neutral-100">{name}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutral-400">
                  {job}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Section>

      <Section title="How it flows">
        {/* A real sequence, so numbered steps are honest here. */}
        <ol className="grid gap-3 sm:grid-cols-3">
          {study.flow.map((step, i) => (
            <li key={step} className="glass rounded-xl p-4">
              <span className="text-xs text-purple-300">Step {i + 1}</span>
              <p className="mt-1 text-sm text-neutral-200">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Key decisions">
        <div className="space-y-6">
          {study.decisions.map(([title, body]) => (
            <div key={title}>
              <h3 className="font-medium text-neutral-100">{title}</h3>
              <p className="mt-2 leading-relaxed text-neutral-400">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What comes next">
        <ul className="list-disc space-y-2 pl-5 text-neutral-400">
          {study.next.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Stack">
        <ul className="flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      {related ? (
        <a
          href={`/case-studies/${study.related}/`}
          className="glass mt-6 flex items-center justify-between gap-4 rounded-2xl p-6 transition hover:border-white/20"
        >
          <span>
            <span className="block text-xs text-neutral-500">Next case study</span>
            <span className="mt-1 block text-lg text-neutral-100">
              {related.title}
            </span>
          </span>
          <HiArrowRight className="shrink-0 text-xl text-neutral-400" aria-hidden />
        </a>
      ) : null}
    </article>
  );
};

export default CaseStudy;
