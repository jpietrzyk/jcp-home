import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import type { PostSummary } from "@/lib/cms/types";

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface PostCardProps extends PostSummary {
  className?: string;
}

export function PostCard({
  slug,
  title,
  publishedAt,
  authorName,
  excerpt,
  coverImageUrl,
  tags,
  className,
}: PostCardProps) {
  const date = formatDate(publishedAt);

  return (
    <Card className={`overflow-hidden h-full ${className ?? ""}`}>
      <Link to={`/blog/${slug}`} className="block group">
        {coverImageUrl ? (
          <div className="aspect-[3/2] w-full overflow-hidden">
            <img
              src={coverImageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : null}
        <CardContent className="p-5 md:p-6 space-y-2">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:underline">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
            {date ? <span>{date}</span> : null}
            {authorName ? <span>by {authorName}</span> : null}
          </div>
          {excerpt ? (
            <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-3">
              {excerpt}
            </p>
          ) : null}
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {tags.map((tag) => (
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
  );
}
