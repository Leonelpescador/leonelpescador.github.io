import type { ProjectContent } from "../../types";

export default {
  title: "Odoo Integration",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "mysql", "sql-server"],
  live: "https://oficinavirtualdev.consejosalta.org.ar/",
  description:
    "CPCES operated with three disconnected systems: a custom Windows application, Tango, and a Tango-based solution. This caused duplicated data, in-person procedures, and lack of traceability. I led the unification of the entire operation into an Odoo platform, gathering requirements with end users and the product owner, designing the technical architecture, and coordinating a team of 8 people. The environment integrates PostgreSQL, MySQL, and SQL Server depending on the subsystem. Today the ecosystem supports more than 7,000 professionals through 24 custom modules.",
  components: [
    {
      type: "text",
      props: {
        title: "My role",
        text: "I was responsible for the full project lifecycle: functional analysis, process modeling, data model design, entity relationships, custom business logic, historical data migration from three independent databases, and production deployment. I made the key technical decisions during the critical modeling and architecture stages.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Unified three heterogeneous systems into an Odoo platform.",
          "Gathered workflows with end users and the product owner.",
          "Designed the technical architecture and data model in Odoo.",
          "Developed 24 custom modules (HR, professional registrations, legalizations, online procedures portal, among others).",
          "Consolidated historical data migration by validating information across three databases.",
          "Enabled the digitalization of in-person procedures, turning them into 100% online processes.",
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
