export type ProjectCategory =
  | "GenAI Agent"
  | "AI + Hardware"
  | "Full-Stack Architecture"
  | "Enterprise Systems";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  tagline: string;
  problem: string;
  solution: string;
  architectureHighlights: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  accentColor: string;
  icon?: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or emoji badge
  badge?: string;
  themeName?: string;
  span: "col-span-1" | "col-span-2" | "col-span-3" | "md:col-span-2" | "md:col-span-3";
  tags: string[];
  accent: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  keyAchieved: string[];
  accent: string;
}

export interface SkillItem {
  name: string;
  level?: "Expert" | "Advanced" | "Proficient";
  icon?: string;
}

export interface SkillCategory {
  categoryName: string;
  skills: SkillItem[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  image?: string;
  isTechnical: boolean;
  badge?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  image?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subTitle: string;
  tagline: string;
  roles: string[];
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  bio: string;
  education: string;
  profileImg: string;
  availabilityStatus: string;
}

export interface PortfolioSchema {
  personal: PersonalInfo;
  projects: Project[];
  capabilities: Capability[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
}
