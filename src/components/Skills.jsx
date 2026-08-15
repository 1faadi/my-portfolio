import { motion } from "motion/react";
import {
  SiAnthropic,
  SiBootstrap,
  SiDocker,
  SiGit,
  SiHuggingface,
  SiJquery,
  SiLangchain,
  SiLaravel,
  SiMysql,
  SiN8N,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRoboflow,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { SKILL_GROUPS } from "../constants";
import Tilt from "./Tilt";

const TECH_ICONS = [
  { Icon: SiTypescript, label: "TypeScript", className: "text-blue-400" },
  { Icon: SiNextdotjs, label: "Next.js", className: "text-neutral-100" },
  { Icon: SiReact, label: "React", className: "text-cyan-400" },
  { Icon: SiNestjs, label: "Nest.js", className: "text-rose-500" },
  { Icon: SiNodedotjs, label: "Node.js", className: "text-green-500" },
  { Icon: SiPython, label: "Python", className: "text-yellow-400" },
  { Icon: SiOpenai, label: "OpenAI / LLMs", className: "text-emerald-400" },
  { Icon: SiAnthropic, label: "Claude / MCP", className: "text-orange-300" },
  { Icon: SiLangchain, label: "LangChain", className: "text-amber-200" },
  { Icon: SiHuggingface, label: "Hugging Face", className: "text-yellow-300" },
  { Icon: SiRoboflow, label: "Roboflow / SAM", className: "text-violet-400" },
  { Icon: SiN8N, label: "n8n", className: "text-rose-400" },
  { Icon: SiPostgresql, label: "PostgreSQL", className: "text-sky-500" },
  { Icon: SiSupabase, label: "Supabase", className: "text-emerald-400" },
  { Icon: SiMysql, label: "MySQL", className: "text-sky-300" },
  { Icon: SiLaravel, label: "Laravel", className: "text-red-500" },
  { Icon: SiPhp, label: "PHP", className: "text-indigo-300" },
  { Icon: SiTailwindcss, label: "Tailwind CSS", className: "text-sky-400" },
  { Icon: SiVercel, label: "Vercel", className: "text-neutral-200" },
  { Icon: SiDocker, label: "Docker", className: "text-sky-400" },
  { Icon: SiJquery, label: "jQuery", className: "text-blue-300" },
  { Icon: SiBootstrap, label: "Bootstrap", className: "text-purple-400" },
  { Icon: SiGit, label: "Git", className: "text-orange-400" },
];

const IconTrack = ({ ariaHidden }) => (
  <ul
    className="flex shrink-0 items-center gap-4 pr-4"
    aria-hidden={ariaHidden || undefined}
  >
    {TECH_ICONS.map(({ Icon, label, className }) => (
      <li
        key={label}
        title={label}
        className="glass flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-2xl sm:h-24 sm:w-24"
      >
        <Icon className={`text-3xl ${className}`} aria-hidden />
        <span className="max-w-[5.5rem] truncate px-1 text-[0.65rem] text-neutral-400">
          {label}
        </span>
      </li>
    ))}
  </ul>
);

const Skills = () => {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-neutral-900 pb-20"
    >
      <h2 className="my-14 text-center text-3xl font-light tracking-tight sm:my-20 sm:text-4xl">
        Skills & <span className="text-neutral-500">Technologies</span>
      </h2>

      <div className="group relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-neutral-950 to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-neutral-950 to-transparent sm:w-24"
          aria-hidden
        />
        <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
          <IconTrack />
          <IconTrack ariaHidden />
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, index) => (
          <motion.div
            key={group.title}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Tilt max={6} scale={1.015} className="h-full">
              <div className="glass h-full rounded-2xl p-5 sm:p-6">
                <h3 className="depth-1 mb-4 text-sm font-semibold uppercase tracking-wider text-purple-300">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
