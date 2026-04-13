import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  ArrowLeft, 
  Copy, 
  BookOpen, 
  Lightbulb, 
  Target, 
  Zap,
  CheckCircle,
  XCircle,
  Search,
  Palette,
  Layout,
  MousePointer,
  Monitor,
  Smartphone,
  Settings,
  Users,
  Code,
  Database,
  Globe,
  Lock,
  Play,
  Image,
  Volume2,
  Sparkles,
  Move,
  RotateCw,
  Waves
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface LearnToPromptProps {
  onBack: () => void;
}

export function LearnToPrompt({ onBack }: LearnToPromptProps) {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyExample = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Example copied to clipboard!");
      setCopiedExample(text);
      setTimeout(() => setCopiedExample(null), 2000);
    } catch (error) {
      toast.error("Failed to copy example");
    }
  };

  const fundamentals = [
    {
      title: "Be Specific and Descriptive",
      description: "Clear, detailed descriptions lead to better results",
      good: "Create a modern e-commerce dashboard with product analytics, sales charts, and inventory management",
      bad: "Make a dashboard",
      tip: "Include what you want, how it should look, and what it should do"
    },
    {
      title: "Specify Visual Style",
      description: "Mention design preferences, color schemes, and aesthetics",
      good: "Design with a clean, minimalist aesthetic using soft blue gradients and plenty of white space",
      bad: "Make it look good",
      tip: "Reference design systems, color palettes, or visual styles you prefer"
    },
    {
      title: "Include Functional Requirements",
      description: "Describe the features and interactions you need",
      good: "Include user authentication, real-time notifications, and drag-and-drop functionality",
      bad: "Add some features",
      tip: "Think about user workflows and specific capabilities needed"
    },
    {
      title: "Mention Target Audience",
      description: "Specify who will use the application",
      good: "Designed for enterprise users with role-based permissions and corporate branding",
      bad: "For users",
      tip: "Consider demographics, technical expertise, and use context"
    }
  ];

  const promptStructure = {
    title: "Effective Prompt Structure",
    sections: [
      {
        name: "Project Type",
        description: "What you're building",
        example: "Create a task management application...",
        required: true
      },
      {
        name: "Core Features",
        description: "Main functionality",
        example: "...with project boards, task creation, due dates...",
        required: true
      },
      {
        name: "Visual Style",
        description: "Design preferences",
        example: "...using a modern, clean interface with dark mode support...",
        required: false
      },
      {
        name: "Target Audience",
        description: "Who will use it",
        example: "...for remote teams and project managers...",
        required: false
      },
      {
        name: "Technical Requirements",
        description: "Specific needs",
        example: "...with mobile responsiveness and offline capabilities.",
        required: false
      }
    ]
  };

  const uiTerminology = [
    {
      category: "Layout & Structure",
      icon: <Layout className="w-5 h-5" />,
      terms: [
        { term: "Hero Section", definition: "The main visual area at the top of a page, typically containing a headline, subtext, and call-to-action" },
        { term: "Sidebar", definition: "A vertical panel, usually for navigation or secondary content" },
        { term: "Navigation Bar (NavBar)", definition: "Horizontal menu typically at the top of a page for site navigation" },
        { term: "Footer", definition: "Bottom section of a page containing links, copyright, and supplementary information" },
        { term: "Grid Layout", definition: "Content arranged in rows and columns for organized presentation" },
        { term: "Card Layout", definition: "Content grouped in rectangular containers with consistent styling" },
        { term: "Modal/Dialog", definition: "Overlay window that appears on top of main content" },
        { term: "Breadcrumbs", definition: "Navigation trail showing user's location in site hierarchy" }
      ]
    },
    {
      category: "Interactive Elements",
      icon: <MousePointer className="w-5 h-5" />,
      terms: [
        { term: "Call-to-Action (CTA)", definition: "Button or element encouraging specific user action" },
        { term: "Toggle", definition: "Switch that alternates between two states (on/off)" },
        { term: "Dropdown Menu", definition: "List of options that appears when triggered" },
        { term: "Accordion", definition: "Expandable/collapsible content sections" },
        { term: "Tabs", definition: "Navigation that switches between different content panels" },
        { term: "Carousel/Slider", definition: "Component that cycles through multiple items or images" },
        { term: "Pagination", definition: "Navigation for splitting content across multiple pages" },
        { term: "Search Bar", definition: "Input field for user queries and content filtering" }
      ]
    },
    {
      category: "Visual Design",
      icon: <Palette className="w-5 h-5" />,
      terms: [
        { term: "Color Palette", definition: "Set of colors used consistently throughout the design" },
        { term: "Typography", definition: "Font choices, sizes, weights, and text styling" },
        { term: "White Space", definition: "Empty areas that provide visual breathing room" },
        { term: "Contrast", definition: "Difference in visual properties to ensure readability" },
        { term: "Gradient", definition: "Smooth transition between colors" },
        { term: "Shadow/Elevation", definition: "Visual effect giving depth and hierarchy" },
        { term: "Border Radius", definition: "Rounded corners on elements" },
        { term: "Icon Set", definition: "Consistent collection of symbolic graphics" }
      ]
    },
    {
      category: "Responsive Design",
      icon: <Monitor className="w-5 h-5" />,
      terms: [
        { term: "Breakpoints", definition: "Screen sizes where layout changes occur" },
        { term: "Mobile-First", definition: "Design approach starting with mobile layout" },
        { term: "Flexible Grid", definition: "Layout that adapts to different screen sizes" },
        { term: "Touch Targets", definition: "Interactive areas sized for finger taps" },
        { term: "Viewport", definition: "Visible area of a web page on a device" },
        { term: "Progressive Enhancement", definition: "Building up from basic to advanced features" },
        { term: "Adaptive Layout", definition: "Different layouts for specific screen sizes" },
        { term: "Fluid Design", definition: "Layout that scales smoothly across screen sizes" }
      ]
    },
    {
      category: "Data & Content",
      icon: <Database className="w-5 h-5" />,
      terms: [
        { term: "Dashboard", definition: "Interface showing key metrics and data visualizations" },
        { term: "Data Table", definition: "Organized display of data in rows and columns" },
        { term: "Chart/Graph", definition: "Visual representation of data (bar, line, pie, etc.)" },
        { term: "Form", definition: "Interface for user input and data collection" },
        { term: "Validation", definition: "Checking user input for errors or requirements" },
        { term: "Filtering", definition: "Narrowing content based on specific criteria" },
        { term: "Sorting", definition: "Organizing content by specific attributes" },
        { term: "Search Results", definition: "Content displayed based on user queries" }
      ]
    },
    {
      category: "User Experience",
      icon: <Users className="w-5 h-5" />,
      terms: [
        { term: "Loading States", definition: "Visual feedback during content loading" },
        { term: "Error States", definition: "Messages and interfaces for error conditions" },
        { term: "Empty States", definition: "Interface when no content is available" },
        { term: "Onboarding", definition: "Process introducing new users to the application" },
        { term: "Accessibility", definition: "Design ensuring usability for users with disabilities" },
        { term: "User Flow", definition: "Path users take to complete tasks" },
        { term: "Feedback", definition: "Visual/audio response to user actions" },
        { term: "Microinteractions", definition: "Small animations providing user feedback" }
      ]
    },
    {
      category: "Animations & Effects",
      icon: <Sparkles className="w-5 h-5" />,
      terms: [
        { term: "Keyframes", definition: "Specific points in an animation timeline that define property values" },
        { term: "Easing", definition: "Controls the rate of change in animation (ease-in, ease-out, linear)" },
        { term: "Parallax", definition: "Background images move slower than foreground content when scrolling" },
        { term: "Morphing", definition: "Smooth transformation between two shapes or states" },
        { term: "Skeleton Loading", definition: "Placeholder animation showing content structure while loading" },
        { term: "Ripple Effect", definition: "Circular animation spreading from click point" },
        { term: "Bounce Animation", definition: "Animation that overshoots target then settles" },
        { term: "Stagger", definition: "Sequential animation timing for multiple elements" }
      ]
    },
    {
      category: "Media & Assets",
      icon: <Image className="w-5 h-5" />,
      terms: [
        { term: "Lazy Loading", definition: "Loading images/content only when they come into viewport" },
        { term: "Progressive Loading", definition: "Loading low-quality version first, then high-quality" },
        { term: "WebP/AVIF", definition: "Modern image formats offering better compression" },
        { term: "Responsive Images", definition: "Different image sizes for different screen resolutions" },
        { term: "Alt Text", definition: "Descriptive text for screen readers and accessibility" },
        { term: "Focal Point", definition: "Most important part of image that should stay visible when cropped" },
        { term: "Aspect Ratio", definition: "Proportional relationship between width and height" },
        { term: "Compression", definition: "Reducing file size while maintaining acceptable quality" }
      ]
    },
    {
      category: "Audio & Video",
      icon: <Volume2 className="w-5 h-5" />,
      terms: [
        { term: "Autoplay", definition: "Media starts playing automatically when page loads" },
        { term: "Preload", definition: "Loading media in background before user requests it" },
        { term: "Buffering", definition: "Downloading portion of media file ahead of playback" },
        { term: "Bitrate", definition: "Amount of data processed per second in audio/video" },
        { term: "Codec", definition: "Software/algorithm for compressing and decompressing media" },
        { term: "Closed Captions", definition: "Text overlay showing dialogue and sound effects" },
        { term: "Audio Cues", definition: "Sound feedback for user interactions and notifications" },
        { term: "Volume Normalization", definition: "Adjusting audio levels for consistent playback volume" }
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Being too vague",
      example: "Create a website",
      fix: "Create a responsive portfolio website for a graphic designer with project galleries, client testimonials, and contact form"
    },
    {
      mistake: "Only describing appearance",
      example: "Make it blue and modern",
      fix: "Use a blue color scheme with modern typography, including user authentication, real-time chat, and mobile responsiveness"
    },
    {
      mistake: "Forgetting user context",
      example: "Build a dashboard",
      fix: "Build an analytics dashboard for marketing managers to track campaign performance with customizable widgets"
    },
    {
      mistake: "No technical specifics",
      example: "Add some features",
      fix: "Include drag-and-drop functionality, auto-save, keyboard shortcuts, and export to PDF capabilities"
    },
    {
      mistake: "Vague animation requests",
      example: "Add some animations",
      fix: "Include fade-in animations on page load with 0.3s duration, hover scale effects on cards, and scroll-triggered animations for section reveals"
    },
    {
      mistake: "Ignoring media specifications",
      example: "Add some images",
      fix: "Include high-resolution hero images in 16:9 aspect ratio, optimized product thumbnails with lazy loading, and ambient background video with mute controls"
    },
    {
      mistake: "Overlooking interaction details",
      example: "Make it interactive",
      fix: "Add button ripple effects, smooth page transitions, swipe gestures for mobile navigation, and hover states with 200ms transition timing"
    }
  ];

  const examplePrompts = [
    {
      type: "E-commerce Site",
      prompt: "Create a modern e-commerce website for sustainable clothing. Include product catalog with filtering by size/color/price, detailed product pages with multiple images, shopping cart with quantity controls, secure checkout process, user account pages with order history, and customer reviews. Use earth-tone colors, clean typography, and mobile-responsive design optimized for environmentally conscious millennials.",
      breakdown: [
        "Project type: E-commerce website",
        "Niche: Sustainable clothing",
        "Features: Product catalog, filtering, cart, checkout",
        "Visual style: Earth tones, clean typography",
        "Target audience: Environmentally conscious millennials",
        "Technical: Mobile-responsive"
      ]
    },
    {
      type: "Productivity App",
      prompt: "Build a team productivity application for remote workers. Include project kanban boards with drag-and-drop tasks, time tracking with visual reports, team chat with file sharing, calendar integration, and progress analytics dashboard. Design with a professional dark theme, purple accent colors, and intuitive icons. Optimize for both desktop and tablet use with offline sync capabilities.",
      breakdown: [
        "Project type: Productivity application",
        "Target: Remote workers",
        "Features: Kanban boards, time tracking, chat, calendar",
        "Visual style: Dark theme with purple accents",
        "Platforms: Desktop and tablet",
        "Technical: Offline sync"
      ]
    },
    {
      type: "Animated Portfolio",
      prompt: "Design a creative portfolio website for a motion graphics designer. Include hero section with particle animation background, project showcase with 3D hover effects on thumbnails, smooth scroll-triggered animations as sections come into view, video autoplay for demo reels, and interactive timeline with morphing transitions. Add subtle click sounds for navigation, optimized loading states with skeleton animations, and mobile swipe gestures. Use bold typography with neon accent colors against dark backgrounds.",
      breakdown: [
        "Project type: Creative portfolio website",
        "Target: Motion graphics designer",
        "Animations: Particle effects, 3D hover, scroll-triggered, morphing transitions",
        "Media: Video autoplay, click sounds",
        "Interactions: Swipe gestures, skeleton loading",
        "Visual style: Dark theme with neon accents, bold typography"
      ]
    },
    {
      type: "Interactive Gaming Dashboard",
      prompt: "Create a gaming dashboard with real-time statistics and social features. Include animated progress bars that fill based on achievement levels, floating notification system with sound effects, live leaderboards with smooth position transitions, chat system with typing indicators and message animations, profile cards with parallax background images, and confetti effects for milestone celebrations. Add background ambient gaming music with volume controls, achievement unlock sound notifications, and gesture-controlled navigation for mobile gaming. Use cyberpunk aesthetic with glowing elements.",
      breakdown: [
        "Project type: Gaming dashboard",
        "Target: Gamers and esports enthusiasts",
        "Animations: Progress bars, notifications, transitions, confetti",
        "Audio: Ambient music, sound effects, achievement notifications",
        "Real-time features: Leaderboards, chat, statistics",
        "Visual style: Cyberpunk with glowing elements",
        "Interactions: Gesture controls, typing indicators"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Learn to Prompt</h1>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600 max-w-4xl">
            Master the art of prompt writing for Figma Make. Learn the fundamentals, explore UI terminology, 
            and discover best practices to create exactly what you envision.
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="fundamentals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
            <TabsTrigger value="fundamentals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Fundamentals</span>
              <span className="sm:hidden">Basics</span>
            </TabsTrigger>
            <TabsTrigger value="layouts" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Layouts</span>
              <span className="sm:hidden">Layout</span>
            </TabsTrigger>
            <TabsTrigger value="changes" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Changes</span>
              <span className="sm:hidden">Edit</span>
            </TabsTrigger>
            <TabsTrigger value="terminology" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">UI Terms</span>
              <span className="sm:hidden">Terms</span>
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Animations</span>
              <span className="sm:hidden">Anim</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Media</span>
              <span className="sm:hidden">Media</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Examples</span>
              <span className="sm:hidden">Ex</span>
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Mistakes</span>
              <span className="sm:hidden">Tips</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fundamentals" className="space-y-6">
            {/* Prompt Writing Principles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Prompt Writing Principles
                </CardTitle>
                <CardDescription>
                  Core principles for writing effective prompts that generate better results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {fundamentals.map((principle, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{principle.title}</h3>
                      <p className="text-gray-600 mb-4">{principle.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-800">Good Example</span>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="text-sm text-green-800">"{principle.good}"</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="font-medium text-red-800">Avoid This</span>
                          </div>
                          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                            <p className="text-sm text-red-800">"{principle.bad}"</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Tip:</strong> {principle.tip}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prompt Structure */}
            <Card>
              <CardHeader>
                <CardTitle>{promptStructure.title}</CardTitle>
                <CardDescription>
                  Follow this structure to create comprehensive, effective prompts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promptStructure.sections.map((section, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{section.name}</h4>
                          {section.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                        <div className="bg-gray-50 p-2 rounded text-sm text-gray-700 italic">
                          {section.example}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Complete Example:</h4>
                  <p className="text-sm text-green-700 italic">
                    "Create a task management application with project boards, task creation, due dates 
                    using a modern, clean interface with dark mode support for remote teams and project 
                    managers with mobile responsiveness and offline capabilities."
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="animations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Animation & Interaction Guide
                </CardTitle>
                <CardDescription>
                  Learn how to specify animations, interactions, and dynamic effects in your prompts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Basic Animations */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Move className="w-5 h-5" />
                      Basic Animations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Entrance Animations</h4>
                        <div className="bg-blue-50 p-3 rounded-lg border">
                          <p className="text-sm text-blue-800 mb-2"><strong>Fade In:</strong> "Elements should fade in smoothly when page loads"</p>
                          <p className="text-sm text-blue-800 mb-2"><strong>Slide Up:</strong> "Cards should slide up from bottom with staggered timing"</p>
                          <p className="text-sm text-blue-800"><strong>Scale In:</strong> "Buttons should scale in with bounce effect"</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Hover Effects</h4>
                        <div className="bg-green-50 p-3 rounded-lg border">
                          <p className="text-sm text-green-800 mb-2"><strong>Scale:</strong> "Cards should scale up 5% on hover"</p>
                          <p className="text-sm text-green-800 mb-2"><strong>Shadow:</strong> "Add elevated shadow on button hover"</p>
                          <p className="text-sm text-green-800"><strong>Color:</strong> "Background should transition to darker blue on hover"</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Interactions */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <MousePointer className="w-5 h-5" />
                      Advanced Interactions
                    </h3>
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="scroll-animations">
                        <AccordionTrigger>Scroll-Triggered Animations</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-gray-600">Animations that trigger as users scroll through the page:</p>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <p className="text-sm text-purple-800 italic">"Add scroll-triggered animations where sections fade in as they come into view"</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <p className="text-sm text-purple-800 italic">"Include parallax scrolling effect for background images"</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <p className="text-sm text-purple-800 italic">"Add progress bar that fills as user scrolls down the page"</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="micro-interactions">
                        <AccordionTrigger>Micro-interactions</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-gray-600">Small animations that provide feedback and delight:</p>
                            <div className="bg-yellow-50 p-3 rounded-lg">
                              <p className="text-sm text-yellow-800 italic">"Button should have ripple effect when clicked"</p>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-lg">
                              <p className="text-sm text-yellow-800 italic">"Toggle switch should animate smoothly between states"</p>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-lg">
                              <p className="text-sm text-yellow-800 italic">"Form inputs should have focus animations with color transitions"</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="loading-states">
                        <AccordionTrigger>Loading & State Animations</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-gray-600">Animations for different application states:</p>
                            <div className="bg-indigo-50 p-3 rounded-lg">
                              <p className="text-sm text-indigo-800 italic">"Add skeleton loading animation for content placeholders"</p>
                            </div>
                            <div className="bg-indigo-50 p-3 rounded-lg">
                              <p className="text-sm text-indigo-800 italic">"Include spinning loader for data fetching states"</p>
                            </div>
                            <div className="bg-indigo-50 p-3 rounded-lg">
                              <p className="text-sm text-indigo-800 italic">"Success message should slide down with checkmark animation"</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="gesture-controls">
                        <AccordionTrigger>Gesture Controls</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-gray-600">Touch and gesture-based interactions:</p>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <p className="text-sm text-red-800 italic">"Implement swipe gestures for carousel navigation"</p>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <p className="text-sm text-red-800 italic">"Add pull-to-refresh animation for mobile"</p>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <p className="text-sm text-red-800 italic">"Include pinch-to-zoom functionality for images"</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Visual Effects */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Waves className="w-5 h-5" />
                      Visual Effects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Particle Effects</h4>
                        <div className="bg-gray-50 p-3 rounded text-sm">
                          "Add floating particle animation in background"
                          <br/>
                          "Include confetti effect on success actions"
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Transitions</h4>
                        <div className="bg-gray-50 p-3 rounded text-sm">
                          "Smooth page transitions with slide effects"
                          <br/>
                          "Morphing animations between states"
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">3D Effects</h4>
                        <div className="bg-gray-50 p-3 rounded text-sm">
                          "Cards with 3D tilt effect on hover"
                          <br/>
                          "Perspective transforms for depth"
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animation Best Practices */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">Animation Best Practices</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                      <div>
                        <p className="font-medium mb-2">✅ Do:</p>
                        <ul className="space-y-1">
                          <li>• Specify animation duration (e.g., "0.3 second transitions")</li>
                          <li>• Mention easing functions ("smooth ease-out animation")</li>
                          <li>• Include reduced motion considerations</li>
                          <li>• Specify trigger conditions clearly</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium mb-2">❌ Avoid:</p>
                        <ul className="space-y-1">
                          <li>• Overly complex or distracting animations</li>
                          <li>• Animations without clear purpose</li>
                          <li>• Ignoring performance implications</li>
                          <li>• Conflicting animation directions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Images, Sounds & Media Assets
                </CardTitle>
                <CardDescription>
                  Learn how to effectively specify media requirements in your Figma Make prompts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Image Integration */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Image Integration
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Image Types & Sources</h4>
                          <div className="bg-green-50 p-4 rounded-lg border">
                            <div className="space-y-2 text-sm text-green-800">
                              <p><strong>Stock Photos:</strong> "Use high-quality stock photos for hero sections"</p>
                              <p><strong>Illustrations:</strong> "Include modern vector illustrations for features"</p>
                              <p><strong>Icons:</strong> "Add consistent icon set throughout interface"</p>
                              <p><strong>Avatars:</strong> "Generate placeholder avatars for user profiles"</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Image Specifications</h4>
                          <div className="bg-blue-50 p-4 rounded-lg border">
                            <div className="space-y-2 text-sm text-blue-800">
                              <p><strong>Aspect Ratios:</strong> "Use 16:9 for hero images, 1:1 for thumbnails"</p>
                              <p><strong>Quality:</strong> "High-resolution images optimized for web"</p>
                              <p><strong>Alt Text:</strong> "Include descriptive alt text for accessibility"</p>
                              <p><strong>Lazy Loading:</strong> "Implement lazy loading for performance"</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Example Image Prompts</h4>
                        <div className="space-y-2">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700 italic">"Include a hero image of a modern office space with natural lighting for the homepage header"</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700 italic">"Add product gallery with zoom functionality and thumbnail navigation"</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700 italic">"Use abstract geometric patterns as background images with subtle opacity"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sound Integration */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      Sound & Audio
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-start gap-3">
                          <Volume2 className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-900 mb-2">Audio Integration Options</h4>
                            <p className="text-sm text-yellow-800 mb-3">
                              While Figma Make primarily focuses on visual interfaces, you can specify audio requirements for enhanced user experiences.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="ui-sounds">
                          <AccordionTrigger>UI Sound Effects</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p className="text-gray-600">Subtle audio feedback for user interactions:</p>
                              <div className="space-y-2">
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <p className="text-sm text-purple-800 italic">"Add subtle click sound for button interactions"</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <p className="text-sm text-purple-800 italic">"Include notification chime for success messages"</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <p className="text-sm text-purple-800 italic">"Add typing sound effect for real-time text input"</p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="ambient-audio">
                          <AccordionTrigger>Background & Ambient Audio</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p className="text-gray-600">Environmental audio for immersive experiences:</p>
                              <div className="space-y-2">
                                <div className="bg-indigo-50 p-3 rounded-lg">
                                  <p className="text-sm text-indigo-800 italic">"Include optional ambient background music with volume controls"</p>
                                </div>
                                <div className="bg-indigo-50 p-3 rounded-lg">
                                  <p className="text-sm text-indigo-800 italic">"Add nature sounds for meditation or wellness apps"</p>
                                </div>
                                <div className="bg-indigo-50 p-3 rounded-lg">
                                  <p className="text-sm text-indigo-800 italic">"Include white noise generator with customizable settings"</p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="audio-controls">
                          <AccordionTrigger>Audio Controls & Accessibility</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p className="text-gray-600">Essential audio control features:</p>
                              <div className="space-y-2">
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <p className="text-sm text-green-800 italic">"Include mute/unmute toggle in navigation bar"</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <p className="text-sm text-green-800 italic">"Add volume slider with visual feedback"</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <p className="text-sm text-green-800 italic">"Implement audio preferences in settings panel"</p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>

                  {/* Video & Media Players */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Video & Media Players
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Video Integration</h4>
                        <div className="bg-red-50 p-4 rounded-lg border">
                          <div className="space-y-2 text-sm text-red-800">
                            <p><strong>Background Videos:</strong> "Add autoplay background video with mute option"</p>
                            <p><strong>Product Demos:</strong> "Include embedded video player for tutorials"</p>
                            <p><strong>Live Streaming:</strong> "Add live video feed with chat integration"</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Media Controls</h4>
                        <div className="bg-orange-50 p-4 rounded-lg border">
                          <div className="space-y-2 text-sm text-orange-800">
                            <p><strong>Custom Players:</strong> "Design custom video player with brand colors"</p>
                            <p><strong>Playlist Features:</strong> "Add playlist management with skip controls"</p>
                            <p><strong>Quality Settings:</strong> "Include video quality selector for bandwidth"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Asset Optimization */}
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-4">Asset Optimization Guidelines</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Performance</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>• "Optimize images for web delivery"</li>
                          <li>• "Implement progressive loading"</li>
                          <li>• "Use appropriate file formats"</li>
                          <li>• "Compress without quality loss"</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Responsive Media</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>• "Provide multiple image sizes"</li>
                          <li>• "Adapt video quality for mobile"</li>
                          <li>• "Scale media for different screens"</li>
                          <li>• "Optimize touch interactions"</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Accessibility</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>• "Include descriptive alt text"</li>
                          <li>• "Provide audio descriptions"</li>
                          <li>• "Add captions for videos"</li>
                          <li>• "Ensure keyboard navigation"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Layout Design Patterns
                </CardTitle>
                <CardDescription>
                  Master common layout patterns and learn how to prompt for specific design structures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Layout Types */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Common Layout Patterns</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                          <div className="text-xs text-gray-500">Header</div>
                        </div>
                        <div className="flex gap-2 h-16 mb-3">
                          <div className="w-1/4 bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Sidebar</div>
                          </div>
                          <div className="flex-1 bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Main Content</div>
                          </div>
                        </div>
                        <div className="w-full h-8 bg-gray-100 rounded flex items-center justify-center">
                          <div className="text-xs text-gray-500">Footer</div>
                        </div>
                        <h4 className="font-medium mt-3">Sidebar Layout</h4>
                        <p className="text-sm text-gray-600 mt-1">Navigation sidebar with main content area</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => copyExample("Create a sidebar layout with fixed navigation on the left containing menu items and collapsible sections, main content area that adapts to sidebar width, and responsive behavior that converts to mobile drawer on smaller screens.")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                          <div className="text-xs text-gray-500">Hero Section</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 h-16 mb-3">
                          <div className="bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Card</div>
                          </div>
                          <div className="bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Card</div>
                          </div>
                          <div className="bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Card</div>
                          </div>
                        </div>
                        <div className="w-full h-8 bg-gray-100 rounded flex items-center justify-center">
                          <div className="text-xs text-gray-500">Footer</div>
                        </div>
                        <h4 className="font-medium mt-3">Landing Page</h4>
                        <p className="text-sm text-gray-600 mt-1">Hero section with feature cards below</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => copyExample("Design a landing page with full-width hero section containing headline, subtext, and CTA button, followed by 3-column feature grid with icons and descriptions, testimonials section, and footer with links and contact info.")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="w-full h-16 bg-gray-100 rounded mb-3 flex items-center justify-center">
                          <div className="text-xs text-gray-500">Navigation</div>
                        </div>
                        <div className="grid grid-cols-4 gap-1 h-20">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded flex items-center justify-center">
                              <div className="text-xs text-gray-500">Item</div>
                            </div>
                          ))}
                        </div>
                        <h4 className="font-medium mt-3">Grid Layout</h4>
                        <p className="text-sm text-gray-600 mt-1">Responsive grid system for content</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => copyExample("Create a responsive grid layout that displays 4 columns on desktop, 2 on tablet, and 1 on mobile. Include consistent card spacing, hover effects, and smooth transitions between breakpoints.")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-2 h-20 mb-3">
                          <div className="flex-1 bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Content</div>
                          </div>
                          <div className="w-1/3 bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Sidebar</div>
                          </div>
                        </div>
                        <div className="w-full h-8 bg-gray-100 rounded flex items-center justify-center">
                          <div className="text-xs text-gray-500">Related Articles</div>
                        </div>
                        <h4 className="font-medium mt-3">Article Layout</h4>
                        <p className="text-sm text-gray-600 mt-1">Blog post with sidebar and related content</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => copyExample("Design an article layout with main content area for blog post, right sidebar containing author info and related articles, table of contents that follows scroll position, and social sharing buttons.")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="w-full h-12 bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <div className="text-xs text-gray-500">Toolbar</div>
                        </div>
                        <div className="flex gap-2 h-20">
                          <div className="w-1/4 bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Files</div>
                          </div>
                          <div className="flex-1 bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Canvas</div>
                          </div>
                          <div className="w-1/4 bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-xs text-gray-500">Properties</div>
                          </div>
                        </div>
                        <h4 className="font-medium mt-3">Dashboard Layout</h4>
                        <p className="text-sm text-gray-600 mt-1">Multi-panel interface for applications</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => copyExample("Build a dashboard layout with top toolbar, left file explorer panel, central canvas area, and right properties panel. Include resizable panels, collapsible sections, and full-screen mode toggle.")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="space-y-2">
                          <div className="w-full h-4 bg-gray-100 rounded"></div>
                          <div className="flex gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                            <div className="flex-1 space-y-1">
                              <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                              <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                            <div className="flex-1 space-y-1">
                              <div className="w-2/3 h-3 bg-gray-100 rounded"></div>
                              <div className="w-1/3 h-3 bg-gray-100 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium mt-3">Feed Layout</h4>
                        <p className="text-sm text-gray-600 mt-1">Social media or news feed design</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => copyExample("Create a social feed layout with infinite scroll, post cards containing user avatar, content, images, and action buttons. Include pull-to-refresh, loading states, and optimistic updates for interactions.")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Layout Prompting Guidelines */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">Layout Prompting Guidelines</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                      <div>
                        <p className="font-medium mb-2">✅ Always Include:</p>
                        <ul className="space-y-1">
                          <li>• Specific layout type and structure</li>
                          <li>• Content hierarchy and organization</li>
                          <li>• Responsive behavior across devices</li>
                          <li>• Spacing and alignment preferences</li>
                          <li>• Navigation and interaction patterns</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium mb-2">🎯 Pro Tips:</p>
                        <ul className="space-y-1">
                          <li>• Reference familiar layouts (Gmail, Airbnb, etc.)</li>
                          <li>• Specify breakpoint behavior explicitly</li>
                          <li>• Mention accessibility considerations</li>
                          <li>• Include performance requirements</li>
                          <li>• Consider content management needs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Making Design Changes Step-by-Step
                </CardTitle>
                <CardDescription>
                  Learn how to effectively request modifications to existing designs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Change Request Structure */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Effective Change Request Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">1</div>
                        <h4 className="font-medium">Identify</h4>
                        <p className="text-sm text-gray-600">What needs changing</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">2</div>
                        <h4 className="font-medium">Describe</h4>
                        <p className="text-sm text-gray-600">Desired outcome</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">3</div>
                        <h4 className="font-medium">Specify</h4>
                        <p className="text-sm text-gray-600">Implementation details</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">4</div>
                        <h4 className="font-medium">Consider</h4>
                        <p className="text-sm text-gray-600">Side effects</p>
                      </div>
                    </div>
                  </div>

                  {/* Change Examples */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Common Change Scenarios</h3>
                    
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="layout-changes">
                        <AccordionTrigger>Layout & Structure Changes</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Moving from Single to Multi-Column</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-red-700 mb-2">❌ Vague Request:</p>
                                  <div className="bg-red-50 p-3 rounded border">
                                    <p className="text-sm text-red-800">"Make this into two columns"</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-700 mb-2">✅ Specific Request:</p>
                                  <div className="bg-green-50 p-3 rounded border">
                                    <p className="text-sm text-green-800">"Convert the current single-column article layout to a two-column design where the main content takes 2/3 width on the left, and a sidebar with author info, related articles, and social sharing takes 1/3 on the right. Maintain single column on mobile devices."</p>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-3"
                                onClick={() => copyExample("Convert the current single-column article layout to a two-column design where the main content takes 2/3 width on the left, and a sidebar with author info, related articles, and social sharing takes 1/3 on the right. Maintain single column on mobile devices.")}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Example
                              </Button>
                            </div>

                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Reorganizing Navigation</h5>
                              <div className="bg-blue-50 p-3 rounded border mb-3">
                                <p className="text-sm text-blue-800 italic">"Move the current horizontal navigation to a left sidebar format. Group related menu items under collapsible sections (Dashboard, Projects, Settings). Add user profile section at the bottom with avatar and logout option. Include hover animations and active state indicators."</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyExample("Move the current horizontal navigation to a left sidebar format. Group related menu items under collapsible sections (Dashboard, Projects, Settings). Add user profile section at the bottom with avatar and logout option. Include hover animations and active state indicators.")}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Example
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="visual-changes">
                        <AccordionTrigger>Visual & Style Changes</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Color Scheme Updates</h5>
                              <div className="bg-purple-50 p-3 rounded border mb-3">
                                <p className="text-sm text-purple-800 italic">"Update the current blue color scheme to a warmer palette using deep orange (#FF6B35) as primary, cream (#FFF8DC) as background, and dark brown (#8B4513) for text. Maintain accessibility contrast ratios and update all buttons, links, and accent elements consistently."</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyExample("Update the current blue color scheme to a warmer palette using deep orange (#FF6B35) as primary, cream (#FFF8DC) as background, and dark brown (#8B4513) for text. Maintain accessibility contrast ratios and update all buttons, links, and accent elements consistently.")}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Example
                              </Button>
                            </div>

                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Typography Refinements</h5>
                              <div className="bg-indigo-50 p-3 rounded border mb-3">
                                <p className="text-sm text-indigo-800 italic">"Replace the current font stack with Inter for headings and Source Sans Pro for body text. Increase heading sizes by 20%, add more line spacing (1.6x) for better readability, and use medium weight (500) for all button text instead of bold."</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyExample("Replace the current font stack with Inter for headings and Source Sans Pro for body text. Increase heading sizes by 20%, add more line spacing (1.6x) for better readability, and use medium weight (500) for all button text instead of bold.")}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Example
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="interaction-changes">
                        <AccordionTrigger>Interaction & Functionality Changes</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Adding Interactive Elements</h5>
                              <div className="bg-green-50 p-3 rounded border mb-3">
                                <p className="text-sm text-green-800 italic">"Add a floating action button in the bottom-right corner for quick task creation. Include subtle bounce animation on hover, ripple effect on click, and a tooltip that appears after 1 second delay. Position it 24px from bottom and right edges."</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyExample("Add a floating action button in the bottom-right corner for quick task creation. Include subtle bounce animation on hover, ripple effect on click, and a tooltip that appears after 1 second delay. Position it 24px from bottom and right edges.")}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Example
                              </Button>
                            </div>

                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Modifying Existing Interactions</h5>
                              <div className="bg-yellow-50 p-3 rounded border mb-3">
                                <p className="text-sm text-yellow-800 italic">"Change the current click-to-edit functionality to hover-to-show-edit-icon pattern. When users hover over editable text, show a small pencil icon on the right. Clicking the icon or the text should enable inline editing with save/cancel buttons."</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyExample("Change the current click-to-edit functionality to hover-to-show-edit-icon pattern. When users hover over editable text, show a small pencil icon on the right. Clicking the icon or the text should enable inline editing with save/cancel buttons.")}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Example
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="responsive-changes">
                        <AccordionTrigger>Responsive & Mobile Changes</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Mobile Optimization</h5>
                              <div className="bg-teal-50 p-3 rounded border mb-3">
                                <p className="text-sm text-teal-800 italic">"Optimize the current desktop-focused data table for mobile by converting it to card-based layout on screens smaller than 768px. Each row becomes a card with key information prominently displayed and secondary details collapsible. Add swipe gestures for actions."</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyExample("Optimize the current desktop-focused data table for mobile by converting it to card-based layout on screens smaller than 768px. Each row becomes a card with key information prominently displayed and secondary details collapsible. Add swipe gestures for actions.")}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Example
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Best Practices */}
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-4">Change Request Best Practices</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">🎯 Be Specific</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Reference exact elements by name/location</li>
                          <li>• Provide measurements and spacing</li>
                          <li>• Specify colors using hex codes</li>
                          <li>• Include animation timing and easing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">🔄 Consider Context</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>• How changes affect other elements</li>
                          <li>• Responsive behavior implications</li>
                          <li>• Accessibility requirements</li>
                          <li>• Performance impact</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">⚡ Prioritize Changes</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Start with most important changes</li>
                          <li>• Group related modifications</li>
                          <li>• Test one change at a time</li>
                          <li>• Provide fallback options</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terminology" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  UI/UX Terminology Dictionary
                </CardTitle>
                <CardDescription>
                  Comprehensive guide to user interface terms for better prompt writing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {uiTerminology.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <div className="flex items-center gap-2 mb-4">
                        {category.icon}
                        <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                      </div>
                      
                      <Accordion type="multiple" className="w-full">
                        {category.terms.map((item, termIndex) => (
                          <AccordionItem key={termIndex} value={`${categoryIndex}-${termIndex}`}>
                            <AccordionTrigger className="text-left">
                              <span className="font-medium">{item.term}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-600">{item.definition}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      
                      {categoryIndex < uiTerminology.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Detailed Prompt Examples
                </CardTitle>
                <CardDescription>
                  Study these comprehensive examples to understand effective prompt structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {examplePrompts.map((example, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{example.type}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyExample(example.prompt)}
                          className={copiedExample === example.prompt ? "bg-green-50" : ""}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copiedExample === example.prompt ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                        <p className="text-sm text-gray-700 italic">"{example.prompt}"</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Prompt Breakdown:</h4>
                        <ul className="space-y-1">
                          {example.breakdown.map((point, pointIndex) => (
                            <li key={pointIndex} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mistakes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Common Mistakes to Avoid
                </CardTitle>
                <CardDescription>
                  Learn from these common pitfalls to improve your prompt writing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {commonMistakes.map((mistake, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        {mistake.mistake}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="font-medium text-red-700">❌ Avoid:</span>
                          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                            <p className="text-sm text-red-800">"{mistake.example}"</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="font-medium text-green-700">✅ Better:</span>
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="text-sm text-green-800">"{mistake.fix}"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Tips for Better Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">✨ Do This:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Be specific about features and functionality</li>
                      <li>• Mention your target audience and their needs</li>
                      <li>• Include visual style preferences</li>
                      <li>• Specify device requirements (mobile, desktop)</li>
                      <li>• Reference similar apps or websites</li>
                      <li>• Ask for accessibility considerations</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">🚫 Avoid This:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Vague descriptions like "make it modern"</li>
                      <li>• Only mentioning colors or appearance</li>
                      <li>• Forgetting about user interactions</li>
                      <li>• Not specifying content types</li>
                      <li>• Assuming technical implementation details</li>
                      <li>• Overcomplicating with too many features</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}