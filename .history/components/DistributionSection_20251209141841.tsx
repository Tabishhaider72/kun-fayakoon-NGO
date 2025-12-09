"use client";

import { motion } from "framer-motion";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function DistributionSection() {
  return (
    <section id="distribution-section" className="relative w-full h-screen md:h-[600px] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/blanket.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-20 md:py-0">
        <div className="max-w-3xl mx-auto text-center">
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`${openSans.className} text-[#F4A261] font-semibold tracking-wide uppercase mb-4 text-xs sm:text-sm`}
          >
            Mission
          </motion.p>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className={`${openSans.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 sm:mb-8`}
          >
            Bringing Warmth, Dignity, and Hope to Vulnerable Communities.
          </motion.h2>

          {/* Purpose Message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <p className={`${openSans.className} text-base sm:text-lg text-gray-100 leading-relaxed`}>
              Every winter, thousands struggle to survive the harsh cold without protection.
              Our mission is to provide essential blankets, warm clothing, and compassionate support to those forced to sleep in streets, shelters, or unsafe conditions.
            </p>

            <p className={`${openSans.className} text-base sm:text-lg text-gray-100 leading-relaxed font-semibold`}>
              Your contribution helps us reach more people, restore dignity, and offer warmth when it is needed most.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
