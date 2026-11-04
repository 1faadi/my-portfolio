import { PROFILE } from "../constants";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/case-studies/growth-office/", label: "Growth Office case study" },
  { href: "/case-studies/ai-route-planning/", label: "Route planning case study" },
  { href: "/insights/", label: "Insights" },
  { href: PROFILE.resumePath, label: "Résumé" },
];

const Footer = () => (
  <footer className="border-t border-white/5 py-8 text-center text-xs text-neutral-400">
    <nav aria-label="Footer" className="mb-4">
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a className="transition-colors hover:text-white" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.title} ·{" "}
    {PROFILE.location}
  </footer>
);

export default Footer;
