import {
  Code2,
  Database,
  Layout,
  Server,
  Terminal,
  Cloud,
  Globe,
  MonitorSmartphone,
  ShieldCheck,
  Cpu,
  Mail,
  Activity,
  BarChart4,
  MapPin
} from "lucide-react";

import oneboxImage from "../data/images/OneMail_thumbnail.png";
import KLHMedcareImage from "../data/images/KLH_Medcare_thumbnail.png";
import StockMarketAnalysisImage from "../data/images/Stock_Market_Analysis_thumbnail.png";

export const personalInfo = {
  name: import.meta.env.VITE_PERSONAL_NAME,
  title: import.meta.env.VITE_PERSONAL_TITLE,
  shortBio: import.meta.env.VITE_SHORT_BIO,
  email: import.meta.env.VITE_EMAIL,
  phone: import.meta.env.VITE_PHONE,
  location: import.meta.env.VITE_LOCATION,
  github: import.meta.env.VITE_GITHUB_URL,
  linkedin: import.meta.env.VITE_LINKEDIN_URL,
};

export const stats = [
  { label: "CGPA (B.Tech)", value: "9.95/10.0" },
  { label: "Projects Completed", value: "8+" },
  { label: "Technologies", value: "15+" },
  { label: "Certifications", value: "6+" },
];

export const skillsCategories = [
  {
    category: "Web & Backend",
    icon: Server,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "Flask", level: 80 },
      { name: "Django / DRF", level: 85 },
      { name: "FastAPI", level: 80 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    skills: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "Elasticsearch", level: 75 },
    ],
  },
  {
    category: "Languages & Core",
    icon: Terminal,
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 90 },
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "C", level: 90 },
      { name: "Data Structures & Algorithms", level: 85 },
      { name: "OOP & SDLC", level: 90 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 85 },
      { name: "CI/CD (Conceptual)", level: 75 },
      { name: "Git/GitHub", level: 90 },
    ],
  },
];

export const projectsData = [
  {
    title: "OneBox - Real-Time Email Aggregator with AI",
    description: "Cloud-ready email aggregation platform handling 100+ emails/day with real-time IMAP IDLE sync. 98-99% AI categorization accuracy using Groq Llama 3.",
    image: oneboxImage,
    tech: ["Node.js", "TypeScript", "React", "Elasticsearch", "Qdrant", "Docker"],
    features: [
      "AI-based smart reply generation",
      "Sub-100ms semantic search across 20k+ emails",
      "Microservices architecture (5+ services)"
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/Nirmal-36/OneBox"
  },
  {
    title: "KLH MedCare - Healthcare Management Platform",
    description: "Modular enterprise full-stack application supporting 7+ user roles and 10+ core workflows including patient records and real-time dashboards.",
    image: KLHMedcareImage,
    tech: ["React.js", "Material-UI", "Django", "DRF", "MySQL"],
    features: [
      "Optimized MySQL queries (45% faster)",
      "Enterprise-grade security (OTP, token auth)",
      "25+ REST APIs developed"
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/Nirmal-36/MRD"
  },
  {
    title: "Stock Market Analysis System",
    description: "Real-time stock analytics platform processing 1M+ historical market records with interactive dashboards and 35% faster FastAPI responses.",
    image: StockMarketAnalysisImage,
    tech: ["FastAPI", "MongoDB", "MySQL", "Pandas", "React.js"],
    features: [
      "7D-5Y historical analysis with fuzzy tracking",
      "Automated data ingestion pipelines",
      "SQL + NoSQL hybrid architecture"
    ],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    title: "AI-Powered Travel Assistant App",
    description: "NLP-driven travel assistant generating tailored itineraries in under 2 seconds from natural language queries.",
    image: StockMarketAnalysisImage,
    tech: ["Flask", "LangChain", "Groq", "SerpAPI"],
    features: [
      "Real-time flight and hotel integration",
      "Clean modular architectural design",
      "Reduced code redundancy by 30%"
    ],
    demoUrl: "#",
    githubUrl: "#"
  }
];

export const educationData = [
  {
    type: "education",
    title: "B.Tech. in Computer Science and Engineering",
    organization: "KL University, Hyderabad",
    date: "2023 - Present",
    description: "CGPA: 9.95/10.0. Recognized with Academic Excellence Award (Ranked 1st in CS Department).",
    icon: Code2
  },
  {
    type: "education",
    title: "Intermediate (MPC)",
    organization: "Sri Chaitanya Junior Kalasala",
    date: "2020 - 2022",
    description: "Percentage: 96.9%. Focus on Mathematics, Physics, and Chemistry.",
    icon: Database
  }
];

export const achievementsAndCertifications = [
  {
    type: "achievement",
    title: "Design Patent - Smart Shopping Cart",
    organization: "Patent Office",
    date: "2024",
    description: "Granted design patent for 'Smart Shopping Cart: Automatic Billing System'.",
    icon: ShieldCheck
  },
  {
    type: "certification",
    title: "AWS Certified Solutions Architect Associate",
    organization: "Amazon Web Services",
    date: "2026 (Expected)",
    description: "Architecting cloud-native solutions.",
    icon: Cloud
  },
  {
    type: "certification",
    title: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    date: "2025",
    description: "Foundational cloud computing knowledge.",
    icon: Cloud
  },
  {
    type: "certification",
    title: "Advanced Automation Professional",
    organization: "Automation Anywhere University",
    date: "2025",
    description: "Proficiency in building automated workflows.",
    icon: Cpu
  },
  {
    type: "certification",
    title: "MongoDB Associate Developer",
    organization: "MongoDB University",
    date: "2024",
    description: "NoSQL database query and design proficiency.",
    icon: Database
  }
];

export const experienceTimeline = [...educationData, ...achievementsAndCertifications];
