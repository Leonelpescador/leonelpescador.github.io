import type { ProjectContent } from "../../types";

export default {
  title: "Odoo Integration",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "docker"],
  live: "https://oficinavirtualdev.consejosalta.org.ar/",
  description:
    "Development and integration of the Odoo ORM for the digitalization and automation of CPCES internal processes. Data model design, entity relationships and custom business logic, ensuring scalability and full traceability.<br/><br/>Historical data migration to the new system.",
  components: [
    {
      type: "text",
      props: {
        title: "Description",
        text: "Development and integration of the Odoo ORM for the digitalization and automation of CPCES internal processes. Data model design, entity relationships and custom business logic, ensuring scalability and full traceability.<br/><br/>Historical data migration to the new system.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key features",
        items: [
          "Data modeling and relationships in Odoo",
          "Custom business logic",
          "Historical data migration",
          "Docker deployment",
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
