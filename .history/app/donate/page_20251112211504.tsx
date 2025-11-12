"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function DonatePage() {
  return (
    <>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFF9F2] to-[#EDEDED] relative overflow-hidden px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Main Title */}
          <h1
            className={`${poppins.className} text-[#111D15] font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-[1.1] flex flex-wrap justify-center items-center gap-3`}
          >
            <span>Hope</span>
            <div className="relative w-36 sm:w-44 h-24 sm:h-28 overflow-hidden rounded-[50%]">
              <Image
                src="/donate-hero.png"
                alt="Donation Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span>Rise</span>
          </h1>

          <h2
            className={`${poppins.className} text-[#111D15] text-5xl sm:text-6xl lg:text-7xl font-extrabold mt-4`}
          >
            is Support
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="#"
              className="bg-[#2E8B57] hover:bg-[#267948] text-white font-semibold text-lg px-10 py-3.5 rounded-full shadow-md transition-all duration-300"
            >
              Donate
            </Link>
            <Link
              href="#"
              className="border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white font-semibold text-lg px-10 py-3.5 rounded-full transition-all duration-300"
            >
              I Need Help →
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
