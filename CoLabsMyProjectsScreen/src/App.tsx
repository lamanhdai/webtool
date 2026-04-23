import React, { useState } from 'react';
import svgPaths from "./imports/svg-pdwo1joi0c";
import imgEllipse231 from "figma:asset/199f7255b8b99d763083214d0bf3ef52d0340fd6.png";
import imgFrame2147203363 from "figma:asset/5c71d83e59dd58f851b8fe397137b1ad6b72ca29.png";
import imgFrame2147203364 from "figma:asset/0ce76278bf44bef2694bf2965d28168b5a197240.png";
import imgFrame2147203365 from "figma:asset/381e1db2a4365bd4abdfb93cae2bbe259df0b2c1.png";
import imgFrame2147203366 from "figma:asset/ce98855661adbf14ff8be9e1b1dca9f1490f7a6d.png";
import imgFrame2147203367 from "figma:asset/8ef1bf89b4ec2baeec3353b996e6e1af844c1b5a.png";
import imgFrame2147203368 from "figma:asset/f90ae6a1d6f863d4c1368039750043b1c42a9f35.png";
import { Navigation } from "./components/Navigation";
import { ProjectGrid } from "./components/ProjectGrid";
import { Footer } from "./components/Footer";
import { ProjectModal } from "./components/ProjectModal";

// Project data structure
const projects = [
  {
    id: 1,
    title: "Field research on the American Pika",
    tag: "Biology",
    tagColor: "bg-[#feec91] border-[#fedf47]",
    location: "Charleston, NC",
    image: imgFrame2147203363
  },
  {
    id: 2,
    title: "Chesapeake Water Watch",
    tag: "Marine Sci.",
    tagColor: "bg-[#cae3ff] border-[#a6d1ff]",
    location: "Chesapeake Bay",
    image: imgFrame2147203364
  },
  {
    id: 3,
    title: "Bacterial Water Quality Monitoring",
    tag: "Ecology",
    tagColor: "bg-[#e0f4bf] border-[#cbec95]",
    location: "Stanislaus National Forest",
    image: imgFrame2147203365
  },
  {
    id: 4,
    title: "The Milky Way Project",
    tag: "Astronomy",
    tagColor: "bg-[#dddbfd] border-[#c6c3fb]",
    location: "Global",
    image: imgFrame2147203366
  },
  {
    id: 5,
    title: "Rim Fire Monitoring",
    tag: "Geology",
    tagColor: "bg-[#fadcbb] border-[#f7c48d]",
    location: "Stanislaus National Forest",
    image: imgFrame2147203367
  },
  {
    id: 6,
    title: "Christmas Bird Count",
    tag: "Biology",
    tagColor: "bg-[#feec91] border-[#fedf47]",
    location: "Craters of the moon, ID",
    image: imgFrame2147203368
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on search query
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNewProject = () => {
    // In a real app, this would open a new project creation flow
    console.log("Creating new project");
  };

  return (
    <div className="min-h-screen bg-sidebar flex flex-col">
      <Navigation 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewProject={handleNewProject}
        userImage={imgEllipse231}
      />
      
      <main className="flex-1">
        <div className="bg-sidebar px-4 sm:px-6 lg:px-10 py-5">
          <div className="max-w-7xl mx-auto">
            <h1 className="mb-6">My projects</h1>
            <ProjectGrid 
              projects={filteredProjects}
              onProjectClick={handleProjectClick}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </div>
  );
}