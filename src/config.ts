// Everything personal lives here — edit this file to update the site.

export const profile = {
  handle: "Jay5m",
  role: "Software Engineer",
  study: "Software Engineering Student",
  years: "3",
  intro:
    "Software engineer, student, and owner of Parallel Studios. I build FiveM scripts and the interfaces around them — mostly in Lua, React and TypeScript.",
  badge: "FIVEM DEVELOPER • LUA • REACT • TYPESCRIPT • ",
};

export const studio = {
  name: "Parallel Studios",
  title: "Owner & Developer",
  tagline: "Script development for FiveM.",
  blurb:
    "Parallel Studios is my studio. We make scripts for FiveM servers — high-quality work at fair prices, from developers who actually stay active after launch.",
  discordInvite: "pstudios",
  discordUrl: "https://discord.gg/pstudios",
};

export type Project = {
  name: string;
  kind: string;
  description: string;
  tags: string[];
  url?: string;
};

// Add your projects here — they show up in the Work section automatically.
export const projects: Project[] = [
  {
    name: "Parallel Announcements",
    kind: "FiveM script",
    description: "A NoPixel V-inspired replacement for txAdmin's announcements: cleaner, better-looking server-wide messages.",
    tags: ["Lua", "FiveM", "NUI"],
    url: "https://github.com/Jay5m/Parallel-Announcements",
  },
  {
    name: "jay5m portfolio",
    kind: "Website",
    description: "This site. Poster-style layout, live Discord stats, and a lot of very wide letters.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
];

export type Skill = { name: string; note: string; group: string };

export const skills: Skill[] = [
  { name: "Lua", note: "Main language. FiveM resources, client + server.", group: "Language" },
  { name: "TypeScript", note: "Typed everything, front to back.", group: "Language" },
  { name: "JavaScript", note: "Where it all started.", group: "Language" },
  { name: "Python", note: "Scripts, bots and automation.", group: "Language" },
  { name: "React", note: "NUI menus, dashboards, sites.", group: "Frontend" },
  { name: "Tailwind CSS", note: "Fast, consistent styling.", group: "Frontend" },
  { name: "CSS", note: "The fundamentals, done properly.", group: "Frontend" },
  { name: "Node.js", note: "APIs, Discord bots, backends.", group: "Backend" },
  { name: "Vite", note: "Builds and NUI bundling.", group: "Tooling" },
  { name: "Figma", note: "Designing UIs before building them.", group: "Design" },
];

export const process = [
  { step: "01", title: "Design", text: "Every script starts as a layout in Figma, so the UI feels right before any code exists." },
  { step: "02", title: "Build", text: "Lua for the game logic, React + TypeScript for the interface, optimised so servers stay smooth." },
  { step: "03", title: "Ship", text: "Release, support, update. Problems get fixed fast through the Parallel Discord." },
];

export const links = [
  { label: "Discord", handle: "discord.gg/pstudios", href: "https://discord.gg/pstudios" },
  { label: "GitHub", handle: "github.com/Jay5m", href: "https://github.com/Jay5m" },
  { label: "YouTube", handle: "@realjay5m", href: "https://www.youtube.com/@realjay5m" },
];
