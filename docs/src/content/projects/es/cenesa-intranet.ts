import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Intranet Corporativa",
  theme: "dark",
  tags: ["django", "fastapi", "react-native", "firebase", "postgresql"],
  live: "https://drive.google.com/file/d/11gh83zIf9nuE4C3Se6Aka7nRVHqzptms/view",
  description:
    "Desarrollo de un sistema de uso exclusivo para la intranet de la empresa, encargado de la gestión administrativa, RRHH, control de medicamentos, entre otras funcionalidades. Desarrollo de API con FastAPI para la comunicación de la app mobile creada con React Native para Android.",
  components: [
    {
      type: "text",
      props: {
        title: "Descripción",
        text: "Desarrollo de un sistema de uso exclusivo para la intranet de la empresa, encargado de la gestión administrativa, RRHH, control de medicamentos, entre otras funcionalidades. Desarrollo de API con FastAPI para la comunicación de la app mobile creada con React Native para Android.",
      },
    },
    {
      type: "list",
      props: {
        title: "Módulos principales",
        items: [
          "Gestión administrativa",
          "Control de RRHH",
          "Control de medicamentos",
          "API FastAPI para app mobile",
          "App Android con React Native",
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
