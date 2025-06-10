'use client';

import { useState } from 'react';
import IntroLoader from './components/IntroLoader';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {showIntro && (
        <IntroLoader 
          onComplete={handleIntroComplete}
          useBlackAndWhite={false} // ← TOGGLE: true = B&W, false = color
        />
      )}
      
      {!showIntro && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-gray-400">Coming Soon...</p>
          </div>
        </div>
      )}
    </main>
  );
}