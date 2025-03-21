import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Background() {
  const starsRef = useRef<HTMLDivElement>(null);

  // Generate random stars
  useEffect(() => {
    if (!starsRef.current) return;

    // Clear any existing stars
    starsRef.current.innerHTML = '';

    // Create stars
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.8 + 0.2}`;

      starsRef.current.appendChild(star);
    }

    // Animate stars with GSAP
    const stars = starsRef.current.querySelectorAll('.star');
    stars.forEach((star) => {
      gsap.to(star, {
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  return (
    <>
      <div className="grid-background"></div>
      <div ref={starsRef} className="stars"></div>
    </>
  );
}

export default Background;
