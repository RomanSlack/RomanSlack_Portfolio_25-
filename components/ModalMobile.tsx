'use client';

import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

interface ModalMobileProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  colorSquares?: string[];
}

export default function ModalMobile({ isOpen, onClose, title, children, colorSquares = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'] }: ModalMobileProps) {
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

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex transition items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal container with slide-up and slide-down animations */}
      <div 
        className={`relative w-full h-full mx-4 my-4 mt-8 bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700/50 transform transition-all duration-700 ease-out flex flex-col ${
          isOpen && isAnimating
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0'
        }`}
      >
        {/* Back Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white active:text-neutral-300 transition-colors duration-200 group p-2 min-h-[44px] min-w-[44px]"
            aria-label="Go back"
          >
            <IoArrowBack className="w-6 h-6 group-active:transform group-active:translate-x-1 transition-transform duration-200" />
            <span className="text-lg font-medium">Back</span>
          </button>
        </div>

        {/* Title and Color Squares */}
        <div className="pt-16 px-6 pb-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="flex gap-2">
            {colorSquares.map((color, index) => (
              <div key={index} className={`w-3 h-3 ${color} rounded-sm`}></div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 px-6 pb-20 text-white overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#525252 #262626',
          height: '0'
        }}>
          {children || (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-neutral-300 text-base">
                  Content for {title} will be displayed here.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Contact Button in Modal with fade-in animation */}
        <div 
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-700 ease-out ${
            isOpen && isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => {
              // This will be handled by parent component
              const event = new CustomEvent('openContactModal');
              window.dispatchEvent(event);
            }}
            className="bg-white text-black font-semibold px-6 py-3 text-base rounded-xl shadow-lg active:shadow-xl active:bg-gray-100 transition-all duration-200 ease-out min-h-[44px] min-w-[44px]"
            style={{
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}