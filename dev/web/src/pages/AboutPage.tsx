import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CmsPageContent } from "../components/CmsPageContent";
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
          <CmsPageContent
            error={error}
            isLoading={isLoading}
            body={page.body}
            bodyPlainText={page.bodyPlainText}
            richTextClassName="prose-zinc text-zinc-600"
          />
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
