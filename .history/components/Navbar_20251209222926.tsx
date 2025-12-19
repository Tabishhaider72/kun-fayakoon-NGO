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
  FaImages,
} from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { galleryItems } from "@/components/galleryItems";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleDonate = () => {
    setMenuOpen(false);
    router.push("/donate");
  };

  const handleHelp = () => {
    setMenuOpen(false);
    router.push("/help");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-5 sm:px-10 py-4 bg-[#EDEDED] shadow-sm relative"
    >
      {/* Logo Section */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/logo1.jpg"
          alt="KUN FAYAKOON Logo"
          width={45}
          height={45}
          className="rounded-full"
          priority
        />
        <span className="hidden sm:block text-xl font-semibold text-[#111D15] tracking-wide">
          KUN FAYAKOON
        </span>
      </div>

      {/* Mobile “I Need Help” Button */}
      <div className="md:hidden absolute left-1/2 -translate-x-1/2">
        <Button
          onClick={handleHelp}
          className="bg-[#FFFFFF] border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white font-semibold text-sm px-4 py-2 rounded-full shadow-sm transition-all"
        >
          I Need Help →
        </Button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-[#111D15] font-medium">
        <Link href="/" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaHome className="text-[#2E8B57]" /> Home
        </Link>
        <Link href="/#about-section" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaInfoCircle className="text-[#2E8B57]" /> About us
        </Link>
        <Link href="/donate" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaDonate className="text-[#2E8B57]" /> Donations
        </Link>
        <Link href="/#campaigns-section" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaHandsHelping className="text-[#2E8B57]" /> Campaigns
        </Link>
        <Link href="/#blog-section" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaBlog className="text-[#2E8B57]" /> Blogs
        </Link>
        <Link href="/gallery" className="flex items-center gap-2 hover:text-[#2E8B57] transition">
          <FaImages className="text-[#2E8B57]" /> Gallery
        </Link>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Button
          onClick={handleHelp}
          className="bg-white border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white font-semibold px-6 py-2 rounded-full shadow-sm transition-all"
        >
          I Need Help →
        </Button>
        <Button
          onClick={handleDonate}
          className="flex items-center gap-2 bg-[#2E8B57] hover:bg-[#267948] text-white rounded-full px-6 py-2 shadow-md"
        >
          <FaHandHoldingHeart className="text-white text-lg" />
          Donate Now
        </Button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-[#111D15] text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
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
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
            >
              <FaHome className="text-[#2E8B57]" /> Home
            </Link>
            <Link
              href="/#about-section"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
            >
              <FaInfoCircle className="text-[#2E8B57]" /> About us
            </Link>
            <Link
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
            >
              <FaDonate className="text-[#2E8B57]" /> Donations
            </Link>
            <Link
              href="/#campaigns-section"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
            >
              <FaHandsHelping className="text-[#2E8B57]" /> Campaigns
            </Link>
            <Link
              href="/#blog-section"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#111D15] hover:text-[#2E8B57] transition"
            >
              <FaBlog className="text-[#2E8B57]" /> Blogs
            </Link>

            <Button
              onClick={handleHelp}
              className="flex items-center gap-2 bg-white border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white font-medium px-4 py-2 rounded-full shadow-sm transition"
            >
              I Need Help →
            </Button>

            <Button
              onClick={handleDonate}
              className="flex items-center gap-2 bg-[#2E8B57] hover:bg-[#267948] text-white rounded-full px-4 py-2 shadow-md"
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
