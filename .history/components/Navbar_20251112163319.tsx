"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-8 py-4 bg-[#EDEDED] shadow-sm"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#2E8B57] rounded-full" /> {/* Placeholder logo */}
        <span className="text-xl font-semibold text-[#111D15]">KUN FAYAKOON</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-[#111D15] font-medium">
        <Link href="#" className="hover:text-[#2E8B57] transition">Home</Link>
        <Link href="#" className="hover:text-[#2E8B57] transition">About us</Link>
        <Link href="#" className="hover:text-[#2E8B57] transition">Donations</Link>
        <Link href="#" className="hover:text-[#2E8B57] transition">Campaigns</Link>
        <Link href="#" className="hover:text-[#2E8B57] transition">Blogs</Link>
      </div>

      {/* CTA Button */}
      <Button className="bg-[#2E8B57] hover:bg-[#267948] text-white rounded-md px-5 py-2">
        Donate Now →
      </Button>
    </motion.nav>
  );
}
