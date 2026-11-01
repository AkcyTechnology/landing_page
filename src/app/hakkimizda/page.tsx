import { pageMetadata } from "@/lib/metadata";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutApproach from "@/components/about/AboutApproach/AboutApproach";
import AboutCapabilities from "@/components/about/AboutCapabilities/AboutCapabilities";
import AboutValues from "@/components/about/AboutValues/AboutValues";

export const metadata = pageMetadata("Hakkımızda", "AKCY; yapay zekâ, otomasyon, web, mobil ve UI/UX alanlarını tek bir yapıda birleştirerek işletmeler için çalışan dijital sistemler geliştirir.", "/hakkimizda");

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutApproach />
      <AboutCapabilities />
      <AboutValues />
    </>
  );
}
