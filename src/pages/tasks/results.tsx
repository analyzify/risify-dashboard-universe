
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Search, Award, BarChart } from "lucide-react";

const ResultsAndImpact = () => {
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
