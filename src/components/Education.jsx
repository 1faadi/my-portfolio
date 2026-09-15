import { HiAcademicCap } from "react-icons/hi2";
import { EDUCATION } from "../constants";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

const Education = () => {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-b border-neutral-900 pb-20"
    >
      <h2 className="my-14 text-center text-3xl font-light tracking-tight sm:my-20 sm:text-4xl">
        Education
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        {EDUCATION.map((item, index) => (
          <Reveal key={item.degree} delayMs={index * 80}>
            <Tilt max={7} className="h-full">
              <div className="glass h-full rounded-2xl p-5 sm:p-6">
                <HiAcademicCap className="depth-1 mb-4 text-2xl text-purple-300" />
                <h3 className="text-lg font-semibold text-neutral-100">
                  {item.degree}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">{item.school}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-neutral-400">
                  {item.year}
                </p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Education;
