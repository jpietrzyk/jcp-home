import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { CmsPageContent } from "../components/CmsPageContent";
import { SectionHeading } from "../components/resume/SectionHeading";
import { Card, CardContent } from "../components/ui/card";
import { useCmsPosts } from "../lib/cms/useCmsPosts";
import { useCmsPage } from "../lib/cms/useCmsPage";

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogListPage() {
  const { page, isLoading: isPageLoading, error: pageError } = useCmsPage("blog", {
    fallback: {
      title: "Blog",
      slug: "blog",
      subtitle: null,
      eyebrow: null,
      bodyPlainText: "",
    },
  });
  const { posts, isLoading: isPostsLoading, error: postsError } = useCmsPosts();

  return (
    <PageTransition>
      <section className="space-y-10">
        {page.eyebrow ? (
          <AnimatedSection>
            <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {page.eyebrow}
            </p>
          </AnimatedSection>
        ) : null}

        <AnimatedSection delay={0.1}>
          <PageHero title={page.title} subtitle={page.subtitle}>
            <CmsPageContent
              error={pageError}
              isLoading={isPageLoading}
              body={page.body}
              bodyPlainText={page.bodyPlainText}
              richTextClassName="prose prose-stone text-stone-600 dark:prose-invert"
              hideFirstHeadingMatching={page.title}
              errorClassName="text-amber-600 dark:text-amber-500"
              loadingClassName="text-stone-500 dark:text-stone-500"
            />
          </PageHero>
        </AnimatedSection>

        <div>
          <AnimatedSection>
            <SectionHeading icon={Newspaper} title="Posts" />
          </AnimatedSection>

          {postsError ? (
            <p className="text-amber-600 dark:text-amber-500">
              Could not load posts from CMS. Showing fallback content.
            </p>
          ) : null}

          {isPostsLoading ? (
            <p className="text-stone-500 dark:text-stone-500">Loading posts...</p>
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post, index) => {
              const date = formatDate(post.publishedAt);
              return (
                <AnimatedSection key={post.slug} delay={0.1 * index}>
                  <Card className="overflow-hidden h-full">
                    <Link to={`/blog/${post.slug}`} className="block group">
                      {post.coverImageUrl ? (
                        <div className="aspect-[3/2] w-full overflow-hidden">
                          <img
                            src={post.coverImageUrl}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <CardContent className="p-5 md:p-6 space-y-2">
                        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:underline">
                          {post.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
                          {date ? <span>{date}</span> : null}
                          {post.authorName ? (
                            <span>by {post.authorName}</span>
                          ) : null}
                        </div>
                        {post.excerpt ? (
                          <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-3">
                            {post.excerpt}
                          </p>
                        ) : null}
                        {post.tags && post.tags.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </CardContent>
                    </Link>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>

          {posts.length === 0 && !isPostsLoading ? (
            <p className="text-stone-500 dark:text-stone-500">No posts yet.</p>
          ) : null}
        </div>
      </section>
    </PageTransition>
  );
}
