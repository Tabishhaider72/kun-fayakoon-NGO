"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaGraduationCap,
  FaHandHoldingMedical,
  FaLeaf,
  FaAppleAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const cards = [
  {
    id: 1,
    icon: <FaGraduationCap className="text-[#F4A261] text-4xl mb-4" />,
    title: "Education",
    desc: "Empowering future leaders through access to quality education.",
  },
  {
    id: 2,
    icon: <FaHandHoldingMedical className="text-[#F4A261] text-4xl mb-4" />,
    title: "Healthcare",
    desc: "Providing essential healthcare services to underserved communities.",
  },
  {
    id: 3,
    icon: <FaLeaf className="text-[#F4A261] text-4xl mb-4" />,
    title: "Environmental",
    desc: "Promoting sustainability and protecting natural resources.",
  },
  {
    id: 4,
    icon: <FaAppleAlt className="text-[#F4A261] text-4xl mb-4" />,
    title: "Hunger",
    desc: "Fighting hunger by providing nutritious food to those in need.",
  },
];

export default function DonationSection() {
  return (
    <section id="donation-section" className="relative w-full bg-white overflow-hidden py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#F4A261] font-semibold tracking-wide uppercase mb-3"
        >
          Donation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`${openSans.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111D15] leading-snug mb-16`}
        >
          Your Donation Brings Smiles And <br className="hidden sm:block" />{" "}
          Transforms Lives
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-2xl border border-[#EDEDED] shadow-sm hover:shadow-md hover:border-[#F4A261] transition-all duration-300 p-8 flex flex-col items-center text-center"
            >
              {card.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-[#111D15] mb-3">
                {card.title}
              </h3>
              <p className="text-[#555555] text-sm sm:text-base mb-6 leading-relaxed">
                {card.desc}
              </p>
              <Link
                href="#"
                className="inline-flex items-center justify-center text-[#2E8B57] font-medium hover:text-[#267948] transition text-sm sm:text-base"
              >
                See All Campaigns <FaArrowRight className="ml-2 text-xs" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2E8B57] px-6 py-3 sm:px-7 sm:py-3.5 text-white font-medium shadow-sm hover:bg-[#267948] transition"
          >
            View All Category <FaArrowRight className="text-sm" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
