import { motion } from "motion/react";
import { EXPERIENCES } from "../constants";

const Experience = () => {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-neutral-900 pb-20"
    >
      <h2 className="my-14 text-center text-3xl font-light tracking-tight sm:my-20 sm:text-4xl">
        Work <span className="text-neutral-500">Experience</span>
      </h2>

      <ol className="relative ml-2 border-l border-white/10 pl-6 sm:ml-4 sm:pl-10 lg:ml-6 lg:pl-12">
        {EXPERIENCES.map((experience) => (
          <motion.li
            key={`${experience.company}-${experience.role}`}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.15 }}
            className="relative mb-12 last:mb-0"
          >
            <span
              className="absolute -left-[1.85rem] top-2 h-3 w-3 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 ring-4 ring-neutral-950 sm:-left-[2.85rem] lg:-left-[3.35rem]"
              aria-hidden
            />
            <p className="mb-2 text-sm font-medium tracking-wide text-purple-300">
              {experience.year}
            </p>
            <h3 className="text-lg font-semibold text-neutral-100 sm:text-xl">
              {experience.role}
            </h3>
            <p className="mb-4 text-sm text-neutral-400">
              {experience.company} · {experience.location}
            </p>

            <ul className="mb-5 max-w-3xl space-y-2">
              {experience.highlights.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 text-sm leading-relaxed text-neutral-400 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-purple-400/60"
                >
                  {point}
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-purple-400/15 bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-200"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
