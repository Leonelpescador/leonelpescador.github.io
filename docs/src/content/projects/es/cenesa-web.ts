import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Sitio Corporativo",
  theme: "light",
  tags: ["django", "postgresql", "html", "css", "javascript"],
  live: "https://www.cenesa.com.ar",
  description:
    "Diseño y desarrollo del sitio web institucional y corporativo de CENESA S.A. Arquitectura frontend moderna con foco en rendimiento, SEO y experiencia de usuario. Responsable del ciclo completo: UI/UX, desarrollo e infraestructura de deploy.",
  components: [
    {
      type: "text",
      props: {
        title: "Descripción",
        text: "Diseño y desarrollo del sitio web institucional y corporativo de CENESA S.A. Arquitectura frontend moderna con foco en rendimiento, SEO y experiencia de usuario. Responsable del ciclo completo: UI/UX, desarrollo e infraestructura de deploy.",
      },
    },
    {
      type: "list",
      props: {
        title: "Tecnologías y responsabilidades",
        items: [
          "Django como backend principal",
          "PostgreSQL para persistencia",
          "HTML/CSS/JS frontend",
          "UI/UX y deploy",
          "Optimización SEO",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
        alt: "CENESA",
        caption: "CENESA",
      },
    },
  ],
} as const satisfies ProjectContent;
