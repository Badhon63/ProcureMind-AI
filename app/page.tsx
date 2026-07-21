import Hero from "@/components/homepage/Hero";
import FeatureBadges from "@/components/homepage/FeatureBadges";
import Statistics from "@/components/homepage/Statistics";
import HowItWorks from "@/components/homepage/HowItWorks";
import Testimonials from "@/components/homepage/Testimonials";
import FAQ from "@/components/homepage/FAQ";
import CTA from "@/components/homepage/CTA";

export default function Home() {
  return (
    <div className="bg-linear-to-b from-white to-gray-50 min-h-screen pt-32">
      <Hero />
      <FeatureBadges />
      <Statistics />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
