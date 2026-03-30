import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useCmsPosts } from "../lib/cms/useCmsPosts";
import { useCmsPage } from "../lib/cms/useCmsPage";

export function BlogListPage() {
  const { page } = useCmsPage("blog", {
    fallback: {
      title: "Blog",
      slug: "blog",
      subtitle: null,
      eyebrow: null,
      bodyPlainText: "",
    },
  });
  const { posts, isLoading, error } = useCmsPosts();

  return (
    <section className="space-y-6">
      {page.eyebrow ? (
        <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-bold">{page.title}</h1>
      {error ? (
        <p className="text-amber-600">
          Could not load posts from CMS. Showing fallback content.
        </p>
      ) : null}
      {isLoading ? (
        <p className="text-stone-500 dark:text-stone-500">Loading posts...</p>
      ) : null}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>
                  <Link className="hover:underline" to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-stone-500 dark:text-stone-500">
                  {post.publishedAt ?? "Draft"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-stone-600 dark:text-stone-300">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
        {posts.length === 0 ? (
          <li className="text-stone-500 dark:text-stone-500">No posts yet.</li>
        ) : null}
      </ul>
    </section>
  );
}
