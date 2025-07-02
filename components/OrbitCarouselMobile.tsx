'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface OrbitCarouselMobileProps {
  iconFolderPath: string;
  speedMs: number;
  sizePx: number;
  circleOffsetX?: number;
  circleOffsetY?: number;
  expandedCircleOffsetX?: number;
  expandedCircleOffsetY?: number;
  radius?: number;
  isExpanded?: boolean;
}

export default function OrbitCarouselMobile({ iconFolderPath, speedMs, sizePx, circleOffsetX = 0, circleOffsetY = 0, expandedCircleOffsetX = 0, expandedCircleOffsetY = 0, radius, isExpanded = false }: OrbitCarouselMobileProps) {
  const [iconPaths, setIconPaths] = useState<string[]>([]);
  const [skillsData, setSkillsData] = useState<Record<string, { name: string; years: number }>>({});
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    
    const rect = wrapperRef.current!.getBoundingClientRect();
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = wrapperRef.current!.getBoundingClientRect();
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  const carouselRadius = radius || (isExpanded ? 125 : 150);
  const centerX = 200;
  const centerY = 200;
  const currentCircleOffsetX = isExpanded ? expandedCircleOffsetX : circleOffsetX;
  const currentCircleOffsetY = isExpanded ? expandedCircleOffsetY : circleOffsetY;

  return (
    <div ref={wrapperRef} className="relative h-[400px] w-[400px]">
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
          transition: transform 0.3s ease, filter 0.3s ease, left 1s ease-in-out, top 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out;
          cursor: pointer;
        }
        .icon-container:active {
          transform: scale(1.2);
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6));
          z-index: 10;
        }
      `}</style>
      
      {/* Static background circle - independent positioning */}
      <div 
        className="absolute border-4 border-gray-600 rounded-full transition-all duration-1000 ease-in-out"
        style={{
          width: `${carouselRadius * 2}px`,
          height: `${carouselRadius * 2}px`,

          top: `${centerY - carouselRadius + currentCircleOffsetY}px`,
          opacity: 0.4
        }}
      />
      
      <div className="orbit-container absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {iconPaths.map((iconPath, index) => {
          // Start at top (270 degrees or -90 degrees) and go clockwise
          const angle = -90 + (360 / iconPaths.length) * index;
          const radian = (angle * Math.PI) / 180;
          const x = carouselRadius * Math.cos(radian) - sizePx / 2;
          const y = carouselRadius * Math.sin(radian) - sizePx / 2;

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
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const rect = wrapperRef.current!.getBoundingClientRect();
                const iconNumber = iconPath.split('/').pop()?.replace('.png', '') || '';
                setHoveredIcon(iconNumber);
                setTooltipPosition({
                  x: touch.clientX - rect.left,
                  y: touch.clientY - rect.top
                });
              }}
              onTouchEnd={() => setHoveredIcon(null)}
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
          className="absolute z-50 bg-neutral-800 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg border border-neutral-600 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, 10px)',
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