
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "./Button";

interface TaskItemProps {
  className?: string;
  title: string;
  description: string;
  progress?: number;
  completed?: boolean;
  impact?: "low" | "medium" | "high";
  onClick?: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  className,
  title,
  description,
  progress = 0,
  completed = false,
  impact = "medium",
  onClick,
}) => {
  const impactColors = {
    low: "bg-blue-50 text-blue-600",
    medium: "bg-amber-50 text-amber-600",
    high: "bg-green-50 text-green-600",
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all duration-200 hover:shadow-sm",
        completed ? "bg-muted/30" : "bg-card",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {completed ? (
            <CheckCircle className="h-5 w-5 text-risify-green mt-0.5" />
          ) : (
            <div className="relative h-5 w-5 mt-0.5">
              <div className="absolute inset-0 rounded-full border-2 border-muted"></div>
              <div
                className="absolute inset-0 rounded-full border-2 border-primary"
                style={{
                  clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0% 100%)`,
                }}
              ></div>
            </div>
          )}
          
          <div>
            <div className="flex items-center space-x-2">
              <h4 className={cn(
                "font-medium",
                completed ? "text-muted-foreground line-through" : "text-foreground"
              )}>
                {title}
              </h4>
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                impactColors[impact]
              )}>
                {impact} impact
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full h-8 w-8 p-0"
          onClick={onClick}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {!completed && progress > 0 && (
        <div className="mt-3 w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
