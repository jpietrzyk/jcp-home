import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useResume } from "../lib/cms/useResume";

export function ResumePage() {
  const { resume, isLoading, error } = useResume();

  if (isLoading) {
    return (
      <section className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-stone-200 dark:bg-stone-700 rounded w-1/4"></div>
              <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-500">
              Error loading resume: {error.message}
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* CV Download Links */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-6">
          <a
            className="inline-flex h-10 items-center justify-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            href="/integration-spec-en.pdf"
            rel="noreferrer"
            target="_blank"
          >
            Open CV (EN)
          </a>
          <a
            className="inline-flex h-10 items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-50 dark:border-dark-600 dark:bg-dark-800 dark:text-stone-100 dark:hover:bg-dark-700"
            href="/integration-spec-pl.pdf"
            rel="noreferrer"
            target="_blank"
          >
            Open CV (PL)
          </a>
        </CardContent>
      </Card>

      {/* Bio Section */}
      {resume.bio && (
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{resume.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-stone-700 dark:text-stone-300">
            <p>{resume.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Contact Data Section */}
      {resume.contactData && (
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-stone-700 dark:text-stone-300">
            {resume.contactData.email && (
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${resume.contactData.email}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {resume.contactData.email}
                </a>
              </p>
            )}
            {resume.contactData.phone && (
              <p>
                <strong>Phone:</strong> {resume.contactData.phone}
              </p>
            )}
            {resume.contactData.location && (
              <p>
                <strong>Location:</strong> {resume.contactData.location}
              </p>
            )}
            {resume.contactData.linkedin && (
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={resume.contactData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {resume.contactData.linkedin}
                </a>
              </p>
            )}
            {resume.contactData.github && (
              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href={resume.contactData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {resume.contactData.github}
                </a>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Skills Section */}
      {resume.skills && resume.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience Section */}
      {resume.experience && resume.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 border-stone-300 pl-4 dark:border-stone-600"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {exp.position}
                  </h3>
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-stone-700 dark:text-stone-300">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                  {exp.employmentType && ` • ${exp.employmentType}`}
                </p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-2 list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education Section */}
      {resume.education && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-l-2 border-stone-300 pl-4 dark:border-stone-600">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {resume.education.school}
              </h3>
              <p className="text-stone-700 dark:text-stone-300">
                {resume.education.degree}
                {resume.education.field && ` in ${resume.education.field}`}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-stone-500 dark:text-stone-400">
                {resume.education.graduationYear && (
                  <span>Graduated: {resume.education.graduationYear}</span>
                )}
                {resume.education.grade && (
                  <span>Grade: {resume.education.grade}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Volunteer Experience Section */}
      {resume.volunteerExperience && resume.volunteerExperience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {resume.volunteerExperience.map((vol, index) => (
              <div
                key={index}
                className="border-l-2 border-stone-300 pl-4 dark:border-stone-600"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {vol.role}
                  </h3>
                  {(vol.startDate || vol.endDate) && (
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      {vol.startDate} - {vol.endDate || "Present"}
                    </span>
                  )}
                </div>
                <p className="text-stone-700 dark:text-stone-300">
                  {vol.organization}
                </p>
                {vol.description && (
                  <p className="mt-2 text-stone-600 dark:text-stone-400">
                    {vol.description}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Projects Section */}
      {resume.projects && resume.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {resume.projects.map((project, index) => (
              <div
                key={index}
                className="border-l-2 border-stone-300 pl-4 dark:border-stone-600"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {project.name}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      {project.startDate} - {project.endDate || "Present"}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="mt-2 text-stone-600 dark:text-stone-400">
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
