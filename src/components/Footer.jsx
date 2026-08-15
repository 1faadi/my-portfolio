import { PROFILE } from "../constants";

const Footer = () => (
  <footer className="border-t border-white/5 py-8 text-center text-xs text-neutral-600">
    © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.title} ·{" "}
    {PROFILE.location}
  </footer>
);

export default Footer;
