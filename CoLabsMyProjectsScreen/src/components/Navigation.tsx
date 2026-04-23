import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import svgPaths from "../imports/svg-pdwo1joi0c";

interface NavigationProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewProject: () => void;
  userImage: string;
}

export function Navigation({ searchQuery, onSearchChange, onNewProject, userImage }: NavigationProps) {
  const [activeTab, setActiveTab] = useState("My Projects");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "#" },
    { name: "Explore", href: "#" },
    { name: "My Projects", href: "#" }
  ];

  return (
    <nav className="bg-sidebar border-b border-sidebar-border relative">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0 size-10">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 40 40"
              >
                <g id="Logo">
                  <g id="Union">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p2529bf00}
                      fill="var(--color-foreground)"
                      fillRule="evenodd"
                    />
                    <path d={svgPaths.p4f1bee0} fill="var(--color-foreground)" />
                  </g>
                </g>
              </svg>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`px-2 py-2.5 transition-colors ${
                    activeTab === item.name
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-[#5B4E96]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
            <div className={`relative w-[414px] max-w-[90vw] transition-all ${
              isSearchFocused ? 'ring-2 ring-ring rounded-full' : ''
            }`}>
              <div className="bg-background border border-border rounded-full px-3 py-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* New Project Button */}
            <button
              onClick={onNewProject}
              className="bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:bg-[#5B4E96] transition-colors hidden sm:block"
            >
              New Project
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-1 bg-[#ede8e4] rounded-full p-1 hover:bg-[#e5ddd6] transition-colors cursor-pointer">
              <div className="size-7 rounded-full overflow-hidden">
                <img
                  src={userImage}
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-sidebar-accent/10 rounded transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-sidebar border-b border-sidebar-border shadow-lg z-50">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <div className="bg-background border border-border rounded-full px-3 py-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                    activeTab === item.name
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-[#5B4E96]/10 hover:text-[#5B4E96]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile New Project Button */}
            <button
              onClick={() => {
                onNewProject();
                setIsMenuOpen(false);
              }}
              className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:bg-[#5B4E96] transition-colors"
            >
              New Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}