
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  value: string;
  trend: string;
  description: string;
  icon: React.ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, value, trend, description, icon }) => {
  const isTrendPositive = trend.includes('+');
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="bg-muted/20 rounded-full p-1">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`text-sm font-medium ${isTrendPositive ? 'text-green-500' : trend.includes('-') ? 'text-red-500' : 'text-muted-foreground'}`}>
            {trend}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
