
import Background from './components/Background';
import AnimatedBirds from './components/AnimatedBirds';
import HeroSection from './components/HeroSection';
import PrizeSection from './components/PrizeSection';
import TracksSection from './components/TracksSection';
import SponsorStatements from './components/SponsorStatements';
import SponsorsSection from './components/SponsorsSection';
import TimelineSection from './components/TimelineSection';
import FAQSection from './components/FAQSection';
import RegisterSection from './components/RegisterSection';
import Footer from './components/Footer';
import Judges from './components/Judges';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <AnimatedBirds />


      <main>
        <HeroSection />
        <PrizeSection />
        <TracksSection />
        <Judges />
        <SponsorsSection />
        <TimelineSection />
        <FAQSection />
        <RegisterSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
