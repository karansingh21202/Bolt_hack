import { motion } from 'framer-motion';
import './TracksSection.css';

function TracksSection() {
  const tracks = [
    { id: 1, name: "AR/VR", color: "#FF4F8B", icon: "svgs/vr-glasses.png" },
    { id: 2, name: "EduTech", color: "#4F91FF", icon: "svgs/edutech.png" },
    { id: 3, name: "Healthcare", color: "#FF4F4F", icon: "svgs/heathcare.png" },
    { id: 4, name: "GameDev", color: "#80CBC4", icon: "svgs/gamedev.png" },
    { id: 5, name: "FinTech", color: "#FF4F8B", icon: "svgs/digital-money.png" },
    { id: 6, name: "CyberSec", color: "#4F91FF", icon: "svgs/cyber-security.png" },
    { id: 7, name: "Defence", color: "#FF4F4F", icon: "svgs/shield.png" },
    { id: 8, name: "Blockchain", color: "#80CBC4", icon: "svgs/blockchain.png" },
  ];

  return (
    <section className="relative py-20 px-4 bg-[#0a0025] overflow-hidden">
      {/* Full Section Background */}
      <div className="absolute inset-0 z-0">
        {/* Rotating Background Layer */}
        <div 
          className="rotating-background absolute inset-0" 
          style={{ backgroundColor: "#1a0930" }} // Change as needed
        ></div>
        {/* Rotating Rays Overlay */}
        <div className="rotating-rays absolute inset-0"></div>
        {/* Semi-Transparent Overlay */}
        <div className="absolute inset-0 bg-purple-900/10 backdrop-blur-sm"></div>
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16 relative z-10"
      >
        <h2 className="bolt-title text-3xl md:text-5xl lg:text-6xl mb-6 text-white font-bold">
          TRACKS
        </h2>
        <p className="text-white text-lg opacity-80 max-w-2xl mx-auto">
          Choose from a variety of exciting tracks for your hackathon project
        </p>
      </motion.div>

      {/* Tracks Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {tracks.map((track) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="track-box border-[10px] border-white relative"
            style={{ 
              width: '100%',
              aspectRatio: '1/1',
              maxWidth: '300px',
              margin: '0 auto'
            }}
            data-track={track.name}
          >
            <div className="relative aspect-square flex flex-col items-center justify-center text-white p-4 overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <img src={track.icon} alt={track.name} className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6" />
                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">{track.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TracksSection;
