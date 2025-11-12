"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";
import { FaHandsHelping, FaTint, FaHeart, FaChild } from "react-icons/fa";

export default function BlogSection() {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start("visible");
      },
      { threshold: 0.2 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, controls]);

  const blogs = useMemo(
    () => [
      {
        date: "20 Jan, 2025",
        title: "Providing Food, Clean Water, and Medical Care",
        desc: "Ensuring no child suffers from hunger, thirst, or lack of medical care — because every life matters.",
        icon: <FaHandsHelping className="text-[#F4A261] text-5xl" />,
      },
      {
        date: "25 Jan, 2025",
        title: "No One Should Go Hungry, Thirsty, or Without Treatment",
        desc: "Providing essential food, clean water, and life-saving treatment to build a healthier future.",
        icon: <FaTint className="text-[#2E8B57] text-5xl" />,
      },
      {
        date: "30 Jan, 2025",
        title: "Nutritious Meals, Safe Water, and Healthcare for Children",
        desc: "Together, we can nourish, heal, and bring hope to those who need it most.",
        icon: <FaChild className="text-[#111D15] text-5xl" />,
      },
    ],
    []
  );

  return (
    <section
      ref={setRef}
      className="w-full bg-[#FFFFFF] py-20 px-6 sm:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto text-center mb-14">
        <p className="text-[#F4A261] font-semibold tracking-wider uppercase mb-2">
          From The Blog
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111D15]">
          Our Latest News And Articles
        </h2>
      </div>

      {/* Blog Cards */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.15 },
          },
        }}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-[#1B3A3A] text-white rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-8 flex flex-col items-center text-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                {blog.icon}
              </div>

              <div className="bg-[#FFFFFF]/20 text-sm px-4 py-1 rounded-md">
                {blog.date}
              </div>

              <h3 className="text-xl font-semibold leading-snug">
                {blog.title}
              </h3>
              <p className="text-[#EDEDED] text-sm leading-relaxed">
                {blog.desc}
              </p>
            </div>

            <div className="border-t border-white/20 mt-auto">
              <button className="w-full py-3 rounded-b-2xl text-[#2E8B57] bg-white hover:bg-[#EDEDED] font-medium transition">
                Read more →
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Blogs Button */}
      <div className="flex justify-center mt-12">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-[#2E8B57] text-white rounded-full px-7 py-3 font-medium shadow-sm hover:bg-[#267948] transition"
        >
          View All Blogs →
        </motion.a>
      </div>
    </section>
  );
}
