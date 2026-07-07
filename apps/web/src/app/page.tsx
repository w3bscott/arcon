import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
// import { Footer } from "@/components/Footer";
import { FeatureSection } from "@/components/FeatureSection";
import { Cards } from "@/components/Cards";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <Hero />
      <Cards />
      <FeatureSection />
      <CTA />
      {/* <Footer/> */}
    </main>
  );
}
