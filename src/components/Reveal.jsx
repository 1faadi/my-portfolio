import { useEffect, useRef, useState } from "react";

/**
 * One-shot scroll reveal — IntersectionObserver + CSS, no animation library.
 */
const Reveal = ({
  as: Tag = "div",
  children,
  className = "",
  delayMs = 0,
  x = 0,
  y = 24,
}) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setShown(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{
        "--reveal-x": `${x}px`,
        "--reveal-y": `${y}px`,
        transitionDelay: shown ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
