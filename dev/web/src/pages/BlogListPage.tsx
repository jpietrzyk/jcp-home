import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../lib/cms/api";
import type { PostSummary } from "../lib/cms/types";

export function BlogListPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            className="rounded-lg border border-zinc-200 bg-white p-4"
            key={post.slug}
          >
            <h2 className="text-xl font-semibold">
              <Link className="hover:underline" to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {post.publishedAt ?? "Draft"}
            </p>
            <p className="mt-3 text-zinc-600">{post.excerpt}</p>
          </li>
        ))}
        {posts.length === 0 ? (
          <li className="text-zinc-500">No posts yet.</li>
        ) : null}
      </ul>
    </section>
  );
}
