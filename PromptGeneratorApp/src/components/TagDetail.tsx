import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ArrowLeft, Copy, Code, Lightbulb, Zap, Target, Palette, Layout } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useState } from "react";

interface TagDetailProps {
  tag: string;
  onBack: () => void;
}

export function TagDetail({ tag, onBack }: TagDetailProps) {
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

  // Define tag-specific content
  const getTagContent = (tag: string) => {
    const tagContent: Record<string, any> = {
      "navigation": {
        icon: <Layout className="w-6 h-6" />,
        title: "Navigation Components",
        description: "Learn how to create effective navigation systems that guide users through your application",
        definition: "Navigation components help users move through your application and understand where they are in relation to the overall structure.",
        
        promptTips: [
          "Specify the type of navigation (horizontal navbar, sidebar, tabs, breadcrumbs)",
          "Mention if you need dropdown menus or mega menus",
          "Include mobile navigation considerations (hamburger menu, drawer)",
          "Specify active states and hover effects",
          "Consider accessibility requirements (keyboard navigation, ARIA labels)"
        ],
        
        examples: [
          {
            title: "Horizontal Navigation Bar",
            prompt: "Create a horizontal navigation bar with logo on the left, main menu items in the center, and user profile dropdown on the right. Include smooth hover effects with underline animations and mobile hamburger menu.",
            explanation: "This example specifies the layout structure, interactive elements, and responsive behavior."
          },
          {
            title: "Sidebar Navigation",
            prompt: "Design a collapsible sidebar navigation with icon-based menu items, nested submenu support, and active state highlighting. Include search functionality and role-based menu filtering.",
            explanation: "Focuses on hierarchical navigation with advanced features like search and permissions."
          },
          {
            title: "Tab Navigation",
            prompt: "Build a tab navigation system with smooth sliding indicator, lazy loading of tab content, and keyboard navigation support. Use distinct styling for active, inactive, and disabled states.",
            explanation: "Emphasizes interaction states and accessibility features."
          }
        ],
        
        variations: [
          "Sticky navigation that appears/disappears on scroll",
          "Breadcrumb navigation for deep page hierarchies",
          "Mega menu with multi-column layouts and featured content",
          "Mobile-first navigation with swipe gestures",
          "Context-sensitive navigation that changes based on page section"
        ],
        
        commonMistakes: [
          {
            mistake: "Too vague: 'Add navigation'",
            fix: "Specific: 'Create a horizontal navbar with 5 main menu items, logo positioning on left, and user account dropdown on right'"
          },
          {
            mistake: "Missing mobile considerations: 'Make a navigation menu'", 
            fix: "Complete: 'Design responsive navigation with hamburger menu for mobile, smooth animations, and touch-friendly targets'"
          }
        ]
      },

      "dashboard": {
        icon: <Target className="w-6 h-6" />,
        title: "Dashboard Design",
        description: "Master the art of creating informative and actionable dashboards",
        definition: "Dashboards provide at-a-glance views of key information and metrics, allowing users to monitor and analyze data effectively.",
        
        promptTips: [
          "Define the dashboard purpose and target users",
          "Specify key metrics and data visualizations needed",
          "Mention widget layouts and customization options",
          "Include filtering and time range controls",
          "Consider real-time data updates and loading states"
        ],
        
        examples: [
          {
            title: "Analytics Dashboard",
            prompt: "Create an analytics dashboard with KPI cards at the top showing revenue, users, and conversion rates. Include line charts for trends, pie charts for demographics, and data tables with sorting. Add date range picker and export functionality.",
            explanation: "Combines multiple visualization types with interactive controls for comprehensive data analysis."
          },
          {
            title: "Project Management Dashboard", 
            prompt: "Design a project dashboard with progress overview cards, Gantt chart timeline, team activity feed, and task completion metrics. Include project switching dropdown and notification center.",
            explanation: "Focuses on workflow management with team collaboration features."
          }
        ],
        
        variations: [
          "Executive dashboard with high-level strategic metrics",
          "Operational dashboard for daily task monitoring", 
          "Financial dashboard with budget tracking and forecasting",
          "Customer support dashboard with ticket metrics and SLA tracking",
          "Marketing dashboard with campaign performance and ROI analysis"
        ],
        
        commonMistakes: [
          {
            mistake: "Unclear purpose: 'Make a dashboard'",
            fix: "Specific goal: 'Create a sales performance dashboard for managers to track team quotas, deal pipeline, and revenue trends'"
          }
        ]
      },

      "forms": {
        icon: <Code className="w-6 h-6" />,
        title: "Form Design & Validation",
        description: "Create user-friendly forms with proper validation and accessibility",
        definition: "Forms are interactive elements that collect user input, requiring careful design for usability and data validation.",
        
        promptTips: [
          "Specify input types and validation rules",
          "Mention error handling and success states",
          "Include accessibility features (labels, ARIA attributes)",
          "Consider multi-step forms and progress indicators",
          "Specify submit button states and loading feedback"
        ],
        
        examples: [
          {
            title: "Registration Form",
            prompt: "Create a user registration form with email, password, and confirm password fields. Include real-time validation with green checkmarks for valid fields, inline error messages, and a progress strength meter for passwords. Add terms acceptance checkbox and social login options.",
            explanation: "Comprehensive form with validation feedback and alternative authentication methods."
          },
          {
            title: "Multi-step Checkout",
            prompt: "Design a 3-step checkout form: shipping info, payment details, and order review. Include progress indicator, field auto-completion, address validation, and the ability to edit previous steps. Add order summary sidebar that updates in real-time.",
            explanation: "Complex form flow with navigation and dynamic content updates."
          }
        ],
        
        variations: [
          "Contact form with file upload and CAPTCHA",
          "Survey form with conditional logic and question branching",
          "Profile editing form with image upload and preview",
          "Search form with filters and auto-suggestions",
          "Feedback form with rating components and optional fields"
        ],
        
        commonMistakes: [
          {
            mistake: "Missing validation: 'Add a contact form'",
            fix: "Complete validation: 'Create contact form with required field indicators, email format validation, character limits, and success/error message handling'"
          }
        ]
      },

      "cards": {
        icon: <Palette className="w-6 h-6" />,
        title: "Card Components",
        description: "Design versatile card layouts for content organization",
        definition: "Cards are flexible content containers that group related information and actions in a easily scannable format.",
        
        promptTips: [
          "Define card content structure (header, body, footer)",
          "Specify interaction states (hover, click, selection)",
          "Mention spacing and alignment within cards", 
          "Include shadow and border styling preferences",
          "Consider responsive behavior and grid layouts"
        ],
        
        examples: [
          {
            title: "Product Card",
            prompt: "Create product cards with image, title, price, and rating. Include hover effects that lift the card and show 'Add to Cart' button. Add badge for sale items and heart icon for favorites with animation feedback.",
            explanation: "E-commerce focused with clear call-to-actions and interactive elements."
          },
          {
            title: "Blog Post Card",
            prompt: "Design blog post cards with featured image, title, excerpt, author info, and publication date. Include category tags, reading time estimate, and smooth hover transitions that reveal social sharing buttons.",
            explanation: "Content-focused with metadata and social features."
          }
        ],
        
        variations: [
          "Profile cards with avatar, bio, and contact actions",
          "Pricing cards with feature comparison and CTA buttons",
          "Timeline cards for activity feeds and notifications",
          "Statistics cards with icons and trend indicators",
          "Gallery cards with image overlays and lightbox functionality"
        ],
        
        commonMistakes: [
          {
            mistake: "No interaction feedback: 'Make product cards'",
            fix: "Interactive design: 'Create product cards with hover lift effect, image zoom on hover, and smooth add-to-cart button animations'"
          }
        ]
      },

      "responsive": {
        icon: <Layout className="w-6 h-6" />,
        title: "Responsive Design",
        description: "Create layouts that work seamlessly across all devices",
        definition: "Responsive design ensures your application provides optimal viewing and interaction experience across desktop, tablet, and mobile devices.",
        
        promptTips: [
          "Specify breakpoints and layout changes",
          "Mention mobile-first vs desktop-first approach",
          "Include touch-friendly interaction requirements",
          "Consider performance implications for mobile",
          "Specify orientation handling (portrait/landscape)"
        ],
        
        examples: [
          {
            title: "Responsive Grid Layout",
            prompt: "Create a responsive grid that shows 4 columns on desktop, 2 on tablet, and 1 on mobile. Include smooth transitions between breakpoints, touch-friendly spacing, and optimized images for each device size.",
            explanation: "Defines clear breakpoint behavior with performance considerations."
          },
          {
            title: "Mobile Navigation",
            prompt: "Design mobile-first navigation that transforms from hamburger menu on mobile to horizontal navbar on desktop. Include swipe gestures, smooth animations, and thumb-friendly touch targets.",
            explanation: "Mobile-first approach with gesture support and accessibility."
          }
        ],
        
        variations: [
          "Responsive data tables with horizontal scrolling and column hiding",
          "Adaptive forms that stack on mobile and flow horizontally on desktop",
          "Responsive hero sections with different layouts per device",
          "Mobile-optimized modals that become full-screen on small devices",
          "Responsive typography that scales appropriately across screen sizes"
        ],
        
        commonMistakes: [
          {
            mistake: "Desktop-only thinking: 'Create a dashboard'",
            fix: "Mobile-aware: 'Design responsive dashboard that stacks widgets vertically on mobile and uses grid layout on desktop with touch-friendly controls'"
          }
        ]
      },

      "animations": {
        icon: <Zap className="w-6 h-6" />,
        title: "Animations & Transitions",
        description: "Add life and feedback to your interfaces with smooth animations",
        definition: "Animations provide visual feedback, guide user attention, and create delightful experiences when used thoughtfully.",
        
        promptTips: [
          "Specify animation triggers (hover, click, scroll, load)",
          "Mention duration and easing preferences",
          "Include performance considerations for mobile",
          "Consider accessibility (reduced motion preferences)",
          "Define animation purpose (feedback, attention, transition)"
        ],
        
        examples: [
          {
            title: "Page Load Animations",
            prompt: "Create staggered fade-in animations for page elements, with hero section animating first, followed by cards sliding up from bottom with 100ms delays between each. Include skeleton loading for slow connections.",
            explanation: "Coordinated entrance animations with progressive loading feedback."
          },
          {
            title: "Interactive Button Effects",
            prompt: "Design buttons with ripple effects on click, gentle scale animation on hover, and loading spinner with text change during async operations. Include haptic feedback suggestions for mobile.",
            explanation: "Multiple interaction states with comprehensive feedback."
          }
        ],
        
        variations: [
          "Scroll-triggered animations that reveal content as user scrolls",
          "Micro-interactions for form validation and success states",
          "Page transition animations between routes",
          "Loading animations with progress indicators",
          "Parallax effects for hero sections and backgrounds"
        ],
        
        commonMistakes: [
          {
            mistake: "Vague request: 'Add some animations'",
            fix: "Specific animations: 'Add 0.3s ease-out hover animations for buttons, staggered card entrance effects, and smooth page transitions with slide-left motion'"
          }
        ]
      }
    };

    return tagContent[tag.toLowerCase()] || {
      icon: <Code className="w-6 h-6" />,
      title: tag.charAt(0).toUpperCase() + tag.slice(1),
      description: `Learn how to effectively prompt for ${tag} elements`,
      definition: `${tag} components are important UI elements that enhance user experience and functionality.`,
      promptTips: [
        `Be specific about ${tag} requirements`,
        "Include interaction details",
        "Mention styling preferences",
        "Consider responsive behavior",
        "Think about accessibility"
      ],
      examples: [],
      variations: [],
      commonMistakes: []
    };
  };

  const content = getTagContent(tag);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
          <div className="flex items-center gap-3">
            {content.icon}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600">{content.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
            <TabsTrigger value="tips">Tips & Mistakes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  What is {content.title}?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{content.definition}</p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Key Prompting Tips:</h4>
                <ul className="space-y-2">
                  {content.promptTips?.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            {content.examples?.map((example: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 rounded-xl border border-gray-100 mb-4">
                    <p className="text-sm text-gray-700 italic leading-relaxed">"{example.prompt}"</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Why this works:</strong> {example.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="variations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Variations</CardTitle>
                <CardDescription>
                  Different approaches you can take when prompting for {tag} elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.variations?.map((variation: string, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{variation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {content.commonMistakes?.map((mistake: any, index: number) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="font-medium text-red-700">❌ Avoid:</span>
                          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                            <p className="text-sm text-red-800">{mistake.mistake}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="font-medium text-green-700">✅ Better:</span>
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="text-sm text-green-800">{mistake.fix}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}