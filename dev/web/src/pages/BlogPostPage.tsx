import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
        <Link className="text-sm text-zinc-600 underline" to="/blog">
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <article className="space-y-5">
      <header className="space-y-2">
        <p className="text-sm text-zinc-500">{post.publishedAt}</p>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-zinc-600">{post.excerpt}</p>
      </header>
      <section className="prose max-w-none text-zinc-700">
        <p>{post.bodyPlainText}</p>
      </section>
    </article>
  );
}
