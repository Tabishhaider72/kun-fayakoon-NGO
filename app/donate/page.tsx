"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export default function DonatePage() {
  const donateRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleScrollToDonate = () => {
    donateRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFF7ED] to-[#EDEDED] relative overflow-hidden px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Title */}
          <h1
            className={`${poppins.className} text-[#111D15] font-extrabold text-[11vw] sm:text-[8vw] lg:text-[6vw] leading-[1.05] flex flex-wrap justify-center items-center gap-2 sm:gap-5`}
          >
            <span>Hope</span>
            <div className="relative w-[65px] h-[65px] sm:w-[120px] sm:h-[120px] lg:w-[180px] lg:h-[180px] overflow-hidden rounded-full border-[4px] sm:border-[5px] border-[#2E8B57]/30 shadow-lg">
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
            className={`${poppins.className} text-[#111D15] font-extrabold text-[9vw] sm:text-[6.5vw] lg:text-[5vw] mt-1 sm:mt-3`}
          >
            is Support
          </h2>

          {/* Buttons */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mt-10 sm:mt-14">
            <button
              onClick={handleScrollToDonate}
              className="bg-[#2E8B57] hover:bg-[#267948] text-white font-semibold text-sm sm:text-lg px-6 sm:px-10 py-2.5 sm:py-4 rounded-full shadow-md transition-all duration-300"
            >
              Donate
            </button>
            <button
              onClick={() => router.push("/help")}
              className="border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white font-semibold text-sm sm:text-lg px-6 sm:px-10 py-2.5 sm:py-4 rounded-full transition-all duration-300"
            >
              I Need Help →
            </button>
          </div>
        </motion.div>
      </section>

      {/* Donation Form Section */}
      <section
        ref={donateRef}
        className="bg-white w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full max-w-sm sm:max-w-lg bg-[#F8F9F8] rounded-2xl shadow-xl p-5 sm:p-10 text-center border border-[#E5E5E5]"
        >
          <h3
            className={`${poppins.className} text-2xl sm:text-3xl font-bold text-[#111D15] mb-4 sm:mb-6`}
          >
            Make a Donation 💚
          </h3>

          <p className="text-[#555] mb-6 sm:mb-8 text-xs sm:text-base leading-relaxed">
            Every contribution helps us provide education, healthcare, and hope
            to those in need. Enter your amount and choose your preferred way to
            donate.
          </p>

          {/* Donation Input */}
          <div className="mb-5 sm:mb-6">
            <input
              type="number"
              placeholder="Enter Amount (₹)"
              className="w-full border border-[#DADADA] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center text-sm sm:text-lg font-semibold text-[#111D15] focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
            />
          </div>

          {/* Payment Options */}
          <div className="flex flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              id="qrOption"
              onClick={() => {
                const qr = document.getElementById("qrBlock");
                qr?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#2E8B57] text-white hover:bg-[#267948] font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-full transition text-xs sm:text-base"
            >
              Pay using QR Code
            </button>
            <button className="border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-full transition text-xs sm:text-base">
              Pay by Card
            </button>
          </div>

          {/* Fake QR Section */}
          <div id="qrBlock" className="mt-4 sm:mt-6">
            <div className="bg-white p-3 sm:p-6 rounded-xl border border-[#E5E5E5] inline-block shadow-sm">
              <Image
                src="/qr-placeholder.png"
                alt="Fake QR"
                width={100}
                height={100}
                className="rounded-lg sm:w-[160px] sm:h-[160px]"
              />
            </div>
            <p className="text-[#555] text-[11px] sm:text-sm mt-3">
              Scan this QR to complete your donation
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
