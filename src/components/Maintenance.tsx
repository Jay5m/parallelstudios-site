import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { studio } from "../config";
import { useDiscordStats } from "../lib/data";
import { DiscordIcon, LiveDot, Logo } from "./ui";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Maintenance() {
  const stats = useDiscordStats();

  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-16">
      <svg viewBox="160 140 225 240" className="pointer-events-none absolute -right-24 -bottom-24 h-[34rem] w-[34rem] opacity-[0.05]" aria-hidden>
        <g fill="#e8162b">
          <path d="M168 192 L216 145 L378 145 L330 196 L214 196 L186 224 L168 242 Z" />
          <path d="M168 263 L214 219 L340 219 L291 266 L238 266 L212 292 L212 331 L168 375 Z" />
          <path d="M221 303 L250 274 L287 274 L221 345 Z" />
        </g>
      </svg>

      <div className="relative w-full max-w-2xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <span className="text-lg font-bold tracking-tight">
            Parallel <span className="font-medium text-muted">Studios</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="label mt-14 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
          </span>
          Maintenance in progress
        </motion.p>

        <h1 className="mt-5 text-[clamp(2.8rem,9vw,5.5rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">
          {["Undergoing", "Updates"].map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.08, ease }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }}>
          <p className="mt-5 text-2xl font-semibold text-red">Be back soon.</p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {studio.name} is currently undergoing updates to the website. Stay tuned for more updates in our Discord.
          </p>

          <a
            href={studio.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-md bg-[#5865f2] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#6873ff]"
          >
            <DiscordIcon className="h-5 w-5" />
            Join Discord
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          {stats && (
            <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
              <LiveDot />
              <span className="text-text">{stats.online.toLocaleString()}</span> online ·{" "}
              <span className="text-text">{stats.members.toLocaleString()}</span> members
            </p>
          )}
        </motion.div>

        <motion.div
          className="mt-16 h-px origin-left bg-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
        />
      </div>
    </main>
  );
}
