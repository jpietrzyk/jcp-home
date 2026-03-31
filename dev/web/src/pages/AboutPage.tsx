import { Briefcase, GraduationCap, Heart, FolderOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AnimatedSection } from "../components/AnimatedSection";
import { CmsPageContent } from "../components/CmsPageContent";
import { PageTransition } from "../components/PageTransition";
import { SectionHeading } from "../components/resume/SectionHeading";
import { ResumeHeader } from "../components/resume/ResumeHeader";
import { ResumeHero } from "../components/resume/ResumeHero";
import { ResumeJobExperience } from "../components/resume/ResumeJobExperience";
import { ResumeEducation } from "../components/resume/ResumeEducation";
import { ResumeVolunteer } from "../components/resume/ResumeVolunteer";
import { ResumeProject } from "../components/resume/ResumeProject";
import { useCmsPage } from "../lib/cms/useCmsPage";
import { useResume } from "../lib/cms/useResume";
import { profile } from "../content/profile";

export function AboutPage() {
  const { page, isLoading, error } = useCmsPage("about", {
    fallback: {
      title: "About",
      slug: "about",
      subtitle: null,
      eyebrow: null,
      bodyPlainText: profile.about,
    },
  });
  const { resume, isLoading: isResumeLoading, error: resumeError } = useResume();

  return (
    <PageTransition>
      <section className="space-y-10">
        <AnimatedSection>
          <div className="space-y-6">
            {page.eyebrow ? (
              <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
                {page.eyebrow}
              </p>
            ) : null}
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
              richTextClassName="prose prose-stone text-stone-800 dark:prose-invert"
              hideFirstHeadingMatching={page.title}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-stone-700 dark:text-stone-300">
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
          </div>
        </AnimatedSection>

        {isResumeLoading ? (
          <AnimatedSection delay={0.1}>
            <Card>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-10 bg-stone-200 dark:bg-stone-700 rounded w-1/3" />
                  <div className="h-5 bg-stone-200 dark:bg-stone-700 rounded w-1/2" />
                  <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-2/3" />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ) : resumeError ? (
          <AnimatedSection delay={0.1}>
            <Card>
              <CardContent className="p-6">
                <p className="text-red-500">
                  Error loading resume: {resumeError.message}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ) : (
          <>
            <AnimatedSection delay={0.1}>
              <ResumeHeader
                name={profile.name}
                title={profile.title}
                contactData={resume.contactData}
                cvLinks={[
                  { label: "CV (EN)", href: "/integration-spec-en.pdf" },
                  { label: "CV (PL)", href: "/integration-spec-pl.pdf" },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <ResumeHero bio={resume.bio} skills={resume.skills} />
            </AnimatedSection>

            {resume.experience && resume.experience.length > 0 && (
              <div>
                <AnimatedSection>
                  <SectionHeading icon={Briefcase} title="Work Experience" />
                </AnimatedSection>
                <div className="space-y-4">
                  {resume.experience.map((exp, index) => (
                    <AnimatedSection key={index} delay={0.05 * index}>
                      <ResumeJobExperience
                        position={exp.position}
                        company={exp.company}
                        location={exp.location}
                        employmentType={exp.employmentType}
                        startDate={exp.startDate}
                        endDate={exp.endDate}
                        isCurrent={exp.isCurrent}
                        achievements={exp.achievements}
                      />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}

            {resume.education && (
              <div>
                <AnimatedSection>
                  <SectionHeading icon={GraduationCap} title="Education" />
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                  <ResumeEducation
                    school={resume.education.school}
                    degree={resume.education.degree}
                    field={resume.education.field}
                    graduationYear={resume.education.graduationYear}
                    grade={resume.education.grade}
                  />
                </AnimatedSection>
              </div>
            )}

            {resume.volunteerExperience && resume.volunteerExperience.length > 0 && (
              <div>
                <AnimatedSection>
                  <SectionHeading icon={Heart} title="Volunteer Experience" />
                </AnimatedSection>
                <div className="space-y-4">
                  {resume.volunteerExperience.map((vol, index) => (
                    <AnimatedSection key={index} delay={0.05 * index}>
                      <ResumeVolunteer
                        organization={vol.organization}
                        role={vol.role}
                        startDate={vol.startDate}
                        endDate={vol.endDate}
                        description={vol.description}
                      />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}

            {resume.projects && resume.projects.length > 0 && (
              <div>
                <AnimatedSection>
                  <SectionHeading icon={FolderOpen} title="Projects" />
                </AnimatedSection>
                <div className="space-y-4">
                  {resume.projects.map((project, index) => (
                    <AnimatedSection key={index} delay={0.05 * index}>
                      <ResumeProject
                        name={project.name}
                        description={project.description}
                        url={project.url}
                        technologies={project.technologies}
                        startDate={project.startDate}
                        endDate={project.endDate}
                      />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </PageTransition>
  );
}
