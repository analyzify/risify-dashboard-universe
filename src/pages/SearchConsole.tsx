
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  TrendingUp, 
  Search, 
  Download, 
  ExternalLink,
  RefreshCw,
  Filter,
  ChevronDown,
  Eye,
  MousePointerClick,
  Percent,
  Clock
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const SearchConsole = () => {
  const [dateRange, setDateRange] = useState("90");
  const [activeMetric, setActiveMetric] = useState("clicks");
  
  // Mock data for the chart
  const performanceData = Array(90).fill(0).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (90 - i));
    
    // Generate some wavy data with an upward trend
    const baseValue = 300 + i * 3;
    const randomWave = Math.sin(i * 0.2) * 150;
    const randomVariation = Math.random() * 100 - 50;
    
    const clicks = Math.max(50, Math.round(baseValue + randomWave + randomVariation));
    const impressions = Math.round(clicks * (3 + Math.random() * 2));
    
    return {
      date: date.toISOString().slice(0, 10),
      clicks,
      impressions,
      ctr: ((clicks / impressions) * 100).toFixed(1),
      position: (Math.random() * 2 + 1).toFixed(1)
    };
  });
  
  // Mock data for topic clusters
  const topicClusters = [
    { name: "dusj", clicks: "8.7k", clicksChange: "+6%", impressions: "314.6k", impressionsChange: "-2%" },
    { name: "bad", clicks: "8.4k", clicksChange: "+9%", impressions: "595.5k", impressionsChange: "-4%" },
    { name: "dusjkabinett", clicks: "2.9k", clicksChange: "+5%", impressions: "88.6k", impressionsChange: "-2%" },
    { name: "badekar", clicks: "2k", clicksChange: "+23%", impressions: "87.6k", impressionsChange: "+11%" },
    { name: "porsgrund", clicks: "1.5k", clicksChange: "+2%", impressions: "24.3k", impressionsChange: "-4%" },
    { name: "toalett", clicks: "1.5k", clicksChange: "+12%", impressions: "83.6k", impressionsChange: "-7%" },
    { name: "baderom", clicks: "1.5k", clicksChange: "+1%", impressions: "160.8k", impressionsChange: "-9%" },
    { name: "dusjhode", clicks: "1.3k", clicksChange: "+6%", impressions: "35.7k", impressionsChange: "-9%" },
    { name: "servant", clicks: "1k", clicksChange: "+61%", impressions: "71.4k", impressionsChange: "+18%" },
    { name: "varmtvannsbereder", clicks: "937", clicksChange: "-20%", impressions: "66.9k", impressionsChange: "-5%" }
  ];
  
  // Mock data for content groups
  const contentGroups = [
    { name: "Collections (all)", clicks: "41.1k", clicksChange: "+13%", impressions: "2.5M", impressionsChange: "-6%" },
    { name: "Products (all)", clicks: "31.3k", clicksChange: "+10%", impressions: "1.8M", impressionsChange: "+3%" },
    { name: "Blog Posts (all)", clicks: "9.4k", clicksChange: "", impressions: "496.7k", impressionsChange: "+1%" },
    { name: "Blog > Nyheter", clicks: "8.8k", clicksChange: "-2%", impressions: "419k", impressionsChange: "-4%" },
    { name: "Vendors (all)", clicks: "8.7k", clicksChange: "+30%", impressions: "565.6k", impressionsChange: "+10%" },
    { name: "Collection > Baderomstilbehor", clicks: "7k", clicksChange: "-2%", impressions: "399k", impressionsChange: "-2%" },
    { name: "Collection > Dusj", clicks: "5.6k", clicksChange: "+19%", impressions: "220k", impressionsChange: "-16%" },
    { name: "Collection > Baderomsinredning", clicks: "3.4k", clicksChange: "-35%", impressions: "296.4k", impressionsChange: "+9%" },
    { name: "Sizes (all)", clicks: "2.9k", clicksChange: "+127%", impressions: "140.3k", impressionsChange: "+98%" },
    { name: "Collection > Blandebatteri", clicks: "2.8k", clicksChange: "-27%", impressions: "214.8k", impressionsChange: "+11%" }
  ];
  
  // Mock data for queries
  const queries = [
    { name: "bad", clicks: "411", clicksChange: "+26%", impressions: "22.5k", impressionsChange: "-9%" },
    { name: "dusjkabinett 90x90", clicks: "351", clicksChange: "+14%", impressions: "11.1k", impressionsChange: "-1%" },
    { name: "dusjkabinett 100x100", clicks: "319", clicksChange: "-2%", impressions: "5.3k", impressionsChange: "" },
    { name: "dusjhylle", clicks: "261", clicksChange: "+19%", impressions: "7.5k", impressionsChange: "+18%" },
    { name: "porsgrund dusjkabinett", clicks: "261", clicksChange: "+30%", impressions: "1.8k", impressionsChange: "-6%" },
    { name: "bad.no", clicks: "250", clicksChange: "", impressions: "1.9k", impressionsChange: "-8%" },
    { name: "vaske dusjdorer", clicks: "248", clicksChange: "+40%", impressions: "1.6k", impressionsChange: "+33%" },
    { name: "vikingbad", clicks: "213", clicksChange: "+63%", impressions: "16.6k", impressionsChange: "+11%" },
    { name: "dusjkabinett 70x90", clicks: "208", clicksChange: "+14%", impressions: "4.3k", impressionsChange: "-2%" },
    { name: "porsgrund showerama", clicks: "201", clicksChange: "+10%", impressions: "1.6k", impressionsChange: "-5%" }
  ];
  
  // Mock data for pages
  const pages = [
    { url: "/blogs/nyheter/enkle-metoder-for-skinnende-rene-dusjdorer", clicks: "1.6k", clicksChange: "+15%", impressions: "44.8k", impressionsChange: "-1%" },
    { url: "/collections/posgrund-showerama-deler", clicks: "1.5k", clicksChange: "-4%", impressions: "14.5k", impressionsChange: "-1%" },
    { url: "/blogs/nyheter/dette-bor-du-vite-om-ventilasjon-pa-baderom", clicks: "1.3k", clicksChange: "+1%", impressions: "20.1k", impressionsChange: "+5%" },
    { url: "/", clicks: "1.3k", clicksChange: "", impressions: "180.9k", impressionsChange: "+12%" },
    { url: "/collections/porsgrund-dusjkabinett", clicks: "1k", clicksChange: "-11%", impressions: "11.1k", impressionsChange: "-8%" },
    { url: "/blogs/nyheter/hvordan-fjerne-kalk-fra-dusjhode", clicks: "915", clicksChange: "-2%", impressions: "19.6k", impressionsChange: "-13%" },
    { url: "/blogs/nyheter/varmesone-pa-bad", clicks: "807", clicksChange: "-3%", impressions: "23.6k", impressionsChange: "-6%" },
    { url: "/collections/sparedusj", clicks: "718", clicksChange: "-3%", impressions: "8.3k", impressionsChange: "+10%" },
    { url: "/collections/dusjhylle-og-dusjkurv", clicks: "610", clicksChange: "-1%", impressions: "24.7k", impressionsChange: "-4%" },
    { url: "/collections/kombibereder", clicks: "575", clicksChange: "-20%", impressions: "7.9k", impressionsChange: "-19%" }
  ];
  
  // Key metrics for the top banner
  const keyMetrics = [
    { name: "Clicks", value: "83.3k", change: "+9%", icon: <MousePointerClick className="h-5 w-5 text-blue-500" />, color: "text-blue-500" },
    { name: "Impressions", value: "4.1M", change: "-1%", icon: <Eye className="h-5 w-5 text-purple-500" />, color: "text-purple-500" },
    { name: "CTR", value: "2", change: "+0.1%", icon: <Percent className="h-5 w-5 text-green-500" />, color: "text-green-500" },
    { name: "Position", value: "12.4", change: "-1.1", icon: <TrendingUp className="h-5 w-5 text-amber-500" />, color: "text-amber-500" },
    { name: "Avg. Time", value: "1.6", change: "-0.3%", icon: <Clock className="h-5 w-5 text-slate-500" />, color: "text-slate-500" },
  ];
  
  const formatClicks = (value) => {
    return typeof value === 'number' ? Math.round(value).toLocaleString() : value;
  };
  
  return (
    <Layout title="Search Console">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Search Console</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor your site's performance in Google Search results
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 90 Days
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Last Updated: Today
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            
            <Button className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open in Search Console
            </Button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {keyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  {metric.icon}
                  <Badge variant={metric.change.startsWith('+') ? 'default' : 'outline'} className={metric.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-muted-foreground">
                    {metric.name}
                  </p>
                  <p className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main Performance Chart */}
        <Card className="col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Last 90 days of activity</CardDescription>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={activeMetric === "clicks" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveMetric("clicks")}
                >
                  Clicks
                </Button>
                <Button 
                  variant={activeMetric === "impressions" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveMetric("impressions")}
                >
                  Impressions
                </Button>
                <Button 
                  variant={activeMetric === "ctr" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveMetric("ctr")}
                >
                  CTR
                </Button>
                <Button 
                  variant={activeMetric === "position" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveMetric("position")}
                >
                  Position
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                    }}
                    tick={{ fontSize: 12 }}
                    tickCount={6}
                  />
                  <YAxis 
                    tickFormatter={(value) => {
                      if (activeMetric === "impressions" && value > 999) {
                        return `${(value / 1000).toFixed(0)}k`;
                      }
                      if (activeMetric === "clicks" && value > 999) {
                        return `${(value / 1000).toFixed(1)}k`;
                      }
                      return value;
                    }}
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === "clicks" || name === "impressions") {
                        return [formatClicks(value), name.charAt(0).toUpperCase() + name.slice(1)];
                      }
                      return [value, name.toUpperCase()];
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={activeMetric} 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorMetric)" 
                  />
                  {/* Add a reference line (dashed line) similar to the image */}
                  <Line 
                    type="monotone" 
                    dataKey={activeMetric === "impressions" ? "impressions" : "clicks"} 
                    stroke="#a3bffa" 
                    strokeDasharray="5 5" 
                    dot={false}
                    activeDot={false}
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Four Panel Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Topic Clusters */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Topic Clusters</CardTitle>
                <Tabs defaultValue="popular">
                  <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="growing">Growing</TabsTrigger>
                    <TabsTrigger value="decaying">Decaying</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 text-xs text-muted-foreground py-2 border-b">
                  <div className="col-span-6">Keyword</div>
                  <div className="col-span-3 text-right">Clicks</div>
                  <div className="col-span-3 text-right">Impressions</div>
                </div>
                
                {topicClusters.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 items-center py-2 text-sm hover:bg-muted/50 rounded-md cursor-pointer">
                    <div className="col-span-6 font-medium">{item.name}</div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.clicks}</span>
                      <span className={item.clicksChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.clicksChange}
                      </span>
                    </div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.impressions}</span>
                      <span className={item.impressionsChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.impressionsChange}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full text-muted-foreground text-xs">
                  EXPAND
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Content Groups */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Content Groups</CardTitle>
                <Tabs defaultValue="popular">
                  <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="growing">Growing</TabsTrigger>
                    <TabsTrigger value="decaying">Decaying</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 text-xs text-muted-foreground py-2 border-b">
                  <div className="col-span-6">Group</div>
                  <div className="col-span-3 text-right">Clicks</div>
                  <div className="col-span-3 text-right">Impressions</div>
                </div>
                
                {contentGroups.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 items-center py-2 text-sm hover:bg-muted/50 rounded-md cursor-pointer">
                    <div className="col-span-6 font-medium">{item.name}</div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.clicks}</span>
                      <span className={item.clicksChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.clicksChange}
                      </span>
                    </div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.impressions}</span>
                      <span className={item.impressionsChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.impressionsChange}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full text-muted-foreground text-xs">
                  EXPAND
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Queries */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Queries</CardTitle>
                <Tabs defaultValue="popular">
                  <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="growing">Growing</TabsTrigger>
                    <TabsTrigger value="decaying">Decaying</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 text-xs text-muted-foreground py-2 border-b">
                  <div className="col-span-6">Query</div>
                  <div className="col-span-3 text-right">Clicks</div>
                  <div className="col-span-3 text-right">Impressions</div>
                </div>
                
                {queries.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 items-center py-2 text-sm hover:bg-muted/50 rounded-md cursor-pointer">
                    <div className="col-span-6 font-medium">{item.name}</div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.clicks}</span>
                      <span className={item.clicksChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.clicksChange}
                      </span>
                    </div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.impressions}</span>
                      <span className={item.impressionsChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.impressionsChange}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full text-muted-foreground text-xs">
                  EXPAND
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Pages */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Pages</CardTitle>
                <Tabs defaultValue="popular">
                  <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="growing">Growing</TabsTrigger>
                    <TabsTrigger value="decaying">Decaying</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 text-xs text-muted-foreground py-2 border-b">
                  <div className="col-span-6">URL</div>
                  <div className="col-span-3 text-right">Clicks</div>
                  <div className="col-span-3 text-right">Impressions</div>
                </div>
                
                {pages.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 items-center py-2 text-sm hover:bg-muted/50 rounded-md cursor-pointer">
                    <div className="col-span-6 font-medium truncate" title={item.url}>{item.url}</div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.clicks}</span>
                      <span className={item.clicksChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.clicksChange}
                      </span>
                    </div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span>{item.impressions}</span>
                      <span className={item.impressionsChange.startsWith('+') ? 'text-green-600 text-xs' : 'text-red-600 text-xs'}>
                        {item.impressionsChange}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full text-muted-foreground text-xs">
                  EXPAND
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Search Console Insights</CardTitle>
            <CardDescription>
              Advanced filters and data analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Device
              </Button>
              <Button variant="outline" className="justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Page Type
              </Button>
              <Button variant="outline" className="justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Country
              </Button>
              <Button variant="outline" className="justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search Queries
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SearchConsole;
