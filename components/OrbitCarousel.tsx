'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface OrbitCarouselProps {
  iconFolderPath: string;
  speedMs: number;
  sizePx: number;
}

export default function OrbitCarousel({ iconFolderPath, speedMs, sizePx }: OrbitCarouselProps) {
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

  const radius = 320;
  const centerX = 300;
  const centerY = 300;

  return (
    <div className="relative h-[600px] w-[600px]">
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes counterRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .orbit-container {
          animation: rotate ${speedMs}ms linear infinite;
        }
      `}</style>
      
      <div className="orbit-container absolute inset-0">
        {iconPaths.map((iconPath, index) => {
          // Start at top (270 degrees or -90 degrees) and go clockwise
          const angle = -90 + (360 / iconPaths.length) * index;
          const radian = (angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(radian) - sizePx / 2;
          const y = centerY + radius * Math.sin(radian) - sizePx / 2;

          return (
            <div
              key={iconPath}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${sizePx}px`,
                height: `${sizePx}px`,
                animation: `counterRotate ${speedMs}ms linear infinite`,
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