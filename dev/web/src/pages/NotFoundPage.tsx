import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-zinc-600">This page does not exist.</p>
      <Link className="text-sm underline" to="/">
        Go home
      </Link>
    </section>
  );
}
