'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  titles: string[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  pauseDuration?: number;
}

export default function TypewriterText({ 
  titles, 
  typingSpeed = 100, 
  backspaceSpeed = 50, 
  pauseDuration = 2000 
}: TypewriterTextProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (titles.length === 0) return;

    const currentTitle = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing forward
      if (currentText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentTitle.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause then start backspacing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      // Backspacing
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, backspaceSpeed);
      } else {
        // Finished backspacing, move to next title
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTitleIndex, isTyping, titles, typingSpeed, backspaceSpeed, pauseDuration]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="relative">
      {currentText}
      <span className={`text-blue-400 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
        |
      </span>
    </span>
  );
}