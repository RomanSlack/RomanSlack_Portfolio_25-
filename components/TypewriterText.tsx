'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  titles: string[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  pauseDuration?: number;
  delayAfterErase?: number;
}

export default function TypewriterText({ 
  titles, 
  typingSpeed = 70,
  backspaceSpeed = 80,
  pauseDuration = 10000,
  delayAfterErase = 800
}: TypewriterTextProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isWaitingAfterErase, setIsWaitingAfterErase] = useState(false);

  useEffect(() => {
    if (titles.length === 0) return;

    const currentTitle = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (isWaitingAfterErase) {
      // Waiting after erase is complete
      timeout = setTimeout(() => {
        setIsWaitingAfterErase(false);
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setIsTyping(true);
      }, delayAfterErase);
    } else if (isTyping) {
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
        // Finished backspacing, wait before starting next title
        setIsWaitingAfterErase(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTitleIndex, isTyping, isWaitingAfterErase, titles, typingSpeed, backspaceSpeed, pauseDuration, delayAfterErase]);

  return (
    <span className="relative">
      {currentText}
      <span className="text-blue-400">
        |
      </span>
    </span>
  );
}