
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  title: string;
  image: string;
  price: string;
  featured?: boolean;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ 
  title, 
  image, 
  price,
  featured = false
}) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md group", 
      featured && "ring-2 ring-primary ring-offset-2"
    )}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <span className={cn(
            "text-sm font-bold",
            price === "Free" ? "text-green-600" : "text-primary"
          )}>
            {price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentCard;
