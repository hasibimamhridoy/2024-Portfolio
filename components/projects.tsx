"use client";

import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import React from "react";
import { ThreeDProjectCard } from "./3d-card";
import SectionHeading from "./section-heading";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <ThreeDProjectCard {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
