import { useState } from "react";
import { studio } from "./config";
import { useDiscordStats } from "./hooks";
import Background from "./components/Background";
import Console from "./components/Console";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { Contact, Footer, Loadout, Missions, Profile, Studio } from "./components/Sections";

export default function App() {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const stats = useDiscordStats(studio.discordInvite);

  return (
    <>
      <Background />
      <Console open={consoleOpen} setOpen={setConsoleOpen} />
      <Nav stats={stats} onConsole={() => setConsoleOpen((o) => !o)} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <Hero />
        <Profile />
        <Loadout />
        <Missions />
        <Studio stats={stats} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
