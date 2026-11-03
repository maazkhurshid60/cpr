import { ButtonLink, Container } from "./components/ui";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="max-w-xl text-center">
        <p className="font-heading text-6xl font-extrabold text-brand-red">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">This page isn&rsquo;t here</h1>
        <p className="mt-4 text-slate-600">The page may have moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/courses" variant="outline">
            Courses
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
