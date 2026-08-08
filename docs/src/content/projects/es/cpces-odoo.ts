import type { ProjectContent } from "../../types";

export default {
  title: "Integración de Odoo",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "mysql", "sql-server"],
  live: "https://oficinavirtualdev.consejosalta.org.ar/",
  liveLabel: "Ver plataforma",
  accessNote: "El código y los datos operativos son privados. La evidencia presentada resume arquitectura, alcance e impacto sin exponer información sensible.",
  description:
    "CPCES operaba con tres sistemas desconectados: un desarrollo propio para Windows, Tango y una solución del equipo de Tango. Esto generaba duplicidad de datos, procesos presenciales y falta de trazabilidad. Lideré la unificación de toda la operación en una plataforma Odoo, relevando procesos junto a usuarios finales y el product owner, diseñando la arquitectura técnica y coordinando un equipo de 8 personas. El entorno integra PostgreSQL, MySQL y SQL Server según el subsistema. Hoy el ecosistema soporta a más de 7.000 profesionales a través de 24 módulos personalizados.",
  components: [
    {
      type: "evidence",
      props: {
        title: "De sistemas aislados a una operación unificada",
        summary: "La decisión central fue consolidar procesos y datos sin perder la interoperabilidad con las fuentes existentes.",
        stats: [
          { value: "7.000+", label: "profesionales alcanzados" },
          { value: "24", label: "módulos personalizados" },
          { value: "3", label: "sistemas de origen" },
          { value: "8", label: "personas en el equipo" },
        ],
        stages: [
          { title: "Diagnóstico", detail: "Windows, Tango y una tercera solución operaban con datos y procesos separados." },
          { title: "Arquitectura", detail: "Odoo como núcleo, integrando PostgreSQL, MySQL y SQL Server según cada subsistema." },
          { title: "Resultado", detail: "Portal y 24 módulos para digitalizar trámites, trazabilidad y gestión institucional." },
        ],
      },
    },
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
