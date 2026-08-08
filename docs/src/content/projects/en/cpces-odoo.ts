import type { ProjectContent } from "../../types";

export default {
  title: "Odoo Integration",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "mysql", "sql-server"],
  live: "https://oficinavirtualdev.consejosalta.org.ar/",
  liveLabel: "View platform",
  accessNote: "The source code and operational data are private. This evidence summarizes architecture, scope and impact without exposing sensitive information.",
  description:
    "CPCES operated with three disconnected systems: a custom Windows application, Tango, and a Tango-based solution. This caused duplicated data, in-person procedures, and lack of traceability. I led the unification of the entire operation into an Odoo platform, gathering requirements with end users and the product owner, designing the technical architecture, and coordinating a team of 8 people. The environment integrates PostgreSQL, MySQL, and SQL Server depending on the subsystem. Today the ecosystem supports more than 7,000 professionals through 24 custom modules.",
  components: [
    {
      type: "evidence",
      props: {
        title: "From isolated systems to a unified operation",
        summary: "The core decision was to consolidate processes and data while preserving interoperability with existing sources.",
        stats: [
          { value: "7,000+", label: "professionals supported" },
          { value: "24", label: "custom modules" },
          { value: "3", label: "source systems" },
          { value: "8", label: "people on the team" },
        ],
        stages: [
          { title: "Discovery", detail: "Windows, Tango and a third solution operated with separate data and processes." },
          { title: "Architecture", detail: "Odoo as the core, integrating PostgreSQL, MySQL and SQL Server by subsystem." },
          { title: "Outcome", detail: "A portal and 24 modules for digital procedures, traceability and institutional management." },
        ],
      },
    },
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
        src: "/static/media/projects/media/cpces-odoo.webp",
        alt: "CPCES",
        caption: "CPCES",
      },
    },
  ],
} as const satisfies ProjectContent;
