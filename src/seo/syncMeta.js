import { PROFILE, PROJECTS } from "../constants/index.js";

/** Hostnames that serve this site (apex and www). */
const SFAK_HOSTNAMES = new Set(["sfak.space", "www.sfak.space"]);

/**
 * Default canonical origin when env is unset and the user is on sfak.space (either host).
 * Set `VITE_SITE_URL` to `https://sfak.space` if you prefer apex as canonical.
 */
const DEFAULT_SFAK_CANONICAL = "https://www.sfak.space";

/**
 * Resolves public site origin: `VITE_SITE_URL` wins; on sfak.space / www.sfak.space without env,
 * uses {@link DEFAULT_SFAK_CANONICAL} so meta tags stay consistent; otherwise `window.location.origin`
 * (e.g. localhost or a preview deployment).
 */
export function getSiteBaseUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (typeof fromEnv === "string" && fromEnv.trim() !== "") {
    return fromEnv.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.hostname) {
    if (SFAK_HOSTNAMES.has(window.location.hostname)) {
      return DEFAULT_SFAK_CANONICAL;
    }
    return window.location.origin;
  }
  return DEFAULT_SFAK_CANONICAL;
}

/**
 * Keeps canonical / Open Graph / Twitter URLs aligned with the deployment origin, and adds the
 * project ItemList. The Person + WebSite graph is static in index.html so it indexes without JS.
 */
export function applySeoMeta() {
  const base = getSiteBaseUrl();
  const pageUrl = `${base}/`;
  const ogImage = `${base}/icon.png`;

  if (base !== DEFAULT_SFAK_CANONICAL) {
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", pageUrl);

    const urlTargets = [
      ['meta[property="og:url"]', pageUrl],
      ['meta[name="twitter:url"]', pageUrl],
      ['meta[property="og:image"]', ogImage],
      ['meta[name="twitter:image"]', ogImage],
    ];
    urlTargets.forEach(([selector, value]) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute("content", value);
    });
  }

  let projectsLd = document.getElementById("ld-json-projects");
  if (!projectsLd) {
    projectsLd = document.createElement("script");
    projectsLd.id = "ld-json-projects";
    projectsLd.type = "application/ld+json";
    document.head.appendChild(projectsLd);
  }

  projectsLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${PROFILE.name}`,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        url: project.live || project.code || pageUrl,
        codeRepository: project.code,
        programmingLanguage: project.technologies.join(", "),
        author: { "@id": `${DEFAULT_SFAK_CANONICAL}/#person` },
      },
    })),
  });
}
