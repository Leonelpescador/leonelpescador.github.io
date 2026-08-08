import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Odoo Integration",
    slug: "cpces-odoo",
    thumbnail: "/static/media/projects/thumbnails/cpces-odoo.webp",
    description: "Unified 3 systems into Odoo with 24 custom modules",
    evidence: ["7,000+ professionals", "24 modules", "3 systems"],
  },
  {
    title: "CENESA · Corporate Website",
    slug: "cenesa-web",
    thumbnail: "/static/media/projects/thumbnails/cenesa-web.webp",
    description: "Institutional redesign from scratch with Next.js and React",
    evidence: ["40+ year brand", "Full redesign", "Next.js"],
  },
  {
    title: "CENESA · Corporate Intranet",
    slug: "cenesa-intranet",
    thumbnail: "/static/media/projects/thumbnails/cenesa-intranet.webp",
    description: "Mission-critical intranet with API and Android app for nurses",
    evidence: ["Hours → minutes", "Web + API + Android", "Critical use"],
  },
  {
    title: "Odoo Migration · Burgos 1950",
    slug: "burgos1950-odoo",
    thumbnail: "/static/media/projects/thumbnails/burgos1950-odoo.webp",
    description: "Full migration from Zeus to Odoo with custom models",
    evidence: ["70+ years operating", "4 business units", "Full migration"],
  },
] as const satisfies ProjectPreview[];
