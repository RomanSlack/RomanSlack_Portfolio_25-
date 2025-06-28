'use client';

import Image from 'next/image';
import { IoNewspaperOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import OrbitCarousel from '../components/OrbitCarousel';
import NavCard from '../components/NavCard';
import TypewriterText from '../components/TypewriterText';
import ContactButton from '../components/ContactButton';

export default function HomePage() {
  const [titles, setTitles] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadTitles = async () => {
      try {
        const response = await fetch('/assets/titles.json');
        const data = await response.json();
        setTitles(data);
      } catch (error) {
        console.warn('Could not load titles, using fallback');
        setTitles(['AI Researcher']);
      }
    };

    loadTitles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !isExpanded) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  const handleTransition = () => {
    setIsExpanded(true);
  };

  return (
    <div className="h-screen bg-neutral-900 text-white flex flex-col overflow-hidden">
      {/* Header Section */}
      <div 
        className={`transition-all duration-1000 ease-in-out ${
          isExpanded 
            ? 'h-1/3' 
            : 'h-2/3'
        }`}
      >
        <div 
          className={`container mx-auto px-8 h-full transition-all duration-1000 ease-in-out ${
            isExpanded ? 'py-8' : 'py-0'
          }`}
        >
          <div 
            className={`flex flex-row h-full transition-all duration-1000 ease-in-out origin-center ${
              isExpanded ? 'scale-75' : 'scale-100'
            }`}
          >
            <div className="w-3/5 flex flex-col justify-center pr-16 pl-4">
              <h1 className="text-7xl font-semibold leading-tight text-white mb-8 max-w-4xl">
                Roman Slack is a,<br />
                {titles.length > 0 && <TypewriterText titles={titles} pauseDuration={5000} delayAfterErase={1500} />}
              </h1>
              
              <div className="flex gap-4 mb-8">
                <button
                  className="hover:scale-110 transition-transform duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <svg
                    className="w-12 h-12 text-white hover:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                
                <button
                  className="hover:scale-110 transition-transform duration-200"
                  aria-label="GitHub Profile"
                >
                  <svg
                    className="w-12 h-12 text-white hover:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
                
                <button
                  className="hover:scale-110 transition-transform duration-200"
                  aria-label="Research Papers"
                >
                  <IoNewspaperOutline className="w-12 h-12 text-white hover:text-orange-400" />
                </button>
              </div>
            </div>
            
            <div className="w-2/5 flex flex-col items-center justify-end relative pl-8 pb-0">
              <div className="relative mb-0">
                <Image
                  src="/assets/roman.png"
                  alt="Roman Slack Portrait"
                  width={500}
                  height={500}
                  className="h-[500px] w-[500px] object-contain mx-auto z-10 relative"
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <OrbitCarousel
                    iconFolderPath="/assets/landing-icons"
                    speedMs={90000}
                    sizePx={60}
                    circleOffsetX={-45}
                    circleOffsetY={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        {/* Cards Section */}
        <div 
          className={`transition-all duration-1000 ease-in-out bg-neutral-700 z-20 flex-1 ${
            isExpanded 
              ? '' 
              : ''
          }`}
        >
          <div 
            className={`container mx-auto px-8 h-full flex flex-col relative transition-all duration-1000 ease-in-out ${
              isExpanded ? 'justify-center py-16' : 'justify-start pt-8 pb-4'
            }`}
          >
            <div 
              className={`grid gap-8 w-full mx-auto transition-all duration-1000 ease-in-out ${
                isExpanded 
                  ? 'grid-cols-4 max-w-full h-96' 
                  : 'grid-cols-4 max-w-5xl h-64'
              }`}
            >
              <NavCard title="About Me" onClick={handleTransition} isExpanded={isExpanded} />
              <NavCard title="Experience" onClick={handleTransition} isExpanded={isExpanded} />
              <NavCard title="Projects" onClick={handleTransition} isExpanded={isExpanded} />
              <NavCard title="Research" onClick={handleTransition} isExpanded={isExpanded} />
            </div>
            
            {!isExpanded && (
              <div className="flex justify-center mt-4">
                <button 
                  onClick={handleTransition}
                  className="animate-bounce h-8 w-8 text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      
        <ContactButton 
          onClick={() => {}} 
          isExpanded={isExpanded}
        />
      </div>
    );
  }