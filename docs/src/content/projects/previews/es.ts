import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Integración de Odoo",
    slug: "cpces-odoo",
    thumbnail: "https://www.consejosalta.org.ar/wp-content/uploads/LOGO-APAISADO-SIN-FONDO-PNG.png",
    description: "Unificación de 3 sistemas en Odoo con 24 módulos personalizados",
  },
  {
    title: "CENESA · Sitio Corporativo",
    slug: "cenesa-web",
    thumbnail: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
    description: "Rediseño institucional desde cero con HTML, CSS y JavaScript",
  },
  {
    title: "CENESA · Intranet Corporativa",
    slug: "cenesa-intranet",
    thumbnail: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
    description: "Intranet crítica con API y app Android para enfermeros",
  },
] as const satisfies ProjectPreview[];
