import { lazy, Suspense, useEffect, useState } from "react";
import Shell from "./components/Shell";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));

const BelowFold = () => (
  <>
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Education />
    <Contact />
  </>
);

const App = () => {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const kick = () => setLoadRest(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(kick, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(kick, 1);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <Shell footer={loadRest}>
      <Hero />
      {loadRest ? (
        <Suspense fallback={null}>
          <BelowFold />
        </Suspense>
      ) : null}
    </Shell>
  );
};

export default App;
