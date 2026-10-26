import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { links, profile, projects, stack, studio } from "../config";
import { uptime } from "../hooks";

type Line = { kind: "in" | "out" | "err" | "sys"; text: string };

const SECTIONS = ["top", "profile", "loadout", "missions", "studio", "contact"];

const HELP: [string, string][] = [
  ["help", "list commands"],
  ["whoami", "who is jay5m"],
  ["loadout", "languages & tools"],
  ["missions", "things i've built"],
  ["studio", "Parallel Studios"],
  ["connect", "join the Parallel Discord"],
  ["socials", "where to find me"],
  ["xp", "how long i've been coding"],
  ["goto <section>", "jump to a section"],
  ["parallel", "toggle parallel mode"],
  ["clear / quit", "clear / close the console"],
];

const COMMANDS = ["help", "whoami", "loadout", "missions", "studio", "connect", "socials", "xp", "goto", "parallel", "clear", "quit", "echo", "sudo"];

const BOOT: Line[] = [
  { kind: "sys", text: "parallel-os console — welcome, visitor." },
  { kind: "out", text: "type 'help' to see what i can do. F8 or esc to close." },
];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// FiveM-style drop-down console, toggled with F8.
export default function Console({ open, setOpen }: { open: boolean; setOpen: (v: boolean | ((o: boolean) => boolean)) => void }) {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "F8" || (e.key === "`" && document.activeElement !== input.current)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus({ preventScroll: true }), 150);
    else input.current?.blur();
  }, [open]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const run = (raw: string): Line[] | "clear" => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const out = (...t: string[]): Line[] => t.map((text) => ({ kind: "out", text }));
    switch (cmd.toLowerCase()) {
      case "":
        return [];
      case "help":
        return out(...HELP.map(([c, d]) => `  ${c.padEnd(16)} ${d}`));
      case "whoami":
        return out(`${profile.handle} — ${profile.role.toLowerCase()} · ${profile.study.toLowerCase()}`, `${studio.title.toLowerCase()} @ ${studio.name}`);
      case "loadout": {
        const groups = [...new Set(stack.map((s) => s.group))];
        return out(...groups.map((g) => `  ${g.padEnd(11)} ${stack.filter((s) => s.group === g).map((s) => s.name).join(", ")}`));
      }
      case "missions":
        return out(...projects.map((p) => `  [${p.status}] ${p.name} — ${p.kind}`));
      case "studio":
        return out(`${studio.name} — ${studio.tagline}`, studio.blurb);
      case "connect":
        window.open(studio.discordUrl, "_blank", "noreferrer");
        return [{ kind: "sys", text: `connecting to ${studio.name}…` }];
      case "socials":
        return out(...links.map((l) => `  ${l.label.padEnd(9)} ${l.href}`));
      case "xp": {
        const u = uptime(new Date(profile.devSince), new Date());
        return out(`level ${u.y} — coding for ${u.y} years, ${u.m} months, ${u.d} days.`);
      }
      case "goto":
      case "cd": {
        const target = (args[0] ?? "top").replace(/\/$/, "");
        if (!SECTIONS.includes(target)) return [{ kind: "err", text: `no such section: ${target}. try: ${SECTIONS.join(", ")}` }];
        scrollTo(target);
        setOpen(false);
        return out(`→ ${target}`);
      }
      case "parallel": {
        const on = document.documentElement.classList.toggle("parallel-mode");
        return [{ kind: "sys", text: `parallel mode: ${on ? "ON — reality split." : "off"}` }];
      }
      case "echo":
        return out(args.join(" "));
      case "sudo":
        return [{ kind: "err", text: `nice try. ${profile.handle} is the only admin here.` }];
      case "quit":
      case "exit":
        setOpen(false);
        return [];
      case "clear":
        return "clear";
      default:
        return [{ kind: "err", text: `unknown command: ${cmd}. try 'help'` }];
    }
  };

  const submit = () => {
    const res = run(value);
    if (res === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: value }, ...res]);
    if (value.trim()) setHistory((h) => [value, ...h]);
    setHIdx(-1);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIdx(i);
        setValue(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setValue(i < 0 ? "" : history[i]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.filter((c) => c.startsWith(value.trim()));
      if (match.length === 1) setValue(match[0] + " ");
      else if (match.length > 1) setLines((l) => [...l, { kind: "in", text: value }, { kind: "out", text: match.join("  ") }]);
    }
  };

  const color = { in: "text-text", out: "text-text/70", err: "text-[#ff6b8b]", sys: "text-cyan" };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[70] transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-full"}`}
      aria-hidden={!open}
    >
      <div className="border-b-2 border-cyan/60 bg-ink/95 shadow-[0_20px_60px_-20px_rgba(94,242,255,0.35)] backdrop-blur-md" onClick={() => input.current?.focus()}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 font-mono text-[11px] text-muted">
            <span className="text-cyan">CONSOLE</span>
            <span className="hidden sm:inline">↑↓ history · tab complete · F8 / esc close</span>
            <button onClick={() => setOpen(false)} className="hover:text-cyan">
              [ close ]
            </button>
          </div>
          <div ref={body} className="term-scroll h-[45vh] overflow-y-auto pb-2 font-mono text-sm leading-relaxed">
            {lines.map((l, i) => (
              <div key={i} className={`whitespace-pre-wrap ${color[l.kind]}`}>
                {l.kind === "in" && <span className="text-violet">] </span>}
                {l.text}
              </div>
            ))}
          </div>
          <label className="flex items-center border-t border-line py-3 font-mono text-sm">
            <span className="text-violet">]&nbsp;</span>
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              tabIndex={open ? 0 : -1}
              aria-label="console input"
              className="min-w-0 flex-1 bg-transparent text-text caret-cyan outline-none"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
