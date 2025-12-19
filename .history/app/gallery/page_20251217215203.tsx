import GalleryDynamic from "@/components/GalleryDynamic";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-slate-900">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111D15] mb-4">
              Our Gallery
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A glimpse into our community initiatives, relief efforts, and the
              lives we've touched through our campaigns.
            </p>
          </div>
          <GalleryDynamic />
        </div>
      </section>
    </main>
  );
}
