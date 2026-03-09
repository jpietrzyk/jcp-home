import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { getPostBySlug } from "../lib/cms/api";
import type { PostDetails } from "../lib/cms/types";

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<PostDetails | null>(null);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then(setPost)
      .catch(() => setPost(null));
  }, [slug]);

  if (!post) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Post not found</h1>
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
