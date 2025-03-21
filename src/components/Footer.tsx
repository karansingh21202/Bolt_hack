import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [direction, setDirection] = useState('right');
  const [isLeftKicking, setIsLeftKicking] = useState(false);
  const [isRightKicking, setIsRightKicking] = useState(false);
  
  // Field dimensions
  const fieldWidth = window.innerWidth || 1200; // Use full width of container
  const playerWidth = 80;
  const ballSize = 30;
  
  // Player positions - left player stays fixed, right player at the edge
  const leftPlayerX = 50;
  const rightPlayerX = fieldWidth - 120; // Adjusted based on right player position
  
  // Initial ball position (near left player's foot)
  const [ballPosition, setBallPosition] = useState(leftPlayerX + playerWidth);
  
  // Animation settings
  const ballSpeed = 3; // pixels per frame
  const kickDuration = 0.5; // seconds
  
  useEffect(() => {
    const animateGame = () => {
      if (direction === 'right') {
        // Moving right
        if (ballPosition >= rightPlayerX - ballSize) {
          // Ball reached right player
          setIsRightKicking(true);
          setTimeout(() => {
            setIsRightKicking(false);
            setDirection('left');
          }, kickDuration * 1000);
        } else {
          // Continue moving right
          setBallPosition(prev => prev + ballSpeed);
        }
      } else {
        // Moving left
        if (ballPosition <= leftPlayerX + playerWidth) {
          // Ball reached left player
          setIsLeftKicking(true);
          setTimeout(() => {
            setIsLeftKicking(false);
            setDirection('right');
          }, kickDuration * 1000);
        } else {
          // Continue moving left
          setBallPosition(prev => prev - ballSpeed);
        }
      }
    };

    // Recalculate field width on window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      // Only update if significant change to prevent unnecessary rerenders
      if (Math.abs(newWidth - fieldWidth) > 50) {
        // If we wanted to update fieldWidth we would need to make it state
        // This is handled by the full-width container
      }
    };

    window.addEventListener('resize', handleResize);
    const interval = setInterval(animateGame, 16); // ~60fps
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [direction, ballPosition, fieldWidth]);

  // Kick animation variants for left and right players
  const leftKickVariants = {
    idle: { rotate: 0 },
    kicking: { rotate: 10, transition: { duration: 0.3 } }
  };
  
  const rightKickVariants = {
    idle: { rotate: 0 },
    kicking: { rotate: -10, transition: { duration: 0.3 } }
  };

  // Ball animation variants
  const ballVariants = {
    moving: { y: [0, -15, 0], transition: { repeat: Infinity, duration: 0.8 } }
  };
// 𝕏 📷 💼 💬
  const socialLinks = [
    { 
      name: "Twitter", 
      icon: <img src="svgs/twitter.png" alt="Twitter" className="w-5 h-5" />, 
      url: "#" 
    },
    { name: "Instagram", icon: <img src="svgs/instagram.png" alt="Instagram" className="w-5 h-5" />, url: "#" },
    { name: "LinkedIn", icon: <img src="svgs/linkedin.png" alt="LinkedIn" className="w-5 h-5" />, url: "#" },
    { name: "Discord", icon: <img src="svgs/discord.png" alt="Discord" className="w-6 h-6" />, url: "#" },
  ];

  const footerLinks = [
    { name: "About", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Code of Conduct", url: "#" },
  ];

  return (
    <footer className="relative bg-[#0e041c] py-16 px-4 border-t border-violet-900/30">
      {/* Football Game Animation */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="relative w-full h-64 overflow-hidden">
          {/* Left player */}
          <motion.div 
            className="absolute bottom-1"
            style={{ left: leftPlayerX }}
            animate={isLeftKicking ? 'kicking' : 'idle'}
            variants={leftKickVariants}
          >
            <img 
              src="svgs/playerLeft.png" 
              alt="Left Player" 
              className="w-48 h-64 mt-[20px]"
            />
          </motion.div>
          
          {/* Right player */}
          <motion.div 
            className="absolute bottom-4 right-12"
            animate={isRightKicking ? 'kicking' : 'idle'}
            variants={rightKickVariants}
          >
            <img 
              src="svgs/playerRight.png" 
              alt="Right Player" 
              className="w-64 h-64"
            />
          </motion.div>
          
          {/* Football */}
          <motion.div 
            className="absolute bottom-8"
            style={{ left: ballPosition }}
            animate="moving"
            variants={ballVariants}
          >
            <img 
              src="svgs/football.png" 
              alt="Football" 
              className="h-12 w-auto"
            />
          </motion.div>
          
          {/* Kick effect */}
          {(isLeftKicking || isRightKicking) && (
            <motion.div 
              className="absolute bottom-10 bg-white rounded-full opacity-70"
              style={{ 
                left: isRightKicking ? rightPlayerX - 40 : leftPlayerX + playerWidth,
                width: 20,
                height: 20
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >
            <img
              src="https://cdn.brandfetch.io/idD1YVU3LM/w/820/h/820/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
              alt="Bolt Logo"
              className="h-12 mb-4"
            />
            <p className="text-white/70 max-w-md text-sm">
              Platform for exciting hackathons, showcase innovative ideas, and
              collaborate with a global community.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-10 h-10 flex items-center justify-center bg-violet-900/30 text-white rounded-full hover:bg-violet-800/50 transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-[50px] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} Hackathon.dev
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
                className="text-white/70 text-sm hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;