// ============================================================
// PROJECTS DATA — Add/edit projects here (ONE FILE!)
// ============================================================

export type ProjectStatus = "completed" | "in-progress" | "archived";
export type ProjectCategory = "All" | "Web" | "AI/ML" | "DSA" | "Open Source";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string; // path under /public or external URL
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  category: ProjectCategory[];
  year: number;
  stars?: number;
}

export const projects: Project[] = [
  {
    id: "tourweave",
    title: "TourWeave — AI Travel Dashboard",
    description:
      "A collaborative travel dashboard with multi-modal authentication, real-time trip planning, and an AI Heritage Generator.",
    longDescription:
      "Developed a full-stack collaborative travel platform featuring a premium glassmorphic UI. Engineered a multi-modal authentication system and integrated Supabase for backend services (Auth, RLS, PostgreSQL triggers). Built an interactive Bento Grid trips dashboard and an AI Heritage Generator leveraging NLP to provide dynamic historical contexts for travel destinations.",
    image: "/projects/Tourweave.png", 
    tech: ["Next.js", "Supabase", "TailwindCSS", "AI/NLP", "PostgreSQL"],
    githubUrl: "https://github.com/AshwaniArya2005/tourweave/tree/master",
    liveUrl: "https://tourweave.vercel.app",
    status: "completed",
    featured: true,
    category: ["Web", "AI/ML"],
    year: 2026,
  },
  {
    id: "flare-app",
    title: "FLARE — Full Stack Delivery App",
    description:
      "A MERN stack application for grocery, food, and sports item delivery with role-based access control.",
    longDescription:
      "Designed and developed a MERN stack application for grocery, food, and sports item delivery. Implemented secure authentication and role-based access control (admin, vendor, customer). Built a dynamic shopping cart with real-time updates to improve checkout flow and architected the system to be scalable for handling larger order volumes in the future.",
    image: "/projects/Flare.png", 
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    githubUrl: "https://github.com/AshwaniArya2005/Flare-Main",
    liveUrl: "https://flare-tau.vercel.app/",
    status: "completed",
    featured: true,
    category: ["Web"],
    year: 2024,
  },
  {
    id: "living-earth",
    title: "LIVING EARTH — 3D Global Event Visualizer",
    description:
      "Interactive 3D climate visualization tool using React, Three.js, and WebGL to render high-fidelity planetary data.",
    longDescription:
      "Built an interactive 3D climate visualization tool using React, Three.js, and WebGL to render high-fidelity planetary data. Integrated NASA EONET and Open-Meteo APIs to map real-time natural disaster events (wildfires, storms) onto a 3D globe with precise geospatial positioning. Implemented custom GLSL shaders for realistic atmospheric scattering and a dynamic day/night cycle synchronized with real-world UTC time.",
    image: "/projects/LivingEarth.png",
    tech: ["React.js", "Three.js", "WebGL", "GLSL", "NASA API"],
    githubUrl: "https://github.com/AshwaniArya2005/Living-Earth",
    liveUrl: "https://living-earth.vercel.app/",
    status: "completed",
    featured: true,
    category: ["Web", "Open Source"],
    year: 2024,
  },
  {
    id: "trendmind",
    title: "TRENDMIND — AI Model Discovery Platform",
    description:
      "Engineered a web app for exploring, comparing, and downloading trending AI models with detailed model cards.",
    longDescription:
      "Engineered a web app for exploring, comparing, and downloading trending AI models. Implemented user authentication for personalized model access. Developed detailed model cards with metrics and side-by-side comparison features and designed a responsive interface with React.js to ensure accessibility across devices.",
    image: "/projects/TrendMind.png",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
    githubUrl: "https://github.com/AshwaniArya2005/trendMindFinal-main",
    status: "completed",
    featured: true,
    category: ["Web", "AI/ML"],
    year: 2024,
  },
  {
    id: "network-scanner",
    title: "Network Scanner",
    description:
      "Full-stack app to scan local networks, identify active devices, open ports, and OS types.",
    longDescription:
      "Developed a full-stack app to scan local networks, identify active devices, open ports, and OS types. Optimized and implemented backend scanning logic with Node.js & Express.js for accurate detection and created a React.js frontend to visualize scan results in real-time.",
    image: "/projects/network-scanner.png",
    tech: ["Node.js", "Express.js", "React.js", "Networking"],
    githubUrl: "https://github.com/AshwaniArya2005/network-scanner-main",
    status: "completed",
    featured: false,
    category: ["Web", "Open Source"],
    year: 2024,
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    description:
      "Modern developer portfolio with aurora animations, particle effects, and live API integrations.",
    image: "/projects/portfolio.png",
    tech: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
    githubUrl: "https://github.com/AshwaniArya2005/Portfolio",
    liveUrl: "https://ashwaniarya.vercel.app",
    status: "completed",
    featured: false,
    category: ["Web"],
    year: 2026,
  },
  {
    id: "ffcs-slot-planner",
    title: "FFCS Scheduler",
    description:
      "A drag-and-drop based timetable planner for VIT students to visualize and organize their weekly academic schedule.",
    longDescription:
      "Designed and developed FFCS Scheduler, an interactive drag-and-drop based timetable planner specifically tailored for VIT students. Built with React, TypeScript, and react-beautiful-dnd, the application provides a clean, intuitive interface that allows users to seamlessly add, edit, rearrange, and save subject slots interactively to effortlessly organize their weekly academic schedules.",
    image: "/projects/ffcs-planner.png",
    tech: ["React.js", "TypeScript", "CSS", "HTML5"],
    githubUrl: "https://github.com/AshwaniArya2005/FFCS-Slot-Planner/tree/master",
    liveUrl: "https://ffcs-slot-planner-34iv.vercel.app/",
    status: "completed",
    featured: false,
    category: ["Web", "Open Source"],
    year: 2024,
  },
  {
    id: "semantic-search",
    title: "Semantic Search System",
    description:
      "Advanced search system combining dense vector retrieval, fuzzy clustering, and cluster-accelerated semantic caching.",
    longDescription:
      "Engineered a production-grade semantic search system built from first principles. Combines FAISS for efficient ANN retrieval, Gaussian Mixture Models (GMM) for probabilistic fuzzy clustering, and a cluster-routed semantic cache that achieves O(N/K) lookup complexity. Includes a high-performance FastAPI backend with comprehensive diagnostic UMAP visualizations for cluster analysis.",
    image: "/projects/semantic-search.png",
    tech: ["Python", "FastAPI", "FAISS", "SentenceTransformers", "UMAP"],
    githubUrl: "https://github.com/AshwaniArya2005/Semantic-Search",
    status: "completed",
    featured: false,
    category: ["AI/ML", "Web"],
    year: 2024,
  },
  {
    id: "brain-tumor-detection",
    title: "Brain Tumor Detection AI",
    description:
      "Deep Learning model to detect brain tumors from MRI images with high accuracy using CNN architectures.",
    longDescription:
      "Developed an automated brain tumor detection system leveraging Deep Learning and Computer Vision. Built using Python and TensorFlow/Keras, the project utilizes Convolutional Neural Networks (CNN) to classify MRI scans into tumorous and non-tumorous categories. Features include image preprocessing pipelines (noise reduction, normalization), data augmentation for robust training, and performance evaluation using confusion matrices and accuracy metrics.",
    image: "/projects/brain-tumor.png",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Matplotlib"],
    githubUrl: "https://github.com/AshwaniArya2005/Brain-Tumor-Detection",
    status: "completed",
    featured: false,
    category: ["AI/ML"],
    year: 2024,
  },
];

// Filter categories
export const projectCategories: ProjectCategory[] = [
  "All",
  "Web",
  "AI/ML",
  "DSA",
  "Open Source",
];
