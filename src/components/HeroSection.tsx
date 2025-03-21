import CountdownTimer from './CountdownTimer';
import AnimatedBirds from './AnimatedBirds';
import Snow from './Snow';
import RocketAnimation from './RocketAnimation';
function HeroSection() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Company Logo */}
      <div className="absolute top-8 left-8 z-20">
        <img 
          src="https://cdn.brandfetch.io/idD1YVU3LM/w/820/h/820/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" 
          alt="Company Logo" 
          className="w-20 md:w-20 lg:w-25 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] filter brightness-110"
        />
      </div>

      {/* Snow effect */}
      <RocketAnimation />
      <Snow />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0.5px, transparent 0.5px)`,
          backgroundSize: '6px 6px',
          backgroundPosition: '0 0',
          opacity: 0.9
        }} />
      </div>

      <div className="flex flex-col items-center justify-center h-screen relative">
        <AnimatedBirds />
        <div className="text-center relative z-10">
          <h1 className="bolt-title text-4xl md:text-6xl lg:text-8xl mb-4">
            Hackathon.dev
          </h1>
          <p className="text-white text-sm md:text-xl lg:text-2xl font-bold mb-12">
            World's Largest Hackathon
          </p>
          <CountdownTimer />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-20 right-0 pb-16">
        <span className="text-[25px] md:text-[30px] lg:text-[35px] font-bold text-white bolt-title block text-center px-4">
          platform for exciting hackathons, showcase innovative ideas, and collaboration with a global community
        </span>
      </div>
    </div>
  );
}

export default HeroSection;
