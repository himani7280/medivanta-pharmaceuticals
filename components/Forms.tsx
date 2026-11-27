"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { HEADING_FONT_CLASS, HOME } from "@/data/data";
import { ArrowRightIcon } from "@/lib/icons";
import { EASE, Stagger, StaggerItem } from "./Motion";

const { form } = HOME.contact;

type Values = { name: string; email: string; phone: string; message: string };
const EMPTY: Values = { name: "", email: "", phone: "", message: "" };

type FieldProps = {
  label: string;
  name: keyof Values;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
  className?: string;
};

/* Floating-label input */
function Field({ label, name, value, onChange, type = "text", required = false, autoComplete, textarea = false, className = "" }: FieldProps) {
  const shared =
    "peer w-full rounded-2xl border border-[#0b2b4b]/12 bg-[#f6fbfa] px-4 pt-5 text-[14.5px] text-[#0b2b4b] outline-none transition-colors duration-300 placeholder-transparent focus:border-[#0f8f84]/50 focus:bg-white xl:text-[15.5px]";
  return (
    <label className={`relative block ${className}`}>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          rows={3}
          className={`${shared} h-[92px] resize-none pb-2.5 sm:h-[108px] xl:h-[124px] 2xl:h-[140px]`}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          type={type}
          autoComplete={autoComplete}
          placeholder=" "
          className={`${shared} h-[46px] pb-1.5 sm:h-[50px] xl:h-[54px] 2xl:h-[58px]`}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-[13px] origin-left text-[14px] text-[#6b7c8c] transition-all duration-300 peer-focus:-translate-y-[9px] peer-focus:scale-[0.76] peer-focus:font-semibold peer-focus:text-[#0f8f84] peer-[:not(:placeholder-shown)]:-translate-y-[9px] peer-[:not(:placeholder-shown)]:scale-[0.76] sm:top-[14px] sm:text-[14.5px] xl:top-[16px]">
        {label}
        {required && <span className="text-[#e5484d]"> *</span>}
      </span>
      <span className="pointer-events-none absolute inset-x-4 bottom-0 h-[2.5px] origin-center scale-x-0 rounded-full bg-[linear-gradient(90deg,#0f8f84,#1db37a)] transition-transform duration-500 peer-focus:scale-x-100" />
    </label>
  );
}

/* Success message */
function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-[clamp(260px,34svh,380px)] flex-col items-center justify-center text-center"
    >
      <div className="relative grid size-[96px] place-items-center rounded-full bg-[linear-gradient(135deg,#0f8f84,#1db37a)] shadow-[0_22px_36px_-14px_rgba(15,143,132,0.8)]">
        <svg viewBox="0 0 24 24" className="size-[46px] text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }} />
        </svg>
      </div>
      <h3 className={`${HEADING_FONT_CLASS} mt-6 text-[26px] font-semibold text-[#0b2b4b]`}>
        {form.successTitle}
      </h3>
      <p role="status" className="mt-2 max-w-[360px] text-[15.5px] leading-[1.6] text-[#4a5b6b]">
        {form.success}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full border border-[#0b2b4b]/20 px-6 py-2.5 text-[14.5px] font-semibold text-[#0b2b4b] transition duration-300 hover:border-[#0f8f84] hover:bg-[#0f8f84] hover:text-white active:scale-95 active:border-[#0f8f84] active:bg-[#0f8f84] active:text-white"
      >
        {form.resetLabel}
      </button>
    </motion.div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    setStatus("sending");
    timer.current = setTimeout(() => setStatus("sent"), 900);
  };
  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setValues(EMPTY);
    setStatus("idle");
  };

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <SuccessPanel key="done" onReset={reset} />
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          className="flex h-full flex-col justify-center"
        >
          <Stagger stagger={0.08}>
            <StaggerItem>
              <h3 className={`${HEADING_FONT_CLASS} text-[23px] font-semibold leading-[1.25] text-[#0b2b4b] sm:text-[26px]`}>
                {form.title}
              </h3>
              <p className="mt-1 text-[14.5px] text-[#4a5b6b]">{form.subtitle}</p>
            </StaggerItem>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <StaggerItem>
                <Field label={form.fields.name} name="name" value={values.name} onChange={onChange} required autoComplete="name" />
              </StaggerItem>
              <StaggerItem>
                <Field label={form.fields.email} name="email" value={values.email} onChange={onChange} type="email" required autoComplete="email" />
              </StaggerItem>
              <StaggerItem className="sm:col-span-2">
                <Field label={form.fields.phone} name="phone" value={values.phone} onChange={onChange} type="tel" autoComplete="tel" />
              </StaggerItem>
              <StaggerItem className="sm:col-span-2">
                <Field label={form.fields.message} name="message" value={values.message} onChange={onChange} required textarea />
              </StaggerItem>
            </div>

            <StaggerItem className="mt-5 xl:mt-6">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex h-[46px] min-w-[175px] items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#0f8f84,#1db37a)] px-7 text-[15px] font-semibold text-white shadow-[0_16px_28px_-12px_rgba(15,143,132,0.85)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_32px_-12px_rgba(15,143,132,1)] active:scale-[0.98] active:shadow-[0_20px_32px_-12px_rgba(15,143,132,1)] disabled:cursor-wait disabled:opacity-90 sm:h-[50px] sm:text-[15.5px] xl:h-[54px] xl:px-8"
              >
                {status === "sending" ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="size-5 rounded-full border-2 border-white/40 border-t-white" />
                    {form.sending}
                  </>
                ) : (
                  <>
                    {form.submit}
                    <ArrowRightIcon size={19} className="transition-transform duration-300 group-hover:translate-x-1.5 group-active:translate-x-1.5" />
                  </>
                )}
              </button>
            </StaggerItem>
          </Stagger>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
