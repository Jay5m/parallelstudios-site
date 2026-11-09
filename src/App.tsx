import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { CommandPalette, Footer, Intro, Nav, TopBar } from "./components/Shell";
import { useChangelog, useDiscordStats, useViews } from "./lib/data";
import { useRoute } from "./lib/router";
import Changelog from "./pages/Changelog";
import Home from "./pages/Home";
import Scripts from "./pages/Scripts";
import Support from "./pages/Support";
import Team from "./pages/Team";

const introSeen = () => {
  try {
    return sessionStorage.getItem("ps-intro") === "1";
  } catch {
    return true;
  }
};

export default function App() {
  const path = useRoute();
  const stats = useDiscordStats();
  const views = useViews();
  const { entries, loading } = useChangelog();
  const [palette, setPalette] = useState(false);
  const [intro, setIntro] = useState(() => !introSeen());

  const endIntro = useCallback(() => {
    setIntro(false);
    try {
      sessionStorage.setItem("ps-intro", "1");
    } catch {
      /* ignore */
    }
  }, []);

  const page = {
    "/": <Home stats={stats} views={views} entries={entries} />,
    "/scripts": <Scripts />,
    "/team": <Team />,
    "/changelog": <Changelog entries={entries} loading={loading} />,
    "/support": <Support stats={stats} />,
  }[path];

  return (
    <>
      <AnimatePresence>{intro && <Intro onDone={endIntro} />}</AnimatePresence>
      <TopBar stats={stats} views={views} latest={entries[0] && `${entries[0].title} — ${entries[0].version}`} />
      <Nav path={path} onPalette={() => setPalette(true)} />
      <AnimatePresence mode="wait">
        <motion.main
          key={path}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {page}
        </motion.main>
      </AnimatePresence>
      <Footer views={views} stats={stats} />
      <CommandPalette open={palette} setOpen={setPalette} />
    </>
  );
}
