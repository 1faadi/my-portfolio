import { motion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HiOutlineDocumentArrowDown,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import { CONTACT, PROFILE, SOCIAL_PROFILES } from "../constants";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-24 pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="my-14 text-center text-3xl font-light tracking-tight sm:my-20 sm:text-4xl"
      >
        Get in <span className="text-neutral-500">Touch</span>
      </motion.h2>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
        className="glass mx-auto max-w-3xl rounded-3xl p-6 text-center sm:p-10 lg:p-12"
      >
        <p className="mx-auto max-w-xl text-neutral-400">
          {PROFILE.availability}. If you are building with LLMs, agents or
          need a full-stack engineer who ships, I would like to hear about it.
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:brightness-110"
          >
            <HiOutlineEnvelope /> Email me
          </a>
          <a
            href={SOCIAL_PROFILES.linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-white/35 hover:bg-white/5"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href={SOCIAL_PROFILES.github}
            target="_blank"
            rel="noopener noreferrer me"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-white/35 hover:bg-white/5"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href={PROFILE.resumePath}
            download={PROFILE.resumeFileName}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-white/35 hover:bg-white/5"
          >
            <HiOutlineDocumentArrowDown /> Résumé
          </a>
        </div>

        <address className="mt-10 flex flex-col items-center gap-3 text-sm not-italic text-neutral-400 sm:flex-row sm:justify-center sm:gap-8">
          <span className="inline-flex items-center gap-2">
            <HiOutlineMapPin className="text-purple-300" /> {CONTACT.address}
          </span>
          <a
            className="inline-flex items-center gap-2 hover:text-white"
            href={`tel:${CONTACT.phoneNo.replace(/\s/g, "")}`}
          >
            <HiOutlinePhone className="text-purple-300" /> {CONTACT.phoneNo}
          </a>
          <a
            className="inline-flex items-center gap-2 hover:text-white"
            href={`mailto:${CONTACT.email}`}
          >
            <HiOutlineEnvelope className="text-purple-300" /> {CONTACT.email}
          </a>
        </address>
      </motion.div>
    </section>
  );
};

export default Contact;
