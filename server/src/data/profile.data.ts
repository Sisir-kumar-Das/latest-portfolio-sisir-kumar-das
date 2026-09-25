/**
 * Single source of truth for all portfolio content.
 * The REST API (see `routes/profile.routes.ts` and `routes/projects.routes.ts`)
 * serves this data to the client, and the `getProfile` / `getProjects` agent
 * tools (see `tools/`) read from the same object — so the AI concierge and the
 * rendered UI can never drift out of sync.
 */

export interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  highlights: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  year: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
  };
  summary: string;
  yearsOfExperience: number;
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    cloud: string[];
    aiTools: string[];
    testing: string[];
  };
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
}

export const profile: ProfileData = {
  name: "Sisir Kumar Das",
  title: "Full-Stack Software Engineer (MERN)",
  tagline:
    "I build fast, reliable full-stack products on the MERN stack — and now I'm building the AI agents that help ship them faster.",
  location: "Bangalore, India",
  email: "das1234sisir@gmail.com",
  social: {
    github: "https://github.com/Sisir-kumar-Das",
    linkedin: "https://www.linkedin.com/in/sisir-kumar-das/",
  },
  summary:
    "Full-Stack Software Engineer with 3+ years of experience across 10+ production applications, including 4 built from the ground up and 3 involving migration and feature expansion, covering database schema design, REST/GraphQL APIs, and React front ends on the Node.js/React.js stack. Led an AWS to GCP migration that cut system cost by 22%, and use AI-assisted tools like GitHub Copilot and Claude to speed up delivery by 30%+.",
  yearsOfExperience: 3,
  skills: {
    languages: ["JavaScript", "TypeScript", "SQL", "C++"],
    frontend: ["React.js", "Redux", "HTML5", "CSS3", "Tailwind CSS", "Ant Design"],
    backend: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
    databases: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Firestore",
      "Bigtable",
      "DynamoDB",
      "TypeORM",
    ],
    cloud: [
      "Google Cloud Platform (GCP)",
      "AWS (EC2, S3, RDS, SES, SQS, ECS)",
      "Docker",
      "Kubernetes",
    ],
    aiTools: ["GitHub Copilot", "Claude", "LangChain", "Groq API", "Gemini API"],
    testing: ["Jest", "Git", "GitHub", "Postman"],
  },
  experience: [
    {
      company: "Cognizant Technology Solutions",
      location: "Bangalore, India",
      role: "Programmer Analyst",
      period: "Sep 2024 – Present",
      highlights: [
        "Modernized 3 legacy applications from PHP, JavaScript, and HTML to a React and Node.js stack, deploying on AWS EC2 and eliminating 10+ security vulnerabilities.",
        "Led migration of the MixCode application from AWS to GCP, cutting infrastructure cost by 22%.",
        "Engineered a slot-booking module for a museum booking platform (NHB Singapore) using database transactions and row-level locking, handling 10,000+ bookings during peak demand.",
        "Delivered the Rekey bill-digitization platform (DFS retail) using React.js, Node.js, and MySQL, digitizing 15,000+ invoices/month and cutting processing time by 70%.",
        "Built a prototype scanner-based auto-fill feature for the Rekey platform using Azure AI Document Intelligence, achieving 85%+ field-extraction accuracy; presented at Cognizant's Bluebolt ideathon.",
      ],
    },
    {
      company: "Cognizant Technology Solutions",
      location: "Bangalore, India",
      role: "Programmer Analyst Trainee",
      period: "Sep 2023 – Sep 2024",
      highlights: [
        "Identified and remediated backend API vulnerabilities using 42Crunch security scanning on an insurance platform, resolving 80% of flagged critical issues.",
        "Automated the DFS employee offboarding workflow, auto-generating requests and manager reminders, cutting manual processing time by 90%.",
        "Developed OneTranslator, a document translation app built from scratch for DFS, supporting drag-and-drop translation across 10+ languages via the Azure Translator API.",
        "Optimized REST APIs for enterprise shipment-tracking features, reducing average load time by 50%.",
      ],
    },
  ],
  projects: [
    {
      name: "DEV Tinder",
      description:
        "A Tinder-style developer-matching platform built end-to-end on the MERN stack, with a connection-request/matching system and JWT authentication.",
      tech: ["Node.js", "MongoDB", "Express.js", "Redux", "Tailwind CSS", "AWS", "PM2"],
      github: "https://github.com/Sisir-kumar-Das/devTinder-Web",
      highlights: [
        "Designed and built 15+ REST API endpoints, JWT authentication, and a connection-request/matching system.",
        "Implemented 2 core MongoDB schemas (User, ConnectionRequest) and 10+ reusable React components with Redux for state management.",
        "Deployed on AWS EC2 with Nginx as a reverse proxy, configuring an Elastic IP and resolving production issues including Amazon Linux package-manager differences and API routing errors.",
      ],
    },
    {
      name: "AI Concierge (this portfolio)",
      description:
        "A multi-agent, multi-tool AI assistant embedded in this very portfolio. An orchestrator routes visitor questions to specialised agents (Profile, Projects, GitHub, Contact), each backed by their own tools and a pluggable LLM provider layer.",
      tech: ["Node.js", "Express", "TypeScript", "LangChain-style agents", "MongoDB"],
      highlights: [
        "Orchestrator + specialist agent pattern with explicit tool-calling.",
        "Provider-agnostic LLM layer (OpenAI, Groq, Gemini, Anthropic) with an offline mock provider so it runs with zero API keys.",
        "Every chat turn is logged to MongoDB with the agent + tools used for full transparency.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Odisha University of Technology and Research, Bhubaneswar",
      year: "2023",
    },
  ],
};
