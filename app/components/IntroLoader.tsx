'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  alpha: number;
  color: [number, number, number];
  size: number;
  fadeRate: number;
  delay: number;
  number: number;
}

const LANDSCAPE_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1445262102387-5fbb30a5e59d?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80'
];

interface IntroLoaderProps {
  onComplete: () => void;
  useBlackAndWhite?: boolean; // ← ADD THIS: Toggle for B&W mode
}

export default function IntroLoader({ onComplete, useBlackAndWhite = true }: IntroLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [textFadeStart, setTextFadeStart] = useState(false);
  const [backgroundFadeStart, setBackgroundFadeStart] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    try {
      const randomIndex = Math.floor(Math.random() * LANDSCAPE_IMAGES.length);
      setSelectedImage(LANDSCAPE_IMAGES[randomIndex]);
    } catch (error) {
      console.warn('Image selection error:', error);
      setSelectedImage(LANDSCAPE_IMAGES[0]);
    }
  }, []);

  const renderStaticParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    try {
      // Clear canvas - transparent to show background image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Draw all particles at full opacity initially
      for (const particle of particles) {
        if (!particle) continue;
        
        const x = Math.floor(particle.x);
        const y = Math.floor(particle.y);
        
        ctx.save();
        
        // Glass effect with gradient
        const gradient = ctx.createLinearGradient(x, y, x + particle.size, y + particle.size);
        gradient.addColorStop(0, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 0.1})`);
        
        // Draw main glass square
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, particle.size, particle.size);
        
        // Add glass highlight
        ctx.globalAlpha = particle.alpha * 0.6;
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha * 0.3})`;
        ctx.fillRect(x + particle.size * 0.1, y + particle.size * 0.1, particle.size * 0.3, particle.size * 0.3);
        
        // Draw number in center of square
        ctx.globalAlpha = particle.alpha * 0.9;
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha * 0.8})`;
        ctx.font = `${particle.size * 0.6}px "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.number.toString(), x + particle.size/2, y + particle.size/2);
        
        ctx.restore();
      }
    } catch (error) {
      console.warn('Static render error:', error);
    }
  }, []);

  const createParticlesFromImage = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const img = imageRef.current;
    if (!img || !canvas || !ctx) return;

    try {
      // Draw the full image to canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const particles: Particle[] = [];
      
      const step = window.innerWidth > 1920 ? 10 : window.innerWidth > 1024 ? 8 : 6;
      
      // Sample the entire image area - ensure full coverage
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          
          // Make sure we're within bounds
          if (index >= 0 && index < imageData.data.length - 3) {
            const r = imageData.data[index] || 0;
            const g = imageData.data[index + 1] || 0;
            const b = imageData.data[index + 2] || 0;
            const a = imageData.data[index + 3] || 0;
            
            // Create particles with more filtering to reduce count
            if (a > 50 && Math.random() > 0.5) {
              // ← BLACK & WHITE TOGGLE: Convert to grayscale if enabled
              let finalColor: [number, number, number];
              if (useBlackAndWhite) {
                const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
                finalColor = [gray, gray, gray];
              } else {
                finalColor = [r, g, b];
              }
              
              particles.push({
                x: x,
                y: y,
                alpha: Math.min((a / 255) * 0.9, 1),
                color: finalColor,
                size: Math.random() * 5 + 5,
                fadeRate: 0.010 + Math.random() * 0.022,
                delay: 0, // No delay needed for wave effect
                number: Math.floor(Math.random() * 10)
              });
            }
          }
        }
      }
      
      console.log(`Created ${particles.length} particles`);
      particlesRef.current = particles;
      
      // Render particles immediately (static)
      renderStaticParticles();
    } catch (error) {
      console.error('Error creating particles:', error);
    }
  }, [renderStaticParticles]);

  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) {
      console.warn('Canvas or context not available');
      return;
    }
    
    try {
      // Clear canvas - transparent to show background image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      const currentTime = Date.now();
      
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - startTimeRef.current;
      
      if (!particles || particles.length === 0) {
        if (!textFadeStart) {
          setTextFadeStart(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
        }
        return;
      }
      
      let visibleParticles = 0;
      
      // Wave parameters - optimized calculations
      const animationDuration = 1500;
      const waveWidth = canvas.width * 0.25; // Slightly narrower wave
      const progress = Math.min(elapsed / animationDuration, 1);
      const waveCenter = progress * (canvas.width + waveWidth) - waveWidth * 0.5;
      
      // Batch canvas operations
      const particlesToDraw: {x: number, y: number, alpha: number, color: [number, number, number], size: number, number: number}[] = [];
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (!particle) continue;
        
        // Simplified noise calculation (less expensive)
        const noiseOffset = Math.sin(particle.y * 0.01 + particle.x * 0.008) * 40;
        
        // Calculate fade based on wave position
        if (particle.x < waveCenter + noiseOffset) {
          particle.alpha = Math.max(0, particle.alpha - 0.08); // Faster fade
        }
        
        // Remove completely faded particles
        if (particle.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }
        
        visibleParticles++;
        particlesToDraw.push({
          x: Math.floor(particle.x),
          y: Math.floor(particle.y),
          alpha: particle.alpha,
          color: particle.color,
          size: particle.size,
          number: particle.number
        });
      }
      
      // Batch draw all particles as glass squares with numbers
      for (const p of particlesToDraw) {
        // Glass effect with gradient and transparency
        const gradient = ctx.createLinearGradient(p.x, p.y, p.x + p.size, p.y + p.size);
        gradient.addColorStop(0, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha * 0.1})`);
        
        // Draw main glass square
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        // Add glass highlight
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.3})`;
        ctx.fillRect(p.x + p.size * 0.1, p.y + p.size * 0.1, p.size * 0.3, p.size * 0.3);
        
        // Draw number in center of square
        ctx.globalAlpha = p.alpha * 0.9;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
        ctx.font = `${p.size * 0.6}px "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.number.toString(), p.x + p.size/2, p.y + p.size/2);
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1;
      
      // Start text fade only after wave is completely done and particles are mostly gone
      if (progress >= 1 && visibleParticles < 50 && !textFadeStart) {
        setTextFadeStart(true);
      }
      
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    } catch (error) {
      console.warn('Animation error:', error);
      if (onComplete) onComplete();
    }
  }, [onComplete, textFadeStart]);

  const handleImageLoad = useCallback(() => {
    try {
      if (!imageRef.current) return;
      
      setImageLoaded(true);
      
      // Fade background first, then text
      setTimeout(() => {
        setBackgroundFadeStart(true);
        setTimeout(() => {
          setTextFadeStart(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 2000);
        }, 2000);
      }, 3000);
    } catch (error) {
      console.warn('Image load error:', error);
    }
  }, [createParticlesFromImage, animateParticles]);

  useEffect(() => {
    const handleResize = () => {
      try {
        const canvas = canvasRef.current;
        if (canvas && window.innerWidth && window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      } catch (error) {
        console.warn('Resize error:', error);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      try {
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      } catch (error) {
        console.warn('Cleanup error:', error);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Black & White Background Image */}
      <div className="absolute inset-0">
        {selectedImage && (
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Landscape"
            className={`w-full h-full object-cover transition-opacity duration-[2000ms] ${
              imageLoaded && !backgroundFadeStart ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'grayscale(100%) contrast(1.2) brightness(0.7)',
            }}
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
          />
        )}
        
        
        {/* Text with Original Image Background - stays until end */}
        {imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              {/* Main text with original image as background */}
              <h1 
                className={`relative text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-[0.15em] select-none transition-all duration-[2000ms] ${
                  textFadeStart ? 'opacity-0 transform translate-y-2' : 'opacity-100'
                }`}
                style={{
                  fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  background: `url(${selectedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'contrast(1.3) saturate(1.2)',
                }}
              >
                ROMAN SLACK
              </h1>
              
              {/* Subtle white outline for definition */}
              <h1 
                className={`absolute top-0 left-0 text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-[0.15em] select-none transition-all duration-[2000ms] ${
                  textFadeStart ? 'opacity-0 transform translate-y-2' : 'opacity-100'
                }`}
                style={{
                  fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                  zIndex: -1
                }}
              >
                ROMAN SLACK
              </h1>
            </div>
          </div>
        )}
      </div>
      
      
    </div>
  );
}