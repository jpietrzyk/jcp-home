import { getResume } from './api';
import type { Resume } from './types';
import { useCmsResource } from './useCmsResource';
import { profile } from '../../content/profile';

type UseResumeOptions = {
  fallback?: Resume;
};

const defaultFallback: Resume = {
  title: 'Resume',
  slug: 'resume',
  bio: profile.about,
  contactData: {
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    linkedin: profile.linkedin,
    github: profile.github
  },
  skills: profile.skills,
  experience: profile.workExperience.map((exp) => ({
    company: exp.company,
    position: exp.role,
    location: exp.location,
    startDate: exp.period.split(' - ')[0],
    endDate: exp.period.includes('Present') ? null : exp.period.split(' - ')[1],
    isCurrent: exp.period.includes('Present'),
    achievements: exp.highlights
  })),
  education: {
    school: profile.education.school,
    degree: profile.education.degree,
    field: profile.education.field,
    graduationYear: profile.education.graduation,
    grade: profile.education.grade
  }
};

export function useResume(options?: UseResumeOptions) {
  const fallback = options?.fallback ?? defaultFallback;

  const { data: resume, isLoading, error } = useCmsResource<Resume>({
    initialData: fallback,
    fallbackData: fallback,
    fetcher: async () => {
      const result = await getResume();
      if (!result) return null;

      return {
        title: result.title || fallback.title,
        slug: result.slug || fallback.slug,
        bio: result.bio ?? fallback.bio,
        contactData: result.contactData ?? fallback.contactData,
        skills: result.skills ?? fallback.skills,
        experience: result.experience ?? fallback.experience,
        education: result.education ?? fallback.education,
        volunteerExperience: result.volunteerExperience ?? fallback.volunteerExperience,
        projects: result.projects ?? fallback.projects
      };
    },
    deps: [],
  });

  return { resume, isLoading, error };
}
