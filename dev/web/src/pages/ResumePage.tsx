import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CmsPageContent } from "../components/CmsPageContent";
import { useCmsPage } from "../lib/cms/useCmsPage";
import { profile } from "../content/profile";

export function ResumePage() {
  const { page, isLoading, error } = useCmsPage("resume", {
    fallback: {
      title: "Resume",
      slug: "resume",
      subtitle: profile.title,
      bodyPlainText: profile.about,
    },
  });

  return (
    <section className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap gap-3">
          <a
            className="inline-flex h-10 items-center justify-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800"
            href="/integration-spec-en.pdf"
            rel="noreferrer"
            target="_blank"
          >
            Open CV (EN)
          </a>
          <a
            className="inline-flex h-10 items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-50 dark:border-stone-300 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-50"
            href="/integration-spec-pl.pdf"
            rel="noreferrer"
            target="_blank"
          >
            Open CV (PL)
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{page.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-stone-700 dark:text-stone-300">
          <CmsPageContent
            error={error}
            isLoading={isLoading}
            body={page.body}
            bodyPlainText={page.bodyPlainText}
            richTextClassName="prose prose-stone dark:prose-invert"
            hideFirstHeadingMatching={page.title}
          />
        </CardContent>
      </Card>
    </section>
  );
}
