"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column: copy + CTA */}
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#111D15] max-w-2xl"
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

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="#what-we-do"
                className="inline-flex items-center justify-center rounded-xl bg-[#2E8B57] px-6 py-3 text-white font-medium shadow-sm hover:bg-[#267948] transition"
              >
                What we do
              </Link>

              <button
                className="inline-flex items-center gap-3 rounded-lg border border-[#EDEDED] px-4 py-2 text-sm font-medium hover:shadow-sm transition"
                aria-label="Play video"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F4A261] text-white font-semibold">
                  ▶
                </span>
                Play Video
              </button>
            </div>
          </div>

          {/* Right column: image collage + stat card */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              {/* main rounded image (placeholder) */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/hero-main.png"
                  alt="hero main"
                  width={640}
                  height={520}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* small circular image top-left */}
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow">
                <Image
                  src="/hero-small-1.png"
                  alt="small 1"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>

              {/* small rounded image bottom-right */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow">
                <Image
                  src="/hero-small-2.png"
                  alt="small 2"
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>

              {/* stat card */}
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-md border border-[#EDEDED]">
                <div className="text-3xl font-semibold text-[#111D15]">150</div>
                <div className="text-sm">
                  <div className="text-xs text-[#555555]">Happy Volunteers</div>
                  <div className="mt-1 flex -space-x-2">
                    {/* avatars placeholders */}
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
