// ============================================================
// ACHIEVEMENTS / STATS DATA — Edit counter values here
// ============================================================

export interface Achievement {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon: string;
  color: string;
}

export const achievements: Achievement[] = [
  {
    id: "projects",
    value: 10,
    suffix: "+",
    label: "Major Projects",
    description: "Full-stack apps, 3D visualizers, & AI platforms",
    icon: "Layers",
    color: "#06b6d4",
  },
  {
    id: "certifications",
    value: 5,
    suffix: "+",
    label: "Major Certifications",
    description: "NPTEL, Google, IBM, IAMNEO",
    icon: "Award",
    color: "#ec4899",
  },
  {
    id: "cgpa",
    value: 8,
    suffix: ".9 8",
    label: "CGPA",
    description: "VIT Bhopal University (CS Major)",
    icon: "Trophy",
    color: "#f59e0b",
  },
  {
    id: "highschool",
    value: 91,
    suffix: ".2%",
    label: "Class 12th",
    description: "Bal Bharati Public School",
    icon: "Star",
    color: "#a855f7",
  },
];

// About section focus areas
export interface FocusArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export const focusAreas: FocusArea[] = [
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "End-to-end applications with the MERN stack (MongoDB, Express, React, Node). Emphasis on scalable and secure systems.",
    icon: "Layers",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description:
      "Exploring regression, classification, and model evaluation. Building platforms for AI model discovery and integration.",
    icon: "Brain",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "networking",
    title: "Computer Networking",
    description:
      "Deep understanding of TCP/IP, DNS, and network security. Built full-stack network scanners to identify active devices.",
    icon: "Binary",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "datascience",
    title: "Data Science & Analytics",
    description:
      "Extracting actionable insights from complex datasets. Exploring data visualization, statistical analysis, and ML pipelines.",
    icon: "Lightbulb",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];
