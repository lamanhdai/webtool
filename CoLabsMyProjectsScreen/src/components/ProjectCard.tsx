import React from 'react';
import { MapPin } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  location: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-background border border-border rounded cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[#5B4E96]/50 group"
    >
      <div className="p-4 space-y-4">
        {/* Project Image */}
        <div className="aspect-[293/195] w-full overflow-hidden rounded">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Tag and Title */}
          <div className="space-y-3">
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full border-0.5 ${project.tagColor}`}>
              <span className="text-[10px] uppercase font-mono text-foreground">
                {project.tag}
              </span>
            </div>
            
            <h2 className="leading-tight transition-colors group-hover:text-[#5B4E96]">
              {project.title}
            </h2>
          </div>

          {/* Divider and Location */}
          <div className="space-y-2">
            {/* Dotted line divider */}
            <div className="w-full h-px">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 310 2"
              >
                <path
                  d="M0 1H310"
                  stroke="currentColor"
                  strokeDasharray="0.33 1.97"
                  strokeWidth="0.611611"
                  className="text-foreground"
                />
              </svg>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="text-[10px] uppercase font-mono leading-tight">
                {project.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}