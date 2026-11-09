import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="160 140 225 240" className={className} aria-hidden>
      <defs>
        <linearGradient id="ps-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff2a3a" />
          <stop offset="1" stopColor="#b8000f" />
        </linearGradient>
      </defs>
      <g fill="url(#ps-logo)">
        <path d="M168 192 L216 145 L378 145 L330 196 L214 196 L186 224 L168 242 Z" />
        <path d="M168 263 L214 219 L340 219 L291 266 L238 266 L212 292 L212 331 L168 375 Z" />
        <path d="M221 303 L250 274 L287 274 L221 345 Z" />
      </g>
    </svg>
  );
}

export function DiscordIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.89 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1-.01-.13l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.65-1.87.89a.08.08 0 0 0-.04.11c.36.7.77 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-[background,color,border-color] duration-200";
  const styles =
    variant === "primary"
      ? "bg-red text-white hover:bg-[#ff2a3a]"
      : "border border-line text-text hover:border-muted hover:bg-raised";
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <Icon
        className={`h-4 w-4 transition-transform duration-200 ${
          external ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-1"
        }`}
      />
    </a>
  );
}

// Fades content up the first time it scrolls into view.
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, label, title, children }: { index: string; label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="mb-12 grid gap-6 border-t border-line pt-6 md:grid-cols-[12rem_1fr]">
      <p className="label">
        <span className="text-red">{index}</span> — {label}
      </p>
      <div>
        <h2 className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight sm:text-[2.6rem]">{title}</h2>
        {children && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
      </div>
    </Reveal>
  );
}

export function PageHeader({ label, title, children }: { label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="container-x pt-16 pb-14 sm:pt-24">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="label flex items-center gap-3"
      >
        <span className="h-px w-8 bg-red" />
        {label}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] font-extrabold tracking-[-0.03em]"
      >
        {title}
      </motion.h1>
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {children}
        </motion.div>
      )}
    </header>
  );
}

export function StatusPill({ status }: { status: string }) {
  const live = status === "Released";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
        live ? "border-live/30 text-live" : "border-line text-muted"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-live" : "bg-muted"}`} />
      {status}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">{children}</span>;
}

export function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
    </span>
  );
}

export function Num({ value }: { value: number | null }) {
  return <span className="tabular-nums">{value === null ? "—" : value.toLocaleString()}</span>;
}
