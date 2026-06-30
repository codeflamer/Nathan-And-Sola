"use client";

import { motion } from "framer-motion";
import { Heart, PartyPopper, MapPin, Clock, Sparkles } from "lucide-react";
import { CEREMONY, RECEPTION, DRESS_CODE, COUPLE } from "@/lib/config";

const events = [
  {
    icon: Heart,
    title: "Ceremony",
    time: CEREMONY.time,
    venue: CEREMONY.name,
    address: CEREMONY.address,
    mapsUrl: CEREMONY.mapsUrl,
  },
  {
    icon: PartyPopper,
    title: "Reception",
    time: RECEPTION.time,
    venue: RECEPTION.name,
    address: RECEPTION.address,
    mapsUrl: RECEPTION.mapsUrl,
  },
];

export default function WeddingDetails() {
  return (
    <section id="details" className="bg-cream py-20 md:py-28 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        {/* <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose text-xs tracking-[0.3em] uppercase mb-3 font-sans">
            Mark your calendars
          </p>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl">
            Wedding Details
          </h2>
          <div className="mx-auto mt-4 w-12 h-px bg-rose/40" />
          <p className="mt-5 text-espresso/70 font-sans text-sm tracking-wide">
            {COUPLE.date}
          </p>
        </motion.div> */}

        {/* Timeline */}
        {/* <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-rose/25 -translate-x-1/2" />

          <div className="space-y-10 md:space-y-0">
            {events.map((event, i) => {
              const Icon = event.icon;
              const isRight = i % 2 === 0;

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="md:grid md:grid-cols-2 md:gap-12 md:mb-14 items-center"
                >
               
                  <div
                    className={`bg-cream rounded-2xl p-6 shadow-sm ${
                      isRight
                        ? "md:col-start-1"
                        : "md:col-start-2 md:row-start-1"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-rose/15 flex items-center justify-center">
                        <Icon size={16} className="text-rose" />
                      </div>
                      <h3 className="font-serif text-espresso text-xl">
                        {event.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-espresso/70 text-sm mb-2 font-sans">
                      <Clock size={14} className="text-rose/70 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    <p className="text-espresso font-medium text-sm mb-1 font-sans">
                      {event.venue}
                    </p>

                    {event.address && (
                      <div className="flex items-start gap-2 text-espresso/60 text-sm mb-4 font-sans">
                        <MapPin
                          size={14}
                          className="text-rose/70 flex-shrink-0 mt-0.5"
                        />
                        <span>{event.address}</span>
                      </div>
                    )}

                    {event.mapsUrl && (
                      <a
                        href={event.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-rose border border-rose/40 rounded-full px-4 py-1.5 hover:bg-rose hover:text-butter transition-colors font-sans"
                      >
                        <MapPin size={12} />
                        View on Google Maps
                      </a>
                    )}
                  </div>

                
                  <div
                    className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose border-4 border-butter`}
                    style={{ top: `calc(${i} * (100% / 3) + 2rem)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div> */}

        {/* Dress code */}
        <motion.div
          className="mt-0 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* <hr className="divider mb-8" /> */}
          <p className="text-xs text-rose tracking-[0.3em] uppercase font-sans mb-6">
            Dress Code
          </p>

          <div className="flex items-center justify-center gap-8 mb-6">
            {DRESS_CODE.colors.map((color, i) => (
              <motion.div
                key={color.name}
                className="flex flex-col items-center gap-2.5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <span
                  className="block w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg ring-2 ring-white/70"
                  style={{
                    backgroundImage: color.swatch,
                    boxShadow:
                      "0 4px 18px rgba(0,0,0,0.12), inset 0 1px 3px rgba(255,255,255,0.6)",
                  }}
                />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-espresso/60 font-sans">
                  {color.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-rose/70 mb-2">
            <Sparkles size={14} />
          </div>
          <p className="font-serif italic text-espresso text-2xl sm:text-3xl">
            {DRESS_CODE.label}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
