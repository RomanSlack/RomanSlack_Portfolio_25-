'use client';

import { useEffect, useState } from 'react';

interface ResearchData {
  title: string;
  researchInterests: {
    title: string;
    areas: Array<{
      title: string;
      description: string;
    }>;
  };
  publications: {
    title: string;
    papers: Array<{
      title: string;
      journal: string;
      year: string;
      status: string;
      statusColor: string;
      abstract: string;
    }>;
  };
}

export default function ResearchContent() {
  const [data, setData] = useState<ResearchData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/assets/research-content.json');
        const researchData = await response.json();
        setData(researchData);
      } catch (error) {
        console.warn('Could not load research content');
      }
    };

    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-3xl font-semibold mb-3">{data.researchInterests.title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {data.researchInterests.areas.map((area, index) => (
            <div key={index} className="bg-neutral-700/30 rounded-lg p-4 border border-neutral-600/50">
              <h4 className="font-semibold mb-2 text-lg">{area.title}</h4>
              <p className="text-neutral-300 text-base">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-semibold mb-4">{data.publications.title}</h3>
        <div className="space-y-4">
          {data.publications.papers.map((paper, index) => (
            <div key={index} className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600/50">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-xl font-semibold flex-1 pr-4">{paper.title}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${paper.statusColor}`}>
                  {paper.status}
                </span>
              </div>
              
              <div className="text-neutral-400 text-base mb-3">
                {paper.journal} • {paper.year}
              </div>
              
              <p className="text-neutral-300 text-base leading-relaxed">
                {paper.abstract}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}