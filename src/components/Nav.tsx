import { studio } from "../config";

const items = ["work", "studio", "toolkit", "contact"];

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-hidden>
      <span className={`h-4 w-[5px] ${light ? "bg-paper" : "bg-ink"}`} />
      <span className="h-4 w-[5px] bg-blue" />
    </span>
  );
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <Logo />
          <span className="wide text-sm tracking-tight">PARALLEL</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {items.map((i) => (
            <li key={i}>
              <a href={`#${i}`} className="capitalize transition-colors hover:text-blue">
                {i}
              </a>
            </li>
          ))}
        </ul>
        <a href={studio.discordUrl} target="_blank" rel="noreferrer" className="pill pill-blue group !px-4 !py-2 text-sm">
          Discord <span className="arrow">↗</span>
        </a>
      </nav>
    </header>
  );
}
