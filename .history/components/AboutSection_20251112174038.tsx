"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Smooth fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-section"
      className="relative w-full bg-white overflow-hidden px-6 sm:px-10 lg:px-16 py-20 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto"
      >
        {/* ---------- Left Content ---------- */}
        <div className="lg:col-span-6 text-center lg:text-left">
          <p className="text-[#F4A261] font-semibold tracking-widest uppercase text-sm sm:text-base mb-3">
            Know About Us
          </p>

          <h2
            className={`${openSans.className} text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug text-[#111D15] mb-6`}
          >
            Creating a Safe Haven for <br className="hidden sm:block" />
            Children with Special Needs
          </h2>

          <p className="text-[#555555] text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            At <span className="font-semibold text-[#2E8B57]">KUN FAYAKOON</span>, we are dedicated to creating a nurturing environment where children with special needs receive the care, support, and resources they deserve. Through personalized programs and a community-driven approach, we empower every child to overcome challenges, unlock their potential, and build a brighter future.
          </p>

          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-[#2E8B57] px-6 py-3 sm:px-7 sm:py-3.5 text-white font-medium text-sm sm:text-base shadow-sm hover:bg-[#267948] transition"
          >
            Learn more
          </Link>
        </div>

        {/* ---------- Right Video Section ---------- */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[85%] max-w-lg rounded-2xl overflow-hidden shadow-lg"
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/about-thumb.jpg" // fallback thumbnail
              onMouseEnter={() => videoRef.current?.play()}
              onMouseLeave={() => videoRef.current?.pause()}
              className="rounded-2xl w-full h-auto object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            >
              <source src="/about-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/90 text-[#2E8B57] rounded-full flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6 sm:w-7 sm:h-7"
                >
                  <path d="M6.79 5.093A.5.5 0 0 1 7.5 5.5v5a.5.5 0 0 1-.79.407L4.5 8.972V7.028l2.29-1.935zM8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
