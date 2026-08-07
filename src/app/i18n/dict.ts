export interface Stat {
  value: string;
  label: string;
}

export interface Job {
  id: string;
  company: string;
  period: string;
  location: string;
  tag: string;
  role: string;
  subtitle: string;
  bullets: string[];
}

/** One of the four "what I do" cards in the Profile section. */
export interface Pillar {
  icon: 'layers' | 'cpu' | 'shield' | 'globe';
  title: string;
  text: string;
}

/** Skills are shown as chips inside a tabbed panel — no proficiency bars. */
export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  /** Where the work happened: employer, freelance client, or personal. */
  org: string;
  category: string;
  year: string;
  desc: string;
  metrics?: ProjectMetric[];
  stack: string[];
  /** Language-independent filter keys — see FILTER_KEYS in projects.ts */
  filterTags: string[];
}

export interface EducationItem {
  program: string;
  school: string;
  period: string;
  detail: string;
}

export interface CertItem {
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  /** Bar fill, 0–100. */
  value: number;
}

/**
 * The shape every language file must satisfy.
 * Adding a field here and forgetting it in en.ts or ar.ts is a compile error —
 * that is the whole point of typing translations instead of using string keys.
 */
export interface Dict {
  meta: { title: string; description: string };
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    education: string;
    certs: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    switchLang: string;
    langBtn: string;
    toDark: string;
    toLight: string;
  };
  hero: {
    name: string;
    name_short: string;
    available: string;
    available_short: string;
    role: string;
    /** Rotating one-liners under the job title. */
    roles: string[];
    tagline: string;
    cta1: string;
    cta2: string;
    location: string;
  };
  about: {
    title: string;
    body: string;
    bodyExtra: string;
    domains: string[];
    pillars: Pillar[];
  };
  experience: { title: string; expand: string; collapse: string };
  skills: { title: string; subtitle: string; groupsLabel: string };
  projects: { title: string; subtitle: string; filters: string[]; empty: string };
  education: {
    title: string;
    eduHeading: string;
    certHeading: string;
    langHeading: string;
  };
  certs: { title: string };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    required: string;
    invalidEmail: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    failed: string;
  };
  footer: string;
  backToTop: string;
  stats: Stat[];
  jobs: Job[];
  skillGroups: SkillGroup[];
  projectItems: ProjectItem[];
  educationItems: EducationItem[];
  certItems: CertItem[];
  languageItems: LanguageItem[];
}
