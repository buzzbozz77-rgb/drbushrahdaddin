import { doctor, socials } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-14 text-white md:px-16">
          <h2 className="font-serif text-3xl">Plan your visit</h2>
          <p className="mt-3 max-w-md text-white/80">
            Based in {doctor.location}. Reach out directly or follow along for
            daily case studies and patient results.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={doctor.whatsappHref}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-primary-dark transition-opacity hover:opacity-90"
            >
              WhatsApp
            </a>
            <a
              href={doctor.phoneHref}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {doctor.phone}
            </a>
            <a
              href={doctor.mapsHref}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Get directions
            </a>
          </div>

          <div className="mt-10 flex gap-6 border-t border-white/20 pt-6 text-sm text-white/80">
            {Object.values(socials).map((social) => (
              <a key={social.label} href={social.href} className="hover:text-white">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
