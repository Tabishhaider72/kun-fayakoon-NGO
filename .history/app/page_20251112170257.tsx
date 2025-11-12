import Hero from "@/components/Hero";
import About from "@/components/AboutSection";
import DonationSection from "@/components/DonationSection";
import CampaignsSection from "@/components/CampaignsSection";
import DonationBreakdown from "@/components/DonationBreakdown";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="bg-[#FFFFFF]">
        <About />
      </section>

      {/* Donation Section */}
      <section className="bg-[#EDEDED]">
        <DonationSection />
      </section>

      {/* Campaigns Section */}
      <section className="bg-[#FFFFFF]">
        <CampaignsSection />
      </section>

      {/* Donation Breakdown Section */}
      <section className="bg-[#EDEDED]">
        <DonationBreakdown />
      </section>

      {/* Blog Section */}
      <section className="bg-[#FFFFFF]">
        <BlogSection />
      </section>
    </main>
  );
}
