"use client";

import { projectsData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
type ProjectProps = (typeof projectsData)[number];
export function ThreeDProjectCard({
  title,
  description,
  tags,
  imageUrl,
  href,
}: ProjectProps) {
  // const { title, description, imageUrl, tags } = project || {};

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 last:mb-0"
    >
      <CardContainer className="inter-var ">
        <CardBody className="py-0 my-0 relative group/card dark:hover:shadow-2xl w-auto sm:w-[30rem] h-auto rounded-xl p-6">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {description}
          </CardItem>
          <CardItem translateZ="60" className="w-full mt-4">
            <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto py-3">
              {tags.map((tag: any, index: number) => (
                <li
                  className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </CardItem>
          <CardItem
            translateZ="100"
            rotateX={20}
            rotateZ={-10}
            className="w-full mt-4"
          >
            <Image
              src={imageUrl}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>

          <div className="flex justify-between items-center mt-10">
            <Link target="_blank" href={href}>
              <CardItem
                // translateY={15}
                // translateZ={20}
                // translateX={-40}
                translateZ="100"
                rotateX={20}
                rotateZ={-10}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Live Visit →
              </CardItem>
            </Link>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
