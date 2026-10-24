"use client";

import { motion } from "motion/react";

import { getClientProjects } from "@/data/projects";
import Container from "@/components/common/Container/Container";
import SectionLabel from "@/components/common/SectionLabel/SectionLabel";
import ArrowLink from "@/components/common/ArrowLink/ArrowLink";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";

import styles from "./FeaturedProjects.module.scss";

export default function FeaturedProjects() {
  const projects = getClientProjects();

  return (
    <section className={styles.featured} id="secili-projeler" aria-labelledby="featured-projects-heading">
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.25, 1] }}
        >
          <div>
            <SectionLabel>02 / SEÇİLİ PROJELER</SectionLabel>
            <h2 className={styles.heading} id="featured-projects-heading">
              Üzerinde çalıştığımız bazı işler.
            </h2>
          </div>

          <ArrowLink href="/projelerimiz">Tüm Projeleri Gör</ArrowLink>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} size="large" />
          ))}
        </div>
      </Container>
    </section>
  );
}
