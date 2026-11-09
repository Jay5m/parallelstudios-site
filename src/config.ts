// All of the site's text and data lives here. Edit this file to update the site.

export const site = {
  // true = everyone sees the "Undergoing Updates" page.
  // Add ?preview to the address to see the real site anyway.
  maintenance: false,
};

export const studio = {
  name: "Parallel Studios",
  founded: "2025",
  headline: "FiveM scripts that look as good as they run.",
  intro:
    "We build resources and interfaces for FiveM servers — designed in Figma, written in Lua and React, and supported directly in our Discord.",
  discordInvite: "pstudios",
  discordUrl: "https://discord.gg/pstudios",
  // Point this at your ticket channel if you have one,
  // e.g. https://discord.com/channels/<server-id>/<channel-id>
  ticketUrl: "https://discord.gg/pstudios",
  github: "https://github.com/Jay5m",
  youtube: "https://www.youtube.com/@realjay5m",
  // Changelog posts are read live from GitHub Releases on this repo.
  changelogRepo: "Jay5m/parallelstudios-site",
};

export type Link = { label: string; href: string };

export type Developer = {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  skills: string[];
  links: Link[];
};

// Add a developer by copying a block below.
export const developers: Developer[] = [
  {
    name: "Jay5m",
    role: "Founder & Lead Developer",
    avatar: "https://avatars.githubusercontent.com/u/281129695?v=4",
    bio: "Runs Parallel Studios and writes most of the code — Lua for game logic, React and TypeScript for interfaces, and Figma before either.",
    skills: ["Lua", "React", "TypeScript", "Node.js", "Figma"],
    links: [
      { label: "GitHub", href: "https://github.com/Jay5m" },
      { label: "YouTube", href: "https://www.youtube.com/@realjay5m" },
    ],
  },
  {
    name: "xyz",
    role: "Developer",
    avatar: "https://cdn.discordapp.com/avatars/1310029565598502954/335ed7a46c0f8ad730bdbee032c71e90.webp?size=256",
    bio: "Builds Parallel scripts in Lua and the interfaces around them in React and TypeScript.",
    skills: ["Lua", "React", "TypeScript"],
    links: [{ label: "Discord", href: "https://discord.com/users/1310029565598502954" }],
  },
];

export type Script = {
  name: string;
  status: "Released" | "In development";
  summary: string;
  description: string;
  tags: string[];
  features: string[];
  links: Link[];
};

export const scripts: Script[] = [
  {
    name: "Parallel Announcements",
    status: "Released",
    summary: "A cleaner replacement for txAdmin's announcement and restart pop-ups.",
    description:
      "Swaps txAdmin's default Server Announcement and Scheduled Restart notifications for custom NUI cards built in React and TypeScript. Restart warnings count down live, and in the final minute the card stays on screen — even for players who join late.",
    tags: ["Lua", "React", "TypeScript", "txAdmin"],
    features: [
      "Announcement card with the admin's message",
      "Restart card with a live countdown",
      "Sticky final-minute countdown (configurable)",
      "Hides itself when a restart is skipped",
      "Designed at 1920×1080, scales to any resolution",
      "Test commands: /txnotify_announce and /txnotify_restart",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Jay5m/Parallel-Announcements" }],
  },
];

export const offerings = [
  { title: "Scripts", text: "Game logic in Lua, written to stay light on the server and simple to configure." },
  { title: "Interfaces", text: "NUI built in React and TypeScript, designed in Figma at 1920×1080 and scaled to every resolution." },
  { title: "Custom work", text: "Need something specific for your server? Open a commission ticket and we'll scope it with you." },
];

export const process = [
  { title: "Design", text: "Every interface starts as a Figma layout, so it looks right before a line of code exists." },
  { title: "Build", text: "Lua for the game side, React and TypeScript for NUI, kept lean so servers stay smooth." },
  { title: "Ship & support", text: "Released with install docs, then maintained — fixes land in the changelog and Discord." },
];

export type TicketType = { title: string; text: string; icon: "cart" | "wrench" | "bug" | "pen" | "handshake" };

export const ticketTypes: TicketType[] = [
  { title: "Purchase help", text: "Questions before or after buying a script.", icon: "cart" },
  { title: "Script support", text: "Install problems, errors, or something not behaving as expected.", icon: "wrench" },
  { title: "Bug report", text: "Found a bug? Tell us how to reproduce it and we'll fix it.", icon: "bug" },
  { title: "Custom commission", text: "A script or interface built specifically for your server.", icon: "pen" },
  { title: "Partnerships & other", text: "Collabs, partnerships, or anything that doesn't fit above.", icon: "handshake" },
];

export const faq = [
  { q: "How do I buy a script?", a: "Join our Discord and open a Purchase help ticket — we'll walk you through it." },
  {
    q: "Where do I get support?",
    a: "Open a Script support ticket in Discord. Include the script name, your framework, and any errors from the server console.",
  },
  { q: "Do scripts get updates?", a: "Yes. Fixes and improvements are posted on the Changelog page and announced in Discord." },
  { q: "Can you build something custom?", a: "Yes. Open a Custom commission ticket describing what you need and we'll get back to you." },
];

export type ChangelogEntry = { date: string; version: string; title: string; body: string; url?: string };

// Built-in entries. Anything you publish as a GitHub Release on `changelogRepo`
// is added automatically, newest first.
export const changelog: ChangelogEntry[] = [
  {
    date: "2026-11-08",
    version: "Site 2.0",
    title: "New website",
    body: `### New
- Rebuilt the Parallel Studios website from scratch
- Team page with everyone currently developing at Parallel
- Changelog page — every update to our scripts lands here
- Make a ticket page that takes you straight to the right place in Discord
- Live Discord member count and site views in the top bar`,
  },
];
