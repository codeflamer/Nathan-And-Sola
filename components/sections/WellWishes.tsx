"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Loader2, AlertCircle } from "lucide-react";

/*
  IMPLEMENTATION NOTE:
  Well Wishes are submitted to the same Google Apps Script endpoint as RSVP,
  but with { type: "wish" } in the payload. The Apps Script writes them to a
  separate "Well Wishes" tab in the same Google Sheet.

  To display wishes publicly on this page, extend the Apps Script to expose a
  doGet() endpoint that returns wishes, then fetch and render them here.
  For now, submissions are stored in the sheet only.
*/

type WishData = {
  name: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function WellWishes() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WishData>();

  const onSubmit = async (data: WishData) => {
    setStatus("loading");
    const endpoint = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

    if (!endpoint || endpoint === "") {
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
      reset();
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "wish", ...data }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-butter border border-rose/30 rounded-xl px-4 py-4 text-espresso placeholder-espresso/40 font-sans text-base focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose transition-colors";

  return (
    <section id="wishes" className="bg-cream py-20 md:py-28 px-5">
      <div className="max-w-lg mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose text-xs tracking-[0.3em] uppercase mb-3 font-sans">
            From your heart to ours
          </p>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl">
            Well Wishes
          </h2>
          <div className="mx-auto mt-4 w-12 h-px bg-rose/40" />
          <p className="mt-5 text-espresso/60 font-sans text-sm max-w-sm mx-auto">
            Leave us a little note — we&apos;ll treasure every word.
          </p>
        </motion.div>

        <motion.div
          className="bg-butter rounded-3xl p-7 md:p-10 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                >
                  <Heart
                    size={52}
                    className="text-rose mx-auto mb-4 fill-rose/20"
                  />
                </motion.div>
                <h3 className="font-serif text-espresso text-2xl mb-2">
                  Thank you!
                </h3>
                <p className="text-espresso/60 font-sans text-sm">
                  Your message means so much to us.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-rose text-sm font-sans underline underline-offset-2"
                >
                  Leave another wish
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name */}
                <div>
                  <label className="block text-xs text-espresso/60 font-sans uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chisom Adeyemi"
                    className={inputClass}
                    {...register("name", { required: "Your name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 font-sans">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-espresso/60 font-sans uppercase tracking-wider mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your heartfelt wishes here…"
                    className={`${inputClass} resize-none`}
                    {...register("message", {
                      required: "Please write a message",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 font-sans">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-sans bg-red-50 rounded-xl px-4 py-3">
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-rose text-butter font-sans text-base py-4 rounded-full flex items-center justify-center gap-2 hover:bg-rose-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-14"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Heart size={16} />
                      Send Your Wishes
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
