"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { BANK_ACCOUNTS } from "@/lib/config";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-rose/15 last:border-0">
      <div>
        <p className="text-xs text-espresso/50 font-sans uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-espresso font-medium font-sans text-sm md:text-base">
          {value}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="ml-4 p-2.5 rounded-full bg-rose/10 hover:bg-rose/20 text-rose transition-colors flex-shrink-0"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function BankLogo({ name, logo }: { name: string; logo?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  if (!logo || failed) {
    return (
      <div className="w-10 h-10 rounded-full bg-rose/15 flex items-center justify-center text-rose font-serif text-sm font-semibold flex-shrink-0">
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={`${name} logo`}
      className="w-10 h-10 rounded-full object-contain bg-white p-1.5 shadow-sm flex-shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

function BankCard({
  account,
  index,
}: {
  account: (typeof BANK_ACCOUNTS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="bg-cream rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-5">
        <BankLogo name={account.bankName} logo={account.logo} />
        <div>
          <p className="font-serif text-espresso text-lg leading-tight">
            {account.bankName}
          </p>
          <p className="text-rose text-xs tracking-wide font-sans">
            {account.label}
          </p>
        </div>
      </div>
      <CopyField label="Account Name" value={account.accountName} />
      <CopyField label="Account Number" value={account.accountNumber} />
    </motion.div>
  );
}

export default function Gifting() {
  return (
    <section id="gifting" className="bg-butter py-20 md:py-28 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose text-xs tracking-[0.3em] uppercase mb-3 font-sans">
            Your generosity means the world
          </p>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl">
            Gifting
          </h2>
          <div className="mx-auto mt-4 w-12 h-px bg-rose/40" />
          <p className="mt-6 text-espresso/70 font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Your presence is the greatest gift of all. If you&apos;d like to bless us
            additionally, we&apos;d be grateful for a monetary gift — tap the copy
            icon to quickly grab our account details.
          </p>
        </motion.div>

        {/* Bank accounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANK_ACCOUNTS.map((account, i) => (
            <BankCard key={i} account={account} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
