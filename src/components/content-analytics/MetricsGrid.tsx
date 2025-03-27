
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarMetric from "./BarMetric";

interface MetricsGridProps {
  title: string;
  data: Array<{
    [key: string]: any;
  }>;
  valueKey: string;
  comparisonKey: string;
  labelKey: string;
  valueFormatter?: (value: number) => string;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({
  title,
  data,
  valueKey,
  comparisonKey,
  labelKey,
  valueFormatter = (value) => value.toString(),
}) => {
  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => b[valueKey] - a[valueKey]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedData.map((item, index) => {
          const value = item[valueKey];
          const previousValue = item[comparisonKey];
          const label = item[labelKey];
          const percentChange = previousValue 
            ? Math.round(((value - previousValue) / previousValue) * 100) 
            : 0;
          
          return (
            <BarMetric
              key={index}
              label={label}
              value={value}
              previousValue={previousValue}
              percentChange={percentChange}
              valueFormatter={valueFormatter}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default MetricsGrid;
