// Everything personal lives here — edit this file to update the site.

export const profile = {
  handle: "Jay5m",
  role: "Software Engineer",
  study: "Software Engineering Student",
  // Roughly when you started coding — drives the level + XP bar.
  devSince: "2023-10-01",
  avatar: "https://avatars.githubusercontent.com/u/281129695?v=4",
  about: [
    "I'm Jay5m — a software engineering student who's been writing code for three years.",
    "I own and run Parallel Studios, where I build FiveM scripts and the interfaces around them: Lua for the game logic, React and TypeScript for the UI.",
  ],
  taglines: [
    "software engineer.",
    "founder @ parallel studios.",
    "fivem developer. lua main.",
    "student, shipping anyway.",
  ],
};

export const achievements = [
  { title: "Founder", text: "Started Parallel Studios", unlocked: true },
  { title: "3-Year Streak", text: "Coding since 2023", unlocked: true },
  { title: "Shipped It", text: "Released Parallel Announcements", unlocked: true },
  { title: "Student Dev", text: "Studying while building", unlocked: true },
  { title: "Sleep Schedule", text: "Fix it. Someday.", unlocked: false },
];

export const studio = {
  name: "Parallel Studios",
  title: "Owner & Developer",
  tagline: "Script development for FiveM.",
  blurb: "High-quality FiveM scripts at fair prices, from developers who stay active after launch.",
  discordInvite: "pstudios",
  discordUrl: "https://discord.gg/pstudios",
};

export const process = [
  { step: "01", title: "Design", text: "UI laid out in Figma first, so it feels right before any code exists." },
  { step: "02", title: "Build", text: "Lua for game logic, React + TypeScript for NUI — optimised to keep servers smooth." },
  { step: "03", title: "Ship", text: "Release, support, update. Issues get fixed fast through the Discord." },
];

export type Project = {
  name: string;
  kind: string;
  status: "RELEASED" | "LIVE" | "IN PROGRESS";
  description: string;
  tags: string[];
  url?: string;
};

// Add your projects here — they show up as missions automatically.
export const projects: Project[] = [
  {
    name: "Parallel Announcements",
    kind: "FiveM script",
    status: "RELEASED",
    description: "A NoPixel V-inspired replacement for txAdmin's announcements — cleaner, better-looking server-wide messages.",
    tags: ["Lua", "FiveM", "NUI"],
    url: "https://github.com/Jay5m/Parallel-Announcements",
  },
  {
    name: "jay5m portfolio",
    kind: "Website",
    status: "LIVE",
    description: "This site. HUD layout, live Discord stats, and an F8 console — press F8 and type 'help'.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
];

export type StackItem = {
  name: string;
  mono: string;
  color: string;
  group: "languages" | "frontend" | "backend" | "tooling";
  note: string;
};

export const stack: StackItem[] = [
  { name: "Lua", mono: "LUA", color: "#7b8cff", group: "languages", note: "main — FiveM resources" },
  { name: "TypeScript", mono: "TS", color: "#4b8fe3", group: "languages", note: "types everywhere" },
  { name: "JavaScript", mono: "JS", color: "#f7df1e", group: "languages", note: "where it all started" },
  { name: "Python", mono: "PY", color: "#ffd343", group: "languages", note: "scripts & automation" },
  { name: "React", mono: "RE", color: "#61dafb", group: "frontend", note: "NUI menus & sites" },
  { name: "Tailwind CSS", mono: "TW", color: "#38bdf8", group: "frontend", note: "styling at speed" },
  { name: "CSS", mono: "CSS", color: "#b07cff", group: "frontend", note: "the fundamentals" },
  { name: "Node.js", mono: "NODE", color: "#6cc24a", group: "backend", note: "APIs & Discord bots" },
  { name: "Vite", mono: "VITE", color: "#c264fe", group: "tooling", note: "NUI builds & dev server" },
  { name: "Figma", mono: "FIG", color: "#ff7262", group: "tooling", note: "UI design first" },
];

export const links = [
  { label: "Discord", handle: "discord.gg/pstudios", href: "https://discord.gg/pstudios" },
  { label: "GitHub", handle: "github.com/Jay5m", href: "https://github.com/Jay5m" },
  { label: "YouTube", handle: "@realjay5m", href: "https://www.youtube.com/@realjay5m" },
];
