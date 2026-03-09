import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
          <li key={post.slug}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>
                  <Link className="hover:underline" to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-zinc-500">
                  {post.publishedAt ?? "Draft"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">{post.excerpt}</p>
              </CardContent>
            </Card>
          </li>
        ))}
        {posts.length === 0 ? (
          <li className="text-zinc-500">No posts yet.</li>
        ) : null}
      </ul>
    </section>
  );
}
