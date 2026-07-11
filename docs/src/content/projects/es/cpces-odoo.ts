import type { ProjectContent } from "../../types";

export default {
  title: "Integración de Odoo",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "mysql", "sql-server"],
  live: "https://oficinavirtualdev.consejosalta.org.ar/",
  description:
    "CPCES operaba con tres sistemas desconectados: un desarrollo propio para Windows, Tango y una solución del equipo de Tango. Esto generaba duplicidad de datos, procesos presenciales y falta de trazabilidad. Lideré la unificación de toda la operación en una plataforma Odoo, relevando procesos junto a usuarios finales y el product owner, diseñando la arquitectura técnica y coordinando un equipo de 8 personas. El entorno integra PostgreSQL, MySQL y SQL Server según el subsistema. Hoy el ecosistema soporta a más de 7.000 profesionales a través de 24 módulos personalizados.",
  components: [
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Fui responsable del ciclo completo: relevamiento funcional, modelado de procesos, diseño del modelo de datos, relaciones entre entidades, lógica de negocio personalizada, migración de datos históricos de tres bases independientes y puesta en producción. Tomé las decisiones técnicas clave en modelado y arquitectura durante las etapas críticas del proyecto.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Unifiqué tres sistemas heterogéneos en una plataforma Odoo.",
          "Relevé flujos de trabajo junto a usuarios finales y el product owner.",
          "Diseñé la arquitectura técnica y el modelo de datos de Odoo.",
          "Desarrollé 24 módulos personalizados (RRHH, matrículas, legalizaciones, portal de trámites, entre otros).",
          "Consolidé la migración de datos históricos validando información entre tres bases.",
          "Habilité la digitalización de trámites presenciales, pasando a procesos 100% online.",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "/static/media/projects/media/cpces-odoo.webp",
        alt: "CPCES",
        caption: "CPCES",
      },
    },
  ],
} as const satisfies ProjectContent;
