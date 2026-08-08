import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Intranet Corporativa",
  theme: "light",
  tags: ["django", "fastapi", "react-native", "firebase", "postgresql"],
  live: "https://drive.google.com/file/d/11gh83zIf9nuE4C3Se6Aka7nRVHqzptms/view",
  liveLabel: "Ver demostración",
  accessNote: "La intranet y sus pantallas productivas son privadas. El APK enlazado es únicamente demostrativo y no permite acceder al sistema ni a datos clínicos.",
  description:
    "Diseñé y desarrollé una plataforma interna para aproximadamente 30 empleados de CENESA. La solución conecta facturación, enfermería, farmacia y administración, digitaliza procesos internos y permite registrar y auditar la administración de medicamentos desde tablets.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Una operación interna conectada y trazable",
        summary: "La intranet funciona exclusivamente dentro de la LAN institucional y conecta la gestión web con una aplicación móvil siempre online.",
        stats: [
          { value: "≈30", label: "empleados usuarios" },
          { value: "4", label: "áreas operativas conectadas" },
          { value: "LAN", label: "acceso restringido a la institución" },
        ],
        stages: [
          { title: "Procesos internos", detail: "Vacaciones, disponibilidad y novedades para sueldos pasaron a flujos digitales." },
          { title: "Integración controlada", detail: "FastAPI permite consultar información de Geclisa sin escribir datos en el sistema clínico." },
          { title: "Operación en sala", detail: "React Native y Expo permiten que enfermería registre lo administrado para su control por farmacia." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Creé el proyecto de principio a fin: relevamiento, diseño, arquitectura, desarrollo web y móvil, API, seguridad de red, despliegue y soporte. La aplicación web utiliza Django, HTML, CSS y JavaScript; FastAPI comunica la operación móvil; React Native y Expo resuelven la app; Firebase se usa exclusivamente para autenticación.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Centralicé procesos de facturación, enfermería, farmacia y administración.",
          "Digitalicé solicitudes de vacaciones, consulta de disponibilidad y preparación de novedades para sueldos.",
          "Implementé registro y trazabilidad de medicamentos para comparar lo ingresado por enfermería con lo suministrado por farmacia.",
          "Desarrollé una aplicación para tablets con React Native y Expo, disponible solamente con conexión.",
          "Integré consultas de solo lectura con Geclisa mediante FastAPI.",
          "Restringí la aplicación web a la LAN mediante MikroTik e implementé permisos por usuario y rol.",
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
