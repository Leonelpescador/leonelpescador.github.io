import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Corporate Intranet",
  theme: "light",
  tags: ["django", "fastapi", "react-native", "firebase", "postgresql"],
  live: "https://drive.google.com/file/d/11gh83zIf9nuE4C3Se6Aka7nRVHqzptms/view",
  liveLabel: "View demo",
  accessNote: "The intranet and its production screens are private. The linked APK is only a demonstration and cannot access the system or any clinical data.",
  description:
    "I designed and developed an internal platform for approximately 30 CENESA employees. It connects billing, nursing, pharmacy and administration, digitizes internal workflows and supports medication administration and auditing from tablets.",
  components: [
    {
      type: "evidence",
      props: {
        title: "A connected and traceable internal operation",
        summary: "The intranet runs exclusively within the institutional LAN and connects the web operation with an always-online mobile application.",
        stats: [
          { value: "+30", label: "employee users" },
          { value: "4", label: "operational areas connected" },
          { value: "LAN", label: "access restricted to the institution" },
        ],
        stages: [
          { title: "Internal workflows", detail: "Leave requests, availability and payroll updates moved into digital workflows." },
          { title: "Controlled integration", detail: "FastAPI reads information from Geclisa without writing data into the clinical system." },
          { title: "Ward operations", detail: "React Native and Expo let nursing record administered medication for pharmacy reconciliation." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "My role",
        text: "I created the project end to end: discovery, design, architecture, web and mobile development, API, network security, deployment and support. The web app uses Django, HTML, CSS and JavaScript; FastAPI supports mobile communication; React Native and Expo power the app; Firebase is used only for authentication.",
      },
    },
    {
      type: "list",
      props: {
        title: "Key contributions",
        items: [
          "Centralized billing, nursing, pharmacy and administrative workflows.",
          "Digitized leave requests, availability checks and payroll update preparation.",
          "Implemented medication recording and traceability so pharmacy can compare entered and supplied items.",
          "Built a tablet application with React Native and Expo that requires a connection.",
          "Integrated read-only Geclisa queries through FastAPI.",
          "Restricted the web application to the LAN through MikroTik and implemented user- and role-based permissions.",
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
