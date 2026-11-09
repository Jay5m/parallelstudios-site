import { studio } from "../config";
import { useDiscordStats } from "../hooks";
import Background from "./Background";

export default function Maintenance() {
  const stats = useDiscordStats(studio.discordInvite);

  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-16 text-center">
      <Background />
      <div className="relative flex max-w-2xl flex-col items-center">
        <div className="flex gap-2" aria-hidden>
          <span className="h-14 w-4 animate-pulse rounded-sm bg-cyan" />
          <span className="h-14 w-4 animate-pulse rounded-sm bg-violet [animation-delay:0.4s]" />
        </div>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-4 py-1.5 font-mono text-xs tracking-widest text-muted uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb84d] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffb84d]" />
          </span>
          Maintenance in progress
        </p>

        <h1
          className="split mt-6 font-display text-[clamp(2.4rem,9vw,5.5rem)] leading-[0.95] font-black tracking-tight"
          data-text="Undergoing Updates"
        >
          Undergoing Updates
        </h1>
        <p className="mt-4 font-display text-xl font-semibold text-cyan sm:text-2xl">Be back soon.</p>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-text/75">
          {studio.name} is currently undergoing updates to the website. Stay tuned for more updates in our Discord.
        </p>

        <a
          href={studio.discordUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-[#5865f2] px-7 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_#5865f2] transition-transform hover:-translate-y-0.5 hover:bg-[#6873ff]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.89 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1-.01-.13l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.65-1.87.89a.08.08 0 0 0-.04.11c.36.7.77 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
          </svg>
          Join Discord
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>

        {stats && (
          <p className="mt-5 font-mono text-xs text-muted">
            <span className="text-green">{stats.online.toLocaleString()} online</span> · {stats.members.toLocaleString()} members
          </p>
        )}
      </div>
    </main>
  );
}
