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
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* ---------- Left column ---------- */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`${openSans.className} text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-snug md:leading-tight text-[#111D15] max-w-xl mx-auto lg:mx-0`}
            >
              Uniting for Change, <br className="hidden sm:block" /> Building a
              Brighter Future
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 sm:mt-6 max-w-md mx-auto lg:mx-0 text-base sm:text-lg text-[#555555] leading-relaxed"
            >
              Join us in creating lasting impact through collaboration, compassion,
              and action.
            </motion.p>

            {/* ---------- Buttons ---------- */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-5">
              {/* Primary CTA */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#what-we-do"
                  className="inline-flex items-center justify-center rounded-lg bg-[#2E8B57] px-6 py-3 sm:px-7 sm:py-3.5 text-white font-medium text-sm sm:text-base shadow-sm hover:bg-[#267948] transition"
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
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-[#EDEDED] px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-[#111D15] bg-white hover:bg-[#EDEDED]/70 shadow-sm transition w-full sm:w-auto"
              >
                <FaWhatsapp className="text-[#2E8B57] text-lg sm:text-xl" />
                Join WhatsApp Group
              </motion.a>
            </div>
          </div>

          {/* ---------- Right column (images) ---------- */}
          <div className="lg:col-span-6 relative flex justify-center mt-10 lg:mt-0">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-full max-w-sm sm:max-w-md lg:max-w-lg"
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
                initial={{ y: -8 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-8 sm:-top-10 -left-5 sm:-left-8 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
              >
                <Image
                  src="/hero-small-1.png"
                  alt="small 1"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </motion.div>

              {/* Floating Small Rounded Image */}
              <motion.div
                initial={{ y: 6 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -bottom-8 sm:-bottom-10 -right-5 sm:-right-8 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-lg"
              >
                <Image
                  src="/hero-small-2.png"
                  alt="small 2"
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </motion.div>

              {/* Stat Card */}
              <div className="absolute -bottom-8 left-3 sm:left-6 flex items-center gap-3 rounded-xl bg-white/95 px-3 sm:px-4 py-2 sm:py-3 shadow-md border border-[#EDEDED] backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-semibold text-[#111D15]">
                  150
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="text-[11px] sm:text-xs text-[#555555]">
                    Happy Volunteers
                  </div>
                  <div className="mt-1 flex -space-x-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 overflow-hidden border border-white">
                      <Image src="/avatar-1.png" alt="a" width={28} height={28} />
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 overflow-hidden border border-white">
                      <Image src="/avatar-2.png" alt="b" width={28} height={28} />
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 overflow-hidden border border-white">
                      <Image src="/avatar-3.png" alt="c" width={28} height={28} />
                    </div>
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
