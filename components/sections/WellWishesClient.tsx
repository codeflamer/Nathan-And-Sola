"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  motion,
  AnimatePresence,
  useAnimate,
  type AnimationPlaybackControlsWithThen,
} from "framer-motion";
import { Heart, Loader2, AlertCircle } from "lucide-react";
import { Wish } from "./WellWishes";

function WishesMarquee({ wishes }: { wishes: Wish[] }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const playback = useRef<AnimationPlaybackControlsWithThen | null>(null);

  useEffect(() => {
    if (!scope.current) return;
    const controls = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      { duration: 38, ease: "linear", repeat: Infinity, repeatType: "loop" },
    );
    playback.current = controls;
    return () => controls.cancel();
  }, [animate]);

  if (wishes.length === 0) {
    return (
      <p className="text-center text-espresso/50 font-sans text-sm mb-10">
        Be the first to leave a wish below 💛
      </p>
    );
  }

  const doubled = [...wishes];

  return (
    <motion.div
      className="max-w-5xl mx-auto overflow-hidden mb-10"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <div
        ref={scope}
        className="flex gap-4 w-max"
        onMouseEnter={() => playback.current?.pause()}
        onMouseLeave={() => playback.current?.play()}
      >
        {doubled.map((wish, i) => (
          <div
            key={`${wish.name}-${i}`}
            className="bg-butter rounded-2xl px-5 py-4 shadow-sm min-w-[280px] max-w-[320px] inline-flex flex-col gap-2 shrink-0"
          >
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-rose fill-rose/20 shrink-0" />
              <span className="font-serif text-espresso text-sm font-semibold leading-snug">
                {wish.name}
              </span>
            </div>
            <p className="font-sans text-espresso/60 text-sm leading-relaxed">
              {wish.message}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

type WishData = {
  name: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function WellWishesClient({ wishes }: { wishes: Wish[] }) {
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

    try {
      const res = await fetch(endpoint!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({ type: "wellwish", ...data }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setStatus("success");
    }
  };

  const inputClass =
    "w-full bg-butter border border-rose/30 rounded-xl px-4 py-4 text-espresso placeholder-espresso/40 font-sans text-base focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose transition-colors";

  return (
    <section id="wishes" className="bg-cream py-20 md:py-28 px-5">
      {/* Heading */}
      <div className="max-w-lg mx-auto">
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
      </div>

      {/* Marquee */}
      <WishesMarquee wishes={wishes} />

      {/* Form */}
      <div className="max-w-lg mx-auto">
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
