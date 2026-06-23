export interface Project {
  num: string;
  /** Clave dentro de `projects.items.<key>` en los archivos de traducción. */
  key: string;
  year?: string;
  stack?: string;
  /** Imagen estática: usada en mobile y como respaldo/poster en desktop. */
  image?: string;
  /** Video loop de escritorio: se reproduce solo al pasar el mouse por la tarjeta. */
  video?: string;
}

export const projects: Project[] = [
  {
    num: "01",
    key: "dynerox",
    image: "/projects/project-1.png",
    video: "/projects/project-1.mp4",
  },
  {
    num: "02",
    key: "dynerox_coming_soon",
    image: "/projects/project-2.jpeg",
    video: "/projects/project-2.mp4",
  },
  { num: "03", key: "demo_stripe", image: "/projects/project-3.jpg" },
  { num: "04", key: "api_stripe" },
  { num: "05", key: "demo_chat", image: "/projects/project-5.jpg" },
  { num: "06", key: "api_demo_chat" },
];
