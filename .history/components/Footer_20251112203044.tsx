"use client";

import Image from "next/image";
import { FaInstagram, FaTwitter, FaDribbble, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111D15] text-[#EDEDED] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="KUN FAYAKOON Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="text-xl font-bold text-white">KUN FAYAKOON</h3>
          </div>
          <p className="text-sm text-[#CCCCCC] leading-relaxed">
            KUN FAYAKOON: Bringing People Together to Create Lasting Change.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2E8B57] hover:bg-[#267948] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2E8B57] hover:bg-[#267948] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2E8B57] hover:bg-[#267948] transition"
            >
              <FaDribbble />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2E8B57] hover:bg-[#267948] transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-2 text-[#CCCCCC]">
            <li><a href="#" className="hover:text-[#F4A261] transition">Home</a></li>
            <li><a href="#" className="hover:text-[#F4A261] transition">About us</a></li>
            <li><a href="#" className="hover:text-[#F4A261] transition">Donations</a></li>
            <li><a href="#" className="hover:text-[#F4A261] transition">Campaigns</a></li>
            <li><a href="#" className="hover:text-[#F4A261] transition">Blogs</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
          <ul className="space-y-2 text-[#CCCCCC]">
            <li><a href="#" className="hover:text-[#F4A261] transition">Help Center</a></li>
            <li><a href="#" className="hover:text-[#F4A261] transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-[#F4A261] transition">Legal</a></li>
            <li><a href="#" className="hover:text-[#F4A261] transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Stay up to date</h4>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md bg-[#1B3A3A] text-sm focus:outline-none placeholder:text-[#AAAAAA]"
            />
            <button
              type="submit"
              className="bg-[#2E8B57] hover:bg-[#267948] text-white px-4 py-2 rounded-md"
            >
              ➤
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-[#AAAAAA] text-sm border-t border-[#2E8B57]/20 pt-6">
        © 2025 KUN FAYAKOON. All Rights Reserved.
      </div>
    </footer>
  );
}
