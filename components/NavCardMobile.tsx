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
      className="h-20 bg-neutral-800 text-white px-4 py-4 flex items-center justify-center active:bg-neutral-900 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg rounded-xl min-h-[44px] relative"
    >
      {/* Circle in center with text */}
      <div className="w-12 h-12 rounded-full bg-neutral-700 border-2 border-neutral-600 flex items-center justify-center">
        <h3 className="text-xs font-semibold text-center leading-tight">{title}</h3>
      </div>
    </div>
  );
}