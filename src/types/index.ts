export interface Project {
  id: string;
  projectNumber: string;
  category: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  toolsPlanned: string[];
  cadConsiderations: string[];
  learningOutcomes: string[];
  status: string;
  customImage?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  type: 'Degree' | 'HSC' | 'SSLC';
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level?: string; // Exact: AutoCAD (Basic), SolidWorks (Beginner)
    focusArea?: string;
  }[];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  fallbackSrc?: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  location?: string;
  isPrimary?: boolean;
  filename?: string;
}

export interface AchievementCertificate {
  id: string;
  number: string;
  title: string;
  event: string;
  organizer: string;
  date: string;
  category: string;
  badge?: string;
  imageSrc: string;
  description: string;
  isFirstPlace?: boolean;
}

