import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeJsSphere from './ThreeJsSphere';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

function FAQSection() {
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What's cooking at BoltNew Hackathon? 🔥",
      answer: "Picture this: A wild 48-hour adventure where tech wizards, pixel-perfect designers, and coding ninjas unite! We're cooking up the next big thing using BoltNew's magical tech stack. Think of it as a digital playground where you can flex your creative muscles and maybe, just maybe, build the next big thing! 🚀✨"
    },
    {
      id: 2,
      question: "Can I join the party? 🎉",
      answer: "Absolutely! Whether you're a coding superhero, a design maestro, or just starting your tech journey - you're invited! Roll solo or bring your squad (up to 4 members). No cape required, just bring your creativity and enthusiasm! 🦸‍♂️✨"
    },
    {
      id: 3,
      question: "What cool toys do we get to play with? 🎮",
      answer: "Oh boy, we've got the whole tech candy store! BoltNew's API playground, shiny development tools, and a cloud that's so fluffy you'll want to take a nap on it! Bring your favorite tech stack - whether it's web magic, mobile sorcery, or anything in between. Time to build something awesome! 🛠️💫"
    },
    {
      id: 4,
      question: "What treasures await the winners? 🏆",
      answer: "Arrr, matey! We've got a treasure chest full of goodies: Bags of cash prizes, golden opportunities for mentorship, and a chance to collaborate with BoltNew's finest! Plus, everyone gets access to exclusive resources and a chance to network with industry rockstars. Not bad, eh? 💰✨"
    }
  ];

  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const maxConnections = 30;     // Max connections at once
  const curveLifetime = 150;    // How long connections last
  const connectionInterval = 10; // How often new connections appear

  // Curve bulge settings
  const bulgeMin = 4;           // Minimum curve bulge
  const bulgeMax = 8;           // Additional random bulge

  const globalTimeIncrement = 0.15;  // Overall animation speed
  const rotationSpeedX = 0.05;       // Sphere X rotation
  const rotationSpeedY = 0.07;       // Sphere Y rotation

  // Pulse effect
  const pulseFrequency = 2;    // Pulse speed
  const pulseAmplitude = 0.2;  // Pulse size

  // Color animation
  const colorChangeSpeed = 0.1; // Color cycling speed

  return (
    <section className="relative py-20 px-4 min-h-screen flex flex-col justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120623] via-[#1a0930] to-[#2a1052] z-0"></div>
      
      {/* 3D Sphere using Three.js */}
      <ThreeJsSphere />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-12 -mt-16 relative z-10"
      >
        <h2 className="bolt-title text-3xl md:text-5xl lg:text-6xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 font-bold">
          FAQs
        </h2>
        <p className="text-white text-lg opacity-90 max-w-2xl mx-auto font-medium">
          Got questions? We've got answers! 🚀 No mind-reading required! 🧠✨
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        {faqItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-3 group"
          >
            <button
              onClick={() => toggleFAQ(item.id)}
              className="w-full text-left p-4 md:p-6 rounded-lg bg-gradient-to-r from-[#1a0930] to-[#24103d] text-white flex justify-between items-center transition-all relative overflow-hidden border border-pink-500/20 group-hover:border-pink-500/50"
            >
              {/* Question glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute inset-0 bg-pink-500/5"></div>
                <div className="absolute inset-0 rounded-lg border border-pink-500/30 blur"></div>
              </div>
              
              {/* Question content */}
              <div className="relative flex-1">
                <h3 className="text-lg font-semibold pr-4 group-hover:text-pink-200 transition-colors duration-300">
                  {item.question}
                </h3>
              </div>
              
              {/* Toggle button with glow */}
              <span className="text-2xl transform transition-transform relative w-8 h-8 flex items-center justify-center text-pink-400">
                <span className="absolute inset-0 bg-pink-500/10 rounded-full filter blur-sm group-hover:bg-pink-500/20 transition-all duration-300"></span>
                <span className="relative">{openId === item.id ? '−' : '+'}</span>
              </span>
            </button>

            <AnimatePresence>
              {openId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-6 rounded-b-lg relative border-x border-b border-pink-500/20 bg-[#24103d]/60">
                    {/* Answer content */}
                    <p className="relative text-white/90 font-light">
                      {item.answer}
                    </p>
                    
                    {/* Bottom glow effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Cuboid Button */}
      <motion.div 
        className="max-w-md mx-auto mt-10 relative z-10 flex justify-center perspective-1000"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.button
          className="group relative px-10 py-5 rounded-md overflow-hidden transform-gpu preserve-3d"
          whileHover={{ 
            scale: 1.02,
            rotateX: -15,
            rotateY: 15,
          }}
          whileTap={{ 
            scale: 0.95,
            rotateX: -5,
            rotateY: 5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {/* Front face - main button */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0930] to-[#24103d] border-t-2 border-pink-500/30"></div>
          
          {/* Top edge - enhanced depth */}
          <div className="absolute top-0 left-0 right-0 h-6 transform -translate-y-full preserve-3d origin-bottom rotate-x-90 bg-gradient-to-b from-pink-500/20 to-purple-800/20"></div>
          
          {/* Right edge - enhanced depth */}
          <div className="absolute top-0 right-0 bottom-0 w-6 transform translate-x-full preserve-3d origin-left rotate-y-90 bg-gradient-to-r from-pink-500/20 to-purple-800/20"></div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-md">
            <div className="absolute inset-0.5 rounded-md bg-gradient-to-r from-pink-500/10 to-purple-500/10 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
          </div>
          
          {/* Content wrapper */}
          <div className="relative flex items-center gap-3 text-white font-semibold">
            <span className="relative">
              <span className="block tracking-wider group-hover:text-pink-200 transition-colors duration-300">
                Have more questions?
              </span>
            </span>
            
            {/* Arrow with glow */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400 group-hover:text-pink-300 group-hover:translate-x-1 transform transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* Enhanced hover glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-20"></div>
            <div className="absolute inset-0 rounded-md border border-pink-500/50 blur"></div>
          </div>
        </motion.button>
      </motion.div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-x-90 {
          transform: rotateX(90deg);
        }
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
      `}</style>
    </section>
  );
}

export default FAQSection;
