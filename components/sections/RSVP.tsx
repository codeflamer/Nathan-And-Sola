"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormData = {
  fullName: string;
  phone: string;
  guests: number;
};

type Status = "idle" | "loading" | "success" | "error";

export default function RSVP() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    const endpoint = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

    if (!endpoint || endpoint === "") {
      // Dev mode: simulate success when no endpoint is configured
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
      reset();
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "rsvp", ...data }),
        // no-cors not needed if CORS is set on the Apps Script Web App
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-cream border border-rose/30 rounded-xl px-4 py-4 text-espresso placeholder-espresso/40 font-sans text-base focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose transition-colors min-h-14";

  const errorClass = "mt-1 text-xs text-red-500 font-sans";

  return (
    <section id="rsvp" className="bg-butter py-20 md:py-28 px-5">
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
            We hope to see you there
          </p>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl">
            RSVP
          </h2>
          <div className="mx-auto mt-4 w-12 h-px bg-rose/40" />
        </motion.div>

        <motion.div
          className="bg-cream rounded-3xl p-7 md:p-10 shadow-sm"
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
                  <CheckCircle size={56} className="text-rose mx-auto mb-4" />
                </motion.div>
                <h3 className="font-serif text-espresso text-2xl mb-2">
                  See you there!
                </h3>
                <p className="text-espresso/60 font-sans text-sm">
                  Your RSVP has been received. We can&apos;t wait to celebrate with you.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-rose text-sm font-sans underline underline-offset-2"
                >
                  Submit another
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
                {/* Full Name */}
                <div>
                  <label className="block text-xs text-espresso/60 font-sans uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amara Johnson"
                    className={inputClass}
                    {...register("fullName", { required: "Full name is required" })}
                  />
                  {errors.fullName && (
                    <p className={errorClass}>{errors.fullName.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-espresso/60 font-sans uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    className={inputClass}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[+\d\s\-()]{7,20}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className={errorClass}>{errors.phone.message}</p>
                  )}
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs text-espresso/60 font-sans uppercase tracking-wider mb-2">
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="1"
                    className={inputClass}
                    {...register("guests", {
                      required: "Please enter number of guests",
                      min: { value: 1, message: "At least 1 guest" },
                      max: { value: 10, message: "Maximum 10 guests" },
                      valueAsNumber: true,
                    })}
                  />
                  {errors.guests && (
                    <p className={errorClass}>{errors.guests.message}</p>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-sans bg-red-50 rounded-xl px-4 py-3">
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                {/* Submit */}
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
                    "Confirm Attendance"
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
