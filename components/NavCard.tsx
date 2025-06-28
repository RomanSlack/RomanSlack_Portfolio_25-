'use client';

interface NavCardProps {
  title: string;
  onClick?: () => void;
}

export default function NavCard({ title, onClick }: NavCardProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-lg bg-neutral-800 text-white py-6 text-center hover:bg-neutral-700 transition cursor-pointer"
    >
      <h3 className="font-medium">{title}</h3>
    </div>
  );
}