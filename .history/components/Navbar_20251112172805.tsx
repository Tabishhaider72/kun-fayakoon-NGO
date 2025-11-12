"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHandHoldingHeart,
  FaHome,
  FaInfoCircle,
  FaDonate,
  FaHandsHelping,
  FaBlog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-6 sm:px-10 py-4 bg-[#EDEDED] shadow-sm relative"
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
        {/* Hide brand text on mobile */}
        <span className="hidden sm:block text-xl font-semibold text-[#111D15] tracking-wide">
          KUN FAYAKOON
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-[#111D15] font-medium">
        <Link href="#" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaHome className="text-[#2E8B57]" /> Home
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaInfoCircle className="text-[#2E8B57]" /> About us
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaDonate className="text-[#2E8B57]" /> Donations
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaHandsHelping className="text-[#2E8B57]" /> Campaigns
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaBlog className="text-[#2E8B57]" /> Blogs
        </Link>
      </div>

      {/* Desktop CTA Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:block"
      >
        <Button className="flex items-center gap-2 bg-[#2E8B57] hover:bg-[#267948] text-white rounded-md px-6 py-2 shadow-md">
          <FaHandHoldingHeart className="text-white text-lg" />
          Donate Now
        </Button>
      </motion.div>

      {/* Mobile Hamburger Icon */}
      <button
        className="md:hidden text-[#111D15] text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[72px] right-4 w-56 rounded-l-3xl rounded-br-3xl bg-white shadow-xl border border-[#EDEDED] py-5 flex flex-col gap-4 px-6 z-50"
          >
            <Link
              href="#"
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaHome className="text-[#2E8B57]" /> Home
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaInfoCircle className="text-[#2E8B57]" /> About us
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaDonate className="text-[#2E8B57]" /> Donations
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaHandsHelping className="text-[#2E8B57]" /> Campaigns
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaBlog className="text-[#2E8B57]" /> Blogs
            </Link>
            <Button
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center gap-2 bg-[#2E8B57] hover:bg-[#267948] text-white rounded-md px-4 py-2 shadow-md"
            >
              <FaHandHoldingHeart className="text-white" />
              Donate Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
