import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedStars from './AnimatedStars';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
}

function RevolvingSponsorsSection() {
  // Selected 7 sponsors from the original list
  const sponsors: Sponsor[] = [
    {
      id: 1,
      name: "Cloudflare",
      logo: "svgs/cloudflare.png",
      description: "Cloudflare is a global network designed to make everything you connect to the internet secure, private, fast, and reliable.",
      website: "cloudflare.com",
    },
    {
      id: 2,
      name: "Supabase",
      logo: "/assets/images/spba.png",
      description: "Supabase is an open-source Firebase alternative providing real-time databases, authentication, and storage.",
      website: "supabase.com",
    },
    {
      id: 3,
      name: "Netlify",
      logo: "/assets/images/Nl.svg",
      description: "Netlify is a platform for deploying fast, modern web projects, integrating seamlessly with your favorite tools.",
      website: "netlify.com",
    },
    {
      id: 4,
      name: "Sentry",
      logo: "/assets/images/snt.png",
      description: "Sentry provides real-time error tracking and performance monitoring for developers.",
      website: "sentry.io",
    },
    {
      id: 5,
      name: "Exaai Labs",
      logo: "assets/images/ex.png", 
      description: "Exaai Labs specializes in advanced AI solutions, transforming industries with cutting-edge technology.",
      website: "hexa.ai",
    },
    {
      id: 6,
      name: "Loops.so",
      logo: "/assets/images/loops.png", 
      description: "Loops.so offers automated email marketing solutions tailored for SaaS companies.",
      website: "loops.so",
    },
    {
      id: 7,
      name: "Algorand Foundation",
      logo: "/assets/images/Alg.png",
      description: "Algorand Foundation is dedicated to fulfilling the global promise of blockchain technology by fostering an open, public, and permissionless blockchain ecosystem.",
      website: "algorand.foundation",
    },
  ];
  
  const [angle, setAngle] = useState(0);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  // Auto-rotate the carousel with increased speed
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (!selectedSponsor) {
      intervalId = setInterval(() => {
        setAngle(prevAngle => (prevAngle + 0.9) % 360);
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [selectedSponsor]);

  const radius = 600;
  const centerX = 550;
  const centerY = 200;

  const handleSponsorClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
  };

  const closeCard = () => {
    setSelectedSponsor(null);
  };

  // Function to handle website visit when clicking on card
  const visitWebsite = (website: string) => {
    window.open(`https://${website}`, '_blank');
    setTimeout(() => {
      closeCard();
    }, 300);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/assets/images/mc.png)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}
      ></div>
      
      <AnimatedStars />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16 relative z-10"
      >
        <h2 className="bolt-title text-3xl md:text-5xl lg:text-6xl mb-6">
          SPONSORS
        </h2>
        <p className="text-white text-lg opacity-80 max-w-2xl mx-auto">
          Fueled by caffeine, code, and occasional existential crises from industry experts.
        </p>
      </motion.div>

      {/* 3D Carousel Container */}
      <div className="relative h-96 w-full max-w-6xl mx-auto z-10"> 
        {sponsors.map((sponsor, index) => {
          const sponsorAngle = angle + (index * (360 / sponsors.length));
          const radians = sponsorAngle * (Math.PI / 180);
          
          // Calculate 3D position
          const x = centerX + radius * Math.sin(radians);
          const z = radius * Math.cos(radians);
          
          // Scale based on z-position to create depth
          const scale = (z + radius) / (2 * radius);
          const opacity = 0.4 + 0.6 * scale;
          
          // Increased card size
          const size = 200 + 140 * scale;
          
          return (
            <motion.div
              key={sponsor.id}
              className="absolute flex items-center justify-center rounded-lg cursor-pointer bg-[#1a0a30] p-4"
              style={{
                left: `${x - size/2}px`,
                top: `${centerY - size/2}px`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                zIndex: Math.floor(scale * 100),
                boxShadow: `0 4px 12px rgba(0,0,0,0.9), 0 0 10px rgba(438, 443, 226, ${scale * 0.7})`,
                border: `4px solid rgba(138, 43, 226, ${scale * 0.9})`
              }}
              onClick={() => handleSponsorClick(sponsor)}
              whileHover={{ scale: scale * 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-96 max-w-full object-contain"
                style={{
                  filter: 'brightness(1) contrast(1.1) drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.8))',
                  transform: `scale(${scale})`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
      
      {/* Sponsor Information Card */}
      {selectedSponsor && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.div 
            className="bg-[#1a0a30] p-8 rounded-lg shadow-xl max-w-xl w-full border-2 border-purple-600 text-white cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => visitWebsite(selectedSponsor.website)}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold">{selectedSponsor.name}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  closeCard();
                }}
                className="text-gray-300 hover:text-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="bg-white p-2 rounded-lg w-full flex items-center justify-center">
                <img
                  src={selectedSponsor.logo}
                  alt={selectedSponsor.name}
                  className="max-h-40 max-w-full"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-300 text-lg">{selectedSponsor.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default RevolvingSponsorsSection;
