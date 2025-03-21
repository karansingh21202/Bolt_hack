import { useEffect, useRef } from 'react';

function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Planet class
    class Planet {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      glowSize: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 20;
        this.speed = Math.random() * 0.2 + 0.1;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        this.glowSize = this.size * 1.5;
      }

      update() {
        this.x += this.speed;
        if (this.x > canvas.width) {
          this.x = -this.size;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.glowSize
        );
        gradient.addColorStop(0, `${this.color}40`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw planet
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Rocket class
    class Rocket {
      x: number;
      y: number;
      speed: number;
      angle: number;
      size: number;
      trail: { x: number; y: number }[];

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.size = 20;
        this.trail = [];
      }

      update() {
        // Update trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 20) this.trail.shift();

        // Update position
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;

        // Draw trail
        this.trail.forEach((point, index) => {
          const alpha = index / this.trail.length;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.fill();
        });

        // Draw rocket
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Draw rocket body
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.lineTo(-this.size, -this.size/2);
        ctx.lineTo(-this.size, this.size/2);
        ctx.closePath();
        ctx.fillStyle = '#FFD700';
        ctx.fill();

        // Draw headlight effect
        const gradient = ctx.createRadialGradient(
          this.size, 0, 0,
          this.size, 0, this.size * 2
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(this.size, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
      }
    }

    // Create planets and rockets
    const planets: Planet[] = Array.from({ length: 5 }, () => new Planet());
    const rockets: Rocket[] = Array.from({ length: 3 }, () => new Rocket());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw planets
      planets.forEach(planet => {
        planet.update();
        planet.draw();
      });

      // Update and draw rockets
      rockets.forEach(rocket => {
        rocket.update();
        rocket.draw();
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default SpaceBackground; 