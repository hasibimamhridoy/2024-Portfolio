import React from "react";
import { CgWorkAlt } from "react-icons/cg";

import { CiHome } from "react-icons/ci";
import { GrContact } from "react-icons/gr";
import { IoCodeWorking } from "react-icons/io5";
import { SiAboutdotme } from "react-icons/si";

import { FaCodepen } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";

import dpProject from "../public/dp_project.png";
import iqcProject from "../public/iqc_project.png";
export const links = [
  {
    name: "Home",
    hash: "#home",
    icon: React.createElement(CiHome),
  },
  {
    name: "About",
    hash: "#about",
    icon: React.createElement(SiAboutdotme),
  },
  {
    name: "Projects",
    hash: "#projects",
    icon: React.createElement(IoCodeWorking),
  },
  {
    name: "Skills",
    hash: "#skills",
    icon: React.createElement(FaCodepen),
  },
  {
    name: "Experience",
    hash: "#experience",
    icon: React.createElement(GiSkills),
  },
  {
    name: "Contact",
    hash: "#contact",
    icon: React.createElement(GrContact),
  },
];

export const experiencesData = [
  // {
  //   title: "Web Instructor",
  //   location: "Programming Hero, Level-4, 34, Awal Centre, Banani, Dhaka",
  //   description:
  //     "After completing an 8-month web development training program, I secured a position as a Web Instructor at Programming Hero.",
  //   icon: React.createElement(LuGraduationCap),
  //   date: "1 Aug 2023 - 1 Aug 2024",
  // },
  {
    title: "Senior Web Instructor",
    location: "Programming Hero, Level-4, 34, Awal Centre, Banani, Dhaka",
    description: "",
    icon: React.createElement(CgWorkAlt),
    date: "1 August 2023 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "DeendarPartner - MERN Stack",
    description:
      "As a full-stack developer, I've been working on DeendarPartner.com for over a year, continuously adding new features and improving its performance. The project uses React, Next.js,Expressjs, MongoDB, Tailwind",
    tags: [
      "Next.js",
      "Redux",
      "RTK Query",
      "Express.js",
      "Mongoose",
      "MongoDB",
    ],
    imageUrl: dpProject,
    href: "https://deendarpartner.com/",
  },
  {
    title: "Islamic Quiz Contest",
    description:
      "This project is a dynamic platform for hosting Islamic quiz contests. As the full-stack developer, I regularly update the website with new features,The stack includes Next.js(with server),MUI,TypeScript,Tailwind.",
    tags: ["Next.js", "Mongoose", "MongoDB"],
    imageUrl: iqcProject,
    href: "https://islamicquizcontest.xyz/",
  },
] as const;

export const skillsData = [
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "Next.js",
  "Express",
  "Mongoose",
  "MongoDB",
] as const;
