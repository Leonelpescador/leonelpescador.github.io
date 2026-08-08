import type { ProjectContent } from "../../types";

export default {
  title: "Integración de Odoo",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "mysql", "sql-server"],
  live: "https://www.consejosalta.org.ar/",
  liveLabel: "Ver sitio institucional",
  accessNote: "Por restricciones contractuales no se identifican los sistemas anteriores ni se muestran datos operativos. El alcance publicado se limita a información autorizada.",
  description:
    "El CPCES operaba con tres sistemas heredados que resolvían partes diferentes del trabajo. La información debía cargarse más de una vez y aparecían duplicados, desfases e inconsistencias en cálculos finales. Participé de punta a punta en la construcción de una plataforma Odoo unificada para el personal de la institución y aproximadamente 7.000 profesionales vinculados a las ciencias económicas.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Una operación institucional en una sola plataforma",
        summary: "La implementación combinó relevamiento, arquitectura, migración histórica, sanitización y digitalización de procesos que antes dependían de papel o plataformas separadas.",
        stats: [
          { value: "+1 millón", label: "de registros migrados y depurados" },
          { value: "+30", label: "módulos desarrollados" },
          { value: "7.000", label: "profesionales comprendidos" },
          { value: "9", label: "integrantes: 8 técnicos y un Product Manager" },
        ],
        stages: [
          { title: "Problema", detail: "Tres sistemas desconectados obligaban a duplicar cargas y generaban información desfasada." },
          { title: "Intervención", detail: "Odoo centralizó procesos, datos históricos y más de 30 módulos de gestión institucional." },
          { title: "Estado", detail: "La plataforma está en producción, continúa evolucionando y concentra la autogestión profesional." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Participé en relevamiento funcional, arquitectura, desarrollo, migración, despliegue y capacitación. Durante distintas etapas también coordiné el trabajo dentro de un equipo formado por ocho desarrolladores e ingenieros informáticos y un Product Manager.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Unifiqué procesos provenientes de tres sistemas heredados sin exponer información contractual.",
          "Migré, depuré y consolidé más de un millón de registros históricos, incluyendo datos residuales y duplicados.",
          "Participé en el desarrollo de más de 30 módulos; entre los principales se encuentran gestión del profesional, legalizaciones y contabilidad.",
          "Digitalicé procesos que se realizaban en papel y concentré un amplio conjunto de trámites en el portal de autogestión.",
          "Acompañé la puesta en producción y la evolución continua de la plataforma.",
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
