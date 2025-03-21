import { useEffect, useRef } from 'react';

function SnowyBackground() {
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

    // Snowflake class
    class Snowflake {
      x: number;
      y: number;
      size: number;
      speed: number;
      wind: number;
      opacity: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 4 + 2;
        this.speed = Math.random() * 2 + 1;
        this.wind = Math.random() * 1.2 - 0.6;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.y += this.speed;
        this.x += this.wind;
        
        // Reset position when snowflake reaches bottom
        if (this.y > this.canvasHeight) {
          this.y = -this.size;
          this.x = Math.random() * this.canvasWidth;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Draw snowflake
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create snowflakes
    const snowflakes: Snowflake[] = Array.from({ length: 200 }, () => new Snowflake(canvas.width, canvas.height));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw snowflakes
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default SnowyBackground; 