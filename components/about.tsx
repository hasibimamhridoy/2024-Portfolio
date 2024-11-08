"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Assalamu Alaikum , I am Hasib Imam Hridoy, a dedicated and enthusiastic
        React front-end developer with knowledge of full-stack development. Over
        the past 18 month, I have been honing my skills in Mern Stack web
        development, specializing in React.js for front-end development.
      </p>
    </motion.section>
  );
}
