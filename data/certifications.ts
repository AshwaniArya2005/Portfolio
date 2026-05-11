// ============================================================
// CERTIFICATIONS DATA — Add/edit certificates here (ONE FILE!)
// ============================================================

export type CertCategory =
  | "AI/ML"
  | "Cloud"
  | "Development"
  | "DSA"
  | "Security"
  | "Other";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string; // path under /public
  date: string; // e.g. "March 2025"
  expiryDate?: string;
  credentialUrl?: string;
  certificateImage?: string; // for modal preview
  category: CertCategory;
  featured?: boolean;
  skills?: string[];
}

export const certifications: Certification[] = [
  {
    id: "nptel-ml",
    title: "Introduction to Machine Learning",
    issuer: "NPTEL",
    date: "2024",
    credentialUrl: "#",
    category: "AI/ML",
    featured: true,
    skills: ["Regression", "Classification", "Model Evaluation"],
  },
  {
    id: "google-networking",
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    date: "2024",
    credentialUrl: "#",
    category: "Other",
    featured: true,
    skills: ["Networking Fundamentals", "TCP/IP", "DNS"],
  },
  {
    id: "ibm-cybersec",
    title: "Cyber Security Analyst",
    issuer: "IBM",
    date: "2024",
    credentialUrl: "#",
    category: "Security",
    featured: false,
    skills: ["Network Security", "Risk Analysis", "Threat Detection"],
  },
  {
    id: "iamneo-mern",
    title: "MERN Stack Developer",
    issuer: "IAMNEO",
    date: "2024",
    credentialUrl: "#",
    category: "Development",
    featured: true,
    skills: ["MongoDB", "Express.js", "React.js", "Node.js"],
  },
];

export const certCategories: Array<"All" | CertCategory> = [
  "All",
  "AI/ML",
  "Cloud",
  "Development",
  "DSA",
  "Other",
];
