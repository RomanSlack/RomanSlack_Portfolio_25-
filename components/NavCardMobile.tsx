'use client';

interface NavCardMobileProps {
  title: string;
  onClick?: () => void;
  isExpanded?: boolean;
}

export default function NavCardMobile({ title, onClick, isExpanded = false }: NavCardMobileProps) {
  return (
    <div
      onClick={onClick}
      className="w-full h-full bg-neutral-800 text-white p-3 flex items-center justify-center active:bg-neutral-900 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg rounded-md min-h-[44px] relative"
    >
      {/* Circle in center with text - responsive size */}
      <div className="w-24 h-24 rounded-full bg-neutral-700 border-2 border-neutral-600 flex items-center justify-center">
        <h3 className="text-base font-semibold text-center leading-tight px-2">{title}</h3>
      </div>
    </div>
  );
}