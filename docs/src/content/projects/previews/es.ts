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
    description: "Rediseño institucional desde cero con HTML, CSS y JavaScript",
  },
  {
    title: "CENESA · Intranet Corporativa",
    slug: "cenesa-intranet",
    thumbnail: "/static/media/projects/thumbnails/cenesa-intranet.webp",
    description: "Intranet crítica con API y app Android para enfermeros",
  },
] as const satisfies ProjectPreview[];
