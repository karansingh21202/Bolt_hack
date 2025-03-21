import React from 'react';
import { motion } from 'framer-motion';

const AnimatedStars = () => {
  // Generate stars with different sizes and paths
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // Random size between 1-4px
    duration: Math.random() * 10 + 15, // Random duration between 15-25s
    delay: Math.random() * 5, // Random delay between 0-5s
    path: Math.random() > 0.7 ? 'elliptical' : 'linear', // 30% chance of elliptical path
    x: Math.random() * 100, // Random starting position
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: 0.6,
          }}
          animate={
            star.path === 'elliptical'
              ? {
                  x: [
                    '0%',
                    '20%',
                    '40%',
                    '60%',
                    '80%',
                    '100%',
                    '80%',
                    '60%',
                    '40%',
                    '20%',
                    '0%',
                  ],
                  y: [
                    '0%',
                    '30%',
                    '50%',
                    '30%',
                    '0%',
                    '-30%',
                    '-50%',
                    '-30%',
                    '0%',
                    '30%',
                    '0%',
                  ],
                }
              : {
                  x: ['0%', '100%', '0%'],
                  y: ['0%', '50%', '0%'],
                }
          }
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedStars; 