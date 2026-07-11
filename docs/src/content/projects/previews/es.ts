import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Integración de Odoo",
    slug: "cpces-odoo",
    thumbnail: "/static/media/projects/thumbnails/cpces-odoo.webp",
    description: "Unificación de 3 sistemas en Odoo con 24 módulos personalizados",
  },
  {
    title: "CENESA · Sitio Corporativo",
    slug: "cenesa-web",
    thumbnail: "/static/media/projects/thumbnails/cenesa-web.webp",
    description: "Rediseño institucional desde cero con Next.js y React",
  },
  {
    title: "CENESA · Intranet Corporativa",
    slug: "cenesa-intranet",
    thumbnail: "/static/media/projects/thumbnails/cenesa-intranet.webp",
    description: "Intranet crítica con API y app Android para enfermeros",
  },
  {
    title: "Migración a Odoo · Burgos 1950",
    slug: "burgos1950-odoo",
    thumbnail: "/static/media/projects/thumbnails/burgos1950-odoo.webp",
    description: "Migración integral del sistema Zeus a Odoo con modelos personalizados",
  },
] as const satisfies ProjectPreview[];
