import { COUPLE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-espresso py-16 px-5 text-center">
      {/* Monogram */}
      <p className="font-serif text-5xl text-rose mb-4 tracking-widest select-none">
        {COUPLE.monogram}
      </p>

      <hr className="mx-auto w-12 border-rose/30 mb-6" />

      {/* Names + date */}
      <p className="font-serif text-butter/90 text-lg tracking-wide">
        {COUPLE.partner1} &amp; {COUPLE.partner2}
      </p>
      <p className="text-butter/50 text-xs font-sans tracking-[0.2em] uppercase mt-2">
        {COUPLE.date}
      </p>

      {/* Closing line */}
      <p className="mt-8 text-butter/30 text-xs font-sans tracking-wide">
        Made with love for {COUPLE.partner1} &amp; {COUPLE.partner2}&apos;s wedding
      </p>
    </footer>
  );
}
