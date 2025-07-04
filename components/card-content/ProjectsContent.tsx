'use client';

import { useEffect, useState } from 'react';

interface ProjectsData {
  title: string;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    status: string;
    statusColor: string;
  }>;
}

export default function ProjectsContent() {
  const [data, setData] = useState<ProjectsData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/assets/projects-content.json');
        const projectsData = await response.json();
        setData(projectsData);
      } catch (error) {
        console.warn('Could not load projects content');
      }
    };

    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <a
          href="https://github.com/romanslack"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 group"
        >
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="text-sm font-medium">View on GitHub</span>
        </a>
      </div>
      
      {data.projects.map((project, index) => (
        <div key={index} className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.statusColor}`}>
              {project.status}
            </span>
          </div>
          
          <p className="text-neutral-300 leading-relaxed mb-4 text-lg">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-3 py-1 bg-neutral-600/50 text-neutral-300 rounded-md text-base"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}