export type SocialName = "mail" | "github" | "github-cpces" | "instagram" | "linkedin" | "x";

export interface SocialItem {
  url: string;
  name: SocialName;
  label?: string;
  copy?: string;
}

export const social: SocialItem[] = [
  { url: "#", name: "mail", label: "Email", copy: "leopescador07@gmail.com" },
  { url: "https://github.com/Leonelpescador", name: "github", label: "GitHub personal" },
  { url: "https://github.com/leonelconsejo", name: "github-cpces", label: "GitHub CPCES" },
  { url: "https://www.linkedin.com/in/pescador-jesus-leonel", name: "linkedin", label: "LinkedIn" },
];
