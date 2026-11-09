import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "idle" | "announce" | "restart";

// Loops: announcement card → restart countdown → pause.
function usePhase() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [secs, setSecs] = useState(300);
  useEffect(() => {
    let t: number;
    const seq: [Phase, number][] = [
      ["idle", 900],
      ["announce", 4200],
      ["idle", 700],
      ["restart", 5200],
    ];
    let i = 0;
    const step = () => {
      const [p, ms] = seq[i % seq.length];
      setPhase(p);
      if (p === "restart") setSecs(300);
      i++;
      t = window.setTimeout(step, ms);
    };
    step();
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (phase !== "restart") return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [phase]);
  return { phase, secs };
}

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function AnnouncementDemo() {
  const { phase, secs } = usePhase();
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <figure className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-[#0e1116] shadow-2xl shadow-black/50">
        {/* stand-in game scene: dusk sky, skyline, haze */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1b2333_0%,#2a2a3a_38%,#3b2a2e_62%,#121318_100%)]" />
        <svg className="absolute inset-x-0 bottom-[18%] h-[38%] w-full text-[#0d0f14]" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden>
          <path
            fill="currentColor"
            d="M0 100V62h14V40h10v22h8V30h16v32h6V50h12v12h10V18h6v-6h8v6h6v44h8V44h18v18h8V36h12v26h10V24h14v38h6V48h10v14h12V8h4v-6h6v6h4v54h10V40h16v22h8V52h12v10h14V28h10v34h8V44h16v18h10V34h12v28h10V50h12v12h16V30h8v32h10V56h10v6h8V100Z"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

        {/* minimal HUD */}
        <div className="absolute bottom-[5%] left-[3%] h-[24%] w-[17%] rounded-[6px] border border-white/15 bg-black/40">
          <div className="absolute top-[30%] left-0 h-[2px] w-full bg-white/10" />
          <div className="absolute top-0 left-[58%] h-full w-[2px] bg-white/10" />
          <div className="absolute top-1/2 left-1/2 h-0 w-0 -translate-1/2 border-x-[4px] border-b-[7px] border-x-transparent border-b-white/80" />
        </div>
        <div className="absolute bottom-[3%] left-[3%] flex w-[17%] gap-[3%]">
          <span className="h-[3px] flex-1 rounded bg-[#4ade80]/70" />
          <span className="h-[3px] flex-1 rounded bg-[#60a5fa]/70" />
        </div>

        {/* notification layer */}
        <div className="absolute inset-x-0 top-[6%] flex justify-center px-[6%]">
          <AnimatePresence mode="wait">
            {phase === "announce" && (
              <motion.div
                key="announce"
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="w-[min(78%,420px)] overflow-hidden rounded-[6px] bg-[#16110d]/90 shadow-lg shadow-black/40 backdrop-blur"
              >
                <div className="flex items-center justify-between bg-[#ff7a1a] px-[4%] py-[1.6%] text-[clamp(7px,1.25vw,11px)] font-bold tracking-[0.12em] text-[#1a0d03]">
                  SERVER ANNOUNCEMENT
                  <span className="font-mono font-medium opacity-70">txAdmin</span>
                </div>
                <p className="px-[4%] py-[3.5%] text-[clamp(8px,1.5vw,13.5px)] leading-snug text-white/90">
                  New jobs are live at the job centre. Restart tonight at 9 PM — finish what you're doing.
                </p>
                <motion.div
                  className="h-[2px] origin-left bg-[#ff7a1a]"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </motion.div>
            )}
            {phase === "restart" && (
              <motion.div
                key="restart"
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="flex w-[min(70%,380px)] items-center justify-between gap-4 rounded-[6px] bg-white px-[4.5%] py-[3%] text-[#0b0b0c] shadow-lg shadow-black/40"
              >
                <div>
                  <p className="text-[clamp(6px,1.1vw,10px)] font-bold tracking-[0.14em] text-black/50">SERVER RESTARTING IN</p>
                  <p className="text-[clamp(8px,1.5vw,13px)] font-semibold">Save your progress</p>
                </div>
                <p className="font-mono text-[clamp(14px,3vw,28px)] leading-none font-medium tabular-nums">
                  {mm}:{ss}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted">
        <span>Parallel Announcements — interactive preview</span>
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${phase === "idle" ? "bg-dim" : "bg-red"}`} />
          {phase === "announce" ? "announcement" : phase === "restart" ? "scheduled restart" : "waiting"}
        </span>
      </figcaption>
    </figure>
  );
}
