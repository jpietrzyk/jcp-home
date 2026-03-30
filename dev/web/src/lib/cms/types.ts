import type { TypedObject } from "@portabletext/types";

export type PostSummary = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string | null;
};

export type PostDetails = PostSummary & {
  bodyPlainText: string;
  body?: TypedObject[];
};

export type ContentPage = {
  title: string;
  slug: string;
  subtitle?: string | null;
  eyebrow?: string | null;
  bodyPlainText: string;
  body?: TypedObject[];
};

// Raw Sanity API response types (before transformation)
export type SanityPost = PostSummary & {
  body?: TypedObject[];
};

export type SanityPage = {
  title: string;
  slug: string;
  subtitle?: string | null;
  eyebrow?: string | null;
  body?: TypedObject[];
};

// Resume types
export type Experience = {
  company: string;
  position: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean;
  achievements?: string[];
};

export type Education = {
  school: string;
  degree?: string;
  field?: string;
  graduationYear?: string;
  grade?: string;
};

export type VolunteerExperience = {
  organization: string;
  role: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export type Project = {
  name: string;
  description?: string;
  url?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
};

export type ContactData = {
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
};

export type Resume = {
  title: string;
  slug: string;
  bio?: string;
  contactData?: ContactData;
  skills?: string[];
  experience?: Experience[];
  education?: Education;
  volunteerExperience?: VolunteerExperience[];
  projects?: Project[];
};

// Raw Sanity API response type for resume
export type SanityResume = Resume;
