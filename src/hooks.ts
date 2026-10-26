import { useEffect, useRef, useState } from "react";

export function uptime(since: Date, now: Date) {
  let y = now.getFullYear() - since.getFullYear();
  let m = now.getMonth() - since.getMonth();
  let d = now.getDate() - since.getDate();
  if (d < 0) {
    m--;
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }
  return { y, m, d };
}

export function useTyped(phrases: string[], speed = 55, pause = 1700) {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    let j = 0;
    let deleting = false;
    let t = 0;
    const tick = () => {
      const p = phrases[i];
      if (!deleting) {
        j++;
        setText(p.slice(0, j));
        if (j === p.length) {
          deleting = true;
          t = window.setTimeout(tick, pause);
          return;
        }
      } else {
        j--;
        setText(p.slice(0, j));
        if (j === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
        }
      }
      t = window.setTimeout(tick, deleting ? speed / 2 : speed);
    };
    t = window.setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [phrases, speed, pause]);
  return text;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export type DiscordStats = { members: number; online: number } | null;

// Public invite endpoint: no token needed, and it allows browser requests.
export function useDiscordStats(invite: string) {
  const [stats, setStats] = useState<DiscordStats>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(`https://discord.com/api/v10/invites/${invite}?with_counts=true`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && d?.approximate_member_count)
            setStats({ members: d.approximate_member_count, online: d.approximate_presence_count });
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [invite]);
  return stats;
}
