import type { ProjectContent } from "../../types";

export default {
  title: "Odoo Integration",
  theme: "light",
  tags: ["python", "odoo", "postgresql", "mysql", "sql-server"],
  live: "https://www.consejosalta.org.ar/",
  liveLabel: "View institutional site",
  accessNote: "Contractual restrictions prevent identifying the previous systems or displaying operational data. This case only includes authorized information.",
  description:
    "CPCES operated with three legacy systems that handled different parts of the work. Information had to be entered more than once, causing duplicates, synchronization gaps and inconsistencies in final calculations. I worked end to end on a unified Odoo platform for institutional staff and approximately 7,000 professionals in economics-related fields.",
  components: [
    {
      type: "evidence",
      props: {
        title: "One platform for the institutional operation",
        summary: "The implementation combined discovery, architecture, historical migration, data sanitization and the digitization of workflows that previously depended on paper or separate platforms.",
        stats: [
          { value: "1M+", label: "records migrated and cleaned" },
          { value: "30+", label: "modules developed" },
          { value: "7,000", label: "professionals supported" },
          { value: "9", label: "team members: 8 technical specialists and a Product Manager" },
        ],
        stages: [
          { title: "Problem", detail: "Three disconnected systems forced duplicate entry and produced out-of-sync information." },
          { title: "Intervention", detail: "Odoo centralized workflows, historical data and more than 30 institutional modules." },
          { title: "Status", detail: "The platform is in production, continues to evolve and centralizes professional self-service." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "My role",
        text: "I contributed to functional discovery, architecture, development, migration, deployment and training. At different stages I also coordinated work within a team of eight developers and computer engineers plus one Product Manager.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Unified workflows from three legacy systems without exposing contractual information.",
          "Migrated, cleaned and consolidated more than one million historical records, including residual and duplicated data.",
          "Contributed to more than 30 modules, including professional management, legalizations and accounting.",
          "Digitized paper-based workflows and brought a broad set of procedures into the self-service portal.",
          "Supported production delivery and the platform's ongoing evolution.",
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
