import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Integración de Odoo",
    slug: "cpces-odoo",
    thumbnail: "/static/media/projects/thumbnails/cpces-odoo.webp",
    description: "Unificación de 3 sistemas en Odoo con 24 módulos personalizados",
    evidence: ["7.000+ profesionales", "24 módulos", "3 sistemas"],
  },
  {
    title: "CENESA · Sitio Corporativo",
    slug: "cenesa-web",
    thumbnail: "/static/media/projects/thumbnails/cenesa-web.webp",
    description: "Rediseño institucional desde cero con Next.js y React",
    evidence: ["40+ años de marca", "Rediseño integral", "Next.js"],
  },
  {
    title: "CENESA · Intranet Corporativa",
    slug: "cenesa-intranet",
    thumbnail: "/static/media/projects/thumbnails/cenesa-intranet.webp",
    description: "Intranet crítica con API y app Android para enfermeros",
    evidence: ["Horas → minutos", "Web + API + Android", "Uso crítico"],
  },
  {
    title: "Migración a Odoo · Burgos 1950",
    slug: "burgos1950-odoo",
    thumbnail: "/static/media/projects/thumbnails/burgos1950-odoo.webp",
    description: "Migración integral del sistema Zeus a Odoo con modelos personalizados",
    evidence: ["70+ años de operación", "4 unidades", "Migración integral"],
  },
] as const satisfies ProjectPreview[];
