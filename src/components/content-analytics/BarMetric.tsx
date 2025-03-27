
import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BarMetricProps {
  label: string;
  value: number;
  previousValue: number;
  percentChange: number;
  maxWidth?: number;
  valueFormatter?: (value: number) => string;
}

const BarMetric: React.FC<BarMetricProps> = ({
  label,
  value,
  previousValue,
  percentChange,
  maxWidth = 100,
  valueFormatter = (value) => value.toString(),
}) => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [previousWidth, setPreviousWidth] = useState(0);

  useEffect(() => {
    // Find the maximum value to calculate relative widths
    const maxValue = Math.max(value, previousValue);
    
    // Set width percentages based on the maxValue
    setCurrentWidth(maxValue > 0 ? (value / maxValue) * maxWidth : 0);
    setPreviousWidth(maxValue > 0 ? (previousValue / maxValue) * maxWidth : 0);
  }, [value, previousValue, maxWidth]);

  const isPositive = percentChange > 0;
  const isNeutral = percentChange === 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-medium text-sm truncate max-w-[70%]" title={label}>
          {label}
        </div>
        <div className="flex items-center text-sm">
          {!isNeutral && (
            <>
              {isPositive ? (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span
                className={cn(
                  "mr-2",
                  isPositive && "text-green-500",
                  !isPositive && !isNeutral && "text-red-500"
                )}
              >
                {isPositive && "+"}{percentChange}%
              </span>
            </>
          )}
          {isNeutral && <span className="mr-2 text-muted-foreground">—</span>}
          <span className="font-medium">{valueFormatter(value)}</span>
        </div>
      </div>
      <div className="relative h-5">
        {/* Previous period bar (shown below) */}
        <div 
          className="absolute left-0 h-2 bg-blue-200 rounded"
          style={{ width: `${previousWidth}%` }}
        />
        {/* Current period bar (shown on top) */}
        <div 
          className="absolute left-0 h-2 bg-blue-500 rounded" 
          style={{ width: `${currentWidth}%` }}
        />
      </div>
    </div>
  );
};

export default BarMetric;
