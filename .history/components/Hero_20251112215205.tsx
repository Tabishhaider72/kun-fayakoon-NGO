"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* ---------- Left column ---------- */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`${openSans.className} text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-bold leading-snug sm:leading-tight text-[#111D15] max-w-md sm:max-w-xl mx-auto lg:mx-0`}
            >
              Uniting for Change, <br className="hidden sm:block" /> Building a
              Brighter Future
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 sm:mt-5 max-w-xs sm:max-w-md mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-[#555555] leading-relaxed"
            >
              Join us in creating lasting impact through collaboration,
              compassion, and action.
            </motion.p>

            {/* ---------- Buttons ---------- */}
            <div className="mt-6 sm:mt-8 flex flex-row flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-5">
              {/* Primary CTA */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#what-we-do"
                  className="inline-flex items-center justify-center rounded-full bg-[#2E8B57] px-5 py-2.5 sm:px-6 sm:py-3 text-white font-medium text-xs sm:text-sm md:text-base shadow-sm hover:bg-[#267948] transition"
                >
                  What we do
                </Link>
              </motion.div>

              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://chat.whatsapp.com/yourgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full border border-[#EDEDED] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-[#111D15] bg-white hover:bg-[#EDEDED]/80 shadow-sm transition"
              >
                <FaWhatsapp className="text-[#2E8B57] text-sm sm:text-base md:text-lg" />
                Join WhatsApp
              </motion.a>
            </div>
          </div>

          {/* ---------- Right column (images) ---------- */}
          <div className="lg:col-span-6 relative flex justify-center mt-10 lg:mt-0">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[80%] sm:w-[70%] md:w-[65%] lg:w-full max-w-[320px] sm:max-w-md lg:max-w-lg"
            >
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/hero-main.png"
                  alt="hero main"
                  width={540}
                  height={420}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Floating Small Circular Image */}
              <motion.div
                initial={{ y: -6 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-6 sm:-top-8 -left-3 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 sm:border-4 border-white shadow-md"
              >
                <Image
                  src="/hero-small-1.png"
                  alt="small 1"
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </motion.div>

              {/* Floating Small Rounded Image */}
              <motion.div
                initial={{ y: 4 }}
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -bottom-6 sm:-bottom-8 -right-3 sm:-right-6 w-18 h-18 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-3 sm:border-4 border-white shadow-md"
              >
                <Image
                  src="/hero-small-2.png"
                  alt="small 2"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </motion.div>

              {/* Stat Card */}
              <div className="absolute -bottom-6 left-2 sm:left-4 flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white/95 px-3 sm:px-4 py-2 sm:py-3 shadow-md border border-[#EDEDED] backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-semibold text-[#111D15]">
                  150
                </div>
                <div className="text-[10px] sm:text-xs">
                  <div className="text-[#555555] leading-tight">
                    Happy Volunteers
                  </div>
                  <div className="mt-1 flex -space-x-2">
                    {["/avatar-1.png", "/avatar-2.png", "/avatar-3.png"].map(
                      (img, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 overflow-hidden border border-white"
                        >
                          <Image src={img} alt={`a${i}`} width={24} height={24} />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
