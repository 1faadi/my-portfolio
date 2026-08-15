import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { HiArrowDownTray, HiArrowRight } from "react-icons/hi2";
import profilePic from "../assets/profile.jpg";
import {
  CONTACT,
  HERO_CONTENT,
  HERO_STATS,
  PROFILE,
  SOCIAL_PROFILES,
} from "../constants";
import Tilt from "./Tilt";

const rise = (delay = 0) => ({
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay } },
});

const Hero = () => {
  return (
    <section id="home" className="border-b border-neutral-900 pb-20 pt-6">
      <div className="flex flex-wrap items-center gap-y-12">
        <div className="w-full lg:w-3/5">
          <motion.div
            variants={rise(0)}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PROFILE.availability}
          </motion.div>

          <motion.h1
            variants={rise(0.08)}
            initial="hidden"
            animate="visible"
            className="max-w-[16ch] text-4xl font-light tracking-tight text-neutral-100 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.p
            variants={rise(0.16)}
            initial="hidden"
            animate="visible"
            className="text-gradient mt-4 text-lg font-medium tracking-tight sm:mt-5 sm:text-2xl"
          >
            {PROFILE.title}
          </motion.p>

          <motion.p
            variants={rise(0.24)}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:mt-6 sm:text-base"
          >
            {HERO_CONTENT}
          </motion.p>

          <motion.div
            variants={rise(0.32)}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:brightness-110"
            >
              View my work <HiArrowRight />
            </a>
            <a
              href={PROFILE.resumePath}
              download={PROFILE.resumeFileName}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-white/35 hover:bg-white/5"
            >
              <HiArrowDownTray /> Download résumé
            </a>
            <a
              href={SOCIAL_PROFILES.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-white/35 hover:bg-white/5"
            >
              <FaGithub /> GitHub
            </a>
          </motion.div>

          <motion.p
            variants={rise(0.4)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-sm text-neutral-500"
          >
            {PROFILE.location} ·{" "}
            <a
              className="text-neutral-300 underline-offset-4 hover:underline"
              href={`mailto:${CONTACT.email}`}
            >
              {CONTACT.email}
            </a>
          </motion.p>
        </div>

        <div className="order-first w-full lg:order-none lg:w-2/5 lg:pl-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Tilt max={12} scale={1.03} className="mx-auto max-w-[15rem] sm:max-w-xs lg:max-w-sm">
              <div className="glass overflow-hidden rounded-3xl p-2 shadow-2xl shadow-purple-950/40">
                <img
                  src={profilePic}
                  alt={`${PROFILE.name}, ${PROFILE.title}`}
                  width="540"
                  height="549"
                  // React 18 renders the camelCase prop with a warning; lowercase is the real attribute.
                  {...{ fetchpriority: "high" }}
                  className="depth-1 w-full rounded-2xl object-cover"
                />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>

      <motion.dl
        variants={rise(0.5)}
        initial="hidden"
        animate="visible"
        className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4"
      >
        {HERO_STATS.map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-2xl px-3 py-4 text-center sm:px-5"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block text-2xl font-semibold text-neutral-100 sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-wider text-neutral-500">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
};

export default Hero;
