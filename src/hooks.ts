import { useEffect, useRef, useState } from "react";

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
