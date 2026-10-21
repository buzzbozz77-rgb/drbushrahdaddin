import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import MeetTheTeam from "@/components/MeetTheTeam";
import SmileJourneyPlanner from "@/components/SmileJourneyPlanner";
import Gallery from "@/components/Gallery";
import RealStories from "@/components/RealStories";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MeetTheTeam />
      <Services />
      <SmileJourneyPlanner />
      <Gallery />
      <RealStories />
      <BookingForm />
    </>
  );
}