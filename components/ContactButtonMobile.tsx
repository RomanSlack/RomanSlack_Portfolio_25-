'use client';

interface ContactButtonMobileProps {
  onClick?: () => void;
  isExpanded?: boolean;
}

export default function ContactButtonMobile({ onClick, isExpanded = false }: ContactButtonMobileProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-black font-semibold shadow-lg active:shadow-xl active:bg-neutral-300 z-50 fixed bottom-8 right-4 px-6 py-4 text-lg rounded-xl transition-all duration-200 ease-out min-h-[44px] min-w-[44px]"
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      Contact
    </button>
  );
}