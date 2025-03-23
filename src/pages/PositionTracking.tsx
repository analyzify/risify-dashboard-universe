
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart2, 
  Calendar, 
  ChevronDown,
  Download, 
  FileText, 
  Filter, 
  Plus, 
  Search, 
  Settings, 
  ArrowRight,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const PositionTracking = () => {
  const [dateRange, setDateRange] = useState("7d");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  
  // Mock data for the position tracking page
  const keywordData = [
    { 
      id: "1", 
      keyword: "sustainable handbags", 
      position: 8, 
      change: 3, 
      volume: 5400, 
      url: "/products/handbags/sustainable-collection",
      difficulty: "Medium",
      category: "Products",
      serp: ["Featured Snippet", "Image Pack"],
    },
    { 
      id: "2", 
      keyword: "eco friendly bags", 
      position: 12, 
      change: -2, 
      volume: 12800, 
      url: "/products/eco-friendly",
      difficulty: "High",
      category: "Products",
      serp: ["Related Questions"],
    },
    { 
      id: "3", 
      keyword: "vegan leather purse", 
      position: 4, 
      change: 6, 
      volume: 8200, 
      url: "/products/purses/vegan-leather",
      difficulty: "Medium",
      category: "Products",
      serp: ["Shopping Results"],
    },
    { 
      id: "4", 
      keyword: "organic cotton tote", 
      position: 6, 
      change: 1, 
      volume: 3600, 
      url: "/products/totes/organic-cotton",
      difficulty: "Low",
      category: "Products",
      serp: ["Image Pack", "Knowledge Panel"],
    },
    { 
      id: "5", 
      keyword: "recycled material backpacks", 
      position: 15, 
      change: -4, 
      volume: 2900, 
      url: "/products/backpacks/recycled-materials",
      difficulty: "Medium",
      category: "Products",
      serp: ["Related Questions"],
    },
    { 
      id: "6", 
      keyword: "how to clean vegan leather", 
      position: 2, 
      change: 1, 
      volume: 6700, 
      url: "/blog/cleaning-vegan-leather",
      difficulty: "Low",
      category: "Content",
      serp: ["Featured Snippet", "Videos"],
    },
    { 
      id: "7", 
      keyword: "sustainable fashion brands", 
      position: 23, 
      change: 5, 
      volume: 18400, 
      url: "/blog/sustainable-fashion-brands",
      difficulty: "High",
      category: "Content",
      serp: ["People Also Ask"],
    },
    { 
      id: "8", 
      keyword: "best eco friendly bags 2023", 
      position: 9, 
      change: 0, 
      volume: 4300, 
      url: "/blog/best-eco-bags-2023",
      difficulty: "Medium",
      category: "Content",
      serp: ["Top Stories"],
    },
  ];

  const positionDistribution = [
    { position: "1-3", count: 1, percentage: 12.5 },
    { position: "4-10", count: 3, percentage: 37.5 },
    { position: "11-20", count: 2, percentage: 25 },
    { position: "21-50", count: 1, percentage: 12.5 },
    { position: "51+", count: 1, percentage: 12.5 },
  ];

  const toggleKeywordSelection = (id: string) => {
    if (selectedKeywords.includes(id)) {
      setSelectedKeywords(selectedKeywords.filter(keywordId => keywordId !== id));
    } else {
      setSelectedKeywords([...selectedKeywords, id]);
    }
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
  };

  return (
    <Layout title="Position Tracking">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Position Tracking</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor your search rankings across multiple keywords and search engines
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Track New Keywords
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF Report</DropdownMenuItem>
                <DropdownMenuItem>Schedule Weekly Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Keywords Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">163</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12</span> since last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.3</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">↑ 1.2</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Keywords in Top 10</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">↑ 3</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">SERP Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2</span> new features
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Position Changes</CardTitle>
                <Select value={dateRange} onValueChange={handleDateRangeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 h-[240px] flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground text-sm">
                  Position change graph will display here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Position Distribution</CardTitle>
              <CardDescription>
                Where your keywords rank
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positionDistribution.map((item) => (
                  <div key={item.position} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-3 w-3 rounded-full",
                          item.position === "1-3" ? "bg-green-500" :
                          item.position === "4-10" ? "bg-green-300" :
                          item.position === "11-20" ? "bg-yellow-400" :
                          item.position === "21-50" ? "bg-orange-400" :
                          "bg-red-400"
                        )} />
                        <span className="text-sm font-medium">Position {item.position}</span>
                      </div>
                      <span className="text-sm">{item.count} keywords</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          item.position === "1-3" ? "bg-green-500" :
                          item.position === "4-10" ? "bg-green-300" :
                          item.position === "11-20" ? "bg-yellow-400" :
                          item.position === "21-50" ? "bg-orange-400" :
                          "bg-red-400"
                        )}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Keyword Rankings</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Filter keywords..." className="pl-9" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300"
                        onChange={() => {
                          if (selectedKeywords.length === keywordData.length) {
                            setSelectedKeywords([]);
                          } else {
                            setSelectedKeywords(keywordData.map(kw => kw.id));
                          }
                        }}
                        checked={selectedKeywords.length === keywordData.length}
                      />
                    </TableHead>
                    <TableHead>Keyword</TableHead>
                    <TableHead className="text-center">Position</TableHead>
                    <TableHead className="text-center">Change</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead>SERP Features</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywordData.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell>
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300"
                          checked={selectedKeywords.includes(keyword.id)}
                          onChange={() => toggleKeywordSelection(keyword.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={
                          keyword.position <= 3 ? "success" :
                          keyword.position <= 10 ? "default" :
                          keyword.position <= 20 ? "secondary" :
                          keyword.position <= 50 ? "warning" :
                          "destructive"
                        }>
                          {keyword.position}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={cn(
                          "flex items-center justify-center",
                          keyword.change > 0 ? "text-green-600" :
                          keyword.change < 0 ? "text-red-600" :
                          "text-yellow-500"
                        )}>
                          {keyword.change > 0 && <ArrowUp className="h-4 w-4 mr-1" />}
                          {keyword.change < 0 && <ArrowDown className="h-4 w-4 mr-1" />}
                          {keyword.change !== 0 ? Math.abs(keyword.change) : "—"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{keyword.volume.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {keyword.serp.slice(0, 2).map((feature, i) => (
                            <TooltipProvider key={i}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="max-w-20 truncate">
                                    {feature}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{feature}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                          {keyword.serp.length > 2 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline">+{keyword.serp.length - 2}</Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1">
                                    {keyword.serp.slice(2).map((feature, i) => (
                                      <p key={i}>{feature}</p>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-40 truncate text-sm">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">{keyword.url}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{keyword.url}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit target URL</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Add tag</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Stop tracking</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>8</strong> of <strong>163</strong> keywords
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Insights & Recommendations
              </CardTitle>
              <CardDescription>AI-generated tips based on your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <ArrowUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Opportunity for "eco friendly bags"</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      This high-volume keyword is close to the first page. Enhancing the title and meta description could push it into the top 10.
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                      View page optimization tips
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Position drop for "recycled material backpacks"</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      This keyword has dropped 4 positions. Competitor analysis shows new content from 2 competitors with more comprehensive product details.
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                      View competitor analysis
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Featured snippet opportunity</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your page for "how to clean vegan leather" is ranking #2 but isn't capturing the featured snippet. Restructuring your content could help win this position zero.
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                      Get featured snippet tips
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View all insights</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Movers</CardTitle>
              <CardDescription>Biggest ranking changes in the last {dateRange === "7d" ? "7 days" : dateRange === "30d" ? "30 days" : "90 days"}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gainers">
                <TabsList className="w-full">
                  <TabsTrigger value="gainers" className="flex-1">Biggest Gainers</TabsTrigger>
                  <TabsTrigger value="losers" className="flex-1">Biggest Losers</TabsTrigger>
                </TabsList>
                <TabsContent value="gainers" className="space-y-4 mt-4">
                  {keywordData
                    .filter(k => k.change > 0)
                    .sort((a, b) => b.change - a.change)
                    .slice(0, 3)
                    .map((keyword, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{keyword.keyword}</p>
                          <div className="flex items-center text-sm text-green-600 mt-1">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            <span>+{keyword.change} positions</span>
                          </div>
                        </div>
                        <Badge variant={
                          keyword.position <= 3 ? "success" :
                          keyword.position <= 10 ? "default" :
                          keyword.position <= 20 ? "secondary" :
                          "outline"
                        }>
                          #{keyword.position}
                        </Badge>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="losers" className="space-y-4 mt-4">
                  {keywordData
                    .filter(k => k.change < 0)
                    .sort((a, b) => a.change - b.change)
                    .slice(0, 3)
                    .map((keyword, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{keyword.keyword}</p>
                          <div className="flex items-center text-sm text-red-600 mt-1">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            <span>{keyword.change} positions</span>
                          </div>
                        </div>
                        <Badge variant={
                          keyword.position > 50 ? "destructive" :
                          keyword.position > 20 ? "warning" :
                          keyword.position > 10 ? "secondary" :
                          "outline"
                        }>
                          #{keyword.position}
                        </Badge>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="flex w-full items-center justify-center">
                <span>View all ranking changes</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PositionTracking;
