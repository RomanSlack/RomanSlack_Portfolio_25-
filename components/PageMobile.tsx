'use client';

import Image from 'next/image';
import { IoNewspaperOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import OrbitCarouselMobile from './OrbitCarouselMobile';
import NavCardMobile from './NavCardMobile';
import TypewriterText from './TypewriterText';
import ContactButtonMobile from './ContactButtonMobile';
import ModalMobile from './ModalMobile';
import ContactModalMobile from './ContactModalMobile';
import AboutContent from './card-content/AboutContent';
import ExperienceContent from './card-content/ExperienceContent';
import ProjectsContent from './card-content/ProjectsContent';
import ResearchContent from './card-content/ResearchContent';

export default function PageMobile() {
  const [titles, setTitles] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

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
    const handleOpenContactModal = () => {
      setShowContactModal(true);
    };

    window.addEventListener('openContactModal', handleOpenContactModal);
    
    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal);
    };
  }, []);

  const handleCardClick = (cardTitle: string) => {
    setActiveModal(cardTitle);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleContactModalClose = () => {
    setShowContactModal(false);
  };

  return (
    <div className="h-screen bg-neutral-900 text-white flex flex-col overflow-hidden relative">
      {/* Top Section: Profile Image with Orbit Carousel - moved up */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-8">
        
        {/* Profile Image with Orbit Carousel - positioned behind middle section */}
        <div className="relative z-0 mt-8">
          <div className="relative w-[280px] h-[280px]">
            <Image
              src="/assets/roman.png"
              alt="Roman Slack Portrait"
              width={280}
              height={280}
              className="object-contain mx-auto relative h-[280px] w-[280px]"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <OrbitCarouselMobile
                iconFolderPath="/assets/landing-icons"
                speedMs={90000}
                sizePx={35}
                circleOffsetX={0}
                circleOffsetY={0}
                expandedCircleOffsetX={0}
                expandedCircleOffsetY={0}
                isExpanded={false}
                radius={140}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Title and Social Icons - positioned right under portrait */}
      <div className="absolute z-50" style={{ top: '35%', left: 0, right: 0 }}>
        <div className="bg-neutral-800 px-4 py-4 flex flex-col items-center justify-center">
          {/* Title and Role */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold leading-tight text-white">
              Roman Slack is a,<br />
              {titles.length > 0 && <TypewriterText titles={titles} pauseDuration={5000} delayAfterErase={1500} />}
            </h1>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 items-center justify-center">
            <button
              onClick={() => window.open('https://www.linkedin.com/in/roman-slack-a91a6a266/', '_blank')}
              className="active:scale-95 transition-transform duration-200 p-2 min-h-[44px] min-w-[44px]"
              aria-label="LinkedIn Profile"
            >
              <svg
                className="w-8 h-8 text-white active:text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            
            <button
              onClick={() => window.open('https://github.com/romanslack', '_blank')}
              className="active:scale-95 transition-transform duration-200 p-2 min-h-[44px] min-w-[44px]"
              aria-label="GitHub Profile"
            >
              <svg
                className="w-8 h-8 text-white active:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
            
            <div className="relative group flex items-center">
              <button
                onClick={() => window.open('/assets/resume.pdf', '_blank')}
                className="active:scale-95 transition-transform duration-200 p-2 min-h-[44px] min-w-[44px]"
                aria-label="Resume"
              >
                <IoNewspaperOutline className="w-8 h-8 text-white active:text-orange-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Navigation Cards - taking up bottom half */}
      <div className="absolute bottom-0 left-0 right-0 bg-neutral-700 px-4 py-8 flex flex-col items-center justify-center" style={{ height: '50%' }}>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-4">
          <NavCardMobile title="About Me" onClick={() => handleCardClick("About Me")} isExpanded={true} />
          <NavCardMobile title="Experience" onClick={() => handleCardClick("Experience")} isExpanded={true} />
          <NavCardMobile title="Projects" onClick={() => handleCardClick("Projects")} isExpanded={true} />
          <NavCardMobile title="Research" onClick={() => handleCardClick("Research")} isExpanded={true} />
        </div>
      </div>

      {/* Contact Button - Bottom Center */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleContactClick}
          className="bg-white text-black font-semibold shadow-lg active:shadow-xl active:bg-neutral-300 px-6 py-3 text-base rounded-xl transition-all duration-200 ease-out min-h-[44px] min-w-[44px]"
          style={{
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          Contact
        </button>
      </div>

      {/* Modals */}
      <ModalMobile
        isOpen={activeModal === "About Me"}
        onClose={handleModalClose}
        title="About Me"
        colorSquares={['bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-cyan-500']}
      >
        <AboutContent />
      </ModalMobile>
      <ModalMobile
        isOpen={activeModal === "Experience"}
        onClose={handleModalClose}
        title="Experience"
        colorSquares={['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500']}
      >
        <ExperienceContent />
      </ModalMobile>
      <ModalMobile
        isOpen={activeModal === "Projects"}
        onClose={handleModalClose}
        title="Projects"
        colorSquares={['bg-emerald-500', 'bg-teal-500', 'bg-sky-500', 'bg-violet-500']}
      >
        <ProjectsContent />
      </ModalMobile>
      <ModalMobile
        isOpen={activeModal === "Research"}
        onClose={handleModalClose}
        title="Research"
        colorSquares={['bg-red-500', 'bg-amber-500', 'bg-lime-500', 'bg-rose-500']}
      >
        <ResearchContent />
      </ModalMobile>

      {/* Contact Modal */}
      <ContactModalMobile
        isOpen={showContactModal}
        onClose={handleContactModalClose}
      />
    </div>
  );
}