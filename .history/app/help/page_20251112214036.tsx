"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function HelpPage() {
  return (
    <>

      <section className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-[#EDEDED] flex flex-col lg:flex-row items-center justify-center px-8 py-20 gap-10">
        {/* ---------- LEFT INSTRUCTION PANEL ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full"
        >
          <h1
            className={`${poppins.className} text-[#111D15] font-extrabold text-4xl sm:text-5xl mb-6 leading-tight`}
          >
            Together, We Bring <span className="text-[#2E8B57]">Hope & Help</span>
          </h1>
          <p className="text-[#555555] text-lg mb-6 leading-relaxed">
            At <span className="font-semibold text-[#2E8B57]">KUN FAYAKOON Trust</span>, 
            we believe that no one should face life’s challenges alone. Whether 
            you need help or want to help others — your support can transform lives.
          </p>

          <div className="space-y-4 text-[#111D15] text-base">
            <p>🌿 Provide support for families in financial distress.</p>
            <p>🎓 Sponsor education for children in underprivileged areas.</p>
            <p>💼 Assist widows and unemployed women with job opportunities.</p>
            <p>💍 Help those in need of marriage or essential aid.</p>
          </div>

          <p className="text-[#555555] mt-6">
            Fill out the form beside to share your situation or express your 
            willingness to contribute. Every story matters — together, we rise. 💚
          </p>
        </motion.div>

        {/* ---------- RIGHT FORM SECTION ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full bg-white shadow-lg rounded-2xl p-8 border border-[#E5E5E5]"
        >
          <h2
            className={`${poppins.className} text-2xl font-bold text-[#111D15] mb-8 text-center`}
          >
            Help Request / Volunteer Form
          </h2>

          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-[#111D15] font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#2E8B57] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#111D15] font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#2E8B57] outline-none"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-[#111D15] font-medium mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#2E8B57] outline-none"
              />
            </div>

            {/* Type of Request */}
            <div>
              <label className="block text-[#111D15] font-medium mb-2">
                How can we assist you?
              </label>
              <select
                className="w-full px-4 py-3 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#2E8B57] outline-none text-[#111D15]"
              >
                <option value="">Select an option</option>
                <option value="education">Education Support</option>
                <option value="job">Job or Employment Help</option>
                <option value="marriage">Marriage Assistance</option>
                <option value="medical">Medical / Financial Help</option>
                <option value="volunteer">I Want to Help Others</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[#111D15] font-medium mb-2">
                Tell Us More
              </label>
              <textarea
                placeholder="Share your situation or how you wish to help..."
                rows={4}
                className="w-full px-4 py-3 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#2E8B57] outline-none resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-[#2E8B57] hover:bg-[#267948] text-white font-semibold px-10 py-3 rounded-full shadow-md transition-all"
              >
                Submit Request
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
