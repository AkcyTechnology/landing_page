"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import type { ProjectDef } from "@/data/projects";
import ProjectFilter, {
  ALL_PROJECTS_SLUG,
} from "@/components/projects/ProjectFilter/ProjectFilter";
import ProjectGrid from "@/components/projects/ProjectGrid/ProjectGrid";
import ProjectsEmptyState from "@/components/projects/ProjectsEmptyState/ProjectsEmptyState";

import styles from "./ProjectsListingClient.module.scss";

interface ProjectsListingClientProps {
  allProjects: ProjectDef[];
}

const NO_PARAMS = new URLSearchParams();

/*
  Site statik HTML olarak yayınlandığı için kategori parametresi tarayıcıda
  okunur; statik HTML'e tüm projeler basılır.
*/
export default function ProjectsListingClient(
  props: ProjectsListingClientProps
) {
  return (
    <Suspense
      fallback={<ProjectsListing {...props} searchParams={NO_PARAMS} />}
    >
      <ProjectsListingWithParams {...props} />
    </Suspense>
  );
}

function ProjectsListingWithParams(props: ProjectsListingClientProps) {
  const searchParams = useSearchParams();
  return <ProjectsListing {...props} searchParams={searchParams} />;
}

function ProjectsListing({
  allProjects,
  searchParams,
}: ProjectsListingClientProps & {
  searchParams: Pick<URLSearchParams, "get" | "toString">;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const category = searchParams.get("category") ?? ALL_PROJECTS_SLUG;

  const handleChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug !== ALL_PROJECTS_SLUG) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  const filtered = useMemo(() => {
    if (category === ALL_PROJECTS_SLUG) return allProjects;
    return allProjects.filter((project) => project.category === category);
  }, [allProjects, category]);

  const handleClear = () => handleChange(ALL_PROJECTS_SLUG);

  return (
    <div>
      <div className={styles.filterRow}>
        <ProjectFilter active={category} onChange={handleChange} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 0.8, 0.25, 1] }}
        >
          {filtered.length > 0 ? (
            <ProjectGrid projects={filtered} />
          ) : (
            <ProjectsEmptyState onClear={handleClear} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
