import { useCallback, useRef } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Pointer-driven 3D tilt with a glare highlight, done with CSS transforms only.
 * Writes CSS vars on the element instead of React state so it never re-renders.
 */
const Tilt = ({
  children,
  className = "",
  max = 10,
  scale = 1.02,
  glare = true,
  as: Tag = "div",
}) => {
  const ref = useRef(null);

  const handleMove = useCallback(
    (event) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--tilt-scale", String(scale));
    },
    [max, scale]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tilt-scale", "1");
  }, []);

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt ${className}`}
    >
      <div className="tilt-inner">
        {children}
        {glare ? <span className="tilt-glare" aria-hidden /> : null}
      </div>
    </Tag>
  );
};

export default Tilt;
