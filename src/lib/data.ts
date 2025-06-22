import fs from 'fs/promises';
import path from 'path';
import type { PortfolioData, Project } from '@/types/portfolio';

// Use a cache to avoid reading the file multiple times in one build
let cachedData: PortfolioData | null = null;

export async function getPortfolioData(): Promise<PortfolioData> {
  if (cachedData) {
    return cachedData;
  }
  
  const filePath = path.join(process.cwd(), 'public', 'portfolio-data.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    cachedData = JSON.parse(jsonData);
    return cachedData!;
  } catch (error) {
    console.error("Could not read or parse portfolio-data.json", error);
    // Return a default empty structure in case of an error
    return {
      personal: { name: '', title: '', email: '', social: { github: '', linkedin: '', twitter: '', telegram: '' }, avatar: '' },
      about: '',
      skills: [],
      projects: [],
      experience: [],
      education: [],
      theme: { primaryColor: '#000000', backgroundColor: '#ffffff', accentColor: '#000000' },
    };
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const data = await getPortfolioData();
  return data.projects.find((p) => p.slug === slug);
}

export async function getAllProjectSlugs() {
  const data = await getPortfolioData();
  return data.projects.map((p) => ({ slug: p.slug }));
}
