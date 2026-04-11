import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import ServiceCard from "@/components/ui/service-card";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <Container className="relative">
        <div className="flex flex-col gap-16">
          {/* Heading */}
          <SectionHeading
            badge="Hizmetlerimiz"
            title="Sizin için geliştirdiğimiz"
            titleHighlight="çözümler"
            description="İşinize özel yazılım çözümleriyle süreçlerinizi hızlandırıyor, verimliliğinizi artırıyoruz. Her adımda yanınızdayız."
          />

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
