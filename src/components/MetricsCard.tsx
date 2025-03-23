
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export interface MetricsCardProps {
  className?: string;
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  change?: number;
  icon?: React.ReactNode;
  animate?: string;
  delay?: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  className,
  title,
  value,
  trend,
  change = 0,
  icon,
  animate,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl border p-6 shadow-sm",
        animate && `animate-${animate}`,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="flex items-center text-xs">
        {trend === "up" && (
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUpIcon className="h-3 w-3" />
            <span>+{change}%</span>
          </div>
        )}
        {trend === "down" && (
          <div className="flex items-center gap-1 text-red-600">
            <ArrowDownIcon className="h-3 w-3" />
            <span>-{change}%</span>
          </div>
        )}
        <span className="ml-1 text-muted-foreground">vs last period</span>
      </div>
    </div>
  );
};

export default MetricsCard;
