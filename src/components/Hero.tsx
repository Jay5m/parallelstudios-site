import { profile, stack, studio } from "../config";
import { uptime, useTyped } from "../hooks";

function Readout({ k, v, className }: { k: string; v: string; className: string }) {
  return (
    <div className={`absolute font-mono ${className}`}>
      <p className="hud-label !text-[10px]">{k}</p>
      <p className="mt-1 text-sm text-text">{v}</p>
    </div>
  );
}

function Marquee() {
  const names = stack.map((s) => s.name);
  const row = (reverse: boolean, cls: string) => (
    <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
      {[...names, ...names, ...names, ...names].map((n, i) => (
        <span key={i} className={`flex items-center gap-6 pr-6 font-display text-sm uppercase tracking-widest ${cls}`}>
          {n}
          <span className="text-line">//</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee space-y-3 overflow-hidden py-2" aria-hidden>
      {row(false, "text-cyan/50")}
      {row(true, "text-violet/50")}
    </div>
  );
}

export default function Hero() {
  const typed = useTyped(profile.taglines);
  const xp = uptime(new Date(profile.devSince), new Date());

  return (
    <section id="top" className="flex min-h-[100svh] flex-col pt-20 pb-6">
      <div className="relative grid flex-1 place-items-center py-16">
        {/* viewfinder frame */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          <span className="scan" />
          <div className="hidden sm:block">
            <Readout k="Player" v={profile.handle.toUpperCase()} className="top-6 left-8" />
            <Readout k="Studio" v={studio.name} className="top-6 right-8 text-right" />
            <Readout k="XP" v={`${xp.y} yrs ${xp.m} mo`} className="bottom-6 left-8" />
            <Readout k="Main" v="Lua · React · TS" className="right-8 bottom-6 text-right" />
          </div>
        </div>

        <div className="relative flex flex-col items-center px-4 text-center">
          <p className="hud-label !text-cyan">// founder · parallel studios</p>
          <h1
            className="split mt-5 font-display text-[clamp(4rem,17vw,11.5rem)] leading-[0.85] font-black tracking-tight whitespace-nowrap"
            data-text="JAY5M"
          >
            JAY5M
          </h1>
          <p className="mt-7 h-7 font-mono text-base text-muted sm:text-lg">
            <span className="text-violet">&gt;</span> {typed}
            <span className="caret" />
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#missions" className="hud btn btn-primary">
              view missions
            </a>
            <a href={studio.discordUrl} target="_blank" rel="noreferrer" className="hud btn">
              join parallel ↗
            </a>
          </div>
          <p className="mt-6 hidden font-mono text-xs text-muted sm:block">
            press <kbd className="rounded border border-line px-1.5 py-0.5 text-text">F8</kbd> to open the console
          </p>
        </div>
      </div>
      <Marquee />
    </section>
  );
}
