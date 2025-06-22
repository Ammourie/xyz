export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  avatar: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  slug: string;
  title: string;
  description_short: string;
  description_long: string;
  tags: string[];
  main_image: string;
  gallery_images: string[];
  source_code_url?: string;
  live_url?: string;
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  date: string;
  description: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
