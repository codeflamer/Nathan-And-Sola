"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  COUPLE,
  HERO_IMAGE,
  SCRIPTURE,
  HERO_IMAGE_DESKTOP,
} from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/*
        HERO BACKGROUND
        — Replace HERO_IMAGE in lib/config.ts with your photo path (e.g. "/images/hero.jpg")
        — The gradient below is the fallback when no image is set
      */}
      {HERO_IMAGE || HERO_IMAGE_DESKTOP ? (
        <>
          {/* Desktop image (lg and above) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="Solape and Nathan"
            className="absolute inset-0 w-full h-full object-cover lg:hidden"
          />

          {/* Mobile image (below lg) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE_DESKTOP}
            alt="Solape and Nathan"
            className="absolute inset-0 w-full h-full object-contain hidden lg:block"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso/90 to-rose/60" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-espresso/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Badge */}
        <motion.p
          className="text-rose text-xs tracking-[0.35em] uppercase mb-6 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Save the Date
        </motion.p>

        {/* Names */}
        <h1 className="font-serif text-butter text-5xl sm:text-7xl md:text-8xl leading-tight">
          {COUPLE.partner1}
          <span className="block text-rose text-3xl sm:text-4xl md:text-5xl my-2 font-light italic">
            &amp;
          </span>
          {COUPLE.partner2}
        </h1>

        {/* Date */}
        <motion.p
          className="mt-6 text-butter/80 text-sm sm:text-base tracking-[0.2em] uppercase font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {COUPLE.date}
        </motion.p>

        {/* Fine divider */}
        <motion.div
          className="mx-auto mt-6 w-16 h-px bg-rose/60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />

        {/* Scripture */}
        <motion.div
          className="mt-6 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-serif italic text-butter/85 text-sm sm:text-base leading-relaxed">
            {SCRIPTURE.text}
          </p>
          <p className="mt-2 text-rose text-xs tracking-[0.2em] uppercase font-sans">
            {SCRIPTURE.reference}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll chevron */}
      <motion.a
        href="#story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-butter/60 hover:text-butter transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
