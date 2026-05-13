// ============================================================
// SOCIAL LINKS DATA
// ============================================================
import { personal } from "./personal";

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string; // lucide icon name
  color: string;
  hoverColor: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: `https://github.com/${personal.github}`,
    icon: "Code",
    color: "#ffffff",
    hoverColor: "#a855f7",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: `https://linkedin.com/in/${personal.linkedin}`,
    icon: "Linkedin",
    color: "#0A66C2",
    hoverColor: "#0A66C2",
  },

  {
    id: "instagram",
    label: "Instagram",
    url: `https://instagram.com/${personal.instagram}`,
    icon: "Instagram",
    color: "#E1306C",
    hoverColor: "#E1306C",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    url: `https://leetcode.com/${personal.leetcode}`,
    icon: "Code2",
    color: "#FFA116",
    hoverColor: "#FFA116",
  },
  {
    id: "codeforces",
    label: "Codeforces",
    url: `https://codeforces.com/profile/${personal.codeforces}`,
    icon: "Trophy",
    color: "#1F8ACB",
    hoverColor: "#1F8ACB",
  },
  {
    id: "email",
    label: "Email",
    url: `mailto:${personal.email}`,
    icon: "Mail",
    color: "#06b6d4",
    hoverColor: "#06b6d4",
  },
];
