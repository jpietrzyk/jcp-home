import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AnimatedSection } from "../components/AnimatedSection";
import { profile } from "../content/profile";

export function HomePage() {
  return (
    <section className="space-y-4">
      <AnimatedSection delay={0.1}>
        <p className="text-sm uppercase tracking-wide text-accent-primary">
          Personal site MVP
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{profile.name}</CardTitle>
            <p className="text-zinc-400">{profile.title}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatedSection delay={0.3}>
              <p className="max-w-2xl text-zinc-400">{profile.about}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
                <span className="hover:text-accent-primary transition-colors duration-300">
                  {profile.location}
                </span>
                <a
                  className="hover:text-accent-primary hover:underline transition-all duration-300"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
                <a
                  className="hover:text-accent-primary hover:underline transition-all duration-300"
                  href={profile.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="hover:text-accent-primary hover:underline transition-all duration-300"
                  href={profile.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
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
            </AnimatedSection>
          </CardContent>
        </Card>
      </AnimatedSection>
    </section>
  );
}
