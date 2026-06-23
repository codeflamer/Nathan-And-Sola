"use client";

import { motion } from "framer-motion";
import { STORY } from "@/lib/config";

function StoryCard({
  label,
  text,
  image,
  index,
}: {
  label: string;
  text: string;
  image: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col bg-butter rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
        <span className="absolute bottom-4 left-4 font-serif text-butter text-lg italic">
          {label}
        </span>
      </div>

      {/* Text */}
      <div className="p-6 md:p-8">
        <p className="text-espresso/80 leading-relaxed text-sm md:text-base font-sans">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export default function OurStory() {
  return (
    <section id="story" className="bg-cream py-20 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose text-xs tracking-[0.3em] uppercase mb-3 font-sans">
            How it all began
          </p>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl">
            Our Story
          </h2>
          <div className="mx-auto mt-4 w-12 h-px bg-rose/40" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StoryCard
            label={STORY.solape.label}
            text={STORY.solape.text}
            image={STORY.solape.image}
            index={0}
          />
          <StoryCard
            label={STORY.nathan.label}
            text={STORY.nathan.text}
            image={STORY.nathan.image}
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
