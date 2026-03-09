import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { profile } from "../content/profile";

export function HomePage() {
  return (
    <section className="space-y-4">
      <p className="text-sm uppercase tracking-wide text-zinc-500">
        Personal site MVP
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{profile.name}</CardTitle>
          <p className="text-zinc-600">{profile.title}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="max-w-2xl text-zinc-600">{profile.about}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
            <span>{profile.location}</span>
            <a className="hover:underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a
              className="hover:underline"
              href={profile.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="hover:underline"
              href={profile.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/resume">
              <Button>View Resume</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary">About Me</Button>
            </Link>
            <Link to="/blog">
              <Button variant="ghost">Read Blog</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
