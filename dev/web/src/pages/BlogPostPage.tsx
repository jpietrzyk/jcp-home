import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useCmsPost } from "../lib/cms/useCmsPost";

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const { post, isLoading, error } = useCmsPost(slug);

  if (isLoading) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Loading post...</h1>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">
          {error ? "Could not load post" : "Post not found"}
        </h1>
        {error ? (
          <p className="text-amber-600">Please try again in a moment.</p>
        ) : null}
        <Link to="/blog">
          <Button size="sm" variant="secondary">
            Back to blog
          </Button>
        </Link>
      </section>
    );
  }

  return (
    <article className="space-y-5">
      <Card>
        <CardHeader className="space-y-2">
          <p className="text-sm text-zinc-500">{post.publishedAt}</p>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <p className="text-zinc-600">{post.excerpt}</p>
        </CardHeader>
        <CardContent>
          <section className="prose max-w-none text-zinc-700">
            <p>{post.bodyPlainText}</p>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}
