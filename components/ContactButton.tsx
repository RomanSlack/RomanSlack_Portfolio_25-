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
          ? 'px-10 py-4 text-lg rounded-xl' 
          : 'px-6 py-3 rounded-lg'
      }`}
      style={{
        left: isExpanded ? '50%' : 'calc(100% - 2rem - 120px)', // 120px is approximate button width
        transform: isExpanded ? 'translateX(-50%)' : 'translateX(0)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        transition: 'all 1000ms ease-in-out'
      }}
    >
      Contact
    </button>
  );
}