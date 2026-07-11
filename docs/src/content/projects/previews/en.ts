import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Odoo Integration",
    slug: "cpces-odoo",
    thumbnail: "/static/media/projects/thumbnails/cpces-odoo.webp",
    description: "Unified 3 systems into Odoo with 24 custom modules",
  },
  {
    title: "CENESA · Corporate Website",
    slug: "cenesa-web",
    thumbnail: "/static/media/projects/thumbnails/cenesa-web.webp",
    description: "Institutional redesign from scratch with HTML, CSS and JavaScript",
  },
  {
    title: "CENESA · Corporate Intranet",
    slug: "cenesa-intranet",
    thumbnail: "/static/media/projects/thumbnails/cenesa-intranet.webp",
    description: "Mission-critical intranet with API and Android app for nurses",
  },
] as const satisfies ProjectPreview[];
