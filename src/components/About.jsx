import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import aboutImg from "../assets/about.jpg";
import { ABOUT_TEXT, PROFILE } from "../constants";
import Tilt from "./Tilt";

const PARAGRAPHS = ABOUT_TEXT.trim()
  .split(/\n\n+/)
  .map((p) => p.trim().split(/\s+/));

const TOTAL_WORDS = PARAGRAPHS.reduce((n, p) => n + p.length, 0);
const WORD_MS = 14;

/**
 * Words stay in the DOM at all times (crawlable) and only fade in as the
 * section is read — the reveal is presentation, never content gating.
 */
const About = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(TOTAL_WORDS);
      return;
    }

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setInterval(() => {
          setRevealed((n) => {
            if (n >= TOTAL_WORDS) {
              window.clearInterval(timer);
              return n;
            }
            return n + 1;
          });
        }, WORD_MS);
      },
      { threshold: 0.12 }
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  let cursor = 0;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 border-b border-neutral-900 pb-20"
    >
      <h2 className="my-14 text-center text-3xl font-light tracking-tight sm:my-20 sm:text-4xl">
        About <span className="text-neutral-500">Me</span>
      </h2>

      <div className="flex flex-wrap items-start gap-8 lg:gap-12">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-[42%]"
        >
          <Tilt max={8} className="lg:sticky lg:top-28">
            <div className="glass overflow-hidden rounded-3xl p-2">
              <img
                className="w-full rounded-2xl object-cover brightness-95"
                src={aboutImg}
                width="1400"
                height="1212"
                loading="lazy"
                decoding="async"
                alt={`${PROFILE.name} at work`}
              />
            </div>
          </Tilt>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full min-w-0 flex-1 space-y-5"
        >
          {PARAGRAPHS.map((words, pi) => (
            <p
              key={pi}
              className="text-sm leading-[1.8] tracking-tight text-neutral-400 sm:text-base md:text-[1.05rem]"
            >
              {words.map((word, wi) => {
                const index = cursor++;
                return (
                  <span
                    key={wi}
                    className="transition-opacity duration-300"
                    style={{ opacity: index < revealed ? 1 : 0.12 }}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
