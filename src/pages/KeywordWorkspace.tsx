
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Save, 
  Download, 
  Share2, 
  Settings, 
  FileText, 
  Plus, 
  Filter, 
  Lightbulb,
  Layers, 
  ArrowUpRight,
  Calendar, 
  FileBarChart,
  Tag,
  LayoutGrid,
  ListTree,
  HelpCircle
} from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import KeywordDiscovery from "@/components/keyword-workspace/KeywordDiscovery";
import KeywordClusters from "@/components/keyword-workspace/KeywordClusters";
import SeasonalTrends from "@/components/keyword-workspace/SeasonalTrends";
import IntentAnalysis from "@/components/keyword-workspace/IntentAnalysis";
import KeywordMapping from "@/components/keyword-workspace/KeywordMapping";
import WorkspaceContext from "@/components/keyword-workspace/WorkspaceContext";

const KeywordWorkspace = () => {
  const [activeTab, setActiveTab] = useState("discovery");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [seedKeyword, setSeedKeyword] = useState("");
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout title="Keyword Workspace">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Keyword Workspace</h1>
            <p className="mt-1 text-muted-foreground">
              Discover, analyze, and organize keywords to build your SEO strategy
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Main workspace layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left panel */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Workspace</CardTitle>
                <CardDescription>Current research and selections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Selected Keywords</div>
                  {selectedKeywords.length > 0 ? (
                    <div className="space-y-1">
                      {selectedKeywords.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between text-sm px-2 py-1 bg-muted rounded-md">
                          <span>{keyword}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">×</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground px-2 py-1">
                      No keywords selected. Start by discovering keywords in the workspace.
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Saved Clusters</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                      <span>Product Features</span>
                      <Badge variant="outline" className="text-xs">12</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm px-2 py-1 bg-purple-50 text-purple-700 rounded-md">
                      <span>Comparison Terms</span>
                      <Badge variant="outline" className="text-xs">8</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm px-2 py-1 bg-green-50 text-green-700 rounded-md">
                      <span>Buying Guides</span>
                      <Badge variant="outline" className="text-xs">15</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <FileText className="h-4 w-4" />
                    Import Keywords
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start gap-1">
                  <Tag className="h-4 w-4" />
                  High Volume Keywords
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  Low Competition
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-1">
                  <Lightbulb className="h-4 w-4" />
                  Opportunity Keywords
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-1">
                  <Calendar className="h-4 w-4" />
                  Seasonal Trending
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main workspace area */}
          <div className="col-span-12 md:col-span-6">
            <Card className="h-full">
              <CardHeader className="pb-0">
                <Tabs defaultValue="discovery" className="w-full" onValueChange={handleTabChange}>
                  <TabsList className="w-full grid grid-cols-5">
                    <TabsTrigger value="discovery" className="text-xs sm:text-sm">
                      <Search className="h-4 w-4 mr-1 hidden sm:inline" />
                      Discovery
                    </TabsTrigger>
                    <TabsTrigger value="clusters" className="text-xs sm:text-sm">
                      <Layers className="h-4 w-4 mr-1 hidden sm:inline" />
                      Clusters
                    </TabsTrigger>
                    <TabsTrigger value="trends" className="text-xs sm:text-sm">
                      <FileBarChart className="h-4 w-4 mr-1 hidden sm:inline" />
                      Trends
                    </TabsTrigger>
                    <TabsTrigger value="intent" className="text-xs sm:text-sm">
                      <Lightbulb className="h-4 w-4 mr-1 hidden sm:inline" />
                      Intent
                    </TabsTrigger>
                    <TabsTrigger value="mapping" className="text-xs sm:text-sm">
                      <ListTree className="h-4 w-4 mr-1 hidden sm:inline" />
                      Mapping
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="discovery" className="mt-0">
                    <KeywordDiscovery />
                  </TabsContent>
                  <TabsContent value="clusters" className="mt-0">
                    <KeywordClusters />
                  </TabsContent>
                  <TabsContent value="trends" className="mt-0">
                    <SeasonalTrends />
                  </TabsContent>
                  <TabsContent value="intent" className="mt-0">
                    <IntentAnalysis />
                  </TabsContent>
                  <TabsContent value="mapping" className="mt-0">
                    <KeywordMapping />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right panel - Context */}
          <div className="col-span-12 md:col-span-3">
            <WorkspaceContext />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KeywordWorkspace;
