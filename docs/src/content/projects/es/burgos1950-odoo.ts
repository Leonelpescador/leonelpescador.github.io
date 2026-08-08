import type { ProjectContent } from "../../types";

export default {
  title: "Migración a Odoo · Burgos 1950",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "javascript"],
  live: "https://www.burgos1950.com.ar/",
  liveLabel: "Conocer la empresa",
  accessNote: "La plataforma Odoo y su código son privados. El enlace lleva al sitio institucional del cliente y el caso muestra únicamente información autorizada.",
  description:
    "Burgos 1950, empresa salteña líder en belleza con más de 70 años de trayectoria, operaba con un sistema Zeus que limitaba su crecimiento y la integración entre sus unidades de negocio. Como desarrollador freelance, lideré la migración completa a Odoo, abarcando el relevamiento de procesos, el diseño del modelo de datos, la migración de datos históricos y la creación de la interfaz de usuario con la paleta de colores corporativa. Trabajé junto a un equipo de 4 personas, coordinando el desarrollo de modelos personalizados para las unidades de distribución mayorista, venta minorista, academia de formación y gestión de eventos. La plataforma se desplegó en Odoo.sh, integrando Python, PostgreSQL, XML y JavaScript.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Migración operativa con continuidad de negocio",
        summary: "El desafío combinó migración histórica, nuevos modelos y coordinación de equipo para cuatro unidades de negocio.",
        stats: [
          { value: "70+ años", label: "de trayectoria empresarial" },
          { value: "4", label: "personas coordinadas" },
          { value: "4", label: "unidades de negocio modeladas" },
        ],
        stages: [
          { title: "Sistema legado", detail: "Zeus limitaba integración y evolución entre las unidades del negocio." },
          { title: "Migración", detail: "Relevamiento, modelado y validación de datos históricos en Odoo." },
          { title: "Plataforma", detail: "Modelos personalizados y despliegue en Odoo.sh con identidad corporativa." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Fui responsable de liderar el proyecto de migración de extremo a extremo: análisis de procesos del sistema Zeus, modelado de datos en Odoo, migración y validación de datos históricos, diseño de interfaz y paleta de colores, y coordinación del equipo de desarrollo. Tomé las decisiones técnicas clave en arquitectura, modelos personalizados y configuración de Odoo.sh.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Lideré la migración completa del sistema Zeus a Odoo.",
          "Diseñé e implementé modelos personalizados para distribución, venta minorista, academia y eventos.",
          "Migré y validé datos históricos asegurando la integridad de la información.",
          "Diseñé la interfaz de usuario y la paleta de colores corporativa.",
          "Coordiné un equipo de 4 personas durante todo el proyecto.",
          "Desplegué la solución en Odoo.sh con integración de Python, PostgreSQL, XML y JavaScript.",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "/static/media/projects/media/burgos1950-odoo.webp",
        alt: "Burgos 1950",
        caption: "Burgos 1950",
      },
    },
  ],
} as const satisfies ProjectContent;
