import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Integración de Odoo",
    slug: "cpces-odoo",
    thumbnail: "https://www.consejosalta.org.ar/wp-content/uploads/LOGO-APAISADO-SIN-FONDO-PNG.png",
    description: "Digitalización y automatización de procesos internos",
  },
  {
    title: "CENESA · Sitio Corporativo",
    slug: "cenesa-web",
    thumbnail: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
    description: "Sitio web institucional corporativo",
  },
  {
    title: "CENESA · Intranet Corporativa",
    slug: "cenesa-intranet",
    thumbnail: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
    description: "Sistema de gestión interna y API mobile",
  },
] as const satisfies ProjectPreview[];
