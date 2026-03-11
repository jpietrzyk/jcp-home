export const postsQuery = `*[_type == "post" && (!defined(isDraft) || isDraft == false)] | order(publishedAt desc){
  title,
  "slug": slug.current,
  excerpt,
  publishedAt
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
  "eyebrow": seoDescription,
  body
}`;
