'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface OrbitCarouselProps {
  iconFolderPath: string;
  speedMs: number;
  sizePx: number;
  offsetX?: number;
}

export default function OrbitCarousel({ iconFolderPath, speedMs, sizePx, offsetX = 0 }: OrbitCarouselProps) {
  const [iconPaths, setIconPaths] = useState<string[]>([]);

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const iconFiles = [];
        let index = 1;
        
        while (index <= 20) {
          try {
            const iconPath = `${iconFolderPath}/${index}.png`;
            const response = await fetch(iconPath, { method: 'HEAD' });
            if (response.ok) {
              iconFiles.push(iconPath);
            } else {
              break;
            }
          } catch {
            break;
          }
          index++;
        }
        
        setIconPaths(iconFiles);
      } catch (error) {
        console.warn('Could not load icons from:', iconFolderPath);
      }
    };

    loadIcons();
  }, [iconFolderPath]);

  const radius = 340;
  const centerX = 300;
  const centerY = 300;

  return (
    <div className="relative h-[600px] w-[600px]">
      <style jsx>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        @keyframes counterRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .orbit-container {
          animation: rotate ${speedMs}ms linear infinite;
          transform-origin: center center;
        }
        .icon-container {
          animation: counterRotate ${speedMs}ms linear infinite;
          transform-origin: center center;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          transition: transform 0.2s ease;
        }
        .icon-container:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
        }
      `}</style>
      
      {/* Static orbit path circle outline */}
      <div 
        className="absolute border-4 border-gray-600 rounded-full"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          left: `${centerX - radius + offsetX}px`,
          top: `${centerY - radius}px`,
          opacity: 0.4
        }}
      />
      
      <div className="orbit-container absolute" style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${offsetX}px), -50%)` }}>
        {iconPaths.map((iconPath, index) => {
          // Start at top (270 degrees or -90 degrees) and go clockwise
          const angle = -90 + (360 / iconPaths.length) * index;
          const radian = (angle * Math.PI) / 180;
          const x = radius * Math.cos(radian) - sizePx / 2;
          const y = radius * Math.sin(radian) - sizePx / 2;

          return (
            <div
              key={iconPath}
              className="absolute icon-container"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${sizePx}px`,
                height: `${sizePx}px`,
              }}
            >
              <Image
                src={iconPath}
                alt={`Skill icon ${index + 1}`}
                width={sizePx}
                height={sizePx}
                className="object-contain w-full h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}