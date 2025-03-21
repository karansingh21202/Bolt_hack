import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { createSpherePoints, drawSphere } from '../utils/sphereEffect';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ParallaxValues {
  rotateX: number;
  rotateY: number;
  translateZ: number;
}

interface Point {
  x: number;
  y: number;
  z: number;
  connections: Point[];
}

function TimelineSection() {
  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      date: "March 15, 2024",
      title: "Level 1: Registration Opens! 🚀",
      description: "Time to join the coolest hackathon party! Early birds get the extra swag (and maybe a virtual high-five). Whether you're a coding wizard or just starting your dev journey, there's room for everyone in this epic adventure! 🎮",
      icon: "https://cdn-icons-png.flaticon.com/512/1945/1945940.png",
      color: "from-[#180623] to-[#2d1245]"
    },
    {
      id: 2,
      date: "March 30, 2024",
      title: "Squad Assembly Time! 🤝",
      description: "Find your dream team or join the party solo! Looking for the perfect teammates? Our matchmaking system is like Tinder, but for hackers (minus the awkward small talk). Max party size: 4 players! 🎯",
      icon: "https://cdn-icons-png.flaticon.com/512/1356/1356479.png",
      color: "from-[#2d1245] to-[#421868]"
    },
    {
      id: 3,
      date: "April 7, 2024",
      title: "Boss Battle Begins! ⚔️",
      description: "The main event is here! Grab your energy drinks, put on your lucky coding socks, and get ready for 48 hours of pure awesomeness. Remember: Sleep is for the weak (just kidding, please take care of yourself!) 💪",
      icon: "https://cdn-icons-png.flaticon.com/512/1157/1157109.png",
      color: "from-[#421868] to-[#572091]"
    },
    {
      id: 4,
      date: "April 8, 2024",
      title: "Final Boss Deadline! ⏰",
      description: "Time to show off your masterpiece! Whether it's held together by duct tape and prayers or it's the next billion-dollar idea, we want to see it! Don't forget to make your demo video extra spicy! 🌶️",
      icon: "https://cdn-icons-png.flaticon.com/512/6614/6614677.png",
      color: "from-[#572091] to-[#6829ba]"
    },
    {
      id: 5,
      date: "April 8, 2024",
      title: "Victory Royale! 👑",
      description: "The moment of glory arrives! Join us for the grand finale where we crown the hackathon heroes. Spoiler alert: Everyone's a winner (but some winners get cool prizes and eternal glory!) 🏆",
      icon: "https://cdn-icons-png.flaticon.com/512/3176/3176272.png",
      color: "from-[#6829ba] to-[#7934e4]"
    }
  ];

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [parallaxValues, setParallaxValues] = useState<Record<number, ParallaxValues>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const pointsRef = useRef<Point[]>([]);

  const toggleFlip = (eventId: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handleMouseMove = (e: React.MouseEvent, eventId: number) => {
    if (flippedCards[eventId]) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateY = x * 0.05;
    const rotateX = y * -0.05;
    
    setParallaxValues(prev => ({
      ...prev,
      [eventId]: { rotateX, rotateY, translateZ: 30 }
    }));
  };

  const handleMouseLeave = (eventId: number) => {
    setParallaxValues(prev => ({
      ...prev,
      [eventId]: { rotateX: 0, rotateY: 0, translateZ: 0 }
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      ctx.scale(scale, scale);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize sphere with smaller radius and more points
    const sphereConfig = {
      radius: 500,
      numPoints: 180,
      maxConnections: 5,
      rotationSpeed: 0.002,
      connectionThreshold: 80,
      baseColor: [255, 27, 107] as [number, number, number],
      opacity: 0.25,
      lineWidth: 1,
      pointSize: 2.5,
      perspective: 800,
      connectFromOutside: true
    };

    const points = createSpherePoints(sphereConfig);
    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      rotation += sphereConfig.rotationSpeed;
      
      drawSphere(ctx, points, {
        ...sphereConfig,
        width: canvas.width / window.devicePixelRatio,
        height: canvas.height / window.devicePixelRatio,
        rotation,
        mouseX: 0,
        mouseY: 0,
        isHovered: false
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#120623] to-[#2a0b3a]">
      {/* Background Sphere */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute w-full h-full"
        style={{
            opacity: 0.8,
            transform: 'scale(2)',
            transformOrigin: 'center center',
            mixBlendMode: 'screen'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16 relative z-10"
      >
        <h2 className="bolt-title text-3xl md:text-5xl lg:text-6xl mb-6">
          TIMELINE
        </h2>
        <div className="flex items-center justify-center gap-3">
          <p className="text-white text-lg opacity-90 font-medium">
            Mark your calendars for these important dates!
          </p>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/6537/6537680.png" 
            alt="Calendar" 
            className="w-10 h-10 inline-block animate-bounce"
            style={{
              filter: 'hue-rotate(280deg) brightness(1.2) drop-shadow(0 0 12px rgba(147, 51, 234, 0.5))',
              animation: 'bounce 2s infinite'
            }}
          />
        </div>
      </motion.div>

      <div ref={containerRef} className="max-w-5xl mx-auto relative z-10">
        {/* Central Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-800 via-pink-600 to-orange-500 transform -translate-x-1/2 hidden md:block"></div>

        {timelineEvents.map((event, index) => {
          const { rotateX, rotateY, translateZ } = parallaxValues[event.id] || { rotateX: 0, rotateY: 0, translateZ: 0 };
          
          return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-8 md:mb-16 ${index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-auto md:mr-[50%]' : 'md:pl-8 md:ml-[50%]'}`}
              style={{ maxWidth: 'calc(50% - 16px)' }}
          >
              {/* Connecting Line for Each Card */}
              <div
                className={`hidden md:block absolute top-7 ${index % 2 === 0 ? 'right-1 w-6' : 'left-1 w-6'} h-0.5 bg-violet-600`}
              ></div>

              {/* Card */}
              <div 
                className="cursor-pointer group"
                onClick={() => toggleFlip(event.id)}
              >
                <div 
                  className="relative w-full h-56"
                  style={{ 
                    perspective: '2000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div 
                    className="relative w-full h-full transition-all duration-700 ease-out"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flippedCards[event.id] 
                        ? 'rotateY(180deg)' 
                        : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`
                    }}
                  >
                    {/* Front face */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-lg p-5 flex flex-col items-center justify-center"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateX(0deg)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div 
                        className="text-center transform-gpu"
                        style={{ transform: 'translateZ(1px)' }}
                      >
                        <img 
                          src={event.icon} 
                          alt={event.title}
                          className="w-14 h-14 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                        />
                        <h2 className="text-lg font-semibold text-blue-600 mb-2">{event.title}</h2>
                        <p className="text-gray-600 text-sm">{event.date}</p>
                        <div className="mt-3 text-gray-500 text-xs">
                          Click to learn more
                        </div>
                      </div>
                    </div>
                    
                    {/* Back face */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div 
                        className={`relative w-full h-full bg-gradient-to-br ${event.color} text-white/90 rounded-lg shadow-lg p-4 backdrop-blur-sm bg-opacity-90 border border-white/10`}
                        style={{ transform: 'translateZ(1px)' }}
                      >
                        <div className="flex flex-col h-full justify-center items-center text-center transform-gpu">
                          <h2 className="text-lg font-semibold mb-3 text-white">{event.title}</h2>
                          <p className="text-white/80 leading-relaxed text-xs">{event.description}</p>
                          <p className="text-white/60 text-xs mt-3">{event.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default TimelineSection;