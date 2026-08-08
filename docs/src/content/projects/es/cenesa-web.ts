import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Sitio Corporativo",
  theme: "light",
  tags: ["next", "react", "javascript"],
  live: "https://www.cenesa.com.ar",
  liveLabel: "Ver sitio corporativo",
  accessNote: "El sitio público permite verificar el resultado final. El código fuente pertenece a la institución.",
  description:
    "CENESA S.A. es un Centro de Estudios de Alta Complejidad con más de 40 años de trayectoria en Salta. Tenía una web en WordPress desactualizada, lenta y con limitaciones para representar la institución. Diseñé y desarrollé el nuevo sitio corporativo desde cero con Next.js y React, con un frontend responsive y enfoque en rendimiento, SEO y experiencia de usuario.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Rediseño institucional de extremo a extremo",
        summary: "El trabajo conectó identidad, experiencia, implementación y despliegue en una única línea de responsabilidad.",
        stats: [{ value: "40+ años", label: "de trayectoria institucional representada" }],
        stages: [
          { title: "Punto de partida", detail: "WordPress desactualizado, lento y limitado para comunicar la institución." },
          { title: "Diseño y desarrollo", detail: "Prototipado en Figma y frontend responsive con Next.js y React." },
          { title: "Entrega", detail: "Despliegue en Railway, DNS en Cloudflare y base técnica orientada a SEO." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Fui el responsable del proyecto end-to-end: diseño UI/UX en Figma bajo criterio institucional, desarrollo frontend, optimización SEO, despliegue en Railway.app y gestión del DNS a través de Cloudflare.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Reemplacé una plataforma WordPress obsoleta por un sitio corporativo moderno.",
          "Diseñé la experiencia de usuario y la interfaz en Figma.",
          "Desarrollé el sitio responsive con Next.js y React.",
          "Optimicé SEO y tiempos de carga.",
          "Desplegué en Railway.app con DNS gestionado a través de Cloudflare.",
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
