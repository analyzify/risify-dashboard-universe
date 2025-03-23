
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  className?: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  animate?: boolean;
  delay?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  className,
  title,
  icon,
  action,
  children,
  footer,
  animate = true,
  delay = 0,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md",
        animate && "opacity-0 animate-scale-in",
        `animation-delay-${delay * 100}`,
        className
      )}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <h3 className="font-medium text-card-foreground">{title}</h3>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-4 pt-3 border-t">{footer}</div>}
    </div>
  );
};

export default DashboardCard;
