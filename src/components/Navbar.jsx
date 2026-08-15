import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineDocumentArrowDown, HiBars3 } from "react-icons/hi2";
import logo from "../assets/logo.png";
import { NAV_LINKS, PROFILE, SOCIAL_PROFILES } from "../constants";

const SOCIALS = [
  { href: SOCIAL_PROFILES.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: SOCIAL_PROFILES.github, label: "GitHub", Icon: FaGithub },
  { href: SOCIAL_PROFILES.twitter, label: "X (Twitter)", Icon: FaSquareXTwitter },
  { href: SOCIAL_PROFILES.instagram, label: "Instagram", Icon: FaInstagram },
];

const Navbar = () => {
  return (
    <nav
      className="sticky top-3 z-40 mx-auto mb-14 flex max-w-5xl items-center justify-between gap-3 rounded-full border border-white/10 bg-neutral-950/70 py-2 pl-3 pr-2 shadow-lg shadow-black/40 backdrop-blur-xl sm:top-5 sm:mb-20 sm:gap-6 sm:py-2.5 sm:pl-5 sm:pr-3"
      aria-label="Primary"
    >
      <a href="#home" className="flex flex-shrink-0 items-center gap-2.5">
        <img
          className="w-8"
          src={logo}
          width="32"
          height="32"
          alt={`${PROFILE.name} — logo`}
        />
        <span className="hidden text-sm font-medium tracking-tight text-neutral-200 sm:block">
          {PROFILE.shortName}
        </span>
      </a>

      <ul className="hidden items-center gap-6 text-sm text-neutral-400 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a className="transition-colors hover:text-white" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-3 text-lg text-neutral-400 xl:flex">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={label}
              className="transition-colors hover:text-white"
            >
              <Icon />
            </a>
          ))}
        </div>

        <a
          href={PROFILE.resumePath}
          download={PROFILE.resumeFileName}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 sm:px-4"
        >
          <HiOutlineDocumentArrowDown className="text-base" />
          <span className="hidden sm:inline">Résumé</span>
        </a>

        <details className="relative lg:hidden">
          <summary
            className="flex cursor-pointer list-none items-center rounded-full border border-white/10 p-2 text-neutral-300"
            aria-label="Open menu"
          >
            <HiBars3 />
          </summary>
          <ul className="glass absolute right-0 mt-3 w-52 rounded-2xl p-2 text-sm shadow-xl shadow-black/50">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className="block rounded-xl px-3 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {SOCIALS.map(({ href, label }) => (
              <li key={label}>
                <a
                  className="block rounded-xl px-3 py-2 text-neutral-400 hover:bg-white/5 hover:text-white xl:hidden"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </nav>
  );
};

export default Navbar;
