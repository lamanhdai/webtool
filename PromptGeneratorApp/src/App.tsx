import { useState, useMemo } from "react";
import { PromptCard } from "./components/PromptCard";
import { FilterBar } from "./components/FilterBar";
import { CategoryStats } from "./components/CategoryStats";
import { PromptDetail } from "./components/PromptDetail";
import { LearnToPrompt } from "./components/LearnToPrompt";
import { TagDetail } from "./components/TagDetail";
import { PromptBuilder } from "./components/PromptBuilder";
import { promptExamples, categories, type PromptExample } from "./data/prompts";
import { Toaster } from "./components/ui/sonner";
import { Wand2, Sparkles, BookOpen, Grid3X3, Palette, Layers, Bot } from "lucide-react";
import { Button } from "./components/ui/button";
import { toast } from "sonner@2.0.3";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrompt, setSelectedPrompt] = useState<PromptExample | null>(null);
  const [currentView, setCurrentView] = useState<"gallery" | "learn" | "builder" | "tagDetail">("gallery");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return promptExamples.filter((prompt) => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categoryStats = useMemo(() => {
    return categories.map(category => ({
      name: category,
      count: promptExamples.filter(p => p.category === category).length
    }));
  }, []);

  // Show detailed view if a prompt is selected
  if (selectedPrompt) {
    return (
      <PromptDetail 
        prompt={selectedPrompt} 
        onBack={() => setSelectedPrompt(null)}
        relatedPrompts={promptExamples.filter(p => 
          p.category === selectedPrompt.category && p.id !== selectedPrompt.id
        ).slice(0, 3)}
      />
    );
  }

  // Show learn section if selected
  if (currentView === "learn") {
    return <LearnToPrompt onBack={() => setCurrentView("gallery")} />;
  }

  // Show prompt builder if selected
  if (currentView === "builder") {
    return <PromptBuilder onBack={() => setCurrentView("gallery")} />;
  }

  // Show tag detail if selected
  if (currentView === "tagDetail" && selectedTag) {
    return <TagDetail tag={selectedTag} onBack={() => {
      setCurrentView("gallery");
      setSelectedTag(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Wand2 className="w-10 h-10 text-blue-600 animate-bounce" style={{animationDelay: '0.5s'}} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Figma Make Prompt Gallery
            </h1>
            <div className="relative">
              <Sparkles className="w-10 h-10 text-purple-600 animate-bounce" style={{animationDelay: '1s'}} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-xl text-gray-600 mb-4">
              Discover the perfect prompt to create exactly what you want. Browse our comprehensive collection 
              of examples across every category, from landing pages to complex applications.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full">✨ 40 Prompt Examples</span>
              <span className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-3 py-1 rounded-full">🤖 AI Prompt Builder</span>
              <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1 rounded-full">🎯 Interactive Learning</span>
              <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full">🚀 Instant Copy & Use</span>
            </div>
          </div>
          
          {/* Enhanced Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              variant={currentView === "gallery" ? "default" : "outline"}
              onClick={() => setCurrentView("gallery")}
              className="flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Grid3X3 className="w-4 h-4" />
              Prompt Gallery
            </Button>
            <Button 
              variant={currentView === "builder" ? "default" : "outline"}
              onClick={() => setCurrentView("builder")}
              className="flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
            >
              <Bot className="w-4 h-4" />
              Build My Prompt
            </Button>
            <Button 
              variant={currentView === "learn" ? "default" : "outline"}
              onClick={() => setCurrentView("learn")}
              className="flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              Learn to Prompt
            </Button>
          </div>
        </div>

        {/* Category Stats */}
        <CategoryStats 
          categories={categoryStats} 
          totalPrompts={promptExamples.length} 
          onCategoryClick={(category) => {
            setSelectedCategory(category);
            window.scrollTo({ top: 400, behavior: 'smooth' });
            toast.success(`Filtering by ${category}`);
          }}
        />

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Results */}
        <div className="mt-8">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Wand2 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No prompts found</h3>
              <p className="text-gray-500">Try adjusting your search terms or selecting a different category.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {filteredPrompts.length} {filteredPrompts.length === 1 ? 'Prompt' : 'Prompts'} Found
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedCategory !== "all" && `Filtered by ${selectedCategory}`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrompts.map((prompt) => (
                  <PromptCard 
                    key={prompt.id} 
                    {...prompt} 
                    onViewDetails={() => setSelectedPrompt(prompt)}
                    onTagClick={(tag) => {
                      setSelectedTag(tag);
                      setCurrentView("tagDetail");
                    }}
                    onCategoryClick={(category) => {
                      setSelectedCategory(category);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      toast.success(`Filtering by ${category}`);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t pt-8">
          <p className="text-gray-500 mb-4">
            Can't find what you're looking for? Try our AI-powered prompt builder to create a custom prompt tailored to your exact needs.
          </p>
          
          {/* CTA for Prompt Builder */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Bot className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-semibold text-emerald-900">Need a Custom Prompt?</h3>
            </div>
            <p className="text-emerald-800 mb-4">
              Answer a few simple questions and our AI will generate the perfect prompt for your project.
            </p>
            <Button 
              onClick={() => setCurrentView("builder")}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
            >
              <Bot className="w-4 h-4 mr-2" />
              Build My Custom Prompt
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-sm text-gray-400">Pro tips:</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Be specific about features</span>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Mention design preferences</span>
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Include interactivity details</span>
            <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">Specify target audience</span>
          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}