import type { Locale } from "@/lib/i18n/config";

export interface Project {
  num: string;
  name: string;
  year: string;
  stack: string;
  description: Record<Locale, string>;
}

export const projects: Project[] = [
  {
    num: "01",
    name: "Nimbus",
    year: "2025",
    stack: "Next.js · tRPC · Postgres",
    description: {
      es: "Plataforma SaaS de analítica en tiempo real. Lideré el rediseño y reduje el tiempo de carga del dashboard un 60%.",
      en: "Real-time analytics SaaS platform. I led the redesign and cut dashboard load time by 60%.",
    },
  },
  {
    num: "02",
    name: "Atlas",
    year: "2024",
    stack: "React · Node · Redis",
    description: {
      es: "App de logística con tracking en vivo sobre WebSockets. Arquitectura event-driven para miles de envíos simultáneos.",
      en: "Logistics app with live tracking over WebSockets. Event-driven architecture for thousands of simultaneous shipments.",
    },
  },
  {
    num: "03",
    name: "Praxis",
    year: "2024",
    stack: "Next.js · Tailwind · Stripe",
    description: {
      es: "Marketplace de cursos online con pagos y suscripciones. Frontend de alto rendimiento y checkout sin fricción.",
      en: "Online course marketplace with payments and subscriptions. High-performance frontend and frictionless checkout.",
    },
  },
  {
    num: "04",
    name: "Orbit",
    year: "2023",
    stack: "React · GraphQL · Timescale",
    description: {
      es: "Dashboard de IoT que visualiza millones de eventos de sensores con GraphQL y series temporales.",
      en: "IoT dashboard visualizing millions of sensor events with GraphQL and time-series data.",
    },
  },
];
