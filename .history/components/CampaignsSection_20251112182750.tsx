"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const campaigns = [
  {
    id: 1,
    tag: "Pure Water",
    title: "Clean Water, Bright Futures",
    desc: "Providing safe drinking water to transform lives and bring hope to underprivileged children.",
    img: "/campaign-water.jpg",
    progress: 75,
  },
  {
    id: 2,
    tag: "Healthy Food",
    title: "Nourishing Hope, One Meal At A Time",
    desc: "Bringing healthy, nutritious food to underprivileged children for a brighter, healthier future.",
    img: "/campaign-food.jpg",
    progress: 75,
  },
  {
    id: 3,
    tag: "Medical Care",
    title: "Healing Lives, Spreading Smiles",
    desc: "Providing essential medical care to underprivileged children, ensuring a healthier tomorrow.",
    img: "/campaign-medical.jpg",
    progress: 75,
  },
];

export default function CampaignsSection() {
  return (
    <section className="relative w-full bg-white py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#F4A261] font-semibold tracking-wide uppercase mb-3"
        >
          Campaigns
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`${openSans.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111D15] leading-snug mb-16`}
        >
          Together For Change: Join Our Mission <br className="hidden sm:block" /> To Make A Difference
        </motion.h2>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-2xl border border-[#EDEDED] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Category Tag */}
              <div className="p-6 pb-0 text-left">
                <p className="text-[#2E8B57] text-sm font-semibold mb-1">
                  • {item.tag}
                </p>
                <h3 className="text-[#111D15] text-lg sm:text-xl font-bold leading-snug mb-4">
                  {item.title}
                </h3>
              </div>

              {/* Image */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden rounded-md mx-6 mb-4">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Description */}
              <div className="px-6 text-left flex-1">
                <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center text-xs text-[#111D15] mb-1">
                    <span>Goal</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#EDEDED] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F4A261] rounded-full transition-all duration-700"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <div className="px-6 pb-6 mt-auto text-left">
                <Link
                  href="#"
                  className="inline-flex items-center text-[#2E8B57] font-semibold hover:text-[#267948] transition text-sm sm:text-base"
                >
                  Donate Now! <span className="ml-1">↗</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
