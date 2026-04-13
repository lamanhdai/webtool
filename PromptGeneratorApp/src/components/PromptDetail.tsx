import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Copy, 
  Wand2, 
  Lightbulb, 
  Zap, 
  Settings, 
  Eye,
  Palette,
  Code,
  Users,
  Target
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { type PromptExample } from "../data/prompts";

interface PromptDetailProps {
  prompt: PromptExample;
  onBack: () => void;
  relatedPrompts: PromptExample[];
}

export function PromptDetail({ prompt, onBack, relatedPrompts }: PromptDetailProps) {
  const [copiedVariation, setCopiedVariation] = useState<string | null>(null);

  const copyPrompt = async (text: string, label: string = "prompt") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
      setCopiedVariation(text);
      setTimeout(() => setCopiedVariation(null), 2000);
    } catch (error) {
      toast.error(`Failed to copy ${label}`);
    }
  };

  const figmaSteps = [
    {
      step: 1,
      title: "Open Figma Make",
      description: "Navigate to Figma Make and start a new project"
    },
    {
      step: 2,
      title: "Paste the Prompt",
      description: "Copy the full prompt text and paste it into the prompt input field"
    },
    {
      step: 3,
      title: "Customize Details",
      description: "Add specific requirements like brand colors, content, or target audience"
    },
    {
      step: 4,
      title: "Generate & Iterate",
      description: "Click generate and refine with follow-up prompts for adjustments"
    }
  ];

  const getVariations = () => {
    const basePrompt = prompt.prompt;
    const variations = [];

    // Style variations
    if (prompt.category === "Landing Pages") {
      variations.push({
        title: "Minimalist Version",
        description: "Clean, simple design with lots of white space",
        prompt: basePrompt.replace("modern", "minimalist and clean") + " Focus on simplicity with plenty of white space, minimal color palette, and clean typography."
      });
      variations.push({
        title: "Bold & Colorful",
        description: "Vibrant design with striking visuals",
        prompt: basePrompt.replace("modern", "bold and colorful") + " Use vibrant colors, striking gradients, and eye-catching visuals throughout."
      });
    } else if (prompt.category === "Dashboards") {
      variations.push({
        title: "Dark Theme Version",
        description: "Professional dark mode interface",
        prompt: basePrompt + " Use a dark theme with high contrast elements and neon accent colors for a professional night-mode experience."
      });
      variations.push({
        title: "Mobile-First Version",
        description: "Optimized for mobile devices",
        prompt: basePrompt + " Design with mobile-first approach, using collapsible sidebars, swipe gestures, and touch-friendly controls."
      });
    } else {
      variations.push({
        title: "Premium Version",
        description: "High-end design with premium aesthetics",
        prompt: basePrompt + " Create a premium version with elegant typography, sophisticated color schemes, and luxury design elements."
      });
      variations.push({
        title: "Startup-Friendly",
        description: "Simple, cost-effective design approach",
        prompt: basePrompt + " Design with startup constraints in mind - simple, efficient, and easy to implement with minimal resources."
      });
    }

    // Add audience-specific variations
    variations.push({
      title: "Enterprise Version",
      description: "Professional design for corporate use",
      prompt: basePrompt + " Adapt for enterprise users with corporate branding, formal design language, and business-focused features."
    });

    return variations;
  };

  const getDesignTips = () => {
    const tips = [
      "Be specific about your brand colors and typography preferences",
      "Mention your target audience to get more relevant design suggestions",
      "Include functional requirements alongside visual preferences",
      "Ask for responsive design considerations if needed"
    ];

    if (prompt.category === "E-commerce") {
      tips.push("Specify product categories and checkout flow preferences");
      tips.push("Mention payment methods and shipping information display");
    } else if (prompt.category === "Dashboards") {
      tips.push("Define which metrics are most important to highlight");
      tips.push("Specify if you need real-time data or historical views");
    } else if (prompt.category === "Animations") {
      tips.push("Mention performance requirements and target devices");
      tips.push("Specify animation timing and interaction triggers");
    }

    return tips;
  };

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
            <Badge variant="secondary">{prompt.category}</Badge>
            <h1 className="text-3xl font-bold text-gray-900">{prompt.title}</h1>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
              <ImageWithFallback
                src={prompt.imageUrl}
                alt={prompt.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">{prompt.description}</p>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Original Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-700 italic mb-4">"{prompt.prompt}"</p>
                  <div className="flex gap-2">
                    <Button onClick={() => copyPrompt(prompt.prompt)} size="sm" className="flex-1">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Prompt
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Wand2 className="w-4 h-4 mr-2" />
                      Try in Figma Make
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="howto" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="howto" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              How to Use
            </TabsTrigger>
            <TabsTrigger value="variations" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Variations
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Pro Tips
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Examples
            </TabsTrigger>
          </TabsList>

          <TabsContent value="howto" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Step-by-Step Guide
                </CardTitle>
                <CardDescription>
                  Follow these steps to create your project using this prompt in Figma Make
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {figmaSteps.map((step, index) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">✨ Core Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Responsive design that works on all devices</li>
                      <li>• Modern, clean user interface</li>
                      <li>• Optimized for user experience</li>
                      <li>• Production-ready code</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">🎯 Expected Results</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Professional-grade application</li>
                      <li>• Customizable components</li>
                      <li>• Accessible design patterns</li>
                      <li>• Performance optimized</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variations" className="space-y-6">
            <div className="grid gap-4">
              {getVariations().map((variation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{variation.title}</CardTitle>
                        <CardDescription>{variation.description}</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyPrompt(variation.prompt, variation.title)}
                        className={copiedVariation === variation.prompt ? "bg-green-50" : ""}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedVariation === variation.prompt ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <p className="text-sm text-gray-700 italic">"{variation.prompt}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Optimization Tips
                </CardTitle>
                <CardDescription>
                  Get better results by customizing your prompt with these suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getDesignTips().map((tip, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Customizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">🎨 Visual Customizations</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Add "with dark mode toggle"</li>
                      <li>• Specify "using [brand colors]"</li>
                      <li>• Include "with animations"</li>
                      <li>• Request "mobile-first design"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">⚙️ Functional Enhancements</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Add "with search functionality"</li>
                      <li>• Include "user authentication"</li>
                      <li>• Request "real-time updates"</li>
                      <li>• Specify "offline capabilities"</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expected Visual Results</CardTitle>
                <CardDescription>
                  Examples of what your generated application might look like
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Desktop Version</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Mobile Version</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Note: Actual results will vary based on your specific prompt customizations and requirements.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <div className="mt-12">
            <Separator className="mb-6" />
            <h2 className="text-2xl font-semibold mb-6">Related Prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPrompts.map((relatedPrompt) => (
                <Card key={relatedPrompt.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={relatedPrompt.imageUrl}
                      alt={relatedPrompt.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{relatedPrompt.title}</CardTitle>
                    <CardDescription className="text-sm">{relatedPrompt.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => copyPrompt(relatedPrompt.prompt, relatedPrompt.title)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Prompt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}