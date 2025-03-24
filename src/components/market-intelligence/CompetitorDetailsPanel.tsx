
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CompetitorData {
  id: number;
  name: string;
  domain: string;
  favicon: string;
  monthlyTraffic: number;
  trafficTrend: number[];
  trafficSources: {
    organic: number;
    direct: number;
    referral: number;
    social: number;
    paid: number;
  };
  topKeywords: string[];
  similarityScore: number;
  isExpanded?: boolean;
  isSelected?: boolean;
}

interface CompetitorDetailsPanelProps {
  competitor: CompetitorData;
}

const CompetitorDetailsPanel: React.FC<CompetitorDetailsPanelProps> = ({ competitor }) => {
  // Sample monthly data for the line chart
  const monthlyData = [
    { name: 'Jan', traffic: competitor.trafficTrend[0] * 7500 },
    { name: 'Feb', traffic: competitor.trafficTrend[1] * 7500 },
    { name: 'Mar', traffic: competitor.trafficTrend[2] * 7500 },
    { name: 'Apr', traffic: competitor.trafficTrend[3] * 7500 },
    { name: 'May', traffic: competitor.trafficTrend[4] * 7500 },
    { name: 'Jun', traffic: competitor.trafficTrend[5] * 7500 },
    { name: 'Jul', traffic: competitor.trafficTrend[6] * 7500 },
  ];

  // Transform traffic sources for pie chart
  const trafficSourcesData = [
    { name: 'Organic', value: competitor.trafficSources.organic },
    { name: 'Direct', value: competitor.trafficSources.direct },
    { name: 'Referral', value: competitor.trafficSources.referral },
    { name: 'Social', value: competitor.trafficSources.social },
    { name: 'Paid', value: competitor.trafficSources.paid }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  // Sample keyword data
  const keywordData = [
    { keyword: 'fashion marketplace', volume: 12500, position: 3, url: '/shop' },
    { keyword: 'designer clothes', volume: 8200, position: 5, url: '/designer-collection' },
    { keyword: 'online shopping', volume: 45000, position: 8, url: '/shop-online' },
    { keyword: 'trendy outfits', volume: 6800, position: 4, url: '/trendy-collection' },
    { keyword: 'summer collection', volume: 5400, position: 2, url: '/summer-collection' },
    { keyword: 'affordable fashion', volume: 9200, position: 6, url: '/affordable-collection' },
  ];

  // Sample page data
  const pageData = [
    { url: '/', title: 'Home Page', traffic: 68000, keywords: 3 },
    { url: '/shop', title: 'Shop All', traffic: 42000, keywords: 12 },
    { url: '/summer-collection', title: 'Summer Collection', traffic: 28000, keywords: 8 },
    { url: '/designer-collection', title: 'Designer Brands', traffic: 19000, keywords: 6 },
    { url: '/blog', title: 'Fashion Blog', traffic: 14000, keywords: 15 },
    { url: '/sale', title: 'Seasonal Sale', traffic: 22000, keywords: 7 },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="p-6 bg-muted/10 border-t animate-fade-in">
      <Tabs defaultValue="traffic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="traffic">Traffic Details</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Analysis</TabsTrigger>
          <TabsTrigger value="content">Content Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium mb-4">Traffic Trend (Last 6 Months)</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => formatNumber(value)}
                        width={50}
                      />
                      <RechartsTooltip
                        formatter={(value: number) => [formatNumber(value), "Traffic"]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="traffic" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium mb-4">Traffic Sources</h3>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="w-[180px] h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trafficSourcesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {trafficSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value) => [`${value}%`, 'Share']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="ml-4">
                    <ul className="space-y-2">
                      {trafficSourcesData.map((source, index) => (
                        <li key={source.name} className="flex items-center text-xs">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span>{source.name}: {source.value}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="keywords" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium mb-4">Top Keywords</h3>
                <div className="max-h-[220px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>URL</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {keywordData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.keyword}</TableCell>
                          <TableCell className="font-mono">{formatNumber(item.volume)}</TableCell>
                          <TableCell>#{item.position}</TableCell>
                          <TableCell className="truncate max-w-[120px]" title={item.url}>
                            {item.url}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium mb-4">Shared Keywords</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm font-medium mb-2">You both rank for (3)</div>
                    <div className="flex flex-wrap gap-2">
                      {competitor.topKeywords.slice(0, 3).map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm font-medium mb-2 text-amber-500">They rank, you don't (8)</div>
                    <div className="flex flex-wrap gap-2">
                      {['seasonal fashion', 'premium apparel', 'fashion deals', 'clothing discounts'].map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">+4 more</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm font-medium mb-2 text-green-500">You rank better on (5)</div>
                    <div className="flex flex-wrap gap-2">
                      {['online store', 'buy clothes', 'fashion shop'].map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                          {keyword}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">+2 more</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium mb-4">Top Pages by Traffic</h3>
              <div className="max-h-[250px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Page Title</TableHead>
                      <TableHead>Traffic</TableHead>
                      <TableHead>Keywords</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageData.map((page, index) => (
                      <TableRow key={index}>
                        <TableCell className="truncate max-w-[150px]" title={`${competitor.domain}${page.url}`}>
                          {page.url}
                        </TableCell>
                        <TableCell>{page.title}</TableCell>
                        <TableCell className="font-mono">{formatNumber(page.traffic)}</TableCell>
                        <TableCell>{page.keywords}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompetitorDetailsPanel;
