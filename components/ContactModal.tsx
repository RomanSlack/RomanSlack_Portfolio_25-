'use client';

import { useEffect, useState } from 'react';
import { IoArrowBack, IoNewspaperOutline } from 'react-icons/io5';
import { CgMail } from 'react-icons/cg';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowModal(true);
      // Small delay to ensure DOM is ready, then start animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
      // Keep modal visible during close animation
      setTimeout(() => {
        setShowModal(false);
      }, 700);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const contactItems = [
    {
      name: 'LinkedIn',
      icon: (
        <svg
          className="w-24 h-24 text-white group-hover:text-blue-400 transition-colors duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://www.linkedin.com/in/roman-slack-a91a6a266/'
    },
    {
      name: 'GitHub',
      icon: (
        <svg
          className="w-24 h-24 text-white group-hover:text-gray-400 transition-colors duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/romanslack'
    },
    {
      name: 'Email',
      icon: <CgMail className="w-24 h-24 text-white group-hover:text-green-400 transition-colors duration-200" />,
      url: 'mailto:romanslack1@gmail.com'
    },
    {
      name: 'Resume',
      icon: <IoNewspaperOutline className="w-24 h-24 text-white group-hover:text-orange-400 transition-colors duration-200" />,
      url: '/assets/resume.pdf'
    }
  ];

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal container with slide-up and slide-down animations */}
      <div 
        className={`relative w-full h-full mx-6 my-6 mt-16 bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-700/50 overflow-hidden transform transition-all duration-700 ease-out ${
          isOpen && isAnimating
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0'
        }`}
      >
        {/* Back Button */}
        <div className="absolute top-8 right-8 z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors duration-200 group"
            aria-label="Go back"
          >
            <IoArrowBack className="w-6 h-6 group-hover:transform group-hover:translate-x-1 transition-transform duration-200" />
            <span className="text-lg font-medium">Back</span>
          </button>
        </div>

        {/* Centered Title */}
        <div className="flex items-center justify-center pt-16 pb-8">
          <h2 className="text-7xl font-bold text-white text-center">
            Contact Me Here
          </h2>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 text-white">
          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-4 gap-16 w-full max-w-6xl">
              {contactItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
                    onClick={() => window.open(item.url, '_blank')}
                    className="group flex flex-col items-center gap-6 p-8 rounded-2xl hover:bg-neutral-700/50 transition-all duration-200"
                  >
                    <div className="w-48 h-48 rounded-full bg-neutral-700 border-2 border-neutral-600 flex items-center justify-center group-hover:border-neutral-500 transition-colors duration-200">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-neutral-300 transition-colors duration-200">
                      {item.name}
                    </h3>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}