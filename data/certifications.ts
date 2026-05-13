// ============================================================
// CERTIFICATIONS DATA — Add/edit certificates here (ONE FILE!)
// ============================================================

export type CertCategory =
  | "AI/ML"
  | "Cloud"
  | "Development"
  | "DSA"
  | "Security"
  | "Data Science"
  | "Networking"
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
  certificatePdf?: string; // path under /public e.g. "/certifications/nptel-ml.pdf"
}

export const certifications: Certification[] = [
  {
    id: "nptel-ml",
    title: "Introduction to Machine Learning",
    issuer: "NPTEL",
    issuerLogo: "https://www.google.com/s2/favicons?domain=swayam.gov.in&sz=128",
    date: "2024",
    credentialUrl: "#",
    certificatePdf: "/certifications/IntroductiontoMachine Learning.pdf",
    category: "AI/ML",
    featured: true,
    skills: ["Regression", "Classification", "Model Evaluation"],
  },
  {
    id: "google-networking",
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    issuerLogo: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    date: "2024",
    credentialUrl: "#",
    certificatePdf: "/certifications/Coursera6N2KX8425XRT.pdf",
    category: "Networking",
    featured: true,
    skills: ["Networking Fundamentals", "TCP/IP", "DNS"],
  },
  {
    id: "ibm-cybersec",
    title: "Cyber Security Analyst",
    issuer: "IBM",
    issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    date: "2025",
    credentialUrl: "#",
    certificatePdf: "/certifications/IBMCECECSA1INCertificate _ VIT.pdf",
    category: "Security",
    featured: false,
    skills: ["Network Security", "Risk Analysis", "Threat Detection"],
  },
  {
    id: "iamneo-mern",
    title: "MERN Stack Developer",
    issuer: "IAMNEO",
    issuerLogo: "https://media.glassdoor.com/sqls/4630459/iamneo-ai-squareLogo-1695970512977.png",
    date: "2025",
    credentialUrl: "#",
    certificatePdf: "/certifications/IAMENOMERNStackCertificate.pdf",
    category: "Development",
    featured: true,
    skills: ["MongoDB", "Express.js", "React.js", "Node.js"],
  },
  {
    id: "market-analysis",
    title: "Market Analysis",
    issuer: "NPTEL",
    issuerLogo: "https://www.google.com/s2/favicons?domain=swayam.gov.in&sz=128",
    date: "2026",
    credentialUrl: "#",
    certificatePdf: "/certifications/MarketAnalysisCertificate.pdf",
    category: "Data Science",
    featured: false,
    skills: ["Market Research", "Data Analysis", "Business Strategy"],
  },
  {
    id: "deloitte-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    issuerLogo: "https://www.google.com/s2/favicons?domain=deloitte.com&sz=128",
    date: "2025",
    credentialUrl: "#",
    certificatePdf: "/certifications/DataAnalyticsCertificate.pdf",
    category: "Data Science",
    featured: false,
    skills: ["Data Analysis", "Business Intelligence", "Problem Solving"],
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
