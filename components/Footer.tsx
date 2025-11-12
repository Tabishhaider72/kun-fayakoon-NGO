"use client";

import Image from "next/image";
import { FaInstagram, FaTwitter, FaDribbble, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111D15] text-[#EDEDED] pt-12 sm:pt-16 pb-6 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        
        {/* Brand Section */}
        <div className="text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-5">
            <Image
              src="/logo.png"
              alt="KUN FAYAKOON Logo"
              width={70}
              height={70}
              className="rounded-full shadow-md w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px]"
              priority
            />
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mt-2 sm:mt-0">
              KUN FAYAKOON
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed max-w-xs mx-auto sm:mx-0">
            KUN FAYAKOON: Bringing People Together to Create Lasting Change.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start items-center gap-3 sm:gap-4 mt-5">
            {[FaInstagram, FaTwitter, FaDribbble, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#2E8B57] hover:bg-[#267948] transition"
              >
                <Icon size={14} className="sm:text-[16px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
            Company
          </h4>
          <ul className="space-y-1.5 sm:space-y-2 text-[#CCCCCC] text-sm sm:text-base">
            {["Home", "About us", "Donations", "Campaigns", "Blogs"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#F4A261] transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support Links */}
        <div className="text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
            Support
          </h4>
          <ul className="space-y-1.5 sm:space-y-2 text-[#CCCCCC] text-sm sm:text-base">
            {[
              "Help Center",
              "Terms of Service",
              "Legal",
              "Privacy Policy",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[#F4A261] transition duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
            Stay up to date
          </h4>
          <form className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-md bg-[#1B3A3A] text-xs sm:text-sm focus:outline-none placeholder:text-[#AAAAAA]"
            />
            <button
              type="submit"
              className="bg-[#2E8B57] hover:bg-[#267948] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-sm sm:text-base transition"
            >
              ➤
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 sm:mt-12 text-center text-[#AAAAAA] text-xs sm:text-sm border-t border-[#2E8B57]/20 pt-4 sm:pt-6">
        © 2025 KUN FAYAKOON. All Rights Reserved.
      </div>
    </footer>
  );
}
