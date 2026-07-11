import type { ProjectContent } from "../../types";

export default {
  title: "Integración de Odoo",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "docker"],
  live: "https://oficinavirtualdev.consejosalta.org.ar/",
  description:
    "Desarrollo e integración del ORM de Odoo para la digitalización y automatización de los procesos internos del CPCES. Diseño de modelos de datos, relaciones entre entidades y lógica de negocio personalizada, garantizando escalabilidad y trazabilidad completa.<br/><br/>Migración de datos históricos al nuevo sistema.",
  components: [
    {
      type: "text",
      props: {
        title: "Descripción",
        text: "Desarrollo e integración del ORM de Odoo para la digitalización y automatización de los procesos internos del CPCES. Diseño de modelos de datos, relaciones entre entidades y lógica de negocio personalizada, garantizando escalabilidad y trazabilidad completa.<br/><br/>Migración de datos históricos al nuevo sistema.",
      },
    },
    {
      type: "list",
      props: {
        title: "Funcionalidades clave",
        items: [
          "Modelado de datos y relaciones en Odoo",
          "Lógica de negocio personalizada",
          "Migración de datos históricos",
          "Despliegue con Docker",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "https://www.consejosalta.org.ar/wp-content/uploads/LOGO-APAISADO-SIN-FONDO-PNG.png",
        alt: "CPCES",
        caption: "CPCES",
      },
    },
  ],
} as const satisfies ProjectContent;
