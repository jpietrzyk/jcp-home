import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AnimatedSection } from "../components/AnimatedSection";
import { AnimatedText } from "../components/AnimatedText";
import { profile } from "../content/profile";

export function HomePage() {
  return (
    <section className="space-y-4">
      <AnimatedSection delay={0.1}>
        <p className="text-sm uppercase tracking-wide text-zinc-500">
          Personal site MVP
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Card>
          <CardHeader>
            <AnimatedText
              text={profile.name}
              className="text-3xl gradient-text"
              delay={0.3}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-zinc-400"
            >
              {profile.title}
            </motion.p>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatedSection delay={0.6}>
              <p className="max-w-2xl text-zinc-400">{profile.about}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.7}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
                <span className="hover:text-zinc-100 transition-colors">
                  {profile.location}
                </span>
                <a
                  className="hover:text-accent-primary hover:underline transition-all"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
                <a
                  className="hover:text-accent-primary hover:underline transition-all"
                  href={profile.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="hover:text-accent-primary hover:underline transition-all"
                  href={profile.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.8}>
              <div className="flex flex-wrap gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/resume">
                    <Button>View Resume</Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/about">
                    <Button variant="secondary">About Me</Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/blog">
                    <Button variant="ghost">Read Blog</Button>
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>
          </CardContent>
        </Card>
      </AnimatedSection>
    </section>
  );
}
