import { useEffect, useRef, useState } from "react";
import { changelog as localChangelog, studio, type ChangelogEntry } from "../config";

const store = {
  get(key: string) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* private mode etc. */
    }
  },
};

export type DiscordStats = { members: number; online: number } | null;

// Public invite endpoint: no token needed, and it allows browser requests.
export function useDiscordStats() {
  const [stats, setStats] = useState<DiscordStats>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(`https://discord.com/api/v10/invites/${studio.discordInvite}?with_counts=true`)
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
  }, []);
  return stats;
}

// Site views via Abacus (free counting API). Counts once per browser session;
// local dev uses a separate counter so testing doesn't inflate the real one.
const VIEWS_URL = "https://abacus.jasoncameron.dev";
const VIEWS_KEY = import.meta.env.DEV ? "views-dev" : "views";

export function useViews() {
  const [views, setViews] = useState<number | null>(null);
  useEffect(() => {
    const counted = store.get("ps-counted") === "1";
    fetch(`${VIEWS_URL}/${counted ? "get" : "hit"}/parallelstudios-cc/${VIEWS_KEY}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (typeof d?.value === "number") {
          setViews(d.value);
          store.set("ps-counted", "1");
        }
      })
      .catch(() => {});
  }, []);
  return views;
}

type Release = { tag_name: string; name: string | null; body: string | null; published_at: string; html_url: string; draft: boolean };

// Local entries + GitHub Releases, newest first. Cached per session to stay
// well under GitHub's unauthenticated rate limit.
export function useChangelog() {
  const [entries, setEntries] = useState<ChangelogEntry[]>(localChangelog);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const merge = (releases: Release[]) => {
      const remote = releases
        .filter((r) => !r.draft)
        .map((r) => ({
          date: r.published_at.slice(0, 10),
          version: r.tag_name,
          title: r.name || r.tag_name,
          body: r.body ?? "",
          url: r.html_url,
        }));
      setEntries([...remote, ...localChangelog].sort((a, b) => b.date.localeCompare(a.date)));
      setLoading(false);
    };
    const cached = store.get("ps-releases");
    if (cached) return merge(JSON.parse(cached));
    fetch(`https://api.github.com/repos/${studio.changelogRepo}/releases?per_page=50`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rs: Release[]) => {
        store.set("ps-releases", JSON.stringify(rs));
        merge(rs);
      })
      .catch(() => setLoading(false));
  }, []);
  return { entries, loading };
}

// Kinds of change found in an entry, from its "### New / Improved / Fixed" headings.
export function changeKinds(body: string) {
  const kinds: string[] = [];
  if (/^#+\s*(new|added|features?)\b/im.test(body)) kinds.push("New");
  if (/^#+\s*(improved|changed|updated|improvements)\b/im.test(body)) kinds.push("Improved");
  if (/^#+\s*(fixed|fixes|bug ?fixes)\b/im.test(body)) kinds.push("Fixed");
  return kinds;
}

// Counts from 0 to `to` once the element scrolls into view.
export function useCountUp(to: number | null, duration = 1200) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || to === null) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return { ref, value };
}
