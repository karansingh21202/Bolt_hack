import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

function AnimatedBirds() {
  const redBirdRef = useRef<HTMLDivElement>(null);
  const pigRef = useRef<HTMLDivElement>(null);
  const yellowBirdRef = useRef<HTMLDivElement>(null);
  const tigerRef = useRef<HTMLImageElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.getElementById('birdsCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Animate Red Bird (Among Us)
    if (redBirdRef.current) {
      gsap.to(redBirdRef.current, {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // Animate Moana
    if (pigRef.current) {
      gsap.to(pigRef.current, {
        y: 15,
        x: -1,
        rotation: -3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5
      });
    }

    // Animate Goofy
    if (yellowBirdRef.current) {
      gsap.to(yellowBirdRef.current, {
        y: 25,
        x: 10,
        rotation: 8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });
    }

    // Animate Tiger
    if (tigerRef.current) {
      gsap.to(tigerRef.current, {
        y: -15,
        rotation: 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2
      });
    }

    // Torch glow animation
    if (torchRef.current) {
      gsap.to(torchRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ height: '100%', maxHeight: '100vh' }}>
      {/* Among Us */}
      <motion.div
        ref={redBirdRef}
        className="absolute left-[10%] top-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/svgs/amongus.png"
          alt="Among Us"
          style={{
            width: '240px',
            height: '290px',
            objectFit: 'contain'
          }}
        />
      </motion.div>

      {/* Moana */}
      <motion.div
        ref={pigRef}
        className="absolute right-[20%] top-[30%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <img
          src="/svgs/moana.png"
          alt="Moana"
          style={{
            width: '350px',
            height: '450px',
            objectFit: 'contain',
            marginBottom: '50px',
            marginLeft: '200px'
          }}
        />
      </motion.div>

      {/* Tiger with Torch */}
      <motion.div
        className="absolute left-[20%] top-[50%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img
          ref={tigerRef}
          src="/svgs/tiger.png"
          alt="Tiger"
          style={{
            width: '250px',
            height: '290px',
            objectFit: 'contain'
          }}
        />
        <div 
          ref={torchRef}
          className="absolute -bottom-5 left-20 left-1/2 transform -translate-x-1/2 w-16 h-16"
        >
          <div className="absolute inset-0 bg-orange-500 rounded-full filter blur-xl opacity-60"></div>
          <div className="absolute inset-0 bg-yellow-400 rounded-full filter blur-lg opacity-40"></div>
          <div className="absolute inset-0 bg-white rounded-full filter blur-md opacity-30"></div>
        </div>
      </motion.div>
    </div>
  );
}

export default AnimatedBirds;
