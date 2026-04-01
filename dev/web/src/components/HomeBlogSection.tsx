import { Link } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./resume/SectionHeading";
import { PostCard } from "./PostCard";
import { useCmsPosts } from "../lib/cms/useCmsPosts";

export function HomeBlogSection() {
  const { posts, isLoading, error } = useCmsPosts();
  const latestPosts = posts.slice(0, 2);

  return (
    <section className="space-y-6">
      <AnimatedSection>
        <SectionHeading icon={Newspaper} title="Latest Posts" />
      </AnimatedSection>

      {error ? (
        <p className="text-amber-600 dark:text-amber-500">
          Could not load posts from CMS.
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

      {posts.length > 2 ? (
        <AnimatedSection delay={0.2}>
          <Link to="/blog">
            <Button variant="ghost" className="group">
              View all posts
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedSection>
      ) : null}

      {posts.length === 0 && !isLoading ? (
        <p className="text-stone-500 dark:text-stone-500">No posts yet.</p>
      ) : null}
    </section>
  );
}
