
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronDown, 
  Download, 
  Calendar, 
  TrendingUp,
  TrendingDown 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface SeasonalTrendsProps {
  keywords: any[];
  onSelectKeyword: (keyword: any) => void;
}

const SeasonalTrends: React.FC<SeasonalTrendsProps> = ({ 
  keywords,
  onSelectKeyword
}) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    keywords.slice(0, 3).map(k => k.id)
  );
  
  const [yearRange, setYearRange] = useState("current");
  
  // Generate mock data for the seasonal trends
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const generateTrendData = (keyword: string, seed: number) => {
    return months.map((month, index) => {
      // Create a somewhat realistic seasonal pattern
      let volume = 1000 + Math.sin((index + seed) * 0.5) * 800 + Math.random() * 200;
      // Add some noise
      volume = Math.max(100, Math.round(volume));
      
      return {
        month,
        [keyword]: volume,
      };
    });
  };
  
  const trendData = {
    "product customization": generateTrendData("product customization", 2),
    "custom design tool": generateTrendData("custom design tool", 4),
    "personalized products": generateTrendData("personalized products", 6),
    "design templates": generateTrendData("design templates", 3),
    "product editor": generateTrendData("product editor", 5)
  };
  
  const combinedData = months.map((month, i) => {
    const result: any = { month };
    Object.keys(trendData).forEach(keyword => {
      if (selectedKeywords.includes(keyword)) {
        result[keyword] = trendData[keyword][i][keyword];
      }
    });
    return result;
  });
  
  // Colors for the lines
  const lineColors = [
    "#8B5CF6", "#3B82F6", "#EC4899", "#F97316", "#10B981"
  ];
  
  // Find peak months for each keyword
  const findPeakMonth = (keyword: string) => {
    const data = trendData[keyword];
    if (!data) return "N/A";
    
    let maxVolume = 0;
    let peakMonth = "";
    
    data.forEach(item => {
      if (item[keyword] > maxVolume) {
        maxVolume = item[keyword];
        peakMonth = item.month;
      }
    });
    
    return peakMonth;
  };
  
  const getTrendStrength = (keyword: string) => {
    const data = trendData[keyword];
    if (!data) return 0;
    
    const volumes = data.map(item => item[keyword]);
    const min = Math.min(...volumes);
    const max = Math.max(...volumes);
    
    // Calculate how strong the seasonal trend is (0-100%)
    return Math.round(((max - min) / max) * 100);
  };
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Seasonal Keyword Trends</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{yearRange === "current" ? "Current Year" : "YoY Comparison"}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(trendData).slice(0, 3).map((keyword, index) => {
          const peakMonth = findPeakMonth(keyword);
          const trendStrength = getTrendStrength(keyword);
          
          return (
            <Card key={keyword} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{keyword}</span>
                  <Badge 
                    variant={trendStrength > 50 ? "default" : "outline"}
                    className={trendStrength > 50 ? "bg-purple-100 text-purple-700 border-purple-300" : ""}
                  >
                    {trendStrength}% Seasonality
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData[keyword]}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <Line 
                        type="monotone" 
                        dataKey={keyword} 
                        stroke={lineColors[index % lineColors.length]} 
                        strokeWidth={2}
                        dot={false}
                      />
                      <XAxis dataKey="month" tick={false} axisLine={false} />
                      <YAxis hide={true} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Peak: {peakMonth}</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span>+12% YoY</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Trend Comparison</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div style={{ height: '300px' }}>
            <ChartContainer 
              config={{
                "product customization": { color: lineColors[0] },
                "custom design tool": { color: lineColors[1] },
                "personalized products": { color: lineColors[2] },
                "design templates": { color: lineColors[3] },
                "product editor": { color: lineColors[4] }
              }}
            >
              <LineChart
                data={combinedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {Object.keys(trendData).slice(0, 5).map((keyword, index) => (
                  selectedKeywords.includes(keyword) && (
                    <Line 
                      key={keyword}
                      type="monotone" 
                      dataKey={keyword} 
                      stroke={lineColors[index % lineColors.length]} 
                      strokeWidth={2}
                      dot={true}
                    />
                  )
                ))}
              </LineChart>
            </ChartContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.keys(trendData).map((keyword, index) => (
              <Button
                key={keyword}
                variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
                size="sm"
                className="text-xs"
                style={selectedKeywords.includes(keyword) 
                  ? { backgroundColor: lineColors[index % lineColors.length], color: 'white' } 
                  : {}}
                onClick={() => {
                  if (selectedKeywords.includes(keyword)) {
                    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
                  } else {
                    setSelectedKeywords([...selectedKeywords, keyword]);
                  }
                }}
              >
                {keyword}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonalTrends;
