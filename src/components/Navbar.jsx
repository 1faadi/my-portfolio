import logo from "../assets/kevinRushLogo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { SOCIAL_PROFILES } from "../constants";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6" aria-label="Primary">
      <div className="flex flex-shrink-0 items-center">
        <img
          className="mx-2 w-10"
          src={logo}
          alt="Syed Fahad Abbas Kazmi — portfolio logo"
        />
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a
          href={SOCIAL_PROFILES.linkedin}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href={SOCIAL_PROFILES.github}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href={SOCIAL_PROFILES.twitter}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="X (Twitter)"
        >
          <FaSquareXTwitter />
        </a>
        <a
          href={SOCIAL_PROFILES.instagram}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
