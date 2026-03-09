import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function HomePage() {
  return (
    <section className="space-y-4">
      <p className="text-sm uppercase tracking-wide text-zinc-500">
        Personal site MVP
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Hi, I am Jacek.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="max-w-2xl text-zinc-600">
            This site is built with React, Vite, Tailwind, and a headless CMS.
            Use this page as the base for your hero section and latest-post
            preview.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/blog">
              <Button>Read Blog</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary">About Me</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
