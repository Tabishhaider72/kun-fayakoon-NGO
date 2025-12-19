// app/gallery/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type GalleryItem = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Tea Tasting",
    subtitle: "Warmth, comfort, and community.",
    image: "/gallery/tea-tasting.jpg",
  },
  {
    id: 2,
    title: "Plethora of Books",
    subtitle: "Spaces of learning and hope.",
    image: "/gallery/books.jpg",
  },
  {
    id: 3,
    title: "Chrysanthemum Farm",
    subtitle: "Fields of color and livelihood.",
    image: "/gallery/farm.jpg",
  },
  {
    id: 4,
    title: "Agricultural Workshops",
    subtitle: "Training families for a better future.",
    image: "/gallery/workshops.jpg",
  },
  {
    id: 5,
    title: "Performances",
    subtitle: "Celebrating culture and unity.",
    image: "/gallery/performances.jpg",
  },
  {
    id: 6,
    title: "A Miniature Village",
    subtitle: "Designing sustainable communities.",
    image: "/gallery/village.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F1] text-[#111D15]">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20">
        {/* Top Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-2"
        >
          <p className="text-sm tracking-[0.25em] text-[#777]">THE LIBRARY</p>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#111D15]" />
            <h1 className="text-2xl font-semibold tracking-wide uppercase">
              Gallery
            </h1>
          </div>
          <p className="mt-2 max-w-xl text-sm text-[#666]">
            A glimpse into our spaces of learning, community gatherings, and
            campaigns that bring hope and dignity to those we serve.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {galleryItems.map((item) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.18)" }}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-80" />
                <div className="pointer-events-none absolute inset-x-4 bottom-3 text-sm text-white">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-200">{item.subtitle}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
