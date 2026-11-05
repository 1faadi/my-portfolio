import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Shell from "./components/Shell";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Insights = lazy(() => import("./pages/Insights"));
const Article = lazy(() => import("./pages/Article"));

/** Entry for every page except home. The HTML sets data-page="insights", "case:<slug>" or "article:<slug>". */
const root = document.getElementById("root");
const page = root.dataset.page;

const Page = () => {
  if (page === "insights") return <Insights />;
  if (page.startsWith("article:")) return <Article slug={page.slice("article:".length)} />;
  return <CaseStudy slug={page.slice("case:".length)} />;
};

createRoot(root).render(
  <StrictMode>
    <Shell>
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </Shell>
  </StrictMode>
);
