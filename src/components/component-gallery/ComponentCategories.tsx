
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  Star, 
  TrendingUp, 
  Sparkles, 
  Gift, 
  Timer, 
  Award, 
  TestTube, 
  ScrollText, 
  LayoutTemplate, 
  Search as SearchIcon, 
  Type, 
  Image
} from "lucide-react";

interface CategoryProps {
  icon: React.ReactNode;
  label: string;
}

const CategoryButton: React.FC<CategoryProps> = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-accent transition-colors">
      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-xs text-center font-medium">{label}</span>
    </button>
  );
};

const ComponentCategories = () => {
  const categories = [
    { icon: <Star className="h-5 w-5" />, label: "Popular" },
    { icon: <TrendingUp className="h-5 w-5" />, label: "Trending" },
    { icon: <Sparkles className="h-5 w-5" />, label: "Newest" },
    { icon: <Gift className="h-5 w-5" />, label: "Free" },
    { icon: <Timer className="h-5 w-5" />, label: "Countdown" },
    { icon: <Award className="h-5 w-5" />, label: "Features" },
    { icon: <TestTube className="h-5 w-5" />, label: "Testimonial" },
    { icon: <ScrollText className="h-5 w-5" />, label: "Scrolling" },
    { icon: <LayoutTemplate className="h-5 w-5" />, label: "Hero" },
    { icon: <SearchIcon className="h-5 w-5" />, label: "Search" },
    { icon: <Type className="h-5 w-5" />, label: "Text" },
    { icon: <Image className="h-5 w-5" />, label: "Images" },
  ];

  return (
    <div className="mb-10">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/6 lg:basis-1/8">
              <CategoryButton icon={category.icon} label={category.label} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default ComponentCategories;
