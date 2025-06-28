'use client';

interface NavCardProps {
  title: string;
  onClick?: () => void;
}

export default function NavCard({ title, onClick }: NavCardProps) {
  return (
    <div
      onClick={onClick}
      className="h-full bg-neutral-800 text-white px-6 py-8 flex flex-col justify-start items-center hover:bg-neutral-900 hover:shadow-2xl transition-all duration-300 cursor-pointer shadow-lg rounded-t-xl"
    >
      <h3 className="text-xl font-semibold text-center">{title}</h3>
    </div>
  );
}