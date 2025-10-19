import Header from '../components/Header';
import Hero from '../components/Hero';
import EventsSection from '../components/EventsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EventsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;
