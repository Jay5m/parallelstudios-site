import type { CSSProperties } from "react";
import { studio } from "../config";
import type { DiscordStats } from "../hooks";

const items = ["profile", "loadout", "missions", "studio", "contact"];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-hidden>
      <span className="h-4 w-[5px] rounded-[1px] bg-cyan" />
      <span className="h-4 w-[5px] rounded-[1px] bg-violet" />
    </span>
  );
}

export default function Nav({ stats, onConsole }: { stats: DiscordStats; onConsole: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-sm font-semibold tracking-wide">PARALLEL</span>
        </a>
        <ul className="hidden items-center gap-6 font-mono text-xs text-muted lg:flex">
          {items.map((i) => (
            <li key={i}>
              <a href={`#${i}`} className="uppercase tracking-wider transition-colors hover:text-cyan">
                {i}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={onConsole} className="hud btn hidden !px-3 !py-2 sm:inline-flex" style={{ "--cut": "7px" } as CSSProperties}>
            F8 console
          </button>
          <a
            href={studio.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="hud btn !px-3 !py-2"
            style={{ "--cut": "7px" } as CSSProperties}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            {stats ? `${stats.online} online` : "discord"}
          </a>
        </div>
      </nav>
    </header>
  );
}
