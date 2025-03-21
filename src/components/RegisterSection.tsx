import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Star interface
interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

// Shooting star interface
interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  direction: number;
  angle: number;
}

function RegisterSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create stars
    const stars: Star[] = [];
    const numStars = 800; // Doubled the number of stars!
    const shootingStars: ShootingStar[] = [];
    const maxShootingStars = 3; // Maximum number of concurrent shooting stars

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5, // Slightly larger stars
        opacity: Math.random(),
        speed: 0.1 + Math.random() * 0.3 // Slightly slower for better effect
      });
    }

    // Create shooting star
    function createShootingStar() {
      if (shootingStars.length < maxShootingStars && Math.random() < 0.02) {
        // Determine random direction (0: left-to-right, 1: right-to-left)
        const direction = Math.floor(Math.random() * 2);
        // Random angle between -30 and 30 degrees for diagonal movement
        const angle = (Math.random() * 60 - 30) * Math.PI / 180;
        
        const star = {
          x: direction === 0 ? 0 : canvas?.width ?? 0, // Fix null check
          y: Math.random() * ((canvas?.height ?? 0) * 0.7), // Fix null check
          length: 150 + Math.random() * 100,
          speed: 12 + Math.random() * 8,
          opacity: 1,
          direction,
          angle
        };
        
        shootingStars.push(star);
      }
    }

    // Animation function
    function animate() {
      if (!ctx || !canvas) return;
      
      // Clear canvas with enhanced gradient fade effect
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(18, 6, 35, 0.2)');    // Dark blue-purple (FAQ)
      gradient.addColorStop(0.2, 'rgba(26, 9, 48, 0.2)');  // Purple transition
      gradient.addColorStop(0.4, 'rgba(42, 16, 82, 0.2)'); // Rich purple
      gradient.addColorStop(0.6, 'rgba(88, 28, 135, 0.2)'); // Brighter purple
      gradient.addColorStop(0.8, 'rgba(157, 23, 77, 0.2)'); // Pink-purple
      gradient.addColorStop(1, 'rgba(219, 39, 119, 0.2)');  // Vibrant pink
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw regular stars with color variation based on position
      stars.forEach(star => {
        // Update position
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Twinkle effect
        star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5;

        // Color variation based on vertical position
        const progress = star.y / canvas.height;
        let hue;
        if (progress < 0.3) {
          hue = 230; // More blue at the top
        } else if (progress < 0.6) {
          hue = 270; // Purple in the middle
        } else {
          hue = 320; // Pink at the bottom
        }

        // Draw star with position-based color
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 70%, 80%, ${star.opacity * 0.8})`;
        ctx.fill();
      });

      // Create and update shooting stars
      createShootingStar();

      // Draw shooting stars
      ctx.lineCap = 'round';
      shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        
        // Calculate trail end point based on direction and angle
        const trailEndX = star.x - (star.direction === 0 ? -star.length : star.length) * Math.cos(star.angle);
        const trailEndY = star.y + star.length * Math.sin(star.angle);
        
        // Create gradient for the shooting star trail
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          trailEndX, trailEndY
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.1, `rgba(255, 230, 255, ${star.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineTo(trailEndX, trailEndY);
        ctx.stroke();

        // Update position based on direction and angle
        const moveX = star.speed * (star.direction === 0 ? 1 : -1) * Math.cos(star.angle);
        const moveY = star.speed * Math.sin(star.angle);
        star.x += moveX;
        star.y += moveY;
        star.opacity *= 0.99;

        // Remove if out of screen or faded
        if (
          star.x < -star.length || 
          star.x > canvas.width + star.length || 
          star.y > canvas.height + star.length || 
          star.opacity < 0.1
        ) {
          shootingStars.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <section className="relative py-16 px-4 overflow-hidden min-h-[80vh]">
      {/* Enhanced background gradient with more color stops */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120623] via-[#1a0930] via-[#24103d] via-[#581c87] via-[#9d174d] to-[#db2777] z-0"></div>

      {/* Animated stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none', opacity: 0.9 }}
      />

      {/* Enhanced glowing orbs with color transition */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-pink-800/10 rounded-full blur-3xl"></div>

      {/* Registration Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Prize Pool Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="group relative bg-[#1a0930]/50 backdrop-blur-sm rounded-xl p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 overflow-hidden"
        >
          {/* Hover lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Prize Pool</h3>
            <p className="text-white/90 text-lg">$500,000 in prizes for winning teams</p>
          </div>
        </motion.div>

        {/* Mentorship Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="group relative bg-[#1a0930]/50 backdrop-blur-sm rounded-xl p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 overflow-hidden"
        >
          {/* Hover lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Expert Mentorship</h3>
            <p className="text-white/90 text-lg">Get guidance from industry professionals</p>
          </div>
        </motion.div>

        {/* Networking Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="group relative bg-[#1a0930]/50 backdrop-blur-sm rounded-xl p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 overflow-hidden"
        >
          {/* Hover lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M2 12h20"></path>
                <path d="M12 2a10 10 0 0 1 10 10"></path>
                <path d="M12 22a10 10 0 0 1-10-10"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Global Network</h3>
            <p className="text-white/90 text-lg">Connect with hackers worldwide</p>
          </div>
        </motion.div>
      </div>

      {/* Main Registration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="group relative max-w-3xl mx-auto bg-gradient-to-r from-[#1a0930]/90 to-[#24103d]/90 p-6 md:p-8 rounded-xl shadow-2xl border border-violet-500/20 text-center z-10 backdrop-blur-sm overflow-hidden"
      >
        {/* Enhanced animated border gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bolt-title text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400"
        >
          READY TO PARTICIPATE?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white/80 text-lg mb-10 max-w-md mx-auto"
        >
          Join the world's biggest hackathon before your keyboard files a complaint!
        </motion.p>

        {/* Registration Button */}
        <motion.a
          href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05,
            rotateX: 5,
            y: -5,
          }}
          whileTap={{ 
            scale: 0.95,
            rotateX: 10,
            y: 5
          }}
          transition={{ 
            duration: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 15
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="
            relative inline-block
            bg-gradient-to-r from-pink-600 to-violet-600
            text-white font-bold
            py-4 px-12
            rounded-xl
            shadow-[0_15px_30px_-5px_rgba(219,39,119,0.6)]
            before:content-['']
            before:absolute
            before:inset-0
            before:bg-gradient-to-r
            before:from-pink-600/50
            before:to-violet-600/50
            before:rounded-xl
            before:translate-y-[6px]
            before:blur-[10px]
            before:z-[-1]
            after:content-['']
            after:absolute
            after:inset-0
            after:rounded-xl
            after:bg-gradient-to-r
            after:from-pink-600
            after:to-violet-600
            after:z-[-2]
            hover:shadow-[0_20px_40px_-5px_rgba(219,39,119,0.7)]
            hover:before:translate-y-[8px]
            hover:before:blur-[15px]
            group
            transition-all
            duration-300
            transform-gpu
          "
        >
          <span className="
            relative
            inline-block
            bg-clip-text text-transparent
            bg-gradient-to-r from-white to-pink-100
            group-hover:scale-110
            transition-transform
            duration-300
          ">
            REGISTER NOW
          </span>
          <div className="
            absolute inset-0
            rounded-xl
            bg-gradient-to-r from-pink-600/20 to-violet-600/20
            blur-sm
            z-[-1]
            transform
            transition-all
            duration-300
            opacity-0
            group-hover:opacity-100
          "></div>
        </motion.a>

        {/* Registration Details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 gap-4 text-sm"
        >
          <div className="text-white/60">
            <div className="font-semibold text-white/80">Registration Closes</div>
            <div>March 15, 2025</div>
          </div>
          <div className="text-white/60">
            <div className="font-semibold text-white/80">Event Duration</div>
            <div>48 Hours</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default RegisterSection;
