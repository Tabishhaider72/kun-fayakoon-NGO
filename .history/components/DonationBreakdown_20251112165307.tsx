"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

type Slice = { label: string; value: number; color: string };

const DATA: Slice[] = [
  { label: "Healthy Food", value: 37, color: "#2E8B57" }, // dark green
  { label: "Medicine", value: 20, color: "#F4A261" }, // orange
  { label: "Pure Water", value: 17, color: "#FCE8A8" }, // light yellow
  { label: "Excursions", value: 13, color: "#EAF6C9" }, // pale green
  { label: "Feeding the poor", value: 13, color: "#94D36A" }, // mid green
];

export default function DonationBreakdown() {
  const size = 300;
  const radius = 90;
  const stroke = 36;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Intersection observer
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const total = useMemo(() => DATA.reduce((sum, d) => sum + d.value, 0), []);

  // Precompute slice offsets immutably
  const slices = useMemo(() => {
    let cumulative = 0;
    return DATA.map((slice) => {
      const sliceLength = (slice.value / total) * circumference;
      const offset = circumference - (cumulative / total) * circumference;
      cumulative += slice.value;
      return { ...slice, sliceLength, offset };
    });
  }, [total, circumference]);

  return (
    <section
      ref={ref}
      className="w-full bg-[#EDEDED] py-16 px-6 sm:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* ---------- LEFT COLUMN ---------- */}
        <div className="lg:w-1/2">
          <p className="text-[#F4A261] font-semibold tracking-wide uppercase mb-3">
            Transparency & Impact
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111D15] leading-snug mb-4">
            Where Your Giving Goes: <br className="hidden sm:block" />
            Transparency & Impact
          </h2>

          <p className="text-sm sm:text-base text-[#555555] mb-8 max-w-xl">
            Ensuring every donation makes a real difference — see how your
            generosity transforms lives.
          </p>

          {/* ---------- LEGEND ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
            {DATA.map((d) => {
              const pct = Math.round((d.value / total) * 100);
              return (
                <div key={d.label} className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-sm"
                    style={{
                      background: d.color,
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                    }}
                    aria-hidden
                  />
                  <div>
                    <div className="text-sm text-[#111D15] font-medium">
                      {pct}% {d.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- RIGHT COLUMN ---------- */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-[320px] h-[320px] flex items-center justify-center relative">
            {/* ---------- SVG DONUT ---------- */}
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              role="img"
              aria-label="Donation distribution donut chart"
            >
              <defs>
                <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="6"
                    stdDeviation="10"
                    floodColor="#000"
                    floodOpacity="0.06"
                  />
                </filter>
              </defs>

              {/* background ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="#F3F3F3"
                strokeWidth={stroke}
                fill="none"
              />

              {/* dynamic slices */}
              {slices.map((slice, idx) => (
                <motion.circle
                  key={slice.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={slice.color}
                  strokeWidth={stroke}
                  strokeLinecap="butt"
                  fill="none"
                  transform={`rotate(-90 ${center} ${center})`}
                  strokeDasharray={`${slice.sliceLength} ${
                    circumference - slice.sliceLength
                  }`}
                  strokeDashoffset={slice.offset}
                  initial={{ strokeDashoffset: circumference }}
                  animate={controls}
                  variants={{
                    visible: { strokeDashoffset: slice.offset - 0 },
                  }}
                  transition={{
                    duration: 1.1,
                    delay: idx * 0.12,
                    ease: "easeOut",
                  }}
                  style={{ filter: "url(#softShadow)" }}
                />
              ))}

              {/* inner white circle */}
              <circle
                cx={center}
                cy={center}
                r={radius - stroke - 6}
                fill="#ffffff"
              />
            </svg>

            {/* center label */}
            <div className="absolute text-center pointer-events-none">
              <div className="text-lg font-semibold text-[#111D15]">Impact</div>
              <div className="text-sm text-[#555555]">
                Donation distribution
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
