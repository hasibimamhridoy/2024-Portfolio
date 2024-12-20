"use client";
import { motion } from "framer-motion";

import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import { CardContainer, CardItem } from "./ui/3d-card";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>

      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsData.map((skill, index) => (
          <CardContainer
            key={index}
            className="bg-transparent"
            containerClassName="h-fit cursor-pointer dark:bg-transparent bg-transparent hover:bg-transparent"
          >
            <CardItem
              translateZ="100"
              rotateX={20}
              rotateZ={-10}
              className="w-full dark:bg-transparent bg-transparent"
            >
              <motion.li
                className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
                key={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
              >
                {skill}
              </motion.li>
            </CardItem>
          </CardContainer>
        ))}
      </ul>
    </section>
  );
}
