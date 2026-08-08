import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Odoo Integration",
    slug: "cpces-odoo",
    thumbnail: "/static/media/projects/thumbnails/cpces-odoo.webp",
    description: "Three legacy systems, more than one million records and one institutional operation unified in Odoo",
    evidence: ["10M+ records", "30+ modules", "Live and evolving"],
  },
  {
    title: "CENESA · Corporate Website",
    slug: "cenesa-web",
    thumbnail: "/static/media/projects/thumbnails/cenesa-web.webp",
    description: "An independently delivered institutional website, from Figma through infrastructure and publication",
    evidence: ["7 main sections", "Independent delivery", "Public website"],
  },
  {
    title: "CENESA · Corporate Intranet",
    slug: "cenesa-intranet",
    thumbnail: "/static/media/projects/thumbnails/cenesa-intranet.webp",
    description: "An intranet and app connecting administration, nursing, pharmacy and billing within the LAN",
    evidence: ["+30 employees", "4 connected areas", "Django + API + app"],
  },
  {
    title: "Odoo Migration · Burgos 1950",
    slug: "burgos1950-odoo",
    thumbnail: "/static/media/projects/thumbnails/burgos1950-odoo.webp",
    description: "The first stage of a gradual migration from Zeus to a customized Odoo.sh solution",
    evidence: ["1.000.000+ records", "+6 years of data", "4 business units"],
  },
] as const satisfies ProjectPreview[];
