import { type FormEvent, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { CmsPageContent } from "../components/CmsPageContent";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { profile } from "../content/profile";
import { useCmsPage } from "../lib/cms/useCmsPage";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactPage() {
  const { page, isLoading, error } = useCmsPage("contact", {
    fallback: {
      title: "Contact",
      slug: "contact",
      subtitle: "Get in touch — I'd love to hear from you.",
      eyebrow: "Let's Connect",
      bodyPlainText: "",
    },
  });

  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("bot-field")) {
      setFormState("success");
      return;
    }

    setFormState("submitting");

    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      encoded.append(key, value.toString());
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded.toString(),
      });
      if (response.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <PageTransition>
      <section className="space-y-10">
        {page.eyebrow ? (
          <AnimatedSection>
            <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {page.eyebrow}
            </p>
          </AnimatedSection>
        ) : null}

        <AnimatedSection delay={0.1}>
          <PageHero title={page.title} subtitle={page.subtitle}>
            <CmsPageContent
              error={error}
              isLoading={isLoading}
              body={page.body}
              bodyPlainText={page.bodyPlainText}
              richTextClassName="prose prose-stone dark:prose-invert"
              hideFirstHeadingMatching={page.title}
              errorClassName="text-amber-600 dark:text-amber-500"
              loadingClassName="text-stone-500 dark:text-stone-500"
            />
          </PageHero>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Card>
            <CardContent className="p-5 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Contact Info
              </h2>
              <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
                    {profile.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
                    {profile.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{profile.location}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Card>
            <CardContent className="p-5 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Send a Message
              </h2>

              {formState === "success" ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Message sent! I'll get back to you soon.
                </p>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Don't fill this out
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <Textarea
                    name="message"
                    placeholder="...what's on yr mind?"
                    rows={5}
                    required
                    disabled={formState === "submitting"}
                  />
                  {formState === "error" && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <Button type="submit" disabled={formState === "submitting"}>
                    {formState === "submitting" ? "Sending..." : "Send"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>
    </PageTransition>
  );
}
