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
      className="aspect-square bg-neutral-700 text-white p-2 flex items-center justify-center active:bg-neutral-900 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg rounded-sm min-h-[44px] relative"
    >
      {/* Circle in center with text */}
      <div className="w-24 h-24 rounded-full bg-neutral-600 border-2 border-neutral-500 flex items-center justify-center">
        <h3 className="text-sm font-semibold text-center leading-tight px-2">{title}</h3>
      </div>
    </div>
  );
}