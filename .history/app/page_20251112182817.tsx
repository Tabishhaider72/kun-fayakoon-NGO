import Hero from "@/components/Hero";
import About from "@/components/AboutSection";
import DonationSection from "@/components/DonationSection";
import CampaignsSection from "@/components/CampaignsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      {/* Add more sections below: About, Campaigns, Donations, Footer, etc. */}
      <About />
      <DonationSection />
      <CampaignsSection />
    </main>
  );
}
