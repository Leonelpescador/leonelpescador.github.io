import type { ProjectContent } from "../../types";

export default {
  title: "Odoo Migration · Burgos 1950",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "javascript"],
  live: "https://www.burgos1950.com.ar/",
  liveLabel: "Learn about the company",
  accessNote: "The Odoo platform and its source code are private. The link opens the client’s institutional website and this case only shows authorized information.",
  description:
    "Burgos 1950 began a gradual migration from Zeus to an owned and customized Odoo solution. I am the only IT specialist in a four-person team and own the technical execution, from initial setup and data migration to module adaptation and deployment on Odoo.sh.",
  components: [
    {
      type: "evidence",
      props: {
        title: "A gradual migration without interrupting operations",
        summary: "The first stage keeps Zeus and Odoo running side by side while data and workflows move across four business units.",
        stats: [
          { value: "1,000,000+", label: "records migrated and validated" },
          { value: "+6 years", label: "of historical information" },
          { value: "4", label: "business units" },
          { value: "1", label: "IT specialist on the team" },
        ],
        stages: [
          { title: "Starting point", detail: "Zeus continues to support part of the operation during the first stage." },
          { title: "Migration", detail: "Products, sales, employees, contacts and other data move from the historical database." },
          { title: "New platform", detail: "Odoo.sh adds adapted modules and new development around the company's workflows." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "My role",
        text: "I own the technical work end to end: setup, process analysis, data migration and validation, module adaptation and development, website design and Odoo.sh configuration. The team has four members and I am its only IT specialist.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Planned a gradual transition in which Odoo initially coexists with Zeus.",
          "Migrated and validated more than 100,000 records covering approximately six years.",
          "Adapted existing modules and developed new functionality for all four business units.",
          "Designed the website according to the identity criteria defined by the company.",
          "Implemented the solution on Odoo.sh with Python, PostgreSQL, XML and JavaScript.",
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
