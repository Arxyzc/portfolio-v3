import type { Locale } from "@/lib/i18n/config";

export interface ExperienceEntry {
  start: string;
  /** null = puesto actual (se muestra "Presente" / "Present"). */
  end: string | null;
  current?: boolean;
  role: string;
  company: string;
  description: Record<Locale, string>;
}

export const experience: ExperienceEntry[] = [
  {
    start: "2023",
    end: null,
    current: true,
    role: "Senior Full-Stack Developer",
    company: "Vela Studio",
    description: {
      es: "Lidero el desarrollo de producto de extremo a extremo, defino arquitectura y mentoreo a un equipo de cuatro developers. Dueño técnico de tres productos en producción.",
      en: "I lead end-to-end product development, define architecture and mentor a team of four developers. Technical owner of three products in production.",
    },
  },
  {
    start: "2021",
    end: "2023",
    role: "Full-Stack Developer",
    company: "Northwind Labs",
    description: {
      es: "Construí features de cero a producción para clientes enterprise. Introduje testing automatizado y bajé los bugs en producción un 45%.",
      en: "Built features from zero to production for enterprise clients. Introduced automated testing and cut production bugs by 45%.",
    },
  },
  {
    start: "2019",
    end: "2021",
    role: "Frontend Developer",
    company: "Beacon Digital",
    description: {
      es: "Desarrollé interfaces para marcas de consumo, con foco en accesibilidad y animación. Aquí me obsesioné con el detalle de la interacción.",
      en: "Developed interfaces for consumer brands, focused on accessibility and animation. This is where I got obsessed with interaction detail.",
    },
  },
  {
    start: "2018",
    end: "2019",
    role: "Junior Developer · Freelance",
    company: "Independiente",
    description: {
      es: "Mis primeros sitios para clientes reales. Aprendí a hablar con personas no técnicas y a entregar a tiempo.",
      en: "My first sites for real clients. I learned to talk with non-technical people and to ship on time.",
    },
  },
];
