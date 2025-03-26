
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  trend: "up" | "down" | "neutral";
  change?: number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  change = 0,
  icon,
  description,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <div className="flex items-center text-xs">
          {trend === "up" && (
            <div className="flex items-center gap-1 text-red-600">
              <ArrowUpIcon className="h-3 w-3" />
              <span>+{change}</span>
            </div>
          )}
          {trend === "down" && (
            <div className="flex items-center gap-1 text-green-600">
              <ArrowDownIcon className="h-3 w-3" />
              <span>-{change}</span>
            </div>
          )}
          <span className="ml-2 text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
