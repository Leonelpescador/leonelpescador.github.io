import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Corporate Website",
  theme: "light",
  tags: ["next", "react", "javascript"],
  live: "https://www.cenesa.com.ar",
  description:
    "CENESA SA is a high-complexity medical center with over 40 years of history in Salta. It had an outdated, slow WordPress website that no longer represented the institution. I designed and developed the new corporate website from scratch using Next.js and React, with a responsive frontend focused on performance, SEO, and user experience.",
  components: [
    {
      type: "text",
      props: {
        title: "My role",
        text: "I was the sole owner of the project end-to-end: UI/UX design in Figma under institutional criteria, frontend development, SEO optimization, deployment on Railway.app, and DNS management through Cloudflare.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Replaced an obsolete WordPress platform with a modern corporate website.",
          "Designed the user experience and interface in Figma.",
          "Developed a responsive website with Next.js and React.",
          "Optimized SEO and loading times.",
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
