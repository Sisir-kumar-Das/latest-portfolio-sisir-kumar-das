import type { Profile } from '../types/profile'
import type { Project } from '../types/project'

export const fallbackProfile: Profile = {
  name: 'Sisir Kumar Das',
  title: 'Full-Stack Software Engineer (MERN)',
  tagline:
    "I build fast, reliable full-stack products on the MERN stack — and now I'm building the AI agents that help ship them faster.",
  location: 'Bangalore, India',
  email: 'das1234sisir@gmail.com',
  github: 'https://github.com/Sisir-kumar-Das',
  linkedin: 'https://www.linkedin.com/in/sisir-kumar-das/',
  summary:
    'Full-Stack Software Engineer with 3+ years of experience across 10+ production applications, including 4 built from the ground up and 3 involving migration and feature expansion, covering database schema design, REST/GraphQL APIs, and React front ends on the Node.js/React.js stack. Led an AWS to GCP migration that cut system cost by 22%, and use AI-assisted tools like GitHub Copilot and Claude to speed up delivery by 30%+.',
  skills: [
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'SQL', 'C++'] },
    {
      category: 'Frontend',
      items: ['React.js', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Ant Design'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL'],
    },
    {
      category: 'Databases',
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firestore', 'Bigtable', 'DynamoDB', 'TypeORM'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['GCP', 'AWS (EC2,S3,RDS,SES,SQS,ECS)', 'Docker', 'Kubernetes'],
    },
    {
      category: 'AI Tools',
      items: ['GitHub Copilot', 'Claude', 'LangChain', 'Groq API', 'Gemini API'],
    },
    {
      category: 'Testing',
      items: ['Jest', 'Git', 'GitHub', 'Postman'],
    },
  ],
  experience: [
    {
      company: 'Cognizant Technology Solutions',
      location: 'Bangalore',
      role: 'Programmer Analyst',
      period: 'Sep 2024–Present',
      highlights: [
        'Modernized 3 legacy apps to React/Node on AWS EC2, eliminating 10+ vulnerabilities.',
        'Led the AWS→GCP migration of MixCode, cutting infrastructure cost by 22%.',
        'Built the slot-booking module for the NHB Singapore museum booking system with DB transactions and row-level locking, handling 10,000+ bookings at peak.',
        'Delivered Rekey, a React/Node/MySQL bill-digitization platform processing 15,000+ invoices/month and cutting processing time by 70%.',
        "Built a scanner auto-fill prototype using Azure AI Document Intelligence with 85%+ accuracy, then presented it at Cognizant's Bluebolt ideathon.",
      ],
    },
    {
      company: 'Cognizant Technology Solutions',
      location: 'Bangalore',
      role: 'Programmer Analyst Trainee',
      period: 'Sep 2023–Sep 2024',
      highlights: [
        'Security-scanned an insurance platform with 42Crunch and resolved 80% of critical issues.',
        'Automated DFS employee offboarding, cutting manual work by 90%.',
        'Built OneTranslator with Azure Translator API support for 10+ languages.',
        'Optimized shipment-tracking REST APIs, cutting load time by 50%.',
      ],
    },
  ],
  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Odisha University of Technology and Research',
      period: '2023',
      location: 'Bhubaneswar',
    },
  ],
}

export const fallbackProjects: Project[] = [
  {
    id: 'ai-concierge',
    name: 'AI Concierge (this portfolio)',
    description:
      'A multi-agent, multi-tool AI assistant embedded in the site, pairing an orchestrator with specialist agents, pluggable LLM providers, and an offline mock fallback.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'LLM Providers'],
    highlights: [
      'Floating concierge widget with session continuity across reloads.',
      'Designed to route questions through specialist agents and surface the responding agent inline.',
      'Supports graceful offline behavior when the backend is unavailable.',
    ],
    featured: true,
  },
  {
    id: 'dev-tinder',
    name: 'DEV Tinder',
    description:
      'Tinder-style developer-matching MERN app with JWT auth, matching workflows, and a production-ready AWS deployment.',
    tech: ['Node.js', 'MongoDB', 'Express.js', 'Redux', 'Tailwind CSS', 'AWS', 'PM2'],
    highlights: [
      'Built 15+ REST endpoints with JWT-based authentication and matching flows.',
      'Modeled the platform with 2 MongoDB schemas and 10+ Redux-connected React components.',
      'Deployed on AWS EC2 behind Nginx with Elastic IP for stable production access.',
    ],
    github: 'https://github.com/Sisir-kumar-Das/devTinder-Web',
  },
]
