
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutPanelRight, 
  TrendingUp, 
  BarChart2, 
  Globe, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Link2,
  HelpCircle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WorkspaceContext = () => {
  const [selectedKeyword, setSelectedKeyword] = useState("insulated water bottle");
  
  // Mock data for the selected keyword
  const keywordData = {
    keyword: "insulated water bottle",
    volume: 22000,
    difficulty: 67,
    cpc: 2.15,
    trends: [
      { month: "Jan", volume: 18500 },
      { month: "Feb", volume: 17800 },
      { month: "Mar", volume: 19200 },
      { month: "Apr", volume: 21000 },
      { month: "May", volume: 22400 },
      { month: "Jun", volume: 24800 }
    ],
    monthlyChange: 12.4,
    serp: [
      { position: 1, domain: "hydroflask.com", change: 0 },
      { position: 2, domain: "yeti.com", change: 1 },
      { position: 3, domain: "amazon.com", change: -1 },
      { position: 4, domain: "rei.com", change: 0 },
      { position: 5, domain: "thermoflask.com", change: 2 }
    ],
    relatedKeywords: [
      "best insulated water bottle",
      "stainless steel insulated water bottle",
      "insulated water bottle 32 oz",
      "vacuum insulated water bottle"
    ]
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Context Panel</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Details and insights for your selection</CardDescription>
        </CardHeader>
        
        {!selectedKeyword ? (
          <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <LayoutPanelRight className="h-10 w-10 mb-3 opacity-50" />
            <p className="mb-2">Select a keyword to see detailed information</p>
            <p className="text-xs">Insights, trends, and competitive data will appear here</p>
          </CardContent>
        ) : (
          <>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-md p-3">
                <div className="font-medium text-lg mb-1">{keywordData.keyword}</div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Volume</div>
                    <div className="font-medium">{keywordData.volume.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Difficulty</div>
                    <div className="font-medium">{keywordData.difficulty}/100</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">CPC</div>
                    <div className="font-medium">${keywordData.cpc.toFixed(2)}</div>
                  </div>
                </div>
              </div>
              
              {/* Trend chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    6 Month Trend
                  </div>
                  <div className={`text-xs font-medium flex items-center ${keywordData.monthlyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {keywordData.monthlyChange > 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {keywordData.monthlyChange > 0 ? '+' : ''}{keywordData.monthlyChange}%
                  </div>
                </div>
                
                <div style={{ width: '100%', height: 120 }}>
                  <ResponsiveContainer>
                    <BarChart data={keywordData.trends}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="volume" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* SERP positions */}
              <div>
                <div className="text-sm font-medium flex items-center gap-1 mb-2">
                  <Globe className="h-4 w-4" />
                  Top SERP Results
                </div>
                
                <div className="space-y-2">
                  {keywordData.serp.map((result, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md px-2 py-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">
                          {result.position}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Link2 className="h-3 w-3 text-muted-foreground" />
                          {result.domain}
                        </span>
                      </div>
                      <div className={
                        result.change > 0 
                          ? 'text-green-600' 
                          : result.change < 0 
                            ? 'text-red-600' 
                            : 'text-muted-foreground'
                      }>
                        {result.change > 0 && '+'}
                        {result.change !== 0 && result.change}
                        {result.change === 0 && '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Related keywords */}
              <div>
                <div className="text-sm font-medium flex items-center gap-1 mb-2">
                  <Search className="h-4 w-4" />
                  Related Keywords
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {keywordData.relatedKeywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outline" size="sm" className="gap-1">
                <BarChart2 className="h-4 w-4" />
                More Data
              </Button>
              <Button size="sm">Add to Cluster</Button>
            </CardFooter>
          </>
        )}
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Analyze Seasonal Patterns</p>
              <p className="text-muted-foreground">Check the Trends tab to plan content ahead of peak seasons</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <HelpCircle className="h-3.5 w-3.5" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Balance Your Intent Mix</p>
              <p className="text-muted-foreground">Aim for keywords across different stages of the buying journey</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Link2 className="h-3.5 w-3.5" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Map Keywords to Content</p>
              <p className="text-muted-foreground">Use the Mapping tool to connect keywords to your pages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceContext;
