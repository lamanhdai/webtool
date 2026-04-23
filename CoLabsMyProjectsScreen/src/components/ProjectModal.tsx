import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { X, MapPin, Calendar, Users, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  location: string;
  image: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Generate mock data for the project details
  const projectDetails = {
    description: "Join our research team in studying the fascinating American Pika, a small mammal that serves as an important indicator species for climate change in mountain ecosystems.",
    startDate: "March 15, 2024",
    endDate: "September 30, 2024",
    participants: 127,
    dataPoints: 1842,
    status: "Active",
    objectives: [
      "Monitor pika population density across different elevation zones",
      "Document behavioral patterns during seasonal transitions",
      "Collect temperature and habitat data for climate analysis",
      "Engage citizen scientists in conservation efforts"
    ],
    requirements: [
      "Basic wildlife observation skills",
      "Ability to hike in mountainous terrain",
      "Commitment to data collection protocols",
      "Photography equipment recommended"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Header Image */}
          <div className="aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Close button overlay */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full border-0.5 ${project.tagColor}`}>
                    <span className="text-[10px] uppercase font-mono text-foreground">
                      {project.tag}
                    </span>
                  </div>
                  
                  <DialogHeader>
                    <DialogTitle className="text-left">
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-[12px] uppercase font-mono">
                      {project.location}
                    </span>
                  </div>
                </div>

                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-[#5B4E96] transition-colors flex items-center gap-2">
                  <span>Join Project</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-card rounded-lg">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-foreground">{projectDetails.status}</p>
                <p className="text-[10px] uppercase font-mono text-muted-foreground">Status</p>
              </div>
              
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-foreground">{projectDetails.participants}</p>
                <p className="text-[10px] uppercase font-mono text-muted-foreground">Participants</p>
              </div>
              
              <div className="text-center space-y-1">
                <p className="text-foreground">{projectDetails.dataPoints}</p>
                <p className="text-[10px] uppercase font-mono text-muted-foreground">Data Points</p>
              </div>
              
              <div className="text-center space-y-1">
                <p className="text-foreground">6 months</p>
                <p className="text-[10px] uppercase font-mono text-muted-foreground">Duration</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3>About This Project</h3>
              <p className="text-muted-foreground">
                {projectDetails.description}
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Objectives */}
              <div className="space-y-4">
                <h4>Research Objectives</h4>
                <ul className="space-y-3">
                  {projectDetails.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2"></div>
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h4>Participation Requirements</h4>
                <ul className="space-y-3">
                  {projectDetails.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2"></div>
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h4>Project Timeline</h4>
              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg">
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-mono text-muted-foreground mb-1">Start Date</p>
                  <p className="text-foreground">{projectDetails.startDate}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-mono text-muted-foreground mb-1">End Date</p>
                  <p className="text-foreground">{projectDetails.endDate}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <button className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-[#5B4E96] transition-colors">
                Join This Project
              </button>
              <button className="flex-1 border border-border px-6 py-3 rounded-full hover:bg-card transition-colors">
                Save for Later
              </button>
              <button className="flex-1 border border-border px-6 py-3 rounded-full hover:bg-card transition-colors">
                Share Project
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}