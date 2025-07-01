'use client';

import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  colorSquares?: string[];
}

export default function Modal({ isOpen, onClose, title, children, colorSquares = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'] }: ModalProps) {
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
        className={`relative w-full h-full mx-6 my-6 mt-16 bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-700/50 transform transition-all duration-700 ease-out flex flex-col ${
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

        {/* Title and Color Squares */}
        <div className="pt-12 px-32 pb-6">
          <h2 className="text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="flex gap-3">
            {colorSquares.map((color, index) => (
              <div key={index} className={`w-4 h-4 ${color} rounded-sm`}></div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 px-32 pb-8 text-white overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#525252 #262626',
          height: '0'
        }}>
          {children || (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-neutral-300 text-lg">
                  Content for {title} will be displayed here.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Contact Button in Modal with fade-in animation */}
        <div 
          className={`absolute bottom-8 right-8 transition-opacity duration-700 ease-out ${
            isOpen && isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => {
              // This will be handled by parent component
              const event = new CustomEvent('openContactModal');
              window.dispatchEvent(event);
            }}
            className="bg-white text-black font-semibold px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-200 ease-out"
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