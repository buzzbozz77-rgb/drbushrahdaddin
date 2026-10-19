import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import MeetTheTeam from "@/components/MeetTheTeam";
import SmileJourneyPlanner from "@/components/SmileJourneyPlanner";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

// Gallery is built and ready (src/components/Gallery.tsx) — re-add it here
// once Dr. Bushra sends real case photos. An empty placeholder grid reads as
// dead space, so it stays out until there's real content to show.

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <MeetTheTeam />
      <SmileJourneyPlanner />
      <Testimonials />
      <Contact />
    </>
  );
}
