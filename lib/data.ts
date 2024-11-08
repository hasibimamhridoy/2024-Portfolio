import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
// import corpcommentImg from "../public/corpcomment.png";
// import rmtdevImg from "@/public/rmtdev.png";
// import wordanalyticsImg from "@/public/wordanalytics.png";
import dpProject from "../public/dp_project.png";
import iqcProject from "../public/iqc_project.png";
export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Web Instructor",
    location: "Programming Hero, Level-4, 34, Awal Centre, Banani, Dhaka",
    description:
      "After completing an 8-month web development training program, I secured a position as a Web Instructor at Programming Hero.",
    icon: React.createElement(LuGraduationCap),
    date: "1 Aug 2023 - 1 Aug 2024",
  },
  {
    title: "Senior Web Instructor",
    location: "Programming Hero, Level-4, 34, Awal Centre, Banani, Dhaka",
    description:
      "After a year of dedication and growth, I was promoted from Web Instructor to Senior Web Instructor.",
    icon: React.createElement(CgWorkAlt),
    date: "1 September 2023 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "DeendarPartner - MERN Stack Website",
    description:
      "As a full-stack developer, I've been working on DeendarPartner for over a year, continuously adding new features and improving its performance. The project uses React, Next.js,Expressjs, MongoDB, Tailwind",
    tags: ["React", "Next.js", "MongoDB", "Expressjs", "ShadcnUI"],
    imageUrl: dpProject,
  },
  {
    title: "Islamic Quiz Contest",
    description:
      "This project is a dynamic platform for hosting Islamic quiz contests. As the front-end developer, I regularly update the website with new features,The stack includes Next.js(with server),MUI,TypeScript,Tailwind.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: iqcProject,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "Redux Toolkit",
  "GraphQL",
  "Express",
  "PostgreSQL",
  "Framer Motion",
] as const;
