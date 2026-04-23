import React from 'react';
import { ProjectCard } from './ProjectCard';

interface Project {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  location: string;
  image: string;
}

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}