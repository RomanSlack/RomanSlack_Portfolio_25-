'use client';

interface ContactButtonProps {
  onClick?: () => void;
}

export default function ContactButton({ onClick }: ContactButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-50"
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      Contact
    </button>
  );
}