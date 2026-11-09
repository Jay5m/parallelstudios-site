import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnnouncementDemo from "../components/AnnouncementDemo";
import { Button, Reveal, SectionHead, StatusPill, Tag } from "../components/ui";
import { developers, offerings, process, scripts, studio, type ChangelogEntry } from "../config";
import { changeKinds, useCountUp, type DiscordStats } from "../lib/data";
import { href } from "../lib/router";

const ease = [0.2, 0.8, 0.2, 1] as const;

function Stat({ value, label }: { value: number | null; label: string }) {
  const { ref, value: n } = useCountUp(value);
  return (
    <div className="border-l border-line pl-5">
      <p className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
        <span ref={ref}>{value === null ? "—" : n.toLocaleString()}</span>
      </p>
      <p className="label mt-2">{label}</p>
    </div>
  );
}

export default function Home({ stats, views, entries }: { stats: DiscordStats; views: number | null; entries: ChangelogEntry[] }) {
  const featured = scripts[0];
  const words = studio.headline.split(" ");

  return (
    <>
      {/* hero */}
      <section className="container-x grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pt-24">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="label flex items-center gap-3">
            <span className="h-px w-8 bg-red" />
            FiveM script studio · Est. {studio.founded}
          </motion.p>
          <h1 className="mt-7 text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.035em]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${w.startsWith("good") ? "text-red" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            {studio.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href={href("/scripts")}>Browse scripts</Button>
            <Button href={studio.discordUrl} variant="ghost" external>
              Join the Discord
            </Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
          <AnnouncementDemo />
        </motion.div>
      </section>

      {/* live numbers */}
      <section className="container-x pb-28">
        <Reveal className="grid grid-cols-2 gap-y-10 border-y border-line py-10 md:grid-cols-4">
          <Stat value={stats?.members ?? null} label="Discord members" />
          <Stat value={stats?.online ?? null} label="Online right now" />
          <Stat value={scripts.filter((s) => s.status === "Released").length} label="Scripts released" />
          <Stat value={views} label="Site views" />
        </Reveal>
      </section>

      {/* what we make */}
      <section className="container-x pb-28">
        <SectionHead index="01" label="What we make" title="Resources your players notice and your staff don't have to babysit.">
          Three things, done properly.
        </SectionHead>
        <div className="grid border-t border-line md:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 0.08}
              className="group border-b border-line py-8 md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:[&:not(:last-child)]:border-r"
            >
              <p className="font-mono text-xs text-dim">0{i + 1}</p>
              <h3 className="mt-6 text-2xl font-bold tracking-tight transition-colors group-hover:text-red">{o.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{o.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* featured script */}
      {featured && (
        <section className="container-x pb-28">
          <SectionHead index="02" label="Featured" title={featured.name}>
            {featured.summary}
          </SectionHead>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={featured.status} />
                {featured.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-text/80">{featured.description}</p>
              <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                {featured.features.map((f) => (
                  <li key={f} className="flex gap-3 border-t border-line py-3 text-sm text-muted">
                    <span className="mt-2 h-px w-3 shrink-0 bg-red" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {featured.links.map((l) => (
                  <Button key={l.href} href={l.href} variant="ghost" external>
                    {l.label}
                  </Button>
                ))}
                <Button href={href("/support")} variant="ghost">
                  Get it
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-lg border border-line bg-surface">
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                  <span className="font-mono text-[11px] text-muted">server.cfg</span>
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-muted">
                  <span className="text-dim"># 1. drop the folder into resources/</span>
                  {"\n"}
                  <span className="text-dim"># 2. start it after txAdmin</span>
                  {"\n"}
                  <span className="text-red">ensure</span> <span className="text-text">txadmin-notify</span>
                  {"\n\n"}
                  <span className="text-dim"># 3. txAdmin → Settings → Game → Notifications</span>
                  {"\n"}
                  <span className="text-dim">#    hide the default announcement + restart popups</span>
                  {"\n\n"}
                  <span className="text-dim"># test it in game</span>
                  {"\n"}
                  <span className="text-text">/txnotify_announce</span> Hello everyone
                  {"\n"}
                  <span className="text-text">/txnotify_restart</span> 15
                </pre>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* process */}
      <section className="container-x pb-28">
        <SectionHead index="03" label="How we work" title="From layout to live server." />
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <motion.div
            className="absolute top-[7px] right-0 left-0 hidden h-px origin-left bg-line md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease }}
          />
          {process.map((p, i) => (
            <Reveal key={p.title} delay={0.2 + i * 0.15} className="relative">
              <span className="relative z-10 block h-[15px] w-[15px] rounded-full border-2 border-red bg-bg" />
              <p className="mt-6 font-mono text-xs text-dim">Step {i + 1}</p>
              <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* changelog + team */}
      <section className="container-x grid gap-16 pb-28 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal className="mb-6 flex items-end justify-between border-t border-line pt-6">
            <p className="label">
              <span className="text-red">04</span> — Latest updates
            </p>
            <a href={href("/changelog")} className="group flex items-center gap-1.5 text-sm text-muted hover:text-text">
              Full changelog <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
          <ul>
            {entries.slice(0, 3).map((e, i) => (
              <Reveal key={e.version + e.date} delay={i * 0.06}>
                <a href={href("/changelog")} className="group grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-5">
                  <span className="font-mono text-xs text-dim">{e.date}</span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold group-hover:text-red">{e.title}</span>
                      <span className="font-mono text-[11px] text-muted">{e.version}</span>
                    </span>
                    <span className="mt-1.5 flex gap-1.5">
                      {changeKinds(e.body).map((k) => (
                        <Tag key={k}>{k}</Tag>
                      ))}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal className="mb-6 flex items-end justify-between border-t border-line pt-6">
            <p className="label">
              <span className="text-red">05</span> — The team
            </p>
            <a href={href("/team")} className="group flex items-center gap-1.5 text-sm text-muted hover:text-text">
              Meet everyone <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
          <ul>
            {developers.map((d) => (
              <Reveal key={d.name}>
                <a href={href("/team")} className="group flex items-center gap-4 border-b border-line py-4">
                  {d.avatar ? (
                    <img src={d.avatar} alt="" className="h-11 w-11 rounded-md object-cover grayscale transition group-hover:grayscale-0" />
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-raised font-bold">{d.name[0]}</span>
                  )}
                  <span>
                    <span className="block font-semibold group-hover:text-red">{d.name}</span>
                    <span className="text-sm text-muted">{d.role}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* cta */}
      <section className="container-x">
        <Reveal className="relative overflow-hidden rounded-xl border border-line bg-surface px-6 py-14 sm:px-14 sm:py-20">
          <svg viewBox="160 140 225 240" className="pointer-events-none absolute -right-10 -bottom-16 h-80 w-80 opacity-[0.07]" aria-hidden>
            <g fill="#e8162b">
              <path d="M168 192 L216 145 L378 145 L330 196 L214 196 L186 224 L168 242 Z" />
              <path d="M168 263 L214 219 L340 219 L291 266 L238 266 L212 292 L212 331 L168 375 Z" />
              <path d="M221 303 L250 274 L287 274 L221 345 Z" />
            </g>
          </svg>
          <p className="label">Need something?</p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
            Support, purchases or a custom script — it starts with a ticket.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={href("/support")}>Make a ticket</Button>
            <Button href={studio.discordUrl} variant="ghost" external>
              Join the Discord
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
