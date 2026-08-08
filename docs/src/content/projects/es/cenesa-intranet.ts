import type { ProjectContent } from "../../types";

export default {
  title: "CENESA · Intranet Corporativa",
  theme: "light",
  tags: ["django", "fastapi", "react-native", "firebase", "postgresql"],
  live: "https://drive.google.com/file/d/11gh83zIf9nuE4C3Se6Aka7nRVHqzptms/view",
  liveLabel: "Ver demostración",
  accessNote: "La intranet y su código son privados por tratarse de una operación clínica. La demostración y este caso evitan mostrar datos de pacientes.",
  description:
    "La clínica dependía de un sistema que no cubría la operación completa: procesos como solicitud de vacaciones, control de medicamentos y facturación de obras sociales se manejaban por fuera, generando descontrol de stock, demoras y riesgo operativo. Diseñé e implementé una intranet de misión crítica con Django, FastAPI y React Native, centralizando la operación y reduciendo tareas que tomaban horas o días a minutos.",
  components: [
    {
      type: "evidence",
      props: {
        title: "Una arquitectura para procesos clínicos críticos",
        summary: "La solución conectó administración, API y operación móvil con trazabilidad como criterio transversal.",
        stats: [
          { value: "Horas/días", label: "duración anterior de tareas operativas" },
          { value: "Minutos", label: "duración posterior reportada" },
          { value: "Android", label: "app creada para tablets de internación" },
        ],
        stages: [
          { title: "Procesos dispersos", detail: "Vacaciones, medicamentos y reintegros se gestionaban fuera del sistema principal." },
          { title: "Núcleo integrado", detail: "Django y FastAPI centralizaron reglas, datos e integraciones documentadas." },
          { title: "Operación en sala", detail: "React Native llevó asignación y trazabilidad de medicamentos a tablets." },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Mi rol",
        text: "Actué como responsable técnico principal. Diseñé la arquitectura completa, desarrollé los módulos administrativos, construí la API con FastAPI, desarrollé la aplicación Android desde cero para tablets de internación y administré la infraestructura de servidores de la clínica.",
      },
    },
    {
      type: "list",
      props: {
        title: "Aportes y logros",
        items: [
          "Diseñé la arquitectura integral: Django + FastAPI + React Native.",
          "Centralicé procesos de administración, RRHH, control de medicamentos, facturación de obras sociales y otros.",
          "Implementé trazabilidad completa en la asignación de medicamentos (enfermero, hora, depósito).",
          "Desarrollé la app Android desde cero para tablets de internación, orientada a enfermeros.",
          "Creé un módulo de facturación que genera archivos importadores para obras sociales.",
          "Integré APIs documentadas de obras sociales.",
          "Reduje tareas operativas de horas o días a minutos.",
          "Gestioné la infraestructura TI de la clínica.",
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
