'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface OrbitCarouselProps {
  iconFolderPath: string;
  speedMs: number;
  sizePx: number;
  circleOffsetX?: number;
  circleOffsetY?: number;
}

export default function OrbitCarousel({ iconFolderPath, speedMs, sizePx, circleOffsetX = 0, circleOffsetY = 0 }: OrbitCarouselProps) {
  const [iconPaths, setIconPaths] = useState<string[]>([]);
  const [skillsData, setSkillsData] = useState<Record<string, { name: string; years: number }>>({});
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const loadSkillsData = async () => {
      try {
        const response = await fetch('/assets/skills-data.json');
        const data = await response.json();
        setSkillsData(data);
      } catch (error) {
        console.warn('Could not load skills data');
      }
    };

    loadSkillsData();
  }, []);

  const handleMouseEnter = (iconPath: string, event: React.MouseEvent) => {
    const iconNumber = iconPath.split('/').pop()?.replace('.png', '') || '';
    setHoveredIcon(iconNumber);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  const radius = 300;
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
          transition: transform 0.3s ease, filter 0.3s ease;
          cursor: pointer;
        }
        .icon-container:hover {
          transform: scale(1.3);
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6));
          z-index: 10;
        }
      `}</style>
      
      {/* Static background circle - independent positioning */}
      <div 
        className="absolute border-4 border-gray-600 rounded-full"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          left: `${centerX - radius + circleOffsetX}px`,
          top: `${centerY - radius + circleOffsetY}px`,
          opacity: 0.4
        }}
      />
      
      <div className="orbit-container absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
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
              onMouseEnter={(e) => handleMouseEnter(iconPath, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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

      {/* Tooltip */}
      {hoveredIcon && skillsData[hoveredIcon] && (
        <div
          className="fixed z-50 bg-neutral-800 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg border border-neutral-600 pointer-events-none"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y - 50}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="text-center">
            <div className="text-xs text-gray-300">Years of Experience</div>
            <div className="text-lg font-semibold">{skillsData[hoveredIcon].years}</div>
          </div>
        </div>
      )}
    </div>
  );
}