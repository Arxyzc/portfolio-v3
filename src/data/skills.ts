export type SkillGroupKey = "frontend" | "backend" | "tools";

export interface SkillItem {
  name: string;
  /** Nombre del icono dentro de react-icons/si (Simple Icons) */
  icon: string;
}

export interface SkillGroup {
  key: SkillGroupKey;
  items: SkillItem[];
}

export const skills: SkillGroup[] = [
  {
    key: "frontend",
    items: [
      { name: "React", icon: "SiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "GSAP", icon: "SiGreensock" },
      { name: "Motion", icon: "SiFramer" },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express / Fastify", icon: "SiExpress" },
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "Python", icon: "SiPython" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "Next.js", icon: "SiNextdotjs" },
    ],
  },
  {
    key: "tools",
    items: [
      { name: "Git", icon: "SiGit" },
      { name: "Docker", icon: "SiDocker" },
      { name: "AWS", icon: "FaAws" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "Figma", icon: "SiFigma" },
      { name: "Vitest / Playwright", icon: "SiVitest" },
    ],
  },
];