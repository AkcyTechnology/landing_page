import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/home/hero-section";
import AboutSection from "@/components/sections/home/about-section";
import StatsSection from "@/components/sections/home/stats-section";
import ServicesSection from "@/components/sections/home/services-section";
import ProductsSection from "@/components/sections/home/products-section";
import InfoVitrinSection from "@/components/sections/home/info-vitrin-section";
import SmartIndicatorsSection from "@/components/sections/home/smart-indicators-section";
import FaqSection from "@/components/sections/home/faq-section";
import ContactSection from "@/components/sections/home/contact-section";
import SocialImpactSection from "@/components/sections/home/social-impact-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <InfoVitrinSection />
        <SmartIndicatorsSection />
        <FaqSection />
        <ContactSection />
        <SocialImpactSection />
      </main>
      <Footer />
    </>
  );
}
