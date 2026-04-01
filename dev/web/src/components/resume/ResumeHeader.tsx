import { Mail, MapPin, Download, FileText, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ContactData } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

interface ResumeHeaderProps {
  name: string;
  title: string;
  contactData?: ContactData;
  cvLinks?: { label: string; href: string }[];
  className?: string;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function ResumeHeader({
  name,
  title,
  contactData,
  cvLinks,
  className,
}: ResumeHeaderProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {name}
            </h1>
            <p className="mt-2 text-lg md:text-xl text-amber-700 dark:text-amber-400 font-medium">
              {title}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600 dark:text-stone-400">
            {contactData?.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                {contactData.location}
              </span>
            )}
            {contactData?.email && (
              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                {contactData.email}
              </a>
            )}
            {contactData?.phone && (
              <a
                href={`tel:${contactData.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                {contactData.phone}
              </a>
            )}
            {contactData?.linkedin && (
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              >
                <LinkedInIcon className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                LinkedIn
              </a>
            )}
            {contactData?.github && (
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              >
                <GitHubIcon className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                GitHub
              </a>
            )}
          </div>

          {cvLinks && cvLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-1">
              {cvLinks.map((link) => (
                <Button key={link.href} asChild size="sm">
                  <a href={link.href} rel="noopener noreferrer" target="_blank">
                    <FileText className="w-4 h-4 mr-1.5" />
                    {link.label}
                    <Download className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
