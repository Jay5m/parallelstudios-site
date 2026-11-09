import { useEffect, useState } from "react";

// Hash routes work on GitHub Pages without any server rewrites.
export const routes = [
  { path: "/", label: "Home" },
  { path: "/scripts", label: "Scripts" },
  { path: "/team", label: "Team" },
  { path: "/changelog", label: "Changelog" },
  { path: "/support", label: "Make a ticket" },
] as const;

export type Path = (typeof routes)[number]["path"];

const read = (): Path => {
  const p = location.hash.replace(/^#/, "") || "/";
  return (routes.find((r) => r.path === p)?.path ?? "/") as Path;
};

export function useRoute() {
  const [path, setPath] = useState<Path>(read);
  useEffect(() => {
    const on = () => {
      setPath(read());
      window.scrollTo({ top: 0 });
    };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return path;
}

export const href = (p: Path) => `#${p}`;
export const go = (p: Path) => {
  location.hash = p;
};
