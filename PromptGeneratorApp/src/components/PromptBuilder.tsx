import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ArrowLeft, ArrowRight, Copy, Bot, Sparkles, CheckCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PromptBuilderProps {
  onBack: () => void;
}

interface Answer {
  question: string;
  answer: string | string[];
  type: 'select' | 'input' | 'textarea' | 'multiselect' | 'checkbox';
}

export function PromptBuilder({ onBack }: PromptBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: "projectType",
      title: "What do you want to build?",
      description: "Choose the type of application or website you want to create",
      type: "select" as const,
      options: [
        { value: "landing-page", label: "Landing Page", description: "Marketing website or product page" },
        { value: "dashboard", label: "Dashboard", description: "Analytics or admin interface" },
        { value: "e-commerce", label: "E-commerce Site", description: "Online store or marketplace" },
        { value: "portfolio", label: "Portfolio", description: "Personal or professional showcase" },
        { value: "blog", label: "Blog/CMS", description: "Content management or publishing" },
        { value: "social", label: "Social Platform", description: "Community or social features" },
        { value: "productivity", label: "Productivity App", description: "Task management or tools" },
        { value: "custom", label: "Custom Application", description: "Something unique" }
      ]
    },
    {
      id: "purpose",
      title: "What's the main purpose?",
      description: "Describe what your application should accomplish",
      type: "textarea" as const,
      placeholder: "e.g., Help users track their fitness goals, showcase my photography work, sell handmade products..."
    },
    {
      id: "audience",
      title: "Who is your target audience?",
      description: "Describe the people who will use your application",
      type: "input" as const,
      placeholder: "e.g., Small business owners, fitness enthusiasts, creative professionals..."
    },
    {
      id: "features",
      title: "What key features do you need?",
      description: "Select the features that are important for your project",
      type: "multiselect" as const,
      options: [
        "User authentication (login/signup)",
        "Search functionality",
        "File upload/download",
        "Real-time chat/messaging",
        "Payment processing",
        "Email notifications",
        "Data visualization/charts",
        "Social sharing",
        "Comments/reviews system",
        "Calendar/scheduling",
        "Multi-language support",
        "API integration",
        "Offline functionality",
        "Admin panel",
        "User profiles",
        "Content management"
      ]
    },
    {
      id: "designStyle",
      title: "What design style do you prefer?",
      description: "Choose the visual approach that matches your brand",
      type: "select" as const,
      options: [
        { value: "modern-minimal", label: "Modern & Minimal", description: "Clean lines, lots of white space" },
        { value: "professional", label: "Professional", description: "Corporate, trustworthy design" },
        { value: "creative-bold", label: "Creative & Bold", description: "Unique, eye-catching design" },
        { value: "friendly-approachable", label: "Friendly & Approachable", description: "Warm, welcoming design" },
        { value: "tech-futuristic", label: "Tech & Futuristic", description: "High-tech, cutting-edge look" },
        { value: "classic-elegant", label: "Classic & Elegant", description: "Timeless, sophisticated design" }
      ]
    },
    {
      id: "colorPreferences",
      title: "Any color preferences?",
      description: "Specify colors you want to use (optional)",
      type: "input" as const,
      placeholder: "e.g., Blue and white, earthy tones, brand colors #FF6B35..."
    },
    {
      id: "interactions",
      title: "What interactions do you want?",
      description: "Select the types of animations and interactions you'd like",
      type: "multiselect" as const,
      options: [
        "Hover effects on buttons/cards",
        "Smooth page transitions",
        "Loading animations",
        "Scroll-triggered animations",
        "Form validation feedback",
        "Modal/popup dialogs",
        "Drag and drop functionality",
        "Infinite scroll or pagination",
        "Auto-complete/suggestions",
        "Real-time updates",
        "Keyboard shortcuts",
        "Touch/swipe gestures"
      ]
    },
    {
      id: "responsive",
      title: "Responsive design requirements?",
      description: "How should your app work across different devices?",
      type: "multiselect" as const,
      options: [
        "Mobile-first design approach",
        "Tablet optimization",
        "Desktop focus with mobile support",
        "Touch-friendly interface",
        "Keyboard navigation support",
        "High-resolution/retina display support",
        "Offline mobile capabilities",
        "App-like mobile experience (PWA)"
      ]
    },
    {
      id: "additional",
      title: "Anything else important?",
      description: "Any specific requirements, constraints, or details we should know?",
      type: "textarea" as const,
      placeholder: "e.g., Must be accessible for screen readers, needs to integrate with Shopify, prefer dark theme..."
    }
  ];

  const generatePrompt = () => {
    const projectType = answers.projectType?.answer as string;
    const purpose = answers.purpose?.answer as string;
    const audience = answers.audience?.answer as string;
    const features = answers.features?.answer as string[];
    const designStyle = answers.designStyle?.answer as string;
    const colorPreferences = answers.colorPreferences?.answer as string;
    const interactions = answers.interactions?.answer as string[];
    const responsive = answers.responsive?.answer as string[];
    const additional = answers.additional?.answer as string;

    let prompt = "";

    // Project type and purpose
    if (projectType && purpose) {
      const typeLabel = questions[0].options?.find(opt => opt.value === projectType)?.label || projectType;
      prompt += `Create a ${typeLabel.toLowerCase()} that ${purpose.toLowerCase()}. `;
    }

    // Target audience
    if (audience) {
      prompt += `Design it for ${audience}. `;
    }

    // Features
    if (features && features.length > 0) {
      prompt += `Include these key features: ${features.join(", ")}. `;
    }

    // Design style
    if (designStyle) {
      const styleDesc = questions[4].options?.find(opt => opt.value === designStyle);
      prompt += `Use a ${styleDesc?.label.toLowerCase()} design approach - ${styleDesc?.description.toLowerCase()}. `;
    }

    // Colors
    if (colorPreferences) {
      prompt += `For colors, use ${colorPreferences}. `;
    }

    // Interactions
    if (interactions && interactions.length > 0) {
      prompt += `Add these interactions: ${interactions.join(", ")}. `;
    }

    // Responsive
    if (responsive && responsive.length > 0) {
      prompt += `For responsive design: ${responsive.join(", ")}. `;
    }

    // Additional requirements
    if (additional) {
      prompt += `Additional requirements: ${additional}`;
    }

    return prompt.trim();
  };

  useEffect(() => {
    const prompt = generatePrompt();
    setGeneratedPrompt(prompt);
  }, [answers]);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        question: question.title,
        answer,
        type: question.type
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast.success("Prompt copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy prompt");
    }
  };

  const resetBuilder = () => {
    setCurrentStep(0);
    setAnswers({});
    setGeneratedPrompt("");
    setIsComplete(false);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Your Prompt is Ready!
                </h1>
              </div>
              <p className="text-xl text-gray-600">
                Here's your custom-generated prompt based on your answers
              </p>
            </div>

            {/* Generated Prompt */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Generated Prompt
                </CardTitle>
                <CardDescription>
                  Copy this prompt and use it in Figma Make to create your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 mb-4">
                  <p className="text-gray-800 leading-relaxed">{generatedPrompt}</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={copyPrompt} className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Prompt
                  </Button>
                  <Button variant="outline" onClick={resetBuilder}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                  <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Summary of Answers */}
            <Card>
              <CardHeader>
                <CardTitle>Your Answers Summary</CardTitle>
                <CardDescription>
                  Review what you told us about your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(answers).map(([questionId, answer]) => (
                    <div key={questionId} className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{answer.question}</h4>
                      <div className="text-sm text-gray-600">
                        {Array.isArray(answer.answer) ? (
                          <div className="flex flex-wrap gap-1">
                            {answer.answer.map((item) => (
                              <Badge key={item} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p>{answer.answer}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8 text-emerald-600" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Build Your Perfect Prompt
                </h1>
                <p className="text-gray-600">Answer a few questions to generate a custom prompt</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Question Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold">
                      {currentStep + 1}
                    </div>
                    {currentQuestion.title}
                  </CardTitle>
                  <CardDescription>{currentQuestion.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentQuestion.type === "select" && (
                    <div className="space-y-3">
                      {currentQuestion.options?.map((option) => (
                        <div
                          key={option.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                            answers[currentQuestion.id]?.answer === option.value
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                          onClick={() => handleAnswer(currentQuestion.id, option.value)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{option.label}</h4>
                              <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              answers[currentQuestion.id]?.answer === option.value
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-gray-300'
                            }`}>
                              {answers[currentQuestion.id]?.answer === option.value && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === "multiselect" && (
                    <div className="space-y-2">
                      {currentQuestion.options?.map((option) => {
                        const currentAnswers = (answers[currentQuestion.id]?.answer as string[]) || [];
                        const isSelected = currentAnswers.includes(option);
                        
                        return (
                          <div
                            key={option}
                            className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                            onClick={() => {
                              const currentAnswers = (answers[currentQuestion.id]?.answer as string[]) || [];
                              const newAnswers = isSelected
                                ? currentAnswers.filter(a => a !== option)
                                : [...currentAnswers, option];
                              handleAnswer(currentQuestion.id, newAnswers);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox checked={isSelected} readOnly />
                              <span className="text-gray-700">{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {currentQuestion.type === "input" && (
                    <Input
                      placeholder={currentQuestion.placeholder}
                      value={(answers[currentQuestion.id]?.answer as string) || ""}
                      onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                      className="text-base"
                    />
                  )}

                  {currentQuestion.type === "textarea" && (
                    <Textarea
                      placeholder={currentQuestion.placeholder}
                      value={(answers[currentQuestion.id]?.answer as string) || ""}
                      onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                      className="min-h-[120px] text-base"
                    />
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!answers[currentQuestion.id]?.answer || 
                        (Array.isArray(answers[currentQuestion.id]?.answer) && 
                         (answers[currentQuestion.id]?.answer as string[]).length === 0)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                    >
                      {currentStep === questions.length - 1 ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Prompt
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Prompt Preview */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                  <CardDescription>
                    Your prompt updates as you answer questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-gray-50 to-emerald-50/50 p-4 rounded-lg border min-h-[200px]">
                    {generatedPrompt ? (
                      <p className="text-sm text-gray-700 leading-relaxed">{generatedPrompt}</p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        Start answering questions to see your prompt develop...
                      </p>
                    )}
                  </div>
                  
                  {generatedPrompt && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyPrompt}
                      className="w-full mt-4"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Current Prompt
                    </Button>
                  )}

                  {/* Progress Summary */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Answered Questions</h4>
                    <div className="space-y-2">
                      {questions.map((question, index) => (
                        <div
                          key={question.id}
                          className={`flex items-center gap-2 text-sm ${
                            answers[question.id] ? 'text-emerald-600' : 'text-gray-400'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            answers[question.id] ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}></div>
                          <span className={index === currentStep ? 'font-medium' : ''}>
                            {question.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}