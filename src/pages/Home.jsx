import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import EventsSection from '../components/EventsSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import LocationSection from '../components/LocationSection';
import SubscribeSection from '../components/SubscribeSection';

function Home() {
  return (
    <>
      <main>
        <Hero />
        <StatsSection />
        <EventsSection />
        <GallerySection />
        <TestimonialsSection />
        <LocationSection />
        <SubscribeSection />
      </main>
    </>
  );
}

export default Home;
