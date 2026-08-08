import type { ProjectContent } from "../../types";

export default {
  title: "Migración a Odoo · Burgos 1950",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "javascript"],
  live: "https://www.burgos1950.com.ar/",
  liveLabel: "Conocer la empresa",
  accessNote: "La plataforma Odoo y su código son privados. El enlace lleva al sitio institucional del cliente y el caso muestra únicamente información autorizada.",
  description:
    "Burgos 1950 inició una migración gradual desde Zeus hacia una solución propia y personalizada sobre Odoo. Soy el único perfil informático dentro de un equipo de cuatro personas y estoy a cargo de la ejecución técnica, desde la puesta en marcha y la migración de datos hasta la adaptación de módulos y el despliegue en Odoo.sh.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Una migración gradual sin interrumpir la operación",
        summary: "La primera etapa mantiene la convivencia entre Zeus y Odoo mientras se trasladan datos y procesos de cuatro unidades de negocio.",
        stats: [
          { value: "+1 M", label: "registros migrados y validados" },
          { value: "+6 años", label: "de información histórica" },
          { value: "4", label: "unidades de negocio" },
          { value: "1", label: "perfil informático en el equipo" },
        ],
        stages: [
          { title: "Punto de partida", detail: "Zeus continúa sosteniendo parte de la operación durante la primera etapa." },
          { title: "Migración", detail: "Productos, ventas, empleados, contactos y otros datos se trasladan desde la base histórica." },
          { title: "Nueva plataforma", detail: "Odoo.sh incorpora módulos adaptados y nuevos desarrollos según los procesos de la empresa." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Soy responsable del frente técnico de principio a fin: puesta en marcha, análisis de procesos, migración y validación de datos, adaptación y creación de módulos, diseño del sitio y configuración de Odoo.sh. El equipo está formado por cuatro personas y soy el único integrante con perfil informático.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Planifiqué una transición gradual en la que Odoo convive inicialmente con Zeus.",
          "Migré y validé más de 1.000.000 registros correspondientes a aproximadamente seis años.",
          "Adapté módulos existentes y desarrollé nuevas funcionalidades para las cuatro unidades de negocio.",
          "Diseñé el sitio web siguiendo los criterios de identidad definidos por la empresa.",
          "Implementé la solución en Odoo.sh con Python, PostgreSQL, XML y JavaScript.",
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
