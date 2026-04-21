export const postsQuery = `*[_type == "post" && (!defined(isDraft) || isDraft == false)] | order(publishedAt desc){
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  "tags": tags[]->name,
  "author": author->name
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body
}`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "subtitle": coalesce(subtitle, seoTitle),
  "eyebrow": coalesce(eyebrow, seoDescription),
  body
}`;

export const projectsPageQuery = `*[_type == "projectsPage"][0]{
  title,
  "slug": slug.current,
  "subtitle": coalesce(subtitle, seoTitle),
  "eyebrow": coalesce(eyebrow, seoDescription),
  body
}`;

export const showcaseProjectsQuery = `*[_type == "showcaseProject" && (!defined(isDraft) || isDraft == false)] | order(featured desc, order asc, _createdAt desc){
  title,
  "slug": slug.current,
  slogan,
  description,
  thumbnail,
  url,
  tags,
  featured,
  order
}`;

export const resumeQuery = `*[_type == "resume"] | order(_createdAt desc)[0]{
  title,
  "slug": slug.current,
  bio,
  contactData,
  skills,
  experience[] | order(startDate desc) {
    company,
    position,
    location,
    employmentType,
    startDate,
    endDate,
    isCurrent,
    achievements
  },
  education,
  volunteerExperience[] | order(startDate desc),
  projects[] | order(startDate desc)
}`;
