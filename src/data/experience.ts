import type { Locale } from "@/lib/i18n/config";

export interface ExperienceEntry {
  start: string;
  /** null = puesto actual (se muestra "Presente" / "Present"). */
  end: string | null;
  current?: boolean;
  role: Record<Locale, string>;
  company: string;
  description: Record<Locale, string>;
  technologies?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    start: "2025",
    end: null,
    current: true,
    role: {
      es: "Desarrollador Frontend",
      en: "Frontend Developer",
    },
    company: "Dynerox",
    description: {
      es: "Participé en el desarrollo y diseño del Front End de una plataforma web para la compra y venta de criptomonedas, así como de sus páginas y secciones complementarias, contribuyendo a la construcción de una interfaz de usuario coherente y funcional.",
      en: "I participated in the front-end development and design of a web platform for buying and selling cryptocurrencies, as well as its accompanying pages and sections, contributing to the construction of a cohesive and functional user interface.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
  },
  {
    start: "2020",
    end: "2025",
    role: {
      es: "Desarrollador Web",
      en: "Web Developer",
    },
    company: "Freelance",
    description: {
      es: "Desarrollé sitios web y aplicaciones para pequeñas y medianas empresas.",
      en: "Developed websites and applications for small and medium businesses.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    start: "2018",
    end: "2019",
    role: {
      es: "Desarrollador de Software (VR y Aplicaciones Móviles)",
      en: "Software Developer (VR and Mobile Applications)",
    },
    company: "Mente Fresca",
    description: {
      es: "Participé en el desarrollo de software enfocado en Realidad Virtual y aplicaciones móviles, colaborando en la creación de aplicaciones de realidad aumentada y en la implementación de experiencias interactivas con tecnologías inmersivas.",
      en: "I participated in software development focused on Virtual Reality and mobile applications, collaborating on the creation of augmented reality applications and the implementation of interactive experiences with immersive technologies.",
    },
    technologies: ["JavaScript", "Unity", "Vuforia"],
  },
];
