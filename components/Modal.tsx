'use client';

import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contactButtonAnimated, setContactButtonAnimated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowModal(true);
      // Small delay to ensure DOM is ready, then start animation
      setTimeout(() => {
        setIsAnimating(true);
        // Start contact button animation after modal starts sliding
        setTimeout(() => setContactButtonAnimated(true), 300);
      }, 10);
    } else {
      document.body.style.overflow = 'unset';
      setContactButtonAnimated(false);
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
        className={`relative w-full h-full m-6 bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-700/50 overflow-hidden transform transition-all duration-700 ease-out ${
          isOpen && isAnimating
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0'
        }`}
      >
        {/* Title and Back Button */}
        <div className="flex items-start justify-between p-8 pb-4">
          <h2 className="text-4xl font-bold text-white">
            {title}
          </h2>
          
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors duration-200 group ml-8"
            aria-label="Go back"
          >
            <IoArrowBack className="w-6 h-6 group-hover:transform group-hover:translate-x-1 transition-transform duration-200" />
            <span className="text-lg font-medium">Back</span>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 text-white relative">
          {children || (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-neutral-300 text-lg">
                  Content for {title} will be displayed here.
                </p>
              </div>
            </div>
          )}
          
          {/* Contact Button in Modal with slide animation */}
          <div 
            className={`absolute bottom-8 transition-all duration-1000 ease-out ${
              contactButtonAnimated 
                ? 'right-8 opacity-100' 
                : 'left-1/2 -translate-x-1/2 opacity-70'
            } ${
              isOpen ? '' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => {}}
              className="bg-white text-black font-semibold px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ease-out"
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
    </div>
  );
}