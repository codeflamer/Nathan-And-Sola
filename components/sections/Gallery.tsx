"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/config";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null
          ? null
          : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
      ),
    [],
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % GALLERY_IMAGES.length,
      ),
    [],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close, prev, next]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.classList.add("lightbox-open");
    else document.body.classList.remove("lightbox-open");
    return () => document.body.classList.remove("lightbox-open");
  }, [isOpen]);

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? next() : prev();
    }
  };

  return (
    <section id="gallery" className="bg-butter py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose text-xs tracking-[0.3em] uppercase mb-3 font-sans">
            Moments together
          </p>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl">
            Gallery
          </h2>
          <div className="mx-auto mt-4 w-12 h-px bg-rose/40" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={img.id}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open ${img.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-espresso/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={close}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 text-butter/70 hover:text-butter p-2"
              onClick={close}
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-3 md:left-6 z-10 text-butter/70 hover:text-butter p-3"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              className="relative w-full h-full flex items-center justify-center px-16"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                className="max-h-[85vh] max-w-full object-contain rounded-lg"
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-3 md:right-6 z-10 text-butter/70 hover:text-butter p-3"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-butter/50 text-xs font-sans tracking-widest">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
