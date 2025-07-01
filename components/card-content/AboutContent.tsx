'use client';

import { useEffect, useState } from 'react';

interface AboutData {
  title: string;
  sections: Array<{
    heading: string;
    content?: string;
    type?: string;
    items?: string[];
  }>;
}

export default function AboutContent() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/assets/about-content.json');
        const aboutData = await response.json();
        setData(aboutData);
      } catch (error) {
        console.warn('Could not load about content');
      }
    };

    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {data.sections.map((section, index) => (
        <div key={index}>
          <h3 className={`font-semibold mb-3 ${index === 0 ? 'text-3xl' : 'text-2xl'}`}>
            {section.heading}
          </h3>
          
          {section.type === 'list' ? (
            <ul className="text-neutral-300 space-y-2 text-lg">
              {section.items?.map((item, itemIndex) => (
                <li key={itemIndex}>• {item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-300 leading-relaxed text-lg">
              {section.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}