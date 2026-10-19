import { doctor } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <h2 className="font-serif text-3xl text-foreground">About {doctor.shortName}</h2>

        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{doctor.bio}</p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {doctor.credentials.map((credential) => (
              <li
                key={credential}
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium uppercase tracking-wide text-primary-dark"
              >
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
