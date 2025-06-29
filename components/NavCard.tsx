'use client';

interface NavCardProps {
  title: string;
  onClick?: () => void;
  isExpanded?: boolean;
}

export default function NavCard({ title, onClick, isExpanded = false }: NavCardProps) {
  return (
    <div
      onClick={onClick}
      className={`h-full bg-neutral-800 text-white px-6 py-8 flex flex-col items-center hover:bg-neutral-900 hover:shadow-2xl transition-all duration-1000 cursor-pointer shadow-lg ${
        isExpanded ? 'justify-center rounded-xl' : 'justify-start rounded-t-xl'
      }`}
    >
      <div 
        className={`flex items-center justify-center transition-all duration-1000 ease-in-out ${
          isExpanded 
            ? 'w-32 h-32 rounded-full bg-neutral-700 border-2 border-neutral-600 opacity-100' 
            : 'w-auto h-auto opacity-0'
        }`}
        style={{
          backgroundColor: isExpanded ? 'rgb(64 64 64)' : 'transparent',
          border: isExpanded ? '2px solid rgb(82 82 82)' : 'none'
        }}
      >
        <h3 className={`text-xl font-semibold text-center transition-all duration-1000 ease-in-out ${
          isExpanded ? 'transform translate-y-0' : 'transform -translate-y-4'
        }`}>{title}</h3>
      </div>
    </div>
  );
}