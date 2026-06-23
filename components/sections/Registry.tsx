"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { REGISTRY_ITEMS, WA_NUMBER as WA_NUMBER_DEFAULT, WA_MESSAGE_TEMPLATE } from "@/lib/config";

function RegistryCard({
  item,
  index,
}: {
  item: (typeof REGISTRY_ITEMS)[0];
  index: number;
}) {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? WA_NUMBER_DEFAULT;
  const message = WA_MESSAGE_TEMPLATE(item.name);
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="bg-cream rounded-2xl overflow-hidden shadow-sm flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-espresso text-lg leading-snug mb-1">
          {item.name}
        </h3>
        {item.note && (
          <p className="text-espresso/60 text-xs font-sans mb-4">{item.note}</p>
        )}

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 bg-rose text-butter text-sm font-sans py-3 px-5 rounded-full hover:bg-rose-dark transition-colors"
        >
          <MessageCircle size={15} />
          Gift This
        </a>
      </div>
    </motion.div>
  );
}

export default function Registry() {
  return (
    <section id="registry" className="bg-cream py-20 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose text-xs tracking-[0.3em] uppercase mb-3 font-sans">
            Start our new chapter together
          </p>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl">
            Registry
          </h2>
          <div className="mx-auto mt-4 w-12 h-px bg-rose/40" />
          <p className="mt-5 text-espresso/70 font-sans text-sm max-w-md mx-auto">
            Tap &ldquo;Gift This&rdquo; on any item to send us a quick WhatsApp message — we
            ll coordinate from there.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGISTRY_ITEMS.map((item, i) => (
            <RegistryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
