"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VolunteerBanner() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width for responsive content
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#EDEDED] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        {/* Border + Rounded Wrapper */}
        <div
          className="rounded-2xl relative w-full overflow-hidden shadow-lg border-[6px]"
          style={{
            borderImage:
              "linear-gradient(90deg, #2E8B57 0%, #2E8B57 50%, #F4A261 50%, #F4A261 100%) 1",
          }}
        >
          {/* Desktop Image */}
          {!isMobile && (
            <Image
              src="/banner.png"
              alt="Volunteers helping"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />
          )}

          {/* Mobile Video */}
          {isMobile && (
            <video
              src="/banner.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover"
            />
          )}

          {/* Buttons overlay */}
          <div className="absolute inset-0 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 px-4">
            <Link
              href="#"
              className="bg-[#2E8B57] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium text-sm sm:text-base shadow-md hover:bg-[#267948] transition"
            >
              Join as a Volunteer
            </Link>
            <Link
              href="#"
              className="bg-[#F4A261] text-[#111D15] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium text-sm sm:text-base shadow-md hover:bg-[#e38f44] transition"
            >
              Donate
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
