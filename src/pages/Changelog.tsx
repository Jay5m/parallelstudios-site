import DOMPurify from "dompurify";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { marked } from "marked";
import { useMemo, useState } from "react";
import { PageHeader, Tag } from "../components/ui";
import { studio, type ChangelogEntry } from "../config";
import { changeKinds } from "../lib/data";

const kinds = ["New", "Improved", "Fixed"] as const;

const render = (md: string) => DOMPurify.sanitize(marked.parse(md, { async: false }) as string);

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

export default function Changelog({ entries, loading }: { entries: ChangelogEntry[]; loading: boolean }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      entries.filter((e) => {
        if (kind && !changeKinds(e.body).includes(kind)) return false;
        const hay = `${e.title} ${e.version} ${e.body}`.toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      }),
    [entries, q, kind],
  );

  return (
    <>
      <PageHeader label="Changelog" title="What's changed.">
        New scripts, improvements and fixes across everything Parallel makes. Newest first.
      </PageHeader>

      <section className="container-x grid gap-12 lg:grid-cols-[15rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <label className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 focus-within:border-muted">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search updates"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-dim"
            />
          </label>
          <p className="label mt-8 mb-3">Type</p>
          <div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
            <button
              onClick={() => setKind(null)}
              className={`rounded-md px-3 py-1.5 text-sm ${kind === null ? "bg-raised text-text" : "text-muted hover:text-text"}`}
            >
              All updates
            </button>
            {kinds.map((k) => (
              <button
                key={k}
                onClick={() => setKind(kind === k ? null : k)}
                className={`rounded-md px-3 py-1.5 text-sm ${kind === k ? "bg-raised text-text" : "text-muted hover:text-text"}`}
              >
                {k}
              </button>
            ))}
          </div>
          <p className="mt-8 hidden text-sm leading-relaxed text-muted lg:block">
            Get updates as they happen in{" "}
            <a href={studio.discordUrl} target="_blank" rel="noreferrer" className="text-text underline decoration-red underline-offset-4">
              our Discord
            </a>
            .
          </p>
        </aside>

        <div>
          {loading && <p className="mb-6 font-mono text-xs text-dim">Checking for new posts…</p>}
          <AnimatePresence mode="popLayout">
            {shown.map((e) => (
              <motion.article
                key={e.version + e.date}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid gap-4 border-t border-line py-10 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr]"
              >
                <div className="sm:sticky sm:top-24 sm:self-start">
                  <time className="font-mono text-xs text-muted">{fmt(e.date)}</time>
                  <p className="mt-2 inline-block rounded border border-red/40 px-2 py-0.5 font-mono text-[11px] text-red">{e.version}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight">{e.title}</h2>
                    {e.url && (
                      <a href={e.url} target="_blank" rel="noreferrer" className="text-muted hover:text-text" aria-label="View on GitHub">
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {changeKinds(e.body).map((k) => (
                      <Tag key={k}>{k}</Tag>
                    ))}
                  </div>
                  <div className="md mt-5" dangerouslySetInnerHTML={{ __html: render(e.body) }} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
          {!loading && shown.length === 0 && <p className="py-16 text-muted">No updates match that search.</p>}
        </div>
      </section>
    </>
  );
}
