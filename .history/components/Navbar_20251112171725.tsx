"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaHome, FaInfoCircle, FaDonate, FaHandsHelping, FaBlog } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-10 py-5 bg-[#EDEDED] shadow-sm"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="KUN FAYAKOON Logo"
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
        <span className="text-xl font-semibold text-[#111D15] tracking-wide">
          KUN FAYAKOON
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-[#111D15] font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 hover:text-[#2E8B57] transition"
        >
          <FaHome className="text-[#2E8B57]" /> Home
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:text-[#2E8B57] transition"
        >
          <FaInfoCircle className="text-[#2E8B57]" /> About us
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:text-[#2E8B57] transition"
        >
          <FaDonate className="text-[#2E8B57]" /> Donations
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:text-[#2E8B57] transition"
        >
          <FaHandsHelping className="text-[#2E8B57]" /> Campaigns
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 hover:text-[#2E8B57] transition"
        >
          <FaBlog className="text-[#2E8B57]" /> Blogs
        </Link>
      </div>

      {/* CTA Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button className="flex items-center gap-2 bg-[#2E8B57] hover:bg-[#267948] text-white rounded-md px-6 py-2 shadow-md">
          <FaHandHoldingHeart className="text-white text-lg" />
          Donate Now
        </Button>
      </motion.div>
    </motion.nav>
  );
}
