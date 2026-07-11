import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Corporate Intranet",
  theme: "dark",
  tags: ["django", "fastapi", "react-native", "firebase", "postgresql"],
  live: "https://drive.google.com/file/d/11gh83zIf9nuE4C3Se6Aka7nRVHqzptms/view",
  description:
    "System developed exclusively for use on the company intranet, handling administrative management, HR, medication control, and other functionalities. API built with FastAPI for communication with the mobile app created with React Native for Android.",
  components: [
    {
      type: "text",
      props: {
        title: "Description",
        text: "System developed exclusively for use on the company intranet, handling administrative management, HR, medication control, and other functionalities. API built with FastAPI for communication with the mobile app created with React Native for Android.",
      },
    },
    {
      type: "list",
      props: {
        title: "Main modules",
        items: [
          "Administrative management",
          "HR control",
          "Medication control",
          "FastAPI for mobile app",
          "Android app with React Native",
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
