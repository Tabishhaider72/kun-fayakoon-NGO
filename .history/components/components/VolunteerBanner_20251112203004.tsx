"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VolunteerBanner() {
  return (
    <section className="relative w-full py-16 bg-[#FFFFFF] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-lg w-full">
          <Image
            src="/banner.png"
            alt="Volunteers helping"
            width={1200}
            height={600}
            className="w-full h-auto object-cover rounded-2xl"
            priority
          />

          {/* Buttons overlay */}
          <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#"
              className="bg-[#2E8B57] text-white px-8 py-3 rounded-md font-medium shadow-md hover:bg-[#267948] transition"
            >
              Join as a Volunteer
            </Link>
            <Link
              href="#"
              className="bg-[#F4A261] text-[#111D15] px-8 py-3 rounded-md font-medium shadow-md hover:bg-[#e38f44] transition"
            >
              Donate
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

