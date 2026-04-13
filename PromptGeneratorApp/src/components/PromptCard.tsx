import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Copy, Wand2, ArrowRight } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PromptCardProps {
  title: string;
  description: string;
  prompt: string;
  category: string;
  imageUrl: string;
  tags: string[];
  onViewDetails?: () => void;
  onTagClick?: (tag: string) => void;
  onCategoryClick?: (category: string) => void;
}

export function PromptCard({ title, description, prompt, category, imageUrl, tags, onViewDetails, onTagClick, onCategoryClick }: PromptCardProps) {
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success("Prompt copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy prompt");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
      <div className="aspect-video relative overflow-hidden cursor-pointer" onClick={onViewDetails}>
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className="bg-white/95 text-gray-800 backdrop-blur-sm border-0 shadow-md cursor-pointer transition-all duration-200 hover:bg-blue-100 hover:text-blue-800 hover:scale-110" 
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick?.(category);
            }}
          >
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Wand2 className="w-5 h-5 text-white drop-shadow-lg" />
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs cursor-pointer transition-all duration-200 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 hover:scale-105"
              onClick={() => onTagClick?.(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 rounded-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
          <p className="text-sm text-gray-700 italic leading-relaxed">"{prompt}"</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={copyPrompt} 
            variant="outline" 
            size="sm" 
            className="flex-1 transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button 
            onClick={onViewDetails} 
            variant="outline" 
            size="sm" 
            className="flex-1 transition-all duration-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}