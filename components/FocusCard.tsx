'use client';

interface FocusCardProps {
  title: string;
  onClick?: () => void;
}

export default function FocusCard({ title, onClick }: FocusCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-[140px] h-[200px] md:w-[180px] md:h-[250px] rounded-xl backdrop-blur-md bg-white/10 border border-white/10 shadow-inner flex items-center justify-center text-lg font-medium text-white hover:scale-105 hover:bg-white/20 transition duration-300 cursor-pointer"
    >
      {title}
    </div>
  );
}