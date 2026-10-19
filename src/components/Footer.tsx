import { doctor } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted md:flex-row">
        <span>© {doctor.fullName}</span>
        <span>{doctor.location}</span>
      </div>
    </footer>
  );
}
