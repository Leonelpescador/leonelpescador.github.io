import type { ProjectContent } from "../../types";

export default {
  title: "Odoo Migration · Burgos 1950",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "javascript"],
  live: "https://www.burgos1950.com.ar/",
  liveLabel: "Learn about the company",
  accessNote: "The Odoo platform and its source code are private. The link opens the client’s institutional website and this case only shows authorized information.",
  description:
    "Burgos 1950, a leading beauty company in Salta with over 70 years of history, operated on a Zeus system that limited its growth and integration across business units. As a freelance developer, I led the full migration to Odoo, covering process analysis, data model design, historical data migration, and the creation of the user interface with the corporate color palette. I worked alongside a team of 4 people, coordinating the development of custom models for wholesale distribution, retail, the training academy, and event management. The platform was deployed on Odoo.sh, integrating Python, PostgreSQL, XML, and JavaScript.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Operational migration with business continuity",
        summary: "The challenge combined historical migration, custom models and team coordination across four business units.",
        stats: [
          { value: "70+ years", label: "of company history" },
          { value: "4", label: "people coordinated" },
          { value: "4", label: "business units modeled" },
        ],
        stages: [
          { title: "Legacy system", detail: "Zeus limited integration and evolution across business units." },
          { title: "Migration", detail: "Discovery, modeling and validation of historical data in Odoo." },
          { title: "Platform", detail: "Custom models and Odoo.sh deployment with the corporate identity." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "My role",
        text: "I was responsible for leading the end-to-end migration project: process analysis of the Zeus system, data modeling in Odoo, historical data migration and validation, interface and color palette design, and team coordination. I made the key technical decisions regarding architecture, custom models, and Odoo.sh configuration.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Led the complete migration from the Zeus system to Odoo.",
          "Designed and implemented custom models for distribution, retail, academy, and events.",
          "Migrated and validated historical data ensuring information integrity.",
          "Designed the user interface and corporate color palette.",
          "Coordinated a team of 4 people throughout the entire project.",
          "Deployed the solution on Odoo.sh with Python, PostgreSQL, XML, and JavaScript integration.",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "/static/media/projects/media/burgos1950-odoo.webp",
        alt: "Burgos 1950",
        caption: "Burgos 1950",
      },
    },
  ],
} as const satisfies ProjectContent;
