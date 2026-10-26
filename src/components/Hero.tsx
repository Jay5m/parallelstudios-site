import { profile, studio } from "../config";

function Badge() {
  return (
    <div className="pointer-events-none absolute right-0 hidden w-20 sm:top-36 sm:block sm:w-32 lg:top-40 lg:w-40">
      <svg viewBox="0 0 200 200" className="spin w-full">
        <defs>
          <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="99" className="fill-paper" />
        <text className="fill-ink" style={{ fontFamily: "IBM Plex Mono", fontSize: 15, letterSpacing: 3.2 }}>
          <textPath href="#circle">{profile.badge}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex gap-1.5">
          <span className="h-8 w-2.5 bg-ink sm:h-12 sm:w-3.5" />
          <span className="h-8 w-2.5 bg-blue sm:h-12 sm:w-3.5" />
        </div>
      </div>
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-rule px-1 py-5 odd:border-r sm:px-5 md:border-r md:last:border-r-0">
      <p className="label text-soft">{k}</p>
      <p className="mt-2 text-lg font-semibold">{v}</p>
    </div>
  );
}

export default function Hero() {
  const [before, after] = profile.intro.split(studio.name);

  return (
    <section id="top" className="relative pt-28 sm:pt-32">
      <div className="label flex justify-between text-soft">
        <span>Portfolio — {new Date().getFullYear()}</span>
        
      </div>

      <h1 aria-label={profile.handle} className="wide mt-4 text-[min(15.5vw,14rem)] leading-[0.8] whitespace-nowrap select-none">
        {profile.handle.toUpperCase().split("").map((c, i) => (
          <span key={i} className={`letter ${c === "5" ? "text-blue" : ""}`} aria-hidden>
            {c}
          </span>
        ))}
      </h1>
      <Badge />

      <div className="mt-10 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-[1.5fr_1fr]">
        <p className="max-w-2xl text-2xl leading-snug font-medium sm:text-3xl">
          {before}
          <span className="text-blue">{studio.name}</span>
          {after}
        </p>
        <div className="flex flex-wrap items-end gap-3 md:justify-end">
          <a href="#work" className="pill pill-blue group">
            See the work <span className="arrow">↘</span>
          </a>
          <a href={studio.discordUrl} target="_blank" rel="noreferrer" className="pill group">
            Join Parallel <span className="arrow">↗</span>
          </a>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 border-y border-rule md:grid-cols-4">
        <Fact k="Role" v={profile.role} />
        <Fact k="Studio" v={studio.name} />
        <Fact k="Experience" v={`${profile.years} years`} />
        <Fact k="Main language" v="Lua" />
      </div>
    </section>
  );
}
