"use client";

import { motion } from "framer-motion";

const galleryItems = [
  {
    title: "Winter Relief Drive",
    subtitle: "Blankets for families sleeping on streets and footpaths.",
    image: "/images/gallery/winter-relief.jpg",
  },
  {
    title: "Warmth for Elders",
    subtitle: "Distributing quilts at old-age homes in the city.",
    image: "/images/gallery/elders.jpg",
  },
  {
    title: "Village Blanket Camp",
    subtitle: "Remote villages receiving first-time winter support.",
    image: "/images/gallery/village-camp.jpg",
  },
  {
    title: "Clothing for Children",
    subtitle: "School uniforms and warm clothes for kids in need.",
    image: "/images/gallery/children-clothes.jpg",
  },
  {
    title: "Community Collection Drive",
    subtitle: "Volunteers sorting donated clothes and blankets.",
    image: "/images/gallery/collection-drive.jpg",
  },
];

export default function BlanketDistributionPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-slate-900">
      {/* HERO / VIDEO OVERLAY SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.35 }}
        className="relative w-full max-w-6xl mx-auto mt-14 overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* Background video */}
        <div className="relative h-[420px] md:h-[520px]">
          <video
            className="h-full w-full object-cover"
            src="/videos/blanket-distribution.mp4"
            poster="/images/thumbnails/blanket-thumb.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Dark gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/15" />
        </div>

        {/* Overlay content */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="pointer-events-auto px-6 md:px-12 lg:px-16 max-w-xl space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] uppercase text-emerald-200 backdrop-blur-md"
            >
              Blanket & Clothing Distribution
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight"
            >
              Spreading Warmth,
              <span className="text-emerald-300"> Preserving Dignity.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-sm md:text-base text-slate-100/85 max-w-lg"
            >
              Every winter, thousands sleep without protection on streets, in
              makeshift shelters, and unfinished homes. Your donation helps us
              deliver warm blankets and clean clothes to families, elders, and
              children who need it the most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition">
                Donate for Warmth
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition">
                Watch Our Story
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-slate-100/80"
            >
              <div>
                <p className="font-semibold text-white">2,500+</p>
                <p>Blankets distributed last winter</p>
              </div>
              <div>
                <p className="font-semibold text-white">1,800+</p>
                <p>Families received clothes</p>
              </div>
              <div>
                <p className="font-semibold text-white">12+</p>
                <p>Cities & villages covered</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* GALLERY SECTION (DESKTOP GRID STYLE LIKE REFERENCE) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-6 md:px-8 lg:px-0 mt-16 mb-20"
      >
        <header className="flex items-baseline justify-between mb-6 md:mb-8">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-emerald-600">
              — Impact Gallery
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
              Moments From the Ground
            </h2>
            <p className="mt-2 text-sm md:text-base max-w-xl text-slate-600">
              A glimpse into the blanket and clothing distributions you make
              possible across shelters, streets, and remote communities.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center text-xs font-medium tracking-wide uppercase text-slate-600 hover:text-slate-900">
            View All Stories
          </button>
        </header>

        <div className="grid gap-5 md:grid-cols-3 auto-rows-[220px]">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.55 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative overflow-hidden rounded-2xl shadow-md bg-slate-900/5 group ${
                index === 3 || index === 4 ? "md:col-span-1 md:row-span-1" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5 opacity-90 group-hover:from-black/80 group-hover:via-black/30 transition" />
              <div className="relative flex h-full flex-col justify-end p-4 md:p-5">
                <h3 className="text-sm md:text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-slate-100/85 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </main>"use client";

import { motion } from "framer-motion";

const galleryItems = [
  {
    title: "Winter Relief Drive",
    subtitle: "Blankets for families sleeping on streets and footpaths.",
    image: "/images/gallery/winter-relief.jpg",
  },
  {
    title: "Warmth for Elders",
    subtitle: "Distributing quilts at old-age homes in the city.",
    image: "/images/gallery/elders.jpg",
  },
  {
    title: "Village Blanket Camp",
    subtitle: "Remote villages receiving first-time winter support.",
    image: "/images/gallery/village-camp.jpg",
  },
  {
    title: "Clothing for Children",
    subtitle: "School uniforms and warm clothes for kids in need.",
    image: "/images/gallery/children-clothes.jpg",
  },
  {
    title: "Community Collection Drive",
    subtitle: "Volunteers sorting donated clothes and blankets.",
    image: "/images/gallery/collection-drive.jpg",
  },
];

export default function BlanketDistributionPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-slate-900">
      {/* HERO / VIDEO OVERLAY SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.35 }}
        className="relative w-full max-w-6xl mx-auto mt-14 overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* Background video */}
        <div className="relative h-[420px] md:h-[520px]">
          <video
            className="h-full w-full object-cover"
            src="/videos/blanket-distribution.mp4"
            poster="/images/thumbnails/blanket-thumb.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Dark gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/15" />
        </div>

        {/* Overlay content */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="pointer-events-auto px-6 md:px-12 lg:px-16 max-w-xl space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] uppercase text-emerald-200 backdrop-blur-md"
            >
              Blanket & Clothing Distribution
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight"
            >
              Spreading Warmth,
              <span className="text-emerald-300"> Preserving Dignity.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-sm md:text-base text-slate-100/85 max-w-lg"
            >
              Every winter, thousands sleep without protection on streets, in
              makeshift shelters, and unfinished homes. Your donation helps us
              deliver warm blankets and clean clothes to families, elders, and
              children who need it the most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition">
                Donate for Warmth
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition">
                Watch Our Story
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-slate-100/80"
            >
              <div>
                <p className="font-semibold text-white">2,500+</p>
                <p>Blankets distributed last winter</p>
              </div>
              <div>
                <p className="font-semibold text-white">1,800+</p>
                <p>Families received clothes</p>
              </div>
              <div>
                <p className="font-semibold text-white">12+</p>
                <p>Cities & villages covered</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* GALLERY SECTION (DESKTOP GRID STYLE LIKE REFERENCE) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-6 md:px-8 lg:px-0 mt-16 mb-20"
      >
        <header className="flex items-baseline justify-between mb-6 md:mb-8">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-emerald-600">
              — Impact Gallery
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
              Moments From the Ground
            </h2>
            <p className="mt-2 text-sm md:text-base max-w-xl text-slate-600">
              A glimpse into the blanket and clothing distributions you make
              possible across shelters, streets, and remote communities.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center text-xs font-medium tracking-wide uppercase text-slate-600 hover:text-slate-900">
            View All Stories
          </button>
        </header>

        <div className="grid gap-5 md:grid-cols-3 auto-rows-[220px]">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.55 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative overflow-hidden rounded-2xl shadow-md bg-slate-900/5 group ${
                index === 3 || index === 4 ? "md:col-span-1 md:row-span-1" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5 opacity-90 group-hover:from-black/80 group-hover:via-black/30 transition" />
              <div className="relative flex h-full flex-col justify-end p-4 md:p-5">
                <h3 className="text-sm md:text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-slate-100/85 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

  );
}
