import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface CategoryStatsProps {
  categories: { name: string; count: number }[];
  totalPrompts: number;
  onCategoryClick?: (category: string) => void;
}

export function CategoryStats({ categories, totalPrompts, onCategoryClick }: CategoryStatsProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-gray-600">
            {totalPrompts} total prompts across categories:
          </span>
          {categories.map((category) => (
            <Badge 
              key={category.name} 
              variant="outline" 
              className="text-xs cursor-pointer transition-all duration-200 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 hover:scale-105"
              onClick={() => onCategoryClick?.(category.name)}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}