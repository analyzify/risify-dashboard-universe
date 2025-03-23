
import React from "react";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PerformanceChartProps {
  className?: string;
  data: any[];
  height?: number;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  className,
  data,
  height = 300
}) => {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12 }} 
            width={40}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="traffic" 
            stroke="#2E7DFA" 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            type="monotone" 
            dataKey="rankings" 
            stroke="#6366F1" 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            type="monotone" 
            dataKey="conversions" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
