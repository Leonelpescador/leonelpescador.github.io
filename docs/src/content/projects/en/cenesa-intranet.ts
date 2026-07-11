import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Corporate Intranet",
  theme: "light",
  tags: ["django", "fastapi", "react-native", "firebase", "postgresql"],
  live: "https://drive.google.com/file/d/11gh83zIf9nuE4C3Se6Aka7nRVHqzptms/view",
  description:
    "The clinic depended on a system that did not cover the full operation: processes such as vacation requests, medication control, and health insurer billing were handled outside the system, causing stock mismanagement, delays, and operational risk. I designed and implemented a mission-critical intranet with Django, FastAPI, and React Native, centralizing operations and reducing tasks that previously took hours or days to minutes.",
  components: [
    {
      type: "text",
      props: {
        title: "My role",
        text: "I acted as the main technical lead. Designed the overall architecture, developed administrative modules, built the API with FastAPI, developed the Android application from scratch for inpatient tablets, and managed the clinic's server infrastructure.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Designed the end-to-end architecture: Django + FastAPI + React Native.",
          "Centralized processes for administration, HR, medication control, health insurer billing, and others.",
          "Implemented full traceability for medication assignment (nurse, time, warehouse).",
          "Developed the Android app from scratch for inpatient tablets, designed for nurses.",
          "Created a billing module that generates import files for health insurers.",
          "Integrated documented health insurer APIs.",
          "Reduced operational tasks from hours or days to minutes.",
          "Managed the clinic's IT infrastructure.",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: "/static/media/projects/media/cenesa-intranet.webp",
        alt: "CENESA",
        caption: "CENESA",
      },
    },
  ],
} as const satisfies ProjectContent;
