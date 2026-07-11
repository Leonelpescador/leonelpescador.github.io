import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Sitio Corporativo",
  theme: "light",
  tags: ["html", "css", "javascript"],
  live: "https://www.cenesa.com.ar",
  description:
    "CENESA S.A. es un Centro de Estudios de Alta Complejidad con más de 40 años de trayectoria en Salta. Tenía una web en WordPress desactualizada, lenta y con limitaciones para representar la institución. Diseñé y desarrollé el nuevo sitio corporativo desde cero con HTML, CSS y JavaScript, con un frontend responsive y enfoque en rendimiento, SEO y experiencia de usuario.",
  components: [
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Fui el responsable del proyecto end-to-end: diseño UI/UX en Figma bajo criterio institucional, desarrollo frontend, optimización SEO, despliegue y gestión del DNS a través de Cloudflare.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Reemplacé una plataforma WordPress obsoleta por un sitio corporativo moderno.",
          "Diseñé la experiencia de usuario y la interfaz en Figma.",
          "Desarrollé el sitio responsive con HTML, CSS y JavaScript.",
          "Optimicé SEO y tiempos de carga.",
          "Realicé el deploy.",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "/static/media/projects/media/cenesa-web.webp",
        alt: "CENESA",
        caption: "CENESA",
      },
    },
  ],
} as const satisfies ProjectContent;
