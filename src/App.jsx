import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    // overflow-x-clip, not -hidden: `hidden` creates a scroll container and breaks the sticky navbar.
    <div className="overflow-x-clip text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-neutral-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.28),rgba(255,255,255,0))]" />
        <div className="grid-bg absolute inset-0" />
      </div>

      <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        {/* `contents` keeps the banner landmark without creating a box — a header
            sized to the navbar would cage the sticky nav and stop it scrolling. */}
        <header className="contents">
          <Navbar />
        </header>
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
