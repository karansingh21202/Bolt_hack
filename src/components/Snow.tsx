import { canvas } from 'framer-motion/client';
import React, { useEffect, useRef } from 'react';

const Snow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Snowflake class
    class Snowflake {
      x: number = 0;
      y: number = 0;
      size: number;
      angle: number;
      orbitRadius: number;
      orbitSpeed: number;
      private canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.angle = Math.random() * Math.PI * 2; // Random starting angle
        // Increased orbit radius to cover the whole screen
        const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;
        this.orbitRadius = Math.random() * maxRadius + maxRadius * 0.2; // Random orbit radius between 20% and 100% of screen size
        this.orbitSpeed = (Math.random() * 0.01) + 0.002; // Slower orbit speed for smoother movement
        this.size = Math.random() * 4 + 2; // Slightly larger snowflakes
        this.updatePosition();
      }

      updatePosition() {
        // Calculate position based on orbital motion
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.x = centerX + Math.cos(this.angle) * this.orbitRadius;
        this.y = centerY + Math.sin(this.angle) * this.orbitRadius;
      }

      update() {
        this.angle += this.orbitSpeed;
        this.updatePosition();
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }
    }

    // Create more snowflakes to cover the whole screen
    const snowflakes: Snowflake[] = Array.from({ length: 100 }, () => new Snowflake(canvas));

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default Snow; 