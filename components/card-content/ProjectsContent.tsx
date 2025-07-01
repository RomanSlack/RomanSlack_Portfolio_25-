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