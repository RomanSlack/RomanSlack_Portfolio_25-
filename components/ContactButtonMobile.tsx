'use client';

interface ContactButtonMobileProps {
  onClick?: () => void;
  isExpanded?: boolean;
}

export default function ContactButtonMobile({ onClick, isExpanded = false }: ContactButtonMobileProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-black font-semibold shadow-lg hover:shadow-xl hover:bg-neutral-300 z-50 fixed bottom-8 transition-all duration-200 ease-out ${
        isExpanded 
          ? 'px-10 py-4 text-lg rounded-xl' 
          : 'px-6 py-3 rounded-lg'
      }`}
      style={{
        left: isExpanded ? '50%' : 'calc(100% - 2rem - 120px)', // 120px is approximate button width
        transform: isExpanded ? 'translateX(-50%)' : 'translateX(0)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        transition: 'left 1000ms ease-in-out, transform 1000ms ease-in-out, background-color 200ms ease-out, box-shadow 200ms ease-out'
      }}
    >
      Contact
    </button>
  );
}