
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Search, Award, BarChart, ArrowUp, ArrowDown, LineChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveLine } from "recharts";
import { cn } from "@/lib/utils";

const ResultsAndImpact = () => {
  // Position distribution data
  const positionData = [
    { label: "Top 3", count: 28, percentage: 28, new: 3, lost: 2, color: "#4299e1" },
    { label: "Top 10", count: 58, percentage: 58, new: 1, lost: 5, color: "#38b2ac" },
    { label: "Top 20", count: 89, percentage: 89, new: 4, lost: 2, color: "#4c51bf" },
    { label: "Top 100", count: 105, percentage: 100, new: 2, lost: 2, color: "#667eea" },
  ];

  // Dummy data for trend lines
  const trendData = [
    {
      id: "trendLine",
      data: [
        { x: 0, y: 50 },
        { x: 1, y: 55 },
        { x: 2, y: 40 },
        { x: 3, y: 65 },
        { x: 4, y: 60 },
        { x: 5, y: 70 },
        { x: 6, y: 62 },
      ],
    },
  ];

  return (
    <Layout title="Results & Impact">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Results & Impact</h1>
          <p className="text-muted-foreground mt-2">
            Measure the impact of your optimization efforts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp size={18} className="mr-2 text-green-500" />
                Traffic Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">+24%</div>
              <p className="text-sm text-muted-foreground">vs. last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Search size={18} className="mr-2 text-blue-500" />
                Keyword Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">18</div>
              <p className="text-sm text-muted-foreground">new page 1 rankings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award size={18} className="mr-2 text-purple-500" />
                Completed Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">12</div>
              <p className="text-sm text-muted-foreground">this month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Position Distribution</CardTitle>
              <CardDescription>Keyword ranking overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {positionData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-2xl font-bold" style={{ color: item.color }}>{item.count}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ArrowUp className="h-3 w-3 text-green-500" />
                        <span>New: {item.new}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowDown className="h-3 w-3 text-red-500" />
                        <span>Lost: {item.lost}</span>
                      </div>
                    </div>
                    
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 ease-in-out"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                    
                    <div className="h-10 w-full">
                      <div className="w-full h-full bg-blue-50 rounded-md relative">
                        <div className="absolute inset-0 flex items-center justify-end px-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            index % 2 === 0 ? "bg-red-500" : "bg-gray-400"
                          )}></div>
                        </div>
                        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                          <path 
                            d="M0,10 Q20,5 40,12 T80,8 T100,10" 
                            fill="none" 
                            stroke={item.color}
                            strokeWidth="1.5"
                            className="opacity-70"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Improved vs. declined</div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="text-xl font-bold text-green-500 mr-2">36</div>
                    <div className="relative h-2 flex-1 rounded-full bg-gray-200">
                      <div className="absolute inset-y-0 left-0 bg-green-500 rounded-l-full" style={{ width: '52%' }}></div>
                      <div className="absolute inset-y-0 right-0 bg-red-500 rounded-r-full" style={{ width: '48%' }}></div>
                    </div>
                    <div className="text-xl font-bold text-red-500 ml-2">34</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Position Changes</CardTitle>
              <CardDescription>Rankings trend over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4 h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium">Keywords</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Traffic</span>
                    </div>
                  </div>
                  <select className="px-2 py-1 text-sm rounded border border-gray-200">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                
                <div className="h-[450px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-lg border p-4">
                  <LineChart className="text-muted-foreground" />
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <span>Position change chart would display here with more detailed analytics</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="keywords">
          <TabsList className="mb-6">
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Performance</CardTitle>
                <CardDescription>Tracking progress of your target keywords over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <BarChart size={48} />
                  <span className="ml-4">Keyword ranking chart would display here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="traffic">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Growth</CardTitle>
                <CardDescription>Organic traffic trends following optimization tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <BarChart size={48} />
                  <span className="ml-4">Traffic trend chart would display here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
                <CardDescription>Track how optimized pages are performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <BarChart size={48} />
                  <span className="ml-4">Page performance metrics would display here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion</CardTitle>
                <CardDescription>Track task completion and impact over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <BarChart size={48} />
                  <span className="ml-4">Task completion metrics would display here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResultsAndImpact;
