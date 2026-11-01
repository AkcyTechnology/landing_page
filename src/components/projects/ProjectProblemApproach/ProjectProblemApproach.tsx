import Container from "@/components/common/Container/Container";

import styles from "./ProjectProblemApproach.module.scss";

interface ProjectProblemApproachProps {
  problem?: string;
  ourRole?: string[];
  approach?: string;
}

export default function ProjectProblemApproach({
  problem,
  ourRole,
  approach,
}: ProjectProblemApproachProps) {
  if (!problem && !ourRole?.length && !approach) return null;

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {problem && (
            <div>
              <span className={styles.label}>Challenge</span>
              <p>{problem}</p>
            </div>
          )}

          {ourRole && ourRole.length > 0 && (
            <div>
              <span className={styles.label}>Our Role</span>
              <ul className={styles.roleList}>
                {ourRole.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {approach && (
          <div className={styles.approach}>
            <span className={styles.label}>Solution</span>
            <p>{approach}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
