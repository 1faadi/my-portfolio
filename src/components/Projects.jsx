import { PROJECTS } from "../constants";
import { motion } from "motion/react";

const Projects = () => {
  const renderTrack = (suffix) => (
    <div className="flex gap-6 pr-6">
      {PROJECTS.map((project) => (
        <article
          key={`${project.link}${suffix}`}
          className="flex w-[min(100vw-2rem,340px)] shrink-0 flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 shadow-lg backdrop-blur-sm"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-44 overflow-hidden"
          >
            <img
              src={project.image}
              alt=""
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </a>
          <div className="flex flex-1 flex-col p-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-semibold text-neutral-100 hover:text-purple-300"
            >
              {project.title}
            </a>
            <p className="mb-3 line-clamp-3 flex-1 text-sm text-neutral-400">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={`${project.link}-${tech}`}
                  className="rounded bg-neutral-900 px-2 py-1 text-xs font-medium text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="border-b border-neutral-900 pb-12">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="my-20 text-center text-4xl"
      >
        Projects
      </motion.h2>

      <div className="group relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent"
          aria-hidden
        />

        <div className="animate-marquee flex w-max will-change-transform group-hover:[animation-play-state:paused]">
          {renderTrack("-a")}
          {renderTrack("-b")}
        </div>
      </div>
    </div>
  );
};

export default Projects;
