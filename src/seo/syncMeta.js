import { SOCIAL_PROFILES } from "../constants/index.js";

/** Hostnames that serve this site (apex and www). */
const SFAK_HOSTNAMES = new Set(["sfak.space", "www.sfak.space"]);

/**
 * Default canonical origin when env is unset and the user is on sfak.space (either host).
 * Set `VITE_SITE_URL` to `https://sfak.space` if you prefer apex as canonical.
 */
const DEFAULT_SFAK_CANONICAL = "https://www.sfak.space";

function isSfakHostname(hostname) {
  return SFAK_HOSTNAMES.has(hostname);
}

/**
 * Resolves public site origin: `VITE_SITE_URL` wins; on sfak.space / www.sfak.space without env,
 * uses {@link DEFAULT_SFAK_CANONICAL} so meta tags stay consistent; otherwise `window.location.origin`
 * (e.g. localhost).
 */
export function getSiteBaseUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (typeof fromEnv === "string" && fromEnv.trim() !== "") {
    return fromEnv.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.hostname) {
    if (isSfakHostname(window.location.hostname)) {
      return DEFAULT_SFAK_CANONICAL;
    }
    return window.location.origin;
  }
  return DEFAULT_SFAK_CANONICAL;
}

/**
 * Keeps canonical, Open Graph, Twitter Card, and Person JSON-LD aligned with the deployment URL.
 */
export function applySeoMeta() {
  const base = getSiteBaseUrl();
  const pageUrl = `${base}/`;
  const ogImage = `${base}/icon.png`;

  const setLink = (rel, href) => {
    const el = document.head.querySelector(`link[rel="${rel}"]`);
    if (el) el.setAttribute("href", href);
  };

  const setMeta = (attrName, attrValue, content) => {
    const el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (el) el.setAttribute("content", content);
  };

  setLink("canonical", pageUrl);

  setMeta("property", "og:url", pageUrl);
  setMeta("property", "og:image", ogImage);
  setMeta("name", "twitter:url", pageUrl);
  setMeta("name", "twitter:image", ogImage);

  let personLd = document.getElementById("ld-json-person");
  if (!personLd) {
    personLd = document.createElement("script");
    personLd.id = "ld-json-person";
    personLd.type = "application/ld+json";
    document.head.appendChild(personLd);
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        url: pageUrl,
        name: "Syed Fahad Abbas Kazmi",
        description:
          "AI Engineer & App/Web Developer — full-stack, AI systems, Next.js, RAG, and intelligent automation.",
        inLanguage: "en",
        publisher: { "@id": `${pageUrl}#person` },
      },
      {
        "@type": "Person",
        "@id": `${pageUrl}#person`,
        name: "Syed Fahad Abbas Kazmi",
        jobTitle: "AI Engineer & App/Web Developer",
        url: pageUrl,
        image: ogImage,
        email: "fahadkazmi.dev@gmail.com",
        sameAs: [
          SOCIAL_PROFILES.linkedin,
          SOCIAL_PROFILES.github,
          SOCIAL_PROFILES.twitter,
          SOCIAL_PROFILES.instagram,
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "Retrieval-Augmented Generation",
          "Next.js",
          "React",
          "TypeScript",
          "Full-stack development",
        ],
      },
    ],
  };
  personLd.textContent = JSON.stringify(graph);
}
