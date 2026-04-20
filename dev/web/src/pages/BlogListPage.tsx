import { Newspaper } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { CmsPageContent } from "../components/CmsPageContent";
import { SectionHeading } from "../components/resume/SectionHeading";
import { PostCard } from "../components/PostCard";
import { useCmsPosts } from "../lib/cms/useCmsPosts";
import { useCmsPage } from "../lib/cms/useCmsPage";

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
              richTextClassName="prose prose-stone dark:prose-invert"
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
            {posts.map((post, index) => (
              <AnimatedSection key={post.slug} delay={0.1 * index}>
                <PostCard {...post} />
              </AnimatedSection>
            ))}
          </div>

          {posts.length === 0 && !isPostsLoading ? (
            <p className="text-stone-500 dark:text-stone-500">No posts yet.</p>
          ) : null}
        </div>
      </section>
    </PageTransition>
  );
}
