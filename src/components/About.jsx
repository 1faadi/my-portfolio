import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import aboutImg from "../assets/about.jpg";
import { ABOUT_TEXT } from "../constants";
import { motion } from "motion/react";

const ABOUT_PARAGRAPHS = ABOUT_TEXT.trim().split(/\n\n+/);

const FLAT_WORDS = [];
ABOUT_PARAGRAPHS.forEach((para, pi) => {
  para
    .trim()
    .split(/\s+/)
    .forEach((w) => {
      FLAT_WORDS.push({ paragraphIndex: pi, word: w });
    });
});

const WORD_MS = 32;

function groupWordsToParagraphs(words) {
  const lines = ABOUT_PARAGRAPHS.map(() => "");
  words.forEach(({ paragraphIndex, word }, i) => {
    const prev = words[i - 1];
    const needSpace =
      prev !== undefined &&
      prev.paragraphIndex === paragraphIndex &&
      lines[paragraphIndex].length > 0;
    lines[paragraphIndex] += (needSpace ? " " : "") + word;
  });
  return lines;
}

const About = () => {
  const sectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  const isStreamComplete = visibleWordCount >= FLAT_WORDS.length;

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const tick = useCallback(() => {
    setVisibleWordCount((n) => {
      if (n >= FLAT_WORDS.length) return n;
      return n + 1;
    });
  }, []);

  useEffect(() => {
    if (!sectionInView || isStreamComplete) return;
    const id = window.setInterval(tick, WORD_MS);
    return () => window.clearInterval(id);
  }, [sectionInView, isStreamComplete, tick]);

  const visibleWords = useMemo(
    () => FLAT_WORDS.slice(0, visibleWordCount),
    [visibleWordCount]
  );

  const paragraphLines = useMemo(
    () => groupWordsToParagraphs(visibleWords),
    [visibleWords]
  );

  const lastParagraphIndex =
    visibleWords.length === 0
      ? -1
      : visibleWords[visibleWords.length - 1].paragraphIndex;

  return (
    <section ref={sectionRef} className="border-b border-neutral-900 pb-16">
      <h1 className="my-20 text-center text-4xl">
        About <span className="text-neutral-500">Me</span>
      </h1>
      <div className="flex flex-wrap items-start gap-10 lg:gap-14 xl:gap-16">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full shrink-0 lg:w-1/2 lg:p-4 xl:p-6"
        >
          <div className="flex justify-center lg:justify-end">
            <img
              className="h-auto w-full max-w-3xl rounded-2xl object-cover object-center brightness-90 shadow-xl shadow-black/50 lg:max-w-none"
              src={aboutImg}
              alt="Syed Fahad Abbas"
            />
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full min-w-0 flex-1 lg:w-1/2"
        >
          <div className="mx-auto w-full max-w-prose px-2 py-2 lg:px-0 lg:py-6">
            <div className="space-y-5 text-left text-neutral-300">
              {lastParagraphIndex < 0 ? (
                <p className="min-h-[1.75rem] text-neutral-600" aria-hidden>
                  &nbsp;
                </p>
              ) : (
                Array.from({ length: lastParagraphIndex + 1 }, (_, index) => {
                  const line = paragraphLines[index] ?? "";
                  const isActiveParagraph =
                    !isStreamComplete && index === lastParagraphIndex;

                  return (
                    <p
                      key={index}
                      className="text-base leading-relaxed tracking-tight text-pretty md:text-[1.05rem] md:leading-[1.75]"
                    >
                      {line}
                      {isActiveParagraph ? (
                        <span
                          className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-0.5 animate-pulse bg-purple-400 align-middle"
                          aria-hidden
                        />
                      ) : null}
                    </p>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
