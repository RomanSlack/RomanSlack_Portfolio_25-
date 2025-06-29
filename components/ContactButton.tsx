'use client';

interface ContactButtonProps {
  onClick?: () => void;
  isExpanded?: boolean;
}

export default function ContactButton({ onClick, isExpanded = false }: ContactButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-black font-semibold shadow-lg hover:shadow-xl hover:scale-105 z-50 fixed bottom-8 transition-all duration-1000 ease-in-out ${
        isExpanded 
          ? 'left-1/2 -translate-x-1/2 px-10 py-4 text-lg rounded-xl' 
          : 'right-8 translate-x-0 px-6 py-3 rounded-lg'
      }`}
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      Contact
    </button>
  );
}