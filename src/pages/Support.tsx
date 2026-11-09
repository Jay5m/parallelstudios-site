import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bug, Handshake, PenTool, Plus, ShoppingCart, Wrench } from "lucide-react";
import { useState } from "react";
import { DiscordIcon, LiveDot, Num, PageHeader, Reveal } from "../components/ui";
import { faq, studio, ticketTypes, type TicketType } from "../config";
import type { DiscordStats } from "../lib/data";

const icons: Record<TicketType["icon"], typeof Bug> = {
  cart: ShoppingCart,
  wrench: Wrench,
  bug: Bug,
  pen: PenTool,
  handshake: Handshake,
};

const steps = ["Join the Parallel Discord", "Open the tickets channel", "Pick the category below and describe what you need"];

export default function Support({ stats }: { stats: DiscordStats }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHeader label="Make a ticket" title="Get help from the people who wrote the code.">
        Every request — support, purchases, bug reports, commissions — is handled through a ticket in our Discord.
      </PageHeader>

      <section className="container-x grid gap-14 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="label mb-4">Choose a category</p>
          <ul className="border-t border-line">
            {ticketTypes.map((t, i) => {
              const Icon = icons[t.icon];
              return (
                <Reveal key={t.title} delay={i * 0.05}>
                  <a
                    href={studio.ticketUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-5 border-b border-line py-6 transition-[padding] duration-300 hover:pl-3"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors group-hover:border-red group-hover:text-red">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-semibold">{t.title}</span>
                      <span className="text-muted">{t.text}</span>
                    </span>
                    <span className="hidden items-center gap-1.5 text-sm text-muted group-hover:text-text sm:flex">
                      Open ticket <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal className="rounded-lg border border-line bg-surface p-6">
            <p className="label">How it works</p>
            <ol className="mt-5 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-raised font-mono text-[11px] text-muted">{i + 1}</span>
                  <span className="text-sm leading-6">{s}</span>
                </li>
              ))}
            </ol>
            <a
              href={studio.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex items-center justify-center gap-2 rounded-md bg-[#5865f2] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6873ff]"
            >
              <DiscordIcon /> Open Discord
            </a>
            <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] text-muted">
              <LiveDot />
              <Num value={stats?.online ?? null} /> people online now
            </p>
          </Reveal>
          <p className="mt-5 px-1 text-sm leading-relaxed text-muted">
            Tip: for script support, include the script name, your framework and any errors from the server console. It gets you an answer much
            faster.
          </p>
        </aside>
      </section>

      <section className="container-x mt-28">
        <div className="grid gap-10 border-t border-line pt-6 md:grid-cols-[12rem_1fr]">
          <p className="label">
            <span className="text-red">FAQ</span> — Before you ask
          </p>
          <ul>
            {faq.map((f, i) => (
              <li key={f.q} className="border-b border-line">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className="text-lg font-semibold">{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus className="h-5 w-5 text-muted" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
