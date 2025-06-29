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
      className={`h-full bg-neutral-800 text-white px-6 py-8 flex items-center justify-center hover:bg-neutral-900 hover:shadow-2xl hover:scale-100 transition-all duration-200 cursor-pointer shadow-lg relative ${
        isExpanded ? 'rounded-xl' : 'rounded-t-xl'
      }`}
    >
      {/* Landing mode text - visible in landing, fades out during transition */}
      <h3 className={`text-xl font-semibold text-center transition-opacity duration-500 ease-in-out absolute ${
        isExpanded ? 'opacity-0' : 'opacity-100'
      }`}>{title}</h3>
      
      {/* Expanded mode circle with text - appears after text fades */}
      <div 
        className={`flex items-center justify-center transition-all duration-1000 ease-in-out ${
          isExpanded 
            ? 'w-32 h-32 rounded-full bg-neutral-700 border-2 border-neutral-600 opacity-100' 
            : 'w-0 h-0 opacity-0'
        }`}
        style={{
          backgroundColor: isExpanded ? 'rgb(64 64 64)' : 'transparent',
          border: isExpanded ? '2px solid rgb(82 82 82)' : 'none',
          transitionDelay: isExpanded ? '300ms' : '0ms'
        }}
      >
        <h3 className={`text-xl font-semibold text-center transition-opacity duration-2000 ease-in-out ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{
          transitionDelay: isExpanded ? '800ms' : '0ms'
        }}>{title}</h3>
      </div>
    </div>
  );
}