
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CompletionIndicatorProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const CompletionIndicator = ({
  percentage,
  size = "md",
  showLabel = true,
  className,
}: CompletionIndicatorProps) => {
  const getColorClass = () => {
    if (percentage < 40) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <Progress
        value={percentage}
        className={cn(sizeClasses[size], getColorClass())}
      />
      {showLabel && (
        <p className="text-xs text-muted-foreground text-right">
          {percentage}% Complete
        </p>
      )}
    </div>
  );
};

export default CompletionIndicator;
