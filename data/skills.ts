// ============================================================
// SKILLS DATA — Edit this to update your skills
// Add a new skill by adding an object to the appropriate category
// ============================================================

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "AI/ML"
  | "Tools"
  | "DSA";

export interface Skill {
  name: string;
  icon: string; // emoji or SVG path reference
  level: number; // 1-100
  category: SkillCategory;
  color?: string;
}

export const skills: Skill[] = [
  // Languages
  { name: "Java", icon: "☕", level: 80, category: "Languages", color: "#ED8B00" },
  { name: "Python", icon: "🐍", level: 75, category: "Languages", color: "#3776AB" },

  // Frontend
  { name: "HTML/CSS", icon: "🌐", level: 92, category: "Frontend", color: "#E34F26" },
  { name: "JavaScript", icon: "🟨", level: 88, category: "Frontend", color: "#F7DF1E" },
  { name: "TypeScript", icon: "🔷", level: 70, category: "Frontend", color: "#3178C6" },
  { name: "React.js", icon: "⚛️", level: 58, category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", icon: "▲", level: 60, category: "Frontend", color: "#ffffff" },
  { name: "TailwindCSS", icon: "🎨", level: 65, category: "Frontend", color: "#06B6D4" },
  { name: "Three.js", icon: "🧊", level: 70, category: "Frontend", color: "#ffffff" },

  // Backend
  { name: "Node.js", icon: "🟢", level: 75, category: "Backend", color: "#339933" },
  { name: "Express.js", icon: "🛤️", level: 72, category: "Backend", color: "#ffffff" },
  { name: "MongoDB", icon: "🍃", level: 60, category: "Backend", color: "#47A248" },
  { name: "MySQL", icon: "🗄️", level: 88, category: "Backend", color: "#4479A1" },

  // AI/ML
  { name: "Machine Learning", icon: "🧠", level: 75, category: "AI/ML", color: "#F7931E" },
  { name: "Scikit-Learn", icon: "🔬", level: 75, category: "AI/ML", color: "#F7931E" },
  { name: "Pandas & NumPy", icon: "📊", level: 80, category: "AI/ML", color: "#150458" },
  { name: "Matplotlib", icon: "📈", level: 75, category: "AI/ML", color: "#11557c" },
  { name: "PyTorch", icon: "🔥", level: 55, category: "AI/ML", color: "#EE4C2C" },
  { name: "TensorFlow / Keras", icon: "🧮", level: 55, category: "AI/ML", color: "#FF6F00" },

  // Tools
  { name: "Git", icon: "🔀", level: 88, category: "Tools", color: "#F05032" },
  { name: "VS Code", icon: "💻", level: 95, category: "Tools", color: "#007ACC" },
  { name: "Firebase", icon: "🔥", level: 75, category: "Tools", color: "#FFCA28" },
  { name: "Supabase", icon: "⚡", level: 70, category: "Tools", color: "#3ECF8E" },
  { name: "AWS", icon: "☁️", level: 70, category: "Tools", color: "#FF9900" },
];

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "AI/ML",
  "Tools",
];
