import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { profile } from "../content/profile";

export function ResumePage() {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CV Versions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <a
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            href="/integration-spec-en.pdf"
            rel="noreferrer"
            target="_blank"
          >
            Open CV (EN)
          </a>
          <a
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
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
          <CardTitle className="text-3xl">Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-zinc-700">
          <p>
            <strong>{profile.name}</strong>
          </p>
          <p>{profile.title}</p>
          <p>{profile.location}</p>
          <p>
            <a className="hover:underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>{" "}
            |{" "}
            <a
              className="hover:underline"
              href={profile.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              className="hover:underline"
              href={profile.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>{" "}
            | {profile.phone}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {profile.workExperience.map((job) => (
            <div className="space-y-3" key={`${job.company}-${job.period}`}>
              <div>
                <h3 className="text-lg font-semibold">
                  {job.role} · {job.company}
                </h3>
                <p className="text-sm text-zinc-500">
                  {job.location} · {job.period}
                </p>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-zinc-700">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-zinc-700">
          <p>
            <strong>{profile.education.school}</strong>
          </p>
          <p>
            {profile.education.degree} · Grad {profile.education.graduation}
          </p>
          <p>
            {profile.education.field} · Grade: {profile.education.grade}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                className="rounded-md border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm text-zinc-700"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
