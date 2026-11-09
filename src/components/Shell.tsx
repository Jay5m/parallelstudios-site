import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Command, CornerDownLeft, Copy, Eye, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { studio } from "../config";
import type { DiscordStats } from "../lib/data";
import { go, href, routes, type Path } from "../lib/router";
import { DiscordIcon, LiveDot, Logo, Num } from "./ui";

/* ---------------- top bar ---------------- */

export function TopBar({ stats, views, latest }: { stats: DiscordStats; views: number | null; latest?: string }) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-x flex h-9 items-center justify-between gap-4 font-mono text-[11px] text-muted">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2" title="Total site views">
            <Eye className="h-3.5 w-3.5" />
            <span className="text-text">
              <Num value={views} />
            </span>
            <span className="hidden sm:inline">site views</span>
            <span className="sm:hidden">views</span>
          </span>
          <a href={studio.discordUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-text">
            <LiveDot />
            <span className="text-text">
              <Num value={stats?.online ?? null} />
            </span>
            online
            <span className="hidden sm:inline">
              · <Num value={stats?.members ?? null} /> members
            </span>
          </a>
        </div>
        {latest && (
          <a href={href("/changelog")} className="hidden items-center gap-2 hover:text-text md:flex">
            <span className="rounded-sm bg-red px-1.5 py-px text-[10px] text-white">NEW</span>
            {latest}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}

/* ---------------- nav ---------------- */

export function Nav({ path, onPalette }: { path: Path; onPalette: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-lg" : "border-transparent bg-bg"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-6">
        <a href={href("/")} className="flex items-center gap-2.5">
          <Logo className="h-7 w-7" />
          <span className="text-[15px] font-bold tracking-tight">
            Parallel <span className="font-medium text-muted">Studios</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {routes.map((r) => (
            <li key={r.path} className="relative">
              <a
                href={href(r.path)}
                className={`relative block px-3 py-2 text-sm transition-colors ${path === r.path ? "text-text" : "text-muted hover:text-text"}`}
              >
                {r.label}
                {path === r.path && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-red"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onPalette}
            className="hidden items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-muted hover:text-text lg:flex"
            aria-label="Open quick menu"
          >
            <Command className="h-3 w-3" />K
          </button>
          <a
            href={studio.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-md bg-text px-3.5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-white sm:flex"
          >
            <DiscordIcon /> Discord
          </a>
          <button onClick={() => setOpen((o) => !o)} className="rounded-md p-2 text-muted hover:text-text md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="container-x py-3">
              {routes.map((r, i) => (
                <motion.li key={r.path} initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={href(r.path)}
                    className={`flex items-center justify-between border-b border-line py-3.5 text-lg ${path === r.path ? "text-text" : "text-muted"}`}
                  >
                    {r.label}
                    {path === r.path && <span className="h-1.5 w-1.5 rounded-full bg-red" />}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4">
                <a
                  href={studio.discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md bg-text py-3 font-semibold text-bg"
                >
                  <DiscordIcon /> Join the Discord
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- footer ---------------- */

export function Footer({ views, stats }: { views: number | null; stats: DiscordStats }) {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight">{studio.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">FiveM scripts and interfaces. Est. {studio.founded}.</p>
        </div>
        <div>
          <p className="label mb-4">Studio</p>
          <ul className="space-y-2.5 text-sm">
            {routes.map((r) => (
              <li key={r.path}>
                <a href={href(r.path)} className="text-muted hover:text-text">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Community</p>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Discord", studio.discordUrl],
              ["GitHub", studio.github],
              ["YouTube", studio.youtube],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} target="_blank" rel="noreferrer" className="text-muted hover:text-text">
                  {l} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Live</p>
          <ul className="space-y-2.5 font-mono text-sm text-muted">
            <li>
              <span className="text-text">
                <Num value={stats?.online ?? null} />
              </span>{" "}
              online now
            </li>
            <li>
              <span className="text-text">
                <Num value={stats?.members ?? null} />
              </span>{" "}
              members
            </li>
            <li>
              <span className="text-text">
                <Num value={views} />
              </span>{" "}
              site views
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 font-mono text-[11px] text-dim sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {studio.name}. Not affiliated with Cfx.re or Rockstar Games.
          </span>
          <span>
            Press <kbd className="rounded border border-line px-1 text-muted">Ctrl</kbd> + <kbd className="rounded border border-line px-1 text-muted">K</kbd> to jump anywhere
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- command palette ---------------- */

type Action = { label: string; hint: string; run: () => void | string };

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const actions: Action[] = useMemo(
    () => [
      ...routes.map((r) => ({ label: r.label, hint: "Page", run: () => go(r.path) })),
      {
        label: "Copy Discord invite",
        hint: "Action",
        run: () => {
          navigator.clipboard?.writeText(studio.discordUrl).catch(() => {});
          return "Discord invite copied";
        },
      },
      { label: "Open Discord", hint: "Link", run: () => void window.open(studio.discordUrl, "_blank", "noreferrer") },
      { label: "Open GitHub", hint: "Link", run: () => void window.open(studio.github, "_blank", "noreferrer") },
      { label: "Open YouTube", hint: "Link", run: () => void window.open(studio.youtube, "_blank", "noreferrer") },
    ],
    [],
  );
  const shown = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (a?: Action) => {
    if (!a) return;
    const msg = a.run();
    setOpen(false);
    if (msg) setToast(msg);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -10, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -6, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/60"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="h-4 w-4 text-muted" />
                <input
                  ref={input}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setSel(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSel((s) => Math.min(s + 1, shown.length - 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSel((s) => Math.max(s - 1, 0));
                    } else if (e.key === "Enter") run(shown[sel]);
                  }}
                  placeholder="Where to?"
                  className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-dim"
                />
                <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-muted">ESC</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2">
                {shown.map((a, i) => (
                  <li key={a.label}>
                    <button
                      onMouseEnter={() => setSel(i)}
                      onClick={() => run(a)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm ${
                        i === sel ? "bg-raised text-text" : "text-muted"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {a.hint === "Action" ? <Copy className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                        {a.label}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[10px] text-dim">
                        {a.hint}
                        {i === sel && <CornerDownLeft className="h-3 w-3" />}
                      </span>
                    </button>
                  </li>
                ))}
                {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches “{q}”.</li>}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-md border border-line bg-raised px-4 py-2.5 text-sm shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- intro ---------------- */

// The logo's three stripes draw in once per visit, then the page appears.
export function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1250);
    return () => clearTimeout(t);
  }, [onDone]);
  const stripes = [
    "M168 192 L216 145 L378 145 L330 196 L214 196 L186 224 L168 242 Z",
    "M168 263 L214 219 L340 219 L291 266 L238 266 L212 292 L212 331 L168 375 Z",
    "M221 303 L250 274 L287 274 L221 345 Z",
  ];
  return (
    <motion.div
      className="fixed inset-0 z-[110] grid place-items-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <svg viewBox="160 140 225 240" className="h-20 w-20">
        {stripes.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="#e8162b"
            initial={{ opacity: 0, x: -24, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.15 + i * 0.14, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
