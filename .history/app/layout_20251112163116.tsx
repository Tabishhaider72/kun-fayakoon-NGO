import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Importing Google Font (Lato from your design system)
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // ✅ valid Lato weights only
  variable: "--font-lato",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "KUN FAYAKOON | NGO for Social Change",
  description:
    "Join KUN FAYAKOON to create lasting impact through compassion, collaboration, and meaningful action for communities in need.",
  keywords: [
    "NGO",
    "Charity",
    "Non-Profit",
    "Social Work",
    "Donations",
    "Community",
    "Volunteering",
  ],
  authors: [{ name: "KUN FAYAKOON Team" }],
  openGraph: {
    title: "KUN FAYAKOON | Building a Brighter Future",
    description:
      "Together, we create positive change through compassion and collaboration.",
    url: "https://KUNFAYAKOON.org",
    siteName: "KUN FAYAKOON",
    images: [
      {
        url: "/hero-main.png",
        width: 1200,
        height: 630,
        alt: "KUN FAYAKOON NGO",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} font-sans bg-[#FFFFFF] text-[#111D15] antialiased selection:bg-[#2E8B57]/10 selection:text-[#2E8B57]`}
      >
        {/* Global Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer placeholder (can add later) */}
      </body>
    </html>
  );
}
