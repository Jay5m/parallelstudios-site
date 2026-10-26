import { type ReactNode } from "react";
import { links, process, profile, projects, skills, studio } from "../config";
import { useDiscordStats, useReveal } from "../hooks";
import { Logo } from "./Nav";

export const Wrap = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
);

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="reveal py-20 sm:py-28">
      <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-ink pb-4">
        <h2 className="wide text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.9]">{title}</h2>
        <span className="label pb-2 text-soft">({n})</span>
      </div>
      {children}
    </section>
  );
}

const Tag = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${dark ? "border-paper/30" : "border-ink/25"}`}>
    {children}
  </span>
);

/* ---------------- ribbons ---------------- */

function Tape({ words, className, reverse }: { words: string[]; className: string; reverse?: boolean }) {
  const text = [...words, ...words, ...words, ...words];
  return (
    <div className={`ribbon absolute inset-x-[-5%] py-3 ${className}`}>
      <div className={`ribbon-track ${reverse ? "reverse" : ""}`}>
        {[...text, ...text].map((w, i) => (
          <span key={i} className="wide flex items-center gap-6 pr-6 text-lg sm:text-2xl">
            {w} <span className="text-orange">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Ribbons() {
  return (
    <div className="relative mt-6 h-36 overflow-hidden sm:h-44" aria-hidden>
      <Tape words={["PARALLEL STUDIOS", "FIVEM SCRIPTS", "BUILT PROPERLY"]} className="top-6 -rotate-3 bg-blue text-white" />
      <Tape words={skills.slice(0, 7).map((s) => s.name.toUpperCase())} className="top-16 rotate-2 bg-ink text-paper sm:top-20" reverse />
    </div>
  );
}

/* ---------------- work ---------------- */

export function Work() {
  return (
    <Section id="work" n="01" title="Selected work">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const Card = p.url ? "a" : "div";
          return (
            <Card
              key={p.name}
              {...(p.url ? { href: p.url, target: "_blank", rel: "noreferrer" } : {})}
              className="group block"
            >
              <div
                className={`relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-3xl p-6 transition-transform duration-500 group-hover:-rotate-1 sm:p-8 ${
                  i % 2 === 0 ? "bg-ink text-paper" : "bg-blue text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="label opacity-70">{p.kind}</span>
                  <span className="label opacity-70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="wide relative z-10 text-[clamp(1.7rem,3.4vw,3rem)] leading-[0.92] [overflow-wrap:anywhere]">{p.name}</p>
                <span className="absolute -right-6 -bottom-10 flex gap-3 opacity-15 transition-transform duration-500 group-hover:-translate-x-4">
                  <span className="h-48 w-10 bg-current" />
                  <span className="h-48 w-10 bg-current" />
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <p className="max-w-md leading-relaxed text-ink/80">{p.description}</p>
                {p.url && <span className="arrow text-2xl">↗</span>}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
      <a href="https://github.com/Jay5m" target="_blank" rel="noreferrer" className="group mt-12 inline-flex items-center gap-2 font-semibold hover:text-blue">
        More on GitHub <span className="arrow">↗</span>
      </a>
    </Section>
  );
}

/* ---------------- studio ---------------- */

function Stat({ k, v, live }: { k: string; v: string; live?: boolean }) {
  return (
    <div className="rounded-2xl border border-paper/15 p-5">
      <p className="label flex items-center gap-2 text-paper/60">
        {live && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc84] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ddc84]" />
          </span>
        )}
        {k}
      </p>
      <p className="wide mt-3 text-4xl tabular-nums">{v}</p>
    </div>
  );
}

export function Studio() {
  const ref = useReveal<HTMLElement>();
  const stats = useDiscordStats(studio.discordInvite);
  const fmt = (n?: number) => (n === undefined ? "—" : n.toLocaleString());

  return (
    <section id="studio" ref={ref} className="reveal py-10">
      <div className="overflow-hidden rounded-[32px] bg-ink p-6 text-paper sm:p-12">
        <div className="flex items-center justify-between">
          <span className="label text-paper/60">(02) The studio</span>
          <Logo light className="scale-125" />
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="wide text-[clamp(2.6rem,7vw,6rem)] leading-[0.88]">
              Parallel
              <br />
              <span className="text-blue">Studios</span>
            </h2>
            <p className="mt-6 text-xl font-medium">{studio.tagline}</p>
            <p className="mt-3 max-w-lg leading-relaxed text-paper/70">{studio.blurb}</p>
            <a href={studio.discordUrl} target="_blank" rel="noreferrer" className="pill group mt-8 border-paper bg-paper text-ink hover:!bg-blue hover:!text-white hover:!border-blue">
              Join the Discord <span className="arrow">↗</span>
            </a>
          </div>
          <div className="grid grid-cols-2 content-start gap-3">
            <Stat k="Members" v={fmt(stats?.members)} />
            <Stat k="Online now" v={fmt(stats?.online)} live />
            <Stat k="Founder" v={profile.handle} />
            <Stat k="Focus" v="FiveM" />
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-paper/15 md:grid-cols-3">
          {process.map((p) => (
            <div key={p.step} className="bg-ink p-6">
              <span className="label text-blue">{p.step}</span>
              <p className="wide mt-3 text-2xl">{p.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- toolkit ---------------- */

export function Toolkit() {
  return (
    <Section id="toolkit" n="03" title="Toolkit">
      <ul>
        {skills.map((s, i) => (
          <li
            key={s.name}
            className="group grid grid-cols-[2.5rem_1fr] items-center gap-x-4 border-b border-rule px-2 py-4 transition-all duration-300 hover:bg-blue hover:px-5 hover:text-white sm:grid-cols-[3rem_1.2fr_1.5fr_auto]"
          >
            <span className="label text-soft group-hover:text-white/70">{String(i + 1).padStart(2, "0")}</span>
            <span className="wide text-2xl sm:text-4xl">{s.name}</span>
            <span className="col-start-2 mt-1 text-sm text-ink/70 group-hover:text-white/85 sm:col-start-auto sm:mt-0">{s.note}</span>
            <span className="label hidden text-soft group-hover:text-white/70 sm:block">{s.group}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- contact ---------------- */

export function Contact() {
  return (
    <Section id="contact" n="04" title="Say hello">
      <p className="wide max-w-5xl text-[clamp(2.4rem,7.5vw,7rem)] leading-[0.9]">
        Need a script? <span className="text-blue">Let's build it.</span>
      </p>
      <div className="mt-14">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 border-t border-ink py-6 last:border-b hover:text-blue"
          >
            <span className="wide text-3xl sm:text-5xl">{l.label}</span>
            <span className="flex items-center gap-4">
              <span className="hidden text-ink/60 group-hover:text-blue sm:inline">{l.handle}</span>
              <span className="arrow text-3xl sm:text-4xl">↗</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <Wrap>
        <div className="flex flex-col gap-3 py-8 text-sm text-soft sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3">
            <Logo /> © {new Date().getFullYear()} {profile.handle} · {studio.name}
          </span>
          <a href="#top" className="font-medium text-ink hover:text-blue">
            Back to top ↑
          </a>
        </div>
      </Wrap>
    </footer>
  );
}
