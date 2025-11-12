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
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column */}
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`${openSans.className} text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight text-[#111D15] max-w-2xl`}
            >
              Uniting for Change, <br /> Building a Brighter Future
            </motion.h1>

            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 max-w-xl text-lg text-[#555555]"
            >
              Join us in creating lasting impact through collaboration, compassion,
              and action.
            </motion.p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Primary CTA */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#what-we-do"
                  className="inline-flex items-center justify-center rounded-xl bg-[#2E8B57] px-6 py-3 text-white font-medium shadow-sm hover:bg-[#267948] transition"
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
                className="inline-flex items-center gap-3 rounded-lg border border-[#EDEDED] px-5 py-3 text-sm font-medium text-[#111D15] bg-white hover:bg-[#EDEDED]/60 shadow-sm transition"
              >
                <FaWhatsapp className="text-[#2E8B57] text-lg" />
                Join WhatsApp Group
              </motion.a>
            </div>
          </div>

          {/* Right column: images */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto w-full max-w-sm lg:max-w-lg"
            >
              {/* Main image (slightly smaller now) */}
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

              {/* Larger small circular image */}
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/hero-small-1.png"
                  alt="small 1"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>

              {/* Larger small rounded image */}
              <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/hero-small-2.png"
                  alt="small 2"
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </div>

              {/* Stat card */}
              <div className="absolute -bottom-8 left-6 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-md border border-[#EDEDED] backdrop-blur-sm">
                <div className="text-3xl font-semibold text-[#111D15]">150</div>
                <div className="text-sm">
                  <div className="text-xs text-[#555555]">Happy Volunteers</div>
                  <div className="mt-1 flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden border border-white">
                      <Image src="/avatar-1.png" alt="a" width={28} height={28} />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden border border-white">
                      <Image src="/avatar-2.png" alt="b" width={28} height={28} />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden border border-white">
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
