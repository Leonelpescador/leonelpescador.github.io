import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Corporate Website",
  theme: "light",
  tags: ["django", "postgresql", "html", "css", "javascript"],
  live: "https://www.cenesa.com.ar",
  description:
    "Design and development of the institutional and corporate website for CENESA S.A. Modern frontend architecture focused on performance, SEO and user experience. Responsible for the complete cycle: UI/UX design, development and deployment infrastructure.",
  components: [
    {
      type: "text",
      props: {
        title: "Description",
        text: "Design and development of the institutional and corporate website for CENESA S.A. Modern frontend architecture focused on performance, SEO and user experience. Responsible for the complete cycle: UI/UX design, development and deployment infrastructure.",
      },
    },
    {
      type: "list",
      props: {
        title: "Technologies and responsibilities",
        items: [
          "Django as main backend",
          "PostgreSQL for persistence",
          "HTML/CSS/JS frontend",
          "UI/UX and deployment",
          "SEO optimization",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "https://archivoscenesa.up.railway.app/media/archivos/logos-de-cenesa_sombra.png",
        alt: "CENESA",
        caption: "CENESA",
      },
    },
  ],
} as const satisfies ProjectContent;
