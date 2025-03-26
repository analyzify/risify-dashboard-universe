
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ComponentSectionProps {
  title: string;
  children: React.ReactNode;
  showViewAll?: boolean;
  description?: string;
}

const ComponentSection: React.FC<ComponentSectionProps> = ({ 
  title, 
  children,
  showViewAll = false,
  description
}) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {showViewAll && (
          <Button variant="ghost" size="sm" className="text-sm">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="border rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default ComponentSection;
