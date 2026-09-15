import { useEffect, useRef, useState } from "react";
import aboutImg from "../assets/about-sm.webp";
import { ABOUT_TEXT, PROFILE } from "../constants";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

const PARAGRAPHS = ABOUT_TEXT.trim()
  .split(/\n\n+/)
  .map((p) => p.trim());

/**
 * Paragraphs stay in the DOM (crawlable). A single opacity toggle reveals them
 * once the section is in view — no per-word spans.
 */
const About = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setRevealed(true);
      },
      { threshold: 0.12 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 border-b border-neutral-900 pb-20"
    >
      <h2 className="my-14 text-center text-3xl font-light tracking-tight sm:my-20 sm:text-4xl">
        About <span className="text-neutral-400">Me</span>
      </h2>

      <div className="flex flex-wrap items-start gap-8 lg:gap-12">
        <Reveal x={-40} y={0} className="w-full lg:w-[42%]">
          <Tilt max={8} className="lg:sticky lg:top-28">
            <div className="glass overflow-hidden rounded-3xl p-2">
              <img
                className="w-full rounded-2xl object-cover brightness-95"
                src={aboutImg}
                width="400"
                height="347"
                loading="lazy"
                decoding="async"
                alt={`${PROFILE.name} at work`}
              />
            </div>
          </Tilt>
        </Reveal>

        <Reveal x={40} y={0} className="w-full min-w-0 flex-1 space-y-5">
          {PARAGRAPHS.map((text, pi) => (
            <p
              key={pi}
              className={`text-sm leading-[1.8] tracking-tight text-neutral-400 transition-opacity duration-700 sm:text-base md:text-[1.05rem] ${
                revealed ? "opacity-100" : "opacity-30"
              }`}
              style={{ transitionDelay: revealed ? `${pi * 120}ms` : "0ms" }}
            >
              {text}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default About;
