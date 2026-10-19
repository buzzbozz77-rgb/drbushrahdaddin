import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

// Gallery is built and ready (src/components/Gallery.tsx) — re-add it here
// once Dr. Bushra sends real case photos. An empty placeholder grid reads as
// dead space, so it stays out until there's real content to show.
//
// StatsStrip renders nothing until src/lib/config.todo.ts has real numbers —
// it's wired in now so it activates the moment those are confirmed.

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
