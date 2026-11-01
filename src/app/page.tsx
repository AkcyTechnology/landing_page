import { pageMetadata } from "@/lib/metadata";
import Hero from "@/components/home/Hero/Hero";
import ProblemsSolved from "@/components/home/ProblemsSolved/ProblemsSolved";
import ProjectShowcase from "@/components/home/ProjectShowcase/ProjectShowcase";
import { WorkProcess, CapabilitiesOverview } from "@/components/home/StudioOverview/StudioOverview";
import Faq from "@/components/home/Faq/Faq";

export const metadata = pageMetadata("Yapay Zekâ ve Otomasyon Çözümleri", "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz. Küçük ekiplerden kurumsal yapılara.", "/");

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectShowcase />
      <ProblemsSolved />
      <WorkProcess />
      <CapabilitiesOverview />
      <Faq />
    </>
  );
}
