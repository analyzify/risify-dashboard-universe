
import React from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { 
  Search as SearchIcon, 
  BarChart2, 
  Briefcase, 
  MessageSquareText, 
  LineChart, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Search = () => {
  const searchFeatures = [
    {
      id: "position-tracking",
      title: "Position Tracking",
      description: "Monitor keyword rankings across search engines and track changes over time.",
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      link: "/search/position-tracking",
      metrics: "150+ Keywords Tracked",
      tag: "Most Popular"
    },
    {
      id: "keyword-workspace",
      title: "Keyword Workspace",
      description: "Research, organize, and expand keyword strategy with clustering and intent analysis.",
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      link: "/search/keyword-workspace",
      metrics: "1,200+ Keyword Suggestions",
      tag: "Strategy"
    },
    {
      id: "discovery",
      title: "Keyword Discovery",
      description: "Discover new keyword opportunities from multiple sources including competitors.",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      link: "/search/discovery",
      metrics: "248 Keywords Found",
      tag: "New"
    },
    {
      id: "market-intelligence",
      title: "Market Intelligence",
      description: "Analyze SERP landscapes and track competitor performance to identify opportunities.",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      link: "/search/market-intelligence",
      metrics: "15 Competitors Analyzed",
      tag: "Competitive"
    },
    {
      id: "faq-explorer",
      title: "FAQ Explorer",
      description: "Discover questions people are asking related to your products and create targeted content.",
      icon: <MessageSquareText className="h-8 w-8 text-primary" />,
      link: "/search/faq-explorer",
      metrics: "250+ Questions Indexed",
      tag: "Content"
    },
    {
      id: "search-console",
      title: "Search Console",
      description: "Connect Google Search Console data for deeper insights into your organic performance.",
      icon: <ExternalLink className="h-8 w-8 text-primary" />,
      link: "/search/search-console",
      metrics: "90 Days of Data",
      tag: "Integration"
    }
  ];

  const recentInsights = [
    {
      title: "Ranking Jump for 'Product Customization'",
      description: "Moved from position #12 to #3 in the past week",
      change: "+9",
      positive: true
    },
    {
      title: "New Keyword Opportunities",
      description: "15 new medium-volume keywords discovered in your niche",
      change: "+15",
      positive: true
    },
    {
      title: "Position Drop for 'Subscription Options'",
      description: "Decreased from position #5 to #8 since last scan",
      change: "-3",
      positive: false
    },
    {
      title: "FAQ Content Gap",
      description: "Competitors ranking for 23 questions you don't address",
      change: "23",
      positive: false
    }
  ];

  return (
    <Layout title="Search & Visibility">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Search & Visibility Hub</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor and improve your organic search performance across all search engines
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button className="flex items-center gap-2">
              <SearchIcon className="h-4 w-4" />
              Track New Keywords
            </Button>
            <Button variant="outline">Weekly Report</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Rankings Overview</CardTitle>
              <CardDescription>Last updated 2 hours ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Position</p>
                  <p className="text-2xl font-medium">15.3</p>
                  <p className="text-xs text-green-600">
                    <span className="font-medium">↑ 1.2</span> from last week
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Keywords in Top 10</p>
                  <p className="text-2xl font-medium">24</p>
                  <p className="text-xs text-green-600">
                    <span className="font-medium">↑ 3</span> from last week
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Keywords Tracked</p>
                  <p className="text-2xl font-medium">163</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">SERP Features</p>
                  <p className="text-2xl font-medium">12</p>
                  <p className="text-xs text-green-600">
                    <span className="font-medium">↑ 2</span> new features
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" asChild className="px-0">
                <Link to="/search/position-tracking" className="flex items-center gap-1">
                  View detailed rankings <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Weekly Changes</CardTitle>
              <CardDescription>Performance week-over-week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Improved</p>
                <Badge variant="outline" className="text-green-600 bg-green-100">+28</Badge>
              </div>
              <div className="w-full h-2 mb-4 bg-muted overflow-hidden rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Declined</p>
                <Badge variant="outline" className="text-red-600 bg-red-100">-14</Badge>
              </div>
              <div className="w-full h-2 mb-4 bg-muted overflow-hidden rounded-full">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Unchanged</p>
                <Badge variant="outline" className="text-blue-600 bg-blue-100">121</Badge>
              </div>
              <div className="w-full h-2 mb-4 bg-muted overflow-hidden rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" asChild className="px-0">
                <Link to="/search/keyword-workspace" className="flex items-center gap-1">
                  Analyze keyword changes <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Recent Insights</CardTitle>
              <CardDescription>Automated analysis of your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInsights.map((insight, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${insight.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {insight.positive ? '↑' : '↓'}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="link" asChild className="px-0">
                <Link to="/search/market-intelligence" className="flex items-center gap-1">
                  View all insights <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Tabs defaultValue={searchFeatures[0].id} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Search & Visibility Tools</h2>
              <TabsList>
                {searchFeatures.map(feature => (
                  <TabsTrigger key={feature.id} value={feature.id}>
                    {feature.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {searchFeatures.map(feature => (
              <TabsContent key={feature.id} value={feature.id} className="mt-0">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Card className="md:max-w-md w-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        {feature.icon}
                        {feature.tag && (
                          <Badge variant="secondary">{feature.tag}</Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-medium">{feature.metrics}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link to={feature.link}>Go to {feature.title}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <div className="flex-1 w-full bg-muted/50 rounded-lg p-6 h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Preview for {feature.title}</p>
                      <p className="text-sm text-muted-foreground">Feature preview will display here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Research</h3>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/search/keyword-workspace">Find new keywords</Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/search/faq-explorer">Explore customer questions</Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/search/market-intelligence">Competitor analysis</Link>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tracking</h3>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/search/position-tracking">View top performers</Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/search/position-tracking">Check ranking changes</Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/search/search-console">Analyze search traffic</Link>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Reports</h3>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start">Generate weekly report</Button>
                  <Button variant="outline" className="justify-start">Export keyword data</Button>
                  <Button variant="outline" className="justify-start">Schedule automated reports</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <h3 className="font-medium">Search for keywords to track</h3>
            <p className="text-sm text-muted-foreground">Start typing to find relevant keywords for your store</p>
          </div>
          <div className="relative w-full max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for keywords..." className="pl-9" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
