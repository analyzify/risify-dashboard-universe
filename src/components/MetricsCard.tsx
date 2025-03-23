
import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricsCardProps {
  className?: string;
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  loading?: boolean;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  className,
  title,
  value,
  change,
  trend,
  icon,
  loading = false,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 bg-card transition-all duration-200 hover:bg-card/80",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          {loading ? (
            <div className="h-7 w-24 animate-pulse rounded bg-muted"></div>
          ) : (
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {value}
            </h3>
          )}
        </div>
        {icon && (
          <div className="rounded-full p-2 bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && trend && (
        <div className="mt-2 flex items-center text-xs">
          {trend === "up" ? (
            <>
              <TrendingUp className="mr-1 h-3 w-3 text-risify-green" />
              <span className="text-risify-green font-medium">
                {Math.abs(change)}%
              </span>
            </>
          ) : trend === "down" ? (
            <>
              <TrendingDown className="mr-1 h-3 w-3 text-risify-red" />
              <span className="text-risify-red font-medium">
                {Math.abs(change)}%
              </span>
            </>
          ) : null}
          <span className="ml-1 text-muted-foreground">from last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
