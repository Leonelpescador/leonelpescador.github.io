export type SocialName = "mail" | "github" | "github-cpces" | "instagram" | "linkedin" | "x";

export interface SocialItem {
  url: string;
  name: SocialName;
  label?: string;
}

export const social: SocialItem[] = [
  { url: "mailto:pescadorjesusleonel@gmail.com", name: "mail", label: "Email" },
  { url: "https://github.com/Leonelpescador", name: "github", label: "GitHub" },
  { url: "https://github.com/leonelconsejo", name: "github-cpces", label: "GitHub CPCES" },
  { url: "https://www.linkedin.com/in/pescador-jesus-leonel", name: "linkedin", label: "LinkedIn" },
];
