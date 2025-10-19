import Header from '../components/Header';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import EventsSection from '../components/EventsSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import LocationSection from '../components/LocationSection';
import SubscribeSection from '../components/SubscribeSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <EventsSection />
        <GallerySection />
        <TestimonialsSection />
        <LocationSection />
        <SubscribeSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;
