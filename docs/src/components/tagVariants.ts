export type TagVariant =
  | "python"
  | "django"
  | "fastapi"
  | "odoo"
  | "react-native"
  | "postgresql"
  | "mysql"
  | "sql-server"
  | "firebase"
  | "docker"
  | "three"
  | "websockets"
  | "react"
  | "redis"
  | "gray"
  | "html"
  | "css"
  | "javascript"
  | "node"
  | "next"
  | "kubernetes"
  | "ogl"
  | "glsl";

export const tagLabels = {
  python: "Python",
  django: "Django",
  fastapi: "FastAPI",
  odoo: "Odoo",
  "react-native": "React Native",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  "sql-server": "SQL Server",
  firebase: "Firebase",
  docker: "Docker",
  three: "Three.js",
  websockets: "WebSockets",
  react: "React",
  redis: "Redis",
  gray: "Gray",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  node: "Node.js",
  next: "Next.js",
  kubernetes: "Kubernetes",
  ogl: "OGL.js",
  glsl: "GLSL",
} as const satisfies Record<TagVariant, string>;
