import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { PROJECT_CATEGORIES, PROJECTS, SOCIAL_PROFILES } from "../constants";
import Tilt from "./Tilt";

/** Deterministic hue per project so covers stay stable across renders. */
const hueOf = (title) =>
  [...title].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 360, 7);

const initialsOf = (title) =>
  title
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const ProjectCard = ({ project, featured }) => {
  const hue = hueOf(project.title);

  return (
    <Tilt
      as="article"
      max={featured ? 7 : 9}
      scale={1.02}
      className="h-full"
    >
      <div
        className={`glass flex h-full flex-col overflow-hidden rounded-2xl ${
          featured ? "lg:flex-row" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            featured
              ? "h-44 sm:h-64 lg:h-auto lg:w-[55%] lg:shrink-0"
              : "h-40 sm:h-44"
          }`}
          style={{
            background: `linear-gradient(135deg, hsl(${hue} 70% 22%), hsl(${
              (hue + 55) % 360
            } 65% 12%))`,
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} — ${project.role} screenshot`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <span
              className="depth-2 absolute inset-0 flex select-none items-center justify-center text-5xl font-bold tracking-tight text-white/20"
              aria-hidden
            >
              {initialsOf(project.title)}
            </span>
          )}
          <div
            className={`pointer-events-none absolute inset-0 ${
              featured
                ? "bg-gradient-to-t from-neutral-950/60 to-transparent lg:bg-gradient-to-r"
                : "bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent"
            }`}
            aria-hidden
          />
          <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-neutral-200 backdrop-blur">
            {project.category}
          </span>
        </div>

        <div
          className={`flex flex-1 flex-col p-5 ${
            featured ? "lg:justify-center lg:p-8" : ""
          }`}
        >
          <div className="depth-1 flex flex-1 flex-col">
            <h3
              className={`font-semibold text-neutral-100 ${
                featured ? "text-xl sm:text-2xl" : "text-lg"
              }`}
            >
              {project.title}
            </h3>
            <p className="mb-3 mt-1 text-xs font-medium uppercase tracking-wider text-purple-300">
              {project.role}
              {project.year ? ` · ${project.year}` : ""}
            </p>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-400">
              {project.description}
            </p>

            <ul className="mb-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[0.7rem] text-neutral-300"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-neutral-900 transition hover:bg-white"
                >
                  Live demo <HiArrowUpRight />
                </a>
              ) : null}
              {project.code ? (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-neutral-200 transition hover:border-white/35 hover:bg-white/5"
                >
                  <FaGithub /> Code
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === filter),
    [filter]
  );

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-neutral-900 pb-20"
    >
      <h2 className="mb-4 mt-14 text-center text-3xl font-light tracking-tight sm:mt-20 sm:text-4xl">
        Selected <span className="text-neutral-500">Projects</span>
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-neutral-500">
        AI systems, computer-vision tooling and full-stack products — shipped and
        deployed.
      </p>

      <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10">
        {PROJECT_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
              filter === category
                ? "border-purple-400/40 bg-purple-500/20 text-purple-100"
                : "border-white/10 text-neutral-400 hover:border-white/25 hover:text-neutral-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {visible.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
            viewport={{ once: true, amount: 0.1 }}
            className={
              project.featured && filter === "All"
                ? "sm:col-span-2 lg:col-span-3"
                : ""
            }
          >
            <ProjectCard
              project={project}
              featured={project.featured && filter === "All"}
            />
          </motion.div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-neutral-500">
        More work and live demos on{" "}
        <a
          href={SOCIAL_PROFILES.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 underline-offset-4 hover:underline"
        >
          github.com/1faadi
        </a>
        .
      </p>
    </section>
  );
};

export default Projects;
