import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Odoo Integration",
    slug: "cpces-odoo",
    thumbnail: "https://www.consejosalta.org.ar/wp-content/uploads/LOGO-APAISADO-SIN-FONDO-PNG.png",
    description: "Unified 3 systems into Odoo with 24 custom modules",
  },
  {
    title: "CENESA · Corporate Website",
    slug: "cenesa-web",
    thumbnail: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
    description: "Institutional redesign from scratch with HTML, CSS and JavaScript",
  },
  {
    title: "CENESA · Corporate Intranet",
    slug: "cenesa-intranet",
    thumbnail: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
    description: "Mission-critical intranet with API and Android app for nurses",
  },
] as const satisfies ProjectPreview[];
