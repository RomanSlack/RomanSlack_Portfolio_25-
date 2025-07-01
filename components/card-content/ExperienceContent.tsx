'use client';

import { useEffect, useState } from 'react';

interface ExperienceData {
  title: string;
  experiences: Array<{
    position: string;
    company: string;
    period: string;
    borderColor: string;
    companyColor: string;
    description: string;
  }>;
}

export default function ExperienceContent() {
  const [data, setData] = useState<ExperienceData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/assets/experience-content.json');
        const experienceData = await response.json();
        setData(experienceData);
      } catch (error) {
        console.warn('Could not load experience content');
      }
    };

    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {data.experiences.map((experience, index) => (
        <div key={index} className={`border-l-4 ${experience.borderColor} pl-6`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-semibold">{experience.position}</h3>
            <span className="text-neutral-400 text-base">{experience.period}</span>
          </div>
          <p className={`${experience.companyColor} mb-2 text-lg`}>{experience.company}</p>
          <p className="text-neutral-300 leading-relaxed text-lg">
            {experience.description}
          </p>
        </div>
      ))}
    </div>
  );
}