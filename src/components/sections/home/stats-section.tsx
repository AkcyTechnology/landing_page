import Container from "@/components/ui/container";
import StatCard from "@/components/ui/stat-card";
import { stats } from "@/data/stats";

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.value}
              value={stat.value}
              label={stat.label}
              highlight={stat.highlight}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
