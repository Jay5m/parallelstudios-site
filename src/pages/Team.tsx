import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { Button, PageHeader, Reveal, Tag } from "../components/ui";
import { developers, studio } from "../config";

// Card glow follows the cursor.
function track(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Team() {
  return (
    <>
      <PageHeader label="Team" title="The people building Parallel.">
        {developers.length === 1 ? "One developer" : `${developers.length} developers`} currently working on Parallel Studios scripts and
        interfaces.
      </PageHeader>

      <section className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {developers.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.06}>
            <article
              onMouseMove={track}
              className="group relative h-full overflow-hidden rounded-lg border border-line bg-surface p-6 transition-colors hover:border-[#3a3a40]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(320px circle at var(--mx) var(--my), rgba(232,22,43,0.09), transparent 70%)" }}
              />
              <div className="relative flex items-start justify-between">
                {d.avatar ? (
                  <img src={d.avatar} alt={d.name} className="h-20 w-20 rounded-md object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                ) : (
                  <span className="grid h-20 w-20 place-items-center rounded-md bg-raised text-2xl font-bold">{d.name[0]}</span>
                )}
                {i === 0 && <span className="rounded-full border border-red/40 px-2.5 py-0.5 font-mono text-[11px] text-red">Founder</span>}
              </div>
              <h2 className="relative mt-6 text-2xl font-bold tracking-tight">{d.name}</h2>
              <p className="relative text-sm text-red">{d.role}</p>
              <p className="relative mt-4 leading-relaxed text-muted">{d.bio}</p>
              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {d.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              {d.links.length > 0 && (
                <div className="relative mt-6 flex flex-wrap gap-4 border-t border-line pt-4">
                  {d.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-muted hover:text-text">
                      {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}

        <Reveal delay={developers.length * 0.06}>
          <article className="flex h-full min-h-72 flex-col justify-between rounded-lg border border-dashed border-line p-6">
            <div>
              <p className="label">Open seat</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight">Want to build with us?</h2>
              <p className="mt-3 leading-relaxed text-muted">
                We're always interested in developers and designers who care about quality. Open a ticket and show us what you've made.
              </p>
            </div>
            <div className="mt-6">
              <Button href={studio.ticketUrl} variant="ghost" external>
                Apply via ticket
              </Button>
            </div>
          </article>
        </Reveal>
      </section>
    </>
  );
}
