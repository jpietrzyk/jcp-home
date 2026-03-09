import { useEffect, useState } from "react";
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
      <h1 className="text-3xl font-bold">About</h1>
      <p className="text-zinc-600">{content}</p>
    </section>
  );
}
