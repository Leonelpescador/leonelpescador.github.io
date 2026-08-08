import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Corporate Website",
  theme: "light",
  tags: ["next", "react", "javascript"],
  live: "https://www.cenesa.com.ar",
  liveLabel: "View corporate site",
  accessNote: "The public website makes the final result verifiable. The source code belongs to the institution.",
  description:
    "CENESA had a visually outdated web presence that did not communicate its services or institutional identity clearly. I designed and developed the new corporate website independently, from the visual proposal and content migration to infrastructure and publication.",
  components: [
    {
      type: "evidence",
      props: {
        title: "A clearer digital presence for patients",
        summary: "The redesign organized institutional information around services, physicians, news, frequently asked questions, contact and appointment booking.",
        stats: [
          { value: "7", label: "main public sections" },
          { value: "End-to-end", label: "design, development and infrastructure" },
        ],
        stages: [
          { title: "Starting point", detail: "An outdated visual language and content that needed a clearer structure." },
          { title: "Design and build", detail: "Figma and Canva drafts, content migration and a responsive Next.js and React frontend." },
          { title: "Publication", detail: "Hosting, Railway, domain, DNS, Cloudflare and technical SEO under one line of responsibility." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "My role",
        text: "I worked independently and reviewed each visual decision with the institution's owner. I handled UI/UX design, frontend development, content migration, technical SEO, deployment, domain, DNS and Cloudflare configuration.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Replaced an outdated presence with a contemporary corporate site focused on patient clarity.",
          "Designed the experience and presented Figma and Canva drafts to validate the direction with the institution.",
          "Migrated and reorganized the previous website's content.",
          "Developed a responsive website with Next.js and React.",
          "Implemented technical SEO without claiming unmeasured traffic or ranking improvements.",
          "Deployed on Railway.app with Cloudflare-managed DNS.",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "/static/media/projects/media/cenesa-web.webp",
        alt: "CENESA",
        caption: "CENESA",
      },
    },
  ],
} as const satisfies ProjectContent;
