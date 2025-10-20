import AboutHero from '../components/about/AboutHero';
import MissionVision from '../components/about/MissionVision';
import ValuesGrid from '../components/about/ValuesGrid';
import AchievementsStats from '../components/about/AchievementsStats';
import TeamGrid from '../components/about/TeamGrid';
import PartnersMarquee from '../components/about/PartnersMarquee';
import TestimonialsMini from '../components/about/TestimonialsMini';
import AboutCTA from '../components/about/AboutCTA';
import ContactStrip from '../components/about/ContactStrip';

function About() {
  return (
    <>
      <main>
        <AboutHero />
        <MissionVision />
        <ValuesGrid />
        <AchievementsStats />
        <TeamGrid />
        <PartnersMarquee />
        <TestimonialsMini />
        <AboutCTA />
        <ContactStrip />
      </main>
    </>
  );
}

export default About;
