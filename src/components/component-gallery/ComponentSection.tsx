
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ComponentSectionProps {
  title: string;
  children: React.ReactNode;
  showViewAll?: boolean;
}

const ComponentSection: React.FC<ComponentSectionProps> = ({ 
  title, 
  children,
  showViewAll = false 
}) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" size="sm" className="text-sm">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
};

export default ComponentSection;
