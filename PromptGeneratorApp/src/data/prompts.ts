export interface PromptExample {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export const promptExamples: PromptExample[] = [
  {
    id: "1",
    title: "SaaS Landing Page",
    description: "Convert visitors into customers with a modern, conversion-focused landing page",
    prompt: "Create a modern SaaS landing page for a project management tool. Include a hero section with compelling headline, feature highlights, pricing tiers, customer testimonials, and a clear call-to-action. Use a clean, professional design with gradients and modern typography.",
    category: "Landing Pages",
    imageUrl: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2V8ZW58MXx8fHwxNzU3MjYwMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["SaaS", "Hero Section", "CTA", "Responsive"]
  },
  {
    id: "2", 
    title: "Analytics Dashboard",
    description: "Data-driven dashboard with charts, metrics, and real-time insights",
    prompt: "Build a comprehensive analytics dashboard for an e-commerce platform. Include revenue charts, user metrics, conversion funnels, top products table, and real-time sales data. Use modern chart libraries and a clean, data-focused design with dark/light mode toggle.",
    category: "Dashboards",
    imageUrl: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MjUwNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Charts", "Analytics", "Data Viz", "Real-time"]
  },
  {
    id: "3",
    title: "E-commerce Store",
    description: "Complete online shopping experience with product catalog and checkout",
    prompt: "Create a full-featured e-commerce website for clothing. Include product grid with filters, product detail pages, shopping cart, checkout process, user account pages, and order tracking. Add search functionality and mobile-responsive design.",
    category: "E-commerce",
    imageUrl: "https://images.unsplash.com/photo-1723705027411-9bfc3c99c2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMGFwcHxlbnwxfHx8fDE3NTczNDU3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Shopping Cart", "Product Catalog", "Checkout", "Filters"]
  },
  {
    id: "4",
    title: "Creative Portfolio",
    description: "Showcase your work with a stunning visual portfolio",
    prompt: "Design a creative portfolio website for a UX designer. Include an engaging homepage, project case studies with before/after comparisons, about page, skills section, contact form, and blog. Use a grid layout with hover effects and smooth animations.",
    category: "Portfolio",
    imageUrl: "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1NzI2MjM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Gallery", "Case Studies", "Animations", "Grid Layout"]
  },
  {
    id: "5",
    title: "Task Management App",
    description: "Organize your work with a powerful productivity tool",
    prompt: "Build a task management application like Todoist. Include project boards, task creation with due dates, priority levels, drag-and-drop functionality, progress tracking, team collaboration features, and calendar view. Add search and filtering capabilities.",
    category: "Productivity",
    imageUrl: "https://images.unsplash.com/photo-1591174425156-fd472f354be4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MzQ1NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Kanban", "Drag & Drop", "Calendar", "Collaboration"]
  },
  {
    id: "6",
    title: "Social Media Platform",
    description: "Connect and share with a custom social networking app",
    prompt: "Create a social media platform similar to Twitter. Include user profiles, post creation with images/videos, news feed, like/comment/share functionality, trending topics, direct messaging, and notification system. Add user authentication and follow/unfollow features.",
    category: "Social Media",
    imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHBsYXRmb3JtfGVufDF8fHx8MTc1NzMyMzU5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Feed", "Posts", "Messaging", "Authentication"]
  },
  {
    id: "7",
    title: "Learning Management System",
    description: "Educational platform for online courses and student progress tracking",
    prompt: "Build an online learning platform like Coursera. Include course catalog, video player with chapters, quizzes and assignments, progress tracking, certificates, instructor profiles, discussion forums, and student dashboard. Add course search and enrollment features.",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1588912914078-2fe5224fd8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb25hbCUyMGxlYXJuaW5nJTIwcGxhdGZvcm18ZW58MXx8fHwxNzU3MzQ1NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Courses", "Video Player", "Quizzes", "Progress"]
  },
  {
    id: "8",
    title: "Data Visualization Tool",
    description: "Transform complex data into beautiful, interactive charts and graphs",
    prompt: "Create a data visualization dashboard for business intelligence. Include various chart types (bar, line, pie, scatter), interactive filters, data table views, export functionality, and real-time data updates. Add the ability to create custom reports and save visualizations.",
    category: "Data & Analytics",
    imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGNoYXJ0c3xlbnwxfHx8fDE3NTczMTEzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Charts", "Interactive", "Export", "Business Intelligence"]
  },
  {
    id: "9",
    title: "Mobile Banking App",
    description: "Secure financial app with account management and transactions",
    prompt: "Design a mobile banking application with account overview, transaction history, money transfer functionality, bill payments, budgeting tools, and card management. Include biometric authentication, push notifications, and spending insights with charts.",
    category: "Mobile Apps",
    imageUrl: "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MjUzMDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Banking", "Transactions", "Security", "Budgeting"]
  },
  {
    id: "10",
    title: "Puzzle Game Interface",
    description: "Engaging game UI with levels, scores, and interactive elements",
    prompt: "Create a puzzle game interface for a match-3 game like Candy Crush. Include game board with animated pieces, score tracking, level progression, power-ups, lives system, leaderboards, and achievement badges. Add sound effects toggle and pause functionality.",
    category: "Games",
    imageUrl: "https://images.unsplash.com/photo-1649877533786-15e85479fd19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU3MzQ1NzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Game Board", "Animations", "Scoring", "Levels"]
  },
  {
    id: "11",
    title: "Restaurant Website",
    description: "Appetizing website for food service with online ordering",
    prompt: "Build a restaurant website with menu display, online ordering system, table reservation, location/hours info, photo gallery, customer reviews, and contact form. Include special offers section and integration with delivery platforms.",
    category: "Food & Dining",
    imageUrl: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2V8ZW58MXx8fHwxNzU3MjYwMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Menu", "Ordering", "Reservations", "Gallery"]
  },
  {
    id: "12",
    title: "Event Management Platform",
    description: "Comprehensive tool for organizing and managing events",
    prompt: "Create an event management platform for conferences and meetups. Include event creation, attendee registration, schedule management, speaker profiles, ticket sales, check-in system, networking features, and event analytics dashboard.",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MjUwNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Registration", "Schedule", "Speakers", "Analytics"]
  },
  {
    id: "13",
    title: "Healthcare Patient Portal",
    description: "Secure platform for patients to manage their healthcare",
    prompt: "Design a patient portal for a healthcare provider. Include appointment scheduling, medical records access, prescription refills, test results viewing, doctor communication, insurance information, and telehealth video calls. Ensure HIPAA-compliant design principles.",
    category: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MjUzMDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Medical Records", "Appointments", "Telehealth", "HIPAA"]
  },
  {
    id: "14",
    title: "Real Estate Listing Site",
    description: "Property search and listing platform for buyers and sellers",
    prompt: "Build a real estate website with property search filters, listing details with photo galleries, map integration, mortgage calculator, agent profiles, saved searches, and property comparison tools. Include virtual tour functionality and contact forms.",
    category: "Real Estate",
    imageUrl: "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1NzI2MjM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Property Search", "Maps", "Calculator", "Virtual Tours"]
  },
  {
    id: "15",
    title: "Fitness Tracking App",
    description: "Personal health and fitness companion with workout tracking",
    prompt: "Create a fitness tracking application with workout logging, exercise library with instructions, progress charts, goal setting, nutrition tracking, social features to share achievements, and integration with wearable devices. Include workout plan recommendations.",
    category: "Health & Fitness",
    imageUrl: "https://images.unsplash.com/photo-1591174425156-fd472f354be4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MzQ1NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Workout Tracking", "Progress Charts", "Nutrition", "Goals"]
  },
  {
    id: "16",
    title: "Animated Landing Page",
    description: "Eye-catching landing page with smooth animations and motion design",
    prompt: "Create a modern landing page with stunning animations and motion effects. Include animated hero section with parallax scrolling, staggered text animations on scroll, floating elements, smooth transitions between sections, animated counters, morphing shapes, and interactive hover animations on cards and buttons. Use Motion/Framer Motion for smooth performance.",
    category: "Animations",
    imageUrl: "https://images.unsplash.com/photo-1676238560626-45d35b63b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBkZXNpZ24lMjBhbmltYXRpb258ZW58MXx8fHwxNzU3MzQ1OTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Parallax", "Scroll Animations", "Motion Design", "Hero Section"]
  },
  {
    id: "17",
    title: "Interactive Dashboard",
    description: "Dashboard with rich interactions, hover effects, and responsive animations",
    prompt: "Build an interactive analytics dashboard with smooth animations and micro-interactions. Include animated chart transitions, hover effects on data points, sliding panels, expandable cards with smooth transforms, interactive tooltips, drag-and-drop widgets, real-time data animations, and contextual loading states. Add keyboard navigation and focus animations.",
    category: "Interactive UI",
    imageUrl: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTczNDU5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Micro-interactions", "Hover Effects", "Drag & Drop", "Real-time"]
  },
  {
    id: "18",
    title: "Particle Effect Background",
    description: "Dynamic background with particle systems and visual effects",
    prompt: "Create a website with an animated particle system background. Include floating particles that respond to mouse movement, interconnected dots with animated lines, color-changing effects, particle collision animations, responsive particle density, and smooth performance optimization. Add controls to toggle effects and adjust particle settings.",
    category: "Visual Effects",
    imageUrl: "https://images.unsplash.com/photo-1736465263047-04bc60ddf093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0aWNsZSUyMGVmZmVjdHMlMjB2aXN1YWx8ZW58MXx8fHwxNzU3MzQ1OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Particles", "Mouse Interaction", "Canvas", "Performance"]
  },
  {
    id: "19",
    title: "Hover-Driven Portfolio",
    description: "Portfolio showcase with advanced hover interactions and animations",
    prompt: "Design a creative portfolio with sophisticated hover effects and animations. Include image reveal animations on hover, text overlay transitions, 3D tilt effects on cards, magnetic cursor following elements, smooth image morphing, animated text reveals, parallax depth on scroll, and interactive project previews. Use CSS transforms and Motion for smooth animations.",
    category: "Interactive UI",
    imageUrl: "https://images.unsplash.com/photo-1699040309386-11c615ed64d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3ZlciUyMGVmZmVjdCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTczNDU5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Hover Effects", "Image Reveals", "3D Transforms", "Cursor Interaction"]
  },
  {
    id: "20",
    title: "Scroll-Triggered Storytelling",
    description: "Narrative website with scroll-based animations and scene transitions",
    prompt: "Build a storytelling website with scroll-triggered animations and scene changes. Include sections that animate in sequence as user scrolls, timeline-based story progression, element transformations during scroll, background changes with parallax, text animations that sync with scroll position, interactive scroll indicators, and smooth scene transitions. Create an immersive narrative experience.",
    category: "Animations",
    imageUrl: "https://images.unsplash.com/photo-1637064719709-0928e058f140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3JvbGwlMjBhbmltYXRpb24lMjB3ZWJzaXRlfGVufDF8fHx8MTc1NzM0NTk4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Scroll Triggers", "Storytelling", "Scene Transitions", "Timeline"]
  },
  {
    id: "21",
    title: "Loading States & Spinners",
    description: "Collection of animated loading indicators and loading state management",
    prompt: "Create a comprehensive loading state system with various animated spinners and loading indicators. Include skeleton loaders for content, progress bars with smooth animations, morphing loading icons, pulse effects for lazy loading images, staged loading for complex forms, error state animations, and success confirmations. Add loading state management for different data fetching scenarios.",
    category: "Animations",
    imageUrl: "https://images.unsplash.com/photo-1661313563001-c689cc83790c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2FkaW5nJTIwc3Bpbm5lciUyMGFuaW1hdGlvbnxlbnwxfHx8fDE3NTczNDU5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Loading States", "Skeleton Loaders", "Progress Bars", "Error Handling"]
  },
  {
    id: "22",
    title: "Interactive Form with Animations",
    description: "Multi-step form with smooth transitions and validation animations",
    prompt: "Design an interactive multi-step form with engaging animations. Include smooth step transitions with slide effects, real-time validation with error animations, input focus animations, progress indicator with animated steps, success celebrations, field auto-expansion, animated placeholders, and contextual help tooltips. Add form state persistence and accessibility features.",
    category: "Interactive UI",
    imageUrl: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTczNDU5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Multi-step", "Validation", "Form Animations", "User Experience"]
  },
  {
    id: "23",
    title: "CSS-Only Animation Showcase",
    description: "Creative animations using pure CSS transforms and keyframes",
    prompt: "Create a showcase of pure CSS animations without JavaScript. Include keyframe animations for loading spinners, bouncing balls, morphing shapes, text typewriter effects, CSS-only hover interactions, 3D flip cards, animated backgrounds with gradients, floating elements, and complex geometric animations. Demonstrate advanced CSS animation techniques and timing functions.",
    category: "Visual Effects",
    imageUrl: "https://images.unsplash.com/photo-1676238560626-45d35b63b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBkZXNpZ24lMjBhbmltYXRpb258ZW58MXx8fHwxNzU3MzQ1OTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["CSS Animations", "Keyframes", "Pure CSS", "No JavaScript"]
  },
  {
    id: "24",
    title: "Gesture-Based Interface",
    description: "Touch and gesture-driven interface with swipe animations",
    prompt: "Build a mobile-first interface with gesture controls and touch animations. Include swipe-to-delete with visual feedback, pinch-to-zoom galleries, pull-to-refresh animations, drag-to-reorder lists, swipe navigation between screens, long-press context menus, and haptic feedback simulation. Add gesture recognition with smooth animation responses and mobile performance optimization.",
    category: "Interactive UI",
    imageUrl: "https://images.unsplash.com/photo-1699040309386-11c615ed64d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3ZlciUyMGVmZmVjdCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTczNDU5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",  
    tags: ["Touch Gestures", "Mobile First", "Swipe Actions", "Drag & Drop"]
  },
  {
    id: "25",
    title: "Morphing UI Components",
    description: "Components that smoothly transform and morph between states",
    prompt: "Create a collection of morphing UI components that transform between different states. Include buttons that morph into loading spinners, navigation menus that transform from hamburger to close icons, search bars that expand and contract, modal overlays that morph from trigger elements, tabs that slide and transform, and form inputs that adapt their appearance based on content type. Use Motion for smooth morphing animations.",
    category: "Visual Effects",
    imageUrl: "https://images.unsplash.com/photo-1736465263047-04bc60ddf093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0aWNsZSUyMGVmZmVjdHMlMjB2aXN1YWx8ZW58MXx8fHwxNzU3MzQ1OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Morphing", "State Transitions", "Component Animation", "Smooth Transforms"]
  },
  {
    id: "26",
    title: "Music Streaming Platform",
    description: "Full-featured music streaming app with playlists and player controls",
    prompt: "Create a music streaming platform similar to Spotify. Include a music player with play/pause controls, progress bar, volume slider, playlist management, album artwork display, search functionality, artist pages, personalized recommendations, recently played tracks, favorite songs, radio stations, and social sharing features. Add queue management, shuffle, repeat options, and smooth audio transitions.",
    category: "Music & Audio",
    imageUrl: "https://images.unsplash.com/photo-1762222687051-4c9926eba36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZyUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjM2MjkyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Music Player", "Playlists", "Audio Controls", "Streaming"]
  },
  {
    id: "27",
    title: "Music Production Studio",
    description: "Digital audio workstation interface for music creation and editing",
    prompt: "Build a music production app interface with multi-track timeline, virtual instruments, MIDI sequencer, audio waveform editing, mixer with channel strips and effects, loop browser, drum machine, synthesizer interface, recording controls, tempo and key controls, automation lanes, and export options. Include a virtual keyboard, sample library, and effect plugins interface.",
    category: "Music & Audio",
    imageUrl: "https://images.unsplash.com/photo-1615268733971-6b9cecccb31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpbyUyMHByb2R1Y3Rpb24lMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NjM2MjkyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["DAW", "Audio Editing", "Multi-track", "MIDI"]
  },
  {
    id: "28",
    title: "Podcast Listening App",
    description: "Podcast platform with subscriptions, playback features, and discovery",
    prompt: "Design a podcast application with episode browsing, subscription management, audio player with chapter markers, playback speed controls, sleep timer, download for offline listening, podcast search and discovery, trending shows, category browsing, show notes display, episode bookmarking, and listening history. Add personalized recommendations and social features for sharing favorite episodes.",
    category: "Music & Audio",
    imageUrl: "https://images.unsplash.com/photo-1703060802591-2072ac16a2c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwYXVkaW8lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzNjI5MjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Podcasts", "Audio Player", "Subscriptions", "Offline Mode"]
  },
  {
    id: "29",
    title: "Music Visualizer Player",
    description: "Interactive music player with real-time audio visualizations",
    prompt: "Create a music player with stunning audio visualizations. Include real-time frequency spectrum analyzer, waveform visualizer, circular audio reactive animations, particle effects that respond to beats, animated album art that pulses with music, customizable visualization themes, full-screen immersive mode, and playback controls. Use Web Audio API for audio analysis and Canvas or SVG for rendering visualizations.",
    category: "Music & Audio",
    imageUrl: "https://images.unsplash.com/photo-1762222687051-4c9926eba36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZyUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjM2MjkyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Audio Visualizer", "Web Audio API", "Spectrum Analyzer", "Canvas"]
  },
  {
    id: "30",
    title: "Photo Editing Application",
    description: "Professional photo editor with filters, adjustments, and effects",
    prompt: "Build a comprehensive photo editing app with image upload, cropping and rotating tools, brightness/contrast/saturation adjustments, filter presets, color grading tools, text overlay with custom fonts, drawing tools, stickers and frames, layer management, undo/redo functionality, and export in various formats. Include advanced features like spot healing, blur effects, and color picker.",
    category: "Creative Tools",
    imageUrl: "https://images.unsplash.com/photo-1713888796185-24e6a362cba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMGVkaXRpbmclMjBhcHB8ZW58MXx8fHwxNzYzNjI5MjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Image Editing", "Filters", "Layers", "Graphics"]
  },
  {
    id: "31",
    title: "Video Editing Interface",
    description: "Timeline-based video editor with clips, transitions, and effects",
    prompt: "Create a video editing application with multi-track timeline, video clip trimming and splitting, drag-and-drop clip arrangement, transition effects between clips, text and title overlays, audio track management, video filters and color correction, playback preview, timeline zoom controls, keyframe animation, and video export settings. Add media library for imported assets and effect presets.",
    category: "Creative Tools",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB0aW1lbGluZXxlbnwxfHx8fDE3NjM1NjY3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Video Editing", "Timeline", "Transitions", "Media Library"]
  },
  {
    id: "32",
    title: "Digital Drawing & Sketching App",
    description: "Canvas-based drawing tool with brushes, layers, and art tools",
    prompt: "Design a digital art application with HTML5 canvas drawing area, customizable brushes (pencil, pen, marker, watercolor), color palette with color picker, layer system with opacity controls, undo/redo with history, drawing tools (rectangle, circle, line), eraser, selection tools, transform and move objects, pressure sensitivity simulation, brush size and opacity controls, and export as PNG/JPG. Add grid overlay and symmetry drawing mode.",
    category: "Creative Tools",
    imageUrl: "https://images.unsplash.com/photo-1636711457310-2109a03a1312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZHJhd2luZ3xlbnwxfHx8fDE3NjM1OTYyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Canvas", "Drawing", "Brushes", "Layers"]
  },
  {
    id: "33",
    title: "Animation Creator Tool",
    description: "Frame-by-frame animation builder with timeline and preview",
    prompt: "Create an animation creation tool with frame-by-frame editor, timeline view with keyframes, onion skinning to see previous frames, drawing tools for each frame, layer support, frame rate control, play/pause preview, loop animation option, sprite sheet export, GIF export, and project save/load functionality. Include tweening options for smooth transitions and a library of preset animations.",
    category: "Creative Tools",
    imageUrl: "https://images.unsplash.com/photo-1636711457310-2109a03a1312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZHJhd2luZ3xlbnwxfHx8fDE3NjM1OTYyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Animation", "Keyframes", "Timeline", "GIF"]
  },
  {
    id: "34",
    title: "Recipe & Cooking App",
    description: "Culinary platform with recipe discovery, meal planning, and cooking mode",
    prompt: "Build a recipe application with searchable recipe database, ingredient list with shopping list integration, step-by-step cooking instructions, cooking timer, serving size calculator, nutritional information, recipe categories and filters, save favorites, meal planning calendar, cooking mode with large text and voice commands, recipe ratings and reviews, and photo uploads for completed dishes.",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1758874960056-07aa3d0afa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNpcGUlMjBjb29raW5nJTIwYXBwfGVufDF8fHx8MTc2MzU5NTY3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Recipes", "Meal Planning", "Cooking Timer", "Shopping List"]
  },
  {
    id: "35",
    title: "Travel Planning Platform",
    description: "Complete travel companion with itineraries, bookings, and guides",
    prompt: "Create a travel planning app with destination search and discovery, interactive map with points of interest, itinerary builder with day-by-day planning, flight and hotel booking integration, budget tracker, packing checklist, weather forecasts, currency converter, travel guides and recommendations, photo gallery from trips, expense splitting for group travel, and offline map access. Include user reviews and ratings for destinations.",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1646303297330-17073f7823c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwbGFubmluZyUyMG1hcHxlbnwxfHx8fDE3NjM2MDMxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Travel", "Itinerary", "Maps", "Booking"]
  },
  {
    id: "36",
    title: "Fashion & Style App",
    description: "Digital wardrobe manager with outfit planning and style inspiration",
    prompt: "Design a fashion app with virtual wardrobe where users can catalog their clothing items, outfit creator with mix-and-match functionality, style inspiration feed, fashion trends discovery, shopping integration, color palette suggestions, occasion-based outfit recommendations, packing lists for trips, closet organization tips, and social sharing of outfits. Add virtual try-on feature and style quiz for personalized recommendations.",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1662253981286-6740e7d8cd84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduJTIwYXBwfGVufDF8fHx8MTc2MzYyOTIxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Fashion", "Wardrobe", "Outfit Planning", "Style Guide"]
  },
  {
    id: "37",
    title: "Movie & TV Show Database",
    description: "Entertainment catalog with reviews, watchlists, and recommendations",
    prompt: "Build a movie and TV show database app similar to IMDb. Include comprehensive search with filters, detailed movie/show pages with cast, crew, and synopsis, user ratings and reviews, watchlist and favorites, streaming availability checker, personalized recommendations based on viewing history, trailers and clips, photo galleries, news and updates, release calendar, and social features to discuss with friends. Add advanced filters by genre, year, rating, and platform.",
    category: "Entertainment",
    imageUrl: "https://images.unsplash.com/photo-1598670132918-f27d10cd4590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG0lMjBkYXRhYmFzZXxlbnwxfHx8fDE3NjM2MjkyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Movies", "TV Shows", "Reviews", "Watchlist"]
  },
  {
    id: "38",
    title: "3D Model Viewer",
    description: "Interactive 3D model display with controls and customization",
    prompt: "Create a 3D model viewer application with model file upload support (GLB, GLTF, OBJ), interactive 3D rendering with rotation and zoom controls, lighting adjustment options, material and texture preview, animation playback for animated models, measurement tools, exploded view mode, AR preview mode, model statistics display, and multiple camera angles. Use Three.js for 3D rendering and include performance optimization for complex models.",
    category: "Creative Tools",
    imageUrl: "https://images.unsplash.com/photo-1636711457310-2109a03a1312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZHJhd2luZ3xlbnwxfHx8fDE3NjM1OTYyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["3D", "Three.js", "Model Viewer", "AR"]
  },
  {
    id: "39",
    title: "DJ Mixer Interface",
    description: "Professional DJ mixing console with decks, effects, and controls",
    prompt: "Design a DJ mixing application with dual turntable decks, crossfader between tracks, EQ controls (high, mid, low) for each deck, tempo and pitch adjustment, loop controls, cue points, effects rack (reverb, echo, filter), waveform display with beat matching grid, auto-sync option, sample pads for sound effects, recording functionality, and library browser with BPM detection. Add visual feedback for levels and beat indicators.",
    category: "Music & Audio",
    imageUrl: "https://images.unsplash.com/photo-1615268733971-6b9cecccb31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpbyUyMHByb2R1Y3Rpb24lMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NjM2MjkyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["DJ", "Mixer", "Audio Effects", "Beat Matching"]
  },
  {
    id: "40",
    title: "Lyrics & Karaoke App",
    description: "Music lyrics display with synchronized karaoke mode",
    prompt: "Create a lyrics and karaoke application with song search, synchronized scrolling lyrics that highlight in real-time with music playback, karaoke mode with adjustable backing track volume, pitch shifter for key adjustment, lyrics translation in multiple languages, favorite songs library, offline lyrics download, social sharing of favorite lines, artist information, and the ability to submit and edit lyrics. Add recording feature to save karaoke performances.",
    category: "Music & Audio",
    imageUrl: "https://images.unsplash.com/photo-1762222687051-4c9926eba36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZyUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjM2MjkyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Lyrics", "Karaoke", "Music Sync", "Song Search"]
  }
];

export const categories = Array.from(new Set(promptExamples.map(p => p.category)));