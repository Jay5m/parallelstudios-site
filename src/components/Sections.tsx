import { useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { achievements, links, process, profile, projects, stack, studio, type StackItem } from "../config";
import { uptime, useReveal, type DiscordStats } from "../hooks";
import { Logo } from "./Nav";

export function Section({ id, n, kicker, title, children }: { id: string; n: number; kicker: string; title: string; children: ReactNode }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="reveal py-20 sm:py-24">
      <div className="mb-10">
        <p className="hud-label !text-cyan">
          [ 0{n} ] {kicker}
        </p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-5xl">{title}</h2>
        <div className="mt-4 flex gap-1.5">
          <span className="h-1 w-10 bg-cyan" />
          <span className="h-1 w-4 bg-violet" />
          <span className="h-1 w-2 bg-line" />
        </div>
      </div>
      {children}
    </section>
  );
}

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="border border-line px-2 py-1 font-mono text-[11px] text-muted">{children}</span>
);

/* ---------------- profile: player card ---------------- */

export function Profile() {
  const xp = uptime(new Date(profile.devSince), new Date());
  const progress = Math.round(((xp.m + xp.d / 30) / 12) * 100);

  return (
    <Section id="profile" n={1} kicker="player profile" title="Who's playing">
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <div className="hud p-6" style={{ "--cut": "20px" } as CSSProperties}>
          <div className="hud mx-auto aspect-square w-40 overflow-hidden p-1" style={{ "--edge": "var(--color-cyan)" } as CSSProperties}>
            <img
              src={profile.avatar}
              alt={profile.handle}
              className="h-full w-full object-cover"
              style={{ clipPath: "polygon(13px 0,100% 0,100% calc(100% - 13px),calc(100% - 13px) 100%,0 100%,0 13px)" }}
            />
          </div>
          <p className="mt-5 text-center font-display text-2xl font-black">{profile.handle}</p>
          <p className="mt-1 text-center font-mono text-xs text-muted">{profile.role} · {studio.title}</p>
          <div className="mt-6">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-cyan">LVL {xp.y}</span>
              <span className="text-muted">{progress}% → LVL {xp.y + 1}</span>
            </div>
            <div className="mt-2 h-2 bg-line">
              <div className="h-full bg-linear-to-r from-cyan to-violet" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="border border-line p-2">
              <p className="text-muted">CLASS</p>
              <p className="mt-1">Developer</p>
            </div>
            <div className="border border-line p-2">
              <p className="text-muted">GUILD</p>
              <p className="mt-1">Parallel</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="hud p-6 sm:p-8">
            <p className="hud-label">bio</p>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-text/85">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="hud-label mb-3">
              achievements · {achievements.filter((a) => a.unlocked).length}/{achievements.length}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {achievements.map((a) => (
                <div key={a.title} className={`hud flex items-center gap-3 p-4 ${a.unlocked ? "" : "opacity-45"}`} style={{ "--cut": "10px" } as CSSProperties}>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center font-mono text-lg ${
                      a.unlocked ? "bg-cyan/10 text-cyan" : "bg-line text-muted"
                    }`}
                  >
                    {a.unlocked ? "◆" : "?"}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{a.title}</p>
                    <p className="truncate text-xs text-muted">{a.unlocked ? a.text : `locked — ${a.text}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- loadout ---------------- */

const groups = ["all", "languages", "frontend", "backend", "tooling"] as const;

function Slot({ item, i }: { item: StackItem; i: number }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 14}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 14}deg`);
  };
  const onLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ "--c": item.color } as CSSProperties}
      className="hud hud-hover tilt flex items-center gap-4 p-4"
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center font-display text-[11px] font-black"
        style={{ background: `${item.color}1f`, color: item.color, boxShadow: `inset 0 0 0 1px ${item.color}55` }}
      >
        {item.mono}
      </span>
      <div className="min-w-0">
        <p className="font-semibold">{item.name}</p>
        <p className="truncate text-xs text-muted">{item.note}</p>
      </div>
      <span className="ml-auto font-mono text-[10px] text-muted">SLOT {String(i + 1).padStart(2, "0")}</span>
    </div>
  );
}

export function Loadout() {
  const [g, setG] = useState<(typeof groups)[number]>("all");
  const shown = g === "all" ? stack : stack.filter((s) => s.group === g);
  return (
    <Section id="loadout" n={2} kicker="equipped" title="Loadout">
      <div className="mb-6 flex flex-wrap gap-2">
        {groups.map((x) => {
          const count = x === "all" ? stack.length : stack.filter((s) => s.group === x).length;
          return (
            <button
              key={x}
              onClick={() => setG(x)}
              className={`border px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
                g === x ? "border-cyan bg-cyan/10 text-cyan" : "border-line text-muted hover:text-text"
              }`}
            >
              {x} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <Slot key={s.name} item={s} i={stack.indexOf(s)} />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- missions ---------------- */

const statusColor = { RELEASED: "text-cyan border-cyan/40 bg-cyan/10", LIVE: "text-green border-green/40 bg-green/10", "IN PROGRESS": "text-violet border-violet/40 bg-violet/10" };

export function Missions() {
  return (
    <Section id="missions" n={3} kicker="completed work" title="Missions">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <article key={p.name} className="hud hud-hover group flex flex-col p-6 sm:p-7" style={{ "--cut": "18px" } as CSSProperties}>
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-muted">MISSION {String(i + 1).padStart(2, "0")} · {p.kind.toUpperCase()}</span>
              <span className={`border px-2 py-0.5 font-mono text-[10px] tracking-widest ${statusColor[p.status]}`}>{p.status}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-black group-hover:text-cyan">{p.name}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-text/75">{p.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className="ml-auto font-mono text-sm text-cyan hover:underline">
                  view source ↗
                </a>
              )}
            </div>
          </article>
        ))}
        <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-line p-6 text-center md:col-span-2">
          <p className="font-mono text-sm text-muted">
            <span className="text-violet">&gt;</span> next mission loading
            <span className="caret" />
          </p>
          <a href="https://github.com/Jay5m" target="_blank" rel="noreferrer" className="mt-3 font-mono text-xs text-cyan hover:underline">
            more on github ↗
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- studio: server listing ---------------- */

export function Studio({ stats }: { stats: DiscordStats }) {
  const fill = stats ? Math.max(4, Math.round((stats.online / stats.members) * 100)) : 0;
  return (
    <Section id="studio" n={4} kicker="server browser" title="Parallel Studios">
      <div className="hud overflow-hidden" style={{ "--cut": "20px" } as CSSProperties}>
        <div className="hidden grid-cols-[1fr_200px_140px] gap-6 border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted md:grid">
          <span>SERVER</span>
          <span>PLAYERS</span>
          <span className="text-right">ACTION</span>
        </div>
        <div className="grid items-center gap-6 px-6 py-6 md:grid-cols-[1fr_200px_140px]">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center border border-line bg-ink">
              <Logo className="scale-150" />
            </span>
            <div>
              <p className="flex items-center gap-2 font-display text-xl font-black">
                {studio.name}
                <span className="border border-cyan/40 bg-cyan/10 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-cyan">OWNER</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                {studio.tagline} {studio.blurb}
              </p>
            </div>
          </div>
          <div className="font-mono text-sm">
            <p>
              <span className="text-green">{stats ? stats.online.toLocaleString() : "—"}</span>
              <span className="text-muted"> / {stats ? stats.members.toLocaleString() : "—"}</span>
            </p>
            <div className="mt-2 h-1.5 bg-line">
              <div className="h-full bg-green transition-[width] duration-700" style={{ width: `${fill}%` }} />
            </div>
            <p className="mt-1.5 text-[10px] text-muted">online / members · live</p>
          </div>
          <a href={studio.discordUrl} target="_blank" rel="noreferrer" className="hud btn btn-primary justify-center md:justify-self-end">
            connect
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {process.map((p, i) => (
          <div key={p.step} className="hud relative p-6" style={{ "--cut": "12px" } as CSSProperties}>
            <span className="font-mono text-xs text-violet">STEP {p.step}</span>
            <p className="mt-2 font-display text-xl font-black">{p.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            {i < process.length - 1 && <span className="absolute top-1/2 -right-4 hidden font-mono text-cyan md:block">›</span>}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- contact ---------------- */

export function Contact() {
  return (
    <Section id="contact" n={5} kicker="join the lobby" title="Contact">
      <div className="hud p-6 sm:p-10" style={{ "--cut": "24px" } as CSSProperties}>
        <p className="font-display text-3xl leading-tight font-black tracking-tight sm:text-5xl">
          need a script? let's build something{" "}
          <span className="split text-cyan" data-text="parallel">
            parallel
          </span>
          .
        </p>
        <p className="mt-4 max-w-xl text-muted">The Discord is the fastest way to reach me — open a ticket or just say hi.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="hud hud-hover group flex items-center justify-between p-4"
              style={{ "--cut": "10px" } as CSSProperties}
            >
              <span>
                <span className="hud-label block">{l.label}</span>
                <span className="mt-1 block group-hover:text-cyan">{l.handle}</span>
              </span>
              <span className="text-muted group-hover:text-cyan">↗</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
        <span className="flex items-center gap-2">
          <Logo /> © {new Date().getFullYear()} {profile.handle} · {studio.name}
        </span>
        <span>
          press <kbd className="rounded border border-line px-1.5 py-0.5 text-text">F8</kbd> for the console
        </span>
      </div>
    </footer>
  );
}
