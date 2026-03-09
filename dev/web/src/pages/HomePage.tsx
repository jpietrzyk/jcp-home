import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="space-y-4">
      <p className="text-sm uppercase tracking-wide text-zinc-500">
        Personal site MVP
      </p>
      <h1 className="text-3xl font-bold tracking-tight">Hi, I am Jacek.</h1>
      <p className="max-w-2xl text-zinc-600">
        This site is built with React, Vite, Tailwind, and a headless CMS. Use
        this page as the base for your hero section and latest-post preview.
      </p>
      <div className="flex gap-3 pt-2">
        <Link
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white"
          to="/blog"
        >
          Read Blog
        </Link>
        <Link
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm"
          to="/about"
        >
          About Me
        </Link>
      </div>
    </section>
  );
}
