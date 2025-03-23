
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ArrowRight, 
  Download, 
  Save, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart3
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock seasonal trend data
const seasonalData = [
  { name: "Jan", volume: 7500, lastYear: 6800 },
  { name: "Feb", volume: 8200, lastYear: 7200 },
  { name: "Mar", volume: 9800, lastYear: 8500 },
  { name: "Apr", volume: 12500, lastYear: 10800 },
  { name: "May", volume: 15200, lastYear: 13500 },
  { name: "Jun", volume: 18400, lastYear: 16200 },
  { name: "Jul", volume: 21000, lastYear: 18500 },
  { name: "Aug", volume: 19500, lastYear: 17200 },
  { name: "Sep", volume: 15800, lastYear: 14500 },
  { name: "Oct", volume: 12300, lastYear: 11800 },
  { name: "Nov", volume: 11200, lastYear: 10500 },
  { name: "Dec", volume: 13500, lastYear: 12200 }
];

// Peak months calculation
const getPeakMonths = () => {
  const sortedData = [...seasonalData].sort((a, b) => b.volume - a.volume);
  return sortedData.slice(0, 3).map(item => item.name);
};

// Year-over-year calculation
const getYoYChange = () => {
  const totalThisYear = seasonalData.reduce((sum, item) => sum + item.volume, 0);
  const totalLastYear = seasonalData.reduce((sum, item) => sum + item.lastYear, 0);
  const percentChange = ((totalThisYear - totalLastYear) / totalLastYear) * 100;
  return percentChange.toFixed(1);
};

// Seasonality score calculation (simple version)
const getSeasonalityScore = () => {
  const volumes = seasonalData.map(item => item.volume);
  const max = Math.max(...volumes);
  const min = Math.min(...volumes);
  const avg = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;
  
  // Score from 0-10 based on variation
  const variationFactor = (max - min) / avg;
  return Math.min(Math.round(variationFactor * 10), 10);
};

const SeasonalTrends = () => {
  const [selectedKeyword, setSelectedKeyword] = useState("water bottles");
  const [dateRange, setDateRange] = useState("12months");
  const [compareLastYear, setCompareLastYear] = useState(true);
  
  const peakMonths = getPeakMonths();
  const yoyChange = getYoYChange();
  const seasonalityScore = getSeasonalityScore();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="w-full max-w-xs">
          <Select defaultValue="water bottles">
            <SelectTrigger>
              <SelectValue placeholder="Select keyword" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="water bottles">water bottles</SelectItem>
              <SelectItem value="eco-friendly water bottles">eco-friendly water bottles</SelectItem>
              <SelectItem value="insulated water bottle">insulated water bottle</SelectItem>
              <SelectItem value="stainless steel water bottle">stainless steel water bottle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">Period:</div>
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setDateRange("12months")}
              className={`px-3 py-1 text-sm ${dateRange === "12months" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              12 Months
            </button>
            <button
              onClick={() => setDateRange("24months")}
              className={`px-3 py-1 text-sm ${dateRange === "24months" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              24 Months
            </button>
            <button
              onClick={() => setDateRange("5years")}
              className={`px-3 py-1 text-sm ${dateRange === "5years" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              5 Years
            </button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={compareLastYear ? "bg-muted" : ""}
            onClick={() => setCompareLastYear(!compareLastYear)}
          >
            Compare YoY
          </Button>
        </div>
      </div>
      
      {/* Main chart */}
      <div className="rounded-lg border p-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Seasonal Trends for "{selectedKeyword}"</h3>
          <p className="text-sm text-muted-foreground">Monthly search volume patterns over time</p>
        </div>
        
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={seasonalData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis width={60} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="volume" 
                name="This Year" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 7, strokeWidth: 1 }}
              />
              {compareLastYear && (
                <Line 
                  type="monotone" 
                  dataKey="lastYear" 
                  name="Last Year" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  activeDot={{ r: 7, strokeWidth: 1 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-6 pt-2 border-t">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Peak Months</div>
            <div className="flex gap-1">
              {peakMonths.map((month, index) => (
                <Badge key={index} className="bg-primary">{month}</Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Year-over-Year Change</div>
            <div className={`font-medium ${parseFloat(yoyChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="flex items-center">
                {parseFloat(yoyChange) > 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {parseFloat(yoyChange) > 0 ? '+' : ''}{yoyChange}%
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Seasonality Score</div>
            <div className="font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-1 text-primary" />
              {seasonalityScore}/10
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Search Volume Range</div>
            <div className="font-medium">
              {Math.min(...seasonalData.map(d => d.volume)).toLocaleString()} - {Math.max(...seasonalData.map(d => d.volume)).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights & Recommendations */}
      <div className="rounded-lg border">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="font-medium">Insights & Planning Recommendations</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium">Content Planning</h4>
              <p className="text-sm text-muted-foreground">
                Plan your content 3 months ahead of peak seasons in {peakMonths.join(", ")} to maximize organic visibility.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium">Growth Potential</h4>
              <p className="text-sm text-muted-foreground">
                This keyword shows {parseFloat(yoyChange) > 0 ? 'positive' : 'negative'} YoY growth of {yoyChange}%, indicating {parseFloat(yoyChange) > 0 ? 'increasing' : 'decreasing'} interest.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-medium">Seasonality Strategy</h4>
              <p className="text-sm text-muted-foreground">
                With a seasonality score of {seasonalityScore}/10, this keyword has 
                {seasonalityScore > 7 ? 'strong' : seasonalityScore > 4 ? 'moderate' : 'minimal'} 
                seasonal patterns. {seasonalityScore > 7 ? 'Consider seasonal campaigns and content updates.' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
        <Button variant="outline" className="gap-1">
          <Save className="h-4 w-4" />
          Save to Report
        </Button>
      </div>
    </div>
  );
};

export default SeasonalTrends;
