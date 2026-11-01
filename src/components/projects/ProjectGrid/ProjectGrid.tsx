import type { ProjectDef } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";

import styles from "./ProjectGrid.module.scss";

interface ProjectGridProps {
  projects: ProjectDef[];
}

// Editorial rhythm, repeating every 4 projects across two rows:
// row A: large card at 2/3 width + standard card at 1/3 width
// row B: two standard cards at 1/2 width each
function getSpanClassName(index: number): string {
  const position = index % 4;

  if (position === 0) return styles.spanTwoThirds;
  if (position === 1) return styles.spanOneThird;
  return styles.spanHalf;
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <div key={project.slug} className={getSpanClassName(index)}>
          <ProjectCard
            project={project}
            size={index % 4 === 0 ? "large" : "standard"}
          />
        </div>
      ))}
    </div>
  );
}
