import Hero from "@/components/Hero";
import About from "@/components/AboutSection";
import DonationSection from "@/components/DonationSection";
import DistributionSection from "@/components/DistributionSection";
import CampaignsSection from "@/components/CampaignsSection";
import DonationBreakdown from "@/components/DonationBreakdown";
import BlogSection from "@/components/BlogSection";
import VolunteerBanner from "@/components/VolunteerBanner";
import Footer from "@/components/Footer";

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

      {/* Distribution Section */}
      <DistributionSection />

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

      {/* Volunteer Banner */}
      <section className="bg-[#EDEDED]">
        <VolunteerBanner />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
