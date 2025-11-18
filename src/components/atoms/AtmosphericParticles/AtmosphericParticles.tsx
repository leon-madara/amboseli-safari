'use client';

import { useEffect, useRef } from 'react';
import styles from './AtmosphericParticles.module.css';

export interface AtmosphericParticlesProps {
  type: 'dust' | 'fireflies' | 'stars';
  density?: number; // 1-100, default 30
  speed?: number; // 1-10, default 5
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed?: number;
  twinklePhase?: number;
}

export default function AtmosphericParticles({
  type,
  density = 30,
  speed = 5,
  className = '',
}: AtmosphericParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Detect mobile viewport for performance optimization
    const isMobile = window.innerWidth < 768;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      // Reduce particle count to 50% on mobile devices for better performance
      const mobileMultiplier = isMobile ? 0.5 : 1.0;
      const adjustedDensity = Math.floor(density * mobileMultiplier);
      const particleCount = Math.min(adjustedDensity, 50); // Max 50 particles
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const createParticle = (): Particle => {
      const baseSpeed = speed / 10;

      switch (type) {
        case 'stars':
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: 0,
            speedY: 0,
            opacity: Math.random() * 0.5 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinklePhase: Math.random() * Math.PI * 2,
          };

        case 'fireflies':
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 2,
            speedX: (Math.random() - 0.5) * baseSpeed * 0.5,
            speedY: (Math.random() - 0.5) * baseSpeed * 0.5,
            opacity: Math.random() * 0.6 + 0.4,
            twinkleSpeed: Math.random() * 0.05 + 0.02,
            twinklePhase: Math.random() * Math.PI * 2,
          };

        case 'dust':
        default:
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * baseSpeed,
            speedY: Math.random() * baseSpeed * 0.5,
            opacity: Math.random() * 0.3 + 0.1,
          };
      }
    };

    const updateParticle = (particle: Particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Update twinkle effect for stars and fireflies
      if (particle.twinkleSpeed && particle.twinklePhase !== undefined) {
        particle.twinklePhase += particle.twinkleSpeed;
        particle.opacity = Math.abs(Math.sin(particle.twinklePhase)) * 0.5 + 0.3;
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      if (type === 'stars') {
        // Draw star with glow
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'fireflies') {
        // Draw firefly with yellow glow
        ctx.fillStyle = '#ffeb3b';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffeb3b';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw dust particle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    // Start animation
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [type, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      aria-hidden="true"
    />
  );
}
