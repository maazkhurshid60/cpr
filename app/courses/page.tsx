import type { Metadata } from "next";
import { COURSES } from "@/lib/courses";
import { ButtonLink, Container, CourseCard, CtaBand, PageHero, Reveal } from "../components/ui";

export const metadata: Metadata = {
  title: "AHA CPR, First Aid & BLS Courses",
  description:
    "Compare our American Heart Association courses: BLS Provider, Heartsaver CPR, First Aid & AED, and Pediatric First Aid, CPR & AED. Classroom, blended or onsite.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Courses"
        title="AHA CPR, First Aid & BLS courses"
        intro="Every course is an official American Heart Association course, taught hands-on by a certified instructor. Choose the one your job, school or family needs."
        image="/images/class-group.webp"
      >
        <ButtonLink href="/schedule">See the Schedule</ButtonLink>
        <ButtonLink href="/group-training" variant="outline-light">
          Train a Group
        </ButtonLink>
      </PageHero>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>

          <div data-reveal className="mt-16 overflow-x-auto rounded-2xl border border-navy-100">
            <table className="w-full min-w-160 text-left text-sm">
              <caption className="sr-only">Course comparison</caption>
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Course
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Best for
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Length
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Card
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 bg-white">
                {COURSES.map((c) => (
                  <tr key={c.slug}>
                    <th scope="row" className="px-5 py-4 font-heading font-bold text-navy-900">
                      {c.name}
                    </th>
                    <td className="px-5 py-4 text-slate-600">{c.audience}</td>
                    <td className="px-5 py-4 text-slate-600">{c.duration}</td>
                    <td className="px-5 py-4 text-slate-600">{c.card}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
