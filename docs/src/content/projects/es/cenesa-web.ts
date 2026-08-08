import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Sitio Corporativo",
  theme: "light",
  tags: ["next", "react", "javascript"],
  live: "https://www.cenesa.com.ar",
  liveLabel: "Ver sitio corporativo",
  accessNote: "El sitio público permite verificar el resultado final. El código fuente pertenece a la institución.",
  description:
    "CENESA tenía una presencia web visualmente desactualizada que no comunicaba con claridad sus servicios ni la identidad de la institución. Diseñé y desarrollé en solitario el nuevo sitio corporativo, desde la propuesta visual y la migración de contenidos hasta la infraestructura y la publicación.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Una presencia digital más clara para los pacientes",
        summary: "El rediseño organizó la información institucional alrededor de servicios, profesionales, novedades, preguntas frecuentes, contacto y solicitud de turnos.",
        stats: [
          { value: "7", label: "secciones públicas principales" },
          { value: "End-to-end", label: "diseño, desarrollo e infraestructura" },
        ],
        stages: [
          { title: "Punto de partida", detail: "Una estética antigua y contenidos que necesitaban una estructura más clara." },
          { title: "Diseño y desarrollo", detail: "Bocetos en Figma y Canva, migración de contenidos y frontend responsive con Next.js y React." },
          { title: "Publicación", detail: "Hosting, Railway, dominio, DNS, Cloudflare y SEO técnico bajo una única responsabilidad." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Trabajé en solitario y consulté cada decisión visual con el responsable de la institución. Me ocupé del diseño UI/UX, el desarrollo frontend, la migración de contenido, el SEO técnico, el despliegue, el dominio y la configuración de DNS y Cloudflare.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Reemplacé una presencia visual desactualizada por un sitio corporativo contemporáneo y orientado a pacientes.",
          "Diseñé la experiencia y presenté bocetos en Figma y Canva para validar la dirección con la institución.",
          "Migré y reorganicé el contenido del sitio anterior.",
          "Desarrollé el sitio responsive con Next.js y React.",
          "Implementé SEO técnico sin atribuir mejoras de tráfico o posicionamiento no medidas.",
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
