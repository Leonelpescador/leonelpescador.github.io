import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Integración de Odoo",
    slug: "cpces-odoo",
    thumbnail: "/static/media/projects/thumbnails/cpces-odoo.webp",
    description: "Tres sistemas heredados, más de un millón de registros y una operación institucional unificada en Odoo",
    evidence: ["+1 millón de registros", "+30 módulos", "En producción y evolución"],
  },
  {
    title: "CENESA · Sitio Corporativo",
    slug: "cenesa-web",
    thumbnail: "/static/media/projects/thumbnails/cenesa-web.webp",
    description: "Rediseño y desarrollo individual del sitio institucional, desde Figma hasta infraestructura y publicación",
    evidence: ["7 secciones principales", "Proyecto individual", "Sitio público"],
  },
  {
    title: "CENESA · Intranet Corporativa",
    slug: "cenesa-intranet",
    thumbnail: "/static/media/projects/thumbnails/cenesa-intranet.webp",
    description: "Intranet y app para conectar administración, enfermería, farmacia y facturación dentro de la LAN",
    evidence: ["≈30 empleados", "4 áreas conectadas", "Django + API + app"],
  },
  {
    title: "Migración a Odoo · Burgos 1950",
    slug: "burgos1950-odoo",
    thumbnail: "/static/media/projects/thumbnails/burgos1950-odoo.webp",
    description: "Primera etapa de una migración gradual desde Zeus hacia una solución personalizada en Odoo.sh",
    evidence: ["+100.000 registros", "≈6 años de datos", "4 unidades"],
  },
] as const satisfies ProjectPreview[];
