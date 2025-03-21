import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import SnowyBackground from './SnowyBackground';
import { useState } from 'react';

interface Prize {
  id: number;
  title: string;
  subtitle: string;
  amount: string;
  description: string;
  color: string;
  background: string;
}

function PrizeSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const prizes: Prize[] = [
    {
      id: 1,
      title: "FIRST",
      subtitle: "First Prize",
      amount: "$500K",
      description: "HACKATHON.DEV Goodies and Merch. Fundings and Internship opportunities from our sponsors",
      color: "#FFD700",
      background: "/assets/images/angry-birds-prize.jpg"
    },
    {
      id: 2,
      title: "SECOND",
      subtitle: "Second Prize",
      amount: "$300K",
      description: "HACKATHON.DEV Goodies and Merch. Fundings and Internship opportunities from our sponsors",
      color: "#C0C0C0",
      background: "/assets/images/sp.jpeg"
    },
    {
      id: 3,
      title: "THIRD",
      subtitle: "Third Prize",
      amount: "$200K",
      description: "HACKATHON.DEV Goodies and Merch. Fundings and Internship opportunities from our sponsors",
      color: "#CD7F32",
      background: "/assets/images/Tp.jpg"
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#180623] to-[#2a0b3a]">
      {/* Grid Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }} />
      </div>

      <SnowyBackground />
      
      {/* Animated Money SVGs */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-0"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16 relative z-20"
      >
        <div className="flex items-center justify-center gap-6">
          <h2 className="bolt-title text-3xl md:text-5xl lg:text-6xl">
            PRIZE POOL OF $2M+
          </h2>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 3, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-16 h-16 md:w-20 md:h-20 ml-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full opacity-50 blur-md" />
            <img 
              src="assets\images\mc.png" 
              alt="MM"
              className="relative w-full h-full object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            />
          </motion.div>
        </div>
        <p className="text-white text-lg opacity-80 mt-4">
          Join the biggest hackathon with amazing prizes and opportunities! 🚀
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-20">
        {prizes.map((prize) => (
          <PrizeCard 
            key={prize.id} 
            prize={prize} 
            onHover={() => setHoveredCard(prize.id)}
            onLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>
    </section>
  );
}

function PrizeCard({ 
  prize, 
  onHover, 
  onLeave 
}: { 
  prize: Prize;
  onHover: () => void;
  onLeave: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const getCardStyles = (id: number) => {
    switch(id) {
      case 1:
        return {
          button: 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black shadow-lg shadow-yellow-500/30',
          amount: 'text-yellow-400',
          shadow: '0 2px 8px rgba(255,215,0,0.5)',
          trophy: 'brightness-150 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]'
        };
      case 2:
        return {
          button: 'bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-black shadow-lg shadow-cyan-500/30',
          amount: 'text-cyan-300',
          shadow: '0 2px 8px rgba(0,255,255,0.5)',
          trophy: 'brightness-125 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]'
        };
      case 3:
        return {
          button: 'bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 text-white shadow-lg shadow-emerald-500/30',
          amount: 'text-emerald-400',
          shadow: '0 2px 8px rgba(0,255,128,0.5)',
          trophy: 'brightness-125 drop-shadow-[0_0_10px_rgba(0,255,128,0.5)]'
        };
      default:
        return {
          button: '',
          amount: '',
          shadow: '',
          trophy: ''
        };
    }
  };

  const styles = getCardStyles(prize.id);

  return (
    <motion.div
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative h-[400px]"
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          background: `url(${prize.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundBlendMode: 'normal',
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          x.set(e.clientX - centerX);
          y.set(e.clientY - centerY);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
          onLeave();
        }}
        onMouseEnter={onHover}
        className="relative w-full h-full rounded-lg overflow-hidden backdrop-blur-sm border border-white/10"
      >
        <>
          {/* Top gradient for text visibility */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-0" />
          {/* Bottom gradient for text visibility */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent z-0" />
        </>
        
        <div className="relative z-10 p-6 flex flex-col items-center text-white h-full">
          <motion.div
            className={`w-full p-4 mb-4 text-center rounded-md transform hover:scale-105 transition-transform duration-300 ${styles.button}`}
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-2xl font-extrabold font-gaming tracking-wider">
              {prize.title}
            </h3>
            <p className="text-sm font-semibold">{prize.subtitle}</p>
          </motion.div>

          <div className="text-center mt-4">
            <motion.p 
              className={`text-5xl md:text-6xl font-bold mb-2 font-gaming tracking-wider ${styles.amount}`}
              style={{ 
                textShadow: styles.shadow
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {prize.amount}
            </motion.p>
            <p className="text-base md:text-lg text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {prize.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PrizeSection;
