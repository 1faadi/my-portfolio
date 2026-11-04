import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Shell from "./components/Shell";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Insights = lazy(() => import("./pages/Insights"));

/** Entry for every page except home. The HTML sets data-page="insights" or "case:<slug>". */
const root = document.getElementById("root");
const page = root.dataset.page;

const Page = () =>
  page === "insights" ? <Insights /> : <CaseStudy slug={page.slice("case:".length)} />;

createRoot(root).render(
  <StrictMode>
    <Shell>
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </Shell>
  </StrictMode>
);
