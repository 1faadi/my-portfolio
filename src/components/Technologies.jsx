import { FaPeopleGroup } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { motion } from "motion/react";
import {
  SiChatbot,
  SiClaude,
  SiFigma,
  SiGooglechrome,
  SiHuggingface,
  SiKaggle,
  SiLangchain,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPerplexity,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from "react-icons/si";
import { VscCode, VscTerminal } from "react-icons/vsc";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const TECH_ICONS = [
  { Icon: SiNextdotjs, label: "Next.js", className: "text-neutral-100" },
  { Icon: SiReact, label: "React", className: "text-cyan-400" },
  { Icon: SiTypescript, label: "TypeScript", className: "text-blue-500" },
  { Icon: SiTailwindcss, label: "Tailwind CSS", className: "text-sky-400" },
  { Icon: SiVercel, label: "Vercel", className: "text-neutral-200" },
  { Icon: SiNodedotjs, label: "Node.js", className: "text-green-600" },
  { Icon: SiPython, label: "Python", className: "text-yellow-400" },
  { Icon: SiOpenai, label: "OpenAI / LLMs", className: "text-emerald-400" },
  { Icon: SiLangchain, label: "LangChain", className: "text-amber-200" },
  { Icon: SiPostgresql, label: "PostgreSQL", className: "text-sky-600" },
  { Icon: SiFigma, label: "Figma", className: "text-orange-400" },
  { Icon: SiWordpress, label: "WordPress", className: "text-sky-500" },
  { Icon: SiGooglechrome, label: "Chrome extensions", className: "text-blue-400" },
  { Icon: SiLaravel, label: "Laravel", className: "text-red-500" },
  { Icon: SiClaude, label: "Claude", className: "text-orange-200" },
  { Icon: SiChatbot, label: "OpenClaw", className: "text-teal-400" },
  { Icon: FaPeopleGroup, label: "Cowork", className: "text-indigo-400" },
  { Icon: SiPerplexity, label: "Perplexity", className: "text-slate-200" },
  { Icon: HiSparkles, label: "Kimi", className: "text-amber-300" },
  { Icon: SiKaggle, label: "Kaggle", className: "text-sky-400" },
  { Icon: SiHuggingface, label: "Hugging Face", className: "text-yellow-400" },
  { Icon: VscCode, label: "Cursor", className: "text-neutral-200" },
  { Icon: VscTerminal, label: "CLI", className: "text-green-500" },
  { Icon: SiSupabase, label: "Supabase", className: "text-emerald-400" },
];

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h1>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {TECH_ICONS.map(({ Icon, label, className }, index) => (
          <motion.div
            key={label}
            variants={iconVariants(2.5 + (index % 5) * 0.4)}
            initial="initial"
            animate="animate"
            title={label}
            className="rounded-2xl border-4 border-neutral-800 p-4"
          >
            <Icon className={`text-7xl ${className}`} aria-label={label} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technologies;
