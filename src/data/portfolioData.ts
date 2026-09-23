import { PortfolioSchema } from "@/types";

export const portfolioData: PortfolioSchema = {
  personal: {
    name: "Bharath K",
    title: "AI Engineer & GenAI Product Architect",
    subTitle:
      "Full-Stack Engineer bridging generative models, agentic workflows, and scalable web architectures.",
    tagline:
      "Architecting autonomous agents, real-time LLM workflows, and production-grade web interfaces.",
    roles: [
      "AI Engineer",
      "GenAI Product Architect",
      "LangGraph & LLM Builder",
      "Full-Stack Systems Engineer",
      "Real-Time Systems Architect",
    ],
    location: "Karur, Tamil Nadu, India",
    email: "bharathkkbharath3@gmail.com",
    phone: "+91 9360294463",
    github: "https://github.com/bharath9360",
    linkedin: "https://www.linkedin.com/in/bharathk22",
    resumeUrl:
      "https://drive.google.com/file/d/1mpINbx_ooE_aS1MxtFCOxvcKY4nCjMmN/view?usp=sharing",
    bio: "A relentless AI Engineer and Full-Stack Developer pursuing B.E. in Computer Science Engineering at M.A.M College of Engineering and Technology. I specialize in designing autonomous LangGraph agents, orchestrating multi-modal LLM applications, engineering low-latency WebRTC hardware bridges, and shipping resilient, production-ready web platforms.",
    education:
      "B.E. Computer Science Engineering — M.A.M College of Engineering and Technology (2022–2026, CGPA: 8.0)",
    profileImg:
      "/profile.jpg",
    availabilityStatus: "Available for AI Engineering & Full-Stack Roles",
  },

  projects: [
    {
      id: "alumni-connect",
      title: "Alumni Connect Platform",
      subtitle: "Real-Time Institutional Network Architecture",
      category: "Full-Stack Architecture",
      featured: true,
      tagline:
        "A full-stack institutional networking platform enabling alumni and students to network, share opportunities, and stay updated.",
      problem:
        "University alumni communities suffer from fragmented communication, leaving current students without direct mentorship or career referral pathways.",
      solution:
        "Developed a scalable MERN social platform supporting student and alumni profiles. Implemented secure JWT authentication, interactive feeds, real-time opportunity sharing, and media pipelines via Cloudinary with optimized MongoDB schemas.",
      architectureHighlights: [
        "Architected secure JWT authentication and granular role-based permissions for students, alumni, and admins.",
        "Integrated Cloudinary cloud storage for seamless image and resume file attachments.",
        "Optimized MongoDB indexing and Mongoose query aggregation for fast feed rendering and search.",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Bootstrap",
        "Cloudinary",
        "HTML5 / CSS3",
      ],
      demoUrl: "https://alumni-connection-frontend.vercel.app/",
      accentColor: "#2575fc",
      icon: "🎓",
    },
    {
      id: "pakka-tourism",
      title: "Pakka Tourism",
      subtitle: "Dynamic Destination Discovery Interface",
      category: "Full-Stack Architecture",
      featured: true,
      tagline:
        "A full-featured tourism platform with dynamic destination discovery, interactive maps, booking inquiry flows, and visual storytelling.",
      problem:
        "Regional travel platforms often suffer from dated interfaces and static itineraries that fail to engage modern digital travelers.",
      solution:
        "Designed and developed a responsive full-stack tourism web app with dynamic travel package listings, interactive location discovery, automated booking inquiry routing, and a clean management flow for tour operators.",
      architectureHighlights: [
        "Designed fluid responsive layouts with intentional visual hierarchy and fast loading states.",
        "Implemented structured MongoDB schemas for dynamic package categorization and itinerary management.",
        "Built RESTful APIs supporting search, filtering, and real-time inquiry submissions.",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "CSS3",
        "REST APIs",
      ],
      demoUrl: "https://pakkatourism.com",
      accentColor: "#f59e0b",
      icon: "🌏",
    },
    {
      id: "bsmartglass",
      title: "AuraVision (B Smart Glass)",
      subtitle: "Real-Time AI Assistive Hardware Platform",
      category: "AI + Hardware",
      featured: true,
      tagline:
        "A real-time assistive system connecting visually impaired users with remote sighted guides via low-latency WebRTC video streaming and OpenAI navigation.",
      problem:
        "Visually impaired individuals navigating unfamiliar environments lack real-time, context-aware spatial assistance that combines human intuition with machine intelligence.",
      solution:
        "Built an end-to-end assistive platform integrating smart-glass hardware with a custom MERN web application. Engineered low-latency WebRTC peer-to-peer video streaming between glasses and remote web guides, augmented by OpenAI API vision analysis for automated hazard detection.",
      architectureHighlights: [
        "Engineered WebRTC signaling servers over WebSockets for sub-second peer-to-peer video telemetry.",
        "Integrated OpenAI Vision API to process frame snapshots and synthesize spatial guidance in real time.",
        "Developed automated emergency alert and workflow automation pipelines using n8n.",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "WebRTC",
        "OpenAI API",
        "WebSockets",
        "n8n",
        "MongoDB",
        "Express.js",
      ],
      demoUrl: "https://b-smart-glass-aura-vision.vercel.app/",
      accentColor: "#00f2fe",
      icon: "🥽",
    },
    {
      id: "crm-hrms",
      title: "CRM HRMS Portal",
      subtitle: "Enterprise Workforce & Customer Management Suite",
      category: "Enterprise Systems",
      featured: true,
      tagline:
        "An enterprise portal streamlining human resource workflows, employee attendance, payroll processing, and customer relationship tracking.",
      problem:
        "Growing organizations struggle with fragmented employee records, disconnected client interaction logs, and tedious manual attendance tracking.",
      solution:
        "Architected a centralized CRM and HRMS portal with secure JWT authentication, role-based access control (Admin, HR, Employee), interactive employee productivity dashboards, automated leave management, and customer inquiry tracking.",
      architectureHighlights: [
        "Implemented role-based access control (RBAC) separating administrative controls from self-service employee portals.",
        "Engineered RESTful API endpoints for attendance logging, leave approval workflows, and payroll generation.",
        "Designed responsive, modular UI dashboards with fast client-side state filtering.",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Auth",
        "REST APIs",
        "Tailwind CSS",
      ],
      demoUrl: "https://crm-hrms.vercel.app/",
      accentColor: "#ec4899",
      icon: "🏢",
    },
    {
      id: "cable-billing",
      title: "Cable Billing Software",
      subtitle: "Enterprise Subscription & Invoicing Platform",
      category: "Enterprise Systems",
      featured: false,
      tagline:
        "An enterprise-grade billing management system with automated invoicing, subscriber tracking, and financial analytics.",
      problem:
        "Cable TV operators struggle with manual subscription tracking, delayed invoicing, and lack of real-time financial transparency across thousands of active subscribers.",
      solution:
        "Built a comprehensive software suite handling end-to-end subscription lifecycles. Integrated automated monthly invoicing, subscriber status management, and dashboard analytics for revenue and active retention.",
      architectureHighlights: [
        "Built robust backend billing workflows with automated invoice generation and status updates.",
        "Implemented secure JWT authentication for operator and admin account management.",
        "Engineered REST APIs for searching, filtering, and updating thousands of subscriber accounts instantly.",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "JWT Auth",
      ],
      demoUrl: "https://happystarsatellitevision.netlify.app/",
      accentColor: "#10b981",
      icon: "📡",
    },
    {
      id: "ai-learning-agent",
      title: "AI Learning Path Generator",
      subtitle: "Autonomous LangGraph & Gemini Agent",
      category: "GenAI Agent",
      featured: false,
      tagline:
        "An intelligent agentic workflow that automatically generates personalized curriculum and structures study resources using LLMs.",
      problem:
        "Learners face massive information overload when mastering complex technical subjects, wasting hours organizing scattered tutorials and documentation without a coherent roadmap.",
      solution:
        "Architected an autonomous agent using LangGraph and Google Generative AI (Gemini). The system reasons through user learning goals, queries YouTube/Drive/Notion APIs, and constructs structured, personalized study timelines.",
      architectureHighlights: [
        "Designed cyclical state graphs in LangGraph for iterative content validation and dynamic refinement.",
        "Implemented Model Context Protocol (MCP) tool orchestration to interface seamlessly with external productivity APIs.",
        "Optimized prompt routing with Google Generative AI for high-precision curriculum generation.",
      ],
      techStack: [
        "Python",
        "LangGraph",
        "Google Generative AI",
        "MCP",
        "Streamlit",
        "REST APIs",
      ],
      demoUrl: "https://persional-ai-assistance-1.onrender.com/",
      accentColor: "#7f52ff",
      icon: "🧠",
    },
  ],

  capabilities: [
    {
      id: "ai-agents",
      title: "Autonomous AI Agents & LangGraph",
      description:
        "Engineering stateful, multi-actor AI agent pipelines using LangGraph, Gemini 1.5 Pro, and OpenAI. Building autonomous reasoning loops, tool calling with Model Context Protocol (MCP), and self-correcting agentic workflows.",
      icon: "Cpu",
      badge: "AI Agentic",
      themeName: "AI Theme",
      span: "col-span-1",
      tags: ["LangGraph", "Gemini 1.5 Pro", "OpenAI API", "MCP Tools", "Agentic Workflows", "Prompt Engineering"],
      accent: "#7f52ff",
    },
    {
      id: "rag-systems",
      title: "RAG & Vector Knowledge Systems",
      description:
        "Designing enterprise Retrieval-Augmented Generation (RAG) applications using vector databases, embeddings, and hybrid semantic search. Transforming private documentation, PDFs, and live APIs into context-aware LLM knowledge bases.",
      icon: "BrainCircuit",
      badge: "RAG Engine",
      themeName: "RAG Theme",
      span: "col-span-1",
      tags: ["RAG Architecture", "Vector Embeddings", "Semantic Search", "Document Parsing", "Context Chunking", "Pinecone"],
      accent: "#00f2fe",
    },
    {
      id: "automation",
      title: "Zero-Touch Workflow Automation",
      description:
        "Orchestrating autonomous multi-step automation pipelines using n8n, Make.com, custom webhooks, and REST API integrations. Eliminating manual operational bottlenecks with real-time event triggers and intelligent data routing.",
      icon: "Workflow",
      badge: "Automation Pipeline",
      themeName: "Automation Theme",
      span: "col-span-1",
      tags: ["n8n", "Make.com", "Custom Webhooks", "REST APIs", "Event-Driven Data", "Zero-Touch Ops"],
      accent: "#10b981",
    },
    {
      id: "fullstack",
      title: "Production Full-Stack & Cloud Systems",
      description:
        "Shipping resilient, scalable web platforms using React.js, Next.js, Node.js, and Express. Building WebRTC low-latency audio/video streams, JWT role-based security, and Cloudinary media pipelines over MongoDB.",
      icon: "Layers",
      badge: "Full-Stack App",
      themeName: "Full-Stack Theme",
      span: "col-span-1",
      tags: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "WebRTC", "Cloudinary"],
      accent: "#2575fc",
    },
  ],

  skills: [
    {
      categoryName: "Frontend & UI Development",
      skills: [
        { name: "React.js", level: "Expert" },
        { name: "JavaScript (ES6+)", level: "Expert" },
        { name: "HTML5 / CSS3", level: "Expert" },
        { name: "Bootstrap", level: "Advanced" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "Next.js (App Router)", level: "Advanced" },
      ],
    },
    {
      categoryName: "Backend & Authentication",
      skills: [
        { name: "Node.js", level: "Advanced" },
        { name: "Express.js", level: "Advanced" },
        { name: "Python", level: "Advanced" },
        { name: "REST APIs", level: "Expert" },
        { name: "JWT Authentication", level: "Expert" },
      ],
    },
    {
      categoryName: "AI, Gen AI & Automation",
      skills: [
        { name: "Google Generative AI (Gemini)", level: "Expert" },
        { name: "OpenAI API", level: "Advanced" },
        { name: "LLM Integration", level: "Advanced" },
        { name: "Prompt Engineering", level: "Expert" },
        { name: "n8n & Make.com", level: "Advanced" },
        { name: "Webhooks & Automation", level: "Advanced" },
      ],
    },
    {
      categoryName: "Databases & DevOps Tools",
      skills: [
        { name: "MongoDB & Mongoose", level: "Expert" },
        { name: "SQLite", level: "Advanced" },
        { name: "Git & GitHub", level: "Expert" },
        { name: "Cloudinary", level: "Advanced" },
        { name: "Vercel & Render", level: "Expert" },
      ],
    },
  ],

  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "International Institute of SDGs & Public Policy Research (IISPPR)",
      period: "Dec 2025 – Feb 2026",
      description:
        "Building a scalable healthcare web application designed for seamless doctor–patient consultations, real-time communication, and secure data workflows.",
      keyAchieved: [
        "Architected end-to-end REST APIs, user authentication, and secure JWT verification.",
        "Developed interactive doctor-patient consultation workflows with live video and Cloudinary asset management.",
      ],
      accent: "#00f2fe",
    },
    {
      role: "Software Engineer Intern",
      company: "Bluestock Fintech",
      period: "Aug 2025 – Sep 2025",
      description:
        "Engineered high-performance real-time internal dashboards and scalable backend APIs for live financial trading data systems.",
      keyAchieved: [
        "Built responsive real-time trading dashboards handling live financial market streams in React.js.",
        "Developed and optimized backend REST API endpoints using Node.js and Express.js.",
      ],
      accent: "#7f52ff",
    },
  ],

  achievements: [
    {
      title: "National Code Debugging Champion (1st Runner-Up)",
      organization: "CBX-2024 National Level Technical Symposium (KRCE)",
      date: "2024",
      description:
        "Secured 1st Runner-Up among hundreds of competitors by solving algorithmic bottlenecks and debugging complex systems under intense time pressure.",
      isTechnical: true,
      badge: "National Silver",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957616/WhatsApp_Image_2025-07-30_at_12.03.58_53e453c2_fvvoaq.jpg",
    },
    {
      title: "National Paper Presentation (2nd Place)",
      organization: "N.S.N College National Technical Symposium",
      date: "2024",
      description:
        "Awarded Second Place for presenting innovative research and technical architecture on advanced web computing and AI systems.",
      isTechnical: true,
      badge: "Research Excellence",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753958995/WhatsApp_Image_2025-07-30_at_12.03.59_fdba92d1_xupf2b.jpg",
    },
    {
      title: "First Prize in Full Stack Development Contest",
      organization: "M.A.M College of Engineering & Technology (2023)",
      date: "2023",
      description:
        "Won 1st Prize in university-wide full-stack contest by shipping a fully functional web application end-to-end within 24 hours.",
      isTechnical: true,
      badge: "1st Prize Winner",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753962228/IMG-20250730-WA0013_wka2s4.jpg",
    },
    {
      title: "Participated in India's Largest Gen AI Buildathon",
      organization: "National GenAI Buildathon",
      date: "2024",
      description:
        "Engineered innovative AI agent solutions and LLM workflows alongside top developers in India's premier GenAI hackathon.",
      isTechnical: true,
      badge: "GenAI Builder",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957614/IMG-20250730-WA0014_tlswa3.jpg",
    },
    {
      title: "Strong Man of Tamil Nadu (2nd & 4th Place)",
      organization: "Open State Powerlifting & Fitness Championship",
      date: "2024–2025",
      description:
        "Demonstrated extreme discipline, mental toughness, and consistency by securing state-level podium finishes in Biceps Curl and Pushup championships.",
      isTechnical: false,
      badge: "Athletic Discipline",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753961524/WhatsApp_Image_2025-07-30_at_12.04.00_76338912_cgzllp.jpg",
    },
    {
      title: "Mr. Muscle Mania State Championship (5th Place)",
      organization: "8th Mr. Muscle Mania Tamil Nadu Championship",
      date: "2024",
      description:
        "Ranked 5th statewide, exemplifying the unwavering commitment and structured routine that also powers my engineering career.",
      isTechnical: false,
      badge: "Dedication",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753959087/WhatsApp_Image_2025-07-30_at_12.04.01_afe5fdaa_grtd05.jpg",
    },
  ],

  certifications: [
    {
      title: "Industry Ready Certification in Full-Stack Development",
      issuer: "NxtWave Disruptive Technologies",
      date: "2023–2024",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957614/IMG-20250730-WA0014_tlswa3.jpg",
    },
    {
      title: "iTech Hackfest 2023 Participant",
      issuer: "PSG College of Technology & SAP",
      date: "Jul 2023",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957614/IMG-20250730-WA0014_tlswa3.jpg",
    },
    {
      title: "HACKSPRINT '25 Participant",
      issuer: "K. Ramakrishnan College of Technology",
      date: "Feb 2025",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753962480/WhatsApp_Image_2025-07-30_at_12.48.25_8e034d9d_hmbztu.jpg",
    },
    {
      title: "Workshop on Web Mania",
      issuer: "Karpagam College of Engineering",
      date: "May 2023",
      image:
        "https://res.cloudinary.com/dnby5o1lt/image/upload/v1753962432/IMG-20250730-WA0007_oivu1q.jpg",
    },
  ],
};
