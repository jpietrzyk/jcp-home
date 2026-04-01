import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { SectionHeading } from "../resume/SectionHeading";
import { PostCard } from "../PostCard";
import { useCmsPosts } from "../../lib/cms/useCmsPosts";

export function HomeBlogSection() {
  const { posts, isLoading, error } = useCmsPosts();
  const latestPosts = posts.slice(0, 2);

  return (
    <div>
      <AnimatedSection>
        <SectionHeading icon={Newspaper} title="Latest Posts" />
      </AnimatedSection>

      {error ? (
        <p className="text-amber-600 dark:text-amber-500">
          Could not load posts from CMS. Showing fallback content.
        </p>
      ) : null}

      {isLoading ? (
        <p className="text-stone-500 dark:text-stone-500">Loading posts...</p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {latestPosts.map((post, index) => (
          <AnimatedSection key={post.slug} delay={0.1 * index}>
            <PostCard {...post} />
          </AnimatedSection>
        ))}
      </div>

      {posts.length > 0 && (
        <AnimatedSection delay={0.3}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors mt-4"
          >
            View all posts &rarr;
          </Link>
        </AnimatedSection>
      )}

      {posts.length === 0 && !isLoading ? (
        <p className="text-stone-500 dark:text-stone-500">No posts yet.</p>
      ) : null}
    </div>
  );
}
