import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useCmsPage } from "../lib/cms/useCmsPage";
import { profile } from "../content/profile";

export function AboutPage() {
  const { page, isLoading, error } = useCmsPage("about", {
    fallback: {
      title: "About",
      slug: "about",
      subtitle: null,
      bodyPlainText: profile.about,
    },
  });

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{page.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-amber-600">
              Could not load CMS content. Showing fallback text.
            </p>
          ) : null}
          {isLoading ? (
            <p className="text-zinc-500">Loading content...</p>
          ) : (
            <p className="text-zinc-600">{page.bodyPlainText}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-zinc-700">
          <p>
            <strong>Email:</strong>{" "}
            <a className="hover:underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              className="hover:underline"
              href={profile.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              {profile.linkedin}
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              className="hover:underline"
              href={profile.github}
              rel="noreferrer"
              target="_blank"
            >
              {profile.github}
            </a>
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
