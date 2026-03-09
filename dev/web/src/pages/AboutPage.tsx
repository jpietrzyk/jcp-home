import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { getPageBySlug } from "../lib/cms/api";

export function AboutPage() {
  const [content, setContent] = useState<string>("Loading content...");

  useEffect(() => {
    getPageBySlug("about")
      .then((page) =>
        setContent(page?.bodyPlainText ?? 'Add an "about" page in CMS.'),
      )
      .catch(() => setContent("Failed to load CMS content."));
  }, []);

  return (
    <section className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-600">{content}</p>
        </CardContent>
      </Card>
    </section>
  );
}
