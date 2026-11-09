import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button, PageHeader, Reveal, StatusPill, Tag } from "../components/ui";
import { scripts, studio } from "../config";
import { href } from "../lib/router";

const filters = ["All", "Released", "In development"] as const;

export default function Scripts() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const shown = f === "All" ? scripts : scripts.filter((s) => s.status === f);

  return (
    <>
      <PageHeader label="Scripts" title="Everything we've shipped, and what's next.">
        Released scripts are maintained and supported in Discord. Updates are posted on the changelog.
      </PageHeader>

      <section className="container-x">
        <div className="mb-8 flex flex-wrap gap-1 border-b border-line">
          {filters.map((x) => {
            const count = x === "All" ? scripts.length : scripts.filter((s) => s.status === x).length;
            return (
              <button
                key={x}
                onClick={() => setF(x)}
                className={`relative px-4 py-3 text-sm transition-colors ${f === x ? "text-text" : "text-muted hover:text-text"}`}
              >
                {x} <span className="font-mono text-xs text-dim">{count}</span>
                {f === x && <motion.span layoutId="script-filter" className="absolute inset-x-0 -bottom-px h-0.5 bg-red" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          {shown.map((s, i) => (
            <motion.article
              key={s.name}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="grid gap-8 border-b border-line py-10 lg:grid-cols-[1fr_1.2fr]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <StatusPill status={s.status} />
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">{s.name}</h2>
                <p className="mt-3 text-lg text-muted">{s.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={href("/support")}>Get it</Button>
                  {s.links.map((l) => (
                    <Button key={l.href} href={l.href} variant="ghost" external>
                      {l.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="leading-relaxed text-text/80">{s.description}</p>
                <ul className="mt-6">
                  {s.features.map((ft) => (
                    <li key={ft} className="flex gap-3 border-t border-line py-3 text-sm text-muted">
                      <span className="mt-2 h-px w-3 shrink-0 bg-red" />
                      {ft}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        {shown.length === 0 && <p className="py-16 text-center text-muted">Nothing here yet — check back soon.</p>}

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 rounded-lg border border-dashed border-line p-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">More scripts are in the works.</p>
            <p className="mt-1 text-muted">Follow along in Discord — new releases are announced there first.</p>
          </div>
          <Button href={studio.discordUrl} variant="ghost" external>
            Join the Discord
          </Button>
        </Reveal>
      </section>
    </>
  );
}
