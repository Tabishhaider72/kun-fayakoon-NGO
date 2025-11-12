"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DonatePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#EDEDED] flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl bg-white rounded-2xl shadow-lg p-10 text-center"
        >
          <Image
            src="/logo.png"
            alt="Donate logo"
            width={70}
            height={70}
            className="mx-auto mb-6 rounded-full"
          />
          <h1 className="text-3xl font-bold text-[#111D15] mb-4">
            Support Our Mission 💚
          </h1>
          <p className="text-[#555555] mb-8">
            Your donation helps us empower lives, provide education, clean water, and create lasting change for those in need.
          </p>

          <button className="bg-[#2E8B57] hover:bg-[#267948] text-white px-8 py-3 rounded-lg font-medium shadow-md transition">
            Proceed to Donate
          </button>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
